import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { CountrySelect } from "@/components/ui/countryselect"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReferralFormData, countries } from '../../../types/forms'
import { Users, ArrowLeft } from "lucide-react"

interface ReferralFormStepProps {
  onNext: (data: ReferralFormData) => void;
  onBack: () => void;
}

export function ReferralFormStep({ onNext, onBack }: ReferralFormStepProps) {
  const [formData, setFormData] = useState<ReferralFormData>({
    nombre: '',
    genero: '',
    edad: '',
    pais: '',
    telefono: '',
    estacaZona: '',
    nombreQuienRefiere: '',
    telefonoQuienRefiere: '',
    relacionConReferido: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormValid()) {
      console.log('Datos de referencia (JSON):', JSON.stringify(formData, null, 2))
      onNext(formData)
    }
  }

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '')
  }

  const updateFormData = (field: keyof ReferralFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-2">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-[rgb(46_131_242_/_1)]/8 flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-[rgb(46_131_242_/_1)]" />
          </div>
          <CardTitle className="text-2xl font-bold text-[rgb(46_131_242_/_1)]">
            Formulario de Referencia
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Comparte los datos de la persona que deseas referir
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombre completo de la persona referida </Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => updateFormData('nombre', e.target.value)}
                  placeholder="Nombre completo"
                  required
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

              {/* <div>
                <Label htmlFor="pais">País *</Label>
                <Select value={formData.pais} onValueChange={(value) => updateFormData('pais', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona país" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}

              <div>
                <Label htmlFor="pais">País *</Label>
                <CountrySelect
                  countries={countries}
                  value={formData.pais}
                  onChange={(value) => updateFormData("pais", value)}
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
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-funval-darkBlue mb-4">
                Información de quien refiere
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombreQuienRefiere">Tu nombre completo </Label>
                  <Input
                    id="nombreQuienRefiere"
                    value={formData.nombreQuienRefiere}
                    onChange={(e) => updateFormData('nombreQuienRefiere', e.target.value)}
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="telefonoQuienRefiere">Tu teléfono </Label>
                  <Input
                    id="telefonoQuienRefiere"
                    value={formData.telefonoQuienRefiere}
                    onChange={(e) => updateFormData('telefonoQuienRefiere', e.target.value)}
                    placeholder="Tu número de teléfono"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="relacionConReferido">Relación con la persona referida *</Label>
                  <Select value={formData.relacionConReferido} onValueChange={(value) => updateFormData('relacionConReferido', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la relación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="familiar">Familiar</SelectItem>
                      <SelectItem value="amigo">Amigo/a</SelectItem>
                      <SelectItem value="companero_iglesia">Miembro de la Iglesia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                onClick={onBack}
                variant="outline"
                size="lg"
                className="min-w-[120px]"
              >
                <ArrowLeft className="h-4 w-4 mr-2 hover:text-[rgb(46_131_242_/_1)]" />
                Anterior
              </Button>

              <Button
                type="submit"
                disabled={!isFormValid()}
                variant="funval"
                size="lg"
                className="min-w-[200px] bg-[rgb(46_131_242_/_1)] text-white hover:shadow-lg hover:bg-[rgb(46_131_242_/_1)]/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar Referencia
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}