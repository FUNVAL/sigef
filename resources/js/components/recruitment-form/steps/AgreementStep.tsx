import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { RecruitmentRequest } from '@/types/recruitment';
import { useState, useContext } from 'react';
import { ArrowLeft, FileText, Shield, Users, BookOpen, Church, Heart } from 'lucide-react';
import { StepsHeader } from '../../pre-registration/steps-header';

interface AgreementStepProps {
    request: RecruitmentRequest;
}

interface AgreementQuestion {
    id: string;
    title: string;
    content: string;
    icon: React.ElementType;
}

const agreementQuestions: AgreementQuestion[] = [

    {
        id: 'work_commitment_accepted',
        title: 'COMPROMISO LABORAL',
        content: `Me comprometo a:

• Buscar activamente oportunidades de empleo una vez completado el programa.
• Aplicar los conocimientos y habilidades adquiridos en el programa en mi vida profesional.
• Mantener una actitud proactiva hacia el desarrollo de mi carrera profesional.
• Colaborar con FUNVAL en el seguimiento post-programa por un período determinado.
• Compartir información sobre mi progreso laboral cuando sea requerido para fines estadísticos.
• Considerar oportunidades de mentoría con futuros participantes del programa.`,
        icon: Users
    },
    {
        id: 'data_authorization_accepted',
        title: 'AUTORIZACIÓN PARA EL TRATAMIENTO DE DATOS PERSONALES',
        content: `Autorizo a FUNVAL para:

• Recopilar, almacenar y procesar mis datos personales para fines del programa.
• Utilizar mi información de contacto para comunicaciones relacionadas con el programa.
• Procesar mis datos académicos y de rendimiento para evaluación y seguimiento.
• Compartir información estadística agregada (sin identificación personal) para reportes.
• Contactarme para encuestas de seguimiento y evaluación del programa.
• Utilizar testimonios o casos de éxito (previa autorización específica).

Entiendo que puedo solicitar la corrección o eliminación de mis datos en cualquier momento.`,
        icon: Shield
    },
    {
        id: 'scholarship_agreement_accepted',
        title: 'CONVENIO DE BECA',
        content: `En relación a la beca otorgada, acepto que:

• La beca cubre los costos del programa de capacitación según se especifica en el convenio.
• Debo cumplir con todos los requisitos académicos y de asistencia para mantener la beca.
• La beca es intransferible y no puede ser cedida a terceros.
• En caso de abandono del programa sin causa justificada, podría ser requerido el reembolso parcial.
• Los materiales y recursos proporcionados son para uso exclusivo del programa.
• Me comprometo a completar el programa en los tiempos establecidos.`,
        icon: BookOpen
    },
    {
        id: 'religious_institute_accepted',
        title: 'Convenio de asistir a instituto de religión',
        content: `Como parte integral del programa, me comprometo a:

• Asistir regularmente a las clases del instituto de religión.
• Participar activamente en las actividades espirituales y de desarrollo personal.
• Mantener una actitud respetuosa hacia los principios y valores enseñados.
• Cumplir con las normas de comportamiento establecidas para el instituto.
• Completar las tareas y actividades asignadas en el instituto de religión.
• Entender que la participación en el instituto es un componente esencial del programa integral.

Este compromiso forma parte del desarrollo holístico que caracteriza nuestro programa.`,
        icon: Church
    },
    {
        id: 'mutual_understanding_accepted',
        title: 'COMPROMISO DE ENTENDIMIENTO MUTUO',
        content: `Declaro que:

• He leído y entendido completamente todos los términos y condiciones del programa.
• Acepto las responsabilidades y compromisos establecidos en este convenio.
• Entiendo los objetivos y metodología del programa de capacitación.
• Me comprometo a mantener una comunicación abierta y honesta con los coordinadores del programa.
• Acepto participar en las evaluaciones y seguimientos requeridos durante y después del programa.
• Entiendo que el incumplimiento de estos acuerdos puede resultar en la suspensión del programa.`,
        icon: FileText
    },
    {
        id: 'health_agreement_accepted',
        title: 'CONVENIO DE CONDICIONES DE SALUD',
        content: `En relación a mi estado de salud, declaro que:

• He proporcionado información veraz y completa sobre mi estado de salud actual.
• Me comprometo a informar cualquier cambio significativo en mi condición de salud durante el programa.
• Entiendo que ciertas condiciones de salud pueden requerir adaptaciones especiales en el programa.
• Acepto seguir las recomendaciones médicas necesarias para participar seguramente en el programa.
• Eximo de responsabilidad a FUNVAL por complicaciones de salud preexistentes no declaradas.
• Me comprometo a mantener un estado de salud adecuado que me permita completar el programa.`,
        icon: Heart
    },

];

export function AgreementStep({ request }: AgreementStepProps) {
    const { nextStep, previousStep } = useContext(StepperContext);
    const { data, setData } = request;
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleAgreementChange = (questionId: string, accepted: boolean) => {
        setData(questionId, accepted);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors: Record<string, string> = {};

        agreementQuestions.forEach(question => {
            if (!(data as any)[question.id]) {
                validationErrors[question.id] = 'Debe aceptar este acuerdo para continuar';
            }
        });

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
                title="Acuerdos y Compromisos"
                subtitle="Por favor, lea cuidadosamente cada acuerdo y acepte todos los términos para continuar"
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                {agreementQuestions.map((question) => {
                    const Icon = question.icon;
                    const isAccepted = (data as any)[question.id];

                    return (
                        <Card key={question.id} className={`${isAccepted ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg text-[rgb(46_131_242_/_1)]">
                                    <Icon className={`h-5 w-5 ${isAccepted ? 'text-green-600' : 'text-blue-600'}`} />
                                    {question.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="max-h-48 overflow-y-auto rounded border bg-gray-50 p-4">
                                    <pre className="whitespace-pre-wrap text-sm font-sans">{question.content}</pre>
                                </div>

                                {/* Agreement checkbox */}
                                <Label
                                    htmlFor={`checkbox-${question.id}`}
                                    className="flex items-center gap-3 p-4 rounded-lg border bg-white cursor-pointer select-none"
                                >
                                    <Checkbox
                                        id={`checkbox-${question.id}`}
                                        name={question.id}
                                        checked={isAccepted}
                                        onCheckedChange={(checked) =>
                                            handleAgreementChange(question.id, checked as boolean)
                                        }
                                        onClick={(e) => e.stopPropagation()} // evita doble toggle si necesario
                                    />
                                    <span className="text-sm">
                                        He verificado nuevamente con el estudiante el convenio de {question.title.toLowerCase()}
                                    </span>
                                </Label>


                                {errors[question.id] && (
                                    <p className="text-sm text-red-500">{errors[question.id]}</p>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}

                <div className="flex justify-between pt-6">
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