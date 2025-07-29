import { Label } from '../ui/label';
import { Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { CompleteDialog } from '../ui/complete-dialog';
import { type PreInscription } from '../../types/pre-inscription';

const PreInscriptionOverview = ({ preInscription }: { preInscription: PreInscription }) => {
    const fullName = `${preInscription.first_name} ${preInscription.middle_name || ''} ${preInscription.last_name} ${preInscription.second_last_name || ''}`.trim();

    return (
        <CompleteDialog
            btnLabel="Ver Detalles"
            dialogTitle="Detalles de la Pre-inscripción"
            dialogDescription="Aquí puedes ver los detalles completos de la pre-inscripción seleccionada."
            icon={<Eye className="w-4 h-4" />}
        >
            <div className="grid gap-6 py-4 max-h-[80vh] overflow-y-auto">

                {/* Información Personal */}
                <Card className="border-blue-200">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                            Información Personal
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Nombre Completo
                                </Label>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {fullName}
                                </p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Género
                                </Label>
                                <p className="text-sm text-gray-900 dark:text-gray-100">
                                    {preInscription.gender?.name || 'No especificado'}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Edad
                                </Label>
                                <p className="text-sm text-gray-900 dark:text-gray-100">
                                    {preInscription.age} años
                                </p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Estado Civil
                                </Label>
                                <p className="text-sm text-gray-900 dark:text-gray-100">
                                    {preInscription.marital_status?.name || 'No especificado'}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Email
                                </Label>
                                <p className="text-sm text-gray-900 dark:text-gray-100">
                                    {preInscription.email}
                                </p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Teléfono
                                </Label>
                                <p className="text-sm text-gray-900 dark:text-gray-100">
                                    {preInscription.phone}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Ubicación */}
                <Card className="border-blue-200">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                            Ubicación
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    País
                                </Label>
                                <p className="text-sm text-gray-900 dark:text-gray-100">
                                    {preInscription.country?.name || 'No especificado'}
                                </p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Estaca
                                </Label>
                                <p className="text-sm text-gray-900 dark:text-gray-100">
                                    {preInscription.stake?.name || 'No especificado'}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Información Laboral y Misión */}
                <Card className="border-blue-200">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                            Información Laboral y de Servicio
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    ¿Sirvió misión?
                                </Label>
                                <Badge variant={
                                    preInscription.served_mission?.id === 2 ? "default" :
                                    preInscription.served_mission?.id === 3 ? "outline" : "secondary"
                                }>
                                    {preInscription.served_mission?.name || "No especificado"}
                                </Badge>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    ¿Trabajando actualmente?
                                </Label>
                                <Badge variant={
                                    preInscription.currently_working === null ? "outline" :
                                    preInscription.currently_working ? "default" : "secondary"
                                }>
                                    {preInscription.currently_working === null ? "No especificado" :
                                     preInscription.currently_working ? "Sí" : "No"}
                                </Badge>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Disponibilidad
                                </Label>
                                <Badge variant={
                                    preInscription.available_full_time === null ? "outline" :
                                    preInscription.available_full_time ? "default" : "secondary"
                                }>
                                    {preInscription.available_full_time === null ? "No especificado" :
                                     preInscription.available_full_time ? "Tiempo completo" : "Tiempo parcial"}
                                </Badge>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Preferencia Laboral
                                </Label>
                                <p className="text-sm text-gray-900 dark:text-gray-100">
                                    {preInscription.job_type_preference?.name || 'No especificado'}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Estado y Seguimiento */}
                <Card className="border-blue-200">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                            Estado y Seguimiento
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Fecha de Solicitud
                                </Label>
                                <p className="text-sm text-gray-900 dark:text-gray-100">
                                    {preInscription.created_at ? new Date(preInscription.created_at).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Estado Actual
                                </Label>
                                <Badge
                                    variant={
                                        !preInscription.status ? "outline" :
                                        preInscription.status.name.toLowerCase() === "aprobado"
                                            ? "default"
                                            : preInscription.status.name.toLowerCase() === "rechazado"
                                                ? "destructive"
                                                : "secondary"
                                    }
                                    className={
                                        !preInscription.status ? "bg-gray-100 text-gray-600" :
                                        preInscription.status.name.toLowerCase() === "aprobado"
                                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                            : preInscription.status.name.toLowerCase() === "rechazado"
                                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                    }
                                >
                                    {preInscription.status?.name || 'Sin estado'}
                                </Badge>
                            </div>
                        </div>
                        {preInscription.declined_reason && (
                            <div>
                                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Razón del Rechazo
                                </Label>
                                <p className="text-sm text-gray-900 dark:text-gray-100">
                                    {preInscription.declined_reason.name}
                                </p>
                            </div>
                        )}
                        {preInscription.comments && (
                            <div>
                                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Comentarios
                                </Label>
                                <p className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                                    {preInscription.comments}
                                </p>
                            </div>
                        )}
                        {preInscription.declined_description && (
                            <div>
                                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Descripción del Rechazo
                                </Label>
                                <p className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                                    {preInscription.declined_description}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </CompleteDialog>
    );
}

export default PreInscriptionOverview;
