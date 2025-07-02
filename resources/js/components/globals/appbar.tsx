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
    const currentPath = (window.location.pathname);
    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
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
                                    <NavigationMenuContent className="right-0 left-auto">
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
            </NavigationMenuList>
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
