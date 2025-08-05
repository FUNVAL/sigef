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
import { STAKE_STATUS } from '@/lib/consts/stakeStatus';
import { Stake } from '@/types/stake';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

interface ColumnsProps {
    countries: any[]; // Mejoraría con el tipo Country[]
    users: any[]; // Mejoraría con el tipo User[]
    onEdit: (stake: Stake) => void;
    onDelete: (stake: Stake) => void;
}

export const getColumns = ({ countries, users, onEdit, onDelete }: ColumnsProps): ColumnDef<Stake>[] => [
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
        accessorKey: 'name',
        header: 'Nombre',
    },
    {
        id: 'country',
        header: 'País',
        accessorFn: (row: Stake) => row.country?.code || 'N/A',
        cell: ({ row }) => <span className="font-medium">{row.original.country?.code || 'N/A'}</span>,
    },
    {
        id: 'user',
        header: 'Responsable',
        accessorFn: (row: Stake) => (row.user ? `${row.user.firstname} ${row.user.lastname}` : 'N/A'),
        cell: ({ row }) => (
            <span className="font-medium">{row.original.user ? `${row.original.user.firstname} ${row.original.user.lastname}` : 'N/A'}</span>
        ),
    },
    {
        id: 'status',
        header: 'Estado',
        accessorFn: (row: Stake) => row.status,
        cell: ({ row }) => {
            const status = row.original.status;
            let variant: 'default' | 'secondary' | 'destructive' = 'secondary';
            let text = 'Inactivo';
            let className = 'bg-gray-100 text-gray-800';

            if (status === STAKE_STATUS.ACTIVE) {
                variant = 'default';
                text = 'Activo';
                className = 'bg-green-100 text-green-800';
            } else if (status === STAKE_STATUS.DELETED) {
                variant = 'destructive';
                text = 'Eliminado';
                className = 'bg-red-100 text-red-800';
            }

            return <span className={`rounded-full px-2 py-1 text-xs ${className}`}>{text}</span>;
        },
    },
    {
        id: 'actions',
        header: 'Acciones',
        enableHiding: false,
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
                        {stake.status !== STAKE_STATUS.DELETED && (
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
