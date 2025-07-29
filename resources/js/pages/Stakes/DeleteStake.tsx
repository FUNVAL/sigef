import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Stake } from '@/types/stake';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

// Añade esta interfaz para el tipo de route
declare module '@inertiajs/react' {
    interface PageProps {
        route: (name: string, params?: any) => string;
    }
}

export function ToggleStakeStatus({ stake }: { stake: Stake }) {
    const [open, setOpen] = useState(false);
    const { patch, processing } = useForm();

    const handleToggleStatus = () => {
        const routeName = stake.status === 'active' ? 'stakes.deactivate' : 'stakes.activate';

        const routeParams = { stake: stake.id };

        patch(route(routeName, routeParams), {
            onSuccess: () => setOpen(false),
            preserveScroll: true,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="link"
                    className={`p-2 ${
                        stake.status === 'active' ? 'text-destructive-foreground hover:text-destructive' : 'text-green-600 hover:text-green-700'
                    }`}
                >
                    {stake.status === 'active' ? 'Desactivar' : 'Activar'}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>{stake.status === 'active' ? 'Desactivar Stake' : 'Activar Stake'}</DialogTitle>
                    <DialogDescription>
                        {stake.status === 'active'
                            ? `¿Estás seguro de desactivar "${stake.name}"? No será visible en las listas.`
                            : `¿Estás seguro de activar "${stake.name}"? Volverá a ser visible.`}
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-6 flex justify-end gap-4">
                    <Button type="button" variant="outline" disabled={processing} onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        variant={stake.status === 'active' ? 'destructive' : 'default'}
                        disabled={processing}
                        onClick={handleToggleStatus}
                    >
                        {processing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : stake.status === 'active' ? 'Desactivar' : 'Activar'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
