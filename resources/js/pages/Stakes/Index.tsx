import { DataTable } from '@/components/data-table/data-table';
import AccessControlLayout from '@/layouts/access-control/layout';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Stake } from '@/types/stake';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { getColumns } from './columns';
import { CreateStake } from './create-stake';
import { DeleteStake } from './DeleteStake';
import { EditStake } from './edit-stake';

interface Props {
    stakes: Stake[];
    countries: any[]; // Deberías reemplazar any[] con el tipo correcto (Country[])
    users: any[]; // Deberías reemplazar any[] con el tipo correcto (User[])
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stakes',
        href: '/stakes',
    },
];

export default function StakesIndex({ stakes, countries, users }: Props) {
    const [editingStake, setEditingStake] = useState<Stake | null>(null);
    const [deletingStake, setDeletingStake] = useState<Stake | null>(null);

    const handleEdit = (stake: Stake) => {
        setEditingStake(stake);
    };

    const handleDelete = (stake: Stake) => {
        setDeletingStake(stake);
    };

    const columns = getColumns({
        countries,
        users,
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
                    <DataTable data={stakes} columns={columns} filterKey="name" />
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
