import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader, Users } from "lucide-react";
import { Country } from "@/types/country";
import { Stake } from "@/types/stake";
import { Enums, Translation } from "@/types/global";
import { usePage } from "@inertiajs/react";
import { ReferenceFormData } from "@/types/reference";
import { StepperContext } from "@/pages/forms/stepper-provider";
import { useContext } from "react";
import { StepsHeader } from "../steps-header";

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
    };

    return (
        <Card className="w-full max-w-4xl shadow-2xl border-0 overflow-hidden pt-0 mx-auto">
            <StepsHeader
                title={forms.referral.overview.title}
            />

            <CardContent className="p-8 space-y-8">
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
                <form className="flex justify-between pt-4" onSubmit={handleSubmit}>
                    <Button type="button" onClick={previousStep} variant="outline" size="lg" className="min-w-[120px]">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {ui.buttons.previous}
                    </Button>

                    <Button
                        size="lg"
                        disabled={processing}
                        className="min-w-[200px] bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500"
                    >
                        {processing && <Loader className={`mr-2 h-4 w-4 ${processing ? "animate-spin" : ""}`} />}
                        {processing ? forms.referral.overview.buttons.sending : forms.referral.overview.buttons.submit}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}