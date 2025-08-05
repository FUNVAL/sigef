# Tipos TypeScript Centralizados

Esta carpeta contiene todos los tipos TypeScript centralizados del proyecto, organizados para maximizar la reutilización y evitar duplicaciones.

## Estructura de Archivos

### 📁 Tipos Base
- **`common.d.ts`** - Tipos comunes reutilizables (entidades base, filtros, paginación)
- **`dashboard.d.ts`** - Tipos específicos para dashboards y estadísticas
- **`global.d.ts`** - Tipos globales de la aplicación

### 📁 Tipos de Entidades
- **`pre-inscription.d.ts`** - Tipos relacionados con pre-inscripciones
- **`reference.d.ts`** - Tipos relacionados con referencias
- **`course.d.ts`** - Tipos relacionados con cursos
- **`country.d.ts`** - Tipos relacionados con países
- **`stake.d.ts`** - Tipos relacionados con estacas
- **`users.d.ts`** - Tipos relacionados con usuarios

### 📁 Archivos de Configuración
- **`index.d.ts`** - Archivo principal de exportación que re-exporta todos los tipos
- **`vite-env.d.ts`** - Tipos de entorno para Vite

## Tipos Centralizados

### Tipos Base (`common.d.ts`)

#### Entidades Comunes
```typescript
interface IdNameEntity { id: number; name: string; }
interface BaseEntity { id: number; created_at?: string; updated_at?: string; }
interface Country { id: number; name: string; }
interface Stake { id: number; name: string; }
```

#### Información de Estado
```typescript
interface StatusInfo { id: number; name: string; }
interface GenderInfo { id: number; name: string; }
interface MaritalStatusInfo { id: number; name: string; }
```

#### Formularios Base
```typescript
interface BaseFormData { country_id: number; stake_id: number; gender: number; }
interface BaseUpdateFormData { id: number; status: number; }
```

#### Filtros y Paginación
```typescript
interface BaseFilters { created_from?: string; created_to?: string; country?: number; }
interface BasePaginatedResponse<T> { data: T[]; current_page: number; total: number; }
```

### Tipos de Dashboard (`dashboard.d.ts`)

#### Estadísticas Base
```typescript
interface BaseStats {
    total: number;
    pending: number;
    accepted: number;
    rejected: number;
    acceptancePercentage: number;
    newThisWeek: number;
}
```

#### Distribuciones
```typescript
interface ByCountry { country: string; quantity: number; percentage: number; }
interface ByStake { stake: string; quantity: number; percentage: number; }
```

## Beneficios de la Centralización

### ✅ Ventajas

1. **Reutilización**: Los tipos se definen una vez y se reutilizan en múltiples archivos
2. **Consistencia**: Garantiza que las mismas estructuras se usen en toda la aplicación
3. **Mantenimiento**: Cambios en un tipo se propagan automáticamente
4. **Tipado fuerte**: TypeScript puede detectar errores de tipos más efectivamente
5. **Autocompletado**: Mejor experiencia de desarrollo con IntelliSense

### 🔄 Migraciones Realizadas

- **Dashboard types**: Centralizados de múltiples archivos a `dashboard.d.ts`
- **Entity types**: Movidos a `common.d.ts` para reutilización
- **Form types**: Estandarizados usando tipos base
- **Filter types**: Unificados usando `BaseFilters`
- **Paginated responses**: Estandarizados usando `BasePaginatedResponse<T>`

## Uso Recomendado

### Importación desde `index.d.ts`
```typescript
import { type PreInscription, type BaseStats, type Country } from '@/types';
```

### Importación específica
```typescript
import { type BaseStats } from '@/types/dashboard';
import { type IdNameEntity } from '@/types/common';
```

### Extending types
```typescript
type MyCustomEntity = BaseEntity & {
    customField: string;
    location: LocationInfo;
}
```

## Convenciones

1. **Naming**: Usar PascalCase para interfaces y types
2. **Exports**: Usar `export type` para tipos que serán importados
3. **Generics**: Usar `<T>` para tipos genéricos como `BasePaginatedResponse<T>`
4. **Optional fields**: Usar `?` para campos opcionales
5. **Composition**: Preferir composición (`&`) sobre herencia cuando sea posible

## Migración de Código Existente

Si encuentras tipos duplicados en el código:

1. Verifica si existe un tipo similar en los archivos centralizados
2. Si existe, reemplaza el tipo local por la importación centralizada
3. Si no existe, considera añadirlo a los tipos centralizados si es reutilizable
4. Actualiza las importaciones correspondientes
