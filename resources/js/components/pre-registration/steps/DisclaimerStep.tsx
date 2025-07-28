import { useContext, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { StepperContext } from "@/pages/forms/stepper-provider"

export function DisclaimerStep() {
  const { nextStep } = useContext(StepperContext);
  const [accepted, setAccepted] = useState(false)

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-2">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
            {/*  <AlertTriangle className="h-8 w-8 text-funval-blue" /> */}
            <img src="/brujula.png" alt="FunvalBrujula" className="h-12 w-12" />
          </div>
          <CardTitle className="text-4xl font-bold text-[rgb(46_131_242_/_1)]">
            ¡Bienvenido a FUNVAL Internacional!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <div className="bg-muted/50 p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold text-funval-darkBlue">
                Nos complace recibir tu aplicación o referencia.
              </h3>

              <div className="space-y-3 text-sm">
                <p className="text-funval-darkBlue">
                  Este programa está dirigido a personas que buscan empleo y están dispuestas a comprometerse con un proceso intensivo de formación, dedicando entre <strong>10 y 12 horas diarias de lunes a viernes.</strong>
                </p>

                <p>
                  Si tú o la persona referida tienen la motivación y el compromiso para alcanzar este objetivo, ¡adelante! Estamos entusiasmados por acompañarlos en la búsqueda de empleo.
                </p>

                <p className="text-funval-darkBlue font-medium">
                  Queremos asegurarte de que toda la información personal será tratada con estricta confidencialidad y <strong>no será compartida con terceros sin consentimiento previo.</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 p-4 border rounded-lg bg-background">
            <Checkbox
              id="terms"
              checked={accepted}
              className="data-[state=checked]:bg-[rgb(46_131_242_/_1)] data-[state=checked]:text-white"
              onCheckedChange={(checked) => setAccepted(checked as boolean)

              }
            />
            <Label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              He leído y acepto los términos y condiciones mencionados anteriormente.
              Confirmo que la información que proporcionaré es verídica y completa.
            </Label>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={nextStep}
              disabled={!accepted}
              size="lg"
              className="min-w-[200px] bg-[rgb(46_131_242_/_1)] text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}