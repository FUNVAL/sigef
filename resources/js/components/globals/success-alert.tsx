import { useState, useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SuccessAlertProps {
    /**
     * Tiempo en milisegundos antes de que la alerta se cierre automáticamente
     * @default 5000 (5 segundos)
     */
    autoCloseTime?: number;

    /**
     * Clases adicionales para personalizar la apariencia
     */
    className?: string;
}

export function SuccessAlert({
    autoCloseTime = 5000,
    className
}: SuccessAlertProps) {
    const { flash } = usePage().props;
    const successMessage = (flash as { success?: string })?.success;

    const [visible, setVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Función para manejar el cierre con animación
    const handleClose = () => {
        setIsExiting(true);

        // Esperar a que termine la animación antes de ocultar completamente
        exitTimeoutRef.current = setTimeout(() => {
            setVisible(false);
            setIsExiting(false);
        }, 300); // Duración de la animación de salida
    };

    useEffect(() => {
        // Mostrar la alerta cuando hay un mensaje de éxito
        if (successMessage) {
            setIsExiting(false);
            setVisible(true);

            // Configurar el temporizador para cerrar automáticamente
            const timer = setTimeout(() => {
                handleClose();
            }, autoCloseTime);

            // Limpiar el temporizador cuando el componente se desmonte o cuando cambie el mensaje
            return () => {
                clearTimeout(timer);
                if (exitTimeoutRef.current) {
                    clearTimeout(exitTimeoutRef.current);
                }
            };
        }
    }, [successMessage, autoCloseTime]);

    // Si no hay mensaje o no es visible, no renderizar nada
    if (!successMessage || (!visible && !isExiting)) {
        return null;
    }

    return (
        <Alert
            variant="default"
            className={cn(
                "fixed top-4 right-4 z-50 w-full max-w-lg bg-green-600/30 border-green-500 shadow-lg transition-all duration-300",
                isExiting
                    ? "opacity-0 translate-y-[-10px] slide-out-to-top"
                    : "opacity-100 translate-y-0 animate-in slide-in-from-top-5 duration-500",
                className
            )}
        >
            <CheckCheck />

            <AlertTitle className="text-gray-200 font-medium">Operación exitosa</AlertTitle>
            <AlertDescription className="text-gray-400">
                {successMessage}
            </AlertDescription>

            <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 rounded-full hover:bg-green-500/20 absolute top-2 right-2"
                onClick={handleClose}
            >
                <X className="h-4 w-4" />
                <span className="sr-only">Cerrar</span>
            </Button>
        </Alert>
    );
}