import React from 'react';
import { Switch } from '@/components/ui/switch';

interface PermissionItemProps {
    permission: any;
    isChecked: boolean;
    onToggle: () => void;
}

const PermissionItem: React.FC<PermissionItemProps> = ({
    permission,
    isChecked,
    onToggle
}) => {
    return (
        <div className="flex items-center justify-between p-4 hover:bg-gray-50/5">
            <div>
                <div className="font-medium text-indigo-600">{permission.name}</div>
                <div className="text-sm text-gray-500">{permission.description}</div>
                <div className="mt-1">
                    <code className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{permission.key}</code>
                </div>
            </div>
            <Switch
                checked={isChecked}
                onCheckedChange={onToggle}
                className="data-[state=checked]:bg-indigo-600"
            />
        </div>
    );
};

export default PermissionItem;
