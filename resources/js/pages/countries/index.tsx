import { type BreadcrumbItem, } from '@/types';
import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import AccessControlLayout from '@/layouts/access-control/layout';
import { DataTable } from '@/components/data-table/data-table';
import { columns } from '@/components/countries/country-data-table';
import { CreateCountry } from '@/components/countries/create-country';
import { Country } from '@/types/country';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Countries',
        href: '/countries',
    },
];

export default function Countries({ countries }: { countries: [Country] }) {
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
                        data={countries}
                        columns={columns}
                        filterKey="name"
                    />

                </div>
            </AccessControlLayout>
        </AppLayout>
    );
}
