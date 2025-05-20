import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react'; 
console.log('Dashboard page loaded');
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Control de Accesos',
        href: '/access-control',
    },
];

export default function AccessControl({data}: { data: any }) { 
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Control de Accesos" />
         
        </AppLayout>
    );
} 