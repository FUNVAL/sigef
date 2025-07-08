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
import { Badge } from "../ui/badge";
import { MoreHorizontal } from "lucide-react";
import { type PreInscription } from "@/types/pre-inscription";
import PreInscriptionOverview from "./pre-inscription-overview";
import PreInscriptionReview from "./pre-inscription-review";

export const columns: ColumnDef<PreInscription>[] = [
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
        accessorKey: "first_name",
        header: "Candidato",
        cell: ({ row }) => {
            const preInscription = row.original;
            const fullName = `${preInscription.first_name} ${preInscription.middle_name || ''} ${preInscription.last_name} ${preInscription.second_last_name || ''}`.trim();
            return (
                <div className="space-y-1">
                    <div className="font-medium">{fullName}</div>
                    <div className="text-sm text-gray-500">
                        {preInscription.gender?.name} • {preInscription.age} años
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "email",
        header: "Contacto",
        cell: ({ row }) => {
            const preInscription = row.original;
            return (
                <div className="space-y-1">
                    <div className="text-sm font-medium">{preInscription.email}</div>
                    <div className="text-sm text-gray-500">{preInscription.phone}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "country.name",
        header: "País",
        cell: ({ row }) => {
            const preInscription = row.original;
            return (
                <div className="text-sm">{preInscription.country?.name}</div>
            );
        },
    },
    {
        accessorKey: "stake.name",
        header: "Estaca",
        cell: ({ row }) => {
            const preInscription = row.original;
            return (
                <div className="text-sm">{preInscription.stake?.name}</div>
            );
        },
    },
    {
        accessorKey: "marital_status",
        header: "Estado Civil",
        cell: ({ row }) => {
            const preInscription = row.original;
            return (
                <div className="text-sm">{preInscription.marital_status?.name || 'No especificado'}</div>
            );
        },
    },
    {
        accessorKey: "job_type_preference",
        header: "Preferencia Laboral",
        cell: ({ row }) => {
            const preInscription = row.original;
            return (
                <div className="text-sm">
                    {preInscription.job_type_preference?.name || 'No especificado'}
                </div>
            );
        },
    },
    {
        accessorKey: "served_mission",
        header: "Misión",
        cell: ({ row }) => {
            const preInscription = row.original;
            return (
                <Badge variant={preInscription.served_mission ? "default" : "secondary"}>
                    {preInscription.served_mission ? "Sí" : "No"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "available_full_time",
        header: "Disponibilidad",
        cell: ({ row }) => {
            const preInscription = row.original;
            if (preInscription.available_full_time === null || preInscription.available_full_time === undefined) {
                return <div className="text-sm text-gray-500">No especificado</div>;
            }
            return (
                <Badge variant={preInscription.available_full_time ? "default" : "secondary"}>
                    {preInscription.available_full_time ? "Tiempo completo" : "Tiempo parcial"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: "Fecha",
        cell: ({ row }) => {
            const preInscription = row.original;
            return (
                <div className="text-sm">
                    {preInscription.created_at ? new Date(preInscription.created_at).toLocaleDateString() : '-'}
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            const preInscription = row.original;
            if (!preInscription.status) {
                return <Badge variant="secondary">Sin estado</Badge>;
            }

            const status = preInscription.status.name.toLowerCase();

            return (
                <Badge
                    variant={
                        status === "aprobado"
                            ? "default"
                            : status === "rechazado"
                                ? "destructive"
                                : "secondary"
                    }
                >
                    {preInscription.status.name}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        header: "Acciones",
        enableHiding: false,
        cell: ({ row }) => {
            const preInscription = row.original;
            const isPending = preInscription.status?.name.toLowerCase() === "pendiente";

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
                        {isPending && (
                            <DropdownMenuItem
                                className="text-blue-600 focus:text-blue-700 focus:bg-blue-50"
                                asChild
                            >
                                <PreInscriptionReview
                                    preInscription={preInscription}
                                />
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="focus:bg-blue-50" asChild>
                            <PreInscriptionOverview
                                preInscription={preInscription}
                            />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];
