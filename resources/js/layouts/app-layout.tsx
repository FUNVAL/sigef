import Forbidden from '@/components/errors/forbidden';
import { MenuOption } from '@/components/globals/appbar';
import { SuccessAlert } from '@/components/globals/success-alert';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    menuOptions?: MenuOption[];
}

export default ({ children, breadcrumbs, menuOptions, ...props }: AppLayoutProps) => {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} menuOptions={menuOptions} {...props}>
            {children}
            <SuccessAlert />
            <Forbidden />
        </AppLayoutTemplate>
    )
};
