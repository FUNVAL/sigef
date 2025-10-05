import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { Translation } from '@/types/global';
import { usePage } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, FileText, Heart, Shield, Users } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { StepsHeader } from '../../pre-registration/steps-header';

interface AgreementStepProps {
    data: {
        agreement_terms_accepted: boolean;
        agreement_privacy_accepted: boolean;
        agreement_conduct_accepted: boolean;
        agreement_health_accepted: boolean;
        has_health_difficulties?: boolean;
        medication_type?: string;
        medication_frequency?: string;
        medication_other_description?: string;
    };
    onDataChange: (field: string, value: any) => void;
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
        icon: FileText,
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
        icon: Shield,
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
        icon: Users,
    },
    {
        id: 'agreement_health_accepted',
        title: 'Declaración de Salud y Compromiso Académico',
        content: `Declaro bajo mi responsabilidad que:

• Mi estado de salud actual me permite participar plenamente en todas las actividades académicas del programa.
• Cualquier condición médica que pueda tener no interferirá con mi capacidad de asistir regularmente a clases.
• Me comprometo a mantener al día mis tratamientos médicos para no afectar mi rendimiento académico.
• Entiendo que es mi responsabilidad gestionar mi salud de manera que no comprometa mis compromisos educativos.
• Acepto informar a la institución sobre cualquier cambio significativo en mi estado de salud que pueda afectar mi participación.
• Confirmo que tengo acceso a servicios médicos apropiados durante el período del programa.
• Me comprometo a cumplir con todos los requisitos académicos independientemente de mi estado de salud.`,
        minReadTime: 20,
        icon: Heart,
    },
];

