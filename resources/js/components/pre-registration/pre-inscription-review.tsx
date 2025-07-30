import React from 'react';
import { Label } from '../ui/label';
import { CompleteDialog } from '../ui/complete-dialog';
import { type PreInscription, type PreInscriptionUpdateFormData } from '../../types/pre-inscription';
import { useForm, usePage } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Enums } from '@/types/global';
import { Textarea } from '@headlessui/react';
import { Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

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
            contentClassName="md:max-w-3xl"
        >
            <div className="grid gap-6 p-4 max-h-[80vh] overflow-y-auto">
                {/* Información del Candidato (solo lectura) */}
                <Card className="border-blue-200">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-800 dark:text-blue-500">
                            Información del Candidato
                        </CardTitle>
                    </CardHeader>
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
                                Estado de la pre-inscripción
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
                            <Label htmlFor="comments" className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
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
                            <Label htmlFor="declined_description" className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
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
                    </CardContent>
                </Card>
            </div>
        </CompleteDialog>
    );
};

export default PreInscriptionReview;
