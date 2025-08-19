import { Enums } from '@/types/global';
import { Textarea } from '@headlessui/react';
import { LoaderCircle } from 'lucide-react';
import { useForm, usePage } from '@inertiajs/react';
import React from 'react';
import { type PreInscription, type PreInscriptionUpdateFormData } from '../../types/pre-inscription';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { filterReferenceStatus } from '@/lib/utils';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface PreInscriptionReviewProps {
    preInscription: PreInscription;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const PreInscriptionReview = ({ preInscription, open = false, onOpenChange }: PreInscriptionReviewProps) => {
    const { enums } = usePage<{ enums: Enums }>().props;
    const initialPreInscriptionUpdateData: Required<PreInscriptionUpdateFormData> = {
        id: preInscription.id,
        status: preInscription.status?.id || 1,
        declined_reason: preInscription?.declined_reason?.id || 0,
        declined_description: preInscription.declined_description || '',
        comments: preInscription.comments || '',
    };

    const { data, setData, put, processing, errors, reset } = useForm<Required<PreInscriptionUpdateFormData>>(initialPreInscriptionUpdateData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('pre-inscription.update', preInscription.id), {
            onSuccess: () => {
                onOpenChange?.(false);
            },
            onError: (errors) => {
                console.error('Error updating pre-inscription:', errors);
            },
        });
    };

    const handleValueChange = (value: string) => {
        setData('status', Number(value));
        setData('declined_reason', 0);
    }

    const fullName =
        `${preInscription.first_name} ${preInscription.middle_name || ''} ${preInscription.last_name} ${preInscription.second_last_name || ''}`.trim();
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="grid max-h-[88vh] gap-6 overflow-y-auto p-6 sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Actualizar estado de preinscripción</DialogTitle>
                    <DialogDescription>Aquí puedes actualizar el estado de la preinscripción y agregar comentarios adicionales.</DialogDescription>
                </DialogHeader>
                <Card className="border-blue-200">
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Nombre:</Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">
                                    {fullName}
                                </p>
                            </div>
                            <div>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                    Email:
                                </Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">
                                    {preInscription.email}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Teléfono:</Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">
                                    {preInscription.phone}
                                </p>
                            </div>
                            {preInscription.additional_phone ? (
                                <div>
                                    <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Teléfono adicional:</Label>
                                    <p className="block text-sm text-gray-900 dark:text-gray-100">
                                        {preInscription.additional_phone}
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Edad:</Label>
                                    <p className="block text-sm text-gray-900 dark:text-gray-100">
                                        {preInscription.age} años</p>
                                </div>
                            )}
                        </div>
                        {preInscription.additional_phone && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Edad:</Label>
                                    <p className="block text-sm text-gray-900 dark:text-gray-100">
                                        {preInscription.age} años</p>
                                </div>
                                <div></div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-blue-200">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-800 dark:text-blue-500">Actualización de Estado</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="status" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                Estado de la preinscripción
                            </Label>
                            <Select value={data.status.toString()} onValueChange={handleValueChange}>
                                <SelectTrigger id="status" name="status">
                                    <SelectValue placeholder="Selecciona un estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0" disabled>
                                        Selecciona un estado
                                    </SelectItem>
                                    {enums.requestStatus.map((status) => (
                                        <SelectItem key={status.id} value={status.id.toString()}>
                                            {status.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.status && <p className="text-sm text-red-500">
                                {errors.status}
                            </p>}
                        </div>

                        <div>
                            <Label htmlFor="declined_reason" className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                Razón del Estado
                            </Label>
                            <Select
                                value={data.declined_reason.toString()}
                                onValueChange={(value) => setData('declined_reason', Number(value))}
                                required={data.status !== 2}
                                disabled={data.status === 2}
                            >
                                <SelectTrigger id="declined_reason" name="declined_reason">
                                    <SelectValue placeholder="Selecciona un motivo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='0' disabled>Selecciona un motivo</SelectItem>
                                    {filterReferenceStatus(enums, data.status).map((status) => (
                                        <SelectItem key={status.id} value={status.id.toString()}>
                                            {status.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.declined_reason && <p className="text-sm text-red-500">
                                {errors.declined_reason}
                            </p>}
                        </div>

                        <div className="space-y-2 pb-2">
                            <Label htmlFor="declined_description" className={`font-bold font-mono text-lg text-gray-800 dark:text-blue-100`}>
                                {data.status === 2 ? "Comentarios (opcional)" : "Comentarios"}
                            </Label>
                            <Textarea
                                id="declined_description"
                                name="declined_description"
                                placeholder="Escribe aquí tu comentario sobre el estado actual de la referencia..."
                                value={data.declined_description}
                                required={data.status !== 2}
                                onChange={(e) => setData('declined_description', e.target.value)}
                                className="min-h-32 w-full resize-none rounded-md border p-2 outline-none disabled:opacity-50"
                            />
                            {errors.declined_description && <p className="text-sm text-red-500 leading-0">
                                {errors.declined_description}
                            </p>}
                        </div>
                    </CardContent>
                </Card>
                <DialogFooter className="mt-6 flex gap-4">
                    <Button type="button" variant="outline" disabled={processing} onClick={() => onOpenChange?.(false)}>
                        Cancelar
                    </Button>
                    <Button disabled={processing} onClick={handleSubmit}>
                        Actualizar
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PreInscriptionReview;
