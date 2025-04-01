
# ESTRUCTURA DE NAVEGACIÓN - NEXO LEARNING (ACTUALIZADO)

Este documento mantiene un registro actualizado de la estructura de navegación del sistema, para facilitar decisiones sobre dónde ubicar nuevos elementos o modificar los existentes.

## Estructura General

La navegación se compone de los siguientes elementos principales:

1. **Configuración Centralizada** - `/src/config/navigation/` define todos los menús del sistema 
2. **Sidebar Principal** - Menú lateral que varía según el rol del usuario
3. **MobileSidebar** - Versión adaptada para dispositivos móviles
4. **Barra Superior** - Con acciones rápidas y perfil de usuario
5. **Breadcrumbs** - En páginas internas para facilitar la navegación
6. **Footer** - Con enlaces complementarios y legales

## Estado de Implementación

Para mantener claridad sobre el estado de desarrollo:
- ✅ **Implementado y funcional**
- 🔄 **En desarrollo** - Estructura creada pero con funcionalidad incompleta
- 🚧 **Planificado** - Definido pero no implementado
- ❌ **Descartado** - Ya no forma parte del diseño actual

## Configuración Centralizada de Menús

La configuración de todos los menús del sistema se encuentra centralizada en `/src/config/navigation/`.

### Principales elementos:

- **mainNavigation** - Menú principal accesible para todos los roles
- **adminNavigation** - Menú administrativo específico para roles autorizados
- **gamificationNavigation** - Menú de gamificación para estudiantes

### Estructura de configuración:

```typescript
export interface MenuItem {
  icon: React.ElementType;   // Icono del elemento (Lucide Icons)
  label: string;             // Texto visible
  path: string;              // Ruta de navegación 
  badge?: number | string;   // Opcional: Insignia numérica o texto
  disabled?: boolean;        // Opcional: Estado deshabilitado
  description?: string;      // Opcional: Descripción para tooltip
  requiredRole?: UserRoleType | UserRoleType[]; // Roles que pueden ver este ítem
  children?: MenuItem[];     // Opcional: Submenús
}
```

### Helpers disponibles:

- **filterMenuItemsByRole** - Filtra ítems según el rol del usuario
- **getNavigationByRole** - Obtiene todos los menús filtrados por rol
- **getHomePathByRole** - Determina la ruta de inicio según el rol

## Navegación por Rol

### Estudiante (student)
- **Inicio** - `/home`
- **Explorar Cursos** - `/courses`
- **Mis Cursos** - `/home/my-courses`
- **Comunidad** - `/community`
- **Mensajes** - `/messages`
- **Notificaciones** - `/notifications`
- **Perfil** - `/profile`
- **Logros** (Gamificación) - `/gamification/achievements`

### Instructor
- **Inicio** - `/instructor/dashboard`
- **Explorar Cursos** - `/courses`
- **Mis Cursos** (como instructor) - `/instructor/courses`
- **Comunidad** - `/community`
- **Mensajes** - `/messages`
- **Notificaciones** - `/notifications`
- **Administración** (Limitada) - `/admin/dashboard`
- **Perfil** - `/profile`

### Administrador
- **Inicio** - `/admin/dashboard`
- **Usuarios** - `/admin/users`
- **Cursos** - `/admin/courses`
- **Rutas de Aprendizaje** - `/admin/learning-paths`
- **Facturación** - `/admin/billing`
- **Datos de Prueba** - `/admin/test-data`
- **Páginas** - `/admin/pages`
- **Analíticas** - `/admin/analytics`
- **Configuración** - `/admin/settings`
- **Perfil** - `/profile`

## Componentes de Navegación

### Desktop

- **SidebarMainNavigation** - Navegación principal en la barra lateral
- **AdministracionNavigation** - Sección de administración en la barra lateral
- **GamificationNavigation** - Sección de gamificación en la barra lateral

### Mobile

- **MobileSidebar** - Componente específico para navegación en dispositivos móviles
  - Utiliza la misma configuración que el sidebar desktop
  - Se activa mediante un botón flotante en la esquina inferior izquierda
  - Implementa un patrón drawer (deslizante) para mostrar el menú

## Estructura de Rutas

Las rutas están organizadas en diferentes archivos según su propósito:

- **AppRouter.tsx** - Router principal, punto de entrada
- **AdminRoutes.tsx** - Rutas administrativas (/admin/*)
- **UserRoutes.tsx** - Rutas para estudiantes (/home/*)
- **InstructorRoutes.tsx** - Rutas para instructores (/instructor/*)
- **PublicRoutes.tsx** - Rutas públicas accesibles sin autenticación

### Layouts asociados a rutas

- **PublicLayout** - Para rutas públicas
- **AppLayout** - Layout general para usuarios autenticados
- **AdminPageLayout** - Layout específico para sección administrativa

## Patrón de Navegación Mobile-First

La navegación ha sido diseñada siguiendo un patrón mobile-first:

1. Los componentes usan clases responsivas de Tailwind (md:hidden, lg:flex, etc.)
2. MobileSidebar proporciona una experiencia optimizada para dispositivos pequeños
3. La configuración centralizada permite adaptarse a diferentes tamaños de pantalla sin duplicar lógica
4. La detección de dispositivo móvil se realiza mediante el hook `use-mobile.ts`

## Configuración de Breakpoints

Los breakpoints principales definidos en tailwind.config.ts:

- **sm**: 640px - Teléfonos en modo paisaje
- **md**: 768px - Tablets
- **lg**: 1024px - Laptops
- **xl**: 1280px - Desktops
- **2xl**: 1536px - Pantallas grandes

## Notas de Implementación

1. Todos los ítems de menú deben definirse en `navigation/mainNavigation.ts`, `navigation/adminNavigation.ts` o `navigation/gamificationNavigation.ts`
2. Para añadir un nuevo ítem de navegación, actualice el archivo de configuración correspondiente
3. Para modificar permisos, ajuste la propiedad `requiredRole` en el ítem correspondiente
4. El sistema de navegación adapta automáticamente los menús según el rol del usuario y el tamaño de pantalla

## Mejoras Planificadas

- 🚧 Submenús anidados en menús principales
- 🚧 Sistema de favoritos en la navegación
- 🚧 Menú contextual basado en la ruta actual
- 🚧 Persistencia de estado de navegación entre sesiones

---

Documento actualizado: [Fecha actual]
