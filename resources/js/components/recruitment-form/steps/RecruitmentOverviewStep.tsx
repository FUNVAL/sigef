import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { Enums } from '@/types/global';
import { RecruitmentFormData, HouseholdExpense, WorkExperience, JobOffer } from '@/types/recruitment';
import { ArrowLeft, Check, Users, Heart, FileText, Calendar, Camera, Building } from 'lucide-react';
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

    const calculateWorkExperience = (startDate: string, endDate?: string) => {
        if (!startDate) return '';
        
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date();
        
        // Calcular la diferencia en meses
        const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        
        if (monthsDiff < 1) {
            const daysDiff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
            return `${daysDiff} días`;
        } else if (monthsDiff < 12) {
            return `${monthsDiff} ${monthsDiff === 1 ? 'mes' : 'meses'}`;
        } else {
            const years = Math.floor(monthsDiff / 12);
            const remainingMonths = monthsDiff % 12;
            if (remainingMonths === 0) {
                return `${years} ${years === 1 ? 'año' : 'años'}`;
            } else {
                return `${years} ${years === 1 ? 'año' : 'años'} y ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
            }
        }
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
                            Información Socioeconómica
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Miembros del hogar</p>
                                <p className="text-sm">{data.household_members.length} personas</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Ingresos mensuales del hogar</p>
                                <p className="text-sm text-green-600 font-medium">
                                    ${data.household_members.reduce((total, member) => total + (member?.income_contribution || 0), 0).toFixed(2)} USD
                                </p>
                            </div>
                            {data.monthly_expenses && data.monthly_expenses.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Egresos mensuales del hogar</p>
                                    <p className="text-sm text-red-600 font-medium">
                                        ${data.monthly_expenses.reduce((total, expense) => total + (expense?.amount || 0), 0).toFixed(2)} USD
                                    </p>
                                </div>
                            )}
                            
                            <div>
                                <p className="text-sm font-medium text-gray-500">Internet residencial</p>
                                <p className="text-sm">{data.has_residential_internet ? 'Sí' : 'No'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Dispositivo para clases</p>
                                <p className="text-sm">{getEnumLabel(enums.deviceType, data.device_type || 0)}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Tipo de vivienda</p>
                                <p className="text-sm">{getEnumLabel(enums.housingType, data.housing_type || 0)}</p>
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
                                                <p className="text-sm font-medium">{member?.name || 'No especificado'}</p>
                                                <p className="text-xs text-gray-500">
                                                    {getEnumLabel(enums.familyRelationship, member?.relationship || 0)}
                                                    {member?.age && ` • ${member.age} años`}
                                                    {member?.phone && ` • ${member.phone}`}
                                                </p>
                                            </div>
                                            {member?.income_contribution && member.income_contribution > 0 && (
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
                                            <span className="text-sm">{getEnumLabel(enums.expenseType, expense?.type || 0)}</span>
                                            <span className="text-sm font-medium">${(expense?.amount || 0).toFixed(2)} USD</span>
                                        </div>
                                    ))}
                                    <div className="border-t pt-1 mt-2">
                                        <div className="flex justify-between font-medium">
                                            <span className="text-sm">Total gastos mensuales:</span>
                                            <span className="text-sm">${data.monthly_expenses.reduce((total, expense) => total + (expense?.amount || 0), 0).toFixed(2)} USD</span>
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
                                        <p className="text-sm">{getEnumLabel(enums.employmentType, data.employment_type || 0)}</p>
                                    </div>
                                    {data.employment_type === 2 && (
                                        <>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Empresa</p>
                                                <p className="text-sm">{data.company_name || 'No especificada'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Puesto</p>
                                                <p className="text-sm">{getEnumLabel(enums.jobPosition, data.job_position || 0)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Salario</p>
                                                <p className="text-sm">${data.employment_income || 0} USD</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Experiencia laboral - mejorada */}
                        {data.has_work_experience === true && (
                            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                                <h4 className="font-medium mb-4">Experiencia laboral</h4>

                                
                                {/* Mostrar múltiples experiencias */}
                                {data.work_experiences && data.work_experiences.length > 0 ? (
                                    <div className="space-y-4">
                                        {data.work_experiences
                                            .filter(exp => exp.job_position && exp.job_position > 0) // Solo mostrar experiencias válidas
                                            .map((experience, index) => (
                                            <div key={index} className="bg-white p-3 rounded-lg border border-yellow-200">
                                                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-500">Puesto</p>
                                                        <p className="text-sm">{getEnumLabel(enums.jobPosition, experience.job_position || 0)}</p>
                                                    </div>
                                                    {experience.start_date && (
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-500">Periodo</p>
                                                            <p className="text-sm">
                                                                {new Date(experience.start_date).toLocaleDateString('es-ES')}
                                                                {experience.end_date ? 
                                                                    ` - ${new Date(experience.end_date).toLocaleDateString('es-ES')}` : 
                                                                    ' - Actualidad'
                                                                }
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                                {experience.start_date && (
                                                    <div className="mt-2 pt-2 border-t border-yellow-100">
                                                        <p className="text-sm font-medium text-yellow-700">
                                                            Duración: {calculateWorkExperience(experience.start_date, experience.end_date)}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        
                                        {/* Resumen total - solo si hay experiencias válidas */}
                                        {data.work_experiences.filter(exp => exp.job_position && exp.job_position > 0 && exp.start_date).length > 0 && (
                                            <div className="bg-yellow-100 p-3 rounded-lg border border-yellow-300">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-sm font-semibold text-yellow-800">Experiencia total combinada</p>
                                                        <p className="text-lg font-bold text-yellow-900">
                                                            {(() => {
                                                                let totalMonths = 0;
                                                                data.work_experiences
                                                                    .filter(exp => exp.job_position && exp.job_position > 0 && exp.start_date)
                                                                    .forEach(exp => {
                                                                        const start = new Date(exp.start_date);
                                                                        const end = exp.end_date ? new Date(exp.end_date) : new Date();
                                                                        const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
                                                                        if (monthsDiff > 0) {
                                                                            totalMonths += monthsDiff;
                                                                        }
                                                                    });

                                                                if (totalMonths === 0) return 'Sin experiencia registrada';
                                                                
                                                                if (totalMonths < 12) {
                                                                    return `${totalMonths} ${totalMonths === 1 ? 'mes' : 'meses'}`;
                                                                } else {
                                                                    const years = Math.floor(totalMonths / 12);
                                                                    const remainingMonths = totalMonths % 12;
                                                                    if (remainingMonths === 0) {
                                                                        return `${years} ${years === 1 ? 'año' : 'años'}`;
                                                                    } else {
                                                                        return `${years} ${years === 1 ? 'año' : 'años'} y ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
                                                                    }
                                                                }
                                                            })()}
                                                        </p>
                                                    </div>
                                                    <div className="text-yellow-600">
                                                        📊
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-4 text-gray-500">
                                        <p className="text-sm">No hay experiencias laborales registradas o completadas</p>
                                        <p className="text-xs mt-1">Las experiencias deben tener un puesto seleccionado para mostrarse</p>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {/* Mostrar cuando NO tiene experiencia laboral */}
                        {data.has_work_experience === false && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium mb-2">Experiencia laboral</h4>
                                <div className="text-center py-2 text-gray-500">
                                    <p className="text-sm">El aplicante indicó que no cuenta con experiencia laboral</p>
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
                                            <span className="text-sm font-medium">${(data.bonus_amounts[index] || 0).toFixed(2)} USD</span>
                                        </div>
                                    ))}
                                    <div className="border-t pt-1 mt-2">
                                        <div className="flex justify-between font-medium">
                                            <span className="text-sm text-blue-800">Total bonos clases online:</span>
                                            <span className="text-sm text-blue-900">${data.bonus_amounts.reduce((total, amount) => total + (amount || 0), 0).toFixed(2)} USD</span>
                                        </div>
                                    </div>
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
                                            <span className="text-sm font-medium">${(data.practice_bonus_amounts[index] || 0).toFixed(2)} USD</span>
                                        </div>
                                    ))}
                                    <div className="border-t pt-1 mt-2">
                                        <div className="flex justify-between font-medium">
                                            <span className="text-sm text-green-800">Total bonos prácticas/bootcamp:</span>
                                            <span className="text-sm text-green-900">${data.practice_bonus_amounts.reduce((total, amount) => total + (amount || 0), 0).toFixed(2)} USD</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Ofertas Laborales */}
                {data.job_offers && data.job_offers.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-[rgb(46_131_242_/_1)]">
                                <Building className="h-5 w-5" />
                                Ofertas Laborales para el Estudiante
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {data.job_offers.map((offer, index) => (
                                    <div key={index} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-purple-800">
                                                {offer.company_name || 'Empresa no especificada'}
                                            </p>
                                            <p className="text-xs text-purple-600">Empresa de interés #{index + 1}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-purple-700">
                                                ${(offer.salary_expectation || 0).toFixed(2)} USD
                                            </p>
                                            <p className="text-xs text-purple-600">Salario esperado</p>
                                        </div>
                                    </div>
                                ))}
                                
                                {/* Estadísticas de ofertas laborales */}
                                <div className="mt-4 p-3 bg-purple-100 rounded-lg border border-purple-300">
                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                        <div>
                                            <p className="text-sm font-semibold text-purple-800">Total de empresas de interés:</p>
                                            <p className="text-lg font-bold text-purple-900">{data.job_offers.length} empresas</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-purple-800">Promedio salarial esperado:</p>
                                            <p className="text-lg font-bold text-purple-900">
                                                ${(data.job_offers.reduce((total, offer) => total + (offer.salary_expectation || 0), 0) / data.job_offers.length).toFixed(2)} USD
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

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