import { useContext, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Users, UserPlus, ArrowLeft } from "lucide-react"
import { StepperContext } from "@/pages/forms/stepper-provider"
import { Link } from "@inertiajs/react"

interface ActionSelectionStepProps {
  onAction: (action: 'reference-form' | 'pre-inscription-form') => void;
  action: 'reference-form' | 'pre-inscription-form' | '';
}

export function ActionSelectionStep() {
  const { nextStep, previousStep } = useContext(StepperContext);
  const [action, setAction] = useState<ActionSelectionStepProps['action']>('');

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-2">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-[rgb(46_131_242_/_1)]">
            ¿Qué acción deseas realizar?
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Selecciona una de las siguientes opciones para continuar
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            className="space-y-4 checked:bg-[rgb(46_131_242_/_1)]"
            value={action}
            onValueChange={(value) => setAction(value as ActionSelectionStepProps['action'])}
          >
            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <Label htmlFor="referral" className="text-base font-medium cursor-pointer">
                <div className="flex items-center space-x-3 flex-1">
                  <RadioGroupItem value="reference-form" id="referral" />
                  <div className="w-12 h-12 rounded-full bg-[rgb(46_131_242_/_1)]/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-[rgb(46_131_242_/_1)]" />
                  </div>
                  <div className="flex-1">
                    Referir a un amigo
                    <p className="text-sm text-muted-foreground mt-1">
                      Recomienda a alguien que conozcas para que participe de nuestros programas de capacitación
                    </p>
                  </div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <Label htmlFor="preregistration" className="text-base font-medium cursor-pointer">
                <div className="flex items-center space-x-3 flex-1">
                  <RadioGroupItem value="pre-inscription-form" id="preregistration" />
                  <div className="w-12 h-12 rounded-full bg-[rgb(46_131_242_/_1)]/10 flex items-center justify-center">
                    <UserPlus className="h-6 w-6 text-[rgb(46_131_242_/_1)]" />
                  </div>
                  <div className="flex-1">
                    Pre-inscribirme al curso
                    <p className="text-sm text-muted-foreground mt-1">
                      Completa tu pre-inscripción para participar en nuestros programas
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
              <ArrowLeft className="h-4 w-4 mr-2 hover:text-[rgb(46_131_242_/_1)]" />
              Anterior
            </Button>

            <Button
              disabled={!action}
              onClick={nextStep}
              asChild
              size="lg"
              className={`min-w-[140px] bg-[rgb(46_131_242_/_1)] text-white hover:shadow-lg hover:bg-[rgb(46_131_242_/_1)]/90 ${!action && 'opacity-50 cursor-not-allowed'}`}
            >
              <Link
                href={`${action}?step=2`}
                tabIndex={!action ? -1 : 0}
                aria-disabled={!action}
              >
                Continuar
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div >
  )
}