/**
 * Types comunes reutilizables en toda la aplicación
 */

/**
 * Entidad con ID y nombre - muy común en enums y selects
 */
export interface IdNameEntity {
    id: number;
    name: string;
}

/**
 * Entidad básica con timestamps
 */
export interface BaseEntity {
    id: number;
    created_at?: string;
    updated_at?: string;
}

/**
 * Entidad geográfica básica (País)
 */
export interface Country {
    id: number;
    name: string;
}

/**
 * Entidad organizacional básica (Estaca)
 */
export interface Stake {
    id: number;
    name: string;
}

/**
 * Información de ubicación completa
 */
export interface LocationInfo {
    country: Country;
    stake: Stake;
}

/**
 * Información de estado/status con ID y nombre
 */
export interface StatusInfo {
    id: number;
    name: string;
}

/**
 * Información de género
 */
export interface GenderInfo {
    id: number;
    name: string;
}

/**
 * Información de estado civil
 */
export interface MaritalStatusInfo {
    id: number;
    name: string;
}

/**
 * Información de estado de misión
 */
export interface MissionStatusInfo {
    id: number;
    name: string;
}

/**
 * Información de tipo de trabajo
 */
export interface JobTypeInfo {
    id: number;
    name: string;
}

/**
 * Estructura base para formularios con ID numérico (para crear)
 */
export interface BaseFormData {
    country_id: number;
    stake_id: number;
    gender: number;
}

/**
 * Estructura base para formularios de actualización
 */
export interface BaseUpdateFormData {
    id: number;
    status: number;
}

/**
 * Filtros base comunes
 */
export interface BaseFilters {
    created_from?: string;
    created_to?: string;
    country?: number;
    stake?: number;
    status?: number;
    age_min?: number;
    age_max?: number;
}

/**
 * Respuesta paginada base
 */
export interface BasePaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

/**
 * Información de usuario que modificó un registro
 */
export interface ModifierInfo {
    id: number;
    name: string;
}
