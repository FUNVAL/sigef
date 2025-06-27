/**
 * Tipo base para una pre-inscripción con todos sus campos y relaciones
 */
type PreInscription = {
    id: number;
    first_name: string;
    middle_name?: string;
    last_name: string;
    second_last_name?: string;
    age: number;
    phone: string;
    email: string;
    served_mission: boolean;
    currently_working?: boolean;
    available_full_time?: boolean;
    comments?: string;
    declined_description?: string;
    gender: {
        id: number;
        name: string;
    };
    marital_status: {
        id: number;
        name: string;
    };
    job_type_preference?: {
        id: number;
        name: string;
    };
    status?: {
        id: number;
        name: string;
    };
    declined_reason?: {
        id: number;
        name: string;
    };
    country: {
        id: number;
        name: string;
    };
    stake: {
        id: number;
        name: string;
    };
    created_at?: string;
    updated_at?: string;
};

/**
 * Tipo para crear una nueva pre-inscripción
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
    | 'declined_description'
> & {
    country_id: number;
    stake_id: number;
    gender: number;
    marital_status: number;
    job_type_preference?: number;
    status?: number;
};

/**
 * Tipo para actualizar el estado de una pre-inscripción
 */
type PreInscriptionUpdateFormData = {
    id: number;
    status: number;
    declined_reason?: number;
    declined_description?: string;
    comments?: string;
};

/**
 * Tipo para filtros de búsqueda de pre-inscripciones
 */
type PreInscriptionFilters = {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    gender?: number;
    marital_status?: number;
    status?: number;
    country?: number;
    stake?: number;
    age_min?: number;
    age_max?: number;
    served_mission?: boolean;
    currently_working?: boolean;
    available_full_time?: boolean;
    job_type_preference?: number;
    created_from?: string;
    created_to?: string;
};

/**
 * Tipo para la respuesta paginada de pre-inscripciones
 */
type PreInscriptionsPaginatedResponse = {
    data: PreInscription[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
};

export type {
    PreInscription,
    PreInscriptionFormData,
    PreInscriptionUpdateFormData,
    PreInscriptionFilters,
    PreInscriptionsPaginatedResponse,
};
