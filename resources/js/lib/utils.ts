import { Roles } from '@/types/roles';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


export function validateRole(roles: Roles[], allowedRole: String): boolean {
    return roles.some((r) => r.name === allowedRole)
}