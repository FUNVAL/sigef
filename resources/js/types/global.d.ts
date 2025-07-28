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
        buttons: Record<string, string>;
        labels: {
            yes: string;
            no: string;
            not_specified: string;
            full_time: string;
            part_time: string;
            years: string;
        };
        titles: Record<string, string>;
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
        pre_inscription: {
            title: string;
            description: string;
            fields: {
                first_name: string;
                middle_name: string;
                last_name: string;
                second_last_name: string;
                gender: string;
                age: string;
                phone: string;
                email: string;
                marital_status: string;
                served_mission: string;
                country: string;
                stake: string;
                currently_working: string;
                job_type_preference: string;
                available_full_time: string;
                course: string;
            },
            validation: {
                required: string;
                email: string;
                min_age: string;
                max_age: string;
                unique: string;
            }
        },
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
    },
    message_step: {
        redirecting: string;
        confirmation_title: string;
        confirmation_subtitle: string;
        back_to_home: string;
    }
}