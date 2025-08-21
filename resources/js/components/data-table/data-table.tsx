import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { ChevronDown } from "lucide-react"
import { router } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PaginationData } from "@/types/global"

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  filterKey: string;
  FilterBar?: React.FC | React.ComponentType | null;
  pagination: PaginationData;
  searchValue?: string;
  onSearch?: (value: string) => void;
}

export function DataTable<TData>({
  data,
  columns,
  filterKey,
  FilterBar,
  pagination,
  searchValue = "",
  onSearch
}: DataTableProps<TData>) {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // Establecer el valor inicial del filtro desde props
  React.useEffect(() => {
    if (filterKey && searchValue) {
      setColumnFilters(prevFilters => {
        const filterExists = prevFilters.some(filter => filter.id === filterKey);

        if (filterExists) {
          return prevFilters.map(filter =>
            filter.id === filterKey ? { ...filter, value: searchValue } : filter
          );
        } else {
          return [...prevFilters, { id: filterKey, value: searchValue }];
        }
      });
    }
  }, [searchValue, filterKey]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // Manejar cambio de página
  const handlePageChange = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());

    router.get(url.pathname + url.search, {}, {
      preserveState: true,
      preserveScroll: true,
    });
  }

  // Estado local para el valor del input de búsqueda
  const [localSearch, setLocalSearch] = React.useState(searchValue);

  // Actualizar el filtro localmente y ejecutar búsqueda solo con Enter
  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      table.getColumn(filterKey)?.setFilterValue(localSearch);
      if (onSearch) {
        onSearch(localSearch);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4 gap-4">
        <div className="flex items-center gap-4 flex-1">
          <Input
            placeholder={`Buscar... (presiona Enter)`}
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="max-w-sm"
          />
          {FilterBar && <FilterBar />}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columnas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table className="">
          <TableHeader className="text-base py-2">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="dark:bg-black">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {pagination ? (
            `Mostrando ${data.length} de ${pagination.total} resultados`
          ) : (
            `Mostrando ${data.length} resultados`
          )}
          {table.getFilteredSelectedRowModel().rows.length > 0 &&
            ` (${table.getFilteredSelectedRowModel().rows.length} seleccionadas)`
          }
        </div>
        {pagination && (
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={pagination.current_page <= 1}
            >
              Previous
            </Button>
            <span className="mx-2">
              Página {pagination.current_page} de {pagination.last_page}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={pagination.current_page >= pagination.last_page}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
