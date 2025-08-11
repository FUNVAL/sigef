import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { Roles } from './roles';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    permissions?: string[]; // Optional property to specify roles
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    firstname: string;
    middle_name: string;
    lastname: string;
    second_lastname: string;
    fullname: string;
    email: string;
    gender: string;
    document_type: string;
    document_number: string;
    birth_date: string;
    marital_status: string;
    address: string;
    contact_phone_1: string;
    contact_phone_2: string;
    permissions: string[];
    roles: Roles[];
    user_permissions: string[];
    user_roles: string[];
    status: {
        id: number;
        name: string;
    };
}

// Re-exportaciones de tipos centralizados
export * from './common';
export * from './dashboard';
export * from './pre-inscription';
export * from './reference';
export * from './course';
export * from './country';
export * from './stake';
