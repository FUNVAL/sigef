import { User, type BreadcrumbItem, type SharedData } from '@/types';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import AccessControlLayout from '@/layouts/access-control/layout';
import { DataTable } from '@/components/data-table/data-table';
import { createColumns } from '@/components/users/user-data-table-config';
import navItems from '@/lib/consts/accessControlNavItems';
import { PaginationData } from '@/types/global';
import useFilters from '@/hooks/useFilters';
import { useState } from 'react';
import { DeleteUser } from '@/components/users/delete-user';

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

interface Props {
    users: { data: User[] };
    pagination: PaginationData;
    filters?: {
        search?: string;
    };
}

export default function Users({ users, pagination, filters = {} }: Props) {
    const { handleSearch } = useFilters();
    const [deletingUser, setDeletingUser] = useState<User | null>(null);

    const columns = createColumns({
        onDeleteUser: (user) => setDeletingUser(user),
    });

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
                        data={users.data}
                        columns={columns}
                        filterKey="email"
                        pagination={pagination}
                        searchValue={filters.search || ''}
                        onSearch={(value) => handleSearch(value, '/access-control/users')}
                    />
                </div>

                {deletingUser && (
                    <DeleteUser
                        user={deletingUser}
                        open={!!deletingUser}
                        onOpenChange={(open) => !open && setDeletingUser(null)}
                    />
                )}
            </AccessControlLayout>
        </AppLayout>
    );
}
