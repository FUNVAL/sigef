import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, UserCheck, Loader } from "lucide-react"
import { Country } from "@/types/country"
import { Stake } from "@/types/stake"
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

export function PreInscriptionOverviewStep({ request, countries }: OverviewStepProps) {
    const { data, post, processing } = request;
    const { enums, forms, ui } = usePage<{
        enums: Enums;
        forms: Translation['forms'];
        ui: Translation['ui'];
    }>().props;
    const { nextStep, previousStep } = useContext(StepperContext);

    const { stakes } = useFilteredStakes(data.country_id);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('pre-inscription.store'), {
            onSuccess: (message: any) => {
                nextStep();
            },
            onError: (error: unknown) => {
                console.error("Error al enviar los datos:", error);
            },
        });
    }

    const getCountryName = () =>
        countries.find((c) => c.id.toString() === data.country_id?.toString())?.name || "-"

    const getStakeName = () =>
        stakes.find((s) => s.id.toString() === data.stake_id?.toString())?.name || "-"

    const getGenderName = () =>
        enums?.gender?.find((g) => g.id.toString() === data?.gender?.toString())?.name || "-"

    const getMaritalStatusName = () =>
        enums.maritalStatus.find((m) => m.id.toString() === data.marital_status?.toString())?.name || "-"

    const getMission = () => {
        return enums.missionStatus?.find(m => m.id === data.served_mission)?.name || "-";
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl border-0 overflow-hidden pt-0">
                <StepsHeader
                    title={forms.pre_inscription.overview.title}
                    subtitle={forms.pre_inscription.overview.subtitle}
                />

                <CardContent className="p-8 space-y-8">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                            <li>
                                <strong>{forms.pre_inscription.overview.fields.first_name}</strong>&nbsp;
                                <span>{data.first_name || "-"}</span>
                            </li>
                            <li>
                                <strong>{forms.pre_inscription.overview.fields.middle_name}</strong>&nbsp;
                                <span>{data.middle_name || "-"}</span>
                            </li>
                            <li>
                                <strong>{forms.pre_inscription.overview.fields.last_name}</strong>&nbsp;
                                <span>{data.last_name || "-"}</span>
                            </li>
                            <li>
                                <strong>{forms.pre_inscription.overview.fields.second_last_name}</strong>&nbsp;
                                <span>{data.second_last_name || "-"}</span>
                            </li>
                            <li>
                                <strong>{forms.pre_inscription.overview.fields.gender}</strong>&nbsp;
                                <span>{getGenderName()}</span>
                            </li>
                            <li>
                                <strong>{forms.pre_inscription.overview.fields.age}</strong>&nbsp;
                                <span>{data.age || "-"}</span>
                            </li>
                            <li>
                                <strong>{forms.pre_inscription.overview.fields.country}</strong>&nbsp;
                                <span>{getCountryName()}</span>
                            </li>
                            <li>
                                <strong>{forms.pre_inscription.overview.fields.phone}</strong>&nbsp;
                                <span>{data.phone || "-"}</span>
                            </li>
                            <li>
                                <strong>{forms.pre_inscription.overview.fields.stake}</strong>&nbsp;
                                <span>{getStakeName()}</span>
                            </li>
                            <li>
                                <strong>{forms.pre_inscription.overview.fields.email}</strong>&nbsp;
                                <span>{data.email || "-"}</span>
                            </li>
                            <li>
                                <strong>{forms.pre_inscription.overview.fields.marital_status}</strong>&nbsp;
                                <span>{getMaritalStatusName()}</span>
                            </li>
                            <li>
                                <strong>{forms.pre_inscription.overview.fields.served_mission}</strong>&nbsp;
                                <span>{getMission()}</span>
                            </li>
                            {data.gender === 2 && (
                                <>
                                    <li>
                                        <strong>{forms.pre_inscription.overview.fields.currently_working}</strong>&nbsp;
                                        <span>{data.currently_working ? ui.labels.yes : ui.labels.no}</span>
                                    </li>
                                    {!data.currently_working && (
                                        <li>
                                            <strong>{forms.pre_inscription.overview.fields.job_type_preference}</strong>&nbsp;
                                            <span>{enums?.jobType?.find((j) => j.id === data.job_type_preference)?.name || "-"}</span>
                                        </li>
                                    )}
                                    <li>
                                        <strong>{forms.pre_inscription.overview.fields.available_full_time}</strong>&nbsp;
                                        <span>{data.available_full_time ? ui.labels.yes : ui.labels.no}</span>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                    <form className="flex justify-between pt-4" onSubmit={handleSubmit}>
                        <Button
                            type="button"
                            onClick={previousStep}
                            variant="outline"
                            size="lg"
                            disabled={processing}
                            className="min-w-[120px]"
                        >
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
    )
}