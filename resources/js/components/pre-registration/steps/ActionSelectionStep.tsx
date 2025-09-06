import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { Translation } from '@/types/global';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft, UserPlus, Users } from 'lucide-react';
import { useContext, useState } from 'react';
import { StepsHeader } from '../steps-header';

interface ActionSelectionStepProps {
    onAction: (action: 'reference-form' | 'preinscription-form') => void;
    action: 'reference-form' | 'preinscription-form' | '';
}

export function ActionSelectionStep() {
    const { nextStep, previousStep } = useContext(StepperContext);
    const [action, setAction] = useState<ActionSelectionStepProps['action']>('');
    const { ui, action_selection } = usePage<Translation>().props;

    return (
        <Card className="mx-auto w-full max-w-4xl overflow-hidden border-0 pt-0 shadow-2xl">
            <StepsHeader title={action_selection.title} subtitle={action_selection.subtitle} />

            <CardContent className="space-y-6 p-3 sm:space-y-8 sm:p-6 md:p-8">
                <RadioGroup className="space-y-4" value={action} onValueChange={(value) => setAction(value as ActionSelectionStepProps['action'])}>
                    <Label
                        htmlFor="preregistration"
                        className="cursor-pointer space-x-3 rounded-lg border p-3 text-base font-medium transition-colors hover:bg-gray-50 sm:p-4"
                    >
                        <div className="flex flex-1 items-center space-x-3">
                            <RadioGroupItem value="preinscription-form" id="preregistration" />
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                                <UserPlus className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                {action_selection.pre_inscription.title}
                                <p className="mt-1 text-sm text-gray-600">{action_selection.pre_inscription.description}</p>
                            </div>
                        </div>
                    </Label>

                    <Label
                        htmlFor="referral"
                        className="cursor-pointer space-x-3 rounded-lg border p-3 text-base font-medium transition-colors hover:bg-gray-50 sm:p-4"
                    >
                        <div className="flex flex-1 items-center space-x-3">
                            <RadioGroupItem value="reference-form" id="referral" />
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                {action_selection.referral.title}
                                <p className="mt-1 text-sm text-gray-600">{action_selection.referral.description}</p>
                            </div>
                        </div>
                    </Label>
                </RadioGroup>

                <div className="flex justify-between pt-4">
                    <Button onClick={previousStep} variant="outline" size="lg" className="min-w-[120px]">
                        <ArrowLeft className="mr-2 h-4 w-4 text-gray-600" />
                        {ui.buttons.previous}
                    </Button>

                    <Button
                        disabled={!action}
                        onClick={nextStep}
                        asChild
                        size="lg"
                        className={`min-w-[140px] bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg ${!action && 'cursor-not-allowed opacity-50'}`}
                    >
                        <Link href={`${action}?step=2&full=true`} tabIndex={!action ? -1 : 0} aria-disabled={!action}>
                            {ui.buttons.continue}
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
