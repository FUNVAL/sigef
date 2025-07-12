import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6 text-black dark:bg-[#124463] dark:text-white">
            <div className="w-full max-w-sm rounded-2xl bg-white px-6 py-10 shadow-md dark:bg-[#043959] dark:shadow-2xl">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <picture className="mb-4">
                                <source srcSet="/Azul_logo.jpg" media="(prefers-color-scheme: dark)" />
                                <img src="/Sinfondo.png" alt="Logo" className="h-16 object-contain" />
                            </picture>
                            <span className="sr-only">{title}</span>
                        </Link>
                        {title && (
                            <div className="space-y-2 text-center">
                                <h1 className="text-xl font-semibold">{title}</h1>
                                {description && <p className="text-muted-foreground text-sm">{description}</p>}
                            </div>
                        )}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
