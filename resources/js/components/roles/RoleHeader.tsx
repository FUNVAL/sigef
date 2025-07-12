import React from 'react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users2, UserCircle, Plus } from 'lucide-react';
import { RoleHeaderProps, Roles } from '@/types/roles';



const RoleHeader: React.FC<RoleHeaderProps> = ({ 
    selectedRole,
    setSelectedRole,
    setIsNewRoleDialogOpen,
    roles
}) => { 
    
    return (
        <CardHeader>
            <div className="flex items-center mb-2 gap-4">
                <Users2 className="h-8 w-8 text-indigo-600" />
                <CardTitle className="text-xl font-semibold text-gray-200">Roles y Permisos</CardTitle>
            </div>
            <CardDescription className="text-gray-600">
                Administra los roles y permisos de los usuarios en el sistema. Selecciona un rol para ver y editar sus permisos.
            </CardDescription>

            <div className="flex items-center gap-4 mt-4">
                <div className="flex-1">
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                        <SelectTrigger className='h-12'>
                            <div className="flex items-center gap-2 py-1 ">
                                <UserCircle className="h-8 w-8 text-indigo-500 " />
                                <SelectValue placeholder="Select a role" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            {roles?.map((role:Roles) => (
                                <SelectItem key={role.id} value={role.id.toString()}>
                                    <div className="flex flex-col text-left">
                                        <span>{role.name}</span>
                                        <span className="text-xs text-gray-500">{role.description}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button 
                    variant="outline" 
                    className="shrink-0 h-12 cursor-pointer"
                    onClick={() => setIsNewRoleDialogOpen(true)}
                >
                    <Plus className="mr-2 h-4 w-4 text-indigo-500" />
                    Nuevo Rol
                </Button>
            </div>
        </CardHeader>
    );
};

export default RoleHeader;
