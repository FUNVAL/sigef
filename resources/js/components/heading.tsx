export default function Heading({ title, description, className }: { title?: string; description?: string, className?: string }) {
    return (
        <div className={`${!className?.includes("mb-") ? 'mb-8' : className} space-y-0.5 `}>
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
    );
}
