import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Globe, Check } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type PageProps = {
    locale: string;
    languages: Record<string, string>;
};

export default function LanguageSwitcher() {
    const { locale, languages } = usePage<PageProps>().props;

    // Mapeo de idiomas a emojis/banderas (opcional)
    const languageFlags: Record<string, string> = {
        es: '🇪🇸',
        en: '🇺🇸',
        pt: '🇵🇹',
        ht: '🇭🇹'
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1 px-2">
                    <Globe className="h-4 w-4" />
                    <span className="font-medium">
                        {(languages as Record<string, string>)[locale]}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                {Object.keys(languages as Record<string, string>).map((lang) => (
                    <DropdownMenuItem key={lang} asChild>
                        <Link
                            href={route('language.switch', lang)}
                            className="flex w-full items-center justify-between"
                            preserveScroll
                        >
                            <span className="flex items-center gap-2">
                                <span>{languageFlags[lang]}</span>
                                <span>{(languages as Record<string, string>)[lang]}</span>
                            </span>
                            {locale === lang && (
                                <Check className="h-4 w-4 text-primary" />
                            )}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}