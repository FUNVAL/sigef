import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { validateRole } from '@/lib/utils';
import { SharedData } from '@/types';
import { type PreInscription } from '@/types/pre-inscription';
import { router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, Pencil } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import PreInscriptionOverview from './pre-inscription-overview';

export const createColumns = ({
    onEditPreInscription,
}: {
    onEditPreInscription: (preInscription: PreInscription) => void;
}): ColumnDef<PreInscription>[] => [
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
            accessorKey: 'candidato',
            header: 'Candidato',
            cell: ({ row }) => {
                const preInscription = row.original;
                const fullName =
                    `${preInscription.first_name} ${preInscription.middle_name || ''} ${preInscription.last_name} ${preInscription.second_last_name || ''}`.trim();
                return (
                    <div className="space-y-1">
                        <p className="font-medium">{fullName}</p>
                        <p className="text-sm text-gray-500">
                            {preInscription.gender?.name} • {preInscription.age} años
                        </p>
                    </div>
                );
            },
        },
        {
            accessorKey: 'contacto',
            header: 'Contacto',
            cell: ({ row }) => {
                const preInscription = row.original;
                return (
                    <div className="space-y-1">
                        <p className="text-sm font-medium">{preInscription.email}</p>
                        <p className="text-sm text-gray-500">{preInscription.phone}</p>
                    </div>
                );
            },
        },
        {
            id: 'Ubicación',
            header: 'Ubicación',
            cell: ({ row }) => {
                const preInscription = row.original;
                const country = preInscription.country?.name || 'País no especificado';
                const stake = preInscription.stake?.name || 'Estaca no especificada';

                return (
                    <div className="space-y-1 text-sm">
                        <p className="font-medium">{country}</p>
                        <p className="text-gray-500">{stake}</p>
                    </div>
                );
            },
        },
        {
            accessorKey: 'Estado civil',
            header: 'Estado Civil',
            cell: ({ row }) => {
                const preInscription = row.original;
                return <p className="text-sm">{preInscription.marital_status?.name || 'No especificado'}</p>;
            },
        },

        {
            accessorKey: 'Misión',
            header: 'Misión',
            cell: ({ row }) => {
                const preInscription = row.original;
                console.log(preInscription.served_mission);
                return <Badge variant={preInscription.served_mission.name === "Si" ? 'default' : 'secondary'}>{preInscription.served_mission.name}</Badge>;
            },
        },

        {
            accessorKey: 'fecha',
            header: 'Fecha',
            cell: ({ row }) => {
                const preInscription = row.original;
                return <p className="text-sm">{preInscription.created_at ? new Date(preInscription.created_at).toLocaleDateString() : '-'}</p>;
            },
        },
        {
            accessorKey: 'estado',
            header: 'Estado',
            cell: ({ row }) => {
                const preInscription = row.original;
                if (!preInscription.status) {
                    return <Badge variant="secondary">Sin estado</Badge>;
                }

                const status = preInscription.status.name.toLowerCase();

                return (
                    <Badge variant={status === 'aprobado' ? 'default' : status === 'no aprobada' ? 'destructive' : 'secondary'}>
                        {preInscription.status.name}
                    </Badge>
                );
            },
        },
        {
            id: 'actions',
            header: 'Acciones',
            enableHiding: false,
            cell: ({ row }) => {
                const preInscription = row.original;
                const { auth } = usePage<SharedData>().props;
                const isPending = preInscription.status.id === 1 || validateRole(auth.user.roles, 'Administrador');
                const canEdit = validateRole(auth.user.roles, 'Administrador') || validateRole(auth.user.roles, 'Responsable');

                const handleEditPreInscription = () => {
                    router.visit(route('pre-inscription.edit', preInscription.id));
                };

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menú</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(preInscription.email)}>Copiar email</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <PreInscriptionOverview preInscription={preInscription} />
                            </DropdownMenuItem>
                            {canEdit && (
                                <DropdownMenuItem onClick={handleEditPreInscription}>
                                    <Pencil className="h-4 w-4" />
                                    Editar preinscripción
                                </DropdownMenuItem>
                            )}
                            {isPending && (
                                <DropdownMenuItem onClick={() => onEditPreInscription(preInscription)}>
                                    <Edit className="h-4 w-4" />
                                    Revisar solicitud
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
