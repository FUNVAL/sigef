import { type BreadcrumbItem } from '@/types';
import { type MenuOption } from '@/components/globals/appbar';

export interface DashboardConfig {
    // Configuración de textos
    title: string;
    description: string;
    pageTitle: string;
    entityName: string; // "Referencias", "Pre-inscripciones", etc.
    entitySingular: string; // "referencia", "preinscripción", etc.
    entityPlural: string; // "referencias", "pre-inscripciones", etc.

    // Configuración de navegación
    breadcrumbs: BreadcrumbItem[];
    menuOptions?: MenuOption[];

    // Configuración de layout
    useAccessControlLayout?: boolean; // Por defecto true

    // Configuración de etiquetas de estado
    statusLabels: {
        pending: string; // "Pendientes"
        accepted: string; // "Aprobadas"/"Aceptadas"
        rejected: string; // "Rechazadas"
    };

    // Configuración de títulos de secciones
    sectionTitles: {
        acceptanceRate: string; // "Tasa de Aprobación"/"Tasa de Aceptación"
        acceptanceRateDescription: string;
        statusSummary: string; // "Resumen de Estados"
        statusSummaryDescription: string;
        byCountry: string; // "Pre-inscripciones por País"/"Referencias por País"
        byCountryDescription: string;
        byStake: string; // "Pre-inscripciones por Estaca"/"Referencias por Estaca"
        byStakeDescription: string;
        pendingActions: string; // "Acciones Pendientes"
        pendingActionsDescription: string;
    };

    // Configuración de acciones pendientes
    pendingActionsLabels: {
        pendingItems: string; // "Pre-inscripciones pendientes"/"Referencias pendientes"
        pendingDescription: string; // "Requieren evaluación"
        newThisWeek: string; // "Nuevas esta semana"
        newDescription: string; // "Recién recibidas"
        acceptanceRate: string; // "Tasa de aprobación"/"Tasa de aceptación"
        acceptanceDescription: string; // "Pre-inscripciones aprobados"/"Referencias aceptadas"
    };
}

const defaultBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

/**
 * Hook para crear configuraciones de dashboard de forma más sencilla
 */
