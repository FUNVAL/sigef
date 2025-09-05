"use client"

import * as React from "react"
import { Link } from "@inertiajs/react"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import AppearanceTabs from '@/components/appearance-tabs';
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";

export interface MenuOption {
    label: string
    items?: {
        title: string
        href: string
    }[]
    href?: string
}

interface NavigationMenuDemoProps {
    menuOptions: MenuOption[],
    className?: string
}

export default function Appbar({ menuOptions, className }: NavigationMenuDemoProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen(prev => !prev);
    const currentPath = (window.location.pathname);

    // Cerrar menú al hacer clic fuera
    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <NavigationMenu viewport={false} ref={menuRef}>
            <Button variant="ghost" className="sm:hidden" onClick={toggleMenu} aria-label="Toggle Menu">
                <Menu className=" h-8 w-8" />
            </Button>
            <NavigationMenuList className="hidden sm:flex sm:static gap-1" >
                {menuOptions.map((option, idx) => {
                    const isActive =
                        option.href === currentPath ||
                        (option.items && option.items.some(item => item.href === currentPath));
                    const activeClass = isActive
                        ? "text-blue-600 underline underline-offset-4 decoration-1 decoration-blue-200 text-base"
                        : "";
                    return (
                        <NavigationMenuItem key={option.label + idx} className="w-full">
                            {option.items ? (
                                <>
                                    <NavigationMenuTrigger className={activeClass}>
                                        {option.label}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="right-0 left-auto z-100">
                                        <ul className="min-w-max grid gap-2 p-1">
                                            {option.items.map((item) => {
                                                console.log(`Item: ${item.title}, Href: ${item.href}, Current Path: ${currentPath}`);
                                                return <ListItem
                                                    key={item.title}
                                                    title={item.title}
                                                    href={item.href}
                                                    active={item.href === currentPath}
                                                />
                                            })}
                                        </ul>
                                    </NavigationMenuContent>
                                </>
                            ) : option.href ? (
                                <NavigationMenuLink
                                    asChild
                                    className={`${navigationMenuTriggerStyle()} ${activeClass}`}
                                >
                                    <Link href={option.href}>{option.label}</Link>
                                </NavigationMenuLink>
                            ) : (
                                <NavigationMenuTrigger>
                                    {option.label}
                                </NavigationMenuTrigger>
                            )}
                        </NavigationMenuItem>
                    );
                })}
                {currentPath.includes('/settings') &&
                    <>
                        <Separator orientation="vertical" className="mx-2 h-full bg-gray-300 dark:bg-gray-700 py-3 px-px" />
                        <AppearanceTabs />
                    </>
                }
            </NavigationMenuList>

            {isOpen &&
                <NavigationMenuList className="sm:hidden h-40 absolute -right-4 top-8 flex-col z-50 px-4 bg-white dark:bg-[#0a0a0a] " >
                    {menuOptions.map((option, idx) => {
                        const isActive =
                            option.href === currentPath ||
                            (option.items && option.items.some(item => item.href === currentPath));
                        const activeClass = isActive
                            ? "text-blue-600 underline underline-offset-4 decoration-1 decoration-blue-200 text-base"
                            : "";
                        return (
                            <NavigationMenuItem key={option.label + idx} className="w-full">
                                {option.items ? (
                                    <>
                                        <NavigationMenuTrigger className={activeClass}>
                                            {option.label}
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent className="right-0 left-auto z-100">
                                            <ul className="min-w-max grid gap-2 p-1">
                                                {option.items.map((item) => {
                                                    console.log(`Item: ${item.title}, Href: ${item.href}, Current Path: ${currentPath}`);
                                                    return <ListItem
                                                        key={item.title}
                                                        title={item.title}
                                                        href={item.href}
                                                        active={item.href === currentPath}
                                                    />
                                                })}
                                            </ul>
                                        </NavigationMenuContent>
                                    </>
                                ) : option.href ? (
                                    <NavigationMenuLink
                                        asChild
                                        className={`${navigationMenuTriggerStyle()} ${activeClass}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Link href={option.href}>{option.label}</Link>
                                    </NavigationMenuLink>
                                ) : (
                                    <NavigationMenuTrigger>
                                        {option.label}
                                    </NavigationMenuTrigger>
                                )}
                            </NavigationMenuItem>
                        );
                    })}
                    {currentPath.includes('/settings') &&
                        <>
                            <AppearanceTabs />
                        </>
                    }
                </NavigationMenuList>
            }
        </NavigationMenu>
    )
}

function ListItem({
    title,
    href,
    active,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & {
    href: string
    active?: boolean
}) {
    const activeClass = active
        ? "text-blue-600 underline underline-offset-4 decoration-1 decoration-blue-200 text-base"
        : "";
    return (
        <li {...props} className={`min-w-max ${activeClass}`}>
            <NavigationMenuLink>
                <Link href={href} className="flex items-center gap-2">
                    <div>
                        <div className="text-sm leading-none font-medium">{title}</div>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
