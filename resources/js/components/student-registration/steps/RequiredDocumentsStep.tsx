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
import { useContext, useEffect, useState } from 'react';
import { CameraCaptureDialog } from '../../../lib/camera';
import { StepsHeader } from '../../pre-registration/steps-header';

interface RequiredDocumentsStepProps {
    request: StudentRegistrationRequest;
}

export function RequiredDocumentsStep({ request }: RequiredDocumentsStepProps) {
    const { nextStep, previousStep } = useContext(StepperContext);
    const { data, setData } = request;
    const { enums, translations } = usePage<{ enums: Enums; translations: Translation }>().props;
    const { ui } = usePage<Translation>().props;
    const t = translations.student_registration;
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

    // Limpiar URLs de objetos cuando el componente se desmonte
    useEffect(() => {
        return () => {
            Object.values(imageUrls).forEach((url) => {
                if (url) URL.revokeObjectURL(url);
            });
        };
    }, []); // Dependencias vacías para que solo se ejecute al desmontar

    // Recrear URLs de vista previa al montar el componente
    useEffect(() => {
        const fileFields = ['id_front_photo_file', 'id_back_photo_file', 'driver_license_file', 'utility_bill_photo_file', 'formal_photo_file'];

        const newImageUrls: Record<string, string> = {};

        fileFields.forEach((field) => {
            const file = data[field] as File | undefined;
            if (file && file.type.startsWith('image/')) {
                newImageUrls[field] = URL.createObjectURL(file);
            }
        });

        setImageUrls(newImageUrls);

        // Cleanup function para las URLs creadas en este efecto
        return () => {
            Object.values(newImageUrls).forEach((url) => {
                URL.revokeObjectURL(url);
            });
        };
    }, []); // Solo se ejecuta al montar el componente

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validación básica
        const validationErrors: Record<string, string> = {};

        if (!data.document_type) validationErrors.document_type = t.validation.document_type_required;
        if (!data.document_number?.trim()) validationErrors.document_number = t.validation.document_number_required;
        if (!data.id_front_photo_file) validationErrors.id_front_photo_file = t.validation.id_front_photo_required;
        if (!data.id_back_photo_file) validationErrors.id_back_photo_file = t.validation.id_back_photo_required;
        if (!data.utility_bill_photo_file) validationErrors.utility_bill_photo_file = t.validation.utility_bill_photo_required;
        if (!data.formal_photo_file) validationErrors.formal_photo_file = t.validation.formal_photo_required;

        // Validación de licencia de conducir
        if (data.has_driver_license === undefined) {
            validationErrors.has_driver_license = 'Debe especificar si cuenta con licencia de conducir';
        }
        // La licencia es opcional, por lo que no validamos si está presente

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        nextStep();
    };

    const handleFileChange = (field: keyof StudentRegistrationFormData, file: File | null) => {
        // Limpiar URL anterior si existe
        const previousUrl = imageUrls[field];
        if (previousUrl) {
            URL.revokeObjectURL(previousUrl);
        }

        setData(field, file);

        // Limpiar el error cuando se selecciona un archivo
        if (file && errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }

        // Generar URL para la vista previa
        if (file && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setImageUrls((prev) => ({ ...prev, [field]: url }));
        } else {
            setImageUrls((prev) => {
                const newUrls = { ...prev };
                delete newUrls[field];
                return newUrls;
            });
        }
    };

    const FileUploadField = ({
        label,
        field,
        accept = 'image/*',
        required = false,
        description,
    }: {
        label: string;
        field: string;
        accept?: string;
        required?: boolean;
        description?: string;
    }) => {
        const file = data[field] as File | undefined;
        const imageUrl = imageUrls[field];

        const [isCameraOpen, setIsCameraOpen] = useState(false);

        return (
            <div className="space-y-2">
                <Label htmlFor={field} className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    {label} {required && <span className="text-red-500">*</span>}
                </Label>
                {description && <p className="text-sm text-gray-600">{description}</p>}

                {!file ? (
                    // Estado sin archivo - mostrar opciones de subida
                    <div className="space-y-3">
                        {/* Área de drop para archivos */}
                        <div className="relative rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-[rgb(46_131_242_/_1)] hover:bg-gray-50">
                            <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-700">Haga clic para seleccionar archivo</p>
                                <p className="text-xs text-gray-500">PNG, JPG hasta 5MB</p>
                            </div>
                            <Input
                                id={field}
                                name={field}
                                type="file"
                                accept={accept}
                                onChange={(e) => {
                                    const selectedFile = e.target.files?.[0] || null;
                                    handleFileChange(field, selectedFile);
                                }}
                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                required={required}
                            />
                        </div>

                        {/* Separador */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">O</span>
                            </div>
                        </div>

                        {/* Botón de cámara */}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsCameraOpen(true)}
                            className="w-full border-[rgb(46_131_242_/_1)] text-[rgb(46_131_242_/_1)] hover:bg-[rgb(46_131_242_/_1)] hover:text-white"
                        >
                            <Camera className="mr-2 h-4 w-4" />
                            Tomar Foto con Cámara
                        </Button>
                    </div>
                ) : (
                    // Estado con archivo - mostrar miniatura y detalles
                    <div className="space-y-3 rounded-lg border border-green-200 bg-green-50 p-4">
                        <div className="flex flex-col items-start gap-4 md:flex-row">
                            {/* Miniatura */}
                            {imageUrl && (
                                <div className="w-full flex-shrink-0 md:w-auto">
                                    <img
                                        src={imageUrl}
                                        alt={`Vista previa de ${label}`}
                                        className="mx-auto h-32 w-full rounded-lg border border-green-300 object-cover md:mx-0 md:h-32 md:w-32"
                                    />
                                </div>
                            )}

                            {/* Información del archivo */}
                            <div className="min-w-0 flex-1">
                                <div className="mb-2 flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-green-600" />
                                    <span className="text-sm font-medium text-green-800">Archivo seleccionado</span>
                                </div>
                                <p className="mb-2 truncate text-sm text-green-700" title={file.name}>
                                    <strong>Nombre:</strong> {file.name}
                                </p>
                                <p className="mb-3 text-xs text-green-600">
                                    <strong>Tamaño:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>

                                {/* Botón para cambiar archivo */}
                                <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100">
                                    <Upload className="h-4 w-4" />
                                    Cambiar archivo
                                    <Input
                                        type="file"
                                        accept={accept}
                                        onChange={(e) => {
                                            const selectedFile = e.target.files?.[0] || null;
                                            handleFileChange(field, selectedFile);
                                        }}
                                        className="sr-only"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {errors[field] && <p className="text-sm text-red-500">{errors[field]}</p>}

                {/* Dialog de captura de cámara */}
                <CameraCaptureDialog
                    isOpen={isCameraOpen}
                    onClose={() => setIsCameraOpen(false)}
                    onCapture={(capturedFile: File) => {
                        handleFileChange(field, capturedFile);
                        setIsCameraOpen(false);
                    }}
                />
            </div>
        );
    };

    return (
        <Card className="mx-auto w-full max-w-4xl overflow-hidden border-0 pt-0 shadow-2xl">
            <StepsHeader title={t.steps.required_documents.title} subtitle={t.steps.required_documents.subtitle} />

            <CardContent className="space-y-6 p-3 sm:space-y-8 sm:p-6 md:p-8">
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    {/* Información del documento de identificación */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">{t.sections.document_info}</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Tipo de documento */}
                            <div>
                                <Label htmlFor="document_type">{t.fields.document_type} </Label>
                                <Select
                                    value={data.document_type?.toString() || ''}
                                    onValueChange={(value) => setData('document_type', Number(value))}
                                    name="document_type"
                                    required
                                >
                                    <SelectTrigger id="document_type">
                                        <SelectValue placeholder={t.placeholders.select_document_type} />
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
                                <Label htmlFor="document_number">{t.fields.document_number} </Label>
                                <Input
                                    id="document_number"
                                    name="document_number"
                                    value={data.document_number || ''}
                                    onChange={(e) => setData('document_number', e.target.value)}
                                    placeholder={t.placeholders.document_number}
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
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">{t.sections.document_photos}</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FileUploadField
                                label={t.fields.id_front_photo}
                                field="id_front_photo_file"
                                accept="image/jpeg,image/png,image/jpg"
                                required={true}
                                description={t.placeholders.upload_id_front}
                            />

                            <FileUploadField
                                label={t.fields.id_back_photo}
                                field="id_back_photo_file"
                                accept="image/jpeg,image/png,image/jpg"
                                required={true}
                                description={t.placeholders.upload_id_back}
                            />
                        </div>
                    </div>

                    {/* Documentos adicionales */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">{t.sections.additional_documents}</h3>
                        </div>

                        <div className="space-y-6">
                            {/* Pregunta sobre licencia de conducir */}
                            <div className="space-y-3">
                                <Label className="text-base font-semibold text-gray-900">
                                    ¿Cuenta con licencia de conducir? <span className="text-red-500">*</span>
                                </Label>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 has-[:checked]:border-[rgb(46_131_242_/_1)] has-[:checked]:bg-blue-50">
                                        <input
                                            type="radio"
                                            name="has_driver_license"
                                            value="true"
                                            checked={data.has_driver_license === true}
                                            onChange={() => setData('has_driver_license', true)}
                                            className="text-[rgb(46_131_242_/_1)] focus:ring-[rgb(46_131_242_/_1)]"
                                        />
                                        <span className="text-sm font-medium">Sí</span>
                                    </label>
                                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 has-[:checked]:border-[rgb(46_131_242_/_1)] has-[:checked]:bg-blue-50">
                                        <input
                                            type="radio"
                                            name="has_driver_license"
                                            value="false"
                                            checked={data.has_driver_license === false}
                                            onChange={() => setData('has_driver_license', false)}
                                            className="text-[rgb(46_131_242_/_1)] focus:ring-[rgb(46_131_242_/_1)]"
                                        />
                                        <span className="text-sm font-medium">No</span>
                                    </label>
                                </div>
                                {errors?.has_driver_license && <p className="text-sm text-red-500">{errors.has_driver_license}</p>}
                            </div>

                            {/* Upload de licencia de conducir - solo si tiene licencia */}
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                    data.has_driver_license
                                        ? 'max-h-96 translate-y-0 transform opacity-100'
                                        : 'max-h-0 -translate-y-4 transform opacity-0'
                                }`}
                            >
                                <div className="space-y-4 rounded-lg border-t border-blue-200 bg-blue-50 p-4 pt-4">
                                    <div className="mb-3 flex items-center gap-2">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                                            <span className="text-xs font-bold text-white">!</span>
                                        </div>
                                        <p className="text-sm font-medium text-blue-800">
                                            Puede subir una foto de su licencia de conducir (opcional)
                                        </p>
                                    </div>
                                    <FileUploadField
                                        label={t.fields.driver_license}
                                        field="driver_license_file"
                                        accept="image/jpeg,image/png,image/jpg"
                                        required={false}
                                        description={t.placeholders.upload_driver_license}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                <FileUploadField
                                    label={t.fields.utility_bill_photo}
                                    field="utility_bill_photo_file"
                                    accept="image/jpeg,image/png,image/jpg"
                                    required={true}
                                    description={t.placeholders.upload_utility_bill}
                                />

                                <FileUploadField
                                    label={t.fields.formal_photo}
                                    field="formal_photo_file"
                                    accept="image/jpeg,image/png,image/jpg"
                                    required={true}
                                    description={t.placeholders.upload_formal_photo}
                                />
                            </div>
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
                                    <li>• {t.info_text.upload_requirements}</li>
                                    <li>• {t.info_text.document_security}</li>
                                    <li>• {t.info_text.formal_photo_requirements}</li>
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
