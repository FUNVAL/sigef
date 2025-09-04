import { MenuOption } from "@/components/globals/appbar";

const referencesNavItems: MenuOption[] = [
    {
        label: 'Dashboard',
        href: '/references/dashboard',
    },
    {
        label: 'References',
        href: '/references?status=1',
    },
];

export default referencesNavItems;
