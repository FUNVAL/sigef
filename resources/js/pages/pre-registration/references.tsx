import { type BreadcrumbItem, } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { DataTable } from '@/components/data-table/data-table';
import { createColumns } from '@/components/pre-registration/references-data-table';
import { Reference } from '@/types/reference';
import AccessControlLayout from '@/layouts/access-control/layout';
import referencesNavItems from '@/lib/consts/referencesNavItems';
import ReferenceReview from '@/components/pre-registration/reference-review';
import FilterBar from '@/components/data-table/table-filters';
import { PaginationData } from '@/types/global';
import useFilters from '@/hooks/useFilters';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'References',
        href: '/references',
    },
];


interface ReferencesProps {
    references: { data: Reference[] };
    pagination: PaginationData;
    filters?: {
        search?: string;
    };
}

export default function References({ references, pagination, filters = {} }: ReferencesProps) {
    const [editingReference, seteditingReference] = useState<Reference | null>(null);
    const { handleSearch } = useFilters();

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
                        data={references.data}
                        columns={columns}
                        filterKey="name"
                        FilterBar={FilterBar}
                        pagination={pagination}
                        searchValue={filters.search || ''}
                        onSearch={(value) => handleSearch(value, '/references')}
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