export const AgreementStep = ({ data, onDataChange, errors = {} }: AgreementStepProps) => {
    const { nextStep, previousStep } = useContext(StepperContext);
    const { ui } = usePage<Translation>().props;
    const [currentAgreementIndex, setCurrentAgreementIndex] = useState(0);
    const [readingProgress, setReadingProgress] = useState<Record<string, { isReading: boolean; timeLeft: number; canAgree: boolean }>>({});
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const currentAgreement = agreementQuestions[currentAgreementIndex];

    useEffect(() => {
        // Initialize reading progress for all questions
        const initialProgress: Record<string, { isReading: boolean; timeLeft: number; canAgree: boolean }> = {};
        agreementQuestions.forEach((question) => {
            initialProgress[question.id] = {
                isReading: false,
                timeLeft: question.minReadTime,
                canAgree: false,
            };
        });
        setReadingProgress(initialProgress);
    }, []);

    const startReading = (questionId: string, minReadTime: number) => {
        setReadingProgress((prev) => ({
            ...prev,
            [questionId]: {
                ...prev[questionId],
                isReading: true,
                timeLeft: minReadTime,
            },
        }));

        const timer = setInterval(() => {
            setReadingProgress((prev) => {
                const currentTime = prev[questionId]?.timeLeft || 0;
                if (currentTime <= 1) {
                    clearInterval(timer);
                    return {
                        ...prev,
                        [questionId]: {
                            isReading: false,
                            timeLeft: 0,
                            canAgree: true,
                        },
                    };
                }
                return {
                    ...prev,
                    [questionId]: {
                        ...prev[questionId],
                        timeLeft: currentTime - 1,
                    },
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

    const goToNextAgreement = () => {
        if (currentAgreementIndex < agreementQuestions.length - 1) {
            setCurrentAgreementIndex(currentAgreementIndex + 1);
        }
    };

    const goToPreviousAgreement = () => {
        if (currentAgreementIndex > 0) {
            setCurrentAgreementIndex(currentAgreementIndex - 1);
        }
    };

    const handleFinalSubmit = (e: React.FormEvent) => {
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
        if (!data.agreement_health_accepted) {
            newValidationErrors.agreement_health_accepted = 'Debe aceptar la declaración de salud';
        }

        // Validaciones específicas del formulario de salud
        if (data.has_health_difficulties === undefined || data.has_health_difficulties === null) {
            newValidationErrors.has_health_difficulties = 'Debe especificar si tiene dificultades de salud para estudios intensivos';
        }
        if (data.has_health_difficulties && !data.medication_type) {
            newValidationErrors.medication_type = 'Debe especificar el tipo de medicamento que toma';
        }
        if (data.medication_type && data.medication_type !== 'no_medication' && data.medication_type !== 'other' && !data.medication_frequency) {
            newValidationErrors.medication_frequency = 'Debe especificar la frecuencia del medicamento';
        }
        if (data.medication_type === 'other' && !data.medication_other_description?.trim()) {
            newValidationErrors.medication_other_description = 'Debe especificar el tipo de medicamento';
        }

        if (Object.keys(newValidationErrors).length > 0) {
            setValidationErrors(newValidationErrors);
            return;
        }

        setValidationErrors({});
        nextStep();
    };

    const allAgreementsAccepted =
        data.agreement_terms_accepted && data.agreement_privacy_accepted && data.agreement_conduct_accepted && data.agreement_health_accepted;

    const currentAgreementAccepted = data[currentAgreement.id as keyof typeof data];
    const isLastAgreement = currentAgreementIndex === agreementQuestions.length - 1;

    return (
        <Card className="mx-auto w-full max-w-4xl overflow-hidden border-0 pt-0 shadow-2xl">
            <StepsHeader title={`Acuerdo ${currentAgreementIndex + 1} de ${agreementQuestions.length}`} subtitle={currentAgreement.title} />

            <CardContent className="space-y-6 p-3 sm:space-y-8 sm:p-6 md:p-8">
                {/* Indicador de progreso */}
                <div className="mb-6 flex items-center justify-center space-x-2">
                    {agreementQuestions.map((_, index) => (
                        <div key={index} className="flex items-center">
                            <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                                    index === currentAgreementIndex
                                        ? 'bg-[rgb(46_131_242_/_1)] text-white'
                                        : index < currentAgreementIndex
                                          ? 'bg-green-500 text-white'
                                          : 'bg-gray-200 text-gray-600'
                                }`}
                            >
                                {index < currentAgreementIndex ? <CheckCircle className="h-4 w-4" /> : index + 1}
                            </div>
                            {index < agreementQuestions.length - 1 && (
                                <div className={`h-0.5 w-8 ${index < currentAgreementIndex ? 'bg-green-500' : 'bg-gray-200'}`} />
                            )}
                        </div>
                    ))}
                </div>

                <form className="space-y-6" onSubmit={handleFinalSubmit} noValidate>
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <currentAgreement.icon className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">{currentAgreement.title}</h3>
                            {readingProgress[currentAgreement.id]?.canAgree && <CheckCircle className="ml-auto h-5 w-5 text-green-500" />}
                        </div>

                        <div className="rounded-lg border border-[rgb(46_131_242_/_1)]/20 bg-gray-50 p-6">
                            <div className="text-sm leading-relaxed whitespace-pre-line text-gray-700">{currentAgreement.content}</div>
                        </div>

                        {!readingProgress[currentAgreement.id]?.canAgree && (
                            <div className="flex items-center justify-center">
                                {!readingProgress[currentAgreement.id]?.isReading ? (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => startReading(currentAgreement.id, currentAgreement.minReadTime)}
                                        className="flex items-center gap-2"
                                    >
                                        <Clock className="h-4 w-4" />
                                        Comenzar Lectura ({currentAgreement.minReadTime}s)
                                    </Button>
                                ) : (
                                    <div className="flex items-center gap-2 text-[rgb(46_131_242_/_1)]">
                                        <Clock className="h-4 w-4 animate-pulse" />
                                        <span className="font-medium">Leyendo... {readingProgress[currentAgreement.id]?.timeLeft}s restantes</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Formulario de salud - Solo para acuerdo de salud */}
                        {currentAgreement.id === 'agreement_health_accepted' && readingProgress[currentAgreement.id]?.canAgree && (
                            <div className="space-y-6 rounded-lg border border-blue-200 bg-blue-50 p-6">
                                <h4 className="text-lg font-semibold text-blue-900">Declaración de Salud</h4>

                                {/* Pregunta principal sobre dificultades de salud */}
                                <div className="space-y-3">
                                    <Label className="text-base font-medium">
                                        ¿Tiene en la actualidad o ha tenido alguna vez enfermedades físicas, mentales o emocionales que le
                                        dificultarían mantener un horario intensivo de estudio, que requiere entre 8 y 10 horas diarias de
                                        concentración, lectura, análisis, trabajo en computadora y otras actividades similares? *
                                    </Label>
                                    <RadioGroup
                                        value={data.has_health_difficulties !== undefined ? data.has_health_difficulties.toString() : ''}
                                        onValueChange={(value) => {
                                            const hasHealthDifficulties = value === 'true';
                                            onDataChange('has_health_difficulties', hasHealthDifficulties);
                                            // Limpiar campos si responde "No"
                                            if (!hasHealthDifficulties) {
                                                onDataChange('medication_type', '');
                                                onDataChange('medication_frequency', '');
                                                onDataChange('medication_other_description', '');
                                            }
                                        }}
                                        className="flex gap-6"
                                        required
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="true" id="health-difficulties-yes" />
                                            <Label htmlFor="health-difficulties-yes">Sí</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="false" id="health-difficulties-no" />
                                            <Label htmlFor="health-difficulties-no">No</Label>
                                        </div>
                                    </RadioGroup>
                                    {validationErrors.has_health_difficulties && (
                                        <p className="text-sm text-red-500">{validationErrors.has_health_difficulties}</p>
                                    )}
                                </div>

                                {/* Preguntas condicionales si tiene dificultades de salud */}
                                {data.has_health_difficulties && (
                                    <div className="space-y-4 rounded-lg border border-orange-200 bg-orange-50 p-4">
                                        <h5 className="font-medium text-orange-900">Información sobre Medicamentos</h5>

                                        {/* Tipo de medicamento */}
                                        <div className="space-y-3">
                                            <Label className="text-base font-medium">
                                                ¿Actualmente toma algún tipo de medicamento relacionado con alguna de las siguientes condiciones? *
                                            </Label>
                                            <RadioGroup
                                                value={data.medication_type || ''}
                                                onValueChange={(value) => {
                                                    onDataChange('medication_type', value);
                                                    // Limpiar frecuencia si cambia el tipo
                                                    if (value === 'no_medication') {
                                                        onDataChange('medication_frequency', '');
                                                        onDataChange('medication_other_description', '');
                                                    }
                                                }}
                                                className="space-y-2"
                                                required
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="no_medication" id="no-medication" />
                                                    <Label htmlFor="no-medication">No tomo ningún medicamento actualmente</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="physical_chronic" id="physical-chronic" />
                                                    <Label htmlFor="physical-chronic">
                                                        Sí, para una condición física crónica (ej. diabetes, hipertensión, epilepsia, problemas
                                                        respiratorios, etc.)
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="emotional" id="emotional" />
                                                    <Label htmlFor="emotional">
                                                        Sí, para una condición emocional (ej. ansiedad, depresión, trastornos del estado de ánimo,
                                                        etc.)
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="mental_neurological" id="mental-neurological" />
                                                    <Label htmlFor="mental-neurological">
                                                        Sí, para una condición mental o neurológica (ej. TDAH, trastornos del sueño, bipolaridad,
                                                        etc.)
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="other" id="other-medication" />
                                                    <Label htmlFor="other-medication">
                                                        Sí, pero no relacionada con ninguna de las categorías anteriores
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                            {validationErrors.medication_type && (
                                                <p className="text-sm text-red-500">{validationErrors.medication_type}</p>
                                            )}
                                        </div>

                                        {/* Campo de especificación si selecciona "other" */}
                                        {data.medication_type === 'other' && (
                                            <div className="space-y-2">
                                                <Label htmlFor="medication_other_description">Especifique el tipo de medicamento *</Label>
                                                <Input
                                                    id="medication_other_description"
                                                    value={data.medication_other_description || ''}
                                                    onChange={(e) => onDataChange('medication_other_description', e.target.value)}
                                                    placeholder="Describa el tipo de medicamento que toma"
                                                    required={data.medication_type === 'other'}
                                                />
                                                {validationErrors.medication_other_description && (
                                                    <p className="text-sm text-red-500">{validationErrors.medication_other_description}</p>
                                                )}
                                            </div>
                                        )}

                                        {/* Frecuencia de medicamento - Solo si toma medicamento */}
                                        {data.medication_type && data.medication_type !== 'no_medication' && (
                                            <div className="space-y-2">
                                                <Label htmlFor="medication_frequency">¿Con qué frecuencia toma el medicamento? *</Label>
                                                <Select
                                                    value={data.medication_frequency || ''}
                                                    onValueChange={(value) => onDataChange('medication_frequency', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccione la frecuencia" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="diaria">Diariamente</SelectItem>
                                                        <SelectItem value="semanal">Semanal</SelectItem>
                                                        <SelectItem value="quincenal">Quincenal</SelectItem>
                                                        <SelectItem value="mensual">Mensual</SelectItem>
                                                        <SelectItem value="trimestral">Cada 3 meses</SelectItem>
                                                        <SelectItem value="semestral">Cada 6 meses</SelectItem>
                                                        <SelectItem value="cuando_necesario">Solo cuando es necesario</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {validationErrors.medication_frequency && (
                                                    <p className="text-sm text-red-500">{validationErrors.medication_frequency}</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center justify-center space-x-3 pt-4">
                            <Checkbox
                                id={currentAgreement.id}
                                checked={Boolean(currentAgreementAccepted)}
                                onCheckedChange={(checked) => handleAgreementChange(currentAgreement.id, checked as boolean)}
                                disabled={!readingProgress[currentAgreement.id]?.canAgree}
                                className="h-5 w-5 data-[state=checked]:bg-[rgb(46_131_242_/_1)]"
                            />
                            <label
                                htmlFor={currentAgreement.id}
                                className={`text-base leading-none font-medium ${
                                    !readingProgress[currentAgreement.id]?.canAgree
                                        ? 'cursor-not-allowed text-gray-400'
                                        : 'cursor-pointer text-gray-900'
                                }`}
                            >
                                He leído y acepto este acuerdo
                            </label>
                        </div>

                        {(validationErrors[currentAgreement.id] || errors[currentAgreement.id]) && (
                            <p className="text-center text-sm text-red-500">{validationErrors[currentAgreement.id] || errors[currentAgreement.id]}</p>
                        )}
                    </div>

                    {/* Botones de navegación */}
                    <div className="flex justify-between pt-6">
                        <Button
                            type="button"
                            onClick={currentAgreementIndex === 0 ? previousStep : goToPreviousAgreement}
                            variant="outline"
                            size="lg"
                            className="min-w-[120px]"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {currentAgreementIndex === 0 ? 'Anterior' : 'Acuerdo Anterior'}
                        </Button>

                        {!isLastAgreement ? (
                            <Button
                                type="button"
                                onClick={goToNextAgreement}
                                disabled={!currentAgreementAccepted}
                                size="lg"
                                className="min-w-[140px] bg-[rgb(46_131_242_/1)] text-white transition-colors hover:bg-[rgb(46_131_242/_1)]/90 disabled:opacity-50"
                            >
                                Siguiente Acuerdo
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                disabled={!allAgreementsAccepted}
                                size="lg"
                                className="min-w-[140px] bg-[rgb(46_131_242_/1)] text-white transition-colors hover:bg-[rgb(46_131_242/_1)]/90 disabled:opacity-50"
                            >
                                {ui.buttons?.Finalizar || 'Finalizar Inscripción'}
                            </Button>
                        )}
                    </div>

                    {/* Resumen de progreso */}
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
                        <p className="text-sm text-blue-800">
                            {allAgreementsAccepted
                                ? '✅ Todos los acuerdos han sido aceptados'
                                : `Progreso: ${[data.agreement_terms_accepted, data.agreement_privacy_accepted, data.agreement_conduct_accepted, data.agreement_health_accepted].filter(Boolean).length} de ${agreementQuestions.length} acuerdos aceptados`}
                        </p>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
