import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { type Reference } from '@/types/reference';
import { type ReferenceStats, type ReferenceByCountry, type ReferenceByStake } from '@/types/dashboard';
import { Head } from '@inertiajs/react';
import { Briefcase, CheckCircle, Clock, MapPin, TrendingUp, Users, XCircle } from 'lucide-react';

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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-primary text-3xl font-bold tracking-tight">Dashboard de Referencias</h2>
                        <p className="text-muted-foreground">Resumen y métricas de las referencias recibidas</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-primary text-sm font-medium">Total Referencias</CardTitle>
                            <Users className="text-primary h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-foreground text-2xl font-bold">{data.stats.total}</div>
                            <p className="text-muted-foreground text-xs">+{data.stats.newThisWeek} esta semana</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-primary text-sm font-medium">Pendientes</CardTitle>
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
                            <CardTitle className="text-primary text-sm font-medium">Aceptadas</CardTitle>
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
                            <CardTitle className="text-primary text-sm font-medium">Rechazadas</CardTitle>
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

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle className="text-primary">Tasa de Aceptación</CardTitle>
                            <CardDescription>Porcentaje de referencias procesadas que fueron aceptadas</CardDescription>
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
                            <CardTitle className="text-primary">Resumen de Estados</CardTitle>
                            <CardDescription>Distribución de estados de las referencias</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                    <span className="text-sm">Pendientes</span>
                                </div>
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                    {data.stats.pending}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    <span className="text-sm">Aceptadas</span>
                                </div>
                                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    {data.stats.accepted}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                                    <span className="text-sm">Rechazadas</span>
                                </div>
                                <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                    {data.stats.rejected}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-primary">Referencias por País</CardTitle>
                            <CardDescription>Distribución geográfica de las referencias</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.referencesByCountry.length > 0 ? (
                                    data.referencesByCountry.map((item, index) => (
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
                            <CardTitle className="text-primary">Referencias por Estaca</CardTitle>
                            <CardDescription>Distribución por estaca de las referencias</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.referencesByStake.length > 0 ? (
                                    data.referencesByStake.map((item, index) => (
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

                <Card>
                    <CardHeader>
                        <CardTitle className="text-primary">Acciones Pendientes</CardTitle>
                        <CardDescription>Referencias que requieren atención inmediata</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="flex items-center space-x-4 rounded-lg border p-4">
                                <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                                <div>
                                    <p className="text-sm font-medium">Referencias pendientes</p>
                                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{data.stats.pending}</p>
                                    <p className="text-muted-foreground text-xs">Requieren evaluación</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 rounded-lg border p-4">
                                <Users className="text-primary h-8 w-8" />
                                <div>
                                    <p className="text-sm font-medium">Nuevas esta semana</p>
                                    <p className="text-primary text-2xl font-bold">{data.stats.newThisWeek}</p>
                                    <p className="text-muted-foreground text-xs">Recién recibidas</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 rounded-lg border p-4">
                                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
                                <div>
                                    <p className="text-sm font-medium">Tasa de aceptación</p>
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{data.stats.acceptancePercentage}%</p>
                                    <p className="text-muted-foreground text-xs">Referencias aceptadas</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
