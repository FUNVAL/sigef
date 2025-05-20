import { NavItem } from "@/types";
import { LayoutGrid, Settings } from "lucide-react";

export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Access Control',
        href: '/access-control',
        icon: Settings,
        roles: ['admin'],
    }
]; 
 