import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Country } from '@/types/country';
import { Enums } from '@/types/global';
import { Stake } from '@/types/stake';
import { User } from '@/types/users';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

interface EditStakeProps {
    stake: Stake;
    countries: Country[];
    users: User[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditStake({ stake, countries, users, open, onOpenChange }: EditStakeProps) {
    const { enums } = usePage<{ enums: Enums }>().props;
    const { data, setData, put, processing, reset, errors } = useForm({
        name: stake.name,
        country_id: String(stake.country_id),
        user_id: stake.user_id ? String(stake.user_id) : '',
        status: stake.status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('stakes.update', stake.id), {
            onSuccess: () => {
                onOpenChange(false);
                reset();
            },
            preserveScroll: true,
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Editar Estaca</DialogTitle>
                    <DialogDescription>Modifique los campos que desea actualizar.</DialogDescription>
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
                                placeholder="Nombre de la estaca"
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
                            <Label htmlFor="user_id">Cambiar Responsable</Label>
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

                        {/* Estado - Solo permitir cambio entre active/inactive */}
                        <div className="grid gap-2">
                            <Label htmlFor="status">Estado</Label>
                            <Select value={String(data.status)} onValueChange={(value) => setData('status', parseInt(value, 10))}>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Seleccione un estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    {enums.statusEnum
                                        .filter((status) => status.id !== 3) // Excluir "Eliminado" (id: 3) en edición
                                        .map((status) => (
                                            <SelectItem key={status.id} value={String(status.id)}>
                                                {status.name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} />
                        </div>
                    </div>

                    <DialogFooter className="mt-6 flex gap-4">
                        <Button type="button" variant="outline" disabled={processing} onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Guardar cambios
                            {processing && <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
