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
import { Head, usePage } from '@inertiajs/react';
import AccessControlLayout from '@/layouts/access-control/layout';
import { RolePermissionsProps, Roles } from '@/types/roles';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


export default function RolePermissions({ roles, permissions }: RolePermissionsProps) {
    const [selectedRole, setSelectedRole] = useState('1');
    const [newRoleName, setNewRoleName] = useState('');
    const [newRoleDescription, setNewRoleDescription] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
    const [isNewRoleDialogOpen, setIsNewRoleDialogOpen] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState<number[]>([]);
    const [removedPermissions, setRemovedPermissions] = useState<number[]>([]);
    // Nuevo estado para rastrear el grupo expandido, inicializado con el ID del primer grupo
    const [expandedGroupId, setExpandedGroupId] = useState<number | null>(1);

    const { flash } = usePage().props;

    React.useEffect(() => {

        setSelectedPermissions(getSelectedRolePermission(roles, selectedRole));
        setUnsavedChanges([]);
        setRemovedPermissions([]);
    }, [selectedRole]);

    const handleAssignAll = (groupId: number) => {
        const group = Object.values(permissions).find(g => g.id === groupId);
        if (!group) return;

        const newPermissions = [...selectedPermissions];
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
        setSelectedPermissions(prev => {
            if (prev.includes(id)) {
                const newState = [...prev,]
                const index = newState.indexOf(id);
                newState.splice(index, 1);
                setUnsavedChanges(prev => prev.filter(key => key !== id));
                setRemovedPermissions(prev => [...prev, id]);
                return newState;
            }
            else {
                const newState = [...prev, id]
                setUnsavedChanges(prev => [...prev, id]);
                setRemovedPermissions(prev => prev.filter(key => key !== id));
                return newState;
            }

        });
    };

    const handleUnassignAll = (groupId: number) => {
        const group = Object.values(permissions).find(g => g.id === groupId);
        if (!group) return;
        const newPermissions = [...selectedPermissions];
        let newUnsavedChanges = [...unsavedChanges];
        let newRemovedPermissions = [...removedPermissions];

        group.permissions.forEach(permission => {
            newPermissions.splice(newPermissions.indexOf(Number(permission.id)), 1);
            if (!newRemovedPermissions.includes(Number(permission.id))) {
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
        // Aquí iría la lógica para guardar los cambios en los permisos
        console.log('Saving changes for role:', selectedRole);
        console.log('Added permissions:', unsavedChanges);
        console.log('Removed permissions:', removedPermissions);

        // Después de guardar exitosamente:
        setUnsavedChanges([]);
        setRemovedPermissions([]);
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
    // Si hay grupos filtrados y el grupo expandido actual no está en la lista filtrada,
    // expandir el primer grupo de la lista filtrada si existe
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
                                    selectedPermissions={selectedPermissions}
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
                    {
                        (flash as { error?: string })?.error && (
                            <Alert variant="destructive" className="mt-4">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{(flash as { error?: string }).error}</AlertDescription>
                            </Alert>
                        )
                    }
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