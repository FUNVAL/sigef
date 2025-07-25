import { useState } from "react"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useForm, usePage } from "@inertiajs/react";
import { Country, UpdateCountryForm } from "@/types/country";
import InputError from "../input-error";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { LoaderCircle } from "lucide-react";
import { Enums } from "@/types/global";



export function EditCountry({ country }: { country: Country }) {
    const [open, setOpen] = useState(false);
    const { enums } = usePage<{ enums: Enums }>().props;

    const initialData: UpdateCountryForm = {
        ...country,
        status: country.status ? country.status.id : 0,
    }



    const { data, setData, put, errors, processing } = useForm<UpdateCountryForm>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as keyof UpdateCountryForm, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('countries.update', data.id), {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="link" className='p-2 '>
                    Editar
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Editar Pais</DialogTitle>
                    <DialogDescription>
                        Aquí puedes editar los detalles del pais. Asegúrate de completar todos los campos requeridos.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre del Pais</Label>
                            <Input
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                required
                                placeholder="Nombre"
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="duration">Código del Pais</Label>
                            <Input
                                id="code"
                                name="code"
                                value={data.code}
                                onChange={handleChange}
                                required
                                placeholder="Código del pais"
                            />
                            <InputError message={errors.code} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="modality">Codigo de area</Label>
                            <Select
                                name="modality"
                                value={String(data.phone_code)}
                                required
                                onValueChange={(value) => setData('phone_code', value)}
                            >
                                <SelectTrigger id="modality">
                                    <SelectValue placeholder="Seleccione tipo" />
                                </SelectTrigger>
                            </Select>
                            <InputError message={errors.phone_code} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="flag">Bandera</Label>
                            <Input
                                id="flag"
                                name="flag"
                                value={data.flag}
                                onChange={handleChange}
                                required
                                placeholder="URL de la bandera"
                            />
                            <InputError message={errors.flag} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="status">Estado</Label>
                            <Select
                                name="status"
                                value={String(data.status)}
                                required
                                onValueChange={(value) => setData('status', Number(value))}
                            >
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Seleccione estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    {enums.statusEnum?.slice(0, 2).map((status) => (
                                        <SelectItem key={status.id} value={String(status.id)}>
                                            {status.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} />
                        </div>


                    </div>
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