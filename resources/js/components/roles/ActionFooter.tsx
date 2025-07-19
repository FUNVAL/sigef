import React from 'react';
import { Button } from '@/components/ui/button';

interface ActionFooterProps {
    saveChanges: () => void;
}

const ActionFooter: React.FC<ActionFooterProps> = ({ saveChanges }) => {
    return (
        <div className="p-4 flex justify-end gap-2 border-t">
            <Button variant="outline" className='cursor-pointer'>Cancel</Button>
            <Button onClick={saveChanges} className='cursor-pointer'>Save Changes</Button>
        </div>
    );
};

export default ActionFooter;
