import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { XCircle } from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface ForbiddenModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    message?: string;
}

export default function Forbidden({ open: controlledOpen, onOpenChange, message }: Partial<ForbiddenModalProps> = {}) {
    const { flash } = usePage().props;
    const forbiddenMessage = message || (flash as { errors?: { forbidden: string } })?.errors?.forbidden;
    const [open, setOpen] = React.useState(!!forbiddenMessage);

    useEffect(() => {
        setOpen(!!forbiddenMessage);
    }, [forbiddenMessage]);

    // Permitir control externo o interno del estado open
    const isOpen = controlledOpen !== undefined ? controlledOpen : open;
    const handleOpenChange = onOpenChange || setOpen;

    if (!forbiddenMessage) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent
                className="max-w-3xl w-full h-[90vh] flex bg-gray-50 p-0 border-none shadow-none rounded-xl"
                style={{ maxHeight: '90vh' }}
            >
                <div className="w-full h-full flex items-center justify-center px-10">
                    <div className="bg-white shadow-lg rounded-lg p-10 text-center w-full max-w-lg mx-auto flex flex-col items-center">
                        <div className="mb-6 flex flex-col items-center">
                            <XCircle className="text-red-500 mb-2" size={64} />
                            <div className="text-6xl font-bold text-red-500 mb-2">403</div>
                            <DialogTitle className="text-2xl font-semibold text-gray-800 mb-4">
                                Acceso Denegado
                            </DialogTitle>
                            <DialogDescription className="text-gray-600 mb-6">
                                {forbiddenMessage || 'No tienes permiso para realizar esta acción.'}
                            </DialogDescription>
                        </div>
                        <div className="space-y-3 w-full">
                            <a
                                href={route('dashboard')}
                                className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 text-center"
                            >
                                Ir al Dashboard
                            </a>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}