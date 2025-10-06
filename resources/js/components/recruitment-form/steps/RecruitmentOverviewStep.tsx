import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { Enums } from '@/types/global';
import { RecruitmentFormData, HouseholdExpense } from '@/types/recruitment';
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
                        <CardTitle className="flex items-center gap-2 text-[rgb(46_131_242_/_1)]">
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

                        {data.household_members && data.household_members.length > 0 && (
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-medium mb-2">Detalles de miembros del hogar</h4>
                                <div className="space-y-2">
                                    {data.household_members.map((member, index) => (
                                        <div key={index} className="flex justify-between items-center p-2 bg-white rounded">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{member.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {getEnumLabel(enums.familyRelationship, member.relationship)}
                                                    {member.phone && ` • ${member.phone}`}
                                                </p>
                                            </div>
                                            {member.income_contribution && member.income_contribution > 0 && (
                                                <div className="text-right">
                                                    <p className="text-sm font-medium text-green-600">
                                                        ${member.income_contribution} USD
                                                    </p>
                                                    <p className="text-xs text-gray-500">Contribución</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.monthly_expenses && data.monthly_expenses.length > 0 && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium mb-2">Gastos mensuales del hogar</h4>
                                <div className="space-y-1">
                                    {data.monthly_expenses.map((expense, index) => (
                                        <div key={index} className="flex justify-between">
                                            <span className="text-sm">{getEnumLabel(enums.expenseType, expense.type)}</span>
                                            <span className="text-sm font-medium">${expense.amount} USD</span>
                                        </div>
                                    ))}
                                    <div className="border-t pt-1 mt-2">
                                        <div className="flex justify-between font-medium">
                                            <span className="text-sm">Total gastos mensuales:</span>
                                            <span className="text-sm">${data.monthly_expenses.reduce((total, expense) => total + expense.amount, 0)} USD</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

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
                                <h4 className="font-medium mb-2">Bonos solicitados para clases online</h4>
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

                        {data.needs_practice_bonus && data.practice_bonus_categories.length > 0 && (
                            <div className="mt-4 p-4 bg-green-50 rounded-lg">
                                <h4 className="font-medium mb-2">Bonos solicitados para prácticas/bootcamp</h4>
                                <div className="space-y-1">
                                    {data.practice_bonus_categories.map((categoryId, index) => (
                                        <div key={categoryId} className="flex justify-between">
                                            <span className="text-sm">{getEnumLabel(enums.practiceBonusCategory, categoryId)}</span>
                                            <span className="text-sm font-medium">${data.practice_bonus_amounts[index]} USD</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Acuerdos */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-[rgb(46_131_242_/_1)]">
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
                                { key: 'religious_institute_accepted', label: 'Convenio de Instituto de Religión' },
                                { key: 'health_agreement_accepted', label: 'Convenio de Condiciones de Salud' }
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
                        <CardTitle className="flex items-center gap-2 text-[rgb(46_131_242_/_1)]">
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
                    <Button 
                        onClick={onSubmit} 
                        size="lg" 
                        disabled={processing}
                        className="min-w-[140px] bg-[rgb(46_131_242_/1)] text-white transition-colors hover:bg-[rgb(46_131_242/_1)]/90"
                    >
                        {processing ? 'Enviando...' : 'Enviar Aplicación'}
                    </Button>
                </div>
            </div>
        </div>
    );
}