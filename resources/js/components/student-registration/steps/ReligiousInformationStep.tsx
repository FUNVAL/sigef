import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import SearchableSelect from '@/components/ui/searchable-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFilteredStakes from '@/hooks/use-filtered-stakes';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { Country } from '@/types/country';
import { Enums, Translation } from '@/types/global';
import { StudentRegistrationRequest } from '@/types/student-registration';
import { usePage } from '@inertiajs/react';
import { ArrowLeft, Church, Heart, Users } from 'lucide-react';
import { useContext, useState } from 'react';
import { StepsHeader } from '../../pre-registration/steps-header';

interface ReligiousInformationStepProps {
    countries: Country[];
    request: StudentRegistrationRequest;
}

export function ReligiousInformationStep({ countries, request }: ReligiousInformationStepProps) {
    const { nextStep, previousStep } = useContext(StepperContext);
    const { data, setData } = request;
    const { enums } = usePage<{ enums: Enums }>().props;
    const { ui } = usePage<Translation>().props;
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { stakes } = useFilteredStakes(data.country_id);

    const formatMemberNumber = (value: string) => {
        // Remove all non-alphanumeric characters (keep letters and numbers only)
        const alphanumeric = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

        // Apply formatting: XXX-XXXX-XXXX (3-4-4 structure)
        if (alphanumeric.length <= 3) {
            return alphanumeric;
        } else if (alphanumeric.length <= 7) {
            return `${alphanumeric.slice(0, 3)}-${alphanumeric.slice(3)}`;
        } else {
            return `${alphanumeric.slice(0, 3)}-${alphanumeric.slice(3, 7)}-${alphanumeric.slice(7, 11)}`;
        }
    };

    // Validate member number format (3-4-4 alphanumeric)
    const isValidMemberNumber = (value: string) => {
        const memberNumberRegex = /^[A-Z0-9]{3}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
        return memberNumberRegex.test(value);
    };

    // Validate member number format
    /* const isValidMemberNumber = (value: string) => {
        const memberNumberRegex = /^\d{3}-\d{4}-\d{4}$/;
        return memberNumberRegex.test(value);
    }; */

    const handleMemberNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatMemberNumber(e.target.value);
        setData('member_number', formattedValue);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validación básica
        const validationErrors: Record<string, string> = {};

        if (data.is_active_member === undefined) validationErrors.is_active_member = 'Debe especificar si es miembro activo';
        if (data.is_returned_missionary === undefined) validationErrors.is_returned_missionary = 'Debe especificar si es misionero retornado';
        if (data.temple_status === null || data.temple_status === undefined)
            validationErrors.temple_status = 'Debe especificar si está sellado en el templo';
        if (!data.stake_id) validationErrors.stake_id = 'Debe seleccionar su estaca/distrito/misión';

        // Validación de cédula de miembro (siempre obligatoria)
        if (!data.member_number?.trim()) {
            validationErrors.member_number = 'El número de cédula de miembro es obligatorio';
        } else if (!isValidMemberNumber(data.member_number)) {
            validationErrors.member_number = 'El número de cédula debe tener el formato completo: XXX-XXXX-XXXX (3-4-4 caracteres)';
        }

        // Validaciones condicionales

        if (data.is_returned_missionary) {
            if (!data.mission_served?.trim()) {
                validationErrors.mission_served = 'Debe especificar en qué misión sirvió';
            }
            if (!data.mission_end_year) {
                validationErrors.mission_end_year = 'Debe especificar el año en que finalizó la misión';
            }
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        nextStep();
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i);

    return (
        <Card className="mx-auto w-full max-w-4xl overflow-hidden border-0 pt-0 shadow-2xl">
            <StepsHeader title="Información Eclesiástica" subtitle="Complete su información de membresía" />

            <CardContent className="space-y-6 p-3 sm:space-y-8 sm:p-6 md:p-8">
                <form className="space-y-8" onSubmit={handleSubmit} noValidate>
                    {/* Membresía activa */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <Church className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">Membresía de la Iglesia</h3>
                        </div>

                        {/* ¿Es miembro activo? */}
                        <div className="space-y-3">
                            <Label className="text-base font-medium">¿Es un miembro activo en su iglesia?</Label>
                            <RadioGroup
                                value={data.is_active_member !== undefined ? data.is_active_member.toString() : ''}
                                onValueChange={(value) => setData('is_active_member', value === 'true')}
                                className="flex gap-6"
                                required
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="true" id="active-yes" />
                                    <Label htmlFor="active-yes">Sí</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="false" id="active-no" />
                                    <Label htmlFor="active-no">No</Label>
                                </div>
                            </RadioGroup>
                            {errors.is_active_member && <p className="text-sm text-red-500">{errors.is_active_member}</p>}
                        </div>
                        {/* Campos en grid: Cédula de miembro y Año de bautismo */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Número de cédula de miembro */}
                            <div>
                                <Label htmlFor="member_number">
                                    Número de Cédula de Miembro
                                </Label>
                                <Input
                                    id="member_number"
                                    name="member_number"
                                    value={data.member_number || ''}
                                    onChange={handleMemberNumberChange}
                                    placeholder="ABC-1234-WXYZ"
                                    maxLength={13}
                                    className={`font-mono ${data.member_number && !isValidMemberNumber(data.member_number) ? 'border-orange-300' : ''}`}
                                    required
                                />
                                <p className="mt-1 text-xs text-gray-500">Formato: 3-4-4 dígitos (letras y números, ej: ABC-1234-WXYZ)</p>
                                {data.member_number && !isValidMemberNumber(data.member_number) && (
                                    <p className="text-sm text-orange-600">El formato debe ser 3-4-4 caracteres (letras y números)</p>
                                )}
                                {errors.member_number && <p className="text-sm text-red-500">{errors.member_number}</p>}
                            </div>

                            {/* Año de bautismo */}
                            <div>
                                <Label htmlFor="baptism_year">¿En qué año se bautizó?</Label>
                                <Select
                                    value={data.baptism_year?.toString() || ''}
                                    onValueChange={(value) => setData('baptism_year', Number(value))}
                                    name="baptism_year"
                                    required
                                >
                                    <SelectTrigger id="baptism_year">
                                        <SelectValue placeholder="Seleccione el año de bautismo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">No recuerdo</SelectItem>
                                        {years.map((year) => (
                                            <SelectItem key={year} value={year.toString()}>
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>
                    </div>

                    {/* Información misional */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <Heart className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">Servicio Misional</h3>
                        </div>

                        {/* ¿Es misionero retornado? */}
                        <div className="space-y-3">
                            <Label className="text-base font-medium">¿Es misionero retornado? </Label>
                            <RadioGroup
                                value={data.is_returned_missionary !== undefined ? data.is_returned_missionary.toString() : ''}
                                onValueChange={(value) => setData('is_returned_missionary', value === 'true')}
                                className="flex gap-6"
                                required
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="true" id="missionary-yes" />
                                    <Label htmlFor="missionary-yes">Sí</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="false" id="missionary-no" />
                                    <Label htmlFor="missionary-no">No</Label>
                                </div>
                            </RadioGroup>
                            {errors.is_returned_missionary && <p className="text-sm text-red-500">{errors.is_returned_missionary}</p>}
                        </div>

                        {/* Información de la misión */}
                        {data.is_returned_missionary && (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="mission_served">¿En qué misión sirvió?</Label>
                                    <Input
                                        id="mission_served"
                                        name="mission_served"
                                        value={data.mission_served || ''}
                                        onChange={(e) => setData('mission_served', e.target.value)}
                                        placeholder="Ej: Misión México Ciudad de México Norte"
                                        required={data.is_returned_missionary}
                                    />
                                    {errors.mission_served && <p className="text-sm text-red-500">{errors.mission_served}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="mission_end_year">¿Año en que finalizó la misión?</Label>
                                    <Select
                                        value={data.mission_end_year?.toString() || ''}
                                        onValueChange={(value) => setData('mission_end_year', Number(value))}
                                        name="mission_end_year"
                                        required={data.is_returned_missionary}
                                    >
                                        <SelectTrigger id="mission_end_year">
                                            <SelectValue placeholder="Seleccione el año" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {years.map((year) => (
                                                <SelectItem key={year} value={year.toString()}>
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.mission_end_year && <p className="text-sm text-red-500">{errors.mission_end_year}</p>}
                                </div>
                            </div>
                        )}

                        {/* Estado del templo */}
                        <div className="space-y-3">
                            <Label className="text-base font-medium">Sellado en el Templo</Label>
                            <RadioGroup
                                value={data.temple_status?.toString() || ''}
                                onValueChange={(value) => setData('temple_status', value === 'true')}
                                className="flex gap-6"
                                required
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="true" id="temple-yes" />
                                    <Label htmlFor="temple-yes" className="cursor-pointer">
                                        Sí
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="false" id="temple-no" />
                                    <Label htmlFor="temple-no" className="cursor-pointer">
                                        No
                                    </Label>
                                </div>
                            </RadioGroup>
                            {errors.temple_status && <p className="text-sm text-red-500">{errors.temple_status}</p>}
                        </div>
                    </div>

                    {/* Información organizacional */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <Users className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">Organización Eclesiástica</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Llamamiento actual */}
                            <div>
                                <Label htmlFor="current_calling">Llamamiento Actual</Label>
                                <Input
                                    id="current_calling"
                                    name="current_calling"
                                    value={data.current_calling || ''}
                                    onChange={(e) => setData('current_calling', e.target.value)}
                                    placeholder="Ej: Maestro de Escuela Dominical"
                                />
                            </div>
                            {/* País */}
                            <div>
                                <SearchableSelect
                                    data={countries}
                                    name="country_id"
                                    id="country_id"
                                    value={data.country_id?.toString() || ''}
                                    onValueChange={(value) => setData('country_id', Number(value))}
                                    label="País"
                                    required
                                    placeholder="Seleccione su país"
                                />
                                {errors.country_id && <p className="text-sm text-red-500">{errors.country_id}</p>}
                            </div>

                            {/* Barrio o rama */}

                            {/* Estaca */}
                            <div>
                                <SearchableSelect
                                    data={stakes}
                                    name="stake_id"
                                    id="stake_id"
                                    value={data.stake_id?.toString() || ''}
                                    onValueChange={(value) => setData('stake_id', Number(value))}
                                    label="Estaca, distrito o misión a la que pertenece"
                                    disabled={!data.country_id}
                                    placeholder={data.country_id ? 'Seleccione su estaca/distrito/misión' : 'Primero seleccione un país'}
                                    required
                                />
                                {errors.stake_id && <p className="text-sm text-red-500">{errors.stake_id}</p>}
                            </div>

                            <div>
                                <Label htmlFor="ward_branch">Barrio o Rama a la que Pertenece</Label>
                                <Input
                                    id="ward_branch"
                                    name="ward_branch"
                                    value={data.ward_branch || ''}
                                    onChange={(e) => setData('ward_branch', e.target.value)}
                                    placeholder="Ej: Barrio Centro, Rama San Juan"
                                    required
                                />
                            </div>

                            {/*Nombre presidente cuorum / presidenta sociedad de socorro*/}
                            <div>
                                <Label htmlFor="auxiliar_president">Nombre del Presidente(a) de Cuorum / SOC</Label>
                                <Input
                                    id="auxiliar_president"
                                    name="auxiliar_president"
                                    value={data.auxiliar_president || ''}
                                    onChange={(e) => setData('auxiliar_president', e.target.value)}
                                    placeholder="Nombre del Presidente(a) de Cuorum / SOC"
                                    autoComplete="given-name"
                                    required
                                />
                                {errors.auxiliar_president && <p className="text-sm text-red-500">{errors.auxiliar_president}</p>}
                            </div>

                            <div>
                                <Label htmlFor="auxiliary_president_phone">Teléfono</Label>
                                <PhoneInput
                                    id="auxiliary_president_phone"
                                    name="auxiliary_president_phone"
                                    autoComplete="tel"
                                    type="tel"
                                    value={data.auxiliary_president_phone?.toString() || ''}
                                    onInputChange={(value: string) => setData('auxiliary_president_phone', value)}
                                    placeholder={`Tu número de teléfono`}
                                    className="max-w-[25rem] rounded-l-none"
                                    countries={countries}
                                    selectedCountryId={data.country_id}
                                    required
                                    enableDropdown={true}
                                    minLength={3}
                                    maxLength={18}
                                />
                                {errors.auxiliary_president_phone && <p className="text-sm text-red-500">{errors.auxiliar_president_phone}</p>}
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
