/**
 * Tipo base para una referencia con todos sus campos y relaciones
 */
type Reference = {
    id: number;
    name: string;
    age: number;
    phone: string;
    referrer_name: string;
    referrer_phone: string;
    declined_description: string;
    relationship_with_referred: {
        id: number;
        name: string;
    };
    declined_reason?: {
        id: number;
        name: string;
    };
    status: {
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
    gender: {
        id: number;
        name: string;
    };
    created_at?: string;
    updated_at?: string;
};

/**
 * Tipo para crear una nueva referencia
 * Convierte las relaciones de objetos a IDs numéricos
 */
type ReferenceFormData = Omit<
    Reference,
    | 'id'
    | 'created_at'
    | 'updated_at'
    | 'country'
    | 'stake'
    | 'status'
    | 'relationship_with_referred'
    | 'declined_reason'
    | 'gender'
    | 'declined_description'
> & {
    country_id: number;
    stake_id: number;
    relationship_with_referred: number;
    gender: number;
};

/**
 * Tipo para actualizar el estado de una referencia
 */
type ReferenceUpdateFormData = {
    id: number;
    declined_reason: number;
    status: number;
    declined_description: string;
};

/**
 * Tipo para filtros de búsqueda de referencias
 */
type ReferenceFilters = {
    name?: string;
    phone?: string;
    status?: number;
    country?: number;
    stake?: number;
    gender?: number;
    age_min?: number;
    age_max?: number;
    created_from?: string;
    created_to?: string;
};

/**
 * Tipo para la respuesta paginada de referencias
 */
type ReferencesPaginatedResponse = {
    data: Reference[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
};

export type {
    Reference,
    ReferenceFormData,
    ReferenceUpdateFormData,
    ReferenceFilters,
    ReferencesPaginatedResponse,
};