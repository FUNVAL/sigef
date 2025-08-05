import AccessControlLayout from '@/layouts/access-control/layout';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { type BreadcrumbItem } from '@/types';
import { Country } from '@/types/country';
import { Stake } from '@/types/stake';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect, use } from 'react';
import axios from 'axios';
import { MapPin, Trash2, Users } from 'lucide-react';

interface Props {
    countries: Country[];
    userId: number;
    userName: string;
    stakesByCountry?: Stake[];
    userStakes?: number[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: '/access-control/users',
    },
    {
        title: 'Asignar Estacas',
        href: '/access-control/users/assign-stakes',
    },
];
type AssignStakesFormData = {
    stakes: number[];
}

export default function AssignStakes({ countries, userId, userName, stakesByCountry, userStakes }: Props) {
    const initialData: AssignStakesFormData = {
        stakes: userStakes || [],
    }
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [stakes, setStakes] = useState<Stake[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedStakes, setSelectedStakes] = useState<Stake[]>([]);
    const [submitting, setSubmitting] = useState(false);

    const { data, setData, patch, errors, processing } = useForm<AssignStakesFormData>(initialData);

    // Función para obtener las estacas por país
    const fetchStakesByCountry = async (countryId: string) => {
        if (!countryId) {
            setStakes([]);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`/api/admin/stakes/${countryId}`);

            if (response.data.status === 'success') {
                setStakes(response.data.stakes || []);
            } else {
                console.error('API returned error:', response.data.message);
                setStakes([]);
            }
        } catch (error) {
            console.error('Error fetching stakes:', error);
            setStakes([]);
        } finally {
            setLoading(false);
        }
    };

    // Efecto para cargar estacas cuando cambia el país
    useEffect(() => {
        fetchStakesByCountry(selectedCountry);
    }, [selectedCountry]);

    // Manejar selección de estaca
    const handleStakeToggle = (stake: Stake, checked: boolean) => {
        if (checked) {
            setSelectedStakes(prev => [...prev, stake]);
        } else {
            setSelectedStakes(prev => prev.filter(s => s.id !== stake.id));
        }
    };

    // Remover estaca seleccionada
    const removeSelectedStake = (stakeId: number) => {
        setSelectedStakes(prev => prev.filter(s => s.id !== stakeId));
    };

    // Manejar asignación de estacas
    const handleAssignStakes = async () => {
        if (selectedStakes.length === 0) return;

        setSubmitting(true);
        try {
            // Aquí irá la llamada POST para asignar las estacas
            // Por ahora solo simularemos el proceso
            console.log('Asignando estacas:', {
                userId,
                stakeIds: selectedStakes.map(s => s.id)
            });

            // Simular delay de la llamada API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Aquí podrías redirigir o mostrar un mensaje de éxito
            alert('Estacas asignadas exitosamente!');
            setSelectedStakes([]);

        } catch (error) {
            console.error('Error assigning stakes:', error);
            alert('Error al asignar las estacas');
        } finally {
            setSubmitting(false);
        }
    };

    // Verificar si una estaca está seleccionada
    const isStakeSelected = (stakeId: number) => {
        return selectedStakes.some(s => s.id === stakeId);
    };

    const handleSumit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('stakes.assign-user', userId), {
            onSuccess: () => {
                setSelectedStakes([]);
            },
            onError: () => {
                alert('Error al asignar las estacas');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Asignar Estacas" />
            <AccessControlLayout
                headings={{
                    title: 'Asignar Estacas',
                    description: `Asignar estacas a ${userName}`,
                }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Panel principal de selección */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    Seleccionar Estacas por País
                                </CardTitle>
                                <CardDescription>
                                    Selecciona un país para ver las estacas disponibles
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Selector de país */}
                                    <div className="space-y-2">
                                        <Label htmlFor="country-select">País</Label>
                                        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                                            <SelectTrigger id="country-select">
                                                <SelectValue placeholder="Selecciona un país..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {countries.map((country) => (
                                                    <SelectItem key={country.id} value={country.id.toString()}>
                                                        {country.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Separator />

                                    {/* Lista de estacas */}
                                    <div>
                                        {selectedCountry ? (
                                            <div>
                                                <h3 className="text-sm font-medium mb-3">
                                                    Estacas disponibles {loading && '(Cargando...)'}
                                                </h3>
                                                {loading ? (
                                                    <div className="text-center py-8 text-muted-foreground">
                                                        Cargando estacas...
                                                    </div>
                                                ) : stakes.length > 0 ? (
                                                    <div className="h-[400px] pr-4 overflow-y-auto">
                                                        <div className="space-y-3">
                                                            {stakes.map((stake) => (
                                                                <div
                                                                    key={stake.id}
                                                                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                                                                >
                                                                    <Checkbox
                                                                        id={`stake-${stake.id}`}
                                                                        checked={isStakeSelected(stake.id)}
                                                                        onCheckedChange={(checked) =>
                                                                            handleStakeToggle(stake, checked as boolean)
                                                                        }
                                                                    />
                                                                    <label
                                                                        htmlFor={`stake-${stake.id}`}
                                                                        className="flex-1 cursor-pointer"
                                                                    >
                                                                        <div className="font-medium">
                                                                            {stake.name}
                                                                        </div>
                                                                        {stake.user && (
                                                                            <div className="text-sm text-muted-foreground">
                                                                                Responsable: {stake.user.firstname} {stake.user.lastname}
                                                                            </div>
                                                                        )}
                                                                    </label>
                                                                    <Badge variant={stake.status === 'active' ? 'default' : 'secondary'}>
                                                                        {stake.status}
                                                                    </Badge>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-8 text-muted-foreground">
                                                        No hay estacas disponibles para este país
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 text-muted-foreground">
                                                Selecciona un país para ver las estacas disponibles
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Panel lateral de estacas seleccionadas */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-4">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Estacas Seleccionadas
                                </CardTitle>
                                <CardDescription>
                                    {selectedStakes.length} estaca(s) seleccionada(s)
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {selectedStakes.length > 0 ? (
                                        <>
                                            <div className="h-[300px] pr-4 overflow-y-auto">
                                                <div className="space-y-2">
                                                    {selectedStakes.map((stake) => (
                                                        <div
                                                            key={stake.id}
                                                            className="flex items-center justify-between p-2 border rounded-lg"
                                                        >
                                                            <div className="flex-1 min-w-0">
                                                                <div className="font-medium text-sm truncate">
                                                                    {stake.name}
                                                                </div>
                                                                <div className="text-xs text-muted-foreground truncate">
                                                                    {stake.country?.name}
                                                                </div>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => removeSelectedStake(stake.id)}
                                                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <Separator />

                                            <Button
                                                onClick={handleAssignStakes}
                                                disabled={processing}
                                                className="w-full"
                                            >
                                                {processing ? 'Asignando...' : 'Asignar Estacas'}
                                            </Button>
                                        </>
                                    ) : (
                                        <div className="text-center py-8 text-muted-foreground">
                                            <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                            <p>No hay estacas seleccionadas</p>
                                            <p className="text-xs mt-1">
                                                Selecciona estacas del panel izquierdo
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </AccessControlLayout>
        </AppLayout>
    );
}
