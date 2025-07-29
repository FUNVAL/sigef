import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import TextLink from "../text-link";
import { Country } from "@/types/country";

interface CountryDataTableProps {
    onEditCountry?: (country: Country) => void;
    onDeleteCountry?: (country: Country) => void;
}

export const createColumns = ({ onEditCountry, onDeleteCountry }: CountryDataTableProps): ColumnDef<Country>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Nombre del Pais",
        cell: ({ row }) => {
            const country = row.original;
            return (
                <div className="flex items-center space-x-2">
                    <div className="font-medium">{country.name}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "code",
        header: "Código",
        cell: ({ row }) => {
            const country = row.original;
            return (
                <div className="flex items-center space-x-2">
                    <div className="font-medium">
                        {country.code}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "phone_code",
        header: "Código de Teléfono",
        cell: ({ row }) => {
            const country = row.original;
            return (
                <div className="flex items-center space-x-2">
                    <div className="font-medium">
                        {country.phone_code}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            const country = row.original;
            return (
                <div className="flex items-center space-x-2">
                    <div className={`font-medium ${country?.status?.name === 'Activo' ? 'text-green-600' : 'text-red-600'}`}>
                        {country?.status?.name}
                    </div>
                </div>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const country = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(country.id.toString())}
                        >
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onEditCountry?.(country)}>
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDeleteCountry?.(country)}>
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]