import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import useFilteredStakes from '@/hooks/use-filtered-stakes';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { Country } from '@/types/country';
import { Course } from '@/types/course';
import { Enums, Translation } from '@/types/global';
import { PreRegistrationRequest } from '@/types/pre-inscription';
import { usePage } from '@inertiajs/react';
import { ArrowLeft, Briefcase, Globe, GraduationCap, Heart, Loader, Mail, Phone, User } from 'lucide-react';
import { useContext } from 'react';
import { StepsHeader } from '../steps-header';

interface OverviewStepProps {
    request: PreRegistrationRequest;
    countries: Country[];
}

type PageProps = {
    enums: Enums;
    forms: Translation['forms'];
    ui: Translation['ui'];
    courses: Course[];
};

interface FieldData {
    label: string | React.ReactNode;
    value: string | React.ReactNode;
    className?: string;
    colSpan?: string;
}

interface SectionData {
    title: string;
    icon: React.ReactNode;
    fields: FieldData[];
}

export function PreInscriptionOverviewStep({ request, countries }: OverviewStepProps) {
    const { data, post, processing } = request;
    const { enums, forms, ui, courses } = usePage<PageProps>().props;
    const { nextStep, previousStep } = useContext(StepperContext);
    const { stakes } = useFilteredStakes(data.country_id);

    // Helper functions
    const getCountryName = () => countries.find((c) => c.id.toString() === data.country_id?.toString())?.name || '-';
    const getStakeName = () => stakes.find((s) => s.id.toString() === data.stake_id?.toString())?.name || '-';
    const getGenderName = () => enums?.gender?.find((g) => g.id.toString() === data?.gender?.toString())?.name || '-';
    const getMaritalStatusName = () => enums.maritalStatus.find((m) => m.id.toString() === data.marital_status?.toString())?.name || '-';
    const getMission = () => enums.missionStatus?.find((m) => m.id === data.served_mission)?.name || '-';
    const getCourseName = () => courses.find((c) => c.id === data.course_id)?.name || '-';
    const getCourseDetails = () => courses.find((c) => c.id === data.course_id);

    const getBadge = (condition: boolean, trueLabel: string, falseLabel: string) => (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                condition ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
        >
            {condition ? trueLabel : falseLabel}
        </span>
    );

    const getModalityBadge = (modalityName: string) => (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                modalityName === 'En Línea' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
            }`}
        >
            {modalityName}
        </span>
    );

    // Data configuration for sections
    const sections: SectionData[] = [
        {
            title: 'Información Personal',
            icon: <User className="h-5 w-5 text-blue-600" />,
            fields: [
                { label: forms.pre_inscription.overview.fields.first_name, value: data.first_name || '-' },
                { label: forms.pre_inscription.overview.fields.middle_name, value: data.middle_name || '-' },
                { label: forms.pre_inscription.overview.fields.last_name, value: data.last_name || '-' },
                { label: forms.pre_inscription.overview.fields.second_last_name, value: data.second_last_name || '-' },
                { label: forms.pre_inscription.overview.fields.gender, value: getGenderName() },
                { label: forms.pre_inscription.overview.fields.age, value: data.age || '-' },
            ],
        },
        {
            title: 'Ubicación',
            icon: <Globe className="h-5 w-5 text-blue-600" />,
            fields: [
                { label: forms.pre_inscription.overview.fields.country, value: getCountryName() },
                { label: forms.pre_inscription.overview.fields.stake, value: getStakeName() },
            ],
        },
        {
            title: 'Curso Seleccionado',
            icon: <GraduationCap className="h-5 w-5 text-blue-600" />,
            fields: [
                {
                    label: 'Nombre del Curso',
                    value: getCourseName(),
                    className: 'font-medium',
                    colSpan: 'md:col-span-2',
                },
                ...(getCourseDetails()
                    ? [
                          { label: 'Duración', value: `${getCourseDetails()?.duration} meses` },
                          { label: 'Modalidad', value: getModalityBadge(getCourseDetails()?.modality.name || '') },
                      ]
                    : []),
            ],
        },
        {
            title: 'Información de Contacto',
            icon: <Phone className="h-5 w-5 text-blue-600" />,
            fields: [
                { label: forms.pre_inscription.overview.fields.phone, value: data.phone || '-' },
                { label: forms.pre_inscription.overview.fields.additional_phone, value: data.additional_phone || '-' },
                {
                    label: (
                        <span className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {forms.pre_inscription.overview.fields.email}
                        </span>
                    ),
                    value: data.email || '-',
                    colSpan: 'md:col-span-2',
                },
            ],
        },
        {
            title: 'Estado Personal',
            icon: <Heart className="h-5 w-5 text-blue-600" />,
            fields: [
                { label: forms.pre_inscription.overview.fields.marital_status, value: getMaritalStatusName() },
                { label: forms.pre_inscription.overview.fields.served_mission, value: getMission() },
            ],
        },
        // Work Information Section - Only for Female
        ...(data.gender === 2
            ? [
                  {
                      title: 'Información Laboral',
                      icon: <Briefcase className="h-5 w-5 text-blue-600" />,
                      fields: [
                          {
                              label: forms.pre_inscription.overview.fields.currently_working,
                              value: getBadge(data.currently_working, ui.labels.yes, ui.labels.no),
                          },
                          ...(data.currently_working
                              ? []
                              : [
                                    {
                                        label: forms.pre_inscription.overview.fields.job_type_preference,
                                        value: enums?.jobType?.find((j) => j.id === data.job_type_preference)?.name || '-',
                                    },
                                ]),
                          {
                              label: forms.pre_inscription.overview.fields.available_full_time,
                              value: (
                                  <span
                                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                          data.available_full_time ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                      }`}
                                  >
                                      {data.available_full_time ? ui.labels.yes : ui.labels.no}
                                  </span>
                              ),
                          },
                      ],
                  },
              ]
            : []),
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('pre-inscription.store'), {
            onSuccess: (message: any) => {
                nextStep();
            },
            onError: (error: unknown) => {
                console.error('Error al enviar los datos:', error);
            },
        });
    };

    const renderSection = (section: SectionData, index: number) => (
        <div key={index} className="space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                {section.icon}
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
            </div>
            <div
                className={`grid grid-cols-1 gap-4 ${section.fields.length > 2 ? 'md:grid-cols-2' : 'md:grid-cols-2'} ${section.title === 'Curso Seleccionado' ? 'md:grid-cols-3' : ''}`}
            >
                {section.fields.map((field, fieldIndex) => (
                    <div key={fieldIndex} className={`space-y-1 ${field.colSpan || ''}`}>
                        <label className="text-sm font-medium text-gray-600">{field.label}</label>
                        <p className={`text-base text-gray-900 ${field.className || ''}`}>{field.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="mx-auto max-w-4xl">
            <Card className="overflow-hidden border-0 pt-0 shadow-2xl">
                <StepsHeader title={forms.pre_inscription.overview.title} subtitle={forms.pre_inscription.overview.subtitle} />

                <CardContent className="space-y-4 p-3 sm:space-y-6 sm:p-6 md:p-8">
                    {sections.map(renderSection)}

                    <form className="flex justify-between border-t border-gray-200 pt-6" onSubmit={handleSubmit}>
                        <Button type="button" onClick={previousStep} variant="outline" size="lg" disabled={processing} className="min-w-[120px]">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {ui.buttons.previous}
                        </Button>

                        <Button
                            size="lg"
                            disabled={processing}
                            className="min-w-[140px] bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500"
                        >
                            {processing && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                            {processing ? forms.pre_inscription.overview.buttons.sending : forms.pre_inscription.overview.buttons.submit}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
