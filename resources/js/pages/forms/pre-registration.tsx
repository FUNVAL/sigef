import { ActionSelectionStep } from '@/components/pre-registration/steps/ActionSelectionStep';
import { DisclaimerStep } from '@/components/pre-registration/steps/DisclaimerStep';
import { Stepper, Translation } from '@/types/global';
import StepperProvider from './stepper-provider';
import { useContext } from 'react';
import { usePage } from '@inertiajs/react';


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
        <StepperProvider steps={steps} />
    );
}

export default PreRegistration;

