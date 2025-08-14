import {
    type BaseEntity,
    type BaseFilters,
    type BaseFormData,
    type BasePaginatedResponse,
    type BaseUpdateFormData,
    type Country,
    type GenderInfo,
    type IdNameEntity,
    type Stake,
    type StatusInfo,
} from './common';

/**
 * Tipo base para una referencia con todos sus campos y relaciones
 */
type Reference = BaseEntity & {
    name: string;
    age: number;
    phone: string;
    referrer_name: string;
    referrer_phone: string;
    declined_description: string;
    relationship_with_referred: IdNameEntity;
    declined_reason?: IdNameEntity;
    status: StatusInfo;
    country: Country;
    stake: Stake;
    gender: GenderInfo;
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
> &
    BaseFormData & {
        relationship_with_referred: number;
    };

/**
 * Tipo para actualizar el estado de una referencia
 */
type ReferenceUpdateFormData = BaseUpdateFormData & {
    declined_reason: number;
    declined_description: string;
};

/**
 * Tipo para editar datos de una referencia existente
 */
type ReferenceEditFormData = Omit<ReferenceFormData, 'id'> & {
    id: number;
};

/**
 * Tipo para filtros de búsqueda de referencias
 */
type ReferenceFilters = BaseFilters & {
    name?: string;
    phone?: string;
    gender?: number;
};

/**
 * Tipo para la respuesta paginada de referencias
 */
type ReferencesPaginatedResponse = BasePaginatedResponse<Reference>;

export type { Reference, ReferenceEditFormData, ReferenceFilters, ReferenceFormData, ReferencesPaginatedResponse, ReferenceUpdateFormData };
