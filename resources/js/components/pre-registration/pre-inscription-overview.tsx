import { Eye } from 'lucide-react';
import { type PreInscription } from '../../types/pre-inscription';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CompleteDialog } from '../ui/complete-dialog';
import { Label } from '../ui/label';

const PreInscriptionOverview = ({ preInscription }: { preInscription: PreInscription }) => {
    // Destructuración mejorada
    const {
        first_name,
        middle_name,
        last_name,
        second_last_name,
        age,
        email,
        phone,
        additional_phone,
        served_mission,
        currently_working,
        available_full_time,
        created_at,
        declined_description,
        gender,
        marital_status,
        country,
        stake,
        job_type_preference,
        status,
        declined_reason,
        course,
    } = preInscription;
    const getFullName = () => `${first_name} ${middle_name || ''} ${last_name} ${second_last_name || ''}`.trim();

    const getGenderDisplay = () => gender?.name || 'No especificado';

    const getMaritalStatusDisplay = () => marital_status?.name || 'No especificado';

    const getCountryDisplay = () => country?.name || 'No especificado';

    const getStakeDisplay = () => stake?.name || 'No especificado';

    const getJobTypePreferenceDisplay = () => job_type_preference?.name || 'No especificado';

    const getStatusDisplay = () => status?.name || 'Sin estado';

    const getDeclinedReasonDisplay = () => declined_reason?.name || '';

    const getWorkingStatusDisplay = () => {
        if (currently_working === null) return 'No especificado';
        return currently_working ? 'Sí' : 'No';
    };

    const getAvailabilityDisplay = () => {
        if (available_full_time === null) return 'No especificado';
        return available_full_time ? 'Tiempo completo' : 'No disponible';
    };

    const getVariant = (value: boolean | null | undefined | string) => (value ? 'default' : 'outline');

    const getStatusVariant = () => {
        if (!status) return 'outline';
        const statusName = status.name.toLowerCase();
        if (statusName === 'aprobada') return 'default';
        if (statusName === 'no aprobada') return 'destructive';
        return 'secondary';
    };

    const getStatusClassName = () => {
        if (!status) return 'bg-gray-100 text-gray-800';
        const statusName = status.name.toLowerCase();
        if (statusName === 'aprobado') {
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        }
        if (statusName === 'no aprobada') {
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        }
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    };

    const getFormattedDate = () => (created_at ? new Date(created_at).toLocaleDateString() : 'N/A');

    return (
        <CompleteDialog
            btnLabel="Ver Detalles"
            dialogTitle="Detalles de la preinscripción"
            dialogDescription="Aquí puedes ver los detalles completos de la preinscripción seleccionada."
            icon={<Eye className="h-4 w-4" />}
            contentClassName="md:max-w-3xl"
        >
            <div className="grid max-h-[80vh] gap-6 overflow-y-auto p-4">
                {/* Información Personal */}
                <Card className="border-blue-200">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-800 dark:text-blue-500">Información Personal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Nombre Completo:</Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{getFullName()}</p>
                            </div>
                            <div>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Género:</Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{getGenderDisplay()}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Edad:</Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{age} años</p>
                            </div>
                            <div>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Estado Civil:</Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{getMaritalStatusDisplay()}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Email:</Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{email}</p>
                            </div>
                            <div>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Teléfono:</Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{phone}</p>
                            </div>
                            {additional_phone && (
                                <div>
                                    <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Teléfono adicional:</Label>
                                    <p className="block text-sm text-gray-900 dark:text-gray-100">{additional_phone}</p>
                                </div>
                            )}
                            <div>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Curso seleccionado:</Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{course?.name}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Ubicación */}
                <Card className="border-blue-200">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-800 dark:text-blue-500">Ubicación</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">País:</Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{getCountryDisplay()}</p>
                            </div>
                            <div>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Estaca:</Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{getStakeDisplay()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Información Laboral y Misión */}
                <Card className="border-blue-200">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-800 dark:text-blue-500">Información Laboral y de Servicio</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div className='flex flex-col'>
                                <Label className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                    ¿Sirvió misión?
                                </Label>
                                <Badge variant={
                                    preInscription.served_mission?.id === 2 ? "default" :
                                        preInscription.served_mission?.id === 3 ? "outline" : "secondary"
                                }>
                                    {preInscription.served_mission?.name || "No especificado"}
                                </Badge>
                            </div>
                            <div className='flex flex-col'>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">¿Trabajando actualmente?</Label>
                                <Badge variant={getVariant(currently_working)}>{getWorkingStatusDisplay()}</Badge>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Disponibilidad</Label>
                                <Badge variant={getVariant(available_full_time)} className="block">
                                    {getAvailabilityDisplay()}
                                </Badge>
                            </div>
                            <div>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Preferencia Laboral</Label>
                                <Badge variant={getVariant(job_type_preference?.name)} className="block">
                                    {getJobTypePreferenceDisplay()}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Estado y Seguimiento */}
                <Card className="border-blue-200">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-800 dark:text-blue-500">Estado y Seguimiento</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Fecha de Solicitud:</Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">{getFormattedDate()}</p>
                            </div>
                            <div className="flex flex-col">
                                <Label className="font-mono text-lg font-bold text-gray-800 dark:text-gray-300">Estado Actual</Label>
                                <Badge variant={getStatusVariant()} className={getStatusClassName()}>
                                    {getStatusDisplay()}
                                </Badge>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {declined_reason && (
                                <div>
                                    <Label className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                        Razón del Estado
                                    </Label>
                                    <p className="block text-sm text-gray-900 dark:text-gray-100">
                                        {getDeclinedReasonDisplay()}
                                    </p>
                                </div>
                            )}
                            {declined_description && (
                                <div>
                                    <Label className="font-mono text-lg font-bold text-gray-800 dark:text-blue-100">Descripción del estado</Label>
                                    <p className="block text-sm whitespace-pre-wrap text-gray-900 dark:text-gray-100">{declined_description}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </CompleteDialog>
    );
};

export default PreInscriptionOverview;
