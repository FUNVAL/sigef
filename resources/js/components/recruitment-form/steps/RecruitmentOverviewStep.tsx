import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { Enums } from '@/types/global';
import { RecruitmentFormData } from '@/types/recruitment';
import { ArrowLeft, Check, Users, Heart, FileText, Calendar, Camera } from 'lucide-react';
import { useContext } from 'react';
import { StepsHeader } from '../../pre-registration/steps-header';

interface RecruitmentOverviewStepProps {
    data: RecruitmentFormData;
    enums: Enums;
    onSubmit: () => void;
    processing: boolean;
}

export function RecruitmentOverviewStep({ data, enums, onSubmit, processing }: RecruitmentOverviewStepProps) {
    const { previousStep } = useContext(StepperContext);

    const getEnumLabel = (enumArray: { id: number; name: string }[], value: number): string => {
        const item = enumArray?.find((enumItem) => enumItem.id === value);
        return item ? item.name : 'No especificado';
    };

    const getMonthName = (month: number): string => {
        const months = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return months[month - 1] || 'No especificado';
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6 p-4">
            <StepsHeader
                title="Resumen de Aplicación"
                subtitle="Revise su información antes de enviar la aplicación"
            />

            <div className="space-y-6">
                {/* Información Socio-económica */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Información Socio-económica
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Miembros del hogar</p>
                                <p className="text-sm">{data.household_members.length} personas</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Ingresos mensuales</p>
                                <p className="text-sm">${data.monthly_income} USD</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Internet residencial</p>
                                <p className="text-sm">{data.has_residential_internet ? 'Sí' : 'No'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Dispositivo para clases</p>
                                <p className="text-sm">{getEnumLabel(enums.deviceType, data.device_type)}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Tipo de vivienda</p>
                                <p className="text-sm">{getEnumLabel(enums.housingType, data.housing_type)}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Empleo actual</p>
                                <p className="text-sm">{data.has_employment ? 'Sí' : 'No'}</p>
                            </div>
                        </div>

                        {data.has_employment && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium mb-2">Detalles de empleo</h4>
                                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Tipo de empleo</p>
                                        <p className="text-sm">{getEnumLabel(enums.employmentType, data.employment_type!)}</p>
                                    </div>
                                    {data.employment_type === 2 && (
                                        <>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Empresa</p>
                                                <p className="text-sm">{data.company_name || 'No especificada'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Puesto</p>
                                                <p className="text-sm">{getEnumLabel(enums.jobPosition, data.job_position!)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Salario</p>
                                                <p className="text-sm">${data.employment_income} USD</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {data.needs_bonus && data.bonus_categories.length > 0 && (
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-medium mb-2">Bonos solicitados</h4>
                                <div className="space-y-1">
                                    {data.bonus_categories.map((categoryId, index) => (
                                        <div key={categoryId} className="flex justify-between">
                                            <span className="text-sm">{getEnumLabel(enums.bonusCategory, categoryId)}</span>
                                            <span className="text-sm font-medium">${data.bonus_amounts[index]} USD</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Información de Salud */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Heart className="h-5 w-5" />
                            Información de Salud
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Seguro médico</p>
                                <p className="text-sm">{data.has_health_insurance ? 'Sí' : 'No'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Padece enfermedad</p>
                                <p className="text-sm">{data.has_illness ? 'Sí' : 'No'}</p>
                            </div>
                        </div>

                        {data.has_illness && (
                            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                                <h4 className="font-medium mb-2">Detalles de salud</h4>
                                <div className="space-y-2">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Enfermedad</p>
                                        <p className="text-sm">{data.illness_description || 'No especificada'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Toma medicamentos</p>
                                        <p className="text-sm">{data.takes_medication ? 'Sí' : 'No'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Frecuencia médica</p>
                                        <p className="text-sm">{data.medical_visit_frequency || 'No especificada'}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!data.has_illness && (
                            <div className="mt-4 p-4 bg-green-50 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-600" />
                                    <span className="text-sm text-green-700">Declaración jurada de salud aceptada</span>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Acuerdos */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Acuerdos Aceptados
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {[
                                { key: 'mutual_understanding_accepted', label: 'Convenio de Entendimiento Mutuo' },
                                { key: 'work_commitment_accepted', label: 'Compromiso Laboral' },
                                { key: 'data_authorization_accepted', label: 'Autorización de Datos Personales' },
                                { key: 'scholarship_agreement_accepted', label: 'Convenio de Beca' },
                                { key: 'religious_institute_accepted', label: 'Convenio de Instituto de Religión' }
                            ].map(agreement => (
                                <div key={agreement.key} className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-600" />
                                    <span className="text-sm text-green-700">{agreement.label}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Información Adicional */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Información Adicional
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Fecha de inicio preferida</p>
                                <p className="text-sm">{getMonthName(data.start_month)} {data.start_year}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Foto de entrevista</p>
                                <div className="flex items-center gap-2">
                                    <Camera className="h-4 w-4 text-green-600" />
                                    <span className="text-sm text-green-700">
                                        {data.interview_photo ? 'Archivo subido' : 'No subido'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Botones de acción */}
                <div className="flex justify-between pt-6">
                    <Button type="button" variant="outline" onClick={previousStep} disabled={processing}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Anterior
                    </Button>
                    <Button onClick={onSubmit} size="lg" disabled={processing}>
                        {processing ? 'Enviando...' : 'Enviar Aplicación'}
                    </Button>
                </div>
            </div>
        </div>
    );
}