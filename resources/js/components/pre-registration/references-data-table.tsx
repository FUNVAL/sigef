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
import { MoreHorizontal, CheckCircle, User } from "lucide-react";
import { Reference } from "@/types/reference";
import ReferenceOverview from "./reference-overview";
import ReferenceReview from "./reference-review";

export const columns: ColumnDef<Reference>[] = [
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
        header: "Persona Referida",
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
        accessorKey: "phone",
        header: "Contacto",
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
        accessorKey: "stake.name",
        header: "Ubicación",
        cell: ({ row }) => {
            const reference = row.original;
            return (
                <div className="text-sm">{reference.stake.name}</div>
            );
        },
    },
    {
        accessorKey: "referrer_name",
        header: "Referente",
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
    },
    {
        accessorKey: "created_at",
        header: "Fecha",
        cell: ({ row }) => {
            const reference = row.original;
            return (
                <div className="text-sm">
                    {reference.created_at ? new Date(reference.created_at).toLocaleDateString() : '-'}
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            const reference = row.original;
            const status = reference.status.name.toLowerCase();

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
                    {reference.status.name}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        header: "Acciones",
        enableHiding: false,
        cell: ({ row }) => {
            const reference = row.original;
            const isPending = reference.status.name.toLowerCase() === "pendiente";

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
                                <ReferenceReview
                                    reference={reference}
                                />
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="focus:bg-blue-50" asChild>
                            <ReferenceOverview
                                reference={reference}
                            />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];