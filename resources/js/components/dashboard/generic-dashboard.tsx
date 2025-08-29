import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AccessControlLayout from '@/layouts/access-control/layout';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { type BaseStats, type ByCountry, type ByStake } from '@/types/dashboard';
import { Head } from '@inertiajs/react';
import { Briefcase, CheckCircle, Clock, MapPin, TrendingUp, Users, XCircle } from 'lucide-react';
import { type MenuOption } from '@/components/globals/appbar';
import { type ReactNode } from 'react';

interface GenericDashboardData {
    stats: BaseStats;
    byCountry: ByCountry[];
    byStake: ByStake[];
}

interface GenericDashboardProps {
    data: GenericDashboardData;
    config: {
        // Configuración de textos
        title: string;
        description: string;
        pageTitle: string;
        entityName: string; // "Referencias", "Preinscripciones", etc.
        entitySingular: string; // "referencia", "preinscripción", etc.
        entityPlural: string; // "referencias", "preinscripciones", etc.

        // Configuración de navegación
        breadcrumbs: BreadcrumbItem[];
        menuOptions?: MenuOption[];

        // Configuración de layout
        useAccessControlLayout?: boolean; // Por defecto true

        // Configuración de etiquetas de estado
        statusLabels: {
            pending: string;
            accepted: string;
            rejected: string;
        };

        // Configuración de títulos de secciones
        sectionTitles: {
            acceptanceRate: string; // "Tasa de Aprobación"/"Tasa de Aceptación"
            acceptanceRateDescription: string;
            statusSummary: string; // "Resumen de Estados"
            statusSummaryDescription: string;
            byCountry: string; // "Preinscripciones por País"/"Referencias por País"
            byCountryDescription: string;
            byStake: string; // "Preinscripciones por Estaca"/"Referencias por Estaca"
            byStakeDescription: string;
            pendingActions: string; // "Acciones Pendientes"
            pendingActionsDescription: string;
        };

        // Configuración de acciones pendientes
        pendingActionsLabels: {
            pendingItems: string; // "Preinscripciones pendientes"/"Referencias pendientes"
            pendingDescription: string; // "Requieren evaluación"
            newThisWeek: string; // "Nuevas esta semana"
            newDescription: string; // "Recién recibidas"
            acceptanceRate: string; // "Tasa de aprobación"/"Tasa de aceptación"
            acceptanceDescription: string; // "Preinscripciones aprobadas"/"Referencias aceptadas"
        };
    };
}

function DashboardContent({ data, config }: GenericDashboardProps): ReactNode {
    return (
        <>
            {/* Tarjetas de estadísticas principales */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-primary text-sm font-medium">Total {config.entityName}</CardTitle>
                        <Users className="text-primary h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-foreground text-2xl font-bold">{data.stats.total}</div>
                        <p className="text-muted-foreground text-xs">+{data.stats.newThisWeek} esta semana</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-primary text-sm font-medium">{config.statusLabels.pending}</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-foreground text-2xl font-bold">{data.stats.pending}</div>
                        <p className="text-muted-foreground text-xs">
                            {data.stats.total > 0 ? ((data.stats.pending / data.stats.total) * 100).toFixed(1) : 0}% del total
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-primary text-sm font-medium">{config.statusLabels.accepted}</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-foreground text-2xl font-bold">{data.stats.accepted}</div>
                        <p className="text-muted-foreground text-xs">
                            {data.stats.total > 0 ? ((data.stats.accepted / data.stats.total) * 100).toFixed(1) : 0}% del total
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-primary text-sm font-medium">{config.statusLabels.rejected}</CardTitle>
                        <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-foreground text-2xl font-bold">{data.stats.rejected}</div>
                        <p className="text-muted-foreground text-xs">
                            {data.stats.total > 0 ? ((data.stats.rejected / data.stats.total) * 100).toFixed(1) : 0}% del total
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Tasa de aceptación y resumen de estados */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle className="text-primary">{config.sectionTitles.acceptanceRate}</CardTitle>
                        <CardDescription>{config.sectionTitles.acceptanceRateDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="px-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{data.stats.acceptancePercentage}%</p>
                                    <p className="text-muted-foreground text-xs">
                                        {data.stats.accepted} de {data.stats.accepted + data.stats.rejected} procesadas
                                    </p>
                                </div>
                                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                            <Progress value={data.stats.acceptancePercentage} className="w-full" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle className="text-primary">{config.sectionTitles.statusSummary}</CardTitle>
                        <CardDescription>{config.sectionTitles.statusSummaryDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                <span className="text-sm">{config.statusLabels.pending}</span>
                            </div>
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                {data.stats.pending}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                                <span className="text-sm">{config.statusLabels.accepted}</span>
                            </div>
                            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                {data.stats.accepted}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                                <span className="text-sm">{config.statusLabels.rejected}</span>
                            </div>
                            <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                {data.stats.rejected}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Distribuciones por país y estaca */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-primary">{config.sectionTitles.byCountry}</CardTitle>
                        <CardDescription>{config.sectionTitles.byCountryDescription}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {data.byCountry.length > 0 ? (
                                data.byCountry.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <MapPin className="text-primary h-4 w-4" />
                                            <span className="text-sm font-medium">{item.country}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-muted-foreground text-sm">{item.quantity}</span>
                                            <div className="w-16">
                                                <Progress value={item.percentage} className="h-2" />
                                            </div>
                                            <span className="text-muted-foreground w-10 text-xs">{item.percentage}%</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground py-4 text-center text-sm">No hay datos disponibles</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-primary">{config.sectionTitles.byStake}</CardTitle>
                        <CardDescription>{config.sectionTitles.byStakeDescription}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {data.byStake.length > 0 ? (
                                data.byStake.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Briefcase className="text-primary h-4 w-4" />
                                            <span className="text-sm font-medium">{item.stake}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-muted-foreground text-sm">{item.quantity}</span>
                                            <div className="w-16">
                                                <Progress value={item.percentage} className="h-2" />
                                            </div>
                                            <span className="text-muted-foreground w-10 text-xs">{item.percentage}%</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground py-4 text-center text-sm">No hay datos disponibles</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Acciones pendientes */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-primary">{config.sectionTitles.pendingActions}</CardTitle>
                    <CardDescription>{config.sectionTitles.pendingActionsDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="flex items-center space-x-4 rounded-lg border p-4">
                            <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                            <div>
                                <p className="text-sm font-medium">{config.pendingActionsLabels.pendingItems}</p>
                                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{data.stats.pending}</p>
                                <p className="text-muted-foreground text-xs">{config.pendingActionsLabels.pendingDescription}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 rounded-lg border p-4">
                            <Users className="text-primary h-8 w-8" />
                            <div>
                                <p className="text-sm font-medium">{config.pendingActionsLabels.newThisWeek}</p>
                                <p className="text-primary text-2xl font-bold">{data.stats.newThisWeek}</p>
                                <p className="text-muted-foreground text-xs">{config.pendingActionsLabels.newDescription}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 rounded-lg border p-4">
                            <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
                            <div>
                                <p className="text-sm font-medium">{config.pendingActionsLabels.acceptanceRate}</p>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{data.stats.acceptancePercentage}%</p>
                                <p className="text-muted-foreground text-xs">{config.pendingActionsLabels.acceptanceDescription}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export default function GenericDashboard({ data, config }: GenericDashboardProps) {
    const useAccessControl = config.useAccessControlLayout !== false; // Por defecto true

    return (
        <AppLayout breadcrumbs={config.breadcrumbs} menuOptions={config.menuOptions}>
            <Head title={config.pageTitle} />
            {useAccessControl ? (
                <AccessControlLayout
                    headings={{
                        title: config.title,
                        description: config.description,
                    }}
                >
                    <DashboardContent data={data} config={config} />
                </AccessControlLayout>
            ) : (
                <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
                    <div className="flex items-center justify-between space-y-2">
                        <div>
                            <h2 className="text-primary text-3xl font-bold tracking-tight">{config.title}</h2>
                            <p className="text-muted-foreground">{config.description}</p>
                        </div>
                    </div>
                    <DashboardContent data={data} config={config} />
                </div>
            )}
        </AppLayout>
    );
}
