import { type BreadcrumbItem, } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { DataTable } from '@/components/data-table/data-table';
import { createColumns } from '@/components/pre-registration/references-data-table';
import { Reference } from '@/types/reference';
import AccessControlLayout from '@/layouts/access-control/layout';
import referencesNavItems from '@/lib/consts/referencesNavItems';
import ReferenceReview from '@/components/pre-registration/reference-review';
import FilterBar from '@/components/data-table/table-filters';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'References',
        href: '/references',
    },
];

export default function References({ references }: { references: Reference[] }) {
    const [editingReference, seteditingReference] = useState<Reference | null>(null);
    const columns = createColumns({
        onEditReference: (reference) => seteditingReference(reference),
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs} menuOptions={referencesNavItems}>
            <Head title="Referencias" />
            <AccessControlLayout headings={{
                title: 'Lista de Referencias',
                description: 'Aquí puedes ver todos las referencias que has recibido.',
            }}>
                <div className="space-y-6 w-full flex flex-col">
                    <DataTable<Reference>
                        data={references}
                        columns={columns}
                        filterKey="name"
                        FilterBar={FilterBar}
                    />

                    {editingReference && (
                        <ReferenceReview
                            reference={editingReference}
                            open={!!editingReference}
                            onOpenChange={(open) => !open && seteditingReference(null)}
                        />
                    )}
                </div>
            </AccessControlLayout>
        </AppLayout>
    );
}
