import { SharedData, type BreadcrumbItem, type User } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { Clock, User as UserIcon, Shield } from 'lucide-react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// Componente de tarjeta de bienvenida integrado al design system
const WelcomeCard = ({ user }: { user: User }) => {
    const currentHour = new Date().getHours();
    let greeting = '';

    if (currentHour < 12) {
        greeting = 'Buenos días';
    } else if (currentHour < 18) {
        greeting = 'Buenas tardes';
    } else {
        greeting = 'Buenas noches';
    }

    const formatDate = () => {
        return new Date().toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                                {user.fullname.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-primary text-xl">
                                {greeting}, {user.firstname}
                            </CardTitle>
                            <CardDescription>
                                {formatDate()}
                            </CardDescription>
                        </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Activo
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex items-center space-x-3 rounded-lg border p-3">
                        <UserIcon className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-sm font-medium">Usuario</p>
                            <p className="text-muted-foreground text-xs">{user.fullname}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 rounded-lg border p-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-sm font-medium">Último acceso</p>
                            <p className="text-muted-foreground text-xs">Hoy</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 rounded-lg border p-3">
                        <Shield className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-sm font-medium">Estado</p>
                            <p className="text-muted-foreground text-xs">{user.status.name}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function Dashboard() {
     const { auth } = usePage<SharedData>().props;
    return <AppLayout breadcrumbs={breadcrumbs}>
        <WelcomeCard user={auth.user} />
    </AppLayout>
}
