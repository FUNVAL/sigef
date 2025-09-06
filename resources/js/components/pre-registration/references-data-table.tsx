import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SharedData } from '@/types';
import { Reference } from '@/types/reference';
import { router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, Pencil } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import ReferenceOverview from './reference-overview';

export const createColumns = ({ onEditReference }: { onEditReference: (reference: Reference) => void }): ColumnDef<Reference>[] => [
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
        meta: {
            defaultVisibility: {
                mobile: false,
                tablet: false,
                desktop: true,
            },
        }
    },
    {
        accessorKey: 'Persona Referida',
        header: 'Persona Referida',
        cell: ({ row }) => {
            const reference = row.original;
            return (
                <div className="space-y-1">
                    <div className="font-medium">{reference.name}</div>
                    <div className="text-sm text-gray-500">
                        {reference.gender.name} • {reference.age} años
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'Contacto',
        header: 'Contacto',
        cell: ({ row }) => {
            const reference = row.original;
            return (
                <div className="space-y-1">
                    <div className="text-sm font-medium">{reference.phone}</div>
                    <div className="text-sm text-gray-500">{reference.country.name}</div>
                </div>
            );
        },
    },
    {
        accessorKey: 'Ubicación',
        header: 'Ubicación',
        cell: ({ row }) => {
            const reference = row.original;
            return <div className="text-sm">{reference.stake.name}</div>;
        },
        meta: {
            defaultVisibility: {
                mobile: false,
                tablet: false,
                desktop: true,
            }
        }
    },
    {
        accessorKey: 'Referente',
        header: 'Referente',
        cell: ({ row }) => {
            const reference = row.original;
            return (
                <div className="space-y-1">
                    <div className="text-sm font-medium">{reference.referrer_name}</div>
                    <div className="text-sm text-gray-500">
                        {reference.relationship_with_referred.name} • {reference.referrer_phone}
                    </div>
                </div>
            );
        },
        meta: {
            defaultVisibility: {
                mobile: false,
                tablet: false,
                desktop: true,
            }
        }
    },
    {
        accessorKey: 'Fecha',
        header: 'Fecha',
        cell: ({ row }) => {
            const reference = row.original;
            return <div className="text-sm">{reference.created_at ? new Date(reference.created_at).toLocaleDateString() : '-'}</div>;
        },
        meta: {
            defaultVisibility: {
                mobile: false,
                tablet: true,
                desktop: true,
            },
        }
    },
    {
        accessorKey: 'Estado',
        header: 'Estado',
        cell: ({ row }) => {
            const reference = row.original;
            const status = reference.status.name.toLowerCase();

            return (
                <Badge variant={status === 'aprobado' ? 'default' : status === 'no aprobada' ? 'destructive' : 'secondary'}>
                    {reference.status.name}
                </Badge>
            );
        },
        meta: {
            defaultVisibility: {
                mobile: false,
                tablet: true,
                desktop: true,
            }
        }

    },
    {
        id: 'actions',
        header: 'Acciones',
        enableHiding: false,
        cell: ({ row }) => {
            const reference = row.original;
            const { auth } = usePage<SharedData>().props;

            const canEdit = auth.user.user_permissions.includes('reference:update');
            const isPending = reference.status.id === 1 || canEdit;

            const handleEditReference = () => {
                router.visit(route('references.edit', reference.id));
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-50">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <ReferenceOverview reference={reference} />
                        </DropdownMenuItem>
                        {canEdit && (
                            <DropdownMenuItem onClick={handleEditReference}>
                                <Pencil className="h-4 w-4" />
                                Editar referencia
                            </DropdownMenuItem>
                        )}
                        {isPending && (
                            <DropdownMenuItem onClick={() => onEditReference(reference)}>
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