export function useDashboardConfig(): {
    createReferencesConfig: (overrides?: Partial<DashboardConfig>) => DashboardConfig;
    createPreInscriptionsConfig: (overrides?: Partial<DashboardConfig>) => DashboardConfig;
    createCustomConfig: (baseConfig: Partial<DashboardConfig>) => DashboardConfig;
} {

    const createReferencesConfig = (overrides: Partial<DashboardConfig> = {}): DashboardConfig => {
        const defaultConfig: DashboardConfig = {
            title: 'Dashboard de Referencias',
            description: 'Resumen y métricas de las referencias recibidas',
            pageTitle: 'Dashboard',
            entityName: 'Referencias',
            entitySingular: 'referencia',
            entityPlural: 'referencias',

            breadcrumbs: defaultBreadcrumbs,
            useAccessControlLayout: true,

            statusLabels: {
                pending: 'Pendientes',
                accepted: 'Aceptadas',
                rejected: 'Rechazadas',
            },

            sectionTitles: {
                acceptanceRate: 'Tasa de Aceptación',
                acceptanceRateDescription: 'Porcentaje de referencias procesadas que fueron aceptadas',
                statusSummary: 'Resumen de Estados',
                statusSummaryDescription: 'Distribución de estados de las referencias',
                byCountry: 'Referencias por País',
                byCountryDescription: 'Distribución geográfica de las referencias',
                byStake: 'Referencias por Estaca',
                byStakeDescription: 'Distribución por estaca de las referencias',
                pendingActions: 'Acciones Pendientes',
                pendingActionsDescription: 'Referencias que requieren atención inmediata',
            },

            pendingActionsLabels: {
                pendingItems: 'Referencias pendientes',
                pendingDescription: 'Requieren evaluación',
                newThisWeek: 'Nuevas esta semana',
                newDescription: 'Recién recibidas',
                acceptanceRate: 'Tasa de aceptación',
                acceptanceDescription: 'Referencias aceptadas',
            },
        };

        return { ...defaultConfig, ...overrides };
    };

    const createPreInscriptionsConfig = (overrides: Partial<DashboardConfig> = {}): DashboardConfig => {
        const defaultConfig: DashboardConfig = {
            title: 'Dashboard de Preinscripciones',
            description: 'Resumen y métricas de las preinscripciones recibidas',
            pageTitle: 'Dashboard Preinscripciones',
            entityName: 'Pre-inscripciones',
            entitySingular: 'preinscripción',
            entityPlural: 'preinscripciones',

            breadcrumbs: defaultBreadcrumbs,
            useAccessControlLayout: true,

            statusLabels: {
                pending: 'Pendientes',
                accepted: 'Aprobadas',
                rejected: 'Rechazadas',
            },

            sectionTitles: {
                acceptanceRate: 'Tasa de Aprobación',
                acceptanceRateDescription: 'Porcentaje de pre-inscripciones procesadas que fueron aprobados',
                statusSummary: 'Resumen de Estados',
                statusSummaryDescription: 'Distribución de estados de las pre-inscripciones',
                byCountry: 'Pre-inscripciones por País',
                byCountryDescription: 'Distribución geográfica de las pre-inscripciones',
                byStake: 'Pre-inscripciones por Estaca',
                byStakeDescription: 'Distribución por estaca de las pre-inscripciones',
                pendingActions: 'Acciones Pendientes',
                pendingActionsDescription: 'Pre-inscripciones que requieren atención inmediata',
            },

            pendingActionsLabels: {
                pendingItems: 'Pre-inscripciones pendientes',
                pendingDescription: 'Requieren evaluación',
                newThisWeek: 'Nuevas esta semana',
                newDescription: 'Recién recibidas',
                acceptanceRate: 'Tasa de aprobación',
                acceptanceDescription: 'Pre-inscripciones aprobados',
            },
        };

        return { ...defaultConfig, ...overrides };
    };

    const createCustomConfig = (baseConfig: Partial<DashboardConfig>): DashboardConfig => {
        const defaultConfig: DashboardConfig = {
            title: 'Dashboard',
            description: 'Resumen y métricas',
            pageTitle: 'Dashboard',
            entityName: 'Elementos',
            entitySingular: 'elemento',
            entityPlural: 'elementos',

            breadcrumbs: defaultBreadcrumbs,
            useAccessControlLayout: true,

            statusLabels: {
                pending: 'Pendientes',
                accepted: 'Aceptados',
                rejected: 'No aprobados',
            },

            sectionTitles: {
                acceptanceRate: 'Tasa de Aceptación',
                acceptanceRateDescription: 'Porcentaje de elementos procesados que fueron aceptados',
                statusSummary: 'Resumen de Estados',
                statusSummaryDescription: 'Distribución de estados de los elementos',
                byCountry: 'Elementos por País',
                byCountryDescription: 'Distribución geográfica de los elementos',
                byStake: 'Elementos por Estaca',
                byStakeDescription: 'Distribución por estaca de los elementos',
                pendingActions: 'Acciones Pendientes',
                pendingActionsDescription: 'Elementos que requieren atención inmediata',
            },

            pendingActionsLabels: {
                pendingItems: 'Elementos pendientes',
                pendingDescription: 'Requieren evaluación',
                newThisWeek: 'Nuevos esta semana',
                newDescription: 'Recién recibidos',
                acceptanceRate: 'Tasa de aceptación',
                acceptanceDescription: 'Elementos aceptados',
            },
        };

        return { ...defaultConfig, ...baseConfig };
    };

    return {
        createReferencesConfig,
        createPreInscriptionsConfig,
        createCustomConfig,
    };
}
