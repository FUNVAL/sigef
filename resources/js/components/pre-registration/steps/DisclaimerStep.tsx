import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { AlertTriangle } from "lucide-react"

interface DisclaimerStepProps {
  onNext: () => void;
}

export function DisclaimerStep({ onNext }: DisclaimerStepProps) {
  const [accepted, setAccepted] = useState(false)

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-2">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-funval-blue/10 flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-funval-blue" />
          </div>
          <CardTitle className="text-2xl font-bold text-funval-blue">
            Términos y Condiciones - FUNVAL Internacional
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <div className="bg-muted/50 p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold text-funval-darkBlue">
                Información Importante sobre Nuestros Programas
              </h3>
              
              <div className="space-y-3 text-sm">
                <p>
                  <strong>FUNVAL Internacional</strong> es una organización sin fines de lucro dedicada a brindar 
                  capacitaciones técnicas de alta calidad en países de Latinoamérica.
                </p>
                
                <p>
                  Al continuar con este formulario, usted acepta que:
                </p>
                
                <ul className="list-disc pl-5 space-y-2">
                  <li>La información proporcionada será utilizada exclusivamente para fines de evaluación y contacto</li>
                  <li>Los programas están dirigidos a personas que cumplan con los requisitos específicos de cada curso</li>
                  <li>FUNVAL se reserva el derecho de seleccionar candidatos basándose en criterios académicos y disponibilidad</li>
                  <li>Las referencias de "estaca/zona" hacen referencia a unidades organizacionales de la Iglesia de Jesucristo de los Santos de los Últimos Días</li>
                  <li>El proceso de selección puede tomar entre 24 a 72 horas hábiles</li>
                  <li>Los cursos tienen requisitos específicos de dedicación horaria y compromiso</li>
                </ul>
                
                <p className="text-funval-darkBlue font-medium">
                  Los datos personales serán tratados con confidencialidad y no serán compartidos con terceros 
                  sin su consentimiento expreso.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 p-4 border rounded-lg bg-background">
            <Checkbox
              id="terms"
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked as boolean)}
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
              onClick={onNext}
              disabled={!accepted}
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