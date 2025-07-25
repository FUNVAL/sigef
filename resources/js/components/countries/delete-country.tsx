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
import { useForm } from "@inertiajs/react";
import { Country, UpdateCountryForm } from "@/types/country";
import { LoaderCircle } from "lucide-react";

export function DeleteCountry({ country }: { country: Country }) {
    const [open, setOpen] = useState(false);
    const { data, delete: destroy, processing } = useForm<UpdateCountryForm>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        destroy(route('countries.destroy', data.id), {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="link" className='p-2 text-destructive-foreground hover:text-destructive-foreground'>
                    Eliminar
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Eliminar Pais</DialogTitle>
                    <DialogDescription>
                        ¿Estás seguro de que deseas eliminar el pais <strong>{country.name}</strong>? Esta acción no se puede deshacer.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <DialogFooter className="mt-6 gap-4 flex">
                        <Button type="button" variant="outline" disabled={processing} onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Guardar
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
} 