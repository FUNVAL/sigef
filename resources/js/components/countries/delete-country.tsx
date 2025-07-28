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
import { Country } from "@/types/country";
import { LoaderCircle } from "lucide-react";

interface DeleteCountryProps {
    country: Country;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function DeleteCountry({ country, open = false, onOpenChange }: DeleteCountryProps) {
    const { delete: destroy, processing } = useForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        destroy(route('countries.destroy', country.id), {
            onSuccess: () => {
                onOpenChange?.(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Eliminar Pais</DialogTitle>
                    <DialogDescription>
                        ¿Estás seguro de que deseas eliminar el pais <strong>{country.name}</strong>? Esta acción no se puede deshacer.
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