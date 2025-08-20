import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import AccessControlLayout from '@/layouts/access-control/layout';
import { DataTable } from '@/components/data-table/data-table';
import { createColumns } from '@/components/countries/country-data-table';
import { CreateCountry } from '@/components/countries/create-country';
import { Country } from '@/types/country';
import { useState } from 'react';
import { EditCountry } from '@/components/countries/edit-country';
import { DeleteCountry } from '@/components/countries/delete-country';
import { PaginationData } from '@/types/global';
import useFilters from '@/hooks/useFilters';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Countries',
        href: '/countries',
    },
];

interface Props {
    countries: { data: Country[] };
    pagination: PaginationData;
    filters?: { search?: string };
}

export default function Countries({ countries, pagination, filters = {} }: Props) {
    const [editingCountry, setEditingCountry] = useState<Country | null>(null);
    const [deletingCountry, setDeletingCountry] = useState<Country | null>(null);
    const { handleSearch } = useFilters();

    const columns = createColumns({
        onEditCountry: (country) => setEditingCountry(country),
        onDeleteCountry: (country) => setDeletingCountry(country),
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Paises" />
            <AccessControlLayout headings={{
                title: 'Lista de paises',
                description: 'Aquí puedes ver todos los paises disponibles.',
            }}>
                <div className="space-y-6 w-full flex flex-col">
                    <div className="flex items-center justify-end absolute right-0 -top-16 p-4">
                        <CreateCountry />
                    </div>
                    <DataTable<Country>
                        data={countries.data}
                        columns={columns}
                        filterKey="name"
                        pagination={pagination}
                        searchValue={filters?.search || ''}
                        onSearch={(value) => handleSearch(value, '/countries')}
                    />
                </div>

                {editingCountry && (
                    <EditCountry
                        country={editingCountry}
                        open={!!editingCountry}
                        onOpenChange={(open) => !open && setEditingCountry(null)}
                    />
                )}

                {deletingCountry && (
                    <DeleteCountry
                        country={deletingCountry}
                        open={!!deletingCountry}
                        onOpenChange={(open) => !open && setDeletingCountry(null)}
                    />
                )}
            </AccessControlLayout>
        </AppLayout>
    );
}
