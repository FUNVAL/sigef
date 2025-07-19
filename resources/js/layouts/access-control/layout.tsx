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

type AccessControlLayoutProps = PropsWithChildren<{
    headings?: HeadingsProps;
}>;

export default function AccessControlLayout({ children, headings }: AccessControlLayoutProps) {
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <div className="px-4 py-2 relative">
            <div className="flex flex-col">
                {(headings?.title || headings?.description) && (
                    <>
                        <Heading
                            title={headings?.title ?? ''}
                            description={headings?.description ?? ''}
                            className='pl-6 pt-6 text-3xl'
                        />
                        <Separator className="my-6" />
                    </>
                )}
                <div className="flex-1 p-4 pb-6 ">
                    <section className="space-y-12 px-4 ">{children}</section>
                </div>
            </div>
        </div>
    );
}
