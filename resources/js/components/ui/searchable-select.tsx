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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';

interface SearchableSelectProps extends React.ComponentPropsWithoutRef<'div'> {
    data: { id: number; name: string; }[];
    value?: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    className?: string;
    disabled?: boolean;
    name?: string;
    required?: boolean;
    id?: string;
    label?: string;
}

const SearchableSelect = React.forwardRef<HTMLDivElement, SearchableSelectProps>(({
    data,
    value,
    onValueChange,
    placeholder = "Seleccionar opción...",
    searchPlaceholder = "Buscar...",
    emptyMessage = "No se encontraron resultados.",
    className,
    disabled = false,
    name,
    required = false,
    id,
    label,
    ...props
}, ref) => {
    const [open, setOpen] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const selectedItem = data.find(item => item.id.toString() === value);

    const handleSelect = (selectedValue: string) => {
        onValueChange(selectedValue === value ? "" : selectedValue);
        setOpen(false);
    };

    return (
        <div className="relative space-y-2" ref={ref} {...props}>
            {label && (
                <Label htmlFor={id}>{label}</Label>
            )}

            <div>
                <input
                    ref={inputRef}
                    type="hidden"
                    name={name}
                    id={id}
                    value={value || ''}
                    required={required}
                />

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            type="button"
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            aria-controls={id ? `${id}-dropdown` : undefined}
                            className={cn(
                                "w-full justify-between",
                                !selectedItem && 'text-muted-foreground',
                                className
                            )}
                            disabled={disabled}
                            id={id}
                            onClick={() => document.getElementById(id || '')?.focus()}
                        >
                            {selectedItem ? selectedItem.name : placeholder}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-full p-0"
                        align="start"
                        style={{ width: 'var(--radix-popover-trigger-width)' }}
                        id={id ? `${id}-dropdown` : undefined}
                    >
                        <Command>
                            <CommandInput placeholder={searchPlaceholder} />
                            <CommandList>
                                <CommandEmpty>{emptyMessage}</CommandEmpty>
                                <CommandGroup>
                                    {data.map((item) => (
                                        <CommandItem
                                            key={item.id}
                                            value={`${item.name} ${item.id}`}
                                            onSelect={() => handleSelect(item.id.toString())}
                                        >
                                            <Check
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    value === item.id.toString() ? 'opacity-100' : 'opacity-0'
                                                )}
                                            />
                                            {item.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
});

SearchableSelect.displayName = 'SearchableSelect';

export { SearchableSelect };
export default SearchableSelect;