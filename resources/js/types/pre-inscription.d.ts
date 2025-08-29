import {
    type BaseEntity,
    type BaseFilters,
    type BaseFormData,
    type BasePaginatedResponse,
    type BaseUpdateFormData,
    type Country,
    type GenderInfo,
    type JobTypeInfo,
    type MaritalStatusInfo,
    type MissionStatusInfo,
    type Stake,
    type StatusInfo,
} from './common';

/**
 * Tipo base para una preinscripción con todos sus campos y relaciones
 */
type PreInscription = BaseEntity & {
    first_name: string;
    middle_name?: string;
    last_name: string;
    second_last_name?: string;
    age: number;
    phone: string;
    additional_phone?: string;
    email: string;
    served_mission: MissionStatusInfo;
    currently_working?: boolean;
    available_full_time?: boolean;
    comments?: string;
    declined_description?: string;
    gender: GenderInfo;
    marital_status: MaritalStatusInfo;
    job_type_preference?: JobTypeInfo;
    status: StatusInfo;
    declined_reason?: StatusInfo;
    country: Country;
    stake: Stake;
    updated_at?: string;
    course?: {
        id: number;
        name: string;
    }

};

/**
 * Tipo para crear una nueva preinscripción
 * Convierte las relaciones de objetos a IDs numéricos
 */
type PreInscriptionFormData = Omit<
    PreInscription,
    | 'id'
    | 'created_at'
    | 'updated_at'
    | 'country'
    | 'stake'
    | 'gender'
    | 'marital_status'
    | 'job_type_preference'
    | 'status'
    | 'declined_reason'
    | 'served_mission'
> &
    BaseFormData & {
        marital_status: number;
        served_mission: number;
        job_type_preference?: number;
        status?: number;
    };

/**
 * Tipo para actualizar el estado de una preinscripción
 */
type PreInscriptionUpdateFormData = BaseUpdateFormData & {
    declined_reason?: number;
    declined_description?: string;
    comments?: string;
};

/**
 * Tipo para editar datos de una preinscripción existente
 */
type PreInscriptionEditFormData = Omit<PreInscriptionFormData, 'id'> & {
    id: number;
};

/**
 * Tipo para filtros de búsqueda de preinscripciones
 */
type PreInscriptionFilters = BaseFilters & {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    additional_phone?: string;
    gender?: number;
    marital_status?: number;
    served_mission?: MissionStatusInfo;
    currently_working?: boolean;
    available_full_time?: boolean;
    job_type_preference?: number;
};

/**
 * Tipo para la respuesta paginada de 
 */
type PreInscriptionsPaginatedResponse = BasePaginatedResponse<PreInscription>;

export type {
    PreInscription,
    PreInscriptionEditFormData,
    PreInscriptionFilters,
    PreInscriptionFormData,
    PreInscriptionsPaginatedResponse,
    PreInscriptionUpdateFormData,
};

export type PreRegistrationRequest = {
    data: any;
    setData: (field: any, value: any) => void;
    post: (...args: any[]) => void;
    processing: boolean;
    errors: Record<string, string>;
};

export type PreRegistrationFormData = BaseFormData & {
    first_name: string;
    middle_name?: string;
    last_name: string;
    second_last_name?: string;
    age: number;
    phone: string;
    additional_phone?: string;
    email: string;
    marital_status: number;
    served_mission: number | null;
    course_id?: number;
    job_type_preference?: number | null;
    currently_working?: boolean | null;
    available_full_time?: boolean | null;
};
