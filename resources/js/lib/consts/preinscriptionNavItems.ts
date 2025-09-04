import { MenuOption } from "@/components/globals/appbar";

const preinscriptionsNavItems: MenuOption[] = [
    {
        label: 'Dashboard',
        href: '/pre-inscription/dashboard',
    },
    {
        label: 'Preinscripciones',
        href: '/pre-inscription?status=1',
    },
];

export default preinscriptionsNavItems;
