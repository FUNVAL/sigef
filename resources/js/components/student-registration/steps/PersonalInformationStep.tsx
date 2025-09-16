import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import SearchableSelect from '@/components/ui/searchable-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFilteredStakes from '@/hooks/use-filtered-stakes';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { Country } from '@/types/country';
import { Enums, Translation } from '@/types/global';
import { StudentRegistrationFormData, StudentRegistrationRequest } from '@/types/student-registration';
import { usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Mail, MapPin, Phone, User } from 'lucide-react';
import { useCallback, useContext, useState } from 'react';
import { StepsHeader } from '../../pre-registration/steps-header';

interface PersonalInformationStepProps {
    countries: Country[];
    request: StudentRegistrationRequest;
}

export function PersonalInformationStep({ countries, request }: PersonalInformationStepProps) {
    const { nextStep, previousStep } = useContext(StepperContext);
    const { data, setData } = request;
    const { enums } = usePage<{ enums: Enums }>().props;
    const { ui } = usePage<Translation>().props;
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { stakes } = useFilteredStakes(data.country_id);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validación básica
        const validationErrors: Record<string, string> = {};

        if (!data.first_name?.trim()) validationErrors.first_name = 'El nombre es obligatorio';
        if (!data.last_name?.trim()) validationErrors.last_name = 'El apellido es obligatorio';
        if (!data.birth_date) validationErrors.birth_date = 'La fecha de nacimiento es obligatoria';
        if (!data.gender) validationErrors.gender = 'El género es obligatorio';
        if (!data.country_id) validationErrors.country_id = 'El país es obligatorio';
        if (!data.marital_status) validationErrors.marital_status = 'El estado civil es obligatorio';
        if (!data.email?.trim()) validationErrors.email = 'El correo electrónico es obligatorio';
        if (!data.phone?.trim()) validationErrors.phone = 'El teléfono es obligatorio';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Calcular edad automáticamente
        if (data.birth_date) {
            const birthDate = new Date(data.birth_date);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                setData('age', age - 1);
            } else {
                setData('age', age);
            }
        }

        setErrors({});
        nextStep();
    };

    const cleanSpaces = useCallback(
        (field: keyof StudentRegistrationFormData, value: string) => {
            const nameFields = ['first_name', 'middle_name', 'last_name', 'second_last_name', 'recruiter_name'];
            let cleanedValue = value.replace(/\s+/g, ' ').trim();
            if (nameFields.includes(field)) {
                cleanedValue = cleanedValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
            }
            setData(field, cleanedValue);
        },
        [setData],
    );

    return (
        <Card className="mx-auto w-full max-w-4xl overflow-hidden border-0 pt-0 shadow-2xl">
            <StepsHeader title="Información Personal" subtitle="Complete sus datos personales básicos" />

            <CardContent className="space-y-6 p-3 sm:space-y-8 sm:p-6 md:p-8">
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    {/* Nombres y apellidos */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <User className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">Nombres y Apellidos</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Primer Nombre */}
                            <div>
                                <Label htmlFor="first_name">Primer Nombre *</Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    value={data.first_name || ''}
                                    onChange={(e) => cleanSpaces('first_name', e.target.value)}
                                    placeholder="Ingrese su primer nombre"
                                    autoComplete="given-name"
                                    required
                                />
                                {errors.first_name && <p className="text-sm text-red-500">{errors.first_name}</p>}
                            </div>

                            {/* Segundo Nombre */}
                            <div>
                                <Label htmlFor="middle_name">Segundo Nombre</Label>
                                <Input
                                    id="middle_name"
                                    name="middle_name"
                                    autoComplete="additional-name"
                                    value={data.middle_name || ''}
                                    onChange={(e) => cleanSpaces('middle_name', e.target.value)}
                                    placeholder="Ingrese su segundo nombre (opcional)"
                                />
                                {errors.middle_name && <p className="text-sm text-red-500">{errors.middle_name}</p>}
                            </div>

                            {/* Primer Apellido */}
                            <div>
                                <Label htmlFor="last_name">Primer Apellido *</Label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    autoComplete="family-name"
                                    value={data.last_name || ''}
                                    onChange={(e) => cleanSpaces('last_name', e.target.value)}
                                    placeholder="Ingrese su primer apellido"
                                    required
                                />
                                {errors.last_name && <p className="text-sm text-red-500">{errors.last_name}</p>}
                            </div>

                            {/* Segundo Apellido */}
                            <div>
                                <Label htmlFor="second_last_name">Segundo Apellido</Label>
                                <Input
                                    id="second_last_name"
                                    name="second_last_name"
                                    autoComplete="family-name"
                                    value={data.second_last_name || ''}
                                    onChange={(e) => cleanSpaces('second_last_name', e.target.value)}
                                    placeholder="Ingrese su segundo apellido (opcional)"
                                />
                                {errors.second_last_name && <p className="text-sm text-red-500">{errors.second_last_name}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Información de nacimiento y género */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">Fecha de Nacimiento y Género</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {/* Fecha de nacimiento */}
                            <div>
                                <Label htmlFor="birth_date">Fecha de Nacimiento *</Label>
                                <Input
                                    id="birth_date"
                                    name="birth_date"
                                    type="date"
                                    value={data.birth_date || ''}
                                    onChange={(e) => setData('birth_date', e.target.value)}
                                    required
                                />
                                {errors.birth_date && <p className="text-sm text-red-500">{errors.birth_date}</p>}
                            </div>

                            {/* Edad (calculada automáticamente) */}
                            <div>
                                <Label htmlFor="age">Edad</Label>
                                <Input
                                    id="age"
                                    name="age"
                                    type="number"
                                    value={data.age || ''}
                                    readOnly
                                    placeholder="Se calcula automáticamente"
                                    className="bg-gray-50"
                                />
                            </div>

                            {/* Género */}
                            <div>
                                <Label htmlFor="gender">Género *</Label>
                                <Select
                                    value={data.gender?.toString() || ''}
                                    onValueChange={(value) => setData('gender', Number(value))}
                                    name="gender"
                                    required
                                >
                                    <SelectTrigger id="gender">
                                        <SelectValue placeholder="Seleccione su género" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {enums.gender?.map((gender) => (
                                            <SelectItem key={gender.id} value={gender.id.toString()}>
                                                {gender.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Ubicación */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">Ubicación</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* País */}
                            <div>
                                <SearchableSelect
                                    data={countries}
                                    name="country_id"
                                    id="country_id"
                                    value={data.country_id?.toString() || ''}
                                    onValueChange={(value) => setData('country_id', Number(value))}
                                    label="País *"
                                    required
                                    placeholder="Seleccione su país"
                                />
                                {errors.country_id && <p className="text-sm text-red-500">{errors.country_id}</p>}
                            </div>

                            {/* Estado civil */}
                            <div>
                                <Label htmlFor="marital_status">Estado Civil *</Label>
                                <Select
                                    value={data.marital_status?.toString() || ''}
                                    onValueChange={(value) => setData('marital_status', Number(value))}
                                    required
                                    name="marital_status"
                                >
                                    <SelectTrigger id="marital_status">
                                        <SelectValue placeholder="Seleccione su estado civil" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {enums.maritalStatus?.map((status) => (
                                            <SelectItem key={status.id} value={status.id.toString()}>
                                                {status.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.marital_status && <p className="text-sm text-red-500">{errors.marital_status}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Información de contacto */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <Phone className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">Información de Contacto</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Correo electrónico */}
                            <div>
                                <Label htmlFor="email">Correo Electrónico *</Label>
                                <div className="relative">
                                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={data.email || ''}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="ejemplo@correo.com"
                                        className="pl-10"
                                        required
                                    />
                                </div>
                                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>

                            {/* Teléfono */}
                            <div>
                                <Label htmlFor="phone">Teléfono de Contacto *</Label>
                                <PhoneInput
                                    id="phone"
                                    name="phone"
                                    autoComplete="tel"
                                    type="tel"
                                    value={data.phone || ''}
                                    onInputChange={(value: string) => setData('phone', value)}
                                    placeholder="Ingrese su número de teléfono"
                                    countries={countries}
                                    selectedCountryId={data.country_id}
                                    required
                                    minLength={3}
                                    maxLength={18}
                                />
                                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Reclutador/responsable */}
                            <div>
                                <Label htmlFor="recruiter_name">Reclutador/Responsable</Label>
                                <Input
                                    id="recruiter_name"
                                    name="recruiter_name"
                                    value={data.recruiter_name || ''}
                                    onChange={(e) => cleanSpaces('recruiter_name', e.target.value)}
                                    placeholder="Nombre del reclutador (opcional)"
                                />
                            </div>

                            {/* Link de ubicación */}
                            <div>
                                <Label htmlFor="home_location_link">Link de Ubicación de Casa</Label>
                                <Input
                                    id="home_location_link"
                                    name="home_location_link"
                                    type="url"
                                    value={data.home_location_link || ''}
                                    onChange={(e) => setData('home_location_link', e.target.value)}
                                    placeholder="https://maps.google.com/... (opcional)"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-between pt-4">
                        <Button type="button" onClick={previousStep} variant="outline" size="lg" className="min-w-[120px]">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {ui.buttons.previous || 'Anterior'}
                        </Button>

                        <Button
                            type="submit"
                            size="lg"
                            className="min-w-[140px] bg-[rgb(46_131_242_/1)] text-white transition-colors hover:bg-[rgb(46_131_242/_1)]/90"
                        >
                            {ui.buttons.continue || 'Continuar'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
