import React from 'react';
import { Label } from '../ui/label';
import { CompleteDialog } from '../ui/complete-dialog';
import { type PreInscription, type PreInscriptionUpdateFormData } from '../../types/pre-inscription';
import { useForm, usePage } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Enums } from '@/types/global';
import { Textarea } from '@headlessui/react';
import { Edit } from 'lucide-react';

const PreInscriptionReview = ({ preInscription }: { preInscription: PreInscription }) => {
    const { enums } = usePage<{ enums: Enums }>().props;
    const initialPreInscriptionUpdateData: Required<PreInscriptionUpdateFormData> = {
        id: preInscription.id,
        status: preInscription.status?.id || 1,
        declined_reason: preInscription?.declined_reason?.id || 1,
        declined_description: preInscription.declined_description || '',
        comments: preInscription.comments || '',
    };

    const { data, setData, put, processing, errors, reset } = useForm<Required<PreInscriptionUpdateFormData>>(initialPreInscriptionUpdateData);

    const handleSubmit = async () => {
        return new Promise<void>((resolve, reject) => {
            put(route('pre-inscription.update', preInscription.id), {
                onSuccess: () => {
                    reset();
                    resolve();
                },
                onError: (errors) => {
                    console.error('Error updating pre-inscription:', errors);
                    reject(new Error('Error al actualizar la pre-inscripción'));
                },
            });
        });
    };

    const handleSuccess = () => {
        // Opcional: agregar cualquier lógica adicional después del éxito
        console.log('Pre-inscripción actualizada exitosamente');
    };

    const fullName = `${preInscription.first_name} ${preInscription.middle_name || ''} ${preInscription.last_name} ${preInscription.second_last_name || ''}`.trim();

    return (
        <CompleteDialog
            btnLabel="Actualizar Estado"
            dialogTitle="Revisar Pre-inscripción"
            dialogDescription={`Revisa y actualiza el estado de la pre-inscripción de ${fullName}.`}
            icon={<Edit className="h-4 w-4" />}
            onSubmit={handleSubmit}
            isSubmitting={processing}
            onSuccess={handleSuccess}
        >
            <div className="grid gap-6 py-4 max-h-[80vh] overflow-y-auto">
                {/* Información del Candidato (solo lectura) */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Información del Candidato</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-medium text-gray-600 dark:text-gray-300">Nombre:</span>
                            <p className="text-gray-900 dark:text-gray-100">{fullName}</p>
                        </div>
                        <div>
                            <span className="font-medium text-gray-600 dark:text-gray-300">Email:</span>
                            <p className="text-gray-900 dark:text-gray-100">{preInscription.email}</p>
                        </div>
                        <div>
                            <span className="font-medium text-gray-600 dark:text-gray-300">Teléfono:</span>
                            <p className="text-gray-900 dark:text-gray-100">{preInscription.phone}</p>
                        </div>
                        <div>
                            <span className="font-medium text-gray-600 dark:text-gray-300">Edad:</span>
                            <p className="text-gray-900 dark:text-gray-100">{preInscription.age} años</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 py-4">
                    <div>
                        <Label htmlFor="status">Estado de la pre-inscripción</Label>
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
                        <Label htmlFor="comments" className="text-sm font-medium">
                            Comentarios generales
                        </Label>
                        <Textarea
                            id="comments"
                            name="comments"
                            placeholder="Agrega comentarios sobre la evaluación, próximos pasos, observaciones, etc."
                            value={data.comments}
                            onChange={(e) => setData('comments', e.target.value)}
                            className="min-h-32 w-full outline-none border resize-none p-2 rounded-md"
                        />
                        {errors.comments && (
                            <p className="text-red-500 text-sm">{errors.comments}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="declined_description" className="text-sm font-medium">
                            {data.status === 3 ? "Descripción del rechazo (requerido)" : "Descripción adicional (opcional)"}
                        </Label>
                        <Textarea
                            id="declined_description"
                            name="declined_description"
                            placeholder={
                                data.status === 1
                                    ? "Describe el proceso de evaluación, documentos recibidos, etc."
                                    : data.status === 2
                                        ? "Describe los próximos pasos, fecha de inicio, documentos requeridos, etc."
                                        : data.status === 3
                                            ? "Proporciona detalles específicos sobre el motivo del rechazo..."
                                            : "Agrega cualquier descripción relevante..."
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

export default PreInscriptionReview;
