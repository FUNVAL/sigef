import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePage } from '@inertiajs/react';
import { Home, ShieldX } from 'lucide-react';
import React, { useEffect } from 'react';

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
            <DialogContent className="mx-auto max-w-lg border-0 bg-transparent p-0 shadow-none">
                <Card className="border-destructive/20 shadow-xl">
                    <CardContent className="p-12 text-center">
                        <DialogHeader className="space-y-8">
                            {/* Icono y código de error */}
                            <div className="flex flex-col items-center space-y-6">
                                <div className="relative">
                                    <div className="bg-destructive/10 absolute inset-0 rounded-full blur-xl" />
                                    <ShieldX className="text-destructive relative h-20 w-20" />
                                </div>
                                <div className="text-destructive text-6xl font-bold tabular-nums">403</div>
                            </div>

                            {/* Título y descripción */}
                            <div className="space-y-4">
                                <DialogTitle className="text-foreground text-center text-4xl font-semibold">Acceso Denegado</DialogTitle>
                                <DialogDescription className="text-muted-foreground mx-auto max-w-md text-lg leading-relaxed">
                                    {forbiddenMessage || 'No tienes permiso para realizar esta acción.'}
                                </DialogDescription>
                            </div>
                        </DialogHeader>

                        {/* Botón de acción */}
                        <div className="mt-10">
                            <Button asChild className="w-full" size="lg">
                                <a href={route('dashboard')}>
                                    <Home className="mr-2 h-5 w-5" />
                                    Ir al Dashboard
                                </a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}
