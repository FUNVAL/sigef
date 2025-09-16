import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validación básica
        const validationErrors: Record<string, string> = {};

        if (data.is_active_member === undefined) validationErrors.is_active_member = 'Debe especificar si es miembro activo';
        if (data.is_returned_missionary === undefined) validationErrors.is_returned_missionary = 'Debe especificar si es misionero retornado';
        if (!data.temple_status) validationErrors.temple_status = 'Debe especificar su estado del templo';
        if (!data.stake_id) validationErrors.stake_id = 'Debe seleccionar su estaca/distrito/misión';

        // Validaciones condicionales
        if (data.is_active_member && !data.member_certificate_number?.trim()) {
            validationErrors.member_certificate_number = 'El número de cédula de miembro es requerido para miembros activos';
        }

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
            <StepsHeader title="Información Religiosa / Eclesiástica" subtitle="Complete su información de membresía y participación religiosa" />

            <CardContent className="space-y-6 p-3 sm:space-y-8 sm:p-6 md:p-8">
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    {/* Membresía activa */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <Church className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">Membresía de la Iglesia</h3>
                        </div>

                        {/* ¿Es miembro activo? */}
                        <div className="space-y-3">
                            <Label className="text-base font-medium">¿Es un miembro activo en su iglesia? *</Label>
                            <RadioGroup
                                value={data.is_active_member !== undefined ? data.is_active_member.toString() : ''}
                                onValueChange={(value) => setData('is_active_member', value === 'true')}
                                className="flex gap-6"
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

                        {/* Número de cédula de miembro */}
                        {data.is_active_member && (
                            <div>
                                <Label htmlFor="member_certificate_number">Número de Cédula de Miembro *</Label>
                                <Input
                                    id="member_certificate_number"
                                    name="member_certificate_number"
                                    value={data.member_certificate_number || ''}
                                    onChange={(e) => setData('member_certificate_number', e.target.value)}
                                    placeholder="Ingrese su número de cédula de miembro"
                                    required={data.is_active_member}
                                />
                                {errors.member_certificate_number && <p className="text-sm text-red-500">{errors.member_certificate_number}</p>}
                            </div>
                        )}

                        {/* Año de bautismo */}
                        <div>
                            <Label htmlFor="baptism_year">¿En qué año se bautizó?</Label>
                            <Select
                                value={data.baptism_year?.toString() || ''}
                                onValueChange={(value) => setData('baptism_year', Number(value))}
                                name="baptism_year"
                            >
                                <SelectTrigger id="baptism_year">
                                    <SelectValue placeholder="Seleccione el año de bautismo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">No aplica / No recuerdo</SelectItem>
                                    {years.map((year) => (
                                        <SelectItem key={year} value={year.toString()}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
                            <Label className="text-base font-medium">Misionero retornado *</Label>
                            <RadioGroup
                                value={data.is_returned_missionary !== undefined ? data.is_returned_missionary.toString() : ''}
                                onValueChange={(value) => setData('is_returned_missionary', value === 'true')}
                                className="flex gap-6"
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
                                    <Label htmlFor="mission_served">¿En qué misión sirvió? *</Label>
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
                                    <Label htmlFor="mission_end_year">¿Año en que finalizó la misión? *</Label>
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
                        <div>
                            <Label htmlFor="temple_status">Sellado en el Templo *</Label>
                            <Select
                                value={data.temple_status?.toString() || ''}
                                onValueChange={(value) => setData('temple_status', Number(value))}
                                name="temple_status"
                                required
                            >
                                <SelectTrigger id="temple_status">
                                    <SelectValue placeholder="Seleccione su estado del templo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {enums.templeStatus?.map((status) => (
                                        <SelectItem key={status.id} value={status.id.toString()}>
                                            {status.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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

                            {/* Barrio o rama */}
                            <div>
                                <Label htmlFor="ward_branch">Barrio o Rama a la que Pertenece</Label>
                                <Input
                                    id="ward_branch"
                                    name="ward_branch"
                                    value={data.ward_branch || ''}
                                    onChange={(e) => setData('ward_branch', e.target.value)}
                                    placeholder="Ej: Barrio Centro, Rama San Juan"
                                />
                            </div>
                        </div>

                        {/* Estaca */}
                        <div>
                            <SearchableSelect
                                data={stakes}
                                name="stake_id"
                                id="stake_id"
                                value={data.stake_id?.toString() || ''}
                                onValueChange={(value) => setData('stake_id', Number(value))}
                                label="Estaca, distrito o misión a la que pertenece *"
                                disabled={!data.country_id}
                                placeholder={
                                    data.country_id ? 'Seleccione su estaca/distrito/misión' : 'Primero seleccione un país en el paso anterior'
                                }
                                required
                            />
                            {errors.stake_id && <p className="text-sm text-red-500">{errors.stake_id}</p>}
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
