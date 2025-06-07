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

export const columns: ColumnDef<User>[] = [
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
        accessorKey: "fullname",
        header: "Nombre completo",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="flex items-center space-x-2">
                    <div className="font-medium">{user.fullname}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="flex items-center space-x-2">
                    <div className="font-medium">{user.email}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "roles",
        header: "Roles",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="flex items-center space-x-2">
                    <div className="font-medium">{user.user_roles.map((role) => role).join(", ")}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "document_number",
        header: "No. documento",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="flex items-center space-x-2">
                    <div className="font-medium">{user.document_number}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "contact_phone_1",
        header: "Teléfono",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="flex items-center space-x-2">
                    <div className="font-medium">{user.contact_phone_1}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "status.name",
        header: "Estado",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="flex items-center space-x-2">
                    <div className={`font-medium ${user.status.name === 'Activo' ? 'text-green-600' : 'text-red-600'}`}>
                        {user.status.name}
                    </div>
                </div>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original
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
                            onClick={() => navigator.clipboard.writeText(user.id.toString())}
                        >
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <TextLink href={route('users.edit', user.id)} className="flex items-center space-x-2">
                                Editar
                            </TextLink>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

] 