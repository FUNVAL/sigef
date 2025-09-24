import { AcademicInformationStep } from '@/components/student-registration/steps/AcademicInformationStep';
import { AgreementStep } from '@/components/student-registration/steps/AgreementStep';
import { PersonalInformationStep } from '@/components/student-registration/steps/PersonalInformationStep';
import { ReligiousInformationStep } from '@/components/student-registration/steps/ReligiousInformationStep';
import { RequiredDocumentsStep } from '@/components/student-registration/steps/RequiredDocumentsStep';
import { StudentRegistrationOverviewStep } from '@/components/student-registration/steps/StudentRegistrationOverviewStep';
import { Country } from '@/types/country';
import { Course } from '@/types/course';
import { Enums, Stepper, Translation } from '@/types/global';
import { StudentRegistrationFormData } from '@/types/student-registration';
import { Head, useForm, usePage } from '@inertiajs/react';
import StepperProvider from '../stepper-provider';

interface StudentRegistrationProps {
    countries: Country[];
    courses: Course[];
    enums: Enums;
}

const StudentRegistration = ({ countries, courses, enums }: StudentRegistrationProps) => {
    const { stepper } = usePage<Translation>().props;

    // Initialize form with default values
    const { data, setData, post, processing, errors } = useForm<StudentRegistrationFormData>({
        // Información Personal
        first_name: '',
        middle_name: '',
        last_name: '',
        second_last_name: '',
        birth_date: '',
        age: 0,
        gender: 0,
        country_id: 0,
        marital_status: 0,
        email: '',
        phone: '',
        recruiter_name: '',
        home_location_link: '',

        // Documentos Requeridos
        document_type: 0,
        document_number: '',
        id_front_photo_file: undefined,
        id_back_photo_file: undefined,
        driver_license_file: undefined,
        utility_bill_photo_file: undefined,
        formal_photo_file: undefined,

        // Información Religiosa/Eclesiástica
        is_active_member: false,
        member_certificate_number: '',
        baptism_year: undefined,
        is_returned_missionary: false,
        mission_served: '',
        mission_end_year: undefined,
        temple_status: 0,
        current_calling: '',
        stake_id: 0,
        ward_branch: '',

        // Información Académica y Profesional
        education_level: 0,
        course_id: 0,
        english_connect_level: 0,

        // Agreement Information
        agreement_terms_accepted: false,
        agreement_privacy_accepted: false,
        agreement_conduct_accepted: false,
    });

    const request = {
        data,
        setData,
        post,
        processing,
        errors,
    };

    const handleSubmit = () => {
        post(route('student-registration.store'), {
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
            title: 'Información Personal',
            component: <PersonalInformationStep countries={countries} request={request} />,
        },
        {
            title: 'Información Eleclesiástica',
            component: <ReligiousInformationStep countries={countries} request={request} />,
        },
        {
            title: 'Información Académica',
            component: <AcademicInformationStep courses={courses} request={request} />,
        },
        {
            title: 'Documentos Requeridos',
            component: <RequiredDocumentsStep request={request} />,
        },
        {
            title: 'Acuerdos y Compromisos',
            component: (
                <AgreementStep
                    data={{
                        agreement_terms_accepted: data.agreement_terms_accepted,
                        agreement_privacy_accepted: data.agreement_privacy_accepted,
                        agreement_conduct_accepted: data.agreement_conduct_accepted,
                    }}
                    onDataChange={(field, value) => setData(field, value)}
                    errors={errors as Record<string, string>}
                />
            ),
        },
        {
            title: 'Confirmación',
            component: (
                <StudentRegistrationOverviewStep
                    data={data}
                    countries={countries}
                    courses={courses}
                    enums={enums}
                    onSubmit={handleSubmit}
                    processing={processing}
                />
            ),
        },
    ];

    return (
        <>
            <Head title="Inscripción de Estudiante - FUNVAL" />
            <StepperProvider steps={steps} />
        </>
    );
};

export default StudentRegistration;
