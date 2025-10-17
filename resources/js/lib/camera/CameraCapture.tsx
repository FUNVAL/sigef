import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertCircle, Camera, Check, RotateCcw, X } from 'lucide-react';
import { useState } from 'react';
import { useCamera } from './useCamera';

interface CameraCaptureProps {
    isOpen: boolean;
    onClose: () => void;
    onCapture: (file: File) => void;
    title?: string;
    description?: string;
}

export function CameraCapture({
    isOpen,
    onClose,
    onCapture,
    title = 'Capturar Foto',
    description = 'Apunte la cámara hacia el documento y capture una foto clara',
}: CameraCaptureProps) {
    const { isSupported, isCapturing, error, videoRef, canvasRef, startCamera, stopCamera, capturePhoto, retakePhoto } = useCamera();

    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Start camera when dialog opens
    const handleOpenCamera = async () => {
        if (isSupported) {
            await startCamera();
        }
    };

    // Handle photo capture
    const handleCapturePhoto = async () => {
        setIsProcessing(true);
        try {
            const file = await capturePhoto();
            if (file) {
                const photoUrl = URL.createObjectURL(file);
                setCapturedPhoto(photoUrl);
                stopCamera();
            }
        } catch (err) {
            console.error('Error capturing photo:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    // Handle photo confirmation
    const handleConfirmPhoto = async () => {
        if (capturedPhoto) {
            setIsProcessing(true);
            try {
                // Convert the captured photo back to file
                const response = await fetch(capturedPhoto);
                const blob = await response.blob();
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const file = new File([blob], `camera-photo-${timestamp}.jpg`, {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                });

                onCapture(file);
                handleClose();
            } catch (err) {
                console.error('Error processing photo:', err);
            } finally {
                setIsProcessing(false);
            }
        }
    };

    // Handle retake photo
    const handleRetakePhoto = () => {
        if (capturedPhoto) {
            URL.revokeObjectURL(capturedPhoto);
            setCapturedPhoto(null);
        }
        retakePhoto();
    };

    // Handle dialog close
    const handleClose = () => {
        stopCamera();
        if (capturedPhoto) {
            URL.revokeObjectURL(capturedPhoto);
            setCapturedPhoto(null);
        }
        onClose();
    };

    if (!isSupported) {
        return (
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-amber-500" />
                            Cámara no disponible
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            La funcionalidad de cámara no está soportada en este dispositivo o navegador. Por favor, seleccione un archivo desde su
                            galería.
                        </p>
                        <Button onClick={handleClose} className="w-full bg-[rgb(46_131_242_/1)] text-white hover:bg-[rgb(46_131_242_/1)]/90">
                            Entendido
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] max-w-2xl overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Camera className="h-5 w-5" />
                        {title}
                    </DialogTitle>
                    {description && <p className="text-sm text-gray-600">{description}</p>}
                </DialogHeader>

                <div className="space-y-4">
                    {error && (
                        <Card className="border-red-200 bg-red-50">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 text-red-700">
                                    <AlertCircle className="h-4 w-4" />
                                    <span className="text-sm">{error}</span>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {!isCapturing && !capturedPhoto && !error && (
                        <div className="space-y-4 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                <Camera className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-600">Haga clic en "Iniciar Cámara" para comenzar a capturar</p>
                            <Button onClick={handleOpenCamera} className="w-full bg-[rgb(46_131_242_/1)] text-white hover:bg-[rgb(46_131_242_/1)]/90">
                                <Camera className="mr-2 h-4 w-4" />
                                Iniciar Cámara
                            </Button>
                        </div>
                    )}

                    {isCapturing && !capturedPhoto && (
                        <div className="space-y-4">
                            <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
                                <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
                                <div className="pointer-events-none absolute inset-0 rounded-lg border-2 border-white/50" />
                                <div className="pointer-events-none absolute inset-4 rounded-lg border border-white/30" />
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" onClick={handleClose} className="flex-1">
                                    <X className="mr-2 h-4 w-4" />
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={handleCapturePhoto}
                                    disabled={isProcessing}
                                    className="flex-1 bg-[rgb(46_131_242_/1)] text-white hover:bg-[rgb(46_131_242_/1)]/90 disabled:bg-gray-300"
                                >
                                    <Camera className="mr-2 h-4 w-4" />
                                    {isProcessing ? 'Capturando...' : 'Capturar Foto'}
                                </Button>
                            </div>
                        </div>
                    )}

                    {capturedPhoto && (
                        <div className="space-y-4">
                            <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
                                <img src={capturedPhoto} alt="Foto capturada" className="h-full w-full object-cover" />
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" onClick={handleRetakePhoto} className="flex-1">
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Repetir
                                </Button>
                                <Button
                                    onClick={handleConfirmPhoto}
                                    disabled={isProcessing}
                                    className="flex-1 bg-[rgb(46_131_242_/1)] text-white hover:bg-[rgb(46_131_242_/1)]/90 disabled:bg-gray-300"
                                >
                                    <Check className="mr-2 h-4 w-4" />
                                    {isProcessing ? 'Procesando...' : 'Usar Esta Foto'}
                                </Button>
                            </div>
                        </div>
                    )}

                    <canvas ref={canvasRef} className="hidden" />
                </div>
            </DialogContent>
        </Dialog>
    );
}
