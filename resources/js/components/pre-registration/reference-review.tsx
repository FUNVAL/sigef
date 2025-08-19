import React from 'react';
import { Label } from '../ui/label';
import { Reference, ReferenceUpdateFormData } from '../../types/reference';
import { useForm, usePage } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Enums } from '@/types/global';
import { Textarea } from '@headlessui/react';
import { LoaderCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { filterReferenceStatus } from '@/lib/utils';

interface ReferenceReviewProps {
    reference: Reference;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const ReferenceReview = ({ reference, open = false, onOpenChange }: ReferenceReviewProps) => {

    const { enums } = usePage<{ enums: Enums }>().props;
    const initialReferenceUpdateData: Required<ReferenceUpdateFormData> = {
        id: reference.id,
        status: reference.status.id,
        declined_reason: reference?.declined_reason?.id || 0,
        declined_description: reference.declined_description || '',
    };

    const { data, setData, patch, processing, errors, reset } = useForm<Required<ReferenceUpdateFormData>>(initialReferenceUpdateData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('references.update', reference.id), {
            onSuccess: () => {
                onOpenChange?.(false);
            },
            onError: (error) => {
                console.error('Error updating reference:', error);
            },
        });
    };

    const handleValueChange = (value: string) => {
        setData('status', Number(value));
        setData('declined_reason', 0);
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl grid gap-4 max-h-[88vh] overflow-y-auto">

                <DialogHeader>
                    <DialogTitle>Actualizar estado de referencia</DialogTitle>
                    <DialogDescription>
                        Aquí puedes actualizar el estado de la referencia y agregar comentarios adicionales.
                    </DialogDescription>
                </DialogHeader>

                <Card className="border-blue-200">
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                    Nombre del Candidato:
                                </Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{reference.name}</p>
                            </div>
                            <div>
                                <Label className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                    Teléfono:
                                </Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{reference.phone}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                    País:
                                </Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{reference.country?.name || 'No especificado'}</p>
                            </div>
                            <div>
                                <Label className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                    Estaca:
                                </Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{reference.stake?.name || 'No especificado'}</p>
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
                                Estado de la referencia
                            </Label>
                            <Select
                                value={data.status.toString()}
                                onValueChange={handleValueChange}
                            >
                                <SelectTrigger id="status" name="status">
                                    <SelectValue placeholder="Selecciona un estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0" disabled>Selecciona un estado</SelectItem>
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
                                Razón del Estado
                            </Label>
                            <Select
                                value={data.declined_reason.toString()}
                                onValueChange={(value) => setData('declined_reason', Number(value))}
                                disabled={data.status === 2}
                                required={data.status !== 2}
                            >
                                <SelectTrigger id="declined_reason" name="declined_reason">
                                    <SelectValue placeholder="Selecciona un motivo" defaultChecked />
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

                        <div className="space-y-2 pb-2">
                            <Label htmlFor="declined_description" className={`font-bold font-mono text-lg text-gray-800 dark:text-blue-100`}>
                                {data.status === 2 ? "Comentarios (opcional)" : "Comentarios"}
                            </Label>
                            <Textarea
                                id="declined_description"
                                name="declined_description"
                                placeholder="Escribe aquí tu comentario sobre el estado actual de la referencia..."
                                value={data.declined_description}
                                onChange={(e) => setData('declined_description', e.target.value)}
                                className="min-h-32 w-full outline-none border resize-none p-2 rounded-md disabled:opacity-50"
                                required={data.status !== 2}
                            />
                            {errors.declined_description && (
                                <p className="text-red-500 text-sm leading-0">{errors.declined_description}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <DialogFooter className="mt-2 gap-4 flex">
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

export default ReferenceReview;
