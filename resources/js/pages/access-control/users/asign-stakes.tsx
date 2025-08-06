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
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { MapPin, Trash2, Users } from 'lucide-react';

interface Props {
    countries: Country[];
    userId: number;
    userName: string;
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

export default function AssignStakes({ countries, userId, userName, userStakes }: Props) {
    const initialData: AssignStakesFormData = {
        stakes: userStakes || [],
    }
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [stakes, setStakes] = useState<Stake[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedStakes, setSelectedStakes] = useState<Stake[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [currentUserStakes, setCurrentUserStakes] = useState<number[]>(userStakes || []);

    const { processing } = useForm<AssignStakesFormData>(initialData);

    // Función para cargar las estacas asignadas al usuario
    const loadAssignedStakes = useCallback(async () => {
        try {
            // Usar el nuevo endpoint que devuelve directamente las estacas del usuario
            const response = await axios.get(`/api/admin/user-stakes/${userId}`);

            if (response.data.status === 'success') {
                const assignedStakeObjects = response.data.stakes || [];
                setSelectedStakes(assignedStakeObjects);
                // Actualizar los IDs de estacas actualmente asignadas
                setCurrentUserStakes(assignedStakeObjects.map((stake: Stake) => stake.id));
            } else {
                console.error('API returned error:', response.data.message);
            }
        } catch (error) {
            console.error('Error loading assigned stakes:', error);
        }
    }, [userId]);

    // Cargar estacas asignadas al montar el componente
    useEffect(() => {
        loadAssignedStakes();
    }, [loadAssignedStakes]);

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

    // Remover estaca seleccionada (solo si no es una ya asignada)
    const removeSelectedStake = (stakeId: number) => {
        // No permitir eliminar estacas ya asignadas
        if (isAssignedStake(stakeId)) {
            return;
        }
        setSelectedStakes(prev => prev.filter(s => s.id !== stakeId));
    };

    // Manejar asignación de estacas
    const handleAssignStakes = async () => {
        if (newlySelectedStakes.length === 0) return;

        setSubmitting(true);
        try {
            // Obtener todas las estacas actuales (asignadas + nuevas)
            const allStakeIds = selectedStakes.map(s => s.id);

            console.log('=== FRONTEND ASSIGNMENT TEST ===');
            console.log('User ID:', userId);
            console.log('All selected stakes:', selectedStakes);
            console.log('Assigned stakes IDs:', assignedStakes.map(s => s.id));
            console.log('New stakes IDs:', newlySelectedStakes.map(s => s.id));
            console.log('All stake IDs to send:', allStakeIds);

            // Hacer la llamada real al backend para asignar estacas
            const response = await axios.patch(`/stakes/${userId}/assign-user`, {
                stakes: allStakeIds
            }, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                    'Content-Type': 'application/json'
                }
            });

            console.log('Backend response:', response.data);
            console.log('=== END FRONTEND ASSIGNMENT TEST ===');

            // Mostrar mensaje de éxito
            alert(`${newlySelectedStakes.length} nueva(s) estaca(s) asignadas exitosamente!`);

            // Recargar las estacas asignadas para reflejar los cambios
            await loadAssignedStakes();

        } catch (error) {
            console.error('Error assigning stakes:', error);
            alert('Error al asignar las estacas');
        } finally {
            setSubmitting(false);
        }
    };    // Verificar si una estaca está seleccionada
    const isStakeSelected = (stakeId: number) => {
        return selectedStakes.some(s => s.id === stakeId);
    };

    // Verificar si una estaca es una ya asignada (no nueva)
    const isAssignedStake = (stakeId: number) => {
        return currentUserStakes.includes(stakeId);
    };

    // Separar estacas ya asignadas de las nuevas seleccionadas
    const assignedStakes = selectedStakes
        .filter(stake => isAssignedStake(stake.id))
        .sort((a, b) => a.name.localeCompare(b.name)); // Ordenar alfabéticamente

    const newlySelectedStakes = selectedStakes
        .filter(stake => !isAssignedStake(stake.id))
        .sort((a, b) => a.name.localeCompare(b.name)); // Ordenar alfabéticamente

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

                    {/* Panel lateral de estacas */}
                    <div className="lg:col-span-1">
                        <div className="space-y-4 sticky top-4">
                            {/* Lista de Estacas Actualmente Asignadas */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-green-600">
                                        <Users className="h-5 w-5" />
                                        Estacas Actualmente Asignadas
                                    </CardTitle>
                                    <CardDescription>
                                        {assignedStakes.length} estaca(s) asignada(s)
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {assignedStakes.length > 0 ? (
                                        <div className="h-[200px] pr-4 overflow-y-auto">
                                            <div className="space-y-2">
                                                {assignedStakes.map((stake) => (
                                                    <div
                                                        key={`assigned-${stake.id}`}
                                                        className="flex items-center justify-between p-3 border border-green-200 bg-green-50 rounded-lg"
                                                    >
                                                        <div className="flex-1 min-w-0">
                                                            <div className="font-medium text-sm truncate text-green-800">
                                                                {stake.name}
                                                            </div>
                                                            <div className="text-xs text-green-600 truncate">
                                                                {stake.country?.name}
                                                            </div>
                                                        </div>
                                                        <Badge variant="outline" className="text-green-700 border-green-300">
                                                            Asignada
                                                        </Badge>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-6 text-muted-foreground">
                                            <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No hay estacas asignadas</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Lista de Nuevas Estacas Seleccionadas */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-blue-600">
                                        <Users className="h-5 w-5" />
                                        Nuevas Estacas Seleccionadas
                                    </CardTitle>
                                    <CardDescription>
                                        {newlySelectedStakes.length} estaca(s) seleccionada(s)
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {newlySelectedStakes.length > 0 ? (
                                        <>
                                            <div className="h-[200px] pr-4 overflow-y-auto">
                                                <div className="space-y-2">
                                                    {newlySelectedStakes.map((stake) => (
                                                        <div
                                                            key={`new-${stake.id}`}
                                                            className="flex items-center justify-between p-3 border border-blue-200 bg-blue-50 rounded-lg"
                                                        >
                                                            <div className="flex-1 min-w-0">
                                                                <div className="font-medium text-sm truncate text-blue-800">
                                                                    {stake.name}
                                                                </div>
                                                                <div className="text-xs text-blue-600 truncate">
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

                                            <div className="mt-4">
                                                <Button
                                                    onClick={handleAssignStakes}
                                                    disabled={processing || newlySelectedStakes.length === 0}
                                                    className="w-full"
                                                >
                                                    {processing ? 'Asignando...' : `Asignar ${newlySelectedStakes.length} Nueva(s) Estaca(s)`}
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-6 text-muted-foreground">
                                            <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No hay estacas seleccionadas</p>
                                            <p className="text-xs mt-1">
                                                Selecciona estacas del panel izquierdo
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </AccessControlLayout>
        </AppLayout>
    );
}
