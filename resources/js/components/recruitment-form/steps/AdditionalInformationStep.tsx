import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { RecruitmentRequest } from '@/types/recruitment';
import { ArrowLeft, Calendar, Camera } from 'lucide-react';
import { useContext, useState } from 'react';
import { StepsHeader } from '../../pre-registration/steps-header';

interface AdditionalInformationStepProps {
    request: RecruitmentRequest;
}

export function AdditionalInformationStep({ request }: AdditionalInformationStepProps) {
    const { nextStep, previousStep } = useContext(StepperContext);
    const { data, setData } = request;
    const [errors, setErrors] = useState<Record<string, string>>({});

    const months = [
        { value: 1, label: 'Enero' },
        { value: 2, label: 'Febrero' },
        { value: 3, label: 'Marzo' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Mayo' },
        { value: 6, label: 'Junio' },
        { value: 7, label: 'Julio' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Septiembre' },
        { value: 10, label: 'Octubre' },
        { value: 11, label: 'Noviembre' },
        { value: 12, label: 'Diciembre' }
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                setErrors({ ...errors, interview_photo: 'Solo se permiten archivos JPG, JPEG o PNG' });
                return;
            }

            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                setErrors({ ...errors, interview_photo: 'El archivo no debe superar los 2MB' });
                return;
            }

            setData('interview_photo', file);
            setErrors({ ...errors, interview_photo: '' });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validación básica
        const validationErrors: Record<string, string> = {};

        if (!data.start_month) {
            validationErrors.start_month = 'Debe seleccionar el mes de inicio';
        }

        if (!data.start_year) {
            validationErrors.start_year = 'Debe seleccionar el año de inicio';
        }

        if (!data.interview_photo) {
            validationErrors.interview_photo = 'Debe subir la foto de entrevista';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        nextStep();
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6 p-4">
            <StepsHeader
                title="Información Adicional"
                subtitle="Complete la información final para su aplicación"
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Fecha de inicio */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Fecha de inicio preferida
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="start_month">Mes de inicio</Label>
                                <Select
                                    value={data.start_month.toString()}
                                    onValueChange={(value) => setData('start_month', parseInt(value))}
                                >
                                    <SelectTrigger className={errors.start_month ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Seleccionar mes" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {months.map(month => (
                                            <SelectItem key={month.value} value={month.value.toString()}>
                                                {month.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.start_month && (
                                    <p className="text-sm text-red-500 mt-1">{errors.start_month}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="start_year">Año</Label>
                                <Select
                                    value={data.start_year.toString()}
                                    onValueChange={(value) => setData('start_year', parseInt(value))}
                                >
                                    <SelectTrigger className={errors.start_year ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Seleccionar año" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {years.map(year => (
                                            <SelectItem key={year} value={year.toString()}>
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.start_year && (
                                    <p className="text-sm text-red-500 mt-1">{errors.start_year}</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Foto de entrevista */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Camera className="h-5 w-5" />
                            Foto de entrevista
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="interview_photo">
                                    Sube tu foto de entrevista (JPG, PNG, máximo 2MB)
                                </Label>
                                <Input
                                    id="interview_photo"
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png"
                                    onChange={handleFileChange}
                                    className={errors.interview_photo ? 'border-red-500' : ''}
                                />
                                {errors.interview_photo && (
                                    <p className="text-sm text-red-500 mt-1">{errors.interview_photo}</p>
                                )}
                            </div>

                            {data.interview_photo && (
                                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <Camera className="h-4 w-4 text-green-600" />
                                    <span className="text-sm text-green-700">
                                        Archivo seleccionado: {data.interview_photo.name}
                                    </span>
                                </div>
                            )}

                            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                <p className="font-medium mb-2">Recomendaciones para la foto:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Usar vestimenta formal y apropiada</li>
                                    <li>Fondo neutro y buena iluminación</li>
                                    <li>Foto reciente (máximo 6 meses)</li>
                                    <li>Rostro claramente visible, sin lentes oscuros</li>
                                    <li>Formato vertical (tipo documento)</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={previousStep}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Anterior
                    </Button>
                    <Button type="submit" size="lg">
                        Siguiente
                    </Button>
                </div>
            </form>
        </div>
    );
}