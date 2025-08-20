import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';

import { ReferenceEditFormStep } from '@/components/pre-registration/steps/ReferenceEditFormStep';
import AccessControlLayout from '@/layouts/access-control/layout';
import AppLayout from '@/layouts/app-layout';
import referencesNavItems from '@/lib/consts/referencesNavItems';
import { Country } from '@/types/country';
import { Reference, ReferenceEditFormData } from '@/types/reference';

interface ReferenceEditFormProps {
    reference: Reference;
    countries: Country[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Referencias',
        href: '/references',
    },
    {
        title: 'Editar Referencia',
        href: '#',
    },
];

export default function ReferenceEditForm({ reference, countries }: ReferenceEditFormProps) {
    // Convertir los datos de la referencia al formato del formulario
    const initialData: ReferenceEditFormData = {
        id: reference.id,
        name: reference.name || '',
        gender: reference.gender?.id || 0,
        country_id: reference.country?.id || 0,
        age: reference.age || 0,
        phone: reference.phone || '',
        stake_id: reference.stake?.id || 0,
        referrer_name: reference.referrer_name || '',
        referrer_phone: reference.referrer_phone || '',
        relationship_with_referred: reference.relationship_with_referred?.id || 0,
    };

    const request = useForm<ReferenceEditFormData>(initialData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        request.put(route('references.update-reference', reference.id), {
            onSuccess: () => {
                router.visit(route('references.index'));
            },
        });
    };

    const handleCancel = () => {
        router.visit(route('references.index'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} menuOptions={referencesNavItems}>
            <Head title={`Editar Referencia - ${reference.name}`} />
            <AccessControlLayout
                headings={{
                    title: 'Editar Referencia',
                    description: `Edita la información de la referencia de ${reference.name}.`,
                }}
            >
                <div className="flex w-full flex-col items-center space-y-6">
                    <ReferenceEditFormStep countries={countries} request={request} onSubmit={handleSubmit} onCancel={handleCancel} />
                </div>
            </AccessControlLayout>
        </AppLayout>
    );
}
