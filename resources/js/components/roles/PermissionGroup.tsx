import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import PermissionItem from './PermissionItem';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PermissionGroupProps } from '@/types/roles';



const PermissionGroup: React.FC<PermissionGroupProps> = ({
    group,
    selectedPermissions,
    handlePermissionToggle,
    handleAssignAll,
    handleUnassignAll,
    expandedGroupId,
    onExpand
}) => {
 
    const isExpanded = expandedGroupId === group.id;

    const toggleExpand = () => {
        if (!isExpanded) {
            onExpand(group.id);
        }
    }; 
    
    const assignedCount = group.permissions.filter((permission: { id: number }) => selectedPermissions.includes(permission.id)).length;
    const totalCount = group.permissions.length;
    return (
        <div className={`border rounded-md overflow-hidden ${isExpanded ? 'border-amber-200/50' : 'border-gray-600/50'}`}>
            <div
                className="p-4 border-b-2 cursor-pointer"
                onClick={toggleExpand}
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        {isExpanded ?
                            <ChevronUp className="text-indigo-500" size={20} /> :
                            <ChevronDown className="text-indigo-500" size={20} />
                        }
                        <div>
                            <h3 className="font-medium text-indigo-500">{group.name}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="hidden sm:block">
                            <div className="flex items-center">
                                <div className="w-32 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-600 rounded-full"
                                    style={{ width: `${(assignedCount / totalCount) * 100}%` }}
                                    />
                                </div>
                                <span className="ml-2 text-sm text-gray-600">{assignedCount} of {totalCount} assigned</span>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAssignAll(group.id);
                            }}
                            className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
                        >
                            Assign All
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleUnassignAll(group.id);
                            }}
                            className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
                        >
                            Unassign All
                        </Button>
                    </div>
                </div>
            </div>

            {/* Reemplazar el div condicionalmente renderizado con uno que siempre existe pero cambia sus clases */}
            <div
                className={`
                    divide-y overflow-hidden transition-all duration-300 ease-in-out
                    ${isExpanded
                        ? 'max-h-[2000px] opacity-100'
                        : 'max-h-0 opacity-0'
                    }
                `}
            >
                {group.permissions.map((permission: { id: number; key: string }) => (
                    <PermissionItem
                        key={permission.id}
                        permission={permission}
                        isChecked={selectedPermissions.includes(permission.id) || false}
                        onToggle={() => handlePermissionToggle(permission.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default PermissionGroup;
