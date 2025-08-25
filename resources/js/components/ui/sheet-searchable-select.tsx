import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown } from 'lucide-react'; // Importamos el ícono de Lucide

interface SheetSearchableSelectProps extends React.ComponentPropsWithoutRef<'div'> {
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
    hideSearch?: boolean;
    all?: boolean;
}

const SheetSearchableSelect = React.forwardRef<HTMLDivElement, SheetSearchableSelectProps>(({
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
    hideSearch = false,
    all = true,
    ...props
}, ref) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);
    const componentRef = React.useRef<HTMLDivElement>(null);

    const filteredData = React.useMemo(() => {
        if (hideSearch || !searchQuery) return data;
        return data.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.id.toString().includes(searchQuery)
        );
    }, [data, searchQuery, hideSearch]);

    const selectedName = React.useMemo(() => {
        if (!value || value === "0") return placeholder;
        const selected = data.find(item => item.id.toString() === value);
        return selected ? selected.name : placeholder;
    }, [value, data, placeholder]);

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
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

    React.useEffect(() => {
        if (!isOpen) {
            setSearchQuery('');
        }
    }, [isOpen]);

    return (
        <div className="relative space-y-2" ref={componentRef} {...props}>
            {label && (
                <Label htmlFor={id}>{label}</Label>
            )}

            <input
                type="hidden"
                name={name}
                id={id}
                value={value || ''}
                required={required}
            />

            <div
                className={cn(
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <span className={cn("truncate", !value && "text-muted-foreground")}>
                    {selectedName}
                </span>
                <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform", isOpen && "rotate-180")} />
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80">

                    {!hideSearch && (
                        <div className="p-2">
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={searchPlaceholder}
                                className="mb-2"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    )}

                    <ScrollArea className="max-h-[200px] overflow-y-auto" >
                        <div className={!hideSearch ? "" : "pt-2"}>

                            {all &&
                                <div
                                    className={cn(
                                        "relative flex cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                                        (value === "" || value === "0") && "bg-accent text-accent-foreground"
                                    )}
                                    onClick={() => {
                                        onValueChange("0");
                                        setIsOpen(false);
                                    }}
                                >
                                    Todos
                                </div>
                            }

                            {filteredData.length === 0 ? (
                                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                    {emptyMessage}
                                </div>
                            ) : (
                                filteredData.map((item) => (
                                    <div
                                        key={item.id}
                                        className={cn(
                                            "relative flex cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                                            value === item.id.toString() && "bg-accent text-accent-foreground"
                                        )}
                                        onClick={() => {
                                            onValueChange(item.id.toString());
                                            setIsOpen(false);
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                ))
                            )}
                        </div>
                    </ScrollArea>
                </div>
            )}
        </div>
    );
});

SheetSearchableSelect.displayName = 'SheetSearchableSelect';

export { SheetSearchableSelect };
export default SheetSearchableSelect;