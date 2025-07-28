import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader, Users } from "lucide-react";
import { Country } from "@/types/country";
import { Stake } from "@/types/stake";
import { Enums, Translation } from "@/types/global";
import { usePage } from "@inertiajs/react";
import { ReferenceFormData } from "@/types/reference";
import { StepperContext } from "@/pages/forms/stepper-provider";
import { useContext } from "react";

interface OverviewReferralStepProps {
    request: {
        data: ReferenceFormData;
        setData: (field: keyof ReferenceFormData, value: any) => void;
        post: (...args: any[]) => void;
        processing: boolean;
        errors: Record<string, string>;
    };
    countries: Country[];
    stakes: Stake[];
}

export function OverviewReferralStep({ request, countries, stakes }: OverviewReferralStepProps) {
    const { nextStep, previousStep } = useContext(StepperContext);
    const { ui, forms } = usePage<Translation>().props;
    const { data, post, processing } = request;
    const { enums } = usePage<{ enums: Enums }>().props;

    const getGenderName = () =>
        enums.gender.find((g) => g.id.toString() === data.gender?.toString())?.name || "-";

    const getCountryName = () =>
        countries.find((c) => c.id.toString() === data.country_id?.toString())?.name || "-";

    const getStakeName = () =>
        stakes.find((s) => s.id.toString() === data.stake_id?.toString())?.name || "-";

    const getRelationshipName = () =>
        enums.relatedReference.find((r) => r.id.toString() === data.relationship_with_referred?.toString())?.name || "-";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("references.store"), {
            onSuccess: () => nextStep(),
            onError: (err: unknown) => {
                console.error("Error al enviar la referencia:", err);
            },
        });
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-blue-100 bg-blue-50 dark:border-gray-900 dark:bg-gray-900">
                <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-20 h-20 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm">
                        <Users className="h-12 w-12 text-[rgb(46_131_242_/_1)]" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-funval-blue">
                        {forms.referral.overview.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                            <div>
                                <strong>{forms.referral.overview.fields.full_name}</strong> <span>{data.name || "-"}</span>
                            </div>
                            <div>
                                <strong>{forms.referral.overview.fields.gender}</strong> <span>{getGenderName()}</span>
                            </div>
                            <div>
                                <strong>{forms.referral.overview.fields.age}</strong> <span>{data.age || "-"}</span>
                            </div>
                            <div>
                                <strong>{forms.referral.overview.fields.country}</strong> <span>{getCountryName()}</span>
                            </div>
                            <div>
                                <strong>{forms.referral.overview.fields.phone}</strong> <span>{data.phone || "-"}</span>
                            </div>
                            <div>
                                <strong>{forms.referral.overview.fields.stake}</strong> <span>{getStakeName()}</span>
                            </div>
                            <div>
                                <strong>{forms.referral.overview.fields.referrer_name}</strong> <span>{data.referrer_name || "-"}</span>
                            </div>
                            <div>
                                <strong>{forms.referral.overview.fields.referrer_phone}</strong> <span>{data.referrer_phone || "-"}</span>
                            </div>
                            <div>
                                <strong>{forms.referral.overview.fields.relationship}</strong> <span>{getRelationshipName()}</span>
                            </div>
                        </div>
                    </div>
                    <form className="flex justify-between pt-4" onSubmit={handleSubmit} >
                        <Button type="button" onClick={previousStep} variant="outline" size="lg" className="min-w-[120px]">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {ui.buttons.previous}
                        </Button>

                        <Button
                            size="lg"
                            disabled={processing}
                            className="min-w-[200px] bg-[rgb(46_131_242_/1)] text-white transition-colors hover:bg-[rgb(46_131_242/_1)]/90 disabled:bg-gray-300 disabled:text-gray-500"
                        >
                            {processing && <Loader className={`mr-2 h-4 w-4 ${processing ? "animate-spin" : ""}`} />}
                            {processing ? forms.referral.overview.buttons.sending : forms.referral.overview.buttons.submit}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}