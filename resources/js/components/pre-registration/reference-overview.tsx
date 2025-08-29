import { Label } from '../ui/label';
import { Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { CompleteDialog } from '../ui/complete-dialog';
import { Reference } from '../../types/reference';


const ReferenceOverview = ({ reference }: { reference: Reference }) => {

    return (
        <CompleteDialog
            btnLabel="Ver Detalles"
            dialogTitle="Detalles de la Referencia"
            dialogDescription="Aquí puedes ver los detalles completos de la referencia seleccionada."
            icon={<Eye className="w-4 h-4" />}
            contentClassName='md:max-w-3xl'
        >
            <div className="grid gap-6 p-4 max-h-[80vh] overflow-y-auto">

                <Card className="border-blue-200">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-800 dark:text-blue-500">
                            Persona Referida
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="font-bold font-mono text-lg text-blue-00 dark:text-blue-100">
                                    Nombre Completo:
                                </Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">
                                    {reference.name}
                                </p>
                            </div>
                            <div>
                                <Label className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                    Género:
                                </Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">
                                    {reference.gender.name}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                    Edad:
                                </Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">
                                    {reference.age} años
                                </p>
                            </div>
                            <div>
                                <Label className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                    País:
                                </Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">
                                    {reference.country.name}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                    Teléfono:
                                </Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">
                                    {reference.phone}
                                </p>
                            </div>
                            <div>
                                <Label className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                    Estaca:
                                </Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">
                                    {reference.stake.name}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Información del Referente */}
                <Card className="border-blue-200">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-800 dark:text-blue-500">
                            Información del Referente
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                    Nombre Completo:
                                </Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">
                                    {reference.referrer_name}
                                </p>
                            </div>
                            <div>
                                <Label className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                    Teléfono:
                                </Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">
                                    {reference.referrer_phone}
                                </p>
                            </div>
                        </div>
                        <div>
                            <Label className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                Relación con la persona referida:
                            </Label>
                            <p className="block text-sm text-gray-900 dark:text-gray-100">
                                {reference.relationship_with_referred.name}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Estado y Seguimiento */}
                <Card className="border-blue-200">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-800 dark:text-blue-500">
                            Estado y Seguimiento
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                    Fecha de Creación:
                                </Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">
                                    {reference.created_at ? new Date(reference.created_at).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <Label className="font-bold font-mono text-lg text-gray-800 dark:text-gray-300">
                                    Estado Actual
                                </Label>
                                <Badge
                                    variant={
                                        reference.status.name.toLowerCase() === "aceptado"
                                            ? "default"
                                            : reference.status.name.toLowerCase() === "no aprobado"
                                                ? "destructive"
                                                : "secondary"
                                    }
                                    className={
                                        reference.status.name.toLowerCase() === "aceptado"
                                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                            : reference.status.name.toLowerCase() === "no aprobado"
                                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                    }
                                >
                                    {reference.status.name}
                                </Badge>
                            </div>
                        </div>
                        {reference.declined_reason && (
                            <div>
                                <Label className="font-bold font-mono text-lg text-gray-800 dark:text-blue-100">
                                    Razón del Estado
                                </Label>
                                <p className="block text-sm text-gray-900 dark:text-gray-100">
                                    {reference.declined_reason.name}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </CompleteDialog>
    );
}

export default ReferenceOverview;
