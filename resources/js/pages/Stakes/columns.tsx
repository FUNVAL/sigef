import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Enums } from '@/types/global';
import { Stake } from '@/types/stake';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

interface ColumnsProps {
    countries: any[]; // Mejoraría con el tipo Country[]
    users: any[]; // Mejoraría con el tipo User[]
    enums: Enums; // Agregar enums a las props
    onEdit: (stake: Stake) => void;
    onDelete: (stake: Stake) => void;
}

export const getColumns = ({ countries, users, enums, onEdit, onDelete }: ColumnsProps): ColumnDef<Stake>[] => {
    return [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'Nombre',
            header: 'Nombre',
            accessorFn: (row: Stake) => row.name,
            cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
        },
        {
            id: 'País',
            header: 'País',
            accessorKey: 'País',
            accessorFn: (row: Stake) => row.country?.code || 'N/A',
            cell: ({ row }) => <span className="font-medium">{row.original.country?.code || 'N/A'}</span>,
        },
        {
            id: 'Responsable',
            header: 'Responsable',
            accessorKey: 'Responsable',
            accessorFn: (row: Stake) => (row.user ? `${row.user.firstname} ${row.user.lastname}` : 'N/A'),
            cell: ({ row }) => (
                <span className="font-medium">{row.original.user ? `${row.original.user.firstname} ${row.original.user.lastname}` : 'N/A'}</span>
            ),
        },
        {
            id: 'Estado',
            header: 'Estado',
            accessorKey: 'Estado',
            accessorFn: (row: Stake) => row.status,
            cell: ({ row }) => {
                const status = row.original.status;
                const statusEnum = enums.statusEnum.find((s) => s.id === status);
                const statusName = statusEnum?.name || 'Desconocido';

                let className = 'bg-gray-100 text-gray-800';

                if (status === 1) {
                    // ACTIVE
                    className = 'bg-green-100 text-green-800';
                } else if (status === 3) {
                    // DELETED
                    className = 'bg-red-100 text-red-800';
                }

                return <span className={`rounded-full px-2 py-1 text-xs ${className}`}>{statusName}</span>;
            },
        },
        {
            id: 'actions',
            header: 'Acciones',
            enableHiding: false,
            accessorKey: 'Acciones',
            cell: ({ row }) => {
                const stake = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menú</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(stake.id.toString())}>Copiar ID</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onEdit(stake)}>Editar</DropdownMenuItem>
                            {stake.status !== 3 && ( // No mostrar eliminar si ya está eliminado (status 3)
                                <DropdownMenuItem onClick={() => onDelete(stake)} className="text-red-600">
                                    Eliminar
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
};
