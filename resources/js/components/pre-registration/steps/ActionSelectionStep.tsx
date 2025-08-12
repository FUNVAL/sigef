import { useContext, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Users, UserPlus, ArrowLeft } from "lucide-react"
import { StepperContext } from "@/pages/forms/stepper-provider"
import { Link, usePage } from "@inertiajs/react"
import { Translation } from "@/types/global"
import { StepsHeader } from "../steps-header"

interface ActionSelectionStepProps {
  onAction: (action: 'reference-form' | 'preinscription-form') => void;
  action: 'reference-form' | 'preinscription-form' | '';
}

export function ActionSelectionStep() {
  const { nextStep, previousStep } = useContext(StepperContext);
  const [action, setAction] = useState<ActionSelectionStepProps['action']>('');
  const { ui, action_selection } = usePage<Translation>().props;

  return (
    <Card className="w-full max-w-4xl shadow-2xl border-0 overflow-hidden pt-0 mx-auto">
      <StepsHeader
        title={action_selection.title}
        subtitle={action_selection.subtitle}
      />

      <CardContent className="p-8 space-y-8">
        <RadioGroup
          className="space-y-4"
          value={action}
          onValueChange={(value) => setAction(value as ActionSelectionStepProps['action'])}
        >
          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <Label htmlFor="preregistration" className="text-base font-medium cursor-pointer">
              <div className="flex items-center space-x-3 flex-1">
                <RadioGroupItem value="preinscription-form" id="preregistration" />
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  {action_selection.pre_inscription.title}
                  <p className="text-sm text-gray-600 mt-1">
                    {action_selection.pre_inscription.description}
                  </p>
                </div>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <Label htmlFor="referral" className="text-base font-medium cursor-pointer">
              <div className="flex items-center space-x-3 flex-1">
                <RadioGroupItem value="reference-form" id="referral" />
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  {action_selection.referral.title}
                  <p className="text-sm text-gray-600 mt-1">
                    {action_selection.referral.description}
                  </p>
                </div>
              </div>
            </Label>
          </div>

        </RadioGroup>

        <div className="flex justify-between pt-4">
          <Button
            onClick={previousStep}
            variant="outline"
            size="lg"
            className="min-w-[120px]"
          >
            <ArrowLeft className="h-4 w-4 mr-2 text-gray-600" />
            {ui.buttons.previous}
          </Button>

          <Button
            disabled={!action}
            onClick={nextStep}
            asChild
            size="lg"
            className={`min-w-[140px] bg-blue-600 text-white hover:shadow-lg hover:bg-blue-700 ${!action && 'opacity-50 cursor-not-allowed'}`}
          >
            <Link
              href={`${action}?step=2&full=true`}
              tabIndex={!action ? -1 : 0}
              aria-disabled={!action}
            >
              {ui.buttons.continue}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}