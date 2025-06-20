import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ReferralFormData, Country, countries, estacas } from '../../../types/forms'
import { Users, ArrowLeft } from "lucide-react"

interface ReferralFormStepProps {
  onNext: (data: ReferralFormData) => void
  onBack: () => void
}

interface CountrySelectProps {
  countries: Country[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

// CountrySelect con buscador fijo arriba y soporte para modo oscuro
function CountrySelect({ countries, value, onChange, placeholder }: CountrySelectProps) {
  const [search, setSearch] = useState("")
  const filteredCountries = countries.filter((country) =>
    country.nombre.toLowerCase().includes(search.toLowerCase())
  )

  const selectRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setSearch("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        ref={selectRef}
        className="pt-2 max-h-60 overflow-auto bg-background dark:bg-gray-900"
      >
        <div className="px-3 pb-2 sticky top-0 bg-background dark:bg-gray-900 z-10 border-b border-muted dark:border-gray-700">
          <Input
            autoFocus
            placeholder="Buscar país..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-background dark:bg-gray-900 text-foreground"
          />
        </div>

        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <SelectItem key={country.nombre} value={country.nombre}>
              {country.nombre}
            </SelectItem>
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground select-none">
            No se encontraron países
          </div>
        )}
      </SelectContent>
    </Select>
  )
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
    setFormData(prev => {
      const updated = { ...prev, [field]: value }

      // Si cambia el país, actualizar código telefónico
      if (field === 'pais') {
        const selectedCountry = countries.find(c => c.nombre === value)
        if (selectedCountry) {
          if (!updated.telefono.startsWith(selectedCountry.codigo)) {
            updated.telefono = `${selectedCountry.codigo} `
          }
        }
      }

      return updated
    })
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
                <Select
                  value={formData.genero}
                  onValueChange={(value) => updateFormData('genero', value)}
                >
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
                <Label htmlFor="estacaZona">Estaca/Distrito/Misión *</Label>
                <Select
                  value={formData.estacaZona}
                  onValueChange={(value) => updateFormData('estacaZona', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una estaca" />
                  </SelectTrigger>
                  <SelectContent>
                    {estacas.map((item) => (
                      <SelectItem key={item.id} value={item.nombre}>
                        {item.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  <Select
                    value={formData.relacionConReferido}
                    onValueChange={(value) => updateFormData('relacionConReferido', value)}
                  >
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
