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
import { RecruitmentRequest, HouseholdMember, HouseholdExpense, JobOffer, WorkExperience } from '@/types/recruitment';
import { Plus, Trash2, Users, DollarSign, Wifi, Monitor, Home, Briefcase, Activity, Building, CheckCircle } from 'lucide-react';
import React, { useContext, useState, useEffect } from 'react';
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
    const [selectedPracticeBonusCategories, setSelectedPracticeBonusCategories] = useState<number[]>([]);
    const [practiceBonusAmounts, setPracticeBonusAmounts] = useState<Record<number, number>>({});
    const [monthlyExpenses, setMonthlyExpenses] = useState<HouseholdExpense[]>([]);
    const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
    const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);

    // Función para calcular la experiencia laboral
    const calculateWorkExperience = (startDate: string, endDate?: string) => {
        if (!startDate) return '';

        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date();

        // Calcular la diferencia en meses
        const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

        if (monthsDiff < 1) {
            const daysDiff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
            return `${daysDiff} días`;
        } else if (monthsDiff < 12) {
            return `${monthsDiff} ${monthsDiff === 1 ? 'mes' : 'meses'}`;
        } else {
            const years = Math.floor(monthsDiff / 12);
            const remainingMonths = monthsDiff % 12;
            if (remainingMonths === 0) {
                return `${years} ${years === 1 ? 'año' : 'años'}`;
            } else {
                return `${years} ${years === 1 ? 'año' : 'años'} y ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
            }
        }
    };

    // Función para calcular el tiempo total combinado de todas las experiencias
    const calculateTotalExperience = (experiences: WorkExperience[]) => {
        let totalMonths = 0;

        experiences.forEach(exp => {
            if (exp.start_date) {
                const start = new Date(exp.start_date);
                const end = exp.end_date ? new Date(exp.end_date) : new Date();
                const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
                if (monthsDiff > 0) {
                    totalMonths += monthsDiff;
                }
            }
        });

        if (totalMonths === 0) return 'Sin experiencia registrada';

        if (totalMonths < 12) {
            return `${totalMonths} ${totalMonths === 1 ? 'mes' : 'meses'} total`;
        } else {
            const years = Math.floor(totalMonths / 12);
            const remainingMonths = totalMonths % 12;
            if (remainingMonths === 0) {
                return `${years} ${years === 1 ? 'año' : 'años'} total`;
            } else {
                return `${years} ${years === 1 ? 'año' : 'años'} y ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'} total`;
            }
        }
    };

    // Funciones para manejar experiencias laborales
    const addWorkExperience = () => {
        const newExperience: WorkExperience = {
            job_position: 0,
            start_date: '',
            end_date: ''
        };
        setWorkExperiences([...workExperiences, newExperience]);
    };

    const removeWorkExperience = (index: number) => {
        const updatedExperiences = workExperiences.filter((_, i) => i !== index);
        setWorkExperiences(updatedExperiences);
    };

    const updateWorkExperience = (index: number, field: keyof WorkExperience, value: any) => {
        const updatedExperiences = [...workExperiences];
        updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
        setWorkExperiences(updatedExperiences);
    };

    // Sincronizar monthlyExpenses con data.monthly_expenses
    useEffect(() => {
        if (data.monthly_expenses && data.monthly_expenses.length > 0) {
            setMonthlyExpenses(data.monthly_expenses);
        }
    }, []);

    useEffect(() => {
        setData('monthly_expenses', monthlyExpenses);
    }, [monthlyExpenses]);

    // Sincronizar jobOffers con data.job_offers
    useEffect(() => {
        if (data.job_offers && data.job_offers.length > 0) {
            setJobOffers(data.job_offers);
        } else {
            // Inicializar con 2 ofertas vacías por defecto
            const defaultOffers: JobOffer[] = [
                { company_name: '', salary_expectation: 0 },
                { company_name: '', salary_expectation: 0 }
            ];
            setJobOffers(defaultOffers);
            setData('job_offers', defaultOffers);
        }
    }, []);

    useEffect(() => {
        setData('job_offers', jobOffers);
    }, [jobOffers]);

    // Sincronizar workExperiences con data.work_experiences
    useEffect(() => {
        if (data.has_work_experience === true) {
            if (data.work_experiences && data.work_experiences.length > 0) {
                setWorkExperiences(data.work_experiences);
            } else {
                // Inicializar con una experiencia vacía por defecto si has_work_experience es true
                const defaultExperience: WorkExperience = {
                    job_position: 0,
                    start_date: '',
                    end_date: ''
                };
                setWorkExperiences([defaultExperience]);
                setData('work_experiences', [defaultExperience]);
            }
        } else if (data.has_work_experience === false) {
            // Limpiar experiencias cuando selecciona "No"
            setWorkExperiences([]);
            setData('work_experiences', []);
        }
    }, [data.has_work_experience]);

    useEffect(() => {
        setData('work_experiences', workExperiences);
    }, [workExperiences]);

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
            type: 0,
            amount: 0
        };
        const updatedExpenses = [...monthlyExpenses, newExpense];
        setMonthlyExpenses(updatedExpenses);
        setData('monthly_expenses', updatedExpenses);
    };

    const removeMonthlyExpense = (index: number) => {
        const updatedExpenses = monthlyExpenses.filter((_, i) => i !== index);
        setMonthlyExpenses(updatedExpenses);
        setData('monthly_expenses', updatedExpenses);
    };

    const updateMonthlyExpense = (index: number, field: keyof HouseholdExpense, value: any) => {
        const updatedExpenses = [...monthlyExpenses];
        updatedExpenses[index] = {
            ...updatedExpenses[index],
            [field]: field === 'amount' ? parseFloat(value) || 0 : value
        };
        setMonthlyExpenses(updatedExpenses);
        setData('monthly_expenses', updatedExpenses);
    };

    // Job offers functions
    const addJobOffer = () => {
        const newOffer: JobOffer = {
            company_name: '',
            salary_expectation: 0
        };
        const updatedOffers = [...jobOffers, newOffer];
        setJobOffers(updatedOffers);
        setData('job_offers', updatedOffers);
    };

    const removeJobOffer = (index: number) => {
        const updatedOffers = jobOffers.filter((_, i) => i !== index);
        setJobOffers(updatedOffers);
        setData('job_offers', updatedOffers);
    };

    const updateJobOffer = (index: number, field: keyof JobOffer, value: any) => {
        const updatedOffers = [...jobOffers];
        updatedOffers[index] = {
            ...updatedOffers[index],
            [field]: field === 'salary_expectation' ? parseFloat(value) || 0 : value
        };
        setJobOffers(updatedOffers);
        setData('job_offers', updatedOffers);
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

            if (categoryId === 1) { // FAMILY

                updatedCategories = updatedCategories.filter(id => id !== 2);
                delete updatedAmounts[2];
            } else if (categoryId === 2) { // SINGLE

                updatedCategories = updatedCategories.filter(id => id !== 1);
                delete updatedAmounts[1];
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

    const handlePracticeBonusCategoryChange = (categoryId: number, checked: boolean) => {
        let updatedCategories = [...selectedPracticeBonusCategories];
        let updatedAmounts = { ...practiceBonusAmounts };

        if (checked) {
            // Validar que no se seleccionen más de 2 bonos
            if (updatedCategories.length >= 2) {
                // Mostrar mensaje de error o simplemente no permitir más selecciones
                return;
            }

            // Lógica de exclusión mutua para bonos de prácticas
            if (categoryId === 2) {

                updatedCategories = updatedCategories.filter(id => id !== 1 && id !== 3);
                delete updatedAmounts[1];
                delete updatedAmounts[3];
            } else if (categoryId === 3) {

                updatedCategories = updatedCategories.filter(id => id !== 2);
                delete updatedAmounts[2];
            } else if (categoryId === 1) {

                updatedCategories = updatedCategories.filter(id => id !== 2);
                delete updatedAmounts[2];
            }

            updatedCategories.push(categoryId);
        } else {
            updatedCategories = updatedCategories.filter(id => id !== categoryId);
            delete updatedAmounts[categoryId];
        }

        setSelectedPracticeBonusCategories(updatedCategories);
        setPracticeBonusAmounts(updatedAmounts);
        setData('practice_bonus_categories', updatedCategories);
        setData('practice_bonus_amounts', Object.values(updatedAmounts));
    };

    const handlePracticeBonusAmountChange = (categoryId: number, amount: number) => {
        const updatedAmounts = { ...practiceBonusAmounts, [categoryId]: amount };
        setPracticeBonusAmounts(updatedAmounts);
        setData('practice_bonus_amounts', Object.values(updatedAmounts));
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
            if (!member.relationship || member.relationship === 0) {
                validationErrors[`household_member_${index}_relationship`] = 'La relación es requerida';
            }
            if (member.phone && member.phone.length < 3) {
                validationErrors[`household_member_${index}_phone`] = 'El teléfono debe tener al menos 3 dígitos';
            }
        });

        // Note: Removed monthly income validation as we're now tracking expenses instead

        if (!data.device_type || data.device_type === 0) {
            validationErrors.device_type = 'El tipo de dispositivo es requerido';
        }

        if (!data.housing_type || data.housing_type === 0) {
            validationErrors.housing_type = 'El tipo de vivienda es requerido';
        }

        if (data.has_employment && (!data.employment_type || data.employment_type === 0)) {
            validationErrors.employment_type = 'El tipo de empleo es requerido';
        }

        if (data.has_employment && data.employment_type === 2) { // COMPANY_EMPLOYEE
            if (!data.company_name?.trim()) {
                validationErrors.company_name = 'El nombre de la empresa es requerido';
            }
            if (!data.job_position || data.job_position === 0) {
                validationErrors.job_position = 'El puesto es requerido';
            }
            if (!data.work_schedule || data.work_schedule === 0) {
                validationErrors.work_schedule = 'El tipo de jornada es requerido';
            }
            if (!data.employment_income || data.employment_income <= 0) {
                validationErrors.employment_income = 'El salario es requerido';
            }
            if (!data.employment_start_date?.trim()) {
                validationErrors.employment_start_date = 'La fecha de inicio en la empresa es requerida';
            }
        }

        // Validar bonos (máximo 2)
        if (data.needs_bonus && selectedBonusCategories.length > 2) {
            validationErrors.bonus_categories = 'Solo se pueden seleccionar máximo 2 categorías de bono';
        }

        // Validar bonos de prácticas (máximo 2)
        if (data.needs_practice_bonus && selectedPracticeBonusCategories.length > 2) {
            validationErrors.practice_bonus_categories = 'Solo se pueden seleccionar máximo 2 categorías de bono para prácticas';
        }

        // Validar experiencia laboral
        if (data.has_work_experience === undefined || data.has_work_experience === null) {
            validationErrors.has_work_experience = 'Debe seleccionar si cuenta con experiencia laboral';
        } else if (data.has_work_experience === true) {
            if (workExperiences.length === 0) {
                validationErrors.work_experiences = 'Debe agregar al menos una experiencia laboral';
            } else {
                workExperiences.forEach((exp, index) => {
                    if (!exp.job_position || exp.job_position === 0) {
                        validationErrors[`work_experience_${index}_job_position`] = 'El puesto es requerido';
                    }
                });
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
        <div className="mx-auto max-w-4xl space-y-4 p-3 sm:space-y-6 sm:p-4">
            <StepsHeader
                title="Información Socioeconómica"
                subtitle="Proporcione información sobre su situación económica y familiar"
            />

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

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
                            <div key={index} className="p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`household_members[${index}][name]`} className="text-sm font-medium">
                                            Nombre
                                        </Label>
                                        <Input
                                            id={`household_members[${index}][name]`}
                                            name={`household_members[${index}][name]`}
                                            value={member.name}
                                            onChange={(e) => updateHouseholdMember(index, 'name', e.target.value)}
                                            placeholder="Nombre completo"
                                            className={`h-10 ${errors[`household_member_${index}_name`] ? 'border-red-500' : ''}`}
                                        />
                                        {errors[`household_member_${index}_name`] && (
                                            <p className="text-xs text-red-500 mt-1">{errors[`household_member_${index}_name`]}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor={`household_members[${index}][phone]`}>Teléfono</Label>
                                        {countries && countries.length > 0 ? (
                                            <PhoneInput
                                                id={`household_members[${index}][phone]`}
                                                name={`household_members[${index}][phone]`}
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
                                                id={`household_members[${index}][phone]`}
                                                name={`household_members[${index}][phone]`}
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
                                        <Label htmlFor={`household_members[${index}][relationship]`}>Relación</Label>
                                        <Select
                                            name={`household_members[${index}][relationship]`}
                                            value={member.relationship && member.relationship > 0 ? member.relationship.toString() : ''}
                                            onValueChange={(value: string) => updateHouseholdMember(index, 'relationship', parseInt(value))}

                                        >
                                            <SelectTrigger className={errors[`household_member_${index}_relationship`] ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="--- Seleccione una relación ---" />
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
                                        <Label htmlFor={`household_members[${index}][age]`}>Edad</Label>
                                        <Input
                                            id={`household_members[${index}][age]`}
                                            name={`household_members[${index}][age]`}
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
                                        <Label htmlFor={`household_members[${index}][income_contribution]`}>Ingresos que aporta (USD)</Label>
                                        <Input
                                            id={`household_members[${index}][income_contribution]`}
                                            name={`household_members[${index}][income_contribution]`}
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
                            <div key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-3 border rounded-lg">
                                <div className="flex-1">
                                    <Select
                                        name={`monthly_expenses[${index}][type]`}
                                        value={expense.type && expense.type > 0 ? expense.type.toString() : ''}
                                        onValueChange={(value) => updateMonthlyExpense(index, 'type', parseInt(value))}
                                    >
                                        <SelectTrigger className="h-10">
                                            <SelectValue placeholder="--- Seleccione un tipo de gasto ---" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {enums.expenseType?.map((item) => (
                                                <SelectItem key={item.id} value={item.id.toString()}>
                                                    {item.name}
                                                </SelectItem>
                                            )) || []}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex gap-2">
                                    <Input
                                        name={`monthly_expenses[${index}][amount]`}
                                        type="number"
                                        placeholder="Monto USD"
                                        value={expense.amount || ''}
                                        onChange={(e) => updateMonthlyExpense(index, 'amount', e.target.value)}
                                        min="0"
                                        step="0.01"
                                        className="flex-1 sm:w-32 h-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeMonthlyExpense(index)}
                                        className="text-red-600 hover:text-red-700 px-3"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
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
                                    onChange={() => {
                                        setData('has_residential_internet', true);
                                        // Limpiar la pregunta de seguimiento si cambia a "Sí"
                                        if (data.internet_access_plan) {
                                            setData('internet_access_plan', undefined);
                                        }
                                    }}
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

                {/* Pregunta de seguimiento para internet */}
                {data.has_residential_internet === false && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-[rgb(46_131_242_/_1)]">
                                <Wifi className="h-5 w-5" />
                                Entendemos que el acceso a internet es importante. ¿Tiene algún plan o idea sobre cómo podría resolver esta situación?
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {enums.internetAccessPlan?.map((option) => (
                                    <label key={option.id} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="internet_access_plan"
                                            checked={data.internet_access_plan === option.id}
                                            onChange={() => setData('internet_access_plan', option.id)}
                                        />
                                        {option.name}
                                    </label>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

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
                            name="device_type"
                            value={data.device_type && data.device_type > 0 ? data.device_type.toString() : ''}
                            onValueChange={(value: string) => setData('device_type', parseInt(value))}
                        >
                            <SelectTrigger className={errors.device_type ? 'border-red-500' : ''}>
                                <SelectValue placeholder="--- Seleccione un dispositivo ---" />
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
                            name="housing_type"
                            value={data.housing_type && data.housing_type > 0 ? data.housing_type.toString() : ''}
                            onValueChange={(value: string) => setData('housing_type', parseInt(value))}
                        >
                            <SelectTrigger className={errors.housing_type ? 'border-red-500' : ''}>
                                <SelectValue placeholder="--- Seleccione tipo de vivienda ---" />
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
                                        name="employment_type"
                                        value={data.employment_type && data.employment_type > 0 ? data.employment_type?.toString() : ''}
                                        onValueChange={(value: string) => setData('employment_type', parseInt(value))}
                                    >
                                        <SelectTrigger className={errors.employment_type ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="--- Seleccione un tipo de empleo ---" />
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
                                                name="employment[company_name]"
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
                                                name="job_position"
                                                value={data.job_position && data.job_position > 0 ? data.job_position?.toString() : ''}
                                                onValueChange={(value: string) => setData('job_position', parseInt(value))}
                                            >
                                                <SelectTrigger className={errors.job_position ? 'border-red-500' : ''}>
                                                    <SelectValue placeholder="--- Seleccione un puesto ---" />
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
                                            <Label>Tipo de jornada</Label>
                                            <Select
                                                name="work_schedule"
                                                value={data.work_schedule && data.work_schedule > 0 ? data.work_schedule?.toString() : ''}
                                                onValueChange={(value: string) => setData('work_schedule', parseInt(value))}
                                            >
                                                <SelectTrigger className={errors.work_schedule ? 'border-red-500' : ''}>
                                                    <SelectValue placeholder="--- Seleccione un tipo de jornada ---" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {enums.workSchedule?.map((item) => (
                                                        <SelectItem key={item.id} value={item.id.toString()}>
                                                            {item.name}
                                                        </SelectItem>
                                                    )) || []}
                                                </SelectContent>
                                            </Select>
                                            {errors.work_schedule && (
                                                <p className="text-sm text-red-500 mt-1">{errors.work_schedule}</p>
                                            )}
                                        </div>
                                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>

                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium">Salario (USD)</Label>
                                                <Input
                                                    name="employment[income]"
                                                    type="number"
                                                    value={data.employment_income || ''}
                                                    onChange={(e) => setData('employment_income', parseFloat(e.target.value) || 0)}
                                                    placeholder="0.00"
                                                    min="0"
                                                    step="0.01"
                                                    className={`h-10 ${errors.employment_income ? 'border-red-500' : ''}`}
                                                />
                                                {errors.employment_income && (
                                                    <p className="text-xs text-red-500 mt-1">{errors.employment_income}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium">Fecha de inicio en la empresa</Label>
                                                <Input
                                                    name="employment[start_date]"
                                                    type="date"
                                                    value={data.employment_start_date || ''}
                                                    onChange={(e) => setData('employment_start_date', e.target.value)}
                                                    className={`h-10 ${errors.employment_start_date ? 'border-red-500' : ''}`}
                                                />
                                                {errors.employment_start_date && (
                                                    <p className="text-xs text-red-500 mt-1">{errors.employment_start_date}</p>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
                {/* Cuentas con alguna experiencia laboral */}

                <Card>
                    <CardHeader>
                        
                        <CardTitle className="flex items-center gap-2 text-[rgb(46_131_242_/_1)]">
                            <Briefcase className="h-5 w-5" />
                            ¿Cuenta con alguna experiencia laboral?
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="has_work_experience"
                                    checked={data.has_work_experience === true}
                                    onChange={() => setData('has_work_experience', true)}
                                />
                                Sí
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="has_work_experience"
                                    checked={data.has_work_experience === false}
                                    onChange={() => setData('has_work_experience', false)}
                                />
                                No
                            </label>
                        </div>

                        {errors.has_work_experience && (
                            <p className="text-sm text-red-500">{errors.has_work_experience}</p>
                        )}

                        {data.has_work_experience && (
                            <div className="space-y-6">
                                {/* Botón para agregar experiencia */}
                                <div className="flex justify-between items-center">
                                    <h4 className="text-sm font-medium text-gray-700">Experiencias laborales</h4>
                                    <Button
                                        type="button"
                                        onClick={addWorkExperience}
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Agregar experiencia
                                    </Button>
                                </div>

                                {errors.work_experiences && (
                                    <p className="text-sm text-red-500">{errors.work_experiences}</p>
                                )}

                                {/* Lista de experiencias */}
                                <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                        {workExperiences.map((experience, index) => (
                                            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                {/* Selector de experiencia */}
                                                <div className="flex-1 w-full sm:w-auto">
                                                    <Select
                                                        name={`work_experiences[${index}][job_position]`}
                                                        value={experience.job_position > 0 ? experience.job_position.toString() : ''}
                                                        onValueChange={(value: string) => updateWorkExperience(index, 'job_position', parseInt(value))}
                                                    >
                                                        <SelectTrigger className={`h-10 ${errors[`work_experience_${index}_job_position`] ? 'border-red-500' : ''}`}>
                                                            <SelectValue placeholder="-- Seleccione un puesto --" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {enums.jobPosition?.map((item) => (
                                                                <SelectItem key={item.id} value={item.id.toString()}>
                                                                    {item.name}
                                                                </SelectItem>
                                                            )) || []}
                                                        </SelectContent>
                                                    </Select>
                                                    {errors[`work_experience_${index}_job_position`] && (
                                                        <p className="text-xs text-red-500 mt-1">{errors[`work_experience_${index}_job_position`]}</p>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between w-full sm:w-auto gap-2">
                                                    {/* Icono de experiencia */}
                                                    {experience.job_position > 0 && (
                                                        <div className="flex items-center gap-2 text-green-600">

                                                            <CheckCircle className="h-4 w-4" />

                                                        </div>
                                                    )}

                                                    {/* Botón eliminar */}
                                                    {workExperiences.length > 1 && (
                                                        <Button
                                                            type="button"
                                                            onClick={() => removeWorkExperience(index)}
                                                            variant="outline"
                                                            size="sm"
                                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 px-2"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Mensaje cuando no hay experiencias */}
                                        {workExperiences.length === 0 && (
                                            <div className="text-center py-4 text-gray-500">
                                                <Briefcase className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                                                <p className="text-sm">No hay experiencias agregadas</p>
                                                <p className="text-xs">Haga clic en "Agregar experiencia" para comenzar</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Resumen de experiencias */}
                                {workExperiences.length > 0 && workExperiences.some(exp => exp.job_position > 0) && (
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-lg font-semibold text-blue-800">
                                                    Experiencias laborales registradas
                                                </h4>
                                                <p className="text-blue-700 font-medium mt-1">
                                                    {workExperiences.filter(exp => exp.job_position > 0).length} experiencia{workExperiences.filter(exp => exp.job_position > 0).length !== 1 ? 's' : ''} seleccionada{workExperiences.filter(exp => exp.job_position > 0).length !== 1 ? 's' : ''}
                                                </p>
                                                <p className="text-xs text-blue-600 mt-2">
                                                    Puestos y habilidades laborales que posee
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="bg-blue-100 p-3 rounded-full">
                                                    <Briefcase className="h-8 w-8 text-blue-600" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Bono */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-[rgb(46_131_242_/_1)] flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        ¿Necesita bono durante el tiempo de clases online?</CardTitle>
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
                                {enums.bonusCategory?.map((item) => {
                                    const isSelected = selectedBonusCategories.includes(item.id);

                                    // Lógica de deshabilitación
                                    let isDisabled = false;
                                    if (!isSelected) {
                                        // Deshabilitar si ya se alcanzó el máximo (2)
                                        if (selectedBonusCategories.length >= 2) {
                                            isDisabled = true;
                                        }
                                        // Exclusión mutua: Familiar (1) y Soltero (2)
                                        else if (item.id === 1 && selectedBonusCategories.includes(2)) { // Familiar deshabilitado si Soltero está seleccionado
                                            isDisabled = true;
                                        }
                                        else if (item.id === 2 && selectedBonusCategories.includes(1)) { // Soltero deshabilitado si Familiar está seleccionado
                                            isDisabled = true;
                                        }
                                    }

                                    return (
                                        <div key={item.id} className={`flex items-center gap-4 p-4 border rounded-lg ${isDisabled ? 'opacity-50 bg-gray-50' : ''
                                            }`}>
                                            <Checkbox
                                                checked={isSelected}
                                                disabled={isDisabled}
                                                onCheckedChange={(checked) => handleBonusCategoryChange(item.id, checked as boolean)}
                                            />
                                            <span className="flex-1">{item.name}</span>
                                            {selectedBonusCategories.includes(item.id) && (
                                                <Input
                                                    name={`bonus_amounts[${item.id}]`}
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

                                {/* Total de bonos durante clases */}
                                {selectedBonusCategories.length > 0 && (
                                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-green-800">Total de bonos durante clases:</span>
                                            <span className="text-lg font-bold text-green-900">
                                                ${Object.values(bonusAmounts).reduce((total, amount) => total + (amount || 0), 0).toFixed(2)} USD
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {errors.bonus_categories && (
                                    <p className="text-sm text-red-500 mt-2">{errors.bonus_categories}</p>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Bono durante prácticas o bootcamps */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-[rgb(46_131_242_/_1)] flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        ¿Necesita bono durante prácticas o bootcamp?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="needs_practice_bonus"
                                    checked={data.needs_practice_bonus === true}
                                    onChange={() => setData('needs_practice_bonus', true)}
                                />
                                Sí
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="needs_practice_bonus"
                                    checked={data.needs_practice_bonus === false}
                                    onChange={() => {
                                        setData('needs_practice_bonus', false);
                                        setSelectedPracticeBonusCategories([]);
                                        setPracticeBonusAmounts({});
                                        setData('practice_bonus_categories', []);
                                        setData('practice_bonus_amounts', []);
                                    }}
                                />
                                No
                            </label>
                        </div>

                        {data.needs_practice_bonus && (
                            <div className="space-y-4">
                                {enums.practiceBonusCategory?.map((item) => {
                                    const isSelected = selectedPracticeBonusCategories.includes(item.id);

                                    let isDisabled = false;
                                    if (!isSelected) {
                                        if (selectedPracticeBonusCategories.length >= 2) {
                                            isDisabled = true;
                                        }
                                        // Reglas de exclusión mutua
                                        else if (item.id === 1 && selectedPracticeBonusCategories.includes(2)) {
                                            isDisabled = true;
                                        }
                                        else if (item.id === 2 && (selectedPracticeBonusCategories.includes(1) || selectedPracticeBonusCategories.includes(3))) {
                                            isDisabled = true;
                                        }
                                        else if (item.id === 3 && selectedPracticeBonusCategories.includes(2)) {
                                            isDisabled = true;
                                        }
                                    }

                                    return (
                                        <div key={item.id} className={`flex items-center gap-4 p-4 border rounded-lg ${isDisabled ? 'opacity-50 bg-gray-50' : ''
                                            }`}>
                                            <Checkbox
                                                checked={isSelected}
                                                disabled={isDisabled}
                                                onCheckedChange={(checked) => handlePracticeBonusCategoryChange(item.id, checked as boolean)}
                                            />
                                            <span className="flex-1">{item.name}</span>
                                            {selectedPracticeBonusCategories.includes(item.id) && (
                                                <Input
                                                    name={`practice_bonus_amounts[${item.id}]`}
                                                    type="number"
                                                    placeholder="Monto USD"
                                                    min="0"
                                                    step="0.01"
                                                    className="w-32"
                                                    value={practiceBonusAmounts[item.id] || ''}
                                                    onChange={(e) => handlePracticeBonusAmountChange(item.id, parseFloat(e.target.value) || 0)}
                                                />
                                            )}
                                        </div>
                                    );
                                }) || []}

                                {/* Total de bonos durante prácticas */}
                                {selectedPracticeBonusCategories.length > 0 && (
                                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-green-800">Total de bonos durante prácticas:</span>
                                            <span className="text-lg font-bold text-green-900">
                                                ${Object.values(practiceBonusAmounts).reduce((total, amount) => total + (amount || 0), 0).toFixed(2)} USD
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {errors.practice_bonus_categories && (
                                    <p className="text-sm text-red-500 mt-2">{errors.practice_bonus_categories}</p>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Ofertas laborales para el estudiante */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-[rgb(46_131_242_/_1)]">
                            <Building className="h-5 w-5" />
                            Ofertas laborales para el estudiante
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Empresas de interés</Label>

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addJobOffer}
                            >
                                <Plus className="h-4 w-4 mr-1" />
                                Agregar empresa
                            </Button>
                        </div>

                        {jobOffers.map((offer, index) => (
                            <div key={index} className="p-4 border rounded-lg space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor={`job_offers[${index}][company_name]`}>Nombre de la empresa</Label>
                                        <Input
                                            id={`job_offers[${index}][company_name]`}
                                            name={`job_offers[${index}][company_name]`}
                                            value={offer.company_name}
                                            onChange={(e) => updateJobOffer(index, 'company_name', e.target.value)}
                                            placeholder="Ingrese el nombre de la empresa"
                                            className={errors[`job_offer_${index}_company_name`] ? 'border-red-500' : ''}
                                        />
                                        {errors[`job_offer_${index}_company_name`] && (
                                            <p className="text-sm text-red-500 mt-1">{errors[`job_offer_${index}_company_name`]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor={`job_offers[${index}][salary_expectation]`}>Salario promedio(USD)</Label>
                                        <Input
                                            id={`job_offers[${index}][salary_expectation]`}
                                            name={`job_offers[${index}][salary_expectation]`}
                                            type="number"
                                            value={offer.salary_expectation || ''}
                                            onChange={(e) => updateJobOffer(index, 'salary_expectation', e.target.value)}
                                            placeholder="Ingrese el promedio salarial"
                                            min="0"
                                            step="0.01"
                                            className={errors[`job_offer_${index}_salary_expectation`] ? 'border-red-500' : ''}
                                        />
                                        {errors[`job_offer_${index}_salary_expectation`] && (
                                            <p className="text-sm text-red-500 mt-1">{errors[`job_offer_${index}_salary_expectation`]}</p>
                                        )}
                                    </div>
                                </div>

                                {jobOffers.length > 2 && (
                                    <div className="flex justify-end">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeJobOffer(index)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4 mr-1" />
                                            Eliminar empresa
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}

                        {jobOffers.length === 0 && (
                            <p className="text-sm text-gray-500 text-center py-4">
                                No se han agregado empresas. Haga clic en "Agregar empresa" para comenzar.
                            </p>
                        )}
                    </CardContent>
                </Card>

                <div className="flex justify-center sm:justify-end">
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full sm:w-auto sm:min-w-[140px] bg-[rgb(46_131_242_/1)] text-white transition-colors hover:bg-[rgb(46_131_242/_1)]/90"
                    >
                        Siguiente
                    </Button>
                </div>
            </form>
        </div>
    );
}