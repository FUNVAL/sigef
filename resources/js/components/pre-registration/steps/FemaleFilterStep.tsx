import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { femaleValidationSchema } from '@/lib/schemas/pre-registration';
import validateForm from '@/lib/schemas/validate-schemas';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { Enums, Translation } from '@/types/global';
import { PreRegistrationRequest } from '@/types/pre-inscription';
import { usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useContext, useState } from 'react';
import { StepsHeader } from '../steps-header';

interface FemaleFilterStepProps {
    request: PreRegistrationRequest;
}

export function FemaleFilterStep({ request }: FemaleFilterStepProps) {
    const { nextStep, previousStep } = useContext(StepperContext);
    const { data, setData } = request;
    const { enums, forms, ui } = usePage<{
        enums: Enums;
        forms: Translation['forms'];
        ui: Translation['ui'];
    }>().props;
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = () => {
        const validate = validateForm(data, femaleValidationSchema);
        if (!validate.success) {
            setErrors(validate?.errors);
            return;
        }
        nextStep();
    };

    const isWorking = data.currently_working !== null ? (data.currently_working ? 'si' : 'no') : '';
    const isAvailableFullTime = data.available_full_time !== null ? (data.available_full_time ? 'si' : 'no') : '';

    return (
        <Card className="mx-auto w-full max-w-4xl overflow-hidden border-0 pt-0 shadow-2xl">
            <StepsHeader title={forms.pre_inscription.female_filter.title} subtitle={forms.pre_inscription.female_filter.description} />

            <CardContent className="space-y-6 p-3 sm:space-y-8 sm:p-6 md:p-8">
                {/* Primera pregunta: ¿Estás trabajando? */}
                <div className="space-y-4">
                    <Label className="text-funval-darkBlue text-lg font-semibold">{forms.pre_inscription.female_filter.currently_working} *</Label>
                    <RadioGroup value={isWorking} onValueChange={(value) => setData('currently_working', value === 'si')} className="space-y-3">
                        <Label
                            htmlFor="trabajando-si"
                            className="hover:bg-muted/50 flex cursor-pointer items-center gap-4 space-x-3 rounded-lg border p-2 sm:p-3"
                        >
                            <RadioGroupItem value="si" id="trabajando-si" />
                            {forms.pre_inscription.female_filter.answers.working_yes}
                        </Label>

                        <Label
                            htmlFor="trabajando-no"
                            className="hover:bg-muted/50 flex cursor-pointer items-center gap-4 space-x-3 rounded-lg border p-2 sm:p-3"
                        >
                            <RadioGroupItem value="no" id="trabajando-no" />
                            {forms.pre_inscription.female_filter.answers.working_no}
                        </Label>
                    </RadioGroup>
                    {errors.currently_working && <p className="mt-2 text-sm text-red-500">{errors.currently_working}</p>}
                </div>

                {/* Segunda pregunta: Tipo de empleo (solo si no está trabajando) */}
                {data.currently_working === false && (
                    <div className="animate-in slide-in-from-bottom-2 space-y-4">
                        <Label className="text-funval-darkBlue text-lg font-semibold">
                            {forms.pre_inscription.female_filter.job_type_preference} *
                        </Label>
                        <RadioGroup
                            value={data.job_type_preference?.toString() || ''}
                            onValueChange={(value) => setData('job_type_preference', Number(value))}
                            className="space-y-3"
                        >
                            {enums?.jobType?.map((modality) => (
                                <Label
                                    key={modality.id}
                                    htmlFor={modality.id.toString()}
                                    className="hover:bg-muted/50 flex cursor-pointer items-center gap-4 rounded-lg border p-2 sm:p-3"
                                >
                                    <RadioGroupItem value={modality.id.toString()} id={modality.id.toString()} />
                                    {modality.name}
                                </Label>
                            ))}
                        </RadioGroup>
                        {errors.job_type_preference && <p className="mt-2 text-sm text-red-500">{errors.job_type_preference}</p>}
                    </div>
                )}

                {/* Tercera pregunta: Disponibilidad horaria (solo si seleccionó trabajo fuera de casa) */}
                {data.job_type_preference === 2 && (
                    <div className="animate-in slide-in-from-bottom-2 space-y-4">
                        <Label className="text-funval-darkBlue text-lg font-semibold">
                            {forms.pre_inscription.female_filter.available_full_time} *
                        </Label>
                        <RadioGroup
                            value={isAvailableFullTime}
                            onValueChange={(value) => setData('available_full_time', value === 'si')}
                            className="space-y-3"
                        >
                            <Label
                                htmlFor="disponibilidad-si"
                                className="hover:bg-muted/50 flex cursor-pointer items-center gap-4 rounded-lg border p-2 sm:p-3"
                            >
                                <RadioGroupItem value="si" id="disponibilidad-si" />
                                {forms.pre_inscription.female_filter.answers.availability_yes}
                            </Label>
                            <Label
                                htmlFor="disponibilidad-no"
                                className="hover:bg-muted/50 flex cursor-pointer items-center gap-4 rounded-lg border p-2 sm:p-3"
                            >
                                <RadioGroupItem value="no" id="disponibilidad-no" />
                                {forms.pre_inscription.female_filter.answers.availability_no}
                            </Label>
                        </RadioGroup>
                        {errors.available_full_time && <p className="mt-2 text-sm text-red-500">{errors.available_full_time}</p>}
                    </div>
                )}

                <div className="flex justify-between pt-4">
                    <Button onClick={previousStep} variant="outline" size="lg" className="min-w-[120px]">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {ui.buttons.previous}
                    </Button>

                    <Button
                        onClick={handleSubmit}
                        size="lg"
                        className="transform bg-blue-600 px-12 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {ui.buttons.continue}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
