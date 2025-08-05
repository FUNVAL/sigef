import GenericDashboard from '@/components/dashboard/generic-dashboard';
import { useDashboardConfig } from '@/hooks/use-dashboard-config';
import { type BreadcrumbItem } from '@/types';
import { type Reference } from '@/types/reference';
import { type ReferenceStats, type ReferenceByCountry, type ReferenceByStake } from '@/types/dashboard';

interface DashboardData {
    stats: ReferenceStats;
    referencesByCountry: ReferenceByCountry[];
    referencesByStake: ReferenceByStake[];
    references: Reference[];
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

    // Transformar datos para el componente genérico
    const genericData = {
        stats: data.stats,
        byCountry: data.referencesByCountry,
        byStake: data.referencesByStake,
    };

    // Configuración específica para el dashboard principal (sin AccessControlLayout)
    const config = createReferencesConfig({
        breadcrumbs,
        useAccessControlLayout: false,
        // No menuOptions para el dashboard principal
    });

    return <GenericDashboard data={genericData} config={config} />;
}
