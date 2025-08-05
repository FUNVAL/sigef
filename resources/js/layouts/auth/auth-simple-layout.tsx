import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100 p-6 text-black">
            <div className="w-120 rounded-2xl px-8 py-10 bg-white/80 border border-blue-100 shadow-2xl"> 
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <picture className="mb-4">
                                <source srcSet="/Sinfondo.png" />
                                <img src="/Sinfondo.png" alt="Logo" className="h-16 object-contain drop-shadow-md" />
                            </picture>
                            <span className="sr-only">{title}</span>
                        </Link>
                        {title && (
                            <div className="space-y-2 text-center">
                                <h1 className="text-2xl font-bold text-blue-700">{title}</h1>
                                {description && <p className="text-blue-600 text-sm font-medium">{description}</p>}
                            </div>
                        )}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
