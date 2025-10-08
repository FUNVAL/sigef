import { SocioEconomicStep } from '@/components/recruitment-form/steps/SocioEconomicStep';
import { AgreementStep } from '@/components/recruitment-form/steps/AgreementStep';
import { AdditionalInformationStep } from '@/components/recruitment-form/steps/AdditionalInformationStep';
import { RecruitmentOverviewStep } from '@/components/recruitment-form/steps/RecruitmentOverviewStep';
import { Enums, Stepper,  } from '@/types/global';
import { RecruitmentFormData } from '@/types/recruitment';
import { Country } from '@/types/country';
import { Head, useForm,  } from '@inertiajs/react';
import StepperProvider from '../stepper-provider';

interface RecruitmentFormProps {
    enums: Enums;
    countries?: Country[];
}

const RecruitmentForm = ({ enums, countries = [] }: RecruitmentFormProps) => {

    // Add defensive check
    if (!enums) {
        return (
            <div className="mx-auto max-w-4xl space-y-6 p-4">
                <div className="text-center">
                    <p>Cargando datos del formulario...</p>
                </div>
            </div>
        );
    }

    // Initialize form with default values
    const { data, setData, post, processing, errors } = useForm<RecruitmentFormData & Record<string, any>>({
        // Socio-económico
        household_members: [],
        monthly_income: 0,
        monthly_expenses: [],
        has_residential_internet: false,
        device_type: 0,
        housing_type: 0,
        has_employment: false,
        employment_type: 0,
        company_name: '',
        job_position: 0,
        employment_income: 0,
        needs_bonus: false,
        bonus_categories: [],
        bonus_amounts: [],
        needs_practice_bonus: false,
        practice_bonus_categories: [],
        practice_bonus_amounts: [],

        // Salud
        has_health_insurance: false,
        has_illness: false,
        health_declaration_accepted: false,

        // Información adicional
        start_month: new Date().getMonth() + 1,
        start_year: new Date().getFullYear(),
        interview_photo: undefined,

        // Acuerdos
        mutual_understanding_accepted: false,
        work_commitment_accepted: false,
        data_authorization_accepted: false,
        scholarship_agreement_accepted: false,
        religious_institute_accepted: false,
        health_agreement_accepted: false,
    });

    const request = {
        data,
        setData,
        post,
        processing,
        errors: errors as Record<string, string>,
    };

    const handleSubmit = () => {
        console.log('Enviando datos del formulario:', data);
        post(route('recruitment.store'), {
            onSuccess: () => {
                // La página se redirigirá automáticamente al paso de confirmación
            },
            onError: (errors) => {
                console.log('Errores en el formulario:', errors);
            },
        });
    };

    const steps: Stepper[] = [
        {
            title: 'Información Socioeconómica',
            component: <SocioEconomicStep request={request} enums={enums} countries={countries} />,
        },
        {
            title: 'Acuerdos y Compromisos',
            component: <AgreementStep request={request} />,
        },
        {
            title: 'Información Adicional',
            component: <AdditionalInformationStep request={request} />,
        },
        {
            title: 'Confirmación',
            component: (
                <RecruitmentOverviewStep
                    data={data}
                    enums={enums}
                    onSubmit={handleSubmit}
                    processing={processing}
                />
            ),
        },
    ];

    return (
        <>
            <Head title="Formulario de Reclutamiento - FUNVAL" />
            <StepperProvider steps={steps} />
        </>
    );
};

export default RecruitmentForm;