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
import { Download } from 'lucide-react';

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
                    {/* Header con botón de descarga */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-medium">Referencias</h3>
                            <p className="text-sm text-muted-foreground">
                                Gestiona las referencias recibidas en el sistema.
                            </p>
                        </div>
                        <a
                            href="/references/export-pending"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                            download
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Descargar Pendientes
                        </a>
                    </div>

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
