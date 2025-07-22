import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { Enums } from '@/types/global';
import SearchableSelect from '@/components/ui/searchable-select';
import { Country } from '@/types/country';
import { Stake } from '@/types/stake';
import { useContext, useState } from 'react';
import validateForm from '@/lib/schemas/validate-schemas';
import { preRegistrationSchema } from '@/lib/schemas/pre-registration';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { PreRegistrationFormData } from '@/types/pre-inscription';
import { PhoneInput } from '@/components/ui/phone-input';

interface PreRegistrationFormStepProps {
    countries: Country[];
    stakes: Stake[];
    request: {
        data: PreRegistrationFormData;
        setData: (field: keyof PreRegistrationFormData, value: any) => void;
        errors: Record<string, string>;
    };
}

export function PreRegistrationFormStep({ countries = [], stakes = [], request }: PreRegistrationFormStepProps) {
    const { nextStep, previousStep } = useContext(StepperContext)
    const { data, setData } = request;
    const { enums } = usePage<{ enums: Enums }>().props;
    const [errors, setErrors] = useState<Record<string, string>>({});
    const filteredStakes = data.country_id ? stakes.filter(stake => stake.country_id === Number(data.country_id)) : [{ id: 0, name: 'Selecciona un país primero', country_id: 0 }];

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

    console.log(data);

    return (
        <div className="mx-auto max-w-3xl">
            <Card className="border-2">
                <CardHeader className="pb-4 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(46_131_242_/_1)]/10">
                        <UserPlus className="h-8 w-8 text-[rgb(46_131_242_/_1)]" />
                    </div>
                    <CardTitle className="text-funval-blue text-2xl font-bold text-[rgb(46_131_242_/_1)]">
                        Formulario de Pre-inscripción
                    </CardTitle>
                    <p className="text-muted-foreground mt-2">
                        Completa tus datos personales para el proceso de inscripción
                    </p>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Primer Nombre */}
                            <div>
                                <Label htmlFor="first_name">Primer Nombre</Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    placeholder="Nombre completo"
                                    autoComplete='given-name'
                                    required
                                />
                                {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
                            </div>
                            {/* Segundo Nombre */}
                            <div>
                                <Label htmlFor="middle_name">Segundo Nombre</Label>
                                <Input
                                    id="middle_name"
                                    name="middle_name"
                                    autoComplete='additional-name'
                                    value={data.middle_name}
                                    onChange={(e) => setData('middle_name', e.target.value)}
                                    placeholder="Segundo nombre"
                                />
                                {errors.middle_name && <p className="text-red-500 text-sm">{errors.middle_name}</p>}
                            </div>
                            {/* Apellido */}
                            <div>
                                <Label htmlFor="last_name">Apellido</Label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    autoComplete='family-name'
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    placeholder="Apellido"
                                    required
                                />
                                {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                            </div>
                            {/* Segundo Apellido */}
                            <div>
                                <Label htmlFor="second_last_name">Segundo Apellido</Label>
                                <Input
                                    id="second_last_name"
                                    name="second_last_name"
                                    autoComplete='family-name'
                                    value={data.second_last_name}
                                    onChange={(e) => setData('second_last_name', e.target.value)}
                                    placeholder="Segundo apellido"
                                />
                                {errors.second_last_name && <p className="text-red-500 text-sm">{errors.second_last_name}</p>}
                            </div>
                            {/* Género */}
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
                            {/* Edad */}
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
                            {/* País */}
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
                            {/* Teléfono */}
                            <div>
                                <Label htmlFor="phone">Teléfono</Label>
                                <div className="flex">
                                    <PhoneInput
                                        id="phone"
                                        name="phone"
                                        autoComplete='tel'
                                        type='tel'
                                        value={data.phone}
                                        onInputChange={(value: string) => setData('phone', value)}
                                        placeholder="Número de teléfono"
                                        className="rounded-l-none"
                                        countries={countries}
                                        selectedCountryId={data.country_id}
                                        required
                                    />
                                </div>
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>
                            {/* Estaca */}
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
                            {/* Correo */}
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    autoComplete='email'
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Correo electrónico"
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            {/* Estado Civil */}
                            <div>
                                <Label htmlFor="marital_status">Estado civil</Label>
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
                                            <SelectItem value="0" disabled>Selecciona un estado civil</SelectItem>
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
                        </div>

                        {/* Misión */}
                        <div>
                            <p className="text-base font-medium">¿Has servido una misión?</p>
                            <RadioGroup
                                value={data.served_mission !== null ? data.served_mission ? 'yes' : 'no' : ''}
                                onValueChange={(value) => setData('served_mission', value === 'yes')}
                                className="mt-2 flex flex-row space-x-6"
                                name='served_mission'
                                required
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="yes" id="mission-yes" required />
                                    <Label htmlFor="mission-yes">Si</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no" id="mission-no" required />
                                    <Label htmlFor="mission-no">No</Label>
                                </div>
                            </RadioGroup>
                            {errors.served_mission && <p className="text-red-500 text-sm">{errors.served_mission}</p>}
                        </div>

                        {/* Botones */}
                        <div className="flex justify-between pt-4">
                            <Button type="button" onClick={handleBack} variant="outline" size="lg" className="min-w-[120px]">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Anterior
                            </Button>

                            <Button
                                size="lg"
                                className="min-w-[140px] bg-[rgb(46_131_242_/1)] text-white transition-colors hover:bg-[rgb(46_131_242/_1)]/90"
                            >
                                Continuar
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