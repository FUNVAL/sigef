import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Terminal } from 'lucide-react';

// Importar componentes nuevos
import RoleHeader from '@/components/roles/RoleHeader';
import NewRoleDialog from '@/components/roles/NewRoleDialog';
import PermissionGroup from '@/components/roles/PermissionGroup';
import UnsavedChanges from '@/components/roles/UnsavedChanges';
import ActionFooter from '@/components/roles/ActionFooter';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import AccessControlLayout from '@/layouts/access-control/layout';
import { RolePermissionsProps, Roles } from '@/types/roles';


export default function RolePermissions({ roles, permissions }: RolePermissionsProps) {
    const [selectedRole, setSelectedRole] = useState('1');
    const [newRoleName, setNewRoleName] = useState('');
    const [newRoleDescription, setNewRoleDescription] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isNewRoleDialogOpen, setIsNewRoleDialogOpen] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState<number[]>([]);
    const [removedPermissions, setRemovedPermissions] = useState<number[]>([]);
    // Nuevo estado para rastrear el grupo expandido, inicializado con el ID del primer grupo
    const [expandedGroupId, setExpandedGroupId] = useState<number | null>(1);

    const { data, setData, put, processing, errors, reset } = useForm<{ permissions: number[] }>({
        permissions: [],
    });
    function setSelectedPermissions(permissions: number[]) {
        setData('permissions', permissions);
    }
    React.useEffect(() => {

        setSelectedPermissions(getSelectedRolePermission(roles, selectedRole));
        setUnsavedChanges([]);
        setRemovedPermissions([]);
    }, [selectedRole]);

    const handleAssignAll = (groupId: number) => {
        const group = Object.values(permissions).find(g => g.id === groupId);
        if (!group) return;

        const newPermissions = [...data.permissions];
        let newUnsavedChanges = [...unsavedChanges];
        let newRemovedPermissions = [...removedPermissions];

        group.permissions.forEach(permission => {
            newPermissions.push(Number(permission.id));
            if (!newUnsavedChanges.includes(Number(permission.id))) {
                newUnsavedChanges.push(Number(permission.id));
            }
            newRemovedPermissions = newRemovedPermissions.filter(key => key !== Number(permission.id));
        });

        setSelectedPermissions(newPermissions);
        setUnsavedChanges(newUnsavedChanges);
        setRemovedPermissions(newRemovedPermissions);
    };

    const handlePermissionToggle = (id: number) => {
        let newPermissions: number[];
        if (data.permissions.includes(id)) {
            newPermissions = data.permissions.filter(pid => pid !== id);
            setUnsavedChanges(prev => prev.filter(key => key !== id));
            setRemovedPermissions(prev => [...prev, id]);
        } else {
            newPermissions = [...data.permissions, id];
            setUnsavedChanges(prev => [...prev, id]);
            setRemovedPermissions(prev => prev.filter(key => key !== id));
        }
        setSelectedPermissions(newPermissions);
    };

    const handleUnassignAll = (groupId: number) => {
        const group = Object.values(permissions).find(g => g.id === groupId);
        if (!group) return;
        const newPermissions = [...data.permissions];
        let newUnsavedChanges = [...unsavedChanges];
        let newRemovedPermissions = [...removedPermissions];

        group.permissions.forEach(permission => {
            const included = newPermissions.includes(Number(permission.id));
            included &&
                newPermissions.splice(newPermissions.indexOf(Number(permission.id)), 1);
            if (!newRemovedPermissions.includes(Number(permission.id)) && included) {
                newRemovedPermissions.push(Number(permission.id));
            }
            newUnsavedChanges = newUnsavedChanges.filter(id => id !== Number(permission.id));

        });

        setSelectedPermissions(newPermissions);
        setUnsavedChanges(newUnsavedChanges);
        setRemovedPermissions(newRemovedPermissions);
    };

    const createNewRole = () => {
        // Aquí iría la lógica para crear un nuevo rol en la base de datos
        console.log('Creating new role:', { name: newRoleName, description: newRoleDescription });
        setIsNewRoleDialogOpen(false);
        setNewRoleName('');
        setNewRoleDescription('');
    };

    const saveChanges = () => {
        put(route('access.permissions.update', selectedRole), {
            onSuccess: () => {
                // Resetear estados después de guardar exitosamente
                setUnsavedChanges([]);
                setRemovedPermissions([]);
            }
        });
    };

    // Filtrar los grupos de permisos según el término de búsqueda
    function getFilteredPermissionGroups(searchTerm: string) {
        if (!searchTerm) return Object.values(permissions);
        return Object.values(permissions)
            .map(group => ({
                ...group,
                permissions: group.permissions.filter(perm =>
                    perm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    perm.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
            }))
            .filter(group => group.permissions.length > 0);
    }

    const filteredPermissionGroups = getFilteredPermissionGroups(searchTerm);

    React.useEffect(() => {
        if (filteredPermissionGroups.length > 0) {
            const expandedGroupExists = filteredPermissionGroups
                .some(group => group.id === expandedGroupId);
            if (!expandedGroupExists) {
                setExpandedGroupId(filteredPermissionGroups[0].id);
            }
        } else {
            setExpandedGroupId(null);
        }
    }, [filteredPermissionGroups, expandedGroupId]);


    // Función para manejar la expansión de grupos
    const handleGroupExpand = (groupId: number) => {
        setExpandedGroupId(groupId);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Control de accesos" />
            <AccessControlLayout>
                <div className="container mx-auto  max-w-6xl">
                    <Card className="shadow-md">
                        <RoleHeader
                            roles={roles}
                            selectedRole={selectedRole}
                            setSelectedRole={setSelectedRole}
                            setIsNewRoleDialogOpen={setIsNewRoleDialogOpen}
                        />

                        <div className="px-6 pb-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                <Input
                                    placeholder="Search permissions..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <CardContent className="space-y-6">

                            {filteredPermissionGroups.map((group, index) => (
                                <PermissionGroup
                                    key={group.id}
                                    group={group}
                                    selectedPermissions={data.permissions}
                                    handlePermissionToggle={handlePermissionToggle}
                                    handleAssignAll={handleAssignAll}
                                    handleUnassignAll={handleUnassignAll}
                                    expandedGroupId={expandedGroupId || undefined}
                                    onExpand={handleGroupExpand}
                                />
                            ))}

                            {(unsavedChanges.length > 0 || removedPermissions.length > 0) && (
                                <UnsavedChanges
                                    unsavedChanges={unsavedChanges}
                                    removedPermissions={removedPermissions}
                                    rolePermissionsData={Object.values(permissions)}
                                />
                            )}
                        </CardContent>

                        {(unsavedChanges.length > 0 || removedPermissions.length > 0) && (
                            <ActionFooter saveChanges={saveChanges} />
                        )}
                    </Card>

                    <NewRoleDialog
                        isOpen={isNewRoleDialogOpen}
                        setIsOpen={setIsNewRoleDialogOpen}
                        newRoleName={newRoleName}
                        setNewRoleName={setNewRoleName}
                        newRoleDescription={newRoleDescription}
                        setNewRoleDescription={setNewRoleDescription}
                        createNewRole={createNewRole}
                    />
                </div>
            </AccessControlLayout>
        </AppLayout>

    );
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Control de Accesos',
        href: '/access-control',
    },
];

function getSelectedRolePermission(roles: Roles[], selectedRole: string): any {
    return roles.find(role => role.id === parseInt(selectedRole))?.permissions || [];
}