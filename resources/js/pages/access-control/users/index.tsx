import { User, type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import AccessControlLayout from '@/layouts/access-control/layout';
import { DataTable } from '@/components/data-table/data-table';
import { columns } from '@/components/users/user-data-table-config';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Control de Accesos',
        href: '/access-control/users',
    },
    {
        title: 'Usuarios',
        href: '/access-control/users',
    },
];


export default function Users({ users }: { users: [User] }) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Control de accesos" />
            <AccessControlLayout headings={{
                title: 'Lista de usuarios',
                description: 'Gestión de usuarios y roles',
            }}>
                <div className="space-y-6 w-full flex flex-col">
                    <div className="flex items-center justify-end">
                        <Button variant="secondary" asChild>
                            <Link href="/access-control/users/create">Crear usuario</Link>
                        </Button>
                    </div>
                    <DataTable<User>
                        data={users}
                        columns={columns}
                        filterKey="email"
                    />
                </div>
            </AccessControlLayout>
        </AppLayout>
    );
}
