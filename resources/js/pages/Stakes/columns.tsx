import { Stake } from '@/types/stake';
import { ColumnDef } from '@tanstack/react-table';
import { ToggleStakeStatus } from './DeleteStake'; // Cambiado el import
import { EditStake } from './edit-stake';

interface ColumnsProps {
    countries: any[]; // Mejoraría con el tipo Country[]
    users: any[]; // Mejoraría con el tipo User[]
}

export const getColumns = ({ countries, users }: ColumnsProps): ColumnDef<Stake>[] => [
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
        id: 'status', // Nueva columna para mostrar el estado
        header: 'Estado',
        accessorFn: (row: Stake) => row.status,
        cell: ({ row }) => (
            <span
                className={`rounded-full px-2 py-1 text-xs ${
                    row.original.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}
            >
                {row.original.status === 'active' ? 'Activo' : 'Inactivo'}
            </span>
        ),
    },
    {
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }) => (
            <div className="flex space-x-2">
                <EditStake stake={row.original} countries={countries} users={users} />
                <ToggleStakeStatus stake={row.original} /> {/* Componente renombrado */}
            </div>
        ),
    },
];
