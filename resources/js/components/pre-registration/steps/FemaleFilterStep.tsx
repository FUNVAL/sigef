import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Users2, ArrowLeft } from "lucide-react"
import { usePage } from "@inertiajs/react"
import { Enums, Translation } from "@/types/global"
import validateForm from "@/lib/schemas/validate-schemas"
import { PreRegistrationRequest, PreRegistrationFormData } from "@/types/pre-inscription"
import { femaleValidationSchema } from "@/lib/schemas/pre-registration"
import { useContext, useState } from "react"
import { StepperContext } from "@/pages/forms/stepper-provider"
import { StepsHeader } from "../steps-header";

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
  }

  const isWorking = data.currently_working !== null ? data.currently_working ? 'si' : 'no' : '';
  const isAvailableFullTime = data.available_full_time !== null ? data.available_full_time ? 'si' : 'no' : '';

  return (
    <Card className="w-full max-w-4xl shadow-2xl border-0 overflow-hidden pt-0 mx-auto">
      <StepsHeader
        title={forms.pre_inscription.female_filter.title}
        subtitle={forms.pre_inscription.female_filter.description}
      />

      <CardContent className="p-8 space-y-8">
        {/* Primera pregunta: ¿Estás trabajando? */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-funval-darkBlue">
            {forms.pre_inscription.female_filter.currently_working} *
          </Label>
          <RadioGroup
            value={isWorking}
            onValueChange={(value) => setData('currently_working', value === 'si')}
            className="space-y-3"
          >

            <Label htmlFor="trabajando-si" className="cursor-pointer flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 gap-4">
              <RadioGroupItem value="si" id="trabajando-si" />
              {forms.pre_inscription.female_filter.answers.working_yes}
            </Label>

            <Label
              htmlFor="trabajando-no"
              className="cursor-pointer flex items-center space-x-3 gap-4 p-3 border rounded-lg hover:bg-muted/50"
            >
              <RadioGroupItem value="no" id="trabajando-no" />
              {forms.pre_inscription.female_filter.answers.working_no}
            </Label>
          </RadioGroup>
          {errors.currently_working && (
            <p className="text-red-500 text-sm mt-2">{errors.currently_working}</p>
          )}
        </div>

        {/* Segunda pregunta: Tipo de empleo (solo si no está trabajando) */}
        {data.currently_working === false && (
          <div className="space-y-4 animate-in slide-in-from-bottom-2">
            <Label className="text-lg font-semibold text-funval-darkBlue">
              {forms.pre_inscription.female_filter.job_type_preference} *
            </Label>
            <RadioGroup
              value={data.job_type_preference?.toString() || ''}
              onValueChange={(value) => setData('job_type_preference', Number(value))}
              className="space-y-3"
            >
              {
                enums?.jobType?.map((modality) => (
                  <Label
                    key={modality.id}
                    htmlFor={modality.id.toString()}
                    className="cursor-pointer flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50"
                  >
                    <RadioGroupItem value={modality.id.toString()} id={modality.id.toString()} />
                    {modality.name}
                  </Label>
                ))
              }
            </RadioGroup>
            {errors.job_type_preference && (
              <p className="text-red-500 text-sm mt-2">{errors.job_type_preference}</p>
            )}
          </div>
        )}

        {/* Tercera pregunta: Disponibilidad horaria (solo si seleccionó trabajo fuera de casa) */}
        {data.job_type_preference === 2 && (
          <div className="space-y-4 animate-in slide-in-from-bottom-2">
            <Label className="text-lg font-semibold text-funval-darkBlue">
              {forms.pre_inscription.female_filter.available_full_time} *
            </Label>
            <RadioGroup
              value={isAvailableFullTime}
              onValueChange={(value) => setData('available_full_time', value === 'si')}
              className="space-y-3"
            >
              <Label
                htmlFor="disponibilidad-si"
                className="cursor-pointer flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50"
              >
                <RadioGroupItem value="si" id="disponibilidad-si" />
                {forms.pre_inscription.female_filter.answers.availability_yes}
              </Label>
              <Label
                htmlFor="disponibilidad-no"
                className="cursor-pointer flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50"
              >
                <RadioGroupItem value="no" id="disponibilidad-no" />
                {forms.pre_inscription.female_filter.answers.availability_no}
              </Label>
            </RadioGroup>
            {errors.available_full_time && (
              <p className="text-red-500 text-sm mt-2">{errors.available_full_time}</p>
            )}
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button
            onClick={previousStep}
            variant="outline"
            size="lg"
            className="min-w-[120px]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {ui.buttons.previous}
          </Button>

          <Button
            onClick={handleSubmit}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {ui.buttons.continue}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}