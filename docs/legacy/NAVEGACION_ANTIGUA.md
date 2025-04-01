
# Documentación de Navegación Antigua

> **IMPORTANTE**: Esta documentación ya no está activa y se mantiene solo como referencia histórica. No utilizar para desarrollos actuales.

## Estructura Anterior

La estructura de navegación anterior presentaba múltiples problemas:

1. **Tres niveles de profundidad**: Esto complicaba la navegación y experiencia de usuario
2. **Duplicidad de componentes**: Existían múltiples implementaciones de navegación administrativa
3. **Falta de centralización**: La configuración de menús estaba dispersa en múltiples archivos

## Archivos Referenciados

Los siguientes archivos ya no están en uso:

- `src/components/admin/admin-navigation.css`
- `src/components/admin/AdminNavigation.tsx`
- `src/components/layout/AppSidebar.tsx`
- `src/components/layout/sidebar/AdminSection.tsx`
- `src/components/layout/sidebar/navigation/AdministracionNavigation.tsx`
- `src/components/layout/sidebar/navigation/GestionNavigation.tsx`
- `src/components/layout/sidebar/navigation/SidebarMainNavigation.tsx`
- `src/components/layout/sidebar/RefactoredSidebarNavigation.tsx`
- `src/components/layout/sidebar/hooks/useSidebarNavigation.tsx`
- `src/components/layout/sidebar/SidebarContent.tsx`
- `src/components/layout/SidebarNavigation.tsx`
- `src/config/menuConfig.ts`

## Problemas Identificados

1. Existían múltiples formas de navegar al mismo contenido
2. Los menús administrativos estaban duplicados en varias configuraciones
3. No había una clara separación entre la navegación de usuario y administración

## Migración

La navegación ha sido unificada con los siguientes principios:

1. Máximo dos niveles de profundidad
2. Configuración centralizada
3. Separación clara entre navegación de usuario y administración
4. Componentes reutilizables y consistentes

Para ver la nueva estructura, consulte la documentación actualizada en `docs/admin/ADMINISTRACION.md`.

---

Documento archivado: 2023-07-01
