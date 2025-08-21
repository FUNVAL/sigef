import { DataTable } from '@/components/data-table/data-table';
import AccessControlLayout from '@/layouts/access-control/layout';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Enums, PaginationData } from '@/types/global';
import { Stake } from '@/types/stake';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { getColumns } from './columns';
import { CreateStake } from './create-stake';
import { DeleteStake } from './DeleteStake';
import { EditStake } from './edit-stake';
import useFilters from '@/hooks/useFilters';

interface Props {
    stakes: { data: Stake[] };
    pagination: PaginationData;
    countries: any[]; // Deberías reemplazar any[] con el tipo correcto (Country[])
    users: any[]; // Deberías reemplazar any[] con el tipo correcto (User[])
    filters?: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stakes',
        href: '/stakes',
    },
];

export default function StakesIndex({ stakes, pagination, countries, users, filters = {} }: Props) {
    const { enums } = usePage<{ enums: Enums }>().props;
    const [editingStake, setEditingStake] = useState<Stake | null>(null);
    const [deletingStake, setDeletingStake] = useState<Stake | null>(null);
    const { handleSearch } = useFilters();

    const handleEdit = (stake: Stake) => {
        setEditingStake(stake);
    };

    const handleDelete = (stake: Stake) => {
        setDeletingStake(stake);
    };

    const columns = getColumns({
        countries,
        users,
        enums,
        onEdit: handleEdit,
        onDelete: handleDelete,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stakes" />
            <AccessControlLayout
                headings={{
                    title: 'Lista de Estacas',
                    description: 'Aquí puedes ver todas las estacas registradas.',
                }}
            >
                <div className="flex w-full flex-col space-y-6">
                    <div className="absolute -top-16 right-0 flex items-center justify-end p-4">
                        <CreateStake countries={countries} users={users} />
                    </div>
                    <DataTable<Stake>
                        data={stakes.data}
                        columns={columns}
                        filterKey="name"
                        pagination={pagination}
                        searchValue={filters.search || ''}
                        onSearch={(value) => handleSearch(value, '/stakes')}
                    />
                </div>

                {/* Diálogos de edición y eliminación */}
                {editingStake && (
                    <EditStake
                        stake={editingStake}
                        countries={countries}
                        users={users}
                        open={!!editingStake}
                        onOpenChange={(open) => {
                            if (!open) setEditingStake(null);
                        }}
                    />
                )}

                {deletingStake && (
                    <DeleteStake
                        stake={deletingStake}
                        open={!!deletingStake}
                        onOpenChange={(open) => {
                            if (!open) setDeletingStake(null);
                        }}
                    />
                )}
            </AccessControlLayout>
        </AppLayout>
    );
}
