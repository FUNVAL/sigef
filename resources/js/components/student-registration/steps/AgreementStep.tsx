import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { Translation } from '@/types/global';
import { usePage } from '@inertiajs/react';
import { useEffect, useState, useContext } from 'react';
import { Clock, CheckCircle, ArrowLeft, FileText, Shield, Users } from 'lucide-react';
import { StepsHeader } from '../../pre-registration/steps-header';

interface AgreementStepProps {
    data: {
        agreement_terms_accepted: boolean;
        agreement_privacy_accepted: boolean;
        agreement_conduct_accepted: boolean;
    };
    onDataChange: (field: string, value: boolean) => void;
    errors?: Record<string, string>;
}

interface AgreementQuestion {
    id: string;
    title: string;
    content: string;
    minReadTime: number;
    icon: React.ElementType;
}

const agreementQuestions: AgreementQuestion[] = [
    {
        id: 'agreement_terms_accepted',
        title: 'Términos y Condiciones de Inscripción',
        content: `Al inscribirme en los programas de FUNVAL, entiendo y acepto que:

• Me comprometo a completar el programa académico en su totalidad y cumplir con todos los requisitos establecidos.
• Debo mantener un promedio mínimo de 80% para continuar en el programa.
• Las faltas injustificadas superiores al 20% del total de clases resultarán en la suspensión del programa.
• Me comprometo a participar activamente en todas las actividades académicas y proyectos asignados.
• Acepto cumplir con el código de vestimenta y las normas de comportamiento establecidas por la institución.
• Entiendo que la beca otorgada es intransferible y no reembolsable bajo ninguna circunstancia.
• Me comprometo a utilizar los recursos y equipos de la institución de manera responsable y apropiada.`,
        minReadTime: 30,
        icon: FileText
    },
    {
        id: 'agreement_privacy_accepted',
        title: 'Política de Privacidad y Uso de Datos',
        content: `Autorizo a FUNVAL para:

• Recopilar, almacenar y procesar mis datos personales para fines académicos y administrativos.
• Utilizar mis datos de contacto para comunicaciones relacionadas con el programa y oportunidades laborales.
• Compartir mi información académica con empleadores potenciales y socios estratégicos para oportunidades de empleo.
• Tomar fotografías y videos durante las actividades académicas para uso promocional de la institución.
• Contactarme para encuestas de seguimiento y evaluación del impacto del programa hasta 2 años después de la graduación.
• Utilizar mis testimonios y casos de éxito para material promocional de FUNVAL (con mi consentimiento específico).
• Mantener mis datos en sus sistemas durante el tiempo necesario para cumplir con obligaciones legales y académicas.`,
        minReadTime: 25,
        icon: Shield
    },
    {
        id: 'agreement_conduct_accepted',
        title: 'Código de Conducta y Valores Institucionales',
        content: `Me comprometo a:

• Mantener un comportamiento respetuoso hacia instructores, compañeros y personal administrativo en todo momento.
• Respetar la diversidad cultural, religiosa y de pensamiento de todos los miembros de la comunidad educativa.
• No participar en actividades de acoso, discriminación o bullying bajo ninguna circunstancia.
• Mantener la integridad académica, evitando el plagio, la copia y cualquier forma de deshonestidad académica.
• Cumplir con las normas de puntualidad y asistencia establecidas por la institución.
• Cuidar y respetar las instalaciones, equipos y materiales de la institución.
• Reportar cualquier situación que comprometa el ambiente de aprendizaje o la seguridad de la comunidad.
• Representar dignamente a FUNVAL en todas las actividades externas y prácticas profesionales.`,
        minReadTime: 25,
        icon: Users
    }
];

