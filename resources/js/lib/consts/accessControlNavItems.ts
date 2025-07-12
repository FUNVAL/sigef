import { MenuOption } from "@/components/globals/appbar";

const navItems: MenuOption[] = [
    {
        label: 'Accesos',
        href: '/access-control',
    },
    {
        label: 'Usuarios',
        href: '/access-control/users',
        items: [
            {
                title: 'Lista de Usuarios',
                href: '/access-control/users',
            },
            {
                title: 'Nuevo Usuario',
                href: '/access-control/users/create',
            },
        ],
    },
];

export default navItems;