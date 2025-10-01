import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface Country {
    id: number;
    name: string;
}

interface CountryFilterProps {
    countries: Country[];
    selectedCountryId?: string;
    onCountryChange: (countryId: string | undefined) => void;
    className?: string;
}

export function CountryFilter({
    countries,
    selectedCountryId,
    onCountryChange,
    className = ""
}: CountryFilterProps) {
    const handleClearFilter = () => {
        onCountryChange(undefined);
    };

    return (
        <div className={`flex flex-col sm:flex-row sm:items-center gap-2 ${className}`}>
            <Label htmlFor="country-filter" className="text-sm font-medium whitespace-nowrap">
                Filtrar por país:
            </Label>
            <div className="flex items-center gap-1">
                <Select
                    value={selectedCountryId || "all"}
                    onValueChange={(value) => onCountryChange(value === "all" ? undefined : value)}
                >
                    <SelectTrigger id="country-filter" className="w-full sm:w-48 min-w-32">
                        <SelectValue placeholder="Todos los países" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los países</SelectItem>
                        {countries.map((country) => (
                            <SelectItem key={country.id} value={String(country.id)}>
                                {country.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {selectedCountryId && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearFilter}
                        className="h-8 w-8 p-0 flex-shrink-0"
                        title="Limpiar filtro"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
