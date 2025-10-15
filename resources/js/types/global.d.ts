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
    missionStatus: EnumItem[];
    courseModality: EnumItem[];
    statusEnum: EnumItem[];
    referenceStatus: EnumItem[];
    relatedReference: EnumItem[];
    jobType: EnumItem[];
    baptismStatus: EnumItem[];
    templeStatus: EnumItem[];
    educationLevel: EnumItem[];
    englishConnectLevel: EnumItem[];
    familyRelationship: EnumItem[];
    deviceType: EnumItem[];
    housingType: EnumItem[];
    employmentType: EnumItem[];
    jobPosition: EnumItem[];
    workSchedule: EnumItem[];
    bonusCategory: EnumItem[];
    practiceBonusCategory: EnumItem[];
    expenseType: EnumItem[];
    internetAccessPlan: EnumItem[];
};

type Stepper = {
    title: string;
    component: ReactNode;
};

type Translation = {
    welcome_disclaimer: {
        title: string;
        subtitle: string;
        program_description: {
            title: string;
            description: string;
        };
        motivation: string;
        privacy: {
            title: string;
            description: string;
        };
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
            country: string;
        };
        titles: Record<string, string>;
    };

    action_selection: {
        title: string;
        subtitle: string;
        referral: {
            title: string;
            description: string;
        };
        pre_inscription: {
            title: string;
            description: string;
        };
    };

    forms: {
        pre_inscription: {
            title: string;
            description: string;
            overview: {
                title: string;
                subtitle: string;
                fields: {
                    first_name: string;
                    middle_name: string;
                    last_name: string;
                    second_last_name: string;
                    gender: string;
                    age: string;
                    country: string;
                    phone: string;
                    additional_phone: string;
                    stake: string;
                    email: string;
                    marital_status: string;
                    served_mission: string;
                    currently_working: string;
                    job_type_preference: string;
                    available_full_time: string;
                };
                buttons: {
                    sending: string;
                    submit: string;
                };
            };
            course_selection: {
                title: string;
                description: string;
                selected_course: string;
                selection_confirmation: string;
                duration: string;
            };
            female_filter: {
                title: string;
                description: string;
                currently_working: string;
                job_type_preference: string;
                available_full_time: string;
                answers: {
                    working_yes: string;
                    working_no: string;
                    availability_yes: string;
                    availability_no: string;
                };
            };
            fields: {
                first_name: string;
                middle_name: string;
                last_name: string;
                second_last_name: string;
                gender: string;
                age: string;
                phone: string;
                additional_phone: string;
                email: string;
                marital_status: string;
                served_mission: string;
                country: string;
                stake: string;
                currently_working: string;
                job_type_preference: string;
                available_full_time: string;
                course: string;
            };
            validation: {
                required: string;
                email: string;
                min_age: string;
                max_age: string;
                unique: string;
            };
        };
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
            };
            overview: {
                title: string;
                fields: {
                    referral_info: string;
                    full_name: string;
                    gender: string;
                    age: string;
                    country: string;
                    phone: string;
                    stake: string;
                    referrer_info: string;
                    referrer_name: string;
                    referrer_phone: string;
                    relationship: string;
                };
                buttons: {
                    sending: string;
                    submit: string;
                };
            };
        };
    };

    stepper: {
        conditions: string;
        options: string;
        form: string;
        overview: string;
        confirmation: string;
        requirements: string;
        courses: string;
    };

    message_step: {
        redirecting: string;
        confirmation_title: string;
        confirmation_subtitle: string;
        back_to_home: string;
    };

    student_registration: {
        form: {
            title: string;
            subtitle: string;
        };
        steps: {
            personal_information: {
                title: string;
                subtitle: string;
            };
            required_documents: {
                title: string;
                subtitle: string;
            };
            religious_information: {
                title: string;
                subtitle: string;
            };
            academic_information: {
                title: string;
                subtitle: string;
            };
        };
        sections: {
            names_surnames: string;
            birth_gender: string;
            location: string;
            contact_info: string;
            document_info: string;
            document_photos: string;
            additional_documents: string;
            formal_photo: string;
            church_membership: string;
            missionary_service: string;
            temple_ordinances: string;
            ecclesiastical_info: string;
            education_background: string;
            course_selection: string;
            english_proficiency: string;
        };
        fields: {
            first_name: string;
            middle_name: string;
            last_name: string;
            second_last_name: string;
            birth_date: string;
            age: string;
            gender: string;
            country: string;
            marital_status: string;
            email: string;
            phone: string;
            recruiter_name: string;
            home_location_link: string;
            document_type: string;
            document_number: string;
            id_front_photo: string;
            id_back_photo: string;
            driver_license: string;
            utility_bill_photo: string;
            formal_photo: string;
            is_active_member: string;
            member_certificate_number: string;
            baptism_year: string;
            is_returned_missionary: string;
            mission_served: string;
            mission_end_year: string;
            temple_status: string;
            current_calling: string;
            stake: string;
            ward_branch: string;
            education_level: string;
            course: string;
            english_connect_level: string;
        };
        placeholders: {
            first_name: string;
            middle_name: string;
            last_name: string;
            second_last_name: string;
            select_gender: string;
            select_country: string;
            select_marital_status: string;
            email: string;
            phone: string;
            recruiter_name: string;
            home_location_link: string;
            age_automatic: string;
            select_document_type: string;
            document_number: string;
            upload_id_front: string;
            upload_id_back: string;
            upload_driver_license: string;
            upload_utility_bill: string;
            upload_formal_photo: string;
            member_certificate_number: string;
            baptism_year: string;
            mission_served: string;
            mission_end_year: string;
            select_temple_status: string;
            current_calling: string;
            select_stake: string;
            ward_branch: string;
            select_education_level: string;
            select_course: string;
            select_english_level: string;
        };
        validation: {
            first_name_required: string;
            last_name_required: string;
            birth_date_required: string;
            gender_required: string;
            country_required: string;
            marital_status_required: string;
            email_required: string;
            phone_required: string;
            document_type_required: string;
            document_number_required: string;
            id_front_photo_required: string;
            id_back_photo_required: string;
            utility_bill_photo_required: string;
            formal_photo_required: string;
            is_active_member_required: string;
            is_returned_missionary_required: string;
            temple_status_required: string;
            stake_required: string;
            education_level_required: string;
            course_required: string;
            english_connect_level_required: string;
        };
        required: string;
        optional: string;
        info_text: {
            upload_requirements: string;
            formal_photo_requirements: string;
            document_security: string;
            age_calculation: string;
            optional_fields: string;
        };
        file_upload: {
            drag_drop: string;
            browse_files: string;
            file_selected: string;
            remove_file: string;
            upload_progress: string;
            upload_success: string;
            upload_error: string;
        };
        confirmation: {
            verify_info: string;
            terms_acceptance: string;
            submit_form: string;
            processing: string;
        };
    };
};

type PaginationData = {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
};
