import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { Enums, Translation } from '@/types/global';
import SearchableSelect from '@/components/ui/searchable-select';
import { Country } from '@/types/country';
import { Stake } from '@/types/stake';
import { useCallback, useContext, useState } from 'react';
import validateForm from '@/lib/schemas/validate-schemas';
import { preRegistrationSchema } from '@/lib/schemas/pre-registration';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { PreRegistrationFormData } from '@/types/pre-inscription';
import { PhoneInput } from '@/components/ui/phone-input';
import { StepsHeader } from "../steps-header";
import useFilteredStakes from '@/hooks/use-filtered-stakes';

interface PreRegistrationFormStepProps {
    countries: Country[];
    request: {
        data: PreRegistrationFormData;
        setData: (field: keyof PreRegistrationFormData, value: any) => void;
        errors: Record<string, string>;
    };
}

export function PreRegistrationFormStep({ countries, request }: PreRegistrationFormStepProps) {
    const { nextStep, previousStep } = useContext(StepperContext)
    const { data, setData } = request;
    const { enums } = usePage<{ enums: Enums }>().props;
    const { ui, forms } = usePage<Translation>().props;
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { stakes } = useFilteredStakes(data.country_id);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm(data, preRegistrationSchema);

        if (!validationErrors?.success) {
            setErrors(validationErrors?.errors ?? {});
            return;
        }
        nextStep();
    }

    const isFull = new URLSearchParams(window.location.search).get('full') === 'true';

    const handleBack = () => {
        if (isFull) {
            window.history.back();
        } else {
            previousStep();
        }
    }

    const cleanSpaces = useCallback((field: keyof PreRegistrationFormData, value: string) => {
        const cleanedValue = value.replace(/\s+/g, ' ').trim();
        setData(field, cleanedValue);
    }, [setData]);

    return (
        <div className="mx-auto max-w-3xl">
            <Card className="w-full max-w-4xl shadow-2xl border-0 overflow-hidden pt-0 mx-auto">
                <StepsHeader
                    title={forms.pre_inscription.title}
                    subtitle={forms.pre_inscription.description}
                />

                <CardContent className="p-8 space-y-8">
                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Primer Nombre */}
                            <div>
                                <Label htmlFor="first_name">{forms.pre_inscription.fields.first_name}</Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    value={data.first_name}
                                    onChange={(e) => cleanSpaces('first_name', e.target.value)}
                                    placeholder={forms.pre_inscription.fields.first_name}
                                    autoComplete='given-name'
                                    required
                                />
                                {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
                            </div>
                            {/* Segundo Nombre */}
                            <div>
                                <Label htmlFor="middle_name">{forms.pre_inscription.fields.middle_name}</Label>
                                <Input
                                    id="middle_name"
                                    name="middle_name"
                                    autoComplete='additional-name'
                                    value={data.middle_name}
                                    onChange={(e) => cleanSpaces('middle_name', e.target.value)}
                                    placeholder={forms.pre_inscription.fields.middle_name}
                                />
                                {errors.middle_name && <p className="text-red-500 text-sm">{errors.middle_name}</p>}
                            </div>
                            {/* Apellido */}
                            <div>
                                <Label htmlFor="last_name">{forms.pre_inscription.fields.last_name}</Label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    autoComplete='family-name'
                                    value={data.last_name}
                                    onChange={(e) => cleanSpaces('last_name', e.target.value)}
                                    placeholder={forms.pre_inscription.fields.last_name}
                                    required
                                />
                                {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                            </div>
                            {/* Segundo Apellido */}
                            <div>
                                <Label htmlFor="second_last_name">{forms.pre_inscription.fields.second_last_name}</Label>
                                <Input
                                    id="second_last_name"
                                    name="second_last_name"
                                    autoComplete='family-name'
                                    value={data.second_last_name}
                                    onChange={(e) => cleanSpaces('second_last_name', e.target.value)}
                                    placeholder={forms.pre_inscription.fields.second_last_name}
                                />
                                {errors.second_last_name && <p className="text-red-500 text-sm">{errors.second_last_name}</p>}
                            </div>
                            {/* Género */}
                            <div>
                                <Label htmlFor="gender">{forms.pre_inscription.fields.gender}</Label>
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
                            {/* Edad */}
                            <div>
                                <Label htmlFor="age">{forms.pre_inscription.fields.age}</Label>
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
                            {/* País */}
                            <div>
                                <SearchableSelect
                                    data={countries}
                                    name="country_id"
                                    id="country_id"
                                    value={data.country_id.toString()}
                                    onValueChange={(value) => setData('country_id', Number(value))}
                                    label={forms.pre_inscription.fields.country}
                                    required
                                    placeholder="Selecciona un país"
                                />
                                {errors.country_id && <p className="text-red-500 text-sm">{errors.country_id}</p>}
                            </div>
                            {/* Teléfono */}
                            <div>
                                <Label htmlFor="phone">{forms.pre_inscription.fields.phone}</Label>
                                <div className="flex">
                                    <PhoneInput
                                        id="phone"
                                        name="phone"
                                        autoComplete='tel'
                                        type='tel'
                                        value={data.phone}
                                        onInputChange={(value: string) => setData('phone', value)}
                                        placeholder={forms.pre_inscription.fields.phone}
                                        className="rounded-l-none"
                                        countries={countries}
                                        selectedCountryId={data.country_id}
                                        required
                                        minLength={3}
                                        maxLength={18}
                                    />
                                </div>
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>
                            {/* Estaca */}
                            <div>

                                <SearchableSelect
                                    data={stakes}
                                    name="stake_id"
                                    id="stake_id"
                                    value={data.stake_id.toString()}
                                    onValueChange={(value) => setData('stake_id', Number(value))}
                                    label={forms.pre_inscription.fields.stake}
                                    disabled={!data.country_id}
                                    placeholder={data.country_id ? "Selecciona una estaca/distrito/misión" : "Primero selecciona un país"}
                                />

                                {errors.stake_id && <p className="text-red-500 text-sm">{errors.stake_id}</p>}
                            </div>
                            {/* Correo */}
                            <div>
                                <Label htmlFor="email">{forms.pre_inscription.fields.email}</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    autoComplete='email'
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder={forms.pre_inscription.fields.email}
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            {/* Estado Civil */}
                            <div>
                                <Label htmlFor="marital_status">{forms.pre_inscription.fields.marital_status}</Label>
                                <Select
                                    value={data.marital_status.toString()}
                                    onValueChange={(value) => setData('marital_status', Number(value))}
                                    required
                                    name='marital_status'
                                >
                                    <SelectTrigger id='marital_status' name='marital_status'>
                                        <SelectValue defaultChecked />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <>
                                            <SelectItem value="0" disabled>{`${forms.pre_inscription.fields.marital_status}`}</SelectItem>
                                            {enums.maritalStatus.map(status => (
                                                <SelectItem key={status.id} value={status.id.toString()}>
                                                    {status.name}
                                                </SelectItem>
                                            ))}
                                        </>
                                    </SelectContent>
                                </Select>
                                {errors.marital_status && <p className="text-red-500 text-sm">{errors.marital_status}</p>}
                            </div>
                            {/* ¿Has servido una misión? */}
                            <div>
                                <Label htmlFor="served_mission">{forms.pre_inscription.fields.served_mission}</Label>
                                <Select
                                    value={data.served_mission ? data.served_mission.toString() : ''}
                                    onValueChange={(value) => setData('served_mission', parseInt(value))}
                                    required
                                    name='served_mission'
                                >
                                    <SelectTrigger id='served_mission' name='served_mission'>
                                        <SelectValue placeholder="Selecciona una opción" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {enums.missionStatus?.map(mission => (
                                            <SelectItem key={mission.id} value={mission.id.toString()}>
                                                {mission.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.served_mission && <p className="text-red-500 text-sm">{errors.served_mission}</p>}
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="flex justify-between pt-4">
                            <Button type="button" onClick={handleBack} variant="outline" size="lg" className="min-w-[120px]">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                {ui.buttons.previous}
                            </Button>

                            <Button
                                size="lg"
                                className="min-w-[140px] bg-[rgb(46_131_242_/1)] text-white transition-colors hover:bg-[rgb(46_131_242/_1)]/90"
                            >
                                {ui.buttons.continue}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div >
    );
}

const requiredFields = [
    'first_name',
    'last_name',
    'gender',
    'age',
    'country_id',
    'phone',
    'stake_id',
    'email',
    'marital_status',
    'served_mission'
]
