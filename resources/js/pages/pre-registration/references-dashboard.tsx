import GenericDashboard from '@/components/dashboard/generic-dashboard';
import { useDashboardConfig } from '@/hooks/use-dashboard-config';
import referencesNavItems from '@/lib/consts/referencesNavItems';
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

    // Configuración específica para referencias usando el hook
    const config = createReferencesConfig({
        breadcrumbs,
        menuOptions: referencesNavItems,
    });

    return <GenericDashboard data={genericData} config={config} />;
}
