import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { router } from "@inertiajs/react";

type FilterDropdownProps = {
    data: { id: number; name: string }[];
    paramKey: string;
    placeholder?: string;
    allowAll?: boolean;
    className?: string;
};

export default function DropdownFilter({
    data,
    paramKey,
    placeholder,
    allowAll,
    className = ""
}: FilterDropdownProps) {
    const url = new URL(window.location.href);
    const paramKeyValue = url.searchParams.get(paramKey);
    const current = paramKeyValue ? paramKeyValue : (allowAll ? "0" : '');

    const handleChange = (next: number | null) => {
        const url = new URL(window.location.href);

        if (next == null || Number.isNaN(next) || next === 0) {
            url.searchParams.delete(paramKey);
        } else {
            url.searchParams.set(paramKey, String(next));
        }

        router.get(`${url.pathname}${url.search}`, {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <Label className={`flex flex-col ${className}`}>
            <span className="mb-1 text-sm font-medium">{placeholder}</span>
            <Select
                defaultValue={String(current)}
                onValueChange={(val) => {
                    const next = val ? Number(val) : null;
                    handleChange(next);
                }}
            >
                <SelectTrigger className="w-fit min-w-45">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {allowAll && (
                        <SelectItem key="0" value="0" defaultChecked>
                            Todos
                        </SelectItem>
                    )}
                    {data.map(opt => (
                        <SelectItem key={opt.id} value={String(opt.id)}>
                            {opt.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </Label>
    );
}