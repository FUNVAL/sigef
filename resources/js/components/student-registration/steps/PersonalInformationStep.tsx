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
import { Course } from '@/types/course';
import { Enums, Translation } from '@/types/global';
import { StudentRegistrationFormData, StudentRegistrationRequest } from '@/types/student-registration';
import { usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, GraduationCap, Loader2, Mail, MapPin, Navigation, Phone, User } from 'lucide-react';
import { useCallback, useContext, useState } from 'react';
import { StepsHeader } from '../../pre-registration/steps-header';

interface PersonalInformationStepProps {
    countries: Country[];
    courses: Course[];
    enums: Enums;
    request: StudentRegistrationRequest;
}

export function PersonalInformationStep({ countries, courses, enums, request }: PersonalInformationStepProps) {
    const { nextStep, previousStep } = useContext(StepperContext);
    const { data, setData } = request;
    const { translations } = usePage<{ translations: Translation }>().props;
    const { ui } = usePage<Translation>().props;
    const t = translations.student_registration;
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    const { stakes } = useFilteredStakes(data.country_id);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validación básica
        const validationErrors: Record<string, string> = {};

        if (!data.first_name?.trim()) validationErrors.first_name = t.validation.first_name_required;
        if (!data.last_name?.trim()) validationErrors.last_name = t.validation.last_name_required;
        if (!data.birth_date) validationErrors.birth_date = t.validation.birth_date_required;
        if (!data.gender) validationErrors.gender = t.validation.gender_required;
        if (!data.country_id) validationErrors.country_id = t.validation.country_required;
        if (!data.marital_status) validationErrors.marital_status = t.validation.marital_status_required;
        if (!data.email?.trim()) validationErrors.email = t.validation.email_required;
        if (!data.phone?.trim()) validationErrors.phone = t.validation.phone_required;
        if (!data.home_location_link?.trim()) validationErrors.home_location_link = 'La ubicación es obligatoria';

        // Validaciones académicas
        if (!data.education_level) validationErrors.education_level = 'El grado académico es obligatorio';
        if (!data.course_id) validationErrors.course_id = 'Debe seleccionar un curso';
        if (!data.english_connect_level) validationErrors.english_connect_level = 'Debe especificar su nivel de English Connect';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // La edad ya se calcula automáticamente cuando se selecciona la fecha
        setErrors({});
        nextStep();
    };

    const cleanSpaces = useCallback(
        (field: keyof StudentRegistrationFormData, value: string) => {
            const nameFields: (keyof StudentRegistrationFormData)[] = [
                'first_name',
                'middle_name',
                'last_name',
                'second_last_name',
                'recruiter_name',
            ];
            let cleanedValue = value.replace(/\s+/g, ' ').trim();
            if (nameFields.includes(field)) {
                cleanedValue = cleanedValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
            }
            setData(field, cleanedValue);
        },
        [setData],
    );

    // Función para obtener la ubicación del usuario
    const getCurrentLocation = useCallback(() => {
        if (!navigator.geolocation) {
            alert('La geolocalización no está soportada por este navegador.');
            return;
        }

        setIsGettingLocation(true);
        setErrors((prev) => ({ ...prev, home_location_link: '' }));

        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // Crear un string con formato "lat,lng" que el backend pueda usar
                const locationString = `${latitude.toFixed(6)},${longitude.toFixed(6)}`;
                setData('home_location_link', locationString);
                setIsGettingLocation(false);
            },
            (error) => {
                setIsGettingLocation(false);
                let errorMessage = 'Error al obtener la ubicación.';

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Acceso a la ubicación denegado. Por favor, permita el acceso a la ubicación.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Información de ubicación no disponible.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Tiempo de espera agotado al obtener la ubicación.';
                        break;
                }

                setErrors((prev) => ({ ...prev, home_location_link: errorMessage }));
            },
            options,
        );
    }, [setData, setErrors]);

    // Función para calcular la edad automáticamente
    const calculateAge = useCallback(
        (birthDateString: string) => {
            if (!birthDateString) {
                setData('age', undefined);
                return;
            }

            const birthDate = new Date(birthDateString);
            const today = new Date();

            // Verificar que la fecha es válida
            if (isNaN(birthDate.getTime())) {
                setData('age', undefined);
                return;
            }

            // Verificar que la fecha no sea futura
            if (birthDate > today) {
                setData('age', undefined);
                return;
            }

            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            // Si no ha llegado el cumpleaños este año, restar 1
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age = age - 1;
            }

            // Asegurar que la edad no sea negativa
            setData('age', Math.max(0, age));
        },
        [setData],
    );

    // Función para manejar el cambio de fecha de nacimiento
    const handleBirthDateChange = useCallback(
        (value: string) => {
            setData('birth_date', value);
            calculateAge(value);
        },
        [setData, calculateAge],
    );

    return (
        <Card className="mx-auto w-full max-w-4xl overflow-hidden border-0 pt-0 shadow-2xl">
            <StepsHeader title={t.steps.personal_information.title} subtitle={t.steps.personal_information.subtitle} />

            <CardContent className="space-y-6 p-3 sm:space-y-8 sm:p-6 md:p-8">
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    {/* Nombres y apellidos */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <User className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">{t.sections.names_surnames}</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Primer Nombre */}
                            <div>
                                <Label htmlFor="first_name">{t.fields.first_name} </Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    value={data.first_name || ''}
                                    onChange={(e) => cleanSpaces('first_name', e.target.value)}
                                    placeholder={t.placeholders.first_name}
                                    autoComplete="given-name"
                                    required
                                />
                                {errors?.first_name && <p className="text-sm text-red-500">{errors.first_name}</p>}
                            </div>

                            {/* Segundo Nombre */}
                            <div>
                                <Label htmlFor="middle_name">{t.fields.middle_name}</Label>
                                <Input
                                    id="middle_name"
                                    name="middle_name"
                                    autoComplete="additional-name"
                                    value={data.middle_name || ''}
                                    onChange={(e) => cleanSpaces('middle_name', e.target.value)}
                                    placeholder={t.placeholders.middle_name}
                                />
                                {errors?.middle_name && <p className="text-sm text-red-500">{errors.middle_name}</p>}
                            </div>

                            {/* Primer Apellido */}
                            <div>
                                <Label htmlFor="last_name">{t.fields.last_name} </Label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    autoComplete="family-name"
                                    value={data.last_name || ''}
                                    onChange={(e) => cleanSpaces('last_name', e.target.value)}
                                    placeholder={t.placeholders.last_name}
                                    required
                                />
                                {errors?.last_name && <p className="text-sm text-red-500">{errors.last_name}</p>}
                            </div>

                            {/* Segundo Apellido */}
                            <div>
                                <Label htmlFor="second_last_name">{t.fields.second_last_name}</Label>
                                <Input
                                    id="second_last_name"
                                    name="second_last_name"
                                    autoComplete="family-name"
                                    value={data.second_last_name || ''}
                                    onChange={(e) => cleanSpaces('second_last_name', e.target.value)}
                                    placeholder={t.placeholders.second_last_name}
                                />
                                {errors?.second_last_name && <p className="text-sm text-red-500">{errors.second_last_name}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Información de nacimiento y género */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">{t.sections.birth_gender}</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {/* Fecha de nacimiento */}
                            <div>
                                <Label htmlFor="birth_date">{t.fields.birth_date} </Label>
                                <Input
                                    id="birth_date"
                                    name="birth_date"
                                    type="date"
                                    value={data.birth_date || ''}
                                    onChange={(e) => handleBirthDateChange(e.target.value)}
                                    max={new Date().toISOString().split('T')[0]} // No permitir fechas futuras
                                    required
                                />
                                {errors?.birth_date && <p className="text-sm text-red-500">{errors.birth_date}</p>}
                            </div>

                            {/* Edad (calculada automáticamente) */}
                            <div>
                                <Label htmlFor="age">{t.fields.age}</Label>
                                <Input
                                    id="age"
                                    name="age"
                                    type="number"
                                    value={data.age || ''}
                                    readOnly
                                    placeholder={t.placeholders.age_automatic}
                                    className="bg-gray-50"
                                    required
                                />
                            </div>

                            {/* Género */}
                            <div>
                                <Label htmlFor="gender">{t.fields.gender} </Label>
                                <Select
                                    value={data.gender?.toString() || ''}
                                    onValueChange={(value) => setData('gender', Number(value))}
                                    name="gender"
                                    required
                                >
                                    <SelectTrigger id="gender">
                                        <SelectValue placeholder={t.placeholders.select_gender} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {enums.gender?.map((gender) => (
                                            <SelectItem key={gender.id} value={gender.id.toString()}>
                                                {gender.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors?.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Ubicación */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">{t.sections.location}</h3>
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
                                    label={`${t.fields.country}`}
                                    required
                                    placeholder={t.placeholders.select_country}
                                />
                                {errors?.country_id && <p className="text-sm text-red-500">{errors.country_id}</p>}
                            </div>

                            {/* Estado civil */}
                            <div>
                                <Label htmlFor="marital_status">{t.fields.marital_status} </Label>
                                <Select
                                    value={data.marital_status?.toString() || ''}
                                    onValueChange={(value) => setData('marital_status', Number(value))}
                                    required
                                    name="marital_status"
                                >
                                    <SelectTrigger id="marital_status">
                                        <SelectValue placeholder={t.placeholders.select_marital_status} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {enums.maritalStatus?.map((status) => (
                                            <SelectItem key={status.id} value={status.id.toString()}>
                                                {status.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors?.marital_status && <p className="text-sm text-red-500">{errors.marital_status}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Información de contacto */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <Phone className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">{t.sections.contact_info}</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Correo electrónico */}
                            <div>
                                <Label htmlFor="email">{t.fields.email} </Label>
                                <div className="relative">
                                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={data.email || ''}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder={t.placeholders.email}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                                {errors?.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>

                            {/* Teléfono */}
                            <div>
                                <Label htmlFor="phone">{t.fields.phone} </Label>
                                <PhoneInput
                                    id="phone"
                                    name="phone"
                                    autoComplete="tel"
                                    type="tel"
                                    value={data.phone || ''}
                                    onInputChange={(value: string) => setData('phone', value)}
                                    placeholder={t.placeholders.phone}
                                    countries={countries}
                                    selectedCountryId={data.country_id}
                                    required
                                    minLength={3}
                                    maxLength={18}
                                />
                                {errors?.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
                            {/* Ubicación del hogar */}
                            <div>
                                <Label htmlFor="home_location_link">Ubicación de su Casa</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="home_location_link"
                                        name="home_location_link"
                                        value={data.home_location_link || ''}
                                        onChange={(e) => setData('home_location_link', e.target.value)}
                                        placeholder="Latitud, Longitud (ej: 18.4861,-69.9312)"
                                        className="flex-1"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        onClick={getCurrentLocation}
                                        disabled={isGettingLocation}
                                        variant="outline"
                                        size="default"
                                        className="min-w-[140px] border-[rgb(46_131_242_/_1)] text-[rgb(46_131_242_/_1)] hover:bg-[rgb(46_131_242_/_1)] hover:text-white"
                                    >
                                        {isGettingLocation ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Obteniendo...
                                            </>
                                        ) : (
                                            <>
                                                <Navigation className="mr-2 h-4 w-4" />
                                                Mi Ubicación
                                            </>
                                        )}
                                    </Button>
                                </div>
                                {errors?.home_location_link && <p className="text-sm text-red-500">{errors.home_location_link}</p>}
                                <p className="mt-1 text-xs text-gray-500">
                                    Haga clic en "Mi Ubicación" para detectar automáticamente sus coordenadas
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Información Académica */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">Información Académica</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Nivel educativo */}
                            <div>
                                <Label htmlFor="education_level">Grado Académico Alcanzado </Label>
                                <Select
                                    value={data.education_level?.toString() || ''}
                                    onValueChange={(value) => setData('education_level', Number(value))}
                                    name="education_level"
                                    required
                                >
                                    <SelectTrigger id="education_level">
                                        <SelectValue placeholder="Seleccione su nivel educativo más alto" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {enums.educationLevel?.map((level: any) => (
                                            <SelectItem key={level.id} value={level.id.toString()}>
                                                {level.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.education_level && <p className="text-sm text-red-500">{errors.education_level}</p>}
                            </div>

                            {/* Curso */}
                            <div>
                                <Label htmlFor="course_id">Curso al que se Inscribe </Label>
                                <Select
                                    value={data.course_id?.toString() || ''}
                                    onValueChange={(value) => setData('course_id', Number(value))}
                                    name="course_id"
                                    required
                                >
                                    <SelectTrigger id="course_id">
                                        <SelectValue placeholder="Seleccione el curso de su interés" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {courses.map((course) => (
                                            <SelectItem key={course.id} value={course.id.toString()}>
                                                <div className="flex gap-2">
                                                    <span className="font-medium">{course.name}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.course_id && <p className="text-sm text-red-500">{errors.course_id}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* English Connect Level */}
                            <div>
                                <Label htmlFor="english_connect_level">Nivel de English Connect </Label>
                                <Select
                                    value={data.english_connect_level?.toString() || ''}
                                    onValueChange={(value) => setData('english_connect_level', Number(value))}
                                    name="english_connect_level"
                                    required
                                >
                                    <SelectTrigger id="english_connect_level">
                                        <SelectValue placeholder="Seleccione su nivel de English Connect" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {enums.englishConnectLevel?.map((level: any) => (
                                            <SelectItem key={level.id} value={level.id.toString()}>
                                                {level.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.english_connect_level && <p className="text-sm text-red-500">{errors.english_connect_level}</p>}
                            </div>

                            {/* Reclutador */}
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
