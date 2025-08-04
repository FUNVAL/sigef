import { Country } from '@/types/country';
import { Course } from '@/types/course';
import { Stake } from '@/types/stake';
import StepperProvider from './stepper-provider';
import { useForm } from '@inertiajs/react';
import { DisclaimerStep } from '@/components/pre-registration/steps/DisclaimerStep';
import { PreRegistrationFormStep } from '@/components/pre-registration/steps/PreRegistrationFormStep';
import { MessageStep } from '@/components/pre-registration/steps/MessageStep';
import { Stepper } from '@/types/global';
import { PreRegistrationFormData } from '@/types/pre-inscription';
import { CourseSelectionStep } from '@/components/pre-registration/steps/CourseSelectionStep';
import { useMemo } from 'react';
import { FemaleFilterStep } from '@/components/pre-registration/steps/FemaleFilterStep';
import { PreInscriptionOverviewStep } from '@/components/pre-registration/steps/pre-inscription-overview-step';

type PreInscriptionFormProps = {
    countries: Country[];
    stakes: Stake[];
    courses: Course[];
}

const PreInscriptionForm = ({ countries, courses }: PreInscriptionFormProps) => {
    const request = useForm<PreRegistrationFormData>(initialData);

    const stepStructure = useMemo(() => {
        const steps: Array<{
            title: string;
            type: 'disclaimer' | 'form' | 'femaleFilter' | 'courses' | 'message' | 'resumen';
            show: boolean;
        }> = [
                { title: 'Información Personal', type: 'disclaimer', show: true },
                { title: 'Formulario', type: 'form', show: true },
                { title: 'Evaluación', type: 'femaleFilter', show: Number(request.data.gender) === 2 },
                { title: 'Cursos', type: 'courses', show: true },
                { title: 'Resumen', type: 'resumen', show: true },
                { title: 'Confirmación', type: 'message', show: true }
            ];

        // Filter out steps that shouldn't be shown
        return steps.filter(step => step.show);
    }, [request.data.gender]);

    // Create the actual Stepper components with current props when rendering
    const steps: Stepper[] = stepStructure.map(step => {
        let component;

        switch (step.type) {
            case 'disclaimer':
                component = <DisclaimerStep />;
                break;
            case 'form':
                component = <PreRegistrationFormStep
                    countries={countries}
                    request={request}
                />;
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
                component = <PreInscriptionOverviewStep
                    countries={countries}
                    request={request}
                />;
                break;
        }

        return {
            title: step.title,
            component
        };
    });

    return (
        <StepperProvider steps={steps} />
    );
}

export default PreInscriptionForm;

const initialData: PreRegistrationFormData = {
    first_name: '',
    middle_name: '',
    last_name: '',
    second_last_name: '',
    gender: 0,
    age: 0,
    phone: '',
    email: '',
    marital_status: 0,
    served_mission: 0,
    country_id: 0,
    stake_id: 0,
    course_id: 0,

    currently_working: null,
    job_type_preference: null,
    available_full_time: null,
}