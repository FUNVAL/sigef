import { DataTable } from '@/components/data-table/data-table';
import TableFilters from '@/components/data-table/table-filters';
import PreInscriptionReview from '@/components/pre-registration/pre-inscription-review';
import { createColumns } from '@/components/pre-registration/pre-inscriptions-data-table';
import useFilters from '@/hooks/useFilters';
import AccessControlLayout from '@/layouts/access-control/layout';
import AppLayout from '@/layouts/app-layout';
import preinscriptionsNavItems from '@/lib/consts/preinscriptionNavItems';
import { type BreadcrumbItem } from '@/types';
import { PaginationData } from '@/types/global';
import { type PreInscription } from '@/types/pre-inscription';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Preinscripciones',
        href: '/pre-inscription',
    },
];

interface PreInscriptionsProps {
    preInscriptions: { data: PreInscription[] };
    pagination: PaginationData;
    filters?: {
        search?: string;
    };
}

export default function PreInscription({ preInscriptions, pagination, filters = {} }: PreInscriptionsProps) {
    const [editingPreInscription, setEditingPreInscription] = useState<PreInscription | null>(null);
    const { handleSearch } = useFilters();

    const columns = createColumns({
        onEditPreInscription: (preInscription) => setEditingPreInscription(preInscription),
    });
    return (
        <AppLayout breadcrumbs={breadcrumbs} menuOptions={preinscriptionsNavItems}>
            <Head title="Preinscripciones" />
            <AccessControlLayout
                headings={{
                    title: 'Lista de Preinscripciones',
                    description: 'Aquí puedes ver y gestionar todas las preinscripciones recibidas.',
                }}
            >
                <div className="flex w-full flex-col space-y-6">
                    <DataTable<PreInscription>
                        data={preInscriptions.data}
                        columns={columns}
                        filterKey="first_name"
                        FilterBar={TableFilters}
                        pagination={pagination}
                        searchValue={filters.search || ''}
                        onSearch={(value) => handleSearch(value, '/pre-inscription')}
                    />
                </div>

                {editingPreInscription && (
                    <PreInscriptionReview
                        preInscription={editingPreInscription}
                        open={!!editingPreInscription}
                        onOpenChange={(open) => !open && setEditingPreInscription(null)}
                    />
                )}
            </AccessControlLayout>
        </AppLayout>
    );
}
