import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { RecruitmentRequest } from '@/types/recruitment';
import { ArrowLeft, Heart, Shield } from 'lucide-react';
import { useContext, useState } from 'react';
import { StepsHeader } from '../../pre-registration/steps-header';

interface HealthStepProps {
    request: RecruitmentRequest;
}

export function HealthStep({ request }: HealthStepProps) {
    const { nextStep, previousStep } = useContext(StepperContext);
    const { data, setData } = request;
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validación básica
        const validationErrors: Record<string, string> = {};

        if (data.has_illness && !data.illness_description?.trim()) {
            validationErrors.illness_description = 'Debe describir la enfermedad';
        }

        if (data.has_illness && data.takes_medication === undefined) {
            validationErrors.takes_medication = 'Debe indicar si toma medicamentos';
        }

        if (data.has_illness && !data.medical_visit_frequency?.trim()) {
            validationErrors.medical_visit_frequency = 'Debe indicar la frecuencia de visitas médicas';
        }

        if (!data.has_illness && !data.health_declaration_accepted) {
            validationErrors.health_declaration_accepted = 'Debe aceptar la declaración de salud';
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
                title="Información de Salud"
                subtitle="Proporcione información sobre su estado de salud"
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Seguro médico */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            ¿Cuenta con seguro médico?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="has_health_insurance"
                                    checked={data.has_health_insurance === true}
                                    onChange={() => setData('has_health_insurance', true)}
                                />
                                Sí
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="has_health_insurance"
                                    checked={data.has_health_insurance === false}
                                    onChange={() => setData('has_health_insurance', false)}
                                />
                                No
                            </label>
                        </div>
                    </CardContent>
                </Card>

                {/* Enfermedad */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Heart className="h-5 w-5" />
                            ¿Padece de alguna enfermedad?
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="has_illness"
                                    checked={data.has_illness === true}
                                    onChange={() => setData('has_illness', true)}
                                />
                                Sí
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="has_illness"
                                    checked={data.has_illness === false}
                                    onChange={() => {
                                        setData('has_illness', false);
                                        setData('illness_description', '');
                                        setData('takes_medication', false);
                                        setData('medical_visit_frequency', '');
                                    }}
                                />
                                No
                            </label>
                        </div>

                        {data.has_illness && (
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="illness_description">Escriba la enfermedad</Label>
                                    <textarea
                                        id="illness_description"
                                        value={data.illness_description || ''}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('illness_description', e.target.value)}
                                        placeholder="Describa su enfermedad..."
                                        className={`w-full min-h-[80px] p-2 border rounded-md ${errors.illness_description ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.illness_description && (
                                        <p className="text-sm text-red-500 mt-1">{errors.illness_description}</p>
                                    )}
                                </div>

                                <div>
                                    <Label>¿Toma algún medicamento?</Label>
                                    <div className="flex gap-4 mt-2">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="takes_medication"
                                                checked={data.takes_medication === true}
                                                onChange={() => setData('takes_medication', true)}
                                            />
                                            Sí
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="takes_medication"
                                                checked={data.takes_medication === false}
                                                onChange={() => setData('takes_medication', false)}
                                            />
                                            No
                                        </label>
                                    </div>
                                    {errors.takes_medication && (
                                        <p className="text-sm text-red-500 mt-1">{errors.takes_medication}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="medical_visit_frequency">¿Con qué frecuencia asiste al médico por su enfermedad?</Label>
                                    <Input
                                        id="medical_visit_frequency"
                                        value={data.medical_visit_frequency || ''}
                                        onChange={(e) => setData('medical_visit_frequency', e.target.value)}
                                        placeholder="Ej: Mensual, cada 3 meses, etc."
                                        className={errors.medical_visit_frequency ? 'border-red-500' : ''}
                                    />
                                    {errors.medical_visit_frequency && (
                                        <p className="text-sm text-red-500 mt-1">{errors.medical_visit_frequency}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {!data.has_illness && (
                            <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                                <h4 className="font-semibold">DECLARACIÓN JURADA DE SALUD</h4>
                                <p className="text-sm text-gray-700">
                                    Declaro que no padezco de ninguna enfermedad o condición de salud que pueda representar 
                                    un inconveniente para tomar el curso. Entiendo que esta información no constituye una 
                                    restricción para participar en el programa educativo.
                                </p>
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={data.health_declaration_accepted}
                                        onCheckedChange={(checked) => setData('health_declaration_accepted', checked as boolean)}
                                    />
                                    <Label className="text-sm">
                                        Acepto la declaración jurada de salud
                                    </Label>
                                </div>
                                {errors.health_declaration_accepted && (
                                    <p className="text-sm text-red-500">{errors.health_declaration_accepted}</p>
                                )}
                            </div>
                        )}
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