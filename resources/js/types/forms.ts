// Tipos básicos
export interface Country {
  name: string;
  code: string;
}

export interface Stake {
    id: number;
    name: string;
}

export interface ReferralFormData {
    name: string;
    gender: string;
    age: string;
    country_id: string;
    phone: string;
    stake_id: string;
    referrer_name: string;
    referrer_phone: string;
    referrer_relationship: string;
}

export interface PreRegistrationFormData {
    first_name: string;
    middle_name: string;
    last_name: string;
    second_last_name: string;
    gender: string;
    age: string;
    country_id: string;
    phone: string;
    stake_id: string;
    email: string;
    marital_status: string;
    served_mission: string;
    selected_course?: string;
    // Campos que vienen del filtro anterior (FemaleFilterStep)
    estaTrabajando?: string;
    tipoEmpleoDeseado?: string;
    disponibilidadHorario?: string;
    // Campos mapeados para el backend
    currently_working?: string;
    job_type_preference?: string;
    availability?: string;
}

export interface Course {
    name: string;
    duration: string;
    modality: string;
}

// Datos usando los tipos definidos
export const countries: Country[] = [
    { name: 'Argentina', code: '+54' },
    { name: 'Bolivia', code: '+591' },
    { name: 'Brazil', code: '+55' },
    { name: 'Chile', code: '+56' },
    { name: 'Colombia', code: '+57' },
    { name: 'Costa Rica', code: '+506' },
    { name: 'Ecuador', code: '+593' },
    { name: 'El Salvador', code: '+503' },
    { name: 'Guatemala', code: '+502' },
    { name: 'Honduras', code: '+504' },
    { name: 'Mexico', code: '+52' },
    { name: 'Nicaragua', code: '+505' },
    { name: 'Panama', code: '+507' },
    { name: 'Paraguay', code: '+595' },
    { name: 'Peru', code: '+51' },
    { name: 'Dominican Republic', code: '+1' },
    { name: 'Uruguay', code: '+598' },
    { name: 'Venezuela', code: '+58' },
];

export const courses: Course[] = [
    { name: 'Sales Advisor', duration: '5 weeks', modality: 'Online' },
    { name: 'Air Conditioning & Appliances', duration: '8 weeks', modality: 'Hybrid' },
    { name: 'Financial Advisor', duration: '7 weeks', modality: 'Online' },
    { name: 'Pharmacy Assistant', duration: '8 weeks', modality: 'Online' },
    { name: 'Aluminum & Melamine Carpentry', duration: '6 weeks', modality: 'Hybrid' },
    { name: 'Networking', duration: '7 weeks', modality: 'Hybrid' },
    { name: 'Frontend Web Development', duration: '12 weeks', modality: 'Online' },
    { name: 'English', duration: '20 weeks', modality: 'Online' },
    { name: 'Specialized Services Interpreter', duration: '3 weeks', modality: 'Online' },
    { name: 'IT Administrator', duration: '8 weeks', modality: 'Online' },
    { name: 'SAP Logistics', duration: '7 weeks', modality: 'Online' },
    { name: 'Graphic Design & Digital Marketing', duration: '7 weeks', modality: 'Online' },
    { name: 'Motorcycle Mechanics', duration: '6 weeks', modality: 'Hybrid' },
];

export const stakes: Stake[] = [
    { id: 1, name: 'Guatemala North Stake' },
    { id: 2, name: 'Coban District' },
    { id: 3, name: 'El Salvador Mission' },
];

// Formatos de salida para el backend
export interface ReferralFormOutput {
    type: 'referral';
    data: ReferralFormData;
    timestamp: string;
}

export interface PreRegistrationFormOutput {
    type: 'pre-registration';
    data: PreRegistrationFormData;
    timestamp: string;
}
