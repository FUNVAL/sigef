import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Users, ArrowLeft } from "lucide-react"
import { usePage } from "@inertiajs/react"
import SearchableSelect from "@/components/ui/searchable-select"
import { ReferenceFormData } from "@/types/reference"
import { Enums } from "@/types/global"
import { Stake } from "@/types/stake"
import { Country } from "@/types/country"
import { referralFormSchema } from "@/lib/schemas/referral"
import validateForm from "@/lib/schemas/validate-schemas"
import { useContext, useEffect, useState } from "react"
import { StepperContext } from "@/pages/forms/stepper-provider";
import PhoneInput from "@/components/ui/phone-input";

interface ReferralFormStepProps {
  request: {
    data: ReferenceFormData;
    setData: (field: keyof ReferenceFormData, value: any) => void;
    errors: Record<string, string>;
  };
  stakes: Stake[],
  countries: Country[],
}

export function ReferralFormStep({ stakes, countries, request, }: ReferralFormStepProps) {
  const { nextStep, previousStep } = useContext(StepperContext);

  const { setData, data, errors: back_errors } = request;
  const { enums } = usePage<{ enums: Enums }>().props;

  const [errors, setErrors] = useState<Record<string, string>>({});
  // obtener query param full

  const isFull = new URLSearchParams(window.location.search).get('full') === 'true';

  const handleBack = () => {
    if (isFull) {
      window.history.back();
    } else {
      previousStep();
    }
  }

  const filteredStakes = data.country_id ?
    stakes.filter(stake => stake.country_id === data.country_id) :
    [{ id: 0, name: 'Selecciona un país primero', country_id: 0 }];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(data, referralFormSchema);

    if (!validationErrors?.success) {
      setErrors(validationErrors?.errors ?? {});
      return;
    }
    nextStep();
  }

  useEffect(() => {
    if (Object.keys(back_errors).length > 0) {
      setErrors(back_errors);
    }
  }, [back_errors]);

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
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nombre completo de la persona referida </Label>
                <Input
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  placeholder="Nombre completo"
                  autoComplete="name"
                  required
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="gender">Género</Label>
                <Select value={data.gender.toString()}
                  onValueChange={(value) => setData('gender', Number(value))}
                  name="gender"
                  required
                >
                  <SelectTrigger id='gender'>
                    <SelectValue placeholder="Seleccionar género" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0" disabled>Selecciona un género</SelectItem>
                    {enums.gender.map(gender => (
                      <SelectItem key={gender.id} value={gender.id.toString()}>
                        {gender.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
              </div>

              <div>
                <Label htmlFor="age">Edad</Label>
                <Input
                  id="age"
                  name="age"
                  autoComplete='age'
                  type="number"
                  value={data.age}
                  onChange={(e) => setData('age', e.target.value)}
                  min="18"
                  max="100"
                  required
                />
                {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
              </div>

              <div>
                <Label htmlFor="country_id">País</Label>
                <SearchableSelect
                  data={countries}
                  id="country_id"
                  name="country_id"
                  value={data.country_id.toString()}
                  searchField="name"
                  onChange={(value) => setData('country_id', Number(value))}
                  placeholder="Selecciona un país"
                  required
                />
                {errors.country_id && <p className="text-red-500 text-sm">{errors.country_id}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Teléfono </Label>
                <PhoneInput
                  id="phone"
                  name="phone"
                  value={data.phone}
                  onChange={(e) => setData('phone', e.target.value)}
                  placeholder="Número de teléfono"
                  autoComplete="tel"
                  countries={countries}
                  dependency={data.country_id}
                  required
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              <div>
                <Label htmlFor="stake_id">Estaca/Distrito/Misión</Label>
                <SearchableSelect
                  data={filteredStakes}
                  id="stake_id"
                  name="stake_id"
                  value={data.stake_id.toString()}
                  searchField="name"
                  onChange={(value) => setData('stake_id', Number(value))}
                />
                {errors.stake_id && <p className="text-red-500 text-sm">{errors.stake_id}</p>}
              </div>

            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-funval-darkBlue mb-4">
                Información de quien refiere
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="referrer_name">Tu nombre completo </Label>
                  <Input
                    id="referrer_name"
                    name="referrer_name"
                    value={data.referrer_name}
                    onChange={(e) => setData('referrer_name', e.target.value)}
                    placeholder="Tu nombre completo"
                    required
                  />
                  {errors.referrer_name && <p className="text-red-500 text-sm">{errors.referrer_name}</p>}
                </div>

                <div>
                  <Label htmlFor="referrer_phone">Tu teléfono </Label>
                  <PhoneInput
                    id="referrer_phone"
                    name="referrer_phone"
                    value={data.referrer_phone}
                    onChange={(e) => setData('referrer_phone', e.target.value)}
                    placeholder="Tu número de teléfono"
                    countries={countries}
                    dependency={data.country_id}
                    required
                  />
                  {errors.referrer_phone && <p className="text-red-500 text-sm">{errors.referrer_phone}</p>}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="relationship_with_referred">Relación con la persona referida *</Label>
                  <Select
                    value={data.relationship_with_referred?.toString()}
                    onValueChange={(value) => setData('relationship_with_referred', Number(value))}
                    name="relationship_with_referred"
                    required
                  >
                    <SelectTrigger name="relationship_with_referred" id="relationship_with_referred">
                      <SelectValue placeholder="Selecciona la relación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0" disabled>Selecciona tu relación con el referido</SelectItem>
                      {
                        enums.relatedReference.map((relation) => (
                          <SelectItem key={relation.id} value={relation.id?.toString()}>
                            {relation.name}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  {errors.relationship_with_referred &&
                    <p className="text-red-500 text-sm">{errors.relationship_with_referred}</p>}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                onClick={handleBack}
                variant="outline"
                size="lg"
                className="min-w-[120px]"
              >
                <ArrowLeft className="h-4 w-4 mr-2 hover:text-[rgb(46_131_242_/_1)]" />
                Anterior
              </Button>

              <Button
                size="lg"
                className="min-w-[130px] bg-[rgb(46_131_242_/_1)] text-white hover:shadow-lg hover:bg-[rgb(46_131_242_/_1)]/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div >
  )
}