import React from 'react';
import { Label } from '../ui/label';
import { type PreInscription, type PreInscriptionUpdateFormData } from '../../types/pre-inscription';
import { useForm, usePage } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Enums } from '@/types/global';
import { Textarea } from '@headlessui/react';
import { LoaderCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { filterReferenceStatus } from '@/lib/utils';

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
        });
    };

    const fullName = `${preInscription.first_name} ${preInscription.middle_name || ''} ${preInscription.last_name} ${preInscription.second_last_name || ''}`.trim();
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>


            <DialogContent className="grid gap-6 p-6 max-h-[88vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Actualizar estado de preinscripción</DialogTitle>
                    <DialogDescription>
                        Aquí puedes actualizar el estado de la preinscripción y agregar comentarios adicionales.
                    </DialogDescription>
                </DialogHeader>
                <Card className="border-blue-200">

                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                    Nombre:
                                </Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{fullName}</p>
                            </div>
                            <div>
                                <Label className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                    Email:
                                </Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{preInscription.email}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                    Teléfono:
                                </Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{preInscription.phone}</p>
                            </div>
                            <div>
                                <Label className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                    Edad:
                                </Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{preInscription.age} años</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-blue-200">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-800 dark:text-blue-500">
                            Actualización de Estado
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="status" className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                Estado de la preinscripción
                            </Label>
                            <Select
                                value={data.status.toString()}
                                onValueChange={(value) => setData('status', Number(value))}
                            >
                                <SelectTrigger id="status" name="status">
                                    <SelectValue placeholder="Selecciona un estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0" disabled>Selecciona un status</SelectItem>
                                    {enums.requestStatus.map((status) => (
                                        <SelectItem key={status.id} value={status.id.toString()}>
                                            {status.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                        </div>

                        <div>
                            <Label htmlFor="declined_reason" className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                Razón del estado de la preinscripción
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
                            {errors.declined_reason && <p className="text-red-500 text-sm">{errors.declined_reason}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="comments" className={`font-bold font-mono text-lg text-gray-800 dark:text-blue-100`}>
                                {data.status === 2 ? "Comentarios (opcional)" : "Comentarios"}
                            </Label>
                            <Textarea
                                id="comments"
                                name="comments"
                                placeholder="Escribe aquí tu comentario sobre el estado actual de la referencia..."
                                value={data.comments}
                                required={data.status !== 2}
                                onChange={(e) => setData('comments', e.target.value)}
                                className="min-h-32 w-full outline-none border resize-none p-2 rounded-md disabled:opacity-50"
                            />
                            {errors.comments && (
                                <p className="text-red-500 text-sm">{errors.comments}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
                <DialogFooter className="mt-6 gap-4 flex">
                    <Button type="button" variant="outline" disabled={processing} onClick={() => onOpenChange?.(false)}>
                        Cancelar
                    </Button>
                    <Button disabled={processing} onClick={handleSubmit} >
                        Actualizar
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};



export default PreInscriptionReview;
