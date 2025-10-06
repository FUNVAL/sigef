import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { PhoneInput } from '@/components/ui/phone-input';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { Country } from '@/types/country';
import { Enums, Translation } from '@/types/global';
import { RecruitmentRequest, HouseholdMember, HouseholdExpense } from '@/types/recruitment';
import { Plus, Trash2, Users, DollarSign, Wifi, Monitor, Home, Briefcase } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { StepsHeader } from '../../pre-registration/steps-header';

interface SocioEconomicStepProps {
    request: RecruitmentRequest;
    enums: Enums;
    countries?: Country[];
    t?: Translation;
}

export function SocioEconomicStep({ request, enums, countries = [], t }: SocioEconomicStepProps) {
    const { nextStep } = useContext(StepperContext);
    const { data, setData } = request;
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [selectedBonusCategories, setSelectedBonusCategories] = useState<number[]>([]);
    const [bonusAmounts, setBonusAmounts] = useState<Record<number, number>>({});
    const [monthlyExpenses, setMonthlyExpenses] = useState<HouseholdExpense[]>([]);



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
            relationship: 0,
            age: '',
            income_contribution: 0
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



    // Monthly expenses functions
    const addMonthlyExpense = () => {
        const newExpense: HouseholdExpense = {
            type: 0, // Default to blank (no selection)
            amount: 0
        };
        setMonthlyExpenses([...monthlyExpenses, newExpense]);
    };

    const removeMonthlyExpense = (index: number) => {
        const updatedExpenses = monthlyExpenses.filter((_, i) => i !== index);
        setMonthlyExpenses(updatedExpenses);
    };

    const updateMonthlyExpense = (index: number, field: keyof HouseholdExpense, value: any) => {
        const updatedExpenses = [...monthlyExpenses];
        updatedExpenses[index] = {
            ...updatedExpenses[index],
            [field]: field === 'amount' ? parseFloat(value) || 0 : value
        };
        setMonthlyExpenses(updatedExpenses);
    };

    const handleBonusCategoryChange = (categoryId: number, checked: boolean) => {
        let updatedCategories = [...selectedBonusCategories];
        let updatedAmounts = { ...bonusAmounts };

        if (checked) {
            // Validar que no se seleccionen más de 2 bonos
            if (updatedCategories.length >= 2) {
                // Mostrar mensaje de error o simplemente no permitir más selecciones
                return;
            }
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
            if (member.phone && member.phone.length < 3) {
                validationErrors[`household_member_${index}_phone`] = 'El teléfono debe tener al menos 3 dígitos';
            }
        });

        // Note: Removed monthly income validation as we're now tracking expenses instead

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

        // Validar bonos (máximo 2)
        if (data.needs_bonus && selectedBonusCategories.length > 2) {
            validationErrors.bonus_categories = 'Solo se pueden seleccionar máximo 2 categorías de bono';
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
                title="Información Socioeconómica"
                subtitle="Proporcione información sobre su situación económica y familiar"
            />

            <form onSubmit={handleSubmit} className="space-y-6">


                {/* Miembros del hogar */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-[rgb(46_131_242_/_1)]">
                            <Users className="h-5 w-5" />
                            Número de personas que viven en su casa
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {data.household_members.map((member, index) => (
                            <div key={index} className="p-4 border rounded-lg space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
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
                                    <div>
                                        <Label htmlFor={`member-phone-${index}`}>Teléfono</Label>
                                        {countries && countries.length > 0 ? (
                                            <PhoneInput
                                                id={`member-phone-${index}`}
                                                name={`member-phone-${index}`}
                                                autoComplete="tel"
                                                type="tel"
                                                value={member.phone || ''}
                                                onInputChange={(value: string) => updateHouseholdMember(index, 'phone', value)}
                                                placeholder="Número de teléfono del familiar"
                                                className="rounded-l-none"
                                                countries={countries}
                                                enableDropdown={true}
                                                minLength={3}
                                                maxLength={18}
                                            />
                                        ) : (
                                            <Input
                                                id={`member-phone-${index}`}
                                                type="tel"
                                                value={member.phone || ''}
                                                onChange={(e) => updateHouseholdMember(index, 'phone', e.target.value)}
                                                placeholder="Ingrese el número de teléfono"
                                                required
                                            />
                                        )}
                                        {errors[`household_member_${index}_phone`] && (
                                            <p className="text-sm text-red-500 mt-1">{errors[`household_member_${index}_phone`]}</p>
                                        )}
                                    </div>
                                    <div>
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

                                    <div>
                                        {/* Edad */}
                                        <Label htmlFor={`member-age-${index}`}>Edad</Label>
                                        <Input
                                            id={`member-age-${index}`}
                                            type="number"
                                            value={member.age || ''}
                                            onChange={(e) => updateHouseholdMember(index, 'age', parseInt(e.target.value) || 0)}
                                            placeholder="Ingrese la edad"
                                            min="0"
                                            required
                                        />
                                        {errors[`household_member_${index}_age`] && (
                                            <p className="text-sm text-red-500 mt-1">{errors[`household_member_${index}_age`]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor={`member-income-${index}`}>Ingresos que aporta (USD)</Label>
                                        <Input
                                            id={`member-income-${index}`}
                                            type="number"
                                            value={member.income_contribution || ''}
                                            onChange={(e) => updateHouseholdMember(index, 'income_contribution', parseFloat(e.target.value) || 0)}
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeHouseholdMember(index)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Eliminar
                                    </Button>
                                </div>
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
                        
                        {/* Total de ingresos */}
                        {data.household_members.length > 0 && (
                            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-blue-800">Total de ingresos del hogar:</span>
                                    <span className="text-lg font-bold text-blue-900">
                                        ${data.household_members.reduce((total, member) => total + (member.income_contribution || 0), 0).toFixed(2)} USD
                                    </span>
                                </div>
                            </div>
                        )}
                        
                        {errors.household_members && (
                            <p className="text-sm text-red-500">{errors.household_members}</p>
                        )}
                    </CardContent>
                </Card>

                {/* Egresos mensuales */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-[rgb(46_131_242_/_1)]">
                            <DollarSign className="h-5 w-5" />
                            Egresos mensuales del hogar (USD)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Gastos mensuales</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addMonthlyExpense}
                            >
                                <Plus className="h-4 w-4 mr-1" />
                                Agregar gasto
                            </Button>
                        </div>

                        {monthlyExpenses.map((expense, index) => (
                            <div key={index} className="flex gap-2 p-3 border rounded">
                                <Select
                                    value={expense.type.toString()}
                                    onValueChange={(value) => updateMonthlyExpense(index, 'type', parseInt(value))}
                                >
                                    <SelectTrigger className="flex-1">
                                        <SelectValue placeholder="Tipo de gasto" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {enums.expenseType?.map((item) => (
                                            <SelectItem key={item.id} value={item.id.toString()}>
                                                {item.name}
                                            </SelectItem>
                                        )) || []}
                                    </SelectContent>
                                </Select>
                                <Input
                                    type="number"
                                    placeholder="Monto USD"
                                    value={expense.amount || ''}
                                    onChange={(e) => updateMonthlyExpense(index, 'amount', e.target.value)}
                                    min="0"
                                    step="0.01"
                                    className="w-32"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeMonthlyExpense(index)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}

                        {monthlyExpenses.length === 0 && (
                            <p className="text-sm text-gray-500 text-center py-4">
                                No se han agregado gastos mensuales. Haga clic en "Agregar gasto" para comenzar.
                            </p>
                        )}
                        
                        {/* Total de egresos */}
                        {monthlyExpenses.length > 0 && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-red-800">Total de egresos mensuales:</span>
                                    <span className="text-lg font-bold text-red-900">
                                        ${monthlyExpenses.reduce((total, expense) => total + (expense.amount || 0), 0).toFixed(2)} USD
                                    </span>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Internet residencial */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-[rgb(46_131_242_/_1)]">
                            <Wifi className="h-5 w-5" />
                            ¿Cuenta con servicio de Internet en su casa?
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
                        <CardTitle className="flex items-center gap-2 text-[rgb(46_131_242_/_1)]">
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
                        <CardTitle className="flex items-center gap-2 text-[rgb(46_131_242_/_1)]">
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
                        <CardTitle className="flex items-center gap-2 text-[rgb(46_131_242_/_1)]">
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
                        <CardTitle className="text-[rgb(46_131_242_/_1)]">¿Necesita bono?</CardTitle>
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
                                <Label>Categorías de bono (máximo 2 opciones)</Label>
                                {selectedBonusCategories.length >= 2 && (
                                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                                        <p className="text-blue-800 text-sm">
                                            Ya has seleccionado {selectedBonusCategories.length} categorías de bono.
                                        </p>
                                    </div>
                                )}
                                {enums.bonusCategory?.map((item) => {
                                    const isSelected = selectedBonusCategories.includes(item.id);
                                    const isDisabled = !isSelected && selectedBonusCategories.length >= 2;
                                    
                                    return (
                                        <div key={item.id} className={`flex items-center gap-4 p-4 border rounded-lg ${
                                            isDisabled ? 'opacity-50 bg-gray-50' : ''
                                        }`}>
                                            <Checkbox
                                                checked={isSelected}
                                                disabled={isDisabled}
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
                                    );
                                }) || []}
                                {errors.bonus_categories && (
                                    <p className="text-sm text-red-500 mt-2">{errors.bonus_categories}</p>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button 
                        type="submit" 
                        size="lg"
                        className="min-w-[140px] bg-[rgb(46_131_242_/1)] text-white transition-colors hover:bg-[rgb(46_131_242/_1)]/90"
                    >
                        Siguiente
                    </Button>
                </div>
            </form>
        </div>
    );
}