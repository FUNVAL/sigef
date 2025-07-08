import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Users, UserPlus, ArrowLeft } from "lucide-react"

interface ActionSelectionStepProps {
  onNext: () => void;
  onBack: () => void;
  onAction: (action: 'referral' | 'preregistration') => void;
  action: 'referral' | 'preregistration' | '';
}

export function ActionSelectionStep({ onNext, onBack, onAction, action }: ActionSelectionStepProps) {

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
            value={action}
            onValueChange={(value) => { onAction(value as 'referral' | 'preregistration') }}
            className="space-y-4 checked:bg-[rgb(46_131_242_/_1)] "
          >
            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <Label htmlFor="referral" className="text-base font-medium cursor-pointer">
                <div className="flex items-center space-x-3 flex-1">
                  <RadioGroupItem value="referral" id="referral" />
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
                  <RadioGroupItem value="preregistration" id="preregistration" />
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
              onClick={onBack}
              variant="outline"
              size="lg"
              className="min-w-[120px]"
            >
              <ArrowLeft className="h-4 w-4 mr-2 hover:text-[rgb(46_131_242_/_1)]" />
              Anterior
            </Button>

            <Button
              onClick={onNext}
              disabled={!action}
              size="lg"
              className="min-w-[200px] bg-[rgb(46_131_242_/_1)] text-white hover:shadow-lg hover:bg-[rgb(46_131_242_/_1)]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div >
  )
}