import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import SearchableSelect from '@/components/ui/searchable-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFilteredStakes from '@/hooks/use-filtered-stakes';
import { referralFormSchema } from '@/lib/schemas/referral';
import validateForm from '@/lib/schemas/validate-schemas';
import { Country } from '@/types/country';
import { Enums, Translation } from '@/types/global';
import { ReferenceEditFormData } from '@/types/reference';
import { usePage } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle, Save } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ReferenceEditFormStepProps {
    request: {
        data: ReferenceEditFormData;
        setData: (field: keyof ReferenceEditFormData, value: any) => void;
        errors: Record<string, string>;
        processing: boolean;
    };
    countries: Country[];
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
}

export function ReferenceEditFormStep({ countries, request, onSubmit, onCancel }: ReferenceEditFormStepProps) {
    const { setData, data, errors: back_errors, processing } = request;
    const { enums } = usePage<{ enums: Enums }>().props;
    const { ui, forms } = usePage<Translation>().props;
    const { stakes } = useFilteredStakes(data.country_id);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm(data, referralFormSchema);

        if (!validationErrors?.success) {
            setErrors(validationErrors?.errors ?? {});
            return;
        }

        setErrors({});
        onSubmit(e);
    };

    useEffect(() => {
        if (Object.keys(back_errors).length > 0) {
            setErrors(back_errors);
        }
    }, [back_errors]);

    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <form onSubmit={handleSubmit} noValidate>
                {/* Información de la Persona Referida */}
                <Card className="border-none">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-800 dark:text-blue-500">Información de la Persona Referida</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="name" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                    {forms.referral.fields.name}
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder={forms.referral.fields.name_placeholder}
                                    autoComplete="name"
                                    required
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>

                            <div>
                                <Label htmlFor="gender" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                    {forms.referral.fields.gender}
                                </Label>
                                <Select
                                    value={data.gender.toString()}
                                    onValueChange={(value) => setData('gender', Number(value))}
                                    name="gender"
                                    required
                                >
                                    <SelectTrigger id="gender">
                                        <SelectValue placeholder={forms.referral.fields.gender_placeholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0" disabled>
                                            {forms.referral.fields.gender_select}
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
                                    {forms.referral.fields.age}
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

                            <div>
                                <Label htmlFor="phone" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                    {forms.referral.fields.phone}
                                </Label>
                                <PhoneInput
                                    id="phone"
                                    name="phone"
                                    autoComplete="tel"
                                    type="tel"
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
                                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                    {forms.referral.fields.country}
                                </Label>
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
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">{forms.referral.fields.stake}</Label>
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

                {/* Información del Referente */}
                <Card className="border-none">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-800 dark:text-blue-500">Información del Referente</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="referrer_name" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                    {forms.referral.fields.referrer_name}
                                </Label>
                                <Input
                                    id="referrer_name"
                                    name="referrer_name"
                                    value={data.referrer_name}
                                    onChange={(e) => setData('referrer_name', e.target.value)}
                                    placeholder="Nombre completo del referente"
                                    required
                                />
                                {errors.referrer_name && <p className="text-sm text-red-500">{errors.referrer_name}</p>}
                            </div>

                            <div>
                                <Label htmlFor="referrer_phone" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                    {forms.referral.fields.referrer_phone}
                                </Label>
                                <PhoneInput
                                    id="referrer_phone"
                                    name="referrer_phone"
                                    autoComplete="tel-referrer"
                                    type="tel"
                                    value={data.referrer_phone}
                                    onInputChange={(value: string) => setData('referrer_phone', value)}
                                    placeholder="Número de teléfono del referente"
                                    className="rounded-l-none"
                                    countries={countries}
                                    selectedCountryId={data.country_id}
                                    required
                                    enableDropdown={true}
                                    minLength={3}
                                    maxLength={18}
                                />
                                {errors.referrer_phone && <p className="text-sm text-red-500">{errors.referrer_phone}</p>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="relationship_with_referred" className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">
                                {forms.referral.fields.relationship}
                            </Label>
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
                                    <SelectItem value="0" disabled>
                                        Selecciona la relación con el referido
                                    </SelectItem>
                                    {enums.relatedReference.map((relation) => (
                                        <SelectItem key={relation.id} value={relation.id?.toString()}>
                                            {relation.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.relationship_with_referred && <p className="text-sm text-red-500">{errors.relationship_with_referred}</p>}
                        </div>
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
