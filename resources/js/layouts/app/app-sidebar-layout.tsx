import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { MenuOption } from '@/components/globals/appbar';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [], menuOptions }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[], menuOptions?: MenuOption[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} menuOptions={menuOptions} />
                {children}
            </AppContent>
        </AppShell>
    );
}
