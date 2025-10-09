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

export interface MonthOption {
    value: number;
    label: string;
}

export function getMonthOptions(): MonthOption[] {
    return [
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
        { value: 12, label: 'Diciembre' },
    ];
}

export function AdditionalInformationStep({ request }: AdditionalInformationStepProps) {
    const { nextStep, previousStep } = useContext(StepperContext);
    const { data, setData } = request;
    const [errors, setErrors] = useState<Record<string, string>>({});

    const months = getMonthOptions();

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
                        <CardTitle className="flex items-center gap-2 text-[rgb(46_131_242_/_1)]">
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
                                        {months.map((month: { value: number; label: string }) => (
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
                        <CardTitle className="flex items-center gap-2 text-[rgb(46_131_242_/_1)]">
                            <Camera className="h-5 w-5" />
                            Foto de entrevista
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {!data.interview_photo ? (
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
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Camera className="h-4 w-4 text-green-600" />
                                            <span className="text-sm text-green-700 font-medium">
                                                ✓ Foto de entrevista subida correctamente
                                            </span>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setData('interview_photo', null)}
                                            className="text-xs"
                                        >
                                            Cambiar foto
                                        </Button>
                                    </div>

                                    {/* Miniatura de la imagen */}
                                    <div className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={URL.createObjectURL(data.interview_photo)}
                                                alt="Vista previa de la foto"
                                                className="w-24 h-24 object-cover rounded-lg border border-gray-300 shadow-sm"
                                            />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                {data.interview_photo.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Tamaño: {(data.interview_photo.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Tipo: {data.interview_photo.type}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={previousStep}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Anterior
                    </Button>
                    <Button 
                        type="submit" 
                        size="lg"
                        className="min-w-[140px] bg-[rgb(46_131_242_/1)] text-white transition-colors hover:bg-[rgb(46_131_242/_1)]/90"
                    >
                        Siguiente
                    </Button>
                </div>
            </form>
        </div>
    );
}