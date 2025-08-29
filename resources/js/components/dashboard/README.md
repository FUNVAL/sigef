# Sistema de Dashboard Modular

Este sistema permite crear dashboards reutilizables y configurables para diferentes tipos de entidades (referencias, preinscripciones, etc.) sin duplicar código.

## Estructura

```
resources/js/
├── components/dashboard/
│   └── generic-dashboard.tsx         # Componente genérico reutilizable
├── hooks/
│   └── use-dashboard-config.ts      # Hook para configuraciones predefinidas
├── pages/
│   ├── dashboard.tsx                # Dashboard principal
│   └── pre-registration/
│       ├── pre-inscriptions-dashboard.tsx
│       └── references-dashboard.tsx
└── types/dashboard.d.ts             # Tipos compartidos
```

## Componentes

### 1. GenericDashboard
Componente base que renderiza la estructura común de todos los dashboards:
- Tarjetas de estadísticas principales (Total, Pendientes, Aceptadas, No aprobadas)
- Gráfico de tasa de aceptación y resumen de estados
- Distribuciones por país y estaca
- Sección de acciones pendientes

### 2. useDashboardConfig Hook
Proporciona configuraciones predefinidas para diferentes tipos de dashboards:
- `createReferencesConfig()` - Para dashboards de referencias
- `createPreInscriptionsConfig()` - Para dashboards de preinscripciones
- `createCustomConfig()` - Para dashboards personalizados

## Uso

### Dashboard de Referencias
```tsx
import GenericDashboard from '@/components/dashboard/generic-dashboard';
import { useDashboardConfig } from '@/hooks/use-dashboard-config';

export default function ReferenceDashboard({ data }) {
    const { createReferencesConfig } = useDashboardConfig();
    
    const genericData = {
        stats: data.stats,
        byCountry: data.referencesByCountry,
        byStake: data.referencesByStake,
    };

    const config = createReferencesConfig({
        breadcrumbs,
        menuOptions: referencesNavItems,
    });

    return <GenericDashboard data={genericData} config={config} />;
}
```

### Dashboard Personalizado
```tsx
import GenericDashboard from '@/components/dashboard/generic-dashboard';
import { useDashboardConfig } from '@/hooks/use-dashboard-config';

export default function CustomDashboard({ data }) {
    const { createCustomConfig } = useDashboardConfig();
    
    const genericData = {
        stats: data.stats,
        byCountry: data.byCountry,
        byStake: data.byStake,
    };

    const config = createCustomConfig({
        title: 'Dashboard de Estudiantes',
        entityName: 'Estudiantes',
        entitySingular: 'estudiante',
        entityPlural: 'estudiantes',
        statusLabels: {
            pending: 'En Proceso',
            accepted: 'Matriculados',
            rejected: 'No Admitidos',
        },
        // ... más configuraciones
    });

    return <GenericDashboard data={genericData} config={config} />;
}
```

## Configuración

### Estructura de datos esperada
```typescript
interface GenericDashboardData {
    stats: BaseStats;
    byCountry: ByCountry[];
    byStake: ByStake[];
}

interface BaseStats {
    total: number;
    pending: number;
    accepted: number;
    rejected: number;
    acceptancePercentage: number;
    newThisWeek: number;
}
```

### Opciones de configuración
- **useAccessControlLayout**: `true` (default) para usar AccessControlLayout, `false` para layout simple
- **entityName/entitySingular/entityPlural**: Términos específicos de la entidad
- **statusLabels**: Etiquetas para los estados (pendiente, aceptado, no aprobada)
- **sectionTitles**: Títulos de las diferentes secciones del dashboard
- **pendingActionsLabels**: Etiquetas para la sección de acciones pendientes

## Beneficios

1. **DRY (Don't Repeat Yourself)**: Elimina código duplicado entre dashboards
2. **Consistencia**: Todos los dashboards tienen la misma estructura y comportamiento
3. **Mantenibilidad**: Cambios en la lógica común se reflejan en todos los dashboards
4. **Escalabilidad**: Fácil agregar nuevos tipos de dashboards
5. **Configurabilidad**: Cada dashboard puede personalizarse según sus necesidades

## Antes vs Después

### Antes (250+ líneas por dashboard)
- Código duplicado en cada dashboard
- Difícil mantener consistencia
- Cambios requieren editar múltiples archivos

### Después (20-30 líneas por dashboard)
- Configuración simple y declarativa
- Reutilización del componente genérico
- Fácil mantenimiento y extensión

## Agregar un nuevo dashboard

1. Crear la configuración usando el hook:
```tsx
const config = createCustomConfig({
    title: 'Mi Nuevo Dashboard',
    entityName: 'MiEntidad',
    // ... configuraciones específicas
});
```

2. Preparar los datos en el formato esperado
3. Usar el componente genérico:
```tsx
return <GenericDashboard data={genericData} config={config} />;
```

Este sistema modular hace que sea muy fácil crear y mantener dashboards consistentes en toda la aplicación.
