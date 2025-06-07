import React from 'react';

interface UnsavedChangesProps {
    unsavedChanges: number[];
    removedPermissions: number[];
    rolePermissionsData: any;
}

const UnsavedChanges: React.FC<UnsavedChangesProps> = ({
    unsavedChanges,
    removedPermissions,
    rolePermissionsData
}) => {

    console.log({removedPermissions, unsavedChanges, rolePermissionsData});

    return (
        <div className="border border-amber-200 rounded-md p-4 mt-6">
            <h3 className="flex items-center text-amber-800 font-medium mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-1.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                Unsaved Changes
            </h3>

            {removedPermissions.length > 0 && (
                <div className="mb-2">
                    <div className="text-red-600 text-sm mb-1 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                        Removed Permissions ({removedPermissions.length})
                    </div>
                    <div className="pl-5">
                        {removedPermissions.map(permKey => {
                            const perm = rolePermissionsData
                                .flatMap((g: { permissions: any[] }) => g.permissions)
                                .find((p: any) => p.id === permKey);
                            return perm ? (
                                <div key={permKey} className="text-sm text-gray-600">{perm.name}</div>
                            ) : null;
                        })}
                    </div>
                </div>
            )}

            {unsavedChanges.length > 0 && (
                <div>
                    <div className="text-green-600 text-sm mb-1 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        Added Permissions ({unsavedChanges.length})
                    </div>
                    <div className="pl-5">
                        {unsavedChanges.map(permKey => {
                            const perm = rolePermissionsData
                                .flatMap((g: { permissions: any[] }) => g.permissions)
                                .find((p: any) => p.id === permKey);
                            return perm ? (
                                <div key={permKey} className="text-sm text-gray-600">{perm.name}</div>
                            ) : null;
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UnsavedChanges;
