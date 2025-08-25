import { Enums } from '@/types/global';
import { Roles } from '@/types/roles';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


export function validateRole(roles: Roles[], allowedRole: String): boolean {
    return roles.some((r) => r.name === allowedRole)
}

export const filterReferenceStatus = (enums: Enums, status: number) => {
    switch (status) {
        case 1:
            return enums.referenceStatus.slice(-3);
        case 3:
            return enums.referenceStatus.slice(0, -3);
        default:
            return enums.referenceStatus;
    }
}