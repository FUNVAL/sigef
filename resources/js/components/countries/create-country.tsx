import { useCallback, useState } from "react"
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
import { CountryForm } from "@/types/country";
import InputError from "../input-error";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { LoaderCircle } from "lucide-react";
import { Enums } from "@/types/global";


export function CreateCountry() {
    const [open, setOpen] = useState(false);
    const { enums } = usePage<{ enums: Enums }>().props;
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<CountryForm>(initialData);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('countries.store'), {
            onSuccess: () => {
                setOpen(false);
                setData(initialData);
            },
        });
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as keyof CountryForm, value);
    };


    const getCountryCode = useCallback((field: keyof CountryForm, value: string) => {
        if (value.length >= 1) {
            setData(field, value);
        }
    }, [setData]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="link" className='cursor-pointer'>
                    Crear Pais
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Crear Pais</DialogTitle>
                    <DialogDescription>
                        Aquí puedes agregar un nuevo pais. Asegúrate de completar todos los campos requeridos.
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
                            <Label htmlFor="code">Abreviación del Pais</Label>
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
                            <Label htmlFor="phone_code">Código de area</Label>

                            <Input
                                id="phone_code"
                                name="phone_code"
                                value={data.phone_code}
                                onChange={(e)=>getCountryCode ('phone_code', e.target.value)}
                                required
                                placeholder="Código de área"
                            />


                            <InputError message={errors.phone_code} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="flag">Bandera</Label>
                            <Input
                                id="flag"
                                name="flag"
                                value={data.flag}
                                onChange={handleChange}
                                /* required */
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

const initialData: CountryForm = {
    name: '',
    code: '',
    phone_code:'+',
    flag: '',
    status: 0,
}

