import GenericDashboard from '@/components/dashboard/generic-dashboard';
import { useDashboardConfig } from '@/hooks/use-dashboard-config';
import preinscriptionsNavItems from '@/lib/consts/preinscriptionNavItems';
import { type BreadcrumbItem } from '@/types';
import { type PreInscription } from '@/types/pre-inscription';
import { type PreInscriptionStats, type PreInscriptionByCountry, type PreInscriptionByRecruiter } from '@/types/dashboard';
import { type Country } from '@/types/country';
import { router, usePage } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { type SharedData } from '@/types';

interface DashboardData {
    stats: PreInscriptionStats;
    preInscriptionsByCountry: PreInscriptionByCountry[];
    preInscriptionsByRecruiter: PreInscriptionByRecruiter[];
    preInscriptions: PreInscription[];
    countries?: Country[];
}

interface DashboardProps {
    data: DashboardData;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function PreInscriptionDashboard({ data }: DashboardProps) {
    const { createPreInscriptionsConfig } = useDashboardConfig();
    const { auth } = usePage<SharedData>().props;

    // Inicializar el filtro desde la URL
    const getInitialCountryFilter = () => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('country') || undefined;
        }
        return undefined;
    };

    const [selectedCountryId, setSelectedCountryId] = useState<string | undefined>(getInitialCountryFilter);

    // Verificar si el usuario tiene permiso para ver todas las preinscripciones
    const canViewAll = auth.user.user_permissions.includes('pre-inscription:view-all');

    // Filtrar los datos por reclutador basado en el país seleccionado
    const filteredByRecruiter = useMemo(() => {
        if (!selectedCountryId || !canViewAll) {
            return data.preInscriptionsByRecruiter;
        }

        // Si hay un país seleccionado, el backend ya maneja el filtrado
        return data.preInscriptionsByRecruiter;
    }, [data.preInscriptionsByRecruiter, selectedCountryId, canViewAll]);

    // Manejar cambio de filtro de país
    const handleCountryChange = (countryId: string | undefined) => {
        setSelectedCountryId(countryId);

        // Redirigir con el filtro de país
        const url = new URL(window.location.href);
        if (countryId) {
            url.searchParams.set('country', countryId);
        } else {
            url.searchParams.delete('country');
        }

        router.visit(url.toString(), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Transformar datos para el componente genérico
    const genericData = {
        stats: data.stats,
        byCountry: data.preInscriptionsByCountry,
        byStake: filteredByRecruiter,
    };

    // Configuración específica para preinscripciones usando el hook
    const config = createPreInscriptionsConfig({
        breadcrumbs,
        menuOptions: preinscriptionsNavItems,
    });

    // Props adicionales para el filtro
    const filterProps = canViewAll ? {
        showCountryFilter: true,
        countries: data.countries || [],
        selectedCountryId,
        onCountryChange: handleCountryChange,
    } : {};

    return <GenericDashboard data={genericData} config={config} {...filterProps} />;
}
