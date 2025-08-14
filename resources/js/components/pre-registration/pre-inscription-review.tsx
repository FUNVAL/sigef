import { Enums } from '@/types/global';
import { Textarea } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React from 'react';
import { type PreInscription, type PreInscriptionUpdateFormData } from '../../types/pre-inscription';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
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
        declined_reason: preInscription?.declined_reason?.id || 1,
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
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{fullName}</p>
                            </div>
                            <div>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Email:</Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{preInscription.email}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Teléfono:</Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{preInscription.phone}</p>
                            </div>
                            {preInscription.additional_phone ? (
                                <div>
                                    <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Teléfono adicional:</Label>
                                    <p className="block text-sm text-gray-900 dark:text-gray-100">{preInscription.additional_phone}</p>
                                </div>
                            ) : (
                                <div>
                                    <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Edad:</Label>
                                    <p className="block text-sm text-gray-900 dark:text-gray-100">{preInscription.age} años</p>
                                </div>
                            )}
                        </div>
                        {preInscription.additional_phone && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Edad:</Label>
                                    <p className="block text-sm text-gray-900 dark:text-gray-100">{preInscription.age} años</p>
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
                            <Select value={data.status.toString()} onValueChange={(value) => setData('status', Number(value))}>
                                <SelectTrigger id="status" name="status">
                                    <SelectValue placeholder="Selecciona un estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0" disabled>
                                        Selecciona un status
                                    </SelectItem>
                                    {enums.requestStatus.map((status) => (
                                        <SelectItem key={status.id} value={status.id.toString()}>
                                            {status.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                        </div>

                        <div>
                            <Label htmlFor="declined_reason" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                Razón de rechazo
                            </Label>
                            <Select
                                value={data.declined_reason.toString()}
                                onValueChange={(value) => setData('declined_reason', Number(value))}
                                disabled={data.status !== 3}
                                required={data.status === 3}
                            >
                                <SelectTrigger id="declined_reason" name="declined_reason">
                                    <SelectValue placeholder="Razón de rechazo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0" disabled>
                                        Selecciona una razón
                                    </SelectItem>
                                    {enums.referenceStatus.map((status) => (
                                        <SelectItem key={status.id} value={status.id.toString()}>
                                            {status.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.declined_reason && <p className="text-sm text-red-500">{errors.declined_reason}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="comments"
                                className={`font-mono text-lg font-bold ${data.status !== 3 ? 'text-gray-800/50 dark:text-blue-100/50' : 'text-gray-800 dark:text-blue-100'}`}
                            >
                                Comentarios generales
                            </Label>
                            <Textarea
                                id="comments"
                                name="comments"
                                placeholder="Agrega comentarios sobre la evaluación, próximos pasos, observaciones, etc."
                                value={data.comments}
                                required={data.status === 3}
                                disabled={data.status !== 3}
                                onChange={(e) => setData('comments', e.target.value)}
                                className="min-h-32 w-full resize-none rounded-md border p-2 outline-none disabled:opacity-50"
                            />
                            {errors.comments && <p className="text-sm text-red-500">{errors.comments}</p>}
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
