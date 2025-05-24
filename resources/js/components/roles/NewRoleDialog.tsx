import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface NewRoleDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    newRoleName: string;
    setNewRoleName: (name: string) => void;
    newRoleDescription: string;
    setNewRoleDescription: (description: string) => void;
    createNewRole: () => void;
}

const NewRoleDialog: React.FC<NewRoleDialogProps> = ({
    isOpen,
    setIsOpen,
    newRoleName,
    setNewRoleName,
    newRoleDescription,
    setNewRoleDescription,
    createNewRole,
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Role</DialogTitle>
                    <DialogDescription>
                        Define a new role and its permissions.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="roleName">Role Name</Label>
                        <Input
                            id="roleName"
                            value={newRoleName}
                            onChange={(e) => setNewRoleName(e.target.value)}
                            placeholder="e.g. Marketing Manager"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="roleDescription">Description</Label>
                        <Input
                            id="roleDescription"
                            value={newRoleDescription}
                            onChange={(e) => setNewRoleDescription(e.target.value)}
                            placeholder="Brief description of this role's purpose"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={createNewRole}>Create Role</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default NewRoleDialog;
