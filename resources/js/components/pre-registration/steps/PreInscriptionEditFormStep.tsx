import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import SearchableSelect from '@/components/ui/searchable-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFilteredStakes from '@/hooks/use-filtered-stakes';
import { Course } from '@/types';
import { Country } from '@/types/country';
import { Enums } from '@/types/global';
import { PreInscriptionEditFormData } from '@/types/pre-inscription';
import { usePage } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle, Save } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PreInscriptionEditFormStepProps {
    request: {
        data: PreInscriptionEditFormData;
        setData: (field: keyof PreInscriptionEditFormData, value: any) => void;
        errors: Record<string, string>;
        processing: boolean;
    };
    countries: Country[];
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
}

export function PreInscriptionEditFormStep({ countries, request, onSubmit, onCancel }: PreInscriptionEditFormStepProps) {
    const { setData, data, errors: back_errors, processing } = request;
    const { enums } = usePage<{ enums: Enums }>().props;
    const { courses } = usePage<{ courses: Course[] }>().props;
    const { stakes } = useFilteredStakes(data.country_id);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        onSubmit(e);
    };

    useEffect(() => {
        if (Object.keys(back_errors).length > 0) {
            setErrors(back_errors);
        }
    }, [back_errors]);

    const isWoman = data.gender === 2;
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <form onSubmit={handleSubmit} noValidate>
                {/* Información Personal */}
                <Card className="border-none">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-800 dark:text-blue-500">Información Personal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="first_name" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                    Primer Nombre
                                </Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    placeholder="Primer nombre"
                                    autoComplete="given-name"
                                    required
                                />
                                {errors.first_name && <p className="text-sm text-red-500">{errors.first_name}</p>}
                            </div>

                            <div>
                                <Label htmlFor="middle_name" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                    Segundo Nombre (Opcional)
                                </Label>
                                <Input
                                    id="middle_name"
                                    name="middle_name"
                                    value={data.middle_name || ''}
                                    onChange={(e) => setData('middle_name', e.target.value)}
                                    placeholder="Segundo nombre"
                                    autoComplete="additional-name"
                                />
                                {errors.middle_name && <p className="text-sm text-red-500">{errors.middle_name}</p>}
                            </div>

                            <div>
                                <Label htmlFor="last_name" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                    Primer Apellido
                                </Label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    placeholder="Primer apellido"
                                    autoComplete="family-name"
                                    required
                                />
                                {errors.last_name && <p className="text-sm text-red-500">{errors.last_name}</p>}
                            </div>

                            <div>
                                <Label htmlFor="second_last_name" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                    Segundo Apellido (Opcional)
                                </Label>
                                <Input
                                    id="second_last_name"
                                    name="second_last_name"
                                    value={data.second_last_name || ''}
                                    onChange={(e) => setData('second_last_name', e.target.value)}
                                    placeholder="Segundo apellido"
                                    autoComplete="family-name"
                                />
                                {errors.second_last_name && <p className="text-sm text-red-500">{errors.second_last_name}</p>}
                            </div>

                            <div>
                                <Label htmlFor="gender" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                    Género
                                </Label>
                                <Select
                                    value={data.gender.toString()}
                                    onValueChange={(value) => setData('gender', Number(value))}
                                    name="gender"
                                    required
                                >
                                    <SelectTrigger id="gender">
                                        <SelectValue placeholder="Selecciona el género" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0" disabled>
                                            Selecciona el género
                                        </SelectItem>
                                        {enums.gender.map((gender) => (
                                            <SelectItem key={gender.id} value={gender.id.toString()}>
                                                {gender.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
                            </div>

                            <div>
                                <Label htmlFor="age" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                    Edad
                                </Label>
                                <Input
                                    id="age"
                                    name="age"
                                    autoComplete="age"
                                    type="number"
                                    value={data.age}
                                    onChange={(e) => setData('age', Number(e.target.value))}
                                    min="18"
                                    max="100"
                                    required
                                />
                                {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Información de Contacto */}
                <Card className="border-none">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-800 dark:text-blue-500">Información de Contacto</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="email" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                    Correo Electrónico
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="correo@ejemplo.com"
                                    autoComplete="email"
                                    required
                                />
                                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>

                            <div>
                                <Label htmlFor="phone" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                    Teléfono
                                </Label>
                                <PhoneInput
                                    id="phone"
                                    name="phone"
                                    autoComplete="tel"
                                    type="tel"
                                    value={data.phone}
                                    onInputChange={(value: string) => setData('phone', value)}
                                    placeholder="Número de teléfono"
                                    className="rounded-l-none"
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
                            <div>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">País</Label>
                                <SearchableSelect
                                    data={countries}
                                    name="country_id"
                                    id="country_id"
                                    value={data.country_id.toString()}
                                    onValueChange={(value) => setData('country_id', Number(value))}
                                    required
                                    placeholder="Selecciona un país"
                                />
                                {errors.country_id && <p className="text-sm text-red-500">{errors.country_id}</p>}
                            </div>

                            <div>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Estaca/Distrito/Misión</Label>
                                <SearchableSelect
                                    data={stakes}
                                    name="stake_id"
                                    id="stake_id"
                                    value={data.stake_id.toString()}
                                    onValueChange={(value) => setData('stake_id', Number(value))}
                                    disabled={!data.country_id}
                                    placeholder={data.country_id ? 'Selecciona una estaca/distrito/misión' : 'Primero selecciona un país'}
                                />
                                {errors.stake_id && <p className="text-sm text-red-500">{errors.stake_id}</p>}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Información Adicional */}
                <Card className="border-none">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-800 dark:text-blue-500">Información Adicional</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="marital_status" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                    Estado Civil
                                </Label>
                                <Select
                                    value={data.marital_status.toString()}
                                    onValueChange={(value) => setData('marital_status', Number(value))}
                                    name="marital_status"
                                    required
                                >
                                    <SelectTrigger id="marital_status">
                                        <SelectValue placeholder="Selecciona el estado civil" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0" disabled>
                                            Selecciona el estado civil
                                        </SelectItem>
                                        {enums.maritalStatus.map((status) => (
                                            <SelectItem key={status.id} value={status.id.toString()}>
                                                {status.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.marital_status && <p className="text-sm text-red-500">{errors.marital_status}</p>}
                            </div>

                            <div>
                                <Label htmlFor="served_mission" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                    ¿Ha servido misión?
                                </Label>
                                <Select
                                    value={data.served_mission?.toString() || '0'}
                                    onValueChange={(value) => setData('served_mission', Number(value))}
                                    name="served_mission"
                                    required
                                >
                                    <SelectTrigger id="served_mission">
                                        <SelectValue placeholder="¿Ha servido misión?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0" disabled>
                                            Selecciona una opción
                                        </SelectItem>
                                        {enums.missionStatus.map((status) => (
                                            <SelectItem key={status.id} value={status.id.toString()}>
                                                {status.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.served_mission && <p className="text-sm text-red-500">{errors.served_mission}</p>}
                            </div>
                            <div>
                                <Label htmlFor="course_id" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                    Curso seleccionado
                                </Label>
                                <SearchableSelect
                                    data={courses}
                                    name="course_id"
                                    id="course_id"
                                    value={data.course_id?.toString() || '0'}
                                    onValueChange={(value) => setData('course_id', Number(value))}
                                    placeholder="Selecciona un curso"
                                />
                                {errors.course_id && <p className="text-sm text-red-500">{errors.course_id}</p>}
                            </div>
                        </div>

                        {/* Campos específicos para mujeres */}
                        {isWoman && (
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="currently_working" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                        ¿Trabaja actualmente?
                                    </Label>
                                    <Select
                                        value={data.currently_working === null ? '' : data.currently_working?.toString()}
                                        onValueChange={(value) => setData('currently_working', value === 'true')}
                                        name="currently_working"
                                    >
                                        <SelectTrigger id="currently_working">
                                            <SelectValue placeholder="¿Trabaja actualmente?" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="true">Sí</SelectItem>
                                            <SelectItem value="false">No</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.currently_working && <p className="text-sm text-red-500">{errors.currently_working}</p>}
                                </div>

                                {!data.currently_working && (
                                    <div>
                                        <Label htmlFor="job_type_preference" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                            Preferencia de Trabajo
                                        </Label>
                                        <Select
                                            value={data.job_type_preference?.toString() || '0'}
                                            onValueChange={(value) => setData('job_type_preference', Number(value))}
                                            name="job_type_preference"
                                        >
                                            <SelectTrigger id="job_type_preference">
                                                <SelectValue placeholder="Selecciona preferencia" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0" disabled>
                                                    Selecciona preferencia
                                                </SelectItem>
                                                {enums.jobType.map((type) => (
                                                    <SelectItem key={type.id} value={type.id.toString()}>
                                                        {type.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.job_type_preference && <p className="text-sm text-red-500">{errors.job_type_preference}</p>}
                                    </div>
                                )}

                                {data.job_type_preference === 2 && ( // IN_PERSON
                                    <div>
                                        <Label htmlFor="available_full_time" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                            ¿Disponible tiempo completo?
                                        </Label>
                                        <Select
                                            value={data.available_full_time?.toString() || ''}
                                            onValueChange={(value) => setData('available_full_time', value === 'true')}
                                            name="available_full_time"
                                        >
                                            <SelectTrigger id="available_full_time">
                                                <SelectValue placeholder="¿Disponible tiempo completo?" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">Sí</SelectItem>
                                                <SelectItem value="false">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.available_full_time && <p className="text-sm text-red-500">{errors.available_full_time}</p>}
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Botones de acción */}
                <div className="flex justify-between pt-4">
                    <Button type="button" onClick={onCancel} variant="outline" size="lg" className="min-w-[120px]" disabled={processing}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Cancelar
                    </Button>

                    <Button
                        type="submit"
                        size="lg"
                        className="bg-blue-600 px-8 py-2 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={processing}
                    >
                        <Save className="mr-2 h-4 w-4" />
                        {processing ? (
                            <>
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            'Guardar Cambios'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
