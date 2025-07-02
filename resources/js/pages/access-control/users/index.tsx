import { User, type BreadcrumbItem, type SharedData } from '@/types';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import AccessControlLayout from '@/layouts/access-control/layout';
import { DataTable } from '@/components/data-table/data-table';
import { columns } from '@/components/users/user-data-table-config';
import navItems from '@/lib/consts/accesControlNavItems';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Control de Accesos',
        href: '/access-control',
    },
    {
        title: 'Usuarios',
        href: '/access-control/users',
    },
];

export default function Users({ users }: { users: [User] }) {

    return (
        <AppLayout breadcrumbs={breadcrumbs} menuOptions={navItems}>
            <Head title="Control de accesos" />
            <AccessControlLayout
                headings={{
                    title: 'Lista de usuarios',
                    description: 'Gestión de usuarios y roles',
                }}>
                <div className="space-y-6 w-full flex flex-col">
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
