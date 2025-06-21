import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { PreRegistrationFormData } from '../../../types/forms'
import { AlertCircle, CheckCircle2, Users2, ArrowLeft } from "lucide-react"

interface FemaleFilterStepProps {
  formData: PreRegistrationFormData;
  onNext: (data: PreRegistrationFormData) => void;
  onShowMessage: (message: string, type: 'success' | 'warning' | 'info') => void;
  onBack: () => void;
}

export function FemaleFilterStep({ formData, onNext, onShowMessage, onBack }: FemaleFilterStepProps) {
  const [estaTrabajando, setEstaTrabajando] = useState('')
  const [tipoEmpleoDeseado, setTipoEmpleoDeseado] = useState('')
  const [disponibilidadHorario, setDisponibilidadHorario] = useState('')

  const handleNext = () => {
    // Validar que todas las preguntas necesarias estén respondidas
    if (!estaTrabajando) {
      return
    }

    if (estaTrabajando === 'si') {
      onShowMessage(
        'Debido a las capacitaciones intensivas de Funval, el programa está dirigido a personas sin empleo. Si más adelante tienes la necesidad de un empleo no dudes en contactarnos nuevamente.',
        'warning'
      )
      return
    }

    if (!tipoEmpleoDeseado) {
      return
    }

    if (tipoEmpleoDeseado === 'trabajo_en_casa') {
      onShowMessage(
        'FUNVAL tiene alianza con empresas que requieren que las personas trabajen presencialmente. Si en el futuro esta es una opción para ti contáctanos nuevamente.',
        'info'
      )
      return
    }

    if (tipoEmpleoDeseado === 'emprendimiento') {
      onShowMessage(
        'Excelente, pronto recibirás más información de las organizaciones aliadas con FUNVAL expertas en emprendimiento.',
        'success'
      )
      return
    }

    if (tipoEmpleoDeseado === 'trabajo_fuera_casa') {
      if (!disponibilidadHorario) {
        return
      }

      if (disponibilidadHorario === 'no') {
        onShowMessage(
          'Debido a la intensidad de los programas de FUNVAL se requiere una conexión continua sin realizar otras actividades durante el programa de capacitación. Si en el futuro tienes esta disponibilidad de tiempo, vuelve a contactarnos.',
          'warning'
        )
        return
      }

      if (disponibilidadHorario === 'si') {
        // Continuar al siguiente paso con los cursos
        const updatedData = {
          ...formData,
          estaTrabajando,
          tipoEmpleoDeseado,
          disponibilidadHorario
        }
        onNext(updatedData)
      }
    }
  }

  const canShowTipoEmpleo = estaTrabajando === 'no'
  const canShowDisponibilidad = tipoEmpleoDeseado === 'trabajo_fuera_casa'
  const canProceed = estaTrabajando && (
    estaTrabajando === 'si' || 
    (tipoEmpleoDeseado && (
      tipoEmpleoDeseado !== 'trabajo_fuera_casa' || 
      disponibilidadHorario
    ))
  )

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-2">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-[rgb(46_131_242_/_1)]/10 flex items-center justify-center mb-4">
            <Users2 className="h-8 w-8 text-[rgb(46_131_242_/_1)]" />
          </div>
          <CardTitle className="text-2xl font-bold text-[rgb(46_131_242_/_1)]">
            Preguntas de Evaluación
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Estas preguntas nos ayudan a determinar si nuestros programas son adecuados para ti
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Primera pregunta: ¿Estás trabajando? */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-funval-darkBlue">
              ¿Estás trabajando actualmente? *
            </Label>
            <RadioGroup
              value={estaTrabajando}
              onValueChange={setEstaTrabajando}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                <RadioGroupItem value="si" id="trabajando-si" />
                <Label htmlFor="trabajando-si" className="cursor-pointer">Sí, actualmente trabajo</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                <RadioGroupItem value="no" id="trabajando-no" />
                <Label htmlFor="trabajando-no" className="cursor-pointer">No, no estoy trabajando</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Segunda pregunta: Tipo de empleo (solo si no está trabajando) */}
          {canShowTipoEmpleo && (
            <div className="space-y-4 animate-in slide-in-from-bottom-2">
              <Label className="text-lg font-semibold text-funval-darkBlue">
                ¿Qué tipo de empleo buscas? *
              </Label>
              <RadioGroup
                value={tipoEmpleoDeseado}
                onValueChange={setTipoEmpleoDeseado}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value="trabajo_fuera_casa" id="fuera-casa" />
                  <Label htmlFor="fuera-casa" className="cursor-pointer">Trabajo fuera de casa</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value="trabajo_en_casa" id="en-casa" />
                  <Label htmlFor="en-casa" className="cursor-pointer">Trabajo en casa</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value="emprendimiento" id="emprendimiento" />
                  <Label htmlFor="emprendimiento" className="cursor-pointer">Emprendimiento</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Tercera pregunta: Disponibilidad horaria (solo si seleccionó trabajo fuera de casa) */}
          {canShowDisponibilidad && (
            <div className="space-y-4 animate-in slide-in-from-bottom-2">
              <Label className="text-lg font-semibold text-funval-darkBlue">
                ¿Tienes disponibilidad para estudiar en un horario de clases extendido de 10-12 horas diarias de lunes a viernes? *
              </Label>
              <RadioGroup
                value={disponibilidadHorario}
                onValueChange={setDisponibilidadHorario}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value="si" id="disponibilidad-si" />
                  <Label htmlFor="disponibilidad-si" className="cursor-pointer">
                    Sí, tengo disponibilidad completa
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value="no" id="disponibilidad-no" />
                  <Label htmlFor="disponibilidad-no" className="cursor-pointer">
                    No, no tengo esa disponibilidad
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

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
              disabled={!canProceed}
              variant="funval"
              size="lg"
              className="min-w-[200px] bg-[rgb(46_131_242_/_1)] text-white hover:shadow-lg hover:bg-[rgb(46_131_242_/_1)]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}