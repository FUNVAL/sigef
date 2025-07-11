export default function AppLogo() {
    return (
        <div className="flex items-center space-x-2">
            <div className="bg-muted dark:bg-muted/30 flex aspect-square size-8 items-center justify-center rounded-md">
                <img src="/brujula.png" alt="Logo" className="h-6 w-6 object-contain" />
            </div>
            <div className="text-muted-foreground text-sm leading-tight dark:text-white">
                <span className="block text-2xl font-semibold">Funval</span>
            </div>
        </div>
    );
}
