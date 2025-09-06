import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { Translation } from '@/types/global';
import { usePage } from '@inertiajs/react';
import { Shield, Sparkle } from 'lucide-react';
import { useContext, useState } from 'react';
import { StepsHeader } from '../steps-header';

export function DisclaimerStep() {
    const { nextStep } = useContext(StepperContext);
    const [accepted, setAccepted] = useState(false);
    const { ui, welcome_disclaimer } = usePage<Translation>().props;

    return (
        <Card className="mx-auto w-full max-w-4xl overflow-hidden border-0 pt-0 shadow-2xl">
            <StepsHeader title={welcome_disclaimer.title} subtitle={welcome_disclaimer.subtitle} />

            <CardContent className="space-y-6 p-3 sm:space-y-8 sm:p-6 md:p-8">
                <div className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 md:p-8">
                    <div className="mb-4 flex items-center gap-3">
                        <Sparkle className="h-6 w-6 text-blue-600" />
                        <h3
                            className="text-xl font-semibold text-gray-800"
                            dangerouslySetInnerHTML={{ __html: welcome_disclaimer.program_description.title }}
                        />
                    </div>
                    <p
                        className="mb-4 text-lg leading-relaxed text-gray-700"
                        dangerouslySetInnerHTML={{
                            __html: welcome_disclaimer.program_description.description,
                        }}
                    />
                    <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700 sm:px-6 sm:py-4">
                        <p className="font-medium">{welcome_disclaimer.motivation}</p>
                    </div>
                </div>

                {/* Privacy Section */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-6">
                    <div className="mb-4 flex items-center gap-3">
                        <Shield className="h-6 w-6 text-gray-600" />
                        <h3 className="text-xl font-semibold text-gray-800">{welcome_disclaimer.privacy.title}</h3>
                    </div>
                    <p
                        className="leading-relaxed text-gray-700"
                        dangerouslySetInnerHTML={{
                            __html: welcome_disclaimer.privacy.description,
                        }}
                    />
                </div>

                {/* Terms and Conditions */}
                <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
                    <div className="flex items-start space-x-3">
                        <Checkbox
                            id="terms"
                            checked={accepted}
                            className="mt-1 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                            onCheckedChange={(checked) => setAccepted(checked as boolean)}
                        />
                        <Label htmlFor="terms" className="cursor-pointer text-sm leading-relaxed text-gray-700">
                            {welcome_disclaimer.accept_terms}
                        </Label>
                    </div>
                </div>

                <div className="text-center">
                    <Button
                        onClick={nextStep}
                        disabled={!accepted}
                        size="lg"
                        className="transform bg-blue-600 px-12 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {ui.buttons.continue}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
