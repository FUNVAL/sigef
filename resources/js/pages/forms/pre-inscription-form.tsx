import { CourseSelectionStep } from '@/components/pre-registration/steps/CourseSelectionStep';
import { DisclaimerStep } from '@/components/pre-registration/steps/DisclaimerStep';
import { FemaleFilterStep } from '@/components/pre-registration/steps/FemaleFilterStep';
import { MessageStep } from '@/components/pre-registration/steps/MessageStep';
import { PreInscriptionOverviewStep } from '@/components/pre-registration/steps/pre-inscription-overview-step';
import { PreRegistrationFormStep } from '@/components/pre-registration/steps/PreRegistrationFormStep';
import { Country } from '@/types/country';
import { Course } from '@/types/course';
import { Stepper, Translation } from '@/types/global';
import { PreRegistrationFormData } from '@/types/pre-inscription';
import { Stake } from '@/types/stake';
import { useForm, usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import StepperProvider from './stepper-provider';

type PreInscriptionFormProps = {
    countries: Country[];
    stakes: Stake[];
    courses: Course[];
};

const PreInscriptionForm = ({ countries, courses }: PreInscriptionFormProps) => {
    const request = useForm<PreRegistrationFormData>(initialData);
    const { stepper } = usePage<Translation>().props;

    const stepStructure = useMemo(() => {
        const steps: Array<{
            title: string;
            type: 'disclaimer' | 'form' | 'femaleFilter' | 'courses' | 'message' | 'resumen';
            show: boolean;
        }> = [
            { title: stepper.conditions, type: 'disclaimer', show: true },
            { title: stepper.form, type: 'form', show: true },
            { title: stepper.requirements, type: 'femaleFilter', show: Number(request.data.gender) === 2 },
            { title: stepper.courses, type: 'courses', show: true },
            { title: stepper.overview, type: 'resumen', show: true },
            { title: stepper.confirmation, type: 'message', show: true },
        ];

        // Filter out steps that shouldn't be shown
        return steps.filter((step) => step.show);
    }, [request.data.gender, stepper]);

    // Create the actual Stepper components with current props when rendering
    const steps: Stepper[] = stepStructure.map((step) => {
        let component;

        switch (step.type) {
            case 'disclaimer':
                component = <DisclaimerStep />;
                break;
            case 'form':
                component = <PreRegistrationFormStep countries={countries} request={request} />;
                break;
            case 'femaleFilter':
                component = <FemaleFilterStep request={request} />;
                break;
            case 'courses':
                component = <CourseSelectionStep courses={courses} request={request} />;
                break;
            case 'message':
                component = <MessageStep />;
                break;
            case 'resumen':
                component = <PreInscriptionOverviewStep countries={countries} request={request} />;
                break;
        }

        return {
            title: step.title,
            component,
        };
    });

    return <StepperProvider steps={steps} />;
};

export default PreInscriptionForm;

const initialData: PreRegistrationFormData = {
    first_name: '',
    middle_name: '',
    last_name: '',
    second_last_name: '',
    gender: 0,
    age: 0,
    phone: '',
    additional_phone: '',
    email: '',
    marital_status: 0,
    served_mission: 0,
    country_id: 0,
    stake_id: 0,
    course_id: 0,

    currently_working: null,
    job_type_preference: null,
    available_full_time: null,
};
