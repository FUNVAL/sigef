import { useContext, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { StepperContext } from "@/pages/forms/stepper-provider"
import { usePage } from "@inertiajs/react"
import { Translation } from "@/types/global"
import { StepsHeader } from "../steps-header"
import { CheckCircle, Clock, Users, Target, Shield, Sparkle } from "lucide-react"

export function DisclaimerStep() {
  const { nextStep } = useContext(StepperContext);
  const [accepted, setAccepted] = useState(false);
  const { ui, welcome_disclaimer } = usePage<Translation>().props;

  return (

    <Card className="w-full max-w-4xl shadow-2xl border-0 overflow-hidden pt-0 mx-auto">
      <StepsHeader
        title={welcome_disclaimer.title}
        subtitle={welcome_disclaimer.subtitle}
      />

      <CardContent className="p-8 space-y-8">

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <Sparkle className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800" dangerouslySetInnerHTML={{ __html: welcome_disclaimer.program_description.title }} />
          </div>
          <p
            className="text-gray-700 mb-4 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{
              __html: welcome_disclaimer.program_description.description,
            }}
          />
          <div className="flex items-center gap-3 text-green-700 bg-green-50 py-4 px-6 rounded-lg border border-green-200">
            <p className="font-medium">{welcome_disclaimer.motivation}</p>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-gray-600" />
            <h3 className="text-xl font-semibold text-gray-800">
              {welcome_disclaimer.privacy.title}
            </h3>
          </div>
          <p
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: welcome_disclaimer.privacy.description,
            }}
          />
        </div>

        {/* Terms and Conditions */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={accepted}
              className="mt-1 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
              onCheckedChange={(checked) => setAccepted(checked as boolean)}
            />
            <Label
              htmlFor="terms"
              className="text-sm text-gray-700 leading-relaxed cursor-pointer"
            >
              {welcome_disclaimer.accept_terms}
            </Label>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={nextStep}
            disabled={!accepted}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700  text-white px-12 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {ui.buttons.continue}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}