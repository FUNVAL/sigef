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
import { router, usePage } from "@inertiajs/react"
import SearchableSelect from "@/components/ui/searchable-select"
import { ReferenceFormData } from "@/types/reference"
import { Enums, Translation } from "@/types/global"
import { Stake } from "@/types/stake"
import { Country } from "@/types/country"
import { referralFormSchema } from "@/lib/schemas/referral"
import validateForm from "@/lib/schemas/validate-schemas"
import { useCallback, useContext, useEffect, useState } from "react"
import { StepperContext } from "@/pages/forms/stepper-provider";
import { PhoneInput } from "@/components/ui/phone-input";
import { StepsHeader } from "../steps-header";
import useFilteredStakes from "@/hooks/use-filtered-stakes";

interface ReferralFormStepProps {
  request: {
    data: ReferenceFormData;
    setData: (field: keyof ReferenceFormData, value: any) => void;
    errors: Record<string, string>;
  };
  countries: Country[],
}

export function ReferralFormStep({ countries, request, }: ReferralFormStepProps) {
  const { nextStep, previousStep } = useContext(StepperContext);
  const { setData, data, errors: back_errors } = request;
  const { enums } = usePage<{ enums: Enums }>().props;
  const { ui, forms } = usePage<Translation>().props;
  const { stakes } = useFilteredStakes(data.country_id);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const isFull = new URLSearchParams(window.location.search).get('full') === 'true';

  const handleBack = () => {
    if (isFull) {
      window.history.back();
    } else {
      previousStep();
    }
  }

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

  const cleanSpaces = useCallback(
    (field: keyof ReferenceFormData, value: string) => {
      let cleanedValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
      setData(field, cleanedValue);
    },
    [setData],
  );

  return (
    <Card className="w-full max-w-4xl shadow-2xl border-0 overflow-hidden pt-0 mx-auto">
      <StepsHeader
        title={forms.referral.title}
        subtitle={forms.referral.description}
      />

      <CardContent className="p-8 space-y-8">
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">{forms.referral.fields.name}</Label>
              <Input
                id="name"
                name="name"
                value={data.name}
                onChange={(e) => cleanSpaces('name', e.target.value)}
                placeholder={forms.referral.fields.name_placeholder}
                autoComplete="name"
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="gender">{forms.referral.fields.gender}</Label>
              <Select value={data.gender.toString()}
                onValueChange={(value) => setData('gender', Number(value))}
                name="gender"
                required
              >
                <SelectTrigger id='gender'>
                  <SelectValue placeholder={forms.referral.fields.gender_placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0" disabled>{forms.referral.fields.gender_select}</SelectItem>
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
              <Label htmlFor="age">{forms.referral.fields.age}</Label>
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
              <SearchableSelect
                data={countries}
                name="country_id"
                id="country_id"
                value={data.country_id.toString()}
                onValueChange={(value) => setData('country_id', Number(value))}
                label={forms.referral.fields.country}
                required
                placeholder="Selecciona un país"
              />

              {errors.country_id && <p className="text-red-500 text-sm">{errors.country_id}</p>}
            </div>

            <div>
              <Label htmlFor="phone">{forms.referral.fields.phone}</Label>
              <PhoneInput
                id="phone"
                name="phone"
                autoComplete='tel'
                type='tel'
                value={data.phone}
                onInputChange={(value: string) => setData('phone', value)}
                placeholder={`Número de ${forms.referral.fields.phone.toLowerCase()}`}
                className="rounded-l-none"
                countries={countries}
                selectedCountryId={data.country_id}
                required
                minLength={3}
                maxLength={18}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div>
              <SearchableSelect
                data={stakes}
                name="stake_id"
                id="stake_id"
                value={data.stake_id.toString()}
                onValueChange={(value) => setData('stake_id', Number(value))}
                label={forms.referral.fields.stake}
                disabled={!data.country_id}
                placeholder={data.country_id ? "Selecciona una estaca/distrito/misión" : "Primero selecciona un país"}
                required
              />
              {errors.stake_id && <p className="text-red-500 text-sm">{errors.stake_id}</p>}
            </div>

          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {forms.referral.referrer_info}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="referrer_name">{forms.referral.fields.referrer_name}</Label>
                <Input
                  id="referrer_name"
                  name="referrer_name"
                  value={data.referrer_name}
                  onChange={(e) => cleanSpaces('referrer_name', e.target.value)}
                  placeholder={`Tu nombre completo`}
                  required
                />
                {errors.referrer_name && <p className="text-red-500 text-sm">{errors.referrer_name}</p>}
              </div>

              <div>
                <Label htmlFor="referrer_phone">{forms.referral.fields.referrer_phone}</Label>
                <PhoneInput
                  id="referrer_phone"
                  name="referrer_phone"
                  autoComplete='tel-referrer'
                  type='tel'
                  value={data.referrer_phone}
                  onInputChange={(value: string) => setData('referrer_phone', value)}
                  placeholder={`Tu número de teléfono`}
                  className="rounded-l-none"
                  countries={countries}
                  selectedCountryId={data.country_id}
                  required
                  enableDropdown={true}
                  minLength={3}
                  maxLength={18}
                />
                {errors.referrer_phone && <p className="text-red-500 text-sm">{errors.referrer_phone}</p>}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="relationship_with_referred">{forms.referral.fields.relationship}</Label>
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
              <ArrowLeft className="h-4 w-4 mr-2 hover:text-blue-600" />
              {ui.buttons.previous}
            </Button>

            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {ui.buttons.continue}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}