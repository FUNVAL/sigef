import { useState } from "react"
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { LoaderCircle } from "lucide-react";

type CompleteDialogProps = {
    btnLabel: string;
    dialogTitle: string;
    dialogDescription: string;
    contentClassName?: string;
    icon?: React.ReactNode;
    isSubmitting?: boolean;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
    onSuccess?: () => void;
    children: React.ReactNode;
}

type RenderChildrenProps = {
    children: React.ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
    isSubmitting: boolean;
    setOpen: (open: boolean) => void;
    onSuccess?: () => void;
}

function RenderChildren({ children, onSubmit, isSubmitting, setOpen, onSuccess }: RenderChildrenProps) {
    if (!onSubmit) return <>{children}</>;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await onSubmit(e);
            onSuccess?.();
            setOpen(false);
        } catch (error) {
            // El error se maneja en el componente padre
            console.error('Error en el submit:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {children}
            <DialogFooter>
                <Button
                    variant="outline"
                    disabled={isSubmitting}
                    type="button"
                    onClick={() => setOpen(false)}
                >
                    Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    Guardar
                    {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin ml-2" />}
                </Button>
            </DialogFooter>
        </form>
    );
}

export function CompleteDialog({
    btnLabel,
    dialogTitle,
    dialogDescription,
    children,
    icon,
    contentClassName,
    isSubmitting = false,
    onSubmit,
    onSuccess,
}: CompleteDialogProps) {

    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="flex">
                <Button
                    variant="link"
                    aria-label={`Abrir ${dialogTitle}`}
                >
                    {icon && <span aria-hidden="true">{icon}</span>}
                    {btnLabel}
                </Button>
            </DialogTrigger>
            <DialogContent className={contentClassName}>
                <DialogHeader>
                    <DialogTitle className="text-2xl leading-3 pt-4">{dialogTitle}</DialogTitle>
                    <DialogDescription>
                        {dialogDescription}
                    </DialogDescription>
                </DialogHeader>

                <RenderChildren
                    children={children}
                    onSubmit={onSubmit}
                    isSubmitting={isSubmitting}
                    setOpen={setOpen}
                    onSuccess={onSuccess}
                />
            </DialogContent>
        </Dialog>
    )
}