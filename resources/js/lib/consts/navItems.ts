import { NavItem } from '@/types';
import { BookOpen, LayoutGrid, ListPlus, Notebook, Shield, Globe, Church } from 'lucide-react';

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
        href: '/references/dashboard',
        icon: Notebook,
        permissions: ['reference:view', 'reference:edit', 'reference:update'],
    },
    {
        title: 'Preinscripciones',
        href: '/pre-inscription/dashboard',
        icon: ListPlus,
        permissions: ['pre-inscription:update', 'pre-inscription:edit', 'pre-inscription:view'],
    },
    {
        title: 'Stakes',
        href: '/stakes',
        icon: Church,
        permissions: ['stake:view', 'stake:create', 'stake:edit', 'stake:delete'],
<<<<<<< HEAD
    },{
=======
    },
    {
>>>>>>> 534aaf58bb875b7df3840550a04846f1b29b41f3
        title: 'Paises',
        href: '/countries',
        icon: Globe,
        permissions: ['country:view', 'country:create', 'country:edit', 'country:delete'],
    }

];

export const getNavItems = (userPermissions: string[]): NavItem[] => {
    return mainNavItems.filter((item) => {
        if (!item.permissions) return true;
        return item.permissions.some((permission) => userPermissions.includes(permission));
    });
};
