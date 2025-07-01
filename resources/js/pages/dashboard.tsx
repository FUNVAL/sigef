import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { GraduationCap, Users, CheckCircle, XCircle, Clock, TrendingUp, MapPin, Briefcase } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ReferenceStats {
    total: number
    pending: number
    accepted: number
    rejected: number
    acceptancePercentage: number
    newThisWeek: number
}

interface ReferenceByCountry {
    country: string
    quantity: number
    percentage: number
}

interface ReferenceByStake {
    stake: string
    quantity: number
    percentage: number
}

interface Reference {
    id: number
    name: string
    gender: number
    age: number
    country_id: number
    phone: string | null
    stake_id: number
    referrer_name: string | null
    referrer_phone: string | null
    relationship_with_referred: number | null
    status: {
        id: number
        name: string
    }
    declined_reason: number | null
    declined_description: string | null
    modifier_id: number | null
    created_at: string
    updated_at: string
    country: {
        id: number
        name: string
    }
    stake: {
        id: number
        name: string
    }
    modifier: {
        id: number
        name: string
    } | null
}

interface DashboardData {
    stats: ReferenceStats
    referencesByCountry: ReferenceByCountry[]
    referencesByStake: ReferenceByStake[]
    references: Reference[]
}

interface DashboardProps {
    data: DashboardData
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
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-blue-700">Dashboard de Referencias</h2>
                        <p className="text-muted-foreground">Resumen y métricas de las referencias recibidas</p>
                    </div>
                </div>

                {/* Métricas principales */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-700">Total Referencias</CardTitle>
                            <Users className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{data.stats.total}</div>
                            <p className="text-xs text-muted-foreground">+{data.stats.newThisWeek} esta semana</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-700">Pendientes</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{data.stats.pending}</div>
                            <p className="text-xs text-muted-foreground">
                                {data.stats.total > 0 ? ((data.stats.pending / data.stats.total) * 100).toFixed(1) : 0}% del total
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-700">Aceptadas</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{data.stats.accepted}</div>
                            <p className="text-xs text-muted-foreground">
                                {data.stats.total > 0 ? ((data.stats.accepted / data.stats.total) * 100).toFixed(1) : 0}% del total
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-700">Rechazadas</CardTitle>
                            <XCircle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{data.stats.rejected}</div>
                            <p className="text-xs text-muted-foreground">
                                {data.stats.total > 0 ? ((data.stats.rejected / data.stats.total) * 100).toFixed(1) : 0}% del total
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Tasa de aceptación */}
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle className="text-blue-700">Tasa de Aceptación</CardTitle>
                            <CardDescription>Porcentaje de referencias procesadas que fueron aceptadas</CardDescription>
                        </CardHeader>
                        <CardContent className="px-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-2xl font-bold text-green-600">{data.stats.acceptancePercentage}%</p>
                                        <p className="text-xs text-muted-foreground">
                                            {data.stats.accepted} de {data.stats.accepted + data.stats.rejected} procesadas
                                        </p>
                                    </div>
                                    <TrendingUp className="h-8 w-8 text-green-600" />
                                </div>
                                <Progress value={data.stats.acceptancePercentage} className="w-full" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Métricas adicionales */}
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle className="text-blue-700">Resumen de Estados</CardTitle>
                            <CardDescription>Distribución de estados de las referencias</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-yellow-600" />
                                    <span className="text-sm">Pendientes</span>
                                </div>
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                    {data.stats.pending}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-sm">Aceptadas</span>
                                </div>
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                    {data.stats.accepted}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <XCircle className="h-4 w-4 text-red-600" />
                                    <span className="text-sm">Rechazadas</span>
                                </div>
                                <Badge variant="secondary" className="bg-red-100 text-red-800">
                                    {data.stats.rejected}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {/* Referencias por país */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-blue-700">Referencias por País</CardTitle>
                            <CardDescription>Distribución geográfica de las referencias</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.referencesByCountry.length > 0 ? (
                                    data.referencesByCountry.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <MapPin className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm font-medium">{item.country}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-muted-foreground">{item.quantity}</span>
                                                <div className="w-16">
                                                    <Progress value={item.percentage} className="h-2" />
                                                </div>
                                                <span className="text-xs text-muted-foreground w-10">{item.percentage}%</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">
                                        No hay datos disponibles
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Referencias por estaca */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-blue-700">Referencias por Estaca</CardTitle>
                            <CardDescription>Distribución por estaca de las referencias</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.referencesByStake.length > 0 ? (
                                    data.referencesByStake.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Briefcase className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm font-medium">{item.stake}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-muted-foreground">{item.quantity}</span>
                                                <div className="w-16">
                                                    <Progress value={item.percentage} className="h-2" />
                                                </div>
                                                <span className="text-xs text-muted-foreground w-10">{item.percentage}%</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">
                                        No hay datos disponibles
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Resumen de acciones pendientes */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-blue-700">Acciones Pendientes</CardTitle>
                        <CardDescription>Referencias que requieren atención inmediata</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="flex items-center space-x-4 rounded-lg border p-4">
                                <Clock className="h-8 w-8 text-yellow-600" />
                                <div>
                                    <p className="text-sm font-medium">Referencias pendientes</p>
                                    <p className="text-2xl font-bold text-yellow-600">{data.stats.pending}</p>
                                    <p className="text-xs text-muted-foreground">Requieren evaluación</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 rounded-lg border p-4">
                                <Users className="h-8 w-8 text-blue-600" />
                                <div>
                                    <p className="text-sm font-medium">Nuevas esta semana</p>
                                    <p className="text-2xl font-bold text-blue-600">{data.stats.newThisWeek}</p>
                                    <p className="text-xs text-muted-foreground">Recién recibidas</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 rounded-lg border p-4">
                                <TrendingUp className="h-8 w-8 text-green-600" />
                                <div>
                                    <p className="text-sm font-medium">Tasa de aceptación</p>
                                    <p className="text-2xl font-bold text-green-600">{data.stats.acceptancePercentage}%</p>
                                    <p className="text-xs text-muted-foreground">Referencias aceptadas</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}