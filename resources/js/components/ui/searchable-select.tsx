import { useEffect, useRef, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "./input";

interface SearchableSelectProps {
    data: { id: number; name: string; }[];
    value: string;
    onChange: (value: string) => void;
    searchField: string;
    id: string;
    name?: string;
}

export function SearchableSelect({ data, value, onChange, searchField, id, name }: SearchableSelectProps) {
    const [search, setSearch] = useState("")

    const filteredData = data.filter((item) =>
        String(item[searchField as keyof typeof item]).toLowerCase().includes(search.toLowerCase())
    )

    const selectRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setSearch("")
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger id={id} name={name || ''} className="w-full">
                <SelectValue placeholder={`Selecciona un ${searchField}`} />
            </SelectTrigger>
            <SelectContent
                ref={selectRef}
                className="pt-2 max-h-60 overflow-auto bg-background dark:bg-gray-900"
            >
                <div className="px-3 pb-2 sticky top-0 bg-background dark:bg-gray-900 z-10 border-b border-muted dark:border-gray-700">
                    <Input
                        autoFocus
                        placeholder="Buscar país..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full bg-background dark:bg-gray-900 text-foreground"
                    />
                </div>

                {filteredData.length > 0 ? (
                    filteredData.map((country) => (
                        <SelectItem key={country.name} value={country.id.toString()}>
                            {country.name}
                        </SelectItem>
                    ))
                ) : (
                    <div className="p-4 text-center text-muted-foreground select-none">
                        No se encontraron {searchField}s que coincidan con "{search}"
                    </div>
                )}
            </SelectContent>
        </Select>
    )
}

export default SearchableSelect