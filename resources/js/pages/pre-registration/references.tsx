import { type BreadcrumbItem, } from '@/types';
import { Head, usePage } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { DataTable } from '@/components/data-table/data-table';
import { columns } from '@/components/pre-registration/references-data-table';
import { Reference } from '@/types/reference';
import ReferencesLayout from '@/layouts/references/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'References',
        href: '/references',
    },
];

export default function References({ references }: { references: Reference[] }) {
    const { auth } = usePage().props;
    console.log('References Page', auth);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cursos" />
            <ReferencesLayout headings={{
                title: 'Lista de Referencias',
                description: 'Aquí puedes ver todos las referencias que has recibido.',
            }}>
                <div className="space-y-6 w-full flex flex-col">
                    <DataTable<Reference>
                        data={references}
                        columns={columns}
                        filterKey="name"
                    />

                </div>
            </ReferencesLayout>
        </AppLayout>
    );
}
