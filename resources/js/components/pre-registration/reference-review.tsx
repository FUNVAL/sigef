import React from 'react';
import { Label } from '../ui/label';
import { CompleteDialog } from '../ui/complete-dialog';
import { Reference, ReferenceUpdateFormData } from '../../types/reference';
import { useForm, usePage } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Enums } from '@/types/global';
import { Textarea } from '@headlessui/react';
import { Edit } from 'lucide-react';

const ReferenceReview = ({ reference }: { reference: Reference }) => {
    const { enums } = usePage<{ enums: Enums }>().props;
    const initialReferenceUpdateData = {
        id: reference.id,
        status: reference.status.id,
        declined_reason: reference?.declined_reason?.id || 1,
        declined_description: reference.declined_description || '',
    };

    const { data, setData, patch, processing, errors, reset } = useForm<Required<ReferenceUpdateFormData>>(initialReferenceUpdateData);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        return new Promise<void>((resolve, reject) => {
            patch(route('references.update', reference.id), {
                onSuccess: () => {
                    reset();
                    resolve();
                },
                onError: (errors) => {
                    console.error('Error updating reference:', errors);
                    reject(new Error('Error al actualizar la referencia'));
                },
            });
        });
    };

    const handleSuccess = () => {
        // Opcional: agregar cualquier lógica adicional después del éxito
        console.log('Referencia actualizada exitosamente');
    };

    return (
        <CompleteDialog
            btnLabel="Actualizar Estado"
            dialogTitle="Detalles de la Referencia"
            dialogDescription="Aquí puedes ver los detalles completos de la referencia seleccionada."
            icon={<Edit className="h-4 w-4" />}
            onSubmit={handleSubmit}
            isSubmitting={processing}
            onSuccess={handleSuccess}
        >
            <div className="grid gap-6 py-4 max-h-[80vh] overflow-y-auto">
                <div className="grid gap-4 py-4">
                    <div>
                        <Label htmlFor="status">Estado de la referencia</Label>
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
                        <Label htmlFor="declined_reason">Razón de rechazo</Label>
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
                                <SelectItem value="0" disabled>Selecciona una razón</SelectItem>
                                {enums.referenceStatus.map((status) => (
                                    <SelectItem key={status.id} value={status.id.toString()}>
                                        {status.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.declined_reason && <p className="text-red-500 text-sm">{errors.declined_reason}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="declined_description" className="text-sm font-medium">
                            {data.status === 3 ? "Comentarios" : "Comentarios (opcional)"}
                        </Label>
                        <Textarea
                            id="declined_description"
                            name="declined_description"
                            placeholder={
                                data.status === 1
                                    ? "Describe cómo fue el contacto, el interés mostrado, próximos pasos, etc."
                                    : data.status === 3
                                        ? "Proporciona detalles adicionales sobre el rechazo..."
                                        : "Agrega cualquier comentario relevante..."
                            }
                            value={data.declined_description}
                            onChange={(e) => setData('declined_description', e.target.value)}
                            className="min-h-40 w-full outline-none border resize-none p-2 rounded-md"
                            required={data.status === 3}
                        />
                        {errors.declined_description && (
                            <p className="text-red-500 text-sm">{errors.declined_description}</p>
                        )}
                    </div>
                </div>
            </div>
        </CompleteDialog>
    );
};

export default ReferenceReview;
