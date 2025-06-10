import React from 'react';
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
} from "@/components/ui/dialog";
import { useForm } from '@inertiajs/react';
import { CreateRoleForm } from '@/types/roles';
import { LoaderCircle } from 'lucide-react';
interface NewRoleDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    newRoleName: string;
    setNewRoleName: (name: string) => void;
    newRoleDescription: string;
    setNewRoleDescription: (description: string) => void;
    createNewRole: () => void;
}

const NewRoleDialog: React.FC<NewRoleDialogProps> = ({
    isOpen,
    setIsOpen,
}) => {

    const { data, setData, post, processing, errors, reset } = useForm<Required<CreateRoleForm>>({
        name: '',
        description: '',
    });

    async function handleCreateRole(e: React.FormEvent) {
        e.preventDefault();
        post(route('access.store'), {
            onSuccess: () => {
                reset();
                setIsOpen(false);
            },
            onError: (err) => {
                console.error(err);
            },
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear Nuevo Rol</DialogTitle>
                    <DialogDescription>
                        Define un nuevo rol para gestionar permisos y asignaciones de usuarios.
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={handleCreateRole}>
                    <div className="grid gap-2">
                        <Label htmlFor="roleName">Nombre del Rol</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            placeholder="ej. Administrador de Marketing"
                            className="col-span-3"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="roleDescription">Descripción</Label>
                        <Input
                            id="description"
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            placeholder="ej. Responsable de la estrategia de marketing"
                            className="col-span-3"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" className='cursor-pointer' disabled={processing} onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing} className='cursor-pointer'>
                            Create Role
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NewRoleDialog;
