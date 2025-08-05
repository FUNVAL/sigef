import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { STAKE_STATUS } from '@/lib/consts/stakeStatus';
import { Stake } from '@/types/stake';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export function DeleteStake({ stake, open, onOpenChange }: { stake: Stake; open: boolean; onOpenChange: (open: boolean) => void }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route('stakes.destroy', stake.id), {
            onSuccess: () => onOpenChange(false),
            preserveScroll: true,
        });
    };

    // No mostrar botón si ya está eliminado
    if (stake.status === STAKE_STATUS.DELETED) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Eliminar Stake</DialogTitle>
                    <DialogDescription>¿Estás seguro de eliminar "{stake.name}"? Esta acción marcará el stake como eliminado.</DialogDescription>
                </DialogHeader>
                <div className="mt-6 flex justify-end gap-4">
                    <Button type="button" variant="outline" disabled={processing} onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button type="button" variant="destructive" disabled={processing} onClick={handleDelete}>
                        {processing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : 'Eliminar'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
