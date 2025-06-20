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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { UserPlus, ArrowLeft } from "lucide-react"
import { PreRegistrationFormData, Country, countries } from '../../../types/forms'

interface PreRegistrationFormStepProps {
  onNext: (data: PreRegistrationFormData) => void
  onBack: () => void
}

interface CountrySelectProps {
  countries: Country[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

// CountrySelect adaptado a dark mode
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
        <div className="px-3 pb-2 sticky top-0 z-10 bg-background dark:bg-gray-900 border-b border-muted dark:border-gray-700">
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
    setFormData(prev => {
      const updated = { ...prev, [field]: value }

      if (field === "pais") {
        const selected = countries.find((c) => c.nombre === value)
        if (selected) {
          const codigo = selected.codigo
          if (!updated.telefono.startsWith(codigo)) {
            updated.telefono = `${codigo} `
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
              {/* Todos los inputs de nombres */}
              <InputGroup id="primerNombre" label="Primer nombre" value={formData.primerNombre} onChange={updateFormData} required />
              <InputGroup id="segundoNombre" label="Segundo nombre" value={formData.segundoNombre} onChange={updateFormData} />
              <InputGroup id="primerApellido" label="Primer apellido" value={formData.primerApellido} onChange={updateFormData} required />
              <InputGroup id="segundoApellido" label="Segundo apellido" value={formData.segundoApellido} onChange={updateFormData} />

              {/* Género */}
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

              {/* Edad */}
              <InputGroup id="edad" label="Edad" value={formData.edad} onChange={updateFormData} type="number" min="16" max="65" required />

              {/* País */}
              <div>
                <Label htmlFor="pais">País *</Label>
                <CountrySelect
                  countries={countries}
                  value={formData.pais}
                  onChange={(value) => updateFormData("pais", value)}
                  placeholder="Selecciona país"
                />
              </div>

              {/* Teléfono */}
              <InputGroup id="telefono" label="Teléfono" value={formData.telefono} onChange={updateFormData} required />

              {/* Estaca */}
              <InputGroup id="estacaZona" label="Estaca/Distrito/Misión" value={formData.estacaZona} onChange={updateFormData} required />

              {/* Correo */}
              <InputGroup id="correo" label="Correo electrónico" value={formData.correo} onChange={updateFormData} type="email" required />

              {/* Estado Civil */}
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

            {/* Misión */}
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

            {/* Botones */}
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                onClick={onBack}
                variant="outline"
                size="lg"
                className="min-w-[120px]"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
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

// InputGroup helper
function InputGroup({
  id,
  label,
  value,
  onChange,
  ...rest
}: {
  id: keyof PreRegistrationFormData
  label: string
  value: string
  onChange: (field: keyof PreRegistrationFormData, value: string) => void
  [key: string]: any
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        {...rest}
      />
    </div>
  )
}
