import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Country } from '@/types/country';

const Prefix = React.memo(({ code }: { code: string }) => (
    <span className="flex h-10 w-auto items-center justify-center rounded-md rounded-r-none border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
        {code}
    </span>
));
Prefix.displayName = 'Prefix';

interface DropdownProps {
    countries: Country[];
    selectedCountry?: Country;
    onCountrySelect: (country: Country) => void;
}

const CountryDropdown = React.memo(({ countries, selectedCountry, onCountrySelect }: DropdownProps) => {
    const [open, setOpen] = React.useState(false);

    const handleSelect = (country: Country) => {
        onCountrySelect(country);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-22 justify-between rounded-r-none"
                >
                    {selectedCountry ? `${selectedCountry.code}` : 'País'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-0">
                <Command>
                    <CommandInput placeholder="Buscar país..." />
                    <CommandList>
                        <CommandEmpty>No se encontró el país.</CommandEmpty>
                        <CommandGroup>
                            {countries.map((country) => (
                                <CommandItem
                                    key={country.id}
                                    value={`${country.name} ${country.code} ${country.phone_code}`}
                                    onSelect={() => handleSelect(country)}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            selectedCountry?.id === country.id ? 'opacity-100' : 'opacity-0'
                                        )}
                                    />
                                    {`${country.code} (${country.phone_code})`}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
});
CountryDropdown.displayName = 'CountryDropdown';


// --- Componente Principal: PhoneInput (Lógica de estado interno) ---

export interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    countries: Country[];
    selectedCountryId?: number;
    enableDropdown?: boolean;
    onInputChange: (value: string) => void;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
    ({ className, value, onInputChange, countries, selectedCountryId, enableDropdown = false, ...props }, ref) => {

        const inputRef = React.useRef<HTMLInputElement>(null);

        const [internalCountry, setInternalCountry] = React.useState<Country | undefined>(() =>
            countries.find((c) => c.id === selectedCountryId)
        );

        React.useEffect(() => {
            const country = countries.find((c) => c.id === selectedCountryId);
            setInternalCountry(country);
            updateInputValue(inputRef.current?.value || '', country?.phone_code || '');
        }, [selectedCountryId, countries]);

        const updateInputValue = (value: string, phone_code: string) => {
            const digitsOnly = value.split(') ')[1] || '';
            const sanitizedValue = digitsOnly.replace(/\D/g, '');
            onInputChange(`(${phone_code || ''}) ${sanitizedValue}`);
        }

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            updateInputValue(e.target.value, internalCountry?.phone_code || '');
        };

        const handleCountrySelect = (country: Country) => {
            setInternalCountry(country);
            updateInputValue(inputRef.current?.value || '', country.phone_code || '');
        };

        const prefix = internalCountry ? `${internalCountry.code}` : 'País';

        return (
            <div className={cn('flex items-center', className)}>
                {enableDropdown ? (
                    <CountryDropdown
                        countries={countries}
                        selectedCountry={internalCountry}
                        onCountrySelect={handleCountrySelect}
                    />
                ) : (
                    <Prefix code={prefix} />
                )}

                <Input
                    type="tel"
                    ref={inputRef}
                    value={value} // El valor del input sigue siendo controlado por el padre
                    onChange={handleInputChange}
                    placeholder="Número de teléfono"
                    className="rounded-l-none flex-1"
                    disabled={!internalCountry} // Se deshabilita basado en el estado interno
                    {...props}
                />
            </div>
        );
    }
);
PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };