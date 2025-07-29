import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useForm } from "@inertiajs/react";
import { Course } from "@/types/course";
import { LoaderCircle } from "lucide-react";

interface DeleteCourseProps {
    course: Course;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function DeleteCourse({ course, open = false, onOpenChange }: DeleteCourseProps) {
    const { delete: destroy, processing } = useForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        destroy(route('courses.destroy', course.id), {
            onSuccess: () => {
                onOpenChange?.(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Eliminar Curso</DialogTitle>
                    <DialogDescription>
                        ¿Estás seguro de que deseas eliminar el curso <strong>{course.name}</strong>? Esta acción no se puede deshacer.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <DialogFooter className="mt-6 gap-4 flex">
                        <Button type="button" variant="outline" disabled={processing} onClick={() => onOpenChange?.(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="destructive" disabled={processing}>
                            Eliminar
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}