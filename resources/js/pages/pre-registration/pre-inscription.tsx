import { type BreadcrumbItem, } from '@/types';
import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { DataTable } from '@/components/data-table/data-table';
import { columns } from '@/components/pre-registration/pre-inscriptions-data-table';
import { type PreInscription } from '@/types/pre-inscription';
import PreInscriptionLayout from '@/layouts/pre-inscription/layout';
import AccessControlLayout from '@/layouts/access-control/layout';
import preinscriptionsNavItems from '@/lib/consts/preinscriptionNavItems';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Preinscripciones',
        href: '/pre-inscription',
    },
];

export default function PreInscription({ preInscriptions }: { preInscriptions: PreInscription[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} menuOptions={preinscriptionsNavItems}>
            <Head title="Preinscripciones" />
            <AccessControlLayout headings={{
                title: 'Lista de Preinscripciones',
                description: 'Aquí puedes ver y gestionar todas las preinscripciones recibidas.',
            }}>

                <div className="space-y-6 w-full flex flex-col">
                    <DataTable<PreInscription>
                        data={preInscriptions || []}
                        columns={columns}
                        filterKey="first_name"
                    />
                </div>
            </AccessControlLayout>
        </AppLayout>
    );
}
