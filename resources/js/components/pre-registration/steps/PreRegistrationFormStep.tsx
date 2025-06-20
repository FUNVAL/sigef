import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CountrySelect } from "@/components/ui/countryselect"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PreRegistrationFormData, countries } from '../../../types/forms'
import { UserPlus, ArrowLeft } from "lucide-react"

interface PreRegistrationFormStepProps {
  onNext: (data: PreRegistrationFormData) => void;
  onBack: () => void;
}

export function PreRegistrationFormStep({ onNext, onBack }: PreRegistrationFormStepProps) {
  const [formData, setFormData] = useState<PreRegistrationFormData>({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    genero: '',
    edad: '',
    pais: '',
    telefono: '',
    estacaZona: '',
    correo: '',
    estadoCivil: '',
    haServidoMision: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormValid()) {
      console.log('Datos de pre-inscripción (JSON):', JSON.stringify(formData, null, 2))
      onNext(formData)
    }
  }

  const isFormValid = () => {
    const requiredFields = [
      'primerNombre', 'primerApellido', 'genero', 'edad', 'pais',
      'telefono', 'estacaZona', 'correo', 'estadoCivil', 'haServidoMision'
    ]
    return requiredFields.every(field => formData[field as keyof PreRegistrationFormData]?.trim() !== '')
  }

  const updateFormData = (field: keyof PreRegistrationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-2">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-[rgb(46_131_242_/_1)]/10 flex items-center justify-center mb-4">
            <UserPlus className="h-8 w-8 text-[rgb(46_131_242_/_1)]" />
          </div>
          <CardTitle className="text-2xl font-bold text-funval-blue text-[rgb(46_131_242_/_1)]">
            Formulario de Pre-inscripción
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Completa tus datos personales para el proceso de inscripción
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primerNombre">Primer nombre </Label>
                <Input
                  id="primerNombre"
                  value={formData.primerNombre}
                  onChange={(e) => updateFormData('primerNombre', e.target.value)}
                  placeholder="Primer nombre"
                  required
                />
              </div>

              <div>
                <Label htmlFor="segundoNombre">Segundo nombre</Label>
                <Input
                  id="segundoNombre"
                  value={formData.segundoNombre}
                  onChange={(e) => updateFormData('segundoNombre', e.target.value)}
                  placeholder="Segundo nombre (opcional)"
                />
              </div>

              <div>
                <Label htmlFor="primerApellido">Primer apellido </Label>
                <Input
                  id="primerApellido"
                  value={formData.primerApellido}
                  onChange={(e) => updateFormData('primerApellido', e.target.value)}
                  placeholder="Primer apellido"
                  required
                />
              </div>

              <div>
                <Label htmlFor="segundoApellido">Segundo apellido</Label>
                <Input
                  id="segundoApellido"
                  value={formData.segundoApellido}
                  onChange={(e) => updateFormData('segundoApellido', e.target.value)}
                  placeholder="Segundo apellido (opcional)"
                />
              </div>

              <div>
                <Label htmlFor="genero">Género *</Label>
                <Select value={formData.genero} onValueChange={(value) => updateFormData('genero', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona género" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="femenino">Femenino</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="edad">Edad </Label>
                <Input
                  id="edad"
                  type="number"
                  value={formData.edad}
                  onChange={(e) => updateFormData('edad', e.target.value)}
                  placeholder="Edad"
                  min="16"
                  max="65"
                  required
                />
              </div>

              <div>
                <Label htmlFor="pais">País *</Label>
                <CountrySelect
                  countries={countries}
                  value={formData.pais}
                  onChange={(value) => updateFormData("pais", value)}
                  placeholder="Selecciona país"
                />
              </div>

              <div>
                <Label htmlFor="telefono">Teléfono </Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => updateFormData('telefono', e.target.value)}
                  placeholder="Número de teléfono"
                  required
                />
              </div>

              <div>
                <Label htmlFor="estacaZona">Estaca/Distrito/Misión </Label>
                <Input
                  id="estacaZona"
                  value={formData.estacaZona}
                  onChange={(e) => updateFormData('estacaZona', e.target.value)}
                  placeholder="Estaca o zona"
                  required
                />
              </div>

              <div>
                <Label htmlFor="correo">Correo electrónico </Label>
                <Input
                  id="correo"
                  type="email"
                  value={formData.correo}
                  onChange={(e) => updateFormData('correo', e.target.value)}
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="estadoCivil">Estado civil *</Label>
                <Select value={formData.estadoCivil} onValueChange={(value) => updateFormData('estadoCivil', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona estado civil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soltero">Soltero/a</SelectItem>
                    <SelectItem value="casado">Casado/a</SelectItem>
                    <SelectItem value="divorciado">Divorciado/a</SelectItem>
                    <SelectItem value="viudo">Viudo/a</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">¿Has servido una misión? *</Label>
              <RadioGroup
                value={formData.haServidoMision}
                onValueChange={(value) => updateFormData('haServidoMision', value)}
                className="flex flex-row space-x-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id="mision-si" />
                  <Label htmlFor="mision-si">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="mision-no" />
                  <Label htmlFor="mision-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                onClick={onBack}
                variant="outline"
                size="lg"
                className="min-w-[120px]"
              >
                <ArrowLeft className="h-4 w-4 mr-2  " />
                Anterior
              </Button>

              <Button
                type="submit"
                disabled={!isFormValid()}
                variant="funval"
                size="lg"
                className="min-w-[200px] bg-[rgb(46_131_242_/_1)] hover:bg-[rgb(46_131_242_/_1)]/90 transition-colors text-white"
              >
                Continuar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}