import { NavItem } from '@/types';
import { BookOpen, LayoutGrid, ListPlus, Notebook, Shield } from 'lucide-react';

export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Access Control',
        href: '/access-control',
        icon: Shield,
        permissions: ['user:view', 'user:create', 'user:edit', 'user:delete', 'role:view', 'role:create', 'role:edit', 'role:delete'],
    },
    {
        title: 'Cursos',
        href: '/courses',
        icon: BookOpen,
        permissions: ['course:view', 'course:create', 'course:edit', 'course:delete'],
    },
    {
        title: 'Referencias',
        href: '/references',
        icon: Notebook,
        permissions: ['reference:view', 'reference:edit', 'reference:update']
    },
    {
        title: 'Pre-Inscripciones',
        href: '/pre-inscription',
        icon: ListPlus,
        permissions: ['pre-inscription:update', 'pre-inscription:edit', 'pre-inscription:view'],
    }
];

export const getNavItems = (userPermissions: string[]): NavItem[] => {
    return mainNavItems.filter((item) => {
        if (!item.permissions) return true;
        return item.permissions.some((permission) => userPermissions.includes(permission));
    });
};
