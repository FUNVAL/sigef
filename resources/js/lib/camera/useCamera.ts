import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface CameraCapture {
    isSupported: boolean;
    isCapturing: boolean;
    error: string | null;
    videoRef: React.RefObject<HTMLVideoElement | null>;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    startCamera: () => Promise<void>;
    stopCamera: () => void;
    capturePhoto: () => Promise<File | null>;
    retakePhoto: () => void;
}

export function useCamera(): CameraCapture {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const [isCapturing, setIsCapturing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Check if camera is supported
    const isSupported = useCallback(() => {
        return !!(
            navigator.mediaDevices &&
            typeof navigator.mediaDevices.getUserMedia === 'function' &&
            window.HTMLCanvasElement &&
            HTMLCanvasElement.prototype.toBlob
        );
    }, []);

    // Start camera stream
    const startCamera = useCallback(async () => {
        if (!isSupported()) {
            setError('La cámara no está soportada en este dispositivo');
            return;
        }

        try {
            setError(null);
            setIsCapturing(true);

            const constraints = {
                video: {
                    facingMode: 'environment', // Preferir cámara trasera
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                },
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
            }
        } catch (err) {
            console.error('Error accessing camera:', err);
            setError('No se pudo acceder a la cámara. Verifique los permisos.');
            setIsCapturing(false);
        }
    }, []);

    // Stop camera stream
    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => {
                track.stop();
            });
            streamRef.current = null;
        }

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }

        setIsCapturing(false);
    }, []);

    // Capture photo from video stream
    const capturePhoto = useCallback((): Promise<File | null> => {
        return new Promise((resolve) => {
            const video = videoRef.current;
            const canvas = canvasRef.current;

            if (!video || !canvas) {
                resolve(null);
                return;
            }

            const context = canvas.getContext('2d');
            if (!context) {
                resolve(null);
                return;
            }

            // Set canvas dimensions to video dimensions
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Draw video frame to canvas
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert canvas to blob and then to File
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                        const file = new File([blob], `camera-photo-${timestamp}.jpg`, {
                            type: 'image/jpeg',
                            lastModified: Date.now(),
                        });
                        resolve(file);
                    } else {
                        resolve(null);
                    }
                },
                'image/jpeg',
                0.9,
            ); // 90% quality
        });
    }, []);

    // Retake photo (restart camera)
    const retakePhoto = useCallback(() => {
        startCamera();
    }, [startCamera]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, [stopCamera]);

    return {
        isSupported: isSupported(),
        isCapturing,
        error,
        videoRef,
        canvasRef,
        startCamera,
        stopCamera,
        capturePhoto,
        retakePhoto,
    };
}
