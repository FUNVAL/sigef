import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, UserCheck, Loader } from "lucide-react"
import { Country } from "@/types/country"
import { Stake } from "@/types/stake"
import { Enums } from "@/types/global"
import { PreRegistrationRequest } from "@/types/pre-inscription"
import { usePage } from "@inertiajs/react"
import { useContext } from "react"
import { StepperContext } from "@/pages/forms/stepper-provider"

interface OverviewStepProps {
    request: PreRegistrationRequest;
    countries: Country[];
    stakes: Stake[];
}

export function PreInscriptionOverviewStep({ request, countries, stakes }: OverviewStepProps) {
    const { data, post, processing } = request;
    const { enums } = usePage<{ enums: Enums }>().props;
    const { nextStep, previousStep } = useContext(StepperContext);
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
        <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-blue-100 bg-blue-50 dark:border-gray-900 dark:bg-gray-900">
                <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-20 h-20 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm">
                        <UserCheck className="h-12 w-12 text-[rgb(46_131_242_/_1)]" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-funval-blue">
                        Revisa tus datos
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                            <div>
                                <strong>Primer Nombre:</strong>
                                <span>{data.first_name || "-"}</span>
                            </div>
                            <div>
                                <strong>Segundo Nombre:</strong>
                                <span>{data.middle_name || "-"}</span>
                            </div>
                            <div>
                                <strong>Apellido:</strong>
                                <span>{data.last_name || "-"}</span>
                            </div>
                            <div>
                                <strong>Segundo Apellido:</strong>
                                <span>{data.second_last_name || "-"}</span>
                            </div>
                            <div>
                                <strong>Género:</strong>
                                <span>{getGenderName()}</span>
                            </div>
                            <div>
                                <strong>Edad:</strong>
                                <span>{data.age || "-"}</span>
                            </div>
                            <div>
                                <strong>País:</strong>
                                <span>{getCountryName()}</span>
                            </div>
                            <div>
                                <strong>Teléfono:</strong>
                                <span>{data.phone || "-"}</span>
                            </div>
                            <div>
                                <strong>Estaca/Distrito/Misión:</strong>
                                <span>{getStakeName()}</span>
                            </div>
                            <div>
                                <strong>Email:</strong> <span>{data.email || "-"}</span>
                            </div>
                            <div>
                                <strong>Estado Civil:</strong> <span>{getMaritalStatusName()}</span>
                            </div>
                            <div>
                                <strong>¿Ha servido una misión?:</strong> <span>{getMission()}</span>
                            </div>
                            {
                                data.gender === 2 && (
                                    <>
                                        <div>
                                            <strong>¿Estás trabajando actualmente?:</strong> <span>{data.currently_working ? "Sí" : "No"}</span>
                                        </div>
                                        {!data.currently_working && (
                                            <div>
                                                <strong>Tipo de empleo que buscas:</strong> <span>{enums?.jobType?.find((j) => j.id === data.job_type_preference)?.name || "-"}</span>
                                            </div>
                                        )}
                                        <div>
                                            <strong>Disponibilidad para trabajar a tiempo completo:</strong> <span>{data.available_full_time ? "Sí" : "No"}</span>
                                        </div>
                                    </>
                                )
                            }

                        </div>
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
                            Anterior
                        </Button>

                        <Button
                            size="lg"
                            disabled={processing}
                            className="min-w-[140px] bg-[rgb(46_131_242_/1)] text-white transition-colors hover:bg-[rgb(46_131_242/_1)]/90 disabled:bg-gray-300 disabled:text-gray-500"
                        >
                            {processing && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                            {processing ? "Enviando..." : "Enviar"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}