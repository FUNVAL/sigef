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
import { Head } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { MapPin, Trash2, Users, CheckCircle } from 'lucide-react';

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

export default function AssignStakes({ countries, userId, userName }: Props) {
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [stakes, setStakes] = useState<Stake[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedStakes, setSelectedStakes] = useState<Stake[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [initialAssignedStakes, setInitialAssignedStakes] = useState<Stake[]>([]);
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
        show: boolean;
    }>({ type: 'success', message: '', show: false });

    // Función para mostrar notificación
    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message, show: true });
        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            setNotification(prev => ({ ...prev, show: false }));
        }, 5000);
    };
    const loadAssignedStakes = useCallback(async () => {
        try {
            // Usar el nuevo endpoint que devuelve directamente las estacas del usuario
            const response = await axios.get(`/api/admin/user-stakes/${userId}`);

            if (response.data.status === 'success') {
                const assignedStakeObjects = response.data.stakes || [];
                setSelectedStakes(assignedStakeObjects);
                setInitialAssignedStakes(assignedStakeObjects); // Guardar estado inicial
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

    // Remover estaca seleccionada directamente de la lista de cambios
    const removeStakeFromChanges = (stakeId: number) => {
        setSelectedStakes(prev => prev.filter(s => s.id !== stakeId));
    };

    // Calcular cambios
    const getChanges = () => {
        const initialIds = new Set(initialAssignedStakes.map(s => s.id));
        const currentIds = new Set(selectedStakes.map(s => s.id));

        // Estacas que se van a asignar (están en current pero no en initial)
        const toAssign = selectedStakes.filter(stake => !initialIds.has(stake.id));

        // Estacas que se van a desasignar (están en initial pero no en current)
        const toUnassign = initialAssignedStakes.filter(stake => !currentIds.has(stake.id));

        return { toAssign, toUnassign };
    };

    const { toAssign, toUnassign } = getChanges();
    const hasChanges = toAssign.length > 0 || toUnassign.length > 0;

    // Manejar guardado de cambios
    const handleSaveChanges = async () => {
        if (!hasChanges) return;

        setSubmitting(true);
        try {
            // Obtener todas las estacas finales (las que quedarán asignadas)
            const finalStakeIds = selectedStakes.map(s => s.id);

            console.log('=== SAVING CHANGES ===');
            console.log('User ID:', userId);
            console.log('Initial stakes:', initialAssignedStakes.map(s => s.id));
            console.log('Final stakes:', finalStakeIds);
            console.log('To assign:', toAssign.map(s => s.id));
            console.log('To unassign:', toUnassign.map(s => s.id));

            // Hacer la llamada al backend para actualizar estacas
            const response = await axios.patch(`/stakes/${userId}/assign-user`, {
                stakes: finalStakeIds
            }, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                    'Content-Type': 'application/json'
                }
            });

            console.log('Backend response:', response.data);

            // Mostrar mensaje de éxito
            const assignMessage = toAssign.length > 0 ? `${toAssign.length} estaca(s) asignada(s)` : '';
            const unassignMessage = toUnassign.length > 0 ? `${toUnassign.length} estaca(s) desasignada(s)` : '';
            const messages = [assignMessage, unassignMessage].filter(Boolean).join(', ');
            showNotification('success', `Cambios guardados exitosamente: ${messages}`);

            // Recargar las estacas asignadas para reflejar los cambios
            await loadAssignedStakes();

        } catch (error) {
            console.error('Error saving changes:', error);
            showNotification('error', 'Error al guardar los cambios');
        } finally {
            setSubmitting(false);
        }
    };    // Verificar si una estaca está seleccionada
    const isStakeSelected = (stakeId: number) => {
        return selectedStakes.some(s => s.id === stakeId);
    };

    // Separar estacas actualmente asignadas de las disponibles
    const currentlyAssignedStakes = selectedStakes
        .filter(stake => initialAssignedStakes.some(initial => initial.id === stake.id))
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Asignar Estacas" />

            {/* Notificación Toast */}
            {notification.show && (
                <div className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg shadow-lg border ${
                    notification.type === 'success'
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : 'bg-red-50 border-red-200 text-red-800'
                } transition-all duration-300 ease-in-out`}>
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                            {notification.type === 'success' ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                                <div className="h-5 w-5 rounded-full bg-red-600 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">!</span>
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">
                                {notification.type === 'success' ? 'Éxito' : 'Error'}
                            </p>
                            <p className="text-sm mt-1 opacity-90">
                                {notification.message}
                            </p>
                        </div>
                        <button
                            onClick={() => setNotification(prev => ({ ...prev, show: false }))}
                            className="flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors"
                        >
                            <span className="sr-only">Cerrar</span>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            <AccessControlLayout
                headings={{
                    title: 'Asignar Estacas',
                    description: `Asignar estacas a ${userName}`,
                }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Panel principal de selección */}
                    <div className="md:col-span-1 lg:col-span-1">
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

                    {/* Panel de Estacas Asignadas Actualmente */}
                    <div className="md:col-span-1 lg:col-span-1">
                        <div className="space-y-4 sticky top-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-green-600">
                                        <Users className="h-5 w-5" />
                                        Estacas Asignadas
                                    </CardTitle>
                                    <CardDescription>
                                        {currentlyAssignedStakes.length} estaca(s) asignada(s)
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {currentlyAssignedStakes.length > 0 ? (
                                        <div className="h-[300px] lg:h-[400px] pr-4 overflow-y-auto">
                                            <div className="space-y-2">
                                                {currentlyAssignedStakes.map((stake) => (
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
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeStakeFromChanges(stake.id)}
                                                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                            title="Desasignar estaca"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-6 lg:py-8 text-muted-foreground">
                                            <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No hay estacas asignadas</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Panel de Cambios Pendientes - Solo visible en md, en lg será columna separada */}
                            <div className="lg:hidden">
                                {hasChanges ? (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-blue-600">
                                                <Users className="h-5 w-5" />
                                                Cambios Pendientes
                                            </CardTitle>
                                            <CardDescription>
                                                {toAssign.length + toUnassign.length} cambio(s) pendiente(s)
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {/* Asignaciones nuevas */}
                                                {toAssign.length > 0 && (
                                                    <div>
                                                        <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center gap-1">
                                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                            Asignar ({toAssign.length})
                                                        </h4>
                                                        <div className="space-y-1 max-h-[120px] overflow-y-auto">
                                                            {toAssign.map((stake) => (
                                                                <div
                                                                    key={`assign-${stake.id}`}
                                                                    className="text-xs p-2 bg-green-50 border border-green-200 rounded text-green-800"
                                                                >
                                                                    + {stake.name}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Desasignaciones */}
                                                {toUnassign.length > 0 && (
                                                    <div>
                                                        <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center gap-1">
                                                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                                            Desasignar ({toUnassign.length})
                                                        </h4>
                                                        <div className="space-y-1 max-h-[120px] overflow-y-auto">
                                                            {toUnassign.map((stake) => (
                                                                <div
                                                                    key={`unassign-${stake.id}`}
                                                                    className="text-xs p-2 bg-red-50 border border-red-200 rounded text-red-800"
                                                                >
                                                                    - {stake.name}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="mt-4">
                                                    <Button
                                                        onClick={handleSaveChanges}
                                                        disabled={submitting || !hasChanges}
                                                        className="w-full"
                                                    >
                                                        {submitting ? 'Guardando...' : `Guardar Cambios (${toAssign.length + toUnassign.length})`}
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-gray-600">
                                                <Users className="h-5 w-5" />
                                                Cambios
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-center py-6 text-muted-foreground">
                                                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                                <p className="text-sm">No hay cambios pendientes</p>
                                                <p className="text-xs mt-1">
                                                    Selecciona o deselecciona estacas para ver los cambios
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Panel de Cambios Pendientes - Solo visible en lg+ como columna separada */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-4">
                            {hasChanges ? (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-blue-600">
                                            <Users className="h-5 w-5" />
                                            Cambios Pendientes
                                        </CardTitle>
                                        <CardDescription>
                                            {toAssign.length + toUnassign.length} cambio(s) pendiente(s)
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {/* Asignaciones nuevas */}
                                            {toAssign.length > 0 && (
                                                <div>
                                                    <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center gap-1">
                                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                        Asignar ({toAssign.length})
                                                    </h4>
                                                    <div className="space-y-1 max-h-[150px] overflow-y-auto">
                                                        {toAssign.map((stake) => (
                                                            <div
                                                                key={`assign-${stake.id}`}
                                                                className="text-xs p-2 bg-green-50 border border-green-200 rounded text-green-800"
                                                            >
                                                                + {stake.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Desasignaciones */}
                                            {toUnassign.length > 0 && (
                                                <div>
                                                    <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center gap-1">
                                                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                                        Desasignar ({toUnassign.length})
                                                    </h4>
                                                    <div className="space-y-1 max-h-[150px] overflow-y-auto">
                                                        {toUnassign.map((stake) => (
                                                            <div
                                                                key={`unassign-${stake.id}`}
                                                                className="text-xs p-2 bg-red-50 border border-red-200 rounded text-red-800"
                                                            >
                                                                - {stake.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mt-6">
                                                <Button
                                                    onClick={handleSaveChanges}
                                                    disabled={submitting || !hasChanges}
                                                    className="w-full"
                                                >
                                                    {submitting ? 'Guardando...' : `Guardar Cambios (${toAssign.length + toUnassign.length})`}
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-gray-600">
                                            <Users className="h-5 w-5" />
                                            Cambios
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center py-8 text-muted-foreground">
                                            <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No hay cambios pendientes</p>
                                            <p className="text-xs mt-1">
                                                Selecciona o deselecciona estacas para ver los cambios
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </AccessControlLayout>
        </AppLayout>
    );
}
