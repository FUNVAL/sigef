import React, { useState, useEffect } from "react"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"

interface CountrySelectProps {
    countries: string[]
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export function CountrySelect({
    countries,
    value,
    onChange,
    placeholder = "Selecciona país",
}: CountrySelectProps) {
    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false)

    const filteredCountries = countries.filter((country) =>
        country.toLowerCase().includes(search.toLowerCase())
    )

    useEffect(() => {
        if (!open) setSearch("")
    }, [open])

    return (
        <Select value={value} onValueChange={onChange} open={open} onOpenChange={setOpen}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent className="max-h-[240px] overflow-y-auto">
                {/* Buscador fijo y con soporte para modo oscuro */}
                <div className="sticky top-0 z-10 bg-white dark:bg-black p-2 border-b border-border">
                    <input
                        type="text"
                        placeholder="Buscar país..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded border border-input px-3 py-2 text-sm bg-white dark:bg-black text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                    />
                </div>

                {/* Lista filtrada de países */}
                {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                        <SelectItem key={country} value={country}>
                            {country}
                        </SelectItem>
                    ))
                ) : (
                    <div className="p-2 text-center text-sm text-muted-foreground">
                        No se encontró país
                    </div>
                )}
            </SelectContent>
        </Select>
    )
}
