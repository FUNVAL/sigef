/**
 * Types compartidos para dashboards
 */

/**
 * Estadísticas base que pueden usar diferentes dashboards
 */
export interface BaseStats {
    total: number;
    pending: number;
    accepted: number;
    rejected: number;
    acceptancePercentage: number;
    newThisWeek: number;
}

/**
 * Distribución por país que puede ser reutilizada
 */
export interface ByCountry {
    country: string;
    quantity: number;
    percentage: number;
}

/**
 * Distribución por estaca que puede ser reutilizada
 */
export interface ByStake {
    stake: string;
    quantity: number;
    percentage: number;
}

/**
 * Entidad básica con relaciones comunes (país y estaca)
 */
export interface BaseEntity {
    id: number;
    created_at: string;
    updated_at: string;
    country: {
        id: number;
        name: string;
    };
    stake: {
        id: number;
        name: string;
    };
}

/**
 * Tipo base para datos de dashboard
 */
export interface BaseDashboardData<T> {
    stats: BaseStats;
    byCountry: ByCountry[];
    byStake: ByStake[];
    items: T[];
}

/**
 * Props base para componentes de dashboard
 */
export interface BaseDashboardProps<T> {
    data: BaseDashboardData<T>;
}

// Alias específicos para mantener compatibilidad
export type ReferenceStats = BaseStats;
export type PreInscriptionStats = BaseStats;
export type ReferenceByCountry = ByCountry;
export type PreInscriptionByCountry = ByCountry;
export type ReferenceByStake = ByStake;
export type PreInscriptionByStake = ByStake;
