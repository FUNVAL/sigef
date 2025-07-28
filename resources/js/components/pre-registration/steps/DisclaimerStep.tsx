import { useContext, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { StepperContext } from "@/pages/forms/stepper-provider"
import { usePage } from "@inertiajs/react"


type Translation = {
  welcome_disclaimer: {
    title: string;
    subtitle: string;
    program_description: string;
    motivation: string;
    privacy: string;
    accept_terms: string;
  };
  ui: {
    buttons: Record<string, string>
  }
}

export function DisclaimerStep() {
  const { nextStep } = useContext(StepperContext);
  const [accepted, setAccepted] = useState(false)
  const { ui, welcome_disclaimer } = usePage<Translation>().props

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-2">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <img src="/brujula.png" alt="FunvalBrujula" className="h-12 w-12" />
          </div>
          <CardTitle className="text-4xl font-bold text-[rgb(46_131_242_/_1)]">
            {welcome_disclaimer.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <div className="bg-muted/50 p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold text-funval-darkBlue">
                {welcome_disclaimer.subtitle}
              </h3>

              <div className="space-y-3 text-sm">
                <p className="text-funval-darkBlue"
                  dangerouslySetInnerHTML={{ __html: welcome_disclaimer.program_description.replace('10 y 12', '<strong>10 y 12</strong>') }} />

                <p>
                  {welcome_disclaimer.motivation}
                </p>

                <p className="text-funval-darkBlue font-medium"
                  dangerouslySetInnerHTML={{ __html: welcome_disclaimer.privacy.replace('no será compartida con terceros sin consentimiento previo', '<strong>no será compartida con terceros sin consentimiento previo</strong>') }} />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 p-4 border rounded-lg bg-background">
            <Checkbox
              id="terms"
              checked={accepted}
              className="data-[state=checked]:bg-[rgb(46_131_242_/_1)] data-[state=checked]:text-white"
              onCheckedChange={(checked) => setAccepted(checked as boolean)}
            />
            <Label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {welcome_disclaimer.accept_terms}
            </Label>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={nextStep}
              disabled={!accepted}
              size="lg"
              className="min-w-[200px] bg-[rgb(46_131_242_/_1)] text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {ui.buttons.continue}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}