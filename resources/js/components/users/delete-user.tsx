import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { User } from '@/types';
import { useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";

interface DeleteUserProps {
    user: User;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function DeleteUser({ user, open = false, onOpenChange }: DeleteUserProps) {
    const { delete: destroy, processing } = useForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        destroy(route('users.destroy', user.id), {
            onSuccess: () => {
                onOpenChange?.(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Eliminar Usuario</DialogTitle>
                    <DialogDescription>
                        ¿Estás seguro de que deseas eliminar el usuario <strong>{user.fullname}</strong>? Esta acción no se puede deshacer.
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