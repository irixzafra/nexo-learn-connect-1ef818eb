
# ESTRUCTURA DE NAVEGACIÓN - NEXO LEARNING (ACTUALIZADA)

Este documento mantiene un registro actualizado de la estructura de navegación del sistema, para facilitar decisiones sobre dónde ubicar nuevos elementos o modificar los existentes.

## Estructura General

La navegación se compone de los siguientes elementos principales:

1. **Configuración Centralizada** - `/src/config/navigation` define todos los menús del sistema 
2. **Sidebar Principal** - Menú lateral que varía según el rol del usuario
3. **Nivel 1 (Categorías)** - Grupos principales de navegación en la barra lateral
4. **Nivel 2 (Subcategorías)** - Elementos dentro de cada grupo, expandibles/colapsables
5. **Nivel 3 (Tabs)** - Tabs contextuales dentro de cada página para opciones específicas

## Estado de Implementación

Para mantener claridad sobre el estado de desarrollo:
- ✅ **Implementado y funcional**
- 🔄 **En desarrollo** - Estructura creada pero con funcionalidad incompleta
- 🚧 **Planificado** - Definido pero no implementado
- ❌ **Descartado** - Ya no forma parte del diseño actual

## Estructura de Navegación

### Nivel 1 y 2 (Sidebar)

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

### Nivel 3 (Tabs contextuales)

Las tabs son específicas para cada página y se implementan a través de los componentes:
- `AdminNavTabs`: Para secciones administrativas
- `AdminTabs`: Para representaciones alternativas de tabs

## Componentes de Navegación

- **SidebarMainNavigation**: Navegación principal, renderiza grupos y items
- **SidebarNavGroup**: Grupos expandibles de navegación (Nivel 1)
- **SidebarNavItem**: Elementos individuales de navegación (Nivel 2)
- **AdminNavTabs/AdminTabs**: Tabs para navegación contextual (Nivel 3)

## Clases de Navegación para Móvil

La navegación responde a dispositivos móviles con:
- Versión colapsada en pantallas pequeñas
- Ajustes visuales para tamaños reducidos
- Comportamiento touch-friendly

## Configuración de Breakpoints

Los breakpoints principales definidos en tailwind.config.ts:
- **sm**: 640px - Teléfonos en modo paisaje
- **md**: 768px - Tablets
- **lg**: 1024px - Laptops
- **xl**: 1280px - Desktops
- **2xl**: 1536px - Pantallas grandes

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

## Notas de Implementación

1. La navegación se basa en configuración centralizada en `/src/config/navigation`
2. Los grupos y elementos se filtran automáticamente según el rol del usuario
3. Los grupos pueden expandirse/colapsarse para mejorar la usabilidad
4. Se implementan badges para notificaciones y mensajes no leídos

---

Documento actualizado: [Fecha actual]
