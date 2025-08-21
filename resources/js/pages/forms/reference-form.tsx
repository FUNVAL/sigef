import StepperProvider from './stepper-provider';
import { Country } from '@/types/country';
import { Stake } from '@/types/stake';
import { Stepper, Translation } from '@/types/global';
import { ReferralFormStep } from '@/components/pre-registration/steps/ReferralFormStep';
import { OverviewReferralStep } from '@/components/pre-registration/steps/Overview-Referral-Step';
import { Head, useForm, usePage } from '@inertiajs/react';
import { ReferenceFormData } from '@/types/reference';
import { DisclaimerStep } from '@/components/pre-registration/steps/DisclaimerStep';
import { MessageStep } from '@/components/pre-registration/steps/MessageStep';

const ReferenceForm = ({ countries }: { countries: Country[] }) => {
    const request = useForm<ReferenceFormData>(initialData);
    const { stepper } = usePage<Translation>().props;

    const steps: Stepper[] = [
        {
            title: stepper.conditions,
            component: <DisclaimerStep />
        },
        {
            title: stepper.form,
            component: <ReferralFormStep
                countries={countries}
                request={request}
            />
        },
        {
            title: stepper.overview,
            component: <OverviewReferralStep
                countries={countries}
                request={request}
            />
        },
        {
            title: stepper.confirmation,
            component: <MessageStep />
        },
    ]

    return (
        <>
            <Head title="Reference Form" />
            <StepperProvider steps={steps} />
        </>
    );
}

export default ReferenceForm;


const initialData: ReferenceFormData = {
    name: '',
    gender: 0,
    country_id: 0,
    age: 0,
    phone: '',
    stake_id: 0,
    referrer_name: '',
    referrer_phone: '',
    relationship_with_referred: 0,
}