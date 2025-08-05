import GenericDashboard from '@/components/dashboard/generic-dashboard';
import { useDashboardConfig } from '@/hooks/use-dashboard-config';
import preinscriptionsNavItems from '@/lib/consts/preinscriptionNavItems';
import { type BreadcrumbItem } from '@/types';
import { type PreInscription } from '@/types/pre-inscription';
import { type PreInscriptionStats, type PreInscriptionByCountry, type PreInscriptionByStake } from '@/types/dashboard';

interface DashboardData {
    stats: PreInscriptionStats;
    preInscriptionsByCountry: PreInscriptionByCountry[];
    preInscriptionsByStake: PreInscriptionByStake[];
    preInscriptions: PreInscription[];
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

    // Transformar datos para el componente genérico
    const genericData = {
        stats: data.stats,
        byCountry: data.preInscriptionsByCountry,
        byStake: data.preInscriptionsByStake,
    };

    // Configuración específica para pre-inscripciones usando el hook
    const config = createPreInscriptionsConfig({
        breadcrumbs,
        menuOptions: preinscriptionsNavItems,
    });

    return <GenericDashboard data={genericData} config={config} />;
}
