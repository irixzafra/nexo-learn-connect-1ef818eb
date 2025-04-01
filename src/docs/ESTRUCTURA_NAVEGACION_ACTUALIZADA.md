
# ESTRUCTURA DE NAVEGACIÓN - NEXO LEARNING (ACTUALIZADA)

Este documento mantiene un registro actualizado de la estructura de navegación del sistema, para facilitar decisiones sobre dónde ubicar nuevos elementos o modificar los existentes.

## Estructura General

La navegación se compone de los siguientes elementos principales:

1. **Configuración Centralizada** - `/src/config/navigation` define todos los menús del sistema 
2. **Sidebar Principal** - Menú lateral que varía según el rol del usuario y tipo de página (admin vs user)
3. **Nivel 1 (Categorías)** - Grupos principales de navegación en la barra lateral
4. **Nivel 2 (Subcategorías)** - Elementos dentro de cada grupo, expandibles/colapsables
5. **Nivel 3 (Tabs)** - Tabs contextuales dentro de cada página para opciones específicas

## Tipos de Navegación

El sistema ahora distingue claramente entre dos modos de navegación:

1. **Navegación General** - Presente en la mayoría de las páginas del usuario
2. **Navegación Administrativa** - Específica para las páginas bajo `/admin/*`

## Arquitectura de Navegación

La solución implementada para evitar la duplicidad de menús en las páginas de administración:

1. `ConditionalSidebar` - Componente que decide qué tipo de navegación mostrar basado en la ruta actual
2. `showAdminNavigation` - Prop en AppLayout que controla explícitamente si mostrar o no la barra de administración
3. `AdminLayout` - Componente específico para las páginas de administración que configura correctamente la navegación

## Estado de Implementación

Para mantener claridad sobre el estado de desarrollo:
- ✅ **Implementado y funcional**
- 🔄 **En desarrollo** - Estructura creada pero con funcionalidad incompleta
- 🚧 **Planificado** - Definido pero no implementado
- ❌ **Descartado** - Ya no forma parte del diseño actual

## Estructura de Navegación

### Navegación General (Nivel 1 y 2)

1. **Inicio** ✅
   - Dashboard
   - Notificaciones

2. **Mis Cursos** ✅
   - En Progreso
   - Completados

3. **Comunidad** ✅
   - Foros
   - Mensajes

4. **Explorar** ✅
   - Catálogo
   - Rutas de Aprendizaje

5. **Profesor** (roles Profesor y Admin) ✅
   - Mis Cursos
   - Estudiantes

6. **Gestión Académica** (rol Admin) ✅
   - Cursos
   - Usuarios
   - Certificaciones

7. **Finanzas** (rol Admin) ✅
   - Transacciones
   - Informes
   - Facturación

8. **Configuración** ✅
   - General
   - Seguridad
   - Notificaciones
   - Personalización

### Navegación Administrativa (Específica para `/admin/*`)

1. **Dashboard** ✅
2. **Usuarios** ✅
   - Lista de Usuarios
   - Roles y Permisos
3. **Cursos** ✅
   - Todos los Cursos
   - Categorías
   - Rutas de Aprendizaje
   - Certificados
4. **Finanzas** ✅
   - Resumen
   - Facturas
   - Suscripciones
   - Movimientos Bancarios
   - Alertas
5. **Diseño** ✅
   - Componentes
   - Temas
   - Plantillas
6. **Páginas** ✅
   - Todas las Páginas
   - Crear Página
   - Plantillas
7. **Analíticas** ✅
   - Visión General
   - Usuarios
   - Cursos
   - Ingresos
   - Rendimiento
   - Engagement
8. **Configuración** ✅
   - General
   - Seguridad
   - Integraciones
   - Base de Datos

### Nivel 3 (Tabs contextuales)

Las tabs son específicas para cada página y se implementan a través de los componentes:
- `AdminNavTabs`: Para secciones administrativas
- `AdminTabs`: Para representaciones alternativas de tabs

## Componentes Clave de Navegación

- **SidebarMainNavigation**: Navegación principal para usuarios
- **AdminNavigation**: Navegación específica para administración
- **ConditionalSidebar**: Determina qué navegación mostrar basado en la ruta
- **SidebarNavGroup**: Grupos expandibles de navegación (Nivel 1)
- **SidebarNavItem**: Elementos individuales de navegación (Nivel 2)
- **AdminNavTabs/AdminTabs**: Tabs para navegación contextual (Nivel 3)

## Solución de Problemas Comunes

1. **Duplicidad de menús**: Resuelta mediante ConditionalSidebar que cambia la navegación según la ruta
2. **Permisos y visibilidad**: Cada elemento tiene definido `requiredRole` para filtrar por rol de usuario
3. **Mostrar/ocultar elementos**: Props como `showAdminNavigation` controlan la visibilidad explícitamente
4. **Navegación anidada**: Estructura clara de nivel 1 > nivel 2 > nivel 3 con separación de responsabilidades

## Estructura por Rol

### Estudiante (student)
- Inicio (Dashboard, Notificaciones)
- Mis Cursos (En Progreso, Completados)
- Comunidad (Foros, Mensajes)
- Explorar (Catálogo, Rutas de Aprendizaje)
- Configuración (General, Seguridad, Notificaciones)

### Instructor
- Todo lo de estudiante
- Profesor (Mis Cursos, Estudiantes)

### Administrador
- Todo lo anterior
- Gestión Académica (Cursos, Usuarios, Certificaciones)
- Finanzas (Transacciones, Informes, Facturación)
- Configuración (opciones extendidas)
- Acceso a la navegación administrativa específica

## Notas de Implementación

1. La navegación se basa en configuración centralizada en `/src/config/navigation`
2. Los grupos y elementos se filtran automáticamente según el rol del usuario
3. El sistema ahora detecta automáticamente páginas de administración y ajusta la navegación
4. Se implementan badges para notificaciones y mensajes no leídos
5. La arquitectura garantiza que no haya duplicación de menús ni elementos de navegación

---

Documento actualizado: Junio 2024

