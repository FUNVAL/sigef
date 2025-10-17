import { useState } from 'react';

export interface FileInputWithCamera {
    showCamera: boolean;
    openCamera: () => void;
    closeCamera: () => void;
    handleCameraCapture: (file: File) => void;
    handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface UseFileInputWithCameraProps {
    onFileChange: (file: File | null) => void;
    accept?: string;
}

export function useFileInputWithCamera({ onFileChange, accept = 'image/*' }: UseFileInputWithCameraProps): FileInputWithCamera {
    const [showCamera, setShowCamera] = useState(false);

    const openCamera = () => {
        setShowCamera(true);
    };

    const closeCamera = () => {
        setShowCamera(false);
    };

    const handleCameraCapture = (file: File) => {
        onFileChange(file);
        closeCamera();
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onFileChange(file);
    };

    return {
        showCamera,
        openCamera,
        closeCamera,
        handleCameraCapture,
        handleFileSelect,
    };
}
