import { type BreadcrumbItem, } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import { DataTable } from '@/components/data-table/data-table';
import { createColumns } from '@/components/pre-registration/references-data-table';
import { Reference } from '@/types/reference';
import AccessControlLayout from '@/layouts/access-control/layout';
import referencesNavItems from '@/lib/consts/referencesNavItems';
import ReferenceReview from '@/components/pre-registration/reference-review';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'References',
        href: '/references',
    },
];

export default function References({ references }: { references: Reference[] }) {
    const { auth } = usePage().props;
    const [selectedReference, setSelectedReference] = useState<Reference | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleEditReference = (reference: Reference) => {
        setSelectedReference(reference);
        setIsEditDialogOpen(true);
    };

    const columns = createColumns({
        onEditReference: handleEditReference,
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
                    />

                    {selectedReference && (
                        <ReferenceReview
                            reference={selectedReference}
                            open={isEditDialogOpen}
                            onOpenChange={setIsEditDialogOpen}
                        />
                    )}
                </div>
            </AccessControlLayout>
        </AppLayout>
    );
} 