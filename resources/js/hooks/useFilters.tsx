import { useCallback } from "react";
import { router } from "@inertiajs/react";

export type FilterConfig = {
    key: string; // nombre del query param
    defaultValue?: string; // valor que representa "todos" (por defecto "0")
    getName?: (value: string) => string; // función para obtener el label de un valor
};

export type UseFiltersReturn = {
    getValue: (key: string) => string | null;
    getAllValues: () => Record<string, string | null>;
    activeFiltersCount: number;
    applyFilter: (paramKey: string, value: string) => void;
    clearFilter: (paramKey: string) => void;
    clearAllFilters: () => void;
    getName: (paramKey: string, value?: string | null) => string;
};

export default function useFilters(configs: FilterConfig[] = []): UseFiltersReturn {
    const readParams = () => {
        if (typeof window === "undefined") return new URLSearchParams();
        return new URL(window.location.href).searchParams;
    };

    const getValue = useCallback((key: string) => {
        return readParams().get(key);
    }, []);

    const getAllValues = useCallback(() => {
        const params = readParams();
        return configs.reduce<Record<string, string | null>>((acc, cfg) => {
            acc[cfg.key] = params.get(cfg.key);
            return acc;
        }, {});
    }, [configs]);

    const activeFiltersCount = (() => {
        const params = readParams();
        return configs.reduce((count, cfg) => {
            const val = params.get(cfg.key);
            const def = cfg.defaultValue ?? "0";
            if (val && val !== def) return count + 1;
            return count;
        }, 0);
    })();

    const navigateWithUrl = (u: URL) => {
        router.get(`${u.pathname}${u.search}`, {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const applyFilter = useCallback((paramKey: string, value: string) => {
        const u = new URL(typeof window !== "undefined" ? window.location.href : "http://localhost");
        const cfg = configs.find(c => c.key === paramKey);
        const def = cfg?.defaultValue ?? "0";

        if (!value || value === def) {
            u.searchParams.delete(paramKey);
        } else {
            u.searchParams.set(paramKey, value);
        }

        navigateWithUrl(u);
    }, [configs]);

    const clearFilter = useCallback((paramKey: string) => {
        const u = new URL(typeof window !== "undefined" ? window.location.href : "http://localhost");
        u.searchParams.delete(paramKey);
        navigateWithUrl(u);
    }, []);

    const clearAllFilters = useCallback(() => {
        const u = new URL(typeof window !== "undefined" ? window.location.href : "http://localhost");
        configs.forEach(c => u.searchParams.delete(c.key));
        navigateWithUrl(u);
    }, [configs]);

    const getName = useCallback((paramKey: string, value?: string | null) => {
        const cfg = configs.find(c => c.key === paramKey);
        const v = value ?? getValue(paramKey);
        if (!v) return "";
        if (cfg?.getName) return cfg.getName(v);
        return v;
    }, [configs, getValue]);

    return {
        getValue,
        getAllValues,
        activeFiltersCount,
        applyFilter,
        clearFilter,
        clearAllFilters,
        getName,
    };
}