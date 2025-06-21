import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Country, PreRegistrationFormData, Stake, countries, stakes } from '../../../types/forms';

interface PreRegistrationFormStepProps {
    onNext: (data: PreRegistrationFormData) => void;
    onBack: () => void;
}

interface CountrySelectProps {
    countries: Country[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

// CountrySelect adaptado a dark mode
function CountrySelect({ countries, value, onChange, placeholder }: CountrySelectProps) {
    const [search, setSearch] = useState('');
    const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(search.toLowerCase()));

    const selectRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setSearch('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent ref={selectRef} className="bg-background max-h-60 overflow-auto pt-2 dark:bg-gray-900">
                <div className="bg-background border-muted sticky top-0 z-10 border-b px-3 pb-2 dark:border-gray-700 dark:bg-gray-900">
                    <Input
                        autoFocus
                        placeholder="Buscar país..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-background text-foreground w-full dark:bg-gray-900"
                        name="country_search"
                    />
                </div>

                {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                        <SelectItem key={country.name} value={country.name}>
                            {country.name}
                        </SelectItem>
                    ))
                ) : (
                    <div className="text-muted-foreground p-4 text-center select-none">No se encontraron países</div>
                )}
            </SelectContent>
        </Select>
    );
}

export function PreRegistrationFormStep({ onNext, onBack }: PreRegistrationFormStepProps) {
    const [formData, setFormData] = useState<PreRegistrationFormData>({
        first_name: '',
        middle_name: '',
        last_name: '',
        second_last_name: '',
        gender: '',
        age: '',
        country_id: '',
        phone: '',
        stake_id: '',
        email: '',
        marital_status: '',
        served_mission: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid()) {
            console.log('Datos de pre-inscripción (JSON):', JSON.stringify(formData, null, 2));
            onNext(formData);
        }
    };

    const isFormValid = () => {
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
            'served_mission',
        ];
        return requiredFields.every((field) => formData[field as keyof PreRegistrationFormData]?.trim() !== '');
    };

    const updateFormData = (field: keyof PreRegistrationFormData, value: string) => {
        setFormData((prev) => {
            const updated = { ...prev, [field]: value };

            if (field === 'country_id') {
                const selected = countries.find((c) => c.name === value);
                if (selected) {
                    const code = selected.code;
                    if (!updated.phone.startsWith(code)) {
                        updated.phone = `${code} `;
                    }
                }
            }

            return updated;
        });
    };

    return (
        <div className="mx-auto max-w-3xl">
            <Card className="border-2">
                <CardHeader className="pb-4 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(46_131_242_/_1)]/10">
                        <UserPlus className="h-8 w-8 text-[rgb(46_131_242_/_1)]" />
                    </div>
                    <CardTitle className="text-funval-blue text-2xl font-bold text-[rgb(46_131_242_/_1)]">Formulario de Pre-inscripción</CardTitle>
                    <p className="text-muted-foreground mt-2">Completa tus datos personales para el proceso de inscripción</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Todos los inputs de nombres */}
                            <InputGroup id="first_name" label="First name" value={formData.first_name} onChange={updateFormData} required />
                            <InputGroup id="middle_name" label="Middle name" value={formData.middle_name} onChange={updateFormData} />
                            <InputGroup id="last_name" label="Last name" value={formData.last_name} onChange={updateFormData} required />
                            <InputGroup id="second_last_name" label="Second last name" value={formData.second_last_name} onChange={updateFormData} />

                            {/* Género */}
                            <div>
                                <Label htmlFor="gender">Género *</Label>
                                <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Masculino</SelectItem>
                                        <SelectItem value="female">Femenino</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Edad */}
                            <InputGroup
                                id="age"
                                label="Age"
                                value={formData.age}
                                onChange={updateFormData}
                                type="number"
                                min="18"
                                max="100"
                                required
                            />

                            {/* País */}
                            <div>
                                <Label htmlFor="country_id">Pais *</Label>
                                <CountrySelect
                                    countries={countries}
                                    value={formData.country_id}
                                    onChange={(value) => updateFormData('country_id', value)}
                                    placeholder="Select country"
                                />
                            </div>

                            {/* Teléfono */}
                            <InputGroup id="phone" label="Phone" value={formData.phone} onChange={updateFormData} required />

                            {/* Estaca */}
                            <div>
                                <Label htmlFor="stake_id">Estaca/Distrito/Misión *</Label>
                                <Select value={formData.stake_id} onValueChange={(value) => updateFormData('stake_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a stake" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {stakes.map((stake: Stake) => (
                                            <SelectItem key={stake.id} value={stake.name}>
                                                {stake.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Correo */}
                            <InputGroup id="email" label="Email" value={formData.email} onChange={updateFormData} type="email" required />

                            {/* Estado Civil */}
                            <div>
                                <Label htmlFor="marital_status">Estado civil *</Label>
                                <Select value={formData.marital_status} onValueChange={(value) => updateFormData('marital_status', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select marital status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="single">Soltero/a</SelectItem>
                                        <SelectItem value="married">Casado/a</SelectItem>
                                        <SelectItem value="divorced">Divorciado/a</SelectItem>
                                        <SelectItem value="widowed">Viudo/a</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Misión */}
                        <div>
                            <Label className="text-base font-medium">¿Has servido una misión? *</Label>
                            <RadioGroup
                                value={formData.served_mission}
                                onValueChange={(value) => updateFormData('served_mission', value)}
                                className="mt-2 flex flex-row space-x-6"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="yes" id="mission-yes" />
                                    <Label htmlFor="mission-yes">Si</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no" id="mission-no" />
                                    <Label htmlFor="mission-no">No</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Botones */}
                        <div className="flex justify-between pt-4">
                            <Button type="button" onClick={onBack} variant="outline" size="lg" className="min-w-[120px]">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Anterior
                            </Button>

                            <Button
                                type="submit"
                                disabled={!isFormValid()}
                                size="lg"
                                className="min-w-[200px] bg-[rgb(46_131_242_/1)] text-white transition-colors hover:bg-[rgb(46_131_242/_1)]/90"
                            >
                                Continuar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

// InputGroup helper
function InputGroup({
    id,
    label,
    value,
    onChange,
    ...rest
}: {
    id: keyof PreRegistrationFormData;
    label: string;
    value: string;
    onChange: (field: keyof PreRegistrationFormData, value: string) => void;
    [key: string]: any;
}) {
    return (
        <div>
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} name={id} value={value} onChange={(e) => onChange(id, e.target.value)} {...rest} />
        </div>
    );
}
