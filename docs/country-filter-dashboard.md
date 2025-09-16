# Filtro por País en Dashboard de Preinscripciones

## Descripción del Cambio

Se ha implementado un filtro por país en la sección "Preinscripciones por Estaca" del dashboard de preinscripciones. Este filtro permite a los usuarios con el permiso `pre-inscription:view-all` filtrar las estacas mostradas basándose en un país específico.

## Funcionalidad

### Para usuarios con permiso `pre-inscription:view-all`:
- Se muestra un selector de país en la parte superior derecha de la tarjeta "Preinscripciones por Estaca"
- El filtro permite seleccionar "Todos los países" o un país específico
- Al seleccionar un país, se actualiza la URL con el parámetro `?country=ID_PAIS`
- Los datos de estacas se filtran para mostrar únicamente las estacas del país seleccionado
- Los porcentajes se recalculan basándose en el subconjunto filtrado

### Para usuarios sin el permiso:
- El filtro no se muestra
- Se comporta como antes del cambio

## Archivos Modificados

### Frontend
1. **`resources/js/components/dashboard/country-filter.tsx`** (nuevo)
   - Componente reutilizable para el filtro de país
   - Incluye selector dropdown y botón para limpiar filtro

2. **`resources/js/components/dashboard/generic-dashboard.tsx`**
   - Añadida compatibilidad con filtros opcionales
   - Actualizada interfaz `GenericDashboardProps` para incluir propiedades de filtro
   - Modificada sección "byStake" para mostrar filtro cuando sea apropiado

3. **`resources/js/pages/pre-registration/pre-inscriptions-dashboard.tsx`**
   - Añadida verificación de permisos con `auth.user.user_permissions.includes('pre-inscription:view-all')`
   - Gestión de estado del filtro con sincronización con URL
   - Manejo de cambio de filtro con navegación preservando estado

### Backend
4. **`app/Http/Controllers/PreInscriptionController.php`**
   - Método `dashboard()` ahora acepta parámetro `Request $request`
   - Filtrado de estacas basado en país cuando se proporciona parámetro `country`
   - Inclusión de lista de países activos cuando el usuario tiene permisos `pre-inscription:view-all`
   - Recálculo de porcentajes basado en subconjunto filtrado

## Uso

1. **Acceso al Dashboard**: Navegar a `/pre-inscription/dashboard`
2. **Filtrado**: 
   - Usuarios con permiso `pre-inscription:view-all` verán el filtro en la sección "Preinscripciones por Estaca"
   - Seleccionar un país del dropdown para filtrar
   - Usar el botón "X" o seleccionar "Todos los países" para limpiar el filtro
3. **Navegación**: El filtro se mantiene al recargar la página o navegar de vuelta

## Ventajas

- **Reducción de datos**: Cuando hay muchas preinscripciones, el filtro reduce significativamente la cantidad de estacas mostradas
- **Mejor usabilidad**: Los usuarios pueden enfocarse en estacas de países específicos
- **Retrocompatibilidad**: No afecta la experiencia de usuarios sin permisos
- **Reutilizable**: El componente `CountryFilter` puede ser usado en otros dashboards

## Consideraciones Técnicas

- **Permisos**: Solo visible para usuarios con `pre-inscription:view-all`
- **Performance**: El filtrado se realiza en el backend para optimizar la transferencia de datos
- **Estado**: El filtro se sincroniza con la URL para mantener estado al navegar
- **Responsive**: El filtro se adapta al diseño responsive existente

## Ejemplo de URL con Filtro

```
/pre-inscription/dashboard?country=5
```

Donde `5` es el ID del país seleccionado.
