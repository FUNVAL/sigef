import GenericDashboard from '@/components/dashboard/generic-dashboard';
import { useDashboardConfig } from '@/hooks/use-dashboard-config';
import referencesNavItems from '@/lib/consts/referencesNavItems';
import { type BreadcrumbItem } from '@/types';
import { type Reference } from '@/types/reference';
import { type ReferenceStats, type ReferenceByCountry, type ReferenceByRecruiter } from '@/types/dashboard';
import { type Country } from '@/types/country';
import { router, usePage } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { type SharedData } from '@/types';

interface DashboardData {
    stats: ReferenceStats;
    referencesByCountry: ReferenceByCountry[];
    referencesByRecruiter: ReferenceByRecruiter[];
    references: Reference[];
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

export default function Dashboard({ data }: DashboardProps) {
    const { createReferencesConfig } = useDashboardConfig();
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

    // Verificar si el usuario tiene permiso para ver todas las referencias
    const canViewAll = auth.user.user_permissions.includes('reference:view-all');

    // Filtrar los datos por reclutador basado en el país seleccionado
    const filteredByRecruiter = useMemo(() => {
        if (!selectedCountryId || !canViewAll) {
            return data.referencesByRecruiter;
        }

        // Si hay un país seleccionado, el backend ya maneja el filtrado
        return data.referencesByRecruiter;
    }, [data.referencesByRecruiter, selectedCountryId, canViewAll]);

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
        byCountry: data.referencesByCountry,
        byStake: filteredByRecruiter,
    };

    // Configuración específica para referencias usando el hook
    const config = createReferencesConfig({
        breadcrumbs,
        menuOptions: referencesNavItems,
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
