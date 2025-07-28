import { ReactNode } from 'react';
import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}

type EnumItem = { id: number; name: string };

type Enums = {
    userStatus: EnumItem[];
    requestStatus: EnumItem[];
    attendanceStatus: EnumItem[];
    documentType: EnumItem[];
    gender: EnumItem[];
    maritalStatus: EnumItem[];
    courseModality: EnumItem[];
    statusEnum: EnumItem[];
    referenceStatus: EnumItem[];
    relatedReference: EnumItem[];
    jobType: EnumItem[];
};

type Stepper = {
    title: string;
    component: ReactNode;
}

type Translation = {
    welcome_disclaimer: {
        title: string;
        subtitle: string;
        program_description: string;
        motivation: string;
        privacy: string;
        accept_terms: string;
    };
    ui: {
        buttons: Record<string, string>
    };

    action_selection: {
        title: string;
        subtitle: string;
        referral: {
            title: string;
            description: string;
        },
        pre_inscription: {
            title: string;
            description: string;
        }
    };
    forms: {
        referral: {
            title: string;
            description: string;
            referrer_info: string;
            fields: {
                name: string;
                name_placeholder: string;
                gender: string;
                gender_placeholder: string;
                gender_select: string;
                age: string;
                country: string;
                phone: string;
                stake: string;
                referrer_name: string;
                referrer_phone: string;
                relationship: string;
            },
            overview: {
                title: string;
                fields: {
                    full_name: string;
                    gender: string;
                    age: string;
                    country: string;
                    phone: string;
                    stake: string;
                    referrer_name: string;
                    referrer_phone: string;
                    relationship: string;
                },
                buttons: {
                    sending: string;
                    submit: string;
                }
            }
        }
    }

}