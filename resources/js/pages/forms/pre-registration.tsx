import { ActionSelectionStep } from '@/components/pre-registration/steps/ActionSelectionStep';
import { DisclaimerStep } from '@/components/pre-registration/steps/DisclaimerStep';
import { Stepper } from '@/types/global';
import StepperProvider from './stepper-provider';
import { useContext } from 'react';


const PreRegistration = () => {

    const steps: Stepper[] =
        [
            {
                title: 'Términos', component: <DisclaimerStep />
            },
            {
                title: 'Acción', component: <ActionSelectionStep />
            },
        ];

    return (
        <StepperProvider steps={steps} />
    );
}

export default PreRegistration;

