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
import { Course } from "@/types/course";

interface CourseDataTableProps {
    onEditCourse?: (course: Course) => void;
    onDeleteCourse?: (course: Course) => void;
}

export const createColumns = ({ onEditCourse, onDeleteCourse }: CourseDataTableProps): ColumnDef<Course>[] => [
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
        header: "Nombre del referido",
        cell: ({ row }) => {
            const course = row.original;
            return (
                <div className="flex items-center space-x-2">
                    <div className="font-medium">{course.name}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "duration",
        header: "Duración",
        cell: ({ row }) => {
            const course = row.original;
            return (
                <div className="flex items-center space-x-2">
                    <div className="font-medium">
                        {course.duration} {course.duration > 1 ? 'Semanas' : 'Semana'}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "modality.name",
        header: "Modalidad",
        cell: ({ row }) => {
            const course = row.original;
            return (
                <div className="flex items-center space-x-2">
                    <div className="font-medium">
                        {course.modality.name}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            const course = row.original;
            return (
                <div className="flex items-center space-x-2">
                    <div className={`font-medium ${course.status.name === 'Activo' ? 'text-green-600' : 'text-red-600'}`}>
                        {course.status.name}
                    </div>
                </div>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const course = row.original
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
                            onClick={() => navigator.clipboard.writeText(course.id.toString())}
                        >
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onEditCourse?.(course)}>
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDeleteCourse?.(course)}>
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]