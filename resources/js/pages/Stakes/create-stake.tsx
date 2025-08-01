import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Country } from '@/types/country';
import { User } from '@/types/users';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

interface CreateStakeProps {
    countries: Country[];
    users: User[];
}

export function CreateStake({ countries, users }: CreateStakeProps) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        country_id: '',
        user_id: '',
        status: 'active', // Valor por defecto
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('stakes.store'), {
            onSuccess: () => {
                setOpen(false);
                reset();
            },
            preserveScroll: true,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="ml-auto" variant="link">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Crear Stake
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Crear Nuevo Stake</DialogTitle>
                    <DialogDescription>Complete los campos requeridos para registrar una nueva estaca.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Nombre */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                placeholder="Nombre del Stake"
                            />
                            <InputError message={errors.name} />
                        </div>

                        {/* País */}
                        <div className="grid gap-2">
                            <Label htmlFor="country_id">País</Label>
                            <Select value={data.country_id} onValueChange={(value) => setData('country_id', value)}>
                                <SelectTrigger id="country_id">
                                    <SelectValue placeholder="Seleccione un país" />
                                </SelectTrigger>
                                <SelectContent>
                                    {countries.map((country) => (
                                        <SelectItem key={country.id} value={String(country.id)}>
                                            {country.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.country_id} />
                        </div>

                        {/* Usuario */}
                        <div className="grid gap-2">
                            <Label htmlFor="user_id">Usuario</Label>
                            <Select value={data.user_id} onValueChange={(value) => setData('user_id', value)}>
                                <SelectTrigger id="user_id">
                                    <SelectValue placeholder="Seleccione un usuario" />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map((user) => (
                                        <SelectItem key={user.id} value={String(user.id)}>
                                            {user.firstname} {user.lastname}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.user_id} />
                        </div>

                        {/* Estado */}
                        <div className="grid gap-2">
                            <Label htmlFor="status">Estado</Label>
                            <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Seleccione un estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Activo</SelectItem>
                                    <SelectItem value="inactive">Inactivo</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} />
                        </div>
                    </div>

                    <DialogFooter className="mt-6 flex gap-4">
                        <Button type="button" variant="outline" disabled={processing} onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Crear Stake
                            {processing && <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    );
}
