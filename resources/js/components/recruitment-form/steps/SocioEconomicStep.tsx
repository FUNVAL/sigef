import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { Enums, Translation } from '@/types/global';
import { RecruitmentRequest, HouseholdMember } from '@/types/recruitment';
import { usePage } from '@inertiajs/react';
import { Plus, Trash2, Users, DollarSign, Wifi, Monitor, Home, Briefcase } from 'lucide-react';
import { useContext, useState } from 'react';
import { StepsHeader } from '../../pre-registration/steps-header';

interface SocioEconomicStepProps {
    request: RecruitmentRequest;
    enums: Enums;
}

export function SocioEconomicStep({ request, enums }: SocioEconomicStepProps) {
    const { nextStep } = useContext(StepperContext);
    const { data, setData } = request;
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [selectedBonusCategories, setSelectedBonusCategories] = useState<number[]>([]);
    const [bonusAmounts, setBonusAmounts] = useState<Record<number, number>>({});

    // Add defensive checks for enums
    if (!enums) {
        return (
            <div className="mx-auto max-w-4xl space-y-6 p-4">
                <div className="text-center">
                    <p>Cargando formulario...</p>
                </div>
            </div>
        );
    }

    const addHouseholdMember = () => {
        const newMember: HouseholdMember = {
            name: '',
            phone: '',
            relationship: 0
        };
        setData('household_members', [...data.household_members, newMember]);
    };

    const removeHouseholdMember = (index: number) => {
        const updatedMembers = data.household_members.filter((_, i) => i !== index);
        setData('household_members', updatedMembers);
    };

    const updateHouseholdMember = (index: number, field: keyof HouseholdMember, value: any) => {
        const updatedMembers = [...data.household_members];
        updatedMembers[index] = { ...updatedMembers[index], [field]: value };
        setData('household_members', updatedMembers);
    };

    const handleBonusCategoryChange = (categoryId: number, checked: boolean) => {
        let updatedCategories = [...selectedBonusCategories];
        let updatedAmounts = { ...bonusAmounts };

        if (checked) {
            updatedCategories.push(categoryId);
        } else {
            updatedCategories = updatedCategories.filter(id => id !== categoryId);
            delete updatedAmounts[categoryId];
        }

        setSelectedBonusCategories(updatedCategories);
        setBonusAmounts(updatedAmounts);
        setData('bonus_categories', updatedCategories);
        setData('bonus_amounts', Object.values(updatedAmounts));
    };

    const handleBonusAmountChange = (categoryId: number, amount: number) => {
        const updatedAmounts = { ...bonusAmounts, [categoryId]: amount };
        setBonusAmounts(updatedAmounts);
        setData('bonus_amounts', Object.values(updatedAmounts));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validación básica
        const validationErrors: Record<string, string> = {};

        if (data.household_members.length === 0) {
            validationErrors.household_members = 'Debe agregar al menos una persona';
        }

        data.household_members.forEach((member, index) => {
            if (!member.name.trim()) {
                validationErrors[`household_member_${index}_name`] = 'El nombre es requerido';
            }
            if (!member.relationship) {
                validationErrors[`household_member_${index}_relationship`] = 'La relación es requerida';
            }
        });

        if (!data.monthly_income || data.monthly_income <= 0) {
            validationErrors.monthly_income = 'Los ingresos mensuales son requeridos';
        }

        if (!data.device_type) {
            validationErrors.device_type = 'El tipo de dispositivo es requerido';
        }

        if (!data.housing_type) {
            validationErrors.housing_type = 'El tipo de vivienda es requerido';
        }

        if (data.has_employment && !data.employment_type) {
            validationErrors.employment_type = 'El tipo de empleo es requerido';
        }

        if (data.has_employment && data.employment_type === 2) { // COMPANY_EMPLOYEE
            if (!data.company_name?.trim()) {
                validationErrors.company_name = 'El nombre de la empresa es requerido';
            }
            if (!data.job_position) {
                validationErrors.job_position = 'El puesto es requerido';
            }
            if (!data.employment_income || data.employment_income <= 0) {
                validationErrors.employment_income = 'El salario es requerido';
            }
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        nextStep();
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6 p-4">
            <StepsHeader
                title="Información Socio-económica"
                subtitle="Proporcione información sobre su situación económica y familiar"
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Miembros del hogar */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Número de personas que viven en su casa
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {data.household_members.map((member, index) => (
                            <div key={index} className="flex gap-4 items-end p-4 border rounded-lg">
                                <div className="flex-1">
                                    <Label htmlFor={`member-name-${index}`}>Nombre</Label>
                                    <Input
                                        id={`member-name-${index}`}
                                        value={member.name}
                                        onChange={(e) => updateHouseholdMember(index, 'name', e.target.value)}
                                        placeholder="Nombre completo"
                                        className={errors[`household_member_${index}_name`] ? 'border-red-500' : ''}
                                    />
                                    {errors[`household_member_${index}_name`] && (
                                        <p className="text-sm text-red-500 mt-1">{errors[`household_member_${index}_name`]}</p>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <Label htmlFor={`member-phone-${index}`}>Teléfono (opcional)</Label>
                                    <Input
                                        id={`member-phone-${index}`}
                                        value={member.phone || ''}
                                        onChange={(e) => updateHouseholdMember(index, 'phone', e.target.value)}
                                        placeholder="Número de teléfono"
                                        type="tel"
                                    />
                                </div>
                                <div className="flex-1">
                                    <Label htmlFor={`member-relationship-${index}`}>Relación</Label>
                                    <Select
                                        value={member.relationship.toString()}
                                        onValueChange={(value: string) => updateHouseholdMember(index, 'relationship', parseInt(value))}
                                    >
                                        <SelectTrigger className={errors[`household_member_${index}_relationship`] ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Seleccionar relación" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {enums.familyRelationship?.map((item) => (
                                                <SelectItem key={item.id} value={item.id.toString()}>
                                                    {item.name}
                                                </SelectItem>
                                            )) || []}
                                        </SelectContent>
                                    </Select>
                                    {errors[`household_member_${index}_relationship`] && (
                                        <p className="text-sm text-red-500 mt-1">{errors[`household_member_${index}_relationship`]}</p>
                                    )}
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeHouseholdMember(index)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addHouseholdMember}
                            className="w-full"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar persona
                        </Button>
                        {errors.household_members && (
                            <p className="text-sm text-red-500">{errors.household_members}</p>
                        )}
                    </CardContent>
                </Card>

                {/* Ingresos mensuales */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5" />
                            Ingresos mensuales (USD)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input
                            type="number"
                            value={data.monthly_income}
                            onChange={(e) => setData('monthly_income', parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            className={errors.monthly_income ? 'border-red-500' : ''}
                        />
                        {errors.monthly_income && (
                            <p className="text-sm text-red-500 mt-1">{errors.monthly_income}</p>
                        )}
                    </CardContent>
                </Card>

                {/* Internet residencial */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Wifi className="h-5 w-5" />
                            ¿Cuenta con servicio de Internet Residencial o WIFI?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="has_residential_internet"
                                    checked={data.has_residential_internet === true}
                                    onChange={() => setData('has_residential_internet', true)}
                                />
                                Sí
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="has_residential_internet"
                                    checked={data.has_residential_internet === false}
                                    onChange={() => setData('has_residential_internet', false)}
                                />
                                No
                            </label>
                        </div>
                    </CardContent>
                </Card>

                {/* Tipo de dispositivo */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Monitor className="h-5 w-5" />
                            ¿Qué tipo de dispositivo usará para conectarse a clases?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Select
                            value={data.device_type.toString()}
                            onValueChange={(value: string) => setData('device_type', parseInt(value))}
                        >
                            <SelectTrigger className={errors.device_type ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Seleccionar dispositivo" />
                            </SelectTrigger>
                            <SelectContent>
                                {enums.deviceType?.map((item) => (
                                    <SelectItem key={item.id} value={item.id.toString()}>
                                        {item.name}
                                    </SelectItem>
                                )) || []}
                            </SelectContent>
                        </Select>
                        {errors.device_type && (
                            <p className="text-sm text-red-500 mt-1">{errors.device_type}</p>
                        )}
                    </CardContent>
                </Card>

                {/* Tipo de vivienda */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Home className="h-5 w-5" />
                            Tipo de Vivienda
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Select
                            value={data.housing_type.toString()}
                            onValueChange={(value: string) => setData('housing_type', parseInt(value))}
                        >
                            <SelectTrigger className={errors.housing_type ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Seleccionar tipo de vivienda" />
                            </SelectTrigger>
                            <SelectContent>
                                {enums.housingType?.map((item) => (
                                    <SelectItem key={item.id} value={item.id.toString()}>
                                        {item.name}
                                    </SelectItem>
                                )) || []}
                            </SelectContent>
                        </Select>
                        {errors.housing_type && (
                            <p className="text-sm text-red-500 mt-1">{errors.housing_type}</p>
                        )}
                    </CardContent>
                </Card>

                {/* Empleo */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5" />
                            Al día de hoy, ¿tiene un empleo?
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="has_employment"
                                    checked={data.has_employment === true}
                                    onChange={() => setData('has_employment', true)}
                                />
                                Sí
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="has_employment"
                                    checked={data.has_employment === false}
                                    onChange={() => setData('has_employment', false)}
                                />
                                No
                            </label>
                        </div>

                        {data.has_employment && (
                            <div className="space-y-4">
                                <div>
                                    <Label>Tipo de empleo</Label>
                                    <Select
                                        value={data.employment_type?.toString() || ''}
                                        onValueChange={(value: string) => setData('employment_type', parseInt(value))}
                                    >
                                        <SelectTrigger className={errors.employment_type ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Seleccionar tipo de empleo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {enums.employmentType?.map((item) => (
                                                <SelectItem key={item.id} value={item.id.toString()}>
                                                    {item.name}
                                                </SelectItem>
                                            )) || []}
                                        </SelectContent>
                                    </Select>
                                    {errors.employment_type && (
                                        <p className="text-sm text-red-500 mt-1">{errors.employment_type}</p>
                                    )}
                                </div>

                                {data.employment_type === 2 && ( // COMPANY_EMPLOYEE
                                    <>
                                        <div>
                                            <Label>Nombre de la empresa</Label>
                                            <Input
                                                value={data.company_name || ''}
                                                onChange={(e) => setData('company_name', e.target.value)}
                                                placeholder="Nombre de la empresa"
                                                className={errors.company_name ? 'border-red-500' : ''}
                                            />
                                            {errors.company_name && (
                                                <p className="text-sm text-red-500 mt-1">{errors.company_name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label>Puesto</Label>
                                            <Select
                                                value={data.job_position?.toString() || ''}
                                                onValueChange={(value: string) => setData('job_position', parseInt(value))}
                                            >
                                                <SelectTrigger className={errors.job_position ? 'border-red-500' : ''}>
                                                    <SelectValue placeholder="Seleccionar puesto" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {enums.jobPosition?.map((item) => (
                                                        <SelectItem key={item.id} value={item.id.toString()}>
                                                            {item.name}
                                                        </SelectItem>
                                                    )) || []}
                                                </SelectContent>
                                            </Select>
                                            {errors.job_position && (
                                                <p className="text-sm text-red-500 mt-1">{errors.job_position}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label>Salario (USD)</Label>
                                            <Input
                                                type="number"
                                                value={data.employment_income || ''}
                                                onChange={(e) => setData('employment_income', parseFloat(e.target.value) || 0)}
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                                className={errors.employment_income ? 'border-red-500' : ''}
                                            />
                                            {errors.employment_income && (
                                                <p className="text-sm text-red-500 mt-1">{errors.employment_income}</p>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Bono */}
                <Card>
                    <CardHeader>
                        <CardTitle>¿Necesita bono?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="needs_bonus"
                                    checked={data.needs_bonus === true}
                                    onChange={() => setData('needs_bonus', true)}
                                />
                                Sí
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="needs_bonus"
                                    checked={data.needs_bonus === false}
                                    onChange={() => {
                                        setData('needs_bonus', false);
                                        setSelectedBonusCategories([]);
                                        setBonusAmounts({});
                                        setData('bonus_categories', []);
                                        setData('bonus_amounts', []);
                                    }}
                                />
                                No
                            </label>
                        </div>

                        {data.needs_bonus && (
                            <div className="space-y-4">
                                <Label>Categorías de bono (puede seleccionar múltiples opciones)</Label>
                                {enums.bonusCategory?.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                                        <Checkbox
                                            checked={selectedBonusCategories.includes(item.id)}
                                            onCheckedChange={(checked) => handleBonusCategoryChange(item.id, checked as boolean)}
                                        />
                                        <span className="flex-1">{item.name}</span>
                                        {selectedBonusCategories.includes(item.id) && (
                                            <Input
                                                type="number"
                                                placeholder="Monto USD"
                                                min="0"
                                                step="0.01"
                                                className="w-32"
                                                value={bonusAmounts[item.id] || ''}
                                                onChange={(e) => handleBonusAmountChange(item.id, parseFloat(e.target.value) || 0)}
                                            />
                                        )}
                                    </div>
                                )) || []}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" size="lg">
                        Siguiente
                    </Button>
                </div>
            </form>
        </div>
    );
}