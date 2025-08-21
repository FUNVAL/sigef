import { ActionSelectionStep } from '@/components/pre-registration/steps/ActionSelectionStep';
import { DisclaimerStep } from '@/components/pre-registration/steps/DisclaimerStep';
import { Stepper, Translation } from '@/types/global';
import StepperProvider from './stepper-provider';
import { Head, usePage } from '@inertiajs/react';


const PreRegistration = () => {

    const { stepper } = usePage<Translation>().props;

    const steps: Stepper[] =
        [
            {
                title: stepper.conditions, component: <DisclaimerStep />
            },
            {
                title: stepper.options, component: <ActionSelectionStep />
            },
        ];

    return (
        <>
            <Head title="Pre-Registration" />
            <StepperProvider steps={steps} />
        </>
    );
}

export default PreRegistration;

