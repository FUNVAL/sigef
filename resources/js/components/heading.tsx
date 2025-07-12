import { cn } from "@/lib/utils";

export default function Heading({ title, description, className }: { title?: string; description?: string, className?: string }) {
    return (
        <div className={cn('pl-6 pt-6 text-3xl', className)}>
            <h2 className="font-semibold tracking-tight">{title}</h2>
            {description && (
                <p className="text-muted-foreground ml-1" style={{ fontSize: "0.5em" }}>
                    {description}
                </p>
            )}
        </div>
    );
}
