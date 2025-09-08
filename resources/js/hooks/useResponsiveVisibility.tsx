import { ColumnDef, VisibilityState } from '@tanstack/react-table';
import { useState, useEffect } from 'react';

export const useResponsiveVisibility = <TData,>(columns: ColumnDef<TData>[]) => {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const getCurrentView = () => {
        if (window.matchMedia("(max-width: 640px)").matches) return 'mobile';
        if (window.matchMedia("(max-width: 1024px)").matches) return 'tablet';
        return 'desktop';
    };

    const getDefaultVisibility = (currentScreen: string): VisibilityState => {
        const visibility: VisibilityState = {};

        columns.forEach(col => {
            // Usar id si existe, si no usar accessorKey
            const columnKey = col.id || (col as any).accessorKey;

            if (columnKey) {
                const meta = (col?.meta as any);
                const defaultVisibility = meta?.defaultVisibility;

                if (defaultVisibility && typeof defaultVisibility === 'object') {
                    // Si es un objeto con configuración por pantalla
                    visibility[columnKey] = defaultVisibility[currentScreen] !== undefined
                        ? defaultVisibility[currentScreen]
                        : true;
                } else if (defaultVisibility !== undefined) {
                    // Si es un booleano simple
                    visibility[columnKey] = defaultVisibility;
                } else {
                    // Por defecto, mostrar la columna
                    visibility[columnKey] = true;
                }
            }
        });

        return visibility;
    };

    useEffect(() => {
        const updateVisibility = () => {
            const currentView = getCurrentView();
            setColumnVisibility(getDefaultVisibility(currentView));
        };

        updateVisibility();

        const mobileQuery = window.matchMedia("(max-width: 640px)");
        const tabletQuery = window.matchMedia("(min-width: 641px) and (max-width: 760px)");
        const desktopQuery = window.matchMedia("(min-width: 761px)");

        mobileQuery.addEventListener('change', updateVisibility);
        tabletQuery.addEventListener('change', updateVisibility);
        desktopQuery.addEventListener('change', updateVisibility);

        return () => {
            mobileQuery.removeEventListener('change', updateVisibility);
            tabletQuery.removeEventListener('change', updateVisibility);
            desktopQuery.removeEventListener('change', updateVisibility);
        };
    }, [columns]);

    return { columnVisibility, setColumnVisibility };
};