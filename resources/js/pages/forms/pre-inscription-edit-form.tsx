import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';

import { PreInscriptionEditFormStep } from '@/components/pre-registration/steps/PreInscriptionEditFormStep';
import AccessControlLayout from '@/layouts/access-control/layout';
import AppLayout from '@/layouts/app-layout';
import { Country } from '@/types/country';
import { PreInscription, PreInscriptionEditFormData } from '@/types/pre-inscription';

interface PreInscriptionEditFormProps {
    preInscription: PreInscription;
    countries: Country[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pre-inscripciones',
        href: '/pre-inscription',
    },
    {
        title: 'Editar Pre-inscripción',
        href: '#',
    },
];

export default function PreInscriptionEditForm({ preInscription, countries }: PreInscriptionEditFormProps) {
    // Convertir los datos de la pre-inscripción al formato del formulario
    const initialData: PreInscriptionEditFormData = {
        id: preInscription.id,
        first_name: preInscription.first_name || '',
        middle_name: preInscription.middle_name || '',
        last_name: preInscription.last_name || '',
        second_last_name: preInscription.second_last_name || '',
        gender: preInscription.gender?.id || 0,
        age: preInscription.age || 0,
        phone: preInscription.phone || '',
        additional_phone: preInscription.additional_phone || '',
        email: preInscription.email || '',
        country_id: preInscription.country?.id || 0,
        stake_id: preInscription.stake?.id || 0,
        marital_status: preInscription.marital_status?.id || 0,
        served_mission: preInscription.served_mission?.id || 0,
        currently_working: preInscription.currently_working,
        job_type_preference: preInscription.job_type_preference?.id,
        available_full_time: preInscription.available_full_time,
    };

    const request = useForm<PreInscriptionEditFormData>(initialData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        request.put(route('pre-inscription.update-data', preInscription.id), {
            onSuccess: () => {
                router.visit(route('pre-inscription.index'));
            },
        });
    };

    const handleCancel = () => {
        router.visit(route('pre-inscription.index'));
    };

    const fullName =
        `${preInscription.first_name} ${preInscription.middle_name || ''} ${preInscription.last_name} ${preInscription.second_last_name || ''}`.trim();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Pre-inscripción - ${fullName}`} />
            <AccessControlLayout
                headings={{
                    title: 'Editar Pre-inscripción',
                    description: `Edita la información de la pre-inscripción de ${fullName}.`,
                }}
            >
                <div className="flex w-full flex-col items-center space-y-6">
                    <PreInscriptionEditFormStep countries={countries} request={request} onSubmit={handleSubmit} onCancel={handleCancel} />
                </div>
            </AccessControlLayout>
        </AppLayout>
    );
}
