
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader, User, Globe, Phone, Mail, Heart, Briefcase, GraduationCap } from "lucide-react"
import { Country } from "@/types/country"
import { Course } from "@/types/course"
import { Enums, Translation } from "@/types/global"
import { PreRegistrationRequest } from "@/types/pre-inscription"
import { usePage } from "@inertiajs/react"
import { useContext } from "react"
import { StepperContext } from "@/pages/forms/stepper-provider"
import { StepsHeader } from "../steps-header"
import useFilteredStakes from "@/hooks/use-filtered-stakes"

interface OverviewStepProps {
    request: PreRegistrationRequest;
    countries: Country[];

}
type PageProps = {
    enums: Enums;
    forms: Translation['forms'];
    ui: Translation['ui'];
    courses: Course[];
}
export function PreInscriptionOverviewStep({ request, countries }: OverviewStepProps) {
    const { data, post, processing } = request;
    const { enums, forms, ui, courses } = usePage<PageProps>().props;
    const { nextStep, previousStep } = useContext(StepperContext);

    const { stakes } = useFilteredStakes(data.country_id);
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

    const getCountryName = () => countries.find((c) => c.id.toString() === data.country_id?.toString())?.name || '-';

    const getStakeName = () => stakes.find((s) => s.id.toString() === data.stake_id?.toString())?.name || '-';

    const getGenderName = () => enums?.gender?.find((g) => g.id.toString() === data?.gender?.toString())?.name || '-';

    const getMaritalStatusName = () => enums.maritalStatus.find((m) => m.id.toString() === data.marital_status?.toString())?.name || '-';

    const getMission = () => {
        return enums.missionStatus?.find((m) => m.id === data.served_mission)?.name || '-';
    };

    const getCourseName = () => courses.find((c) => c.id === data.course_id)?.name || '-';

    const getCourseDetails = () => courses.find((c) => c.id === data.course_id);

    return (
        <div className="mx-auto max-w-4xl">
            <Card className="overflow-hidden border-0 pt-0 shadow-2xl">
                <StepsHeader title={forms.pre_inscription.overview.title} subtitle={forms.pre_inscription.overview.subtitle} />

                <CardContent className="space-y-6 p-8">
                    {/* Personal Information Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                            <User className="h-5 w-5 text-blue-600" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                Información Personal
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">
                                    {forms.pre_inscription.overview.fields.first_name}
                                </label>
                                <p className="text-base text-gray-900">{data.first_name || '-'}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">
                                    {forms.pre_inscription.overview.fields.middle_name}
                                </label>
                                <p className="text-base text-gray-900">{data.middle_name || '-'}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">
                                    {forms.pre_inscription.overview.fields.last_name}
                                </label>
                                <p className="text-base text-gray-900">{data.last_name || '-'}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">
                                    {forms.pre_inscription.overview.fields.second_last_name}
                                </label>
                                <p className="text-base text-gray-900">{data.second_last_name || '-'}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">
                                    {forms.pre_inscription.overview.fields.gender}
                                </label>
                                <p className="text-base text-gray-900">{getGenderName()}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">
                                    {forms.pre_inscription.overview.fields.age}
                                </label>
                                <p className="text-base text-gray-900">{data.age || '-'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Location Information Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                            <Globe className="h-5 w-5 text-blue-600" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                Ubicación
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">
                                    {forms.pre_inscription.overview.fields.country}
                                </label>
                                <p className="text-base text-gray-900">{getCountryName()}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">
                                    {forms.pre_inscription.overview.fields.stake}
                                </label>
                                <p className="text-base text-gray-900">{getStakeName()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Course Information Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                            <GraduationCap className="h-5 w-5 text-blue-600" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                Curso Seleccionado
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-sm font-medium text-gray-600">
                                    Nombre del Curso
                                </label>
                                <p className="text-base text-gray-900 font-medium">{getCourseName()}</p>
                            </div>
                            {getCourseDetails() && (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-600">
                                            Duración
                                        </label>
                                        <p className="text-base text-gray-900">
                                            {getCourseDetails()?.duration} meses
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-600">
                                            Modalidad
                                        </label>
                                        <p className="text-base text-gray-900">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCourseDetails()?.modality.name === "En Línea"
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                {getCourseDetails()?.modality.name}
                                            </span>
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                            <Phone className="h-5 w-5 text-blue-600" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                Información de Contacto
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">
                                    {forms.pre_inscription.overview.fields.phone}
                                </label>
                                <p className="text-base text-gray-900">{data.phone || '-'}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">
                                    {forms.pre_inscription.overview.fields.additional_phone}
                                </label>
                                <p className="text-base text-gray-900">{data.additional_phone || '-'}</p>
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                                    <Mail className="h-4 w-4" />
                                    {forms.pre_inscription.overview.fields.email}
                                </label>
                                <p className="text-base text-gray-900">{data.email || '-'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Personal Status Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                            <Heart className="h-5 w-5 text-blue-600" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                Estado Personal
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">
                                    {forms.pre_inscription.overview.fields.marital_status}
                                </label>
                                <p className="text-base text-gray-900">{getMaritalStatusName()}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">
                                    {forms.pre_inscription.overview.fields.served_mission}
                                </label>
                                <p className="text-base text-gray-900">{getMission()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Work Information Section - Only for Female */}
                    {data.gender === 2 && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                                <Briefcase className="h-5 w-5 text-blue-600" />
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Información Laboral
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-600">
                                        {forms.pre_inscription.overview.fields.currently_working}
                                    </label>
                                    <p className="text-base text-gray-900">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${data.currently_working
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {data.currently_working ? ui.labels.yes : ui.labels.no}
                                        </span>
                                    </p>
                                </div>
                                {!data.currently_working && (
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-600">
                                            {forms.pre_inscription.overview.fields.job_type_preference}
                                        </label>
                                        <p className="text-base text-gray-900">
                                            {enums?.jobType?.find((j) => j.id === data.job_type_preference)?.name || '-'}
                                        </p>
                                    </div>
                                )}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-600">
                                        {forms.pre_inscription.overview.fields.available_full_time}
                                    </label>
                                    <p className="text-base text-gray-900">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${data.available_full_time
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {data.available_full_time ? ui.labels.yes : ui.labels.no}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form className="flex justify-between pt-6 border-t border-gray-200" onSubmit={handleSubmit}>
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
