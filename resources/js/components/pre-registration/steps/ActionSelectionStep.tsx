import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Users, UserPlus, ArrowLeft } from "lucide-react"

interface ActionSelectionStepProps {
  onNext: (action: 'referral' | 'preregistration') => void;
  onBack: () => void;
}

export function ActionSelectionStep({ onNext, onBack }: ActionSelectionStepProps) {
  const [selectedAction, setSelectedAction] = useState<'referral' | 'preregistration' | ''>('')

  const handleNext = () => {
    if (selectedAction) {
      onNext(selectedAction)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-2">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-funval-blue">
            ¿Qué acción deseas realizar?
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Selecciona una de las siguientes opciones para continuar
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={selectedAction}
            onValueChange={(value) => setSelectedAction(value as 'referral' | 'preregistration')}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <RadioGroupItem value="referral" id="referral" />
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-12 h-12 rounded-full bg-funval-blue/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-funval-blue" />
                </div>
                <div className="flex-1">
                  <Label htmlFor="referral" className="text-base font-medium cursor-pointer">
                    Referir a un amigo
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Recomienda a alguien que conozcas para nuestros programas de capacitación
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <RadioGroupItem value="preregistration" id="preregistration" />
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-12 h-12 rounded-full bg-funval-blue/10 flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-funval-blue" />
                </div>
                <div className="flex-1">
                  <Label htmlFor="preregistration" className="text-base font-medium cursor-pointer">
                    Pre-inscribirme al curso
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Completa tu pre-inscripción para participar en nuestros programas
                  </p>
                </div>
              </div>
            </div>
          </RadioGroup>

          <div className="flex justify-between pt-4">
            <Button
              onClick={onBack}
              variant="outline"
              size="lg"
              className="min-w-[120px]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!selectedAction}
              variant="funval"
              size="lg"
              className="min-w-[200px]"
            >
              Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}