type Roles = {
    id: number;
    name: string;
    description: string;
    permissions: int[];
};

type CreateRoleForm = Omit<Roles, 'id' | 'permissions'>

type Permissions = {
    id: number;
    name: string;
    key: string;
    description: string;
    category: string;
}

type RolePermissionsProps = {
    roles: Roles[];
    permissions: {
        id: number;
        name: string;
        permissions: Permissions[];
    }[];
};

interface PermissionGroupProps {
    group: any;
    selectedPermissions: int[];
    handlePermissionToggle: (id: number) => void;
    handleAssignAll: (groupId: number) => void;
    handleUnassignAll: (groupId: number) => void;
    expandedGroupId?: number; // ID del grupo actualmente expandido
    onExpand: (groupId: number) => void; // Callback para notificar expansión
}

type RoleHeaderProps = {
    roles: Roles[];
    selectedRole: string;
    setSelectedRole: (role: string) => void;
    setIsNewRoleDialogOpen: (isOpen: boolean) => void;
}

export type { Roles, Permissions, RolePermissionsProps, PermissionGroupProps, RoleHeaderProps, CreateRoleForm };