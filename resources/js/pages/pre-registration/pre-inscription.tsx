import { type BreadcrumbItem, } from '@/types';
import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { DataTable } from '@/components/data-table/data-table';
import { createColumns } from '@/components/pre-registration/pre-inscriptions-data-table';
import { type PreInscription } from '@/types/pre-inscription';
import PreInscriptionLayout from '@/layouts/pre-inscription/layout';
import { useState } from 'react';
import PreInscriptionReview from '@/components/pre-registration/pre-inscription-review';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pre-Inscription',
        href: '/pre-inscription',
    },
];

export default function PreInscription({ preInscriptions }: { preInscriptions: PreInscription[] }) {
    const [editingPreInscription, setEditingPreInscription] = useState<PreInscription | null>(null);

    const columns = createColumns({
        onEditPreInscription: (preInscription) => setEditingPreInscription(preInscription),
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pre-inscripciones" />
            <PreInscriptionLayout headings={{
                title: 'Dashboard de Pre-inscripciones',
                description: 'Aquí puedes ver y gestionar todas las pre-inscripciones recibidas.',
            }}>
                <div className="space-y-6 w-full flex flex-col">
                    <DataTable<PreInscription>
                        data={preInscriptions || []}
                        columns={columns}
                        filterKey="first_name"
                    />
                </div>

                {editingPreInscription && (
                    <PreInscriptionReview
                        preInscription={editingPreInscription}
                        open={!!editingPreInscription}
                        onOpenChange={(open) => !open && setEditingPreInscription(null)}
                    />
                )}
            </PreInscriptionLayout>
        </AppLayout>
    );
}