export const AgreementStep = ({ data, onDataChange, errors = {} }: AgreementStepProps) => {
    const { nextStep, previousStep } = useContext(StepperContext);
    const { ui } = usePage<Translation>().props;
    const [readingProgress, setReadingProgress] = useState<Record<string, { isReading: boolean; timeLeft: number; canAgree: boolean }>>({});
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        // Initialize reading progress for all questions
        const initialProgress: Record<string, { isReading: boolean; timeLeft: number; canAgree: boolean }> = {};
        agreementQuestions.forEach(question => {
            initialProgress[question.id] = {
                isReading: false,
                timeLeft: question.minReadTime,
                canAgree: false
            };
        });
        setReadingProgress(initialProgress);
    }, []);

    const startReading = (questionId: string, minReadTime: number) => {
        setReadingProgress(prev => ({
            ...prev,
            [questionId]: {
                ...prev[questionId],
                isReading: true,
                timeLeft: minReadTime
            }
        }));

        const timer = setInterval(() => {
            setReadingProgress(prev => {
                const currentTime = prev[questionId]?.timeLeft || 0;
                if (currentTime <= 1) {
                    clearInterval(timer);
                    return {
                        ...prev,
                        [questionId]: {
                            isReading: false,
                            timeLeft: 0,
                            canAgree: true
                        }
                    };
                }
                return {
                    ...prev,
                    [questionId]: {
                        ...prev[questionId],
                        timeLeft: currentTime - 1
                    }
                };
            });
        }, 1000);
    };

    const handleAgreementChange = (questionId: string, checked: boolean) => {
        if (checked && !readingProgress[questionId]?.canAgree) {
            return; // Prevent checking if not fully read
        }
        onDataChange(questionId, checked);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const newValidationErrors: Record<string, string> = {};

        if (!data.agreement_terms_accepted) {
            newValidationErrors.agreement_terms_accepted = 'Debe aceptar los términos y condiciones';
        }
        if (!data.agreement_privacy_accepted) {
            newValidationErrors.agreement_privacy_accepted = 'Debe aceptar la política de privacidad';
        }
        if (!data.agreement_conduct_accepted) {
            newValidationErrors.agreement_conduct_accepted = 'Debe aceptar el código de conducta';
        }

        if (Object.keys(newValidationErrors).length > 0) {
            setValidationErrors(newValidationErrors);
            return;
        }

        setValidationErrors({});
        nextStep();
    };

    const allAgreementsAccepted = data.agreement_terms_accepted &&
        data.agreement_privacy_accepted &&
        data.agreement_conduct_accepted;

    return (
        <Card className="mx-auto w-full max-w-4xl overflow-hidden border-0 pt-0 shadow-2xl">
            <StepsHeader title="Acuerdos y Compromisos" subtitle="Por favor, lea cuidadosamente cada acuerdo y acepta todos los términos para continuar" />

            <CardContent className="space-y-6 p-3 sm:space-y-8 sm:p-6 md:p-8">
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    {agreementQuestions.map((question) => {
                        const IconComponent = question.icon;
                        return (
                            <div key={question.id} className="space-y-4">
                                <div className="mb-4 flex items-center gap-2">
                                    <IconComponent className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                                    <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">{question.title}</h3>
                                    {readingProgress[question.id]?.canAgree && (
                                        <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                                    )}
                                </div>

                                <div className="rounded-lg border border-[rgb(46_131_242_/_1)]/20 bg-gray-50 p-4">
                                    <div className="whitespace-pre-line text-sm text-gray-700 leading-relaxed">
                                        {question.content}
                                    </div>
                                </div>

                                {!readingProgress[question.id]?.canAgree && (
                                    <div className="flex items-center justify-center">
                                        {!readingProgress[question.id]?.isReading ? (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => startReading(question.id, question.minReadTime)}
                                                className="flex items-center gap-2"
                                            >
                                                <Clock className="h-4 w-4" />
                                                Comenzar Lectura ({question.minReadTime}s)
                                            </Button>
                                        ) : (
                                            <div className="flex items-center gap-2 text-[rgb(46_131_242_/_1)]">
                                                <Clock className="h-4 w-4 animate-pulse" />
                                                <span className="font-medium">
                                                    Leyendo... {readingProgress[question.id]?.timeLeft}s restantes
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="flex items-center space-x-2 pt-2">
                                    <Checkbox
                                        id={question.id}
                                        checked={data[question.id as keyof typeof data] || false}
                                        onCheckedChange={(checked) => handleAgreementChange(question.id, checked as boolean)}
                                        disabled={!readingProgress[question.id]?.canAgree}
                                        className="data-[state=checked]:bg-[rgb(46_131_242_/_1)]"
                                    />
                                    <label
                                        htmlFor={question.id}
                                        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed ${!readingProgress[question.id]?.canAgree
                                                ? 'peer-disabled:opacity-70 text-gray-400'
                                                : 'text-gray-900 cursor-pointer'
                                            }`}
                                    >
                                        He leído y acepto {question.title.toLowerCase()}
                                    </label>
                                </div>

                                {(validationErrors[question.id] || errors[question.id]) && (
                                    <p className="text-sm text-red-500">
                                        {validationErrors[question.id] || errors[question.id]}
                                    </p>
                                )}
                            </div>
                        );
                    })}

                    {!allAgreementsAccepted && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                            <p className="text-amber-800 text-sm">
                                Debes leer y aceptar todos los acuerdos para continuar con tu inscripción.
                            </p>
                        </div>
                    )}

                    {allAgreementsAccepted && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <p className="text-green-800 text-sm font-medium">
                                ✅ Todos los acuerdos han sido aceptados. Puedes continuar con tu inscripción.
                            </p>
                        </div>
                    )}

                    {/* Botones */}
                    <div className="flex justify-between pt-4">
                        <Button type="button" onClick={previousStep} variant="outline" size="lg" className="min-w-[120px]">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {ui.buttons?.previous || 'Anterior'}
                        </Button>

                        <Button
                            type="submit"
                            size="lg"
                            className="min-w-[140px] bg-[rgb(46_131_242_/1)] text-white transition-colors hover:bg-[rgb(46_131_242/_1)]/90"
                        >
                            {ui.buttons?.Finalizar || 'Finalizar Inscripción'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
