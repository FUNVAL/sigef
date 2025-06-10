import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

type HeadingsProps = {
    title: string;
    description: string;
    className?: string;
};

const sidebarNavItems: NavItem[] = [
    {
        title: 'Accesos',
        href: '/access-control',
        icon: null,
    },
    {
        title: 'Usuarios',
        href: '/access-control/users',
        icon: null,
    },
];

type AccessControlLayoutProps = PropsWithChildren<{
    headings?: HeadingsProps;
}>;

export default function AccessControlLayout({ children, headings }: AccessControlLayoutProps) {
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = (window.location.pathname).split('/').slice(0, 3).join('/');

    return (
        <div className="px-4 py-2">
            <div className="flex flex-col">
                <nav className="flex space-x-2  justify-end py-2">
                    {sidebarNavItems.map((item, index) => (
                        <Button
                            key={`${item.href}-${index}`}
                            size="sm"
                            variant="ghost"
                            asChild
                            className={cn('justify-start', {
                                'bg-muted': currentPath === item.href,
                            })}
                        >
                            <Link href={item.href} prefetch>
                                {item.title}
                            </Link>
                        </Button>
                    ))}
                </nav>
                <Heading
                    title={headings?.title ?? ''}
                    description={headings?.description ?? ''}
                    className={headings?.className ?? 'mb-4'}
                />
                <Separator className="my-6 md:hidden" />
                <div className="flex-1">
                    <section className="space-y-12 px-4">{children}</section>
                </div>
            </div>
        </div>
    );
}
