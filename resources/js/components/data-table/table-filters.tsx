import { usePage } from "@inertiajs/react";
import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { EnumItem, Enums } from "@/types/global";
import useFilters from "@/hooks/useFilters";
import SheetSearchableSelect from "@/components/ui/sheet-searchable-select";

type PageProps = {
    enums: Enums;
    responsables: EnumItem[] | null;
}

export default function TableFilters() {
    const { enums, responsables } = usePage<PageProps>().props;
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const { getValue, applyFilter, clearFilter, clearAllFilters, activeFiltersCount, getName } = useFilters([
        {
            key: "status",
            defaultValue: "0",
            getName: (v: string) => enums.requestStatus.find(s => s.id.toString() === v)?.name ?? v,
        },
        {
            key: "responsable",
            defaultValue: "0",
            getName: (v: string) => responsables?.find(r => r.id.toString() === v)?.name ?? v,
        },
    ]);

    const currentStatus = getValue("status");
    const currentResponsable = getValue("responsable");

    return (
        <div className="flex items-center gap-4">

            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" className="relative bg-transparent">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtros
                        {activeFiltersCount > 0 && (
                            <Badge
                                variant="destructive"
                                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-medium"
                            >
                                {activeFiltersCount}
                            </Badge>
                        )}
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px] px-4">
                    <SheetHeader className="space-y-3">
                        <SheetTitle className="text-lg font-semibold">Filtros</SheetTitle>
                        <SheetDescription className="text-sm text-muted-foreground">
                            Filtra los datos por estado y responsable para encontrar información específica
                        </SheetDescription>
                    </SheetHeader>

                    <div className="space-y-6 mt-8">
                        <div className="space-y-3">
                            <Label htmlFor="estado-filter" className="text-sm font-medium">
                                Estado
                            </Label>
                            <SheetSearchableSelect
                                id="estado-filter"
                                data={enums.requestStatus}
                                value={currentStatus === "0" ? "" : currentStatus ?? undefined}
                                onValueChange={(value) => applyFilter("status", value || "0")}
                                hideSearch={true}
                                placeholder="Selecciona un estado"
                                searchPlaceholder="Buscar estado..."
                                emptyMessage="No se encontraron estados."
                                className="w-full"

                            />
                        </div>

                        {responsables && (
                            <div className="space-y-3">
                                <Label htmlFor="responsable-filter" className="text-sm font-medium">
                                    Responsable
                                </Label>
                                <SheetSearchableSelect
                                    id="responsable-filter"
                                    data={responsables}
                                    value={currentResponsable === "0" ? "" : currentResponsable ?? undefined}
                                    onValueChange={(value) => applyFilter("responsable", value || "0")}
                                    placeholder="Selecciona un responsable"
                                    searchPlaceholder="Buscar responsable..."
                                    emptyMessage="No se encontraron responsables."
                                    className="w-full"
                                />
                            </div>
                        )}

                        {activeFiltersCount > 0 && (
                            <>
                                <div className="border-t pt-6" />
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Filtros aplicados: {activeFiltersCount}
                                    </Label>
                                    <Button
                                        variant="outline"
                                        onClick={clearAllFilters}
                                        className="w-full justify-center bg-transparent"
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Limpiar todos los filtros
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </SheetContent>
            </Sheet>

            {activeFiltersCount > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                    {currentStatus && currentStatus !== "0" && (
                        <Badge
                            variant="secondary"
                            className="gap-1 pr-1 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                        >
                            <span className="text-xs">Estado:</span>
                            <span className="font-medium">{getName("status", currentStatus)}</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => clearFilter("status")}
                                className="h-4 w-4 p-0 hover:bg-blue-200 rounded-full ml-1"
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </Badge>
                    )}
                    {currentResponsable && currentResponsable !== "0" && (
                        <Badge
                            variant="secondary"
                            className="gap-1 pr-1 bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                        >
                            <span className="text-xs">Responsable:</span>
                            <span className="font-medium">{getName("responsable", currentResponsable)}</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => clearFilter("responsable")}
                                className="h-4 w-4 p-0 hover:bg-green-200 rounded-full ml-1"
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </Badge>
                    )}
                </div>
            )}
        </div>
    );
}