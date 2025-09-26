import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { RecruitmentRequest } from '@/types/recruitment';
import { useEffect, useState, useContext } from 'react';
import { ArrowLeft, FileText, Shield, Users, BookOpen, Church } from 'lucide-react';
import { StepsHeader } from '../../pre-registration/steps-header';

interface AgreementStepProps {
    request: RecruitmentRequest;
}

interface AgreementQuestion {
    id: keyof Pick<RecruitmentRequest['data'], 'mutual_understanding_accepted' | 'work_commitment_accepted' | 'data_authorization_accepted' | 'scholarship_agreement_accepted' | 'religious_institute_accepted'>;
    title: string;
    content: string;
    minReadTime: number;
    icon: React.ElementType;
}

const agreementQuestions: AgreementQuestion[] = [
    {
        id: 'mutual_understanding_accepted',
        title: 'CONVENIO DE ENTENDIMIENTO MUTUO PROGRAMA "BENEFICIARIO INTENSIVO"',
        content: `Al participar en el programa "Beneficiario Intensivo", entiendo y acepto que:

• Me comprometo a completar todas las fases del programa de capacitación intensiva.
• Debo mantener un rendimiento académico satisfactorio durante todo el programa.
• Participaré activamente en todas las actividades, talleres y proyectos asignados.
• Cumpliré con el horario establecido y las normas de asistencia del programa.
• Utilizaré de manera responsable todos los recursos y materiales proporcionados.
• Este programa está diseñado para mi desarrollo profesional y personal integral.`,
        minReadTime: 30,
        icon: FileText
    },
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
        minReadTime: 25,
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
        minReadTime: 35,
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
        minReadTime: 30,
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
        minReadTime: 35,
        icon: Church
    }
];

export function AgreementStep({ request }: AgreementStepProps) {
    const { nextStep, previousStep } = useContext(StepperContext);
    const { data, setData } = request;
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [readTimers, setReadTimers] = useState<Record<string, number>>({});
    const [timeSpent, setTimeSpent] = useState<Record<string, number>>({});

    // Initialize timers for each agreement
    useEffect(() => {
        const timers: Record<string, number> = {};
        agreementQuestions.forEach(question => {
            timers[question.id] = 0;
        });
        setTimeSpent(timers);
    }, []);

    // Timer effect for tracking reading time
    useEffect(() => {
        const intervals: Record<string, NodeJS.Timeout> = {};

        agreementQuestions.forEach(question => {
            if (readTimers[question.id]) {
                intervals[question.id] = setInterval(() => {
                    setTimeSpent(prev => ({
                        ...prev,
                        [question.id]: prev[question.id] + 1
                    }));
                }, 1000);
            }
        });

        return () => {
            Object.values(intervals).forEach(interval => clearInterval(interval));
        };
    }, [readTimers]);

    const startReadingTimer = (questionId: string) => {
        setReadTimers(prev => ({ ...prev, [questionId]: Date.now() }));
    };

    const stopReadingTimer = (questionId: string) => {
        setReadTimers(prev => ({ ...prev, [questionId]: 0 }));
    };

    const canAcceptAgreement = (question: AgreementQuestion) => {
        return timeSpent[question.id] >= question.minReadTime;
    };

    const handleAgreementChange = (questionId: string, accepted: boolean) => {
        setData(questionId, accepted);
        if (!accepted) {
            stopReadingTimer(questionId);
        }
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
                    const canAccept = canAcceptAgreement(question);
                    const isReading = readTimers[question.id] > 0;

                    return (
                        <Card key={question.id} className={`${isAccepted ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Icon className={`h-5 w-5 ${isAccepted ? 'text-green-600' : 'text-blue-600'}`} />
                                    {question.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="relative">
                                    <div className="max-h-48 overflow-y-auto rounded border bg-gray-50 p-4">
                                        <pre className="whitespace-pre-wrap text-sm font-sans">{question.content}</pre>
                                    </div>

                                    {/* Reading progress */}
                                    <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-2 w-2 rounded-full ${canAccept ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                            <span>
                                                Tiempo de lectura: {timeSpent[question.id]}s / {question.minReadTime}s mínimo
                                            </span>
                                        </div>
                                        {!isReading && !canAccept && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => startReadingTimer(question.id)}
                                            >
                                                Comenzar lectura
                                            </Button>
                                        )}
                                        {isReading && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => stopReadingTimer(question.id)}
                                            >
                                                Detener lectura
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {/* Agreement checkbox */}
                                <div className="flex items-center gap-3 p-4 rounded-lg border bg-white">
                                    <Checkbox
                                        checked={isAccepted}
                                        disabled={!canAccept}
                                        onCheckedChange={(checked) => handleAgreementChange(question.id, checked as boolean)}
                                    />
                                    <Label className={`text-sm ${!canAccept ? 'text-gray-400' : ''}`}>
                                        He leído y acepto los términos de este acuerdo
                                        {!canAccept && ' (debe completar el tiempo de lectura mínimo)'}
                                    </Label>
                                </div>

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
                    <Button type="submit" size="lg">
                        Siguiente
                    </Button>
                </div>
            </form>
        </div>
    );
}