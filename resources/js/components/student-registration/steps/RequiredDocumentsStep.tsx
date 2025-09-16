import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { Enums, Translation } from '@/types/global';
import { StudentRegistrationFormData, StudentRegistrationRequest } from '@/types/student-registration';
import { usePage } from '@inertiajs/react';
import { ArrowLeft, Camera, FileText, Upload } from 'lucide-react';
import { useContext, useState } from 'react';
import { StepsHeader } from '../../pre-registration/steps-header';

interface RequiredDocumentsStepProps {
    request: StudentRegistrationRequest;
}

export function RequiredDocumentsStep({ request }: RequiredDocumentsStepProps) {
    const { nextStep, previousStep } = useContext(StepperContext);
    const { data, setData } = request;
    const { enums } = usePage<{ enums: Enums }>().props;
    const { ui } = usePage<Translation>().props;
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validación básica
        const validationErrors: Record<string, string> = {};

        if (!data.document_type) validationErrors.document_type = 'El tipo de documento es obligatorio';
        if (!data.document_number?.trim()) validationErrors.document_number = 'El número de documento es obligatorio';
        if (!data.id_front_photo_file) validationErrors.id_front_photo_file = 'La foto frontal del ID es obligatoria';
        if (!data.id_back_photo_file) validationErrors.id_back_photo_file = 'La foto posterior del ID es obligatoria';
        if (!data.utility_bill_photo_file) validationErrors.utility_bill_photo_file = 'La foto del recibo de servicios es obligatoria';
        if (!data.formal_photo_file) validationErrors.formal_photo_file = 'La foto formal es obligatoria';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        nextStep();
    };

    const handleFileChange = (field: keyof StudentRegistrationFormData, file: File | null) => {
        setData(field, file);
    };

    const FileUploadField = ({
        label,
        field,
        accept = 'image/*',
        required = false,
        description,
    }: {
        label: string;
        field: keyof StudentRegistrationFormData;
        accept?: string;
        required?: boolean;
        description?: string;
    }) => {
        const file = data[field] as File | undefined;

        return (
            <div className="space-y-2">
                <Label htmlFor={field} className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    {label} {required && <span className="text-red-500">*</span>}
                </Label>
                {description && <p className="text-sm text-gray-600">{description}</p>}
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 transition-colors hover:border-[rgb(46_131_242_/_1)]">
                    <Input
                        id={field}
                        name={field}
                        type="file"
                        accept={accept}
                        onChange={(e) => {
                            const selectedFile = e.target.files?.[0] || null;
                            handleFileChange(field, selectedFile);
                        }}
                        className="cursor-pointer"
                        required={required}
                    />
                    {file && (
                        <div className="mt-2 rounded border border-green-200 bg-green-50 p-2 text-sm text-green-700">
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span>Archivo seleccionado: {file.name}</span>
                            </div>
                            <div className="mt-1 text-xs text-green-600">Tamaño: {(file.size / 1024 / 1024).toFixed(2)} MB</div>
                        </div>
                    )}
                </div>
                {errors[field] && <p className="text-sm text-red-500">{errors[field]}</p>}
            </div>
        );
    };

    return (
        <Card className="mx-auto w-full max-w-4xl overflow-hidden border-0 pt-0 shadow-2xl">
            <StepsHeader title="Documentos Requeridos" subtitle="Suba los documentos necesarios para completar su inscripción" />

            <CardContent className="space-y-6 p-3 sm:space-y-8 sm:p-6 md:p-8">
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    {/* Información del documento de identificación */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">Documento de Identificación</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Tipo de documento */}
                            <div>
                                <Label htmlFor="document_type">Tipo de Documento de Identificación *</Label>
                                <Select
                                    value={data.document_type?.toString() || ''}
                                    onValueChange={(value) => setData('document_type', Number(value))}
                                    name="document_type"
                                    required
                                >
                                    <SelectTrigger id="document_type">
                                        <SelectValue placeholder="Seleccione el tipo de documento" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {enums.documentType?.map((type) => (
                                            <SelectItem key={type.id} value={type.id.toString()}>
                                                {type.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.document_type && <p className="text-sm text-red-500">{errors.document_type}</p>}
                            </div>

                            {/* Número de documento */}
                            <div>
                                <Label htmlFor="document_number">Número de Documento de Identificación *</Label>
                                <Input
                                    id="document_number"
                                    name="document_number"
                                    value={data.document_number || ''}
                                    onChange={(e) => setData('document_number', e.target.value)}
                                    placeholder="Ingrese el número de su documento"
                                    required
                                />
                                {errors.document_number && <p className="text-sm text-red-500">{errors.document_number}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Fotos del documento */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <Camera className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">Fotos del Documento de Identificación</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FileUploadField
                                label="Foto Frontal de su ID"
                                field="id_front_photo_file"
                                accept="image/jpeg,image/png,image/jpg"
                                required={true}
                                description="Suba una foto clara del frente de su documento de identificación"
                            />

                            <FileUploadField
                                label="Foto de la Parte Posterior de su ID"
                                field="id_back_photo_file"
                                accept="image/jpeg,image/png,image/jpg"
                                required={true}
                                description="Suba una foto clara del reverso de su documento de identificación"
                            />
                        </div>
                    </div>

                    {/* Documentos adicionales */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">Documentos Adicionales</h3>
                        </div>

                        <div className="space-y-6">
                            <FileUploadField
                                label="Licencia de Conducir de Vehículo"
                                field="driver_license_file"
                                accept="image/jpeg,image/png,image/jpg"
                                required={false}
                                description="Suba una foto de su licencia de conducir (opcional)"
                            />

                            <FileUploadField
                                label="Recibo/Planilla de Servicios Públicos"
                                field="utility_bill_photo_file"
                                accept="image/jpeg,image/png,image/jpg"
                                required={true}
                                description="Suba una foto de un recibo reciente de servicios públicos (Internet, Agua, Luz o Teléfono)"
                            />

                            <FileUploadField
                                label="Foto Formal con Fondo Blanco"
                                field="formal_photo_file"
                                accept="image/jpeg,image/png,image/jpg"
                                required={true}
                                description="Tómese una foto con ropa formal y fondo blanco (se utilizará para su diploma de graduación)"
                            />
                        </div>
                    </div>

                    {/* Nota informativa */}
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                <span className="text-xs font-bold text-white">i</span>
                            </div>
                            <div>
                                <h4 className="mb-2 font-semibold text-blue-900">Importante:</h4>
                                <ul className="space-y-1 text-sm text-blue-800">
                                    <li>• Todos los archivos deben ser imágenes (JPEG, PNG, JPG)</li>
                                    <li>• El tamaño máximo por archivo es de 5MB</li>
                                    <li>• Asegúrese de que las fotos sean claras y legibles</li>
                                    <li>• La foto formal debe tener fondo blanco y vestimenta apropiada</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-between pt-4">
                        <Button type="button" onClick={previousStep} variant="outline" size="lg" className="min-w-[120px]">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {ui.buttons.previous || 'Anterior'}
                        </Button>

                        <Button
                            type="submit"
                            size="lg"
                            className="min-w-[140px] bg-[rgb(46_131_242_/1)] text-white transition-colors hover:bg-[rgb(46_131_242/_1)]/90"
                        >
                            {ui.buttons.continue || 'Continuar'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
