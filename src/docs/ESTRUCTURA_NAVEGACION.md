
# ESTRUCTURA DE NAVEGACIÓN - NEXO LEARNING

Este documento mantiene un registro de la estructura de navegación del sistema, para facilitar decisiones sobre dónde ubicar nuevos elementos o modificar los existentes.

## Estructura General

La navegación se compone de los siguientes elementos principales:

1. **Sidebar Principal** - Menú lateral que varía según el rol del usuario
2. **Barra Superior** - Con acciones rápidas y perfil de usuario
3. **Breadcrumbs** - En páginas internas para facilitar la navegación
4. **Footer** - Con enlaces complementarios y legales

## Menús por Rol de Usuario

### Estudiante
- **Principal**
  - Dashboard / Inicio
  - Explorar Cursos
  - Mis Cursos
  - Calendario
  - Logros y Gamificación
- **Comunidad**
  - Feed
  - Mensajes
  - Grupos
  - Foros
- **Perfil**
  - Mi Perfil
  - Configuración
  - Certificados
  - Facturas

### Instructor
- **Principal**
  - Dashboard del Instructor
  - Mis Cursos Creados
- **Gestión de Contenido**
  - Crear Curso
  - Editar Contenido
  - Recursos Multimedia
  - Evaluaciones
- **Estudiantes**
  - Lista de Inscritos
  - Calificaciones
  - Estadísticas
- **Finanzas**
  - Ingresos
  - Pagos
  - Informes Fiscales

### Administrador
- **Dashboard**
  - Visión General
  - Métricas Clave
  - Actividad Reciente
- **Usuarios**
  - Gestión de Usuarios
  - Roles y Permisos
- **Contenido**
  - Cursos
  - Categorías
  - Rutas de Aprendizaje
  - Páginas
- **Gamificación**
  - Insignias
  - Puntos
  - Niveles
  - Desafíos
- **Configuración**
  - General
  - Diseño
  - Integraciones
  - Emails
- **Datos**
  - Importar/Exportar
  - Auditoría
  - Respaldos

## Estructura Actual de Componentes

### Sidebar
- `src/components/layout/sidebar/RefactoredSidebarNavigation.tsx` - Contenedor principal
- `src/components/layout/sidebar/navigation/` - Secciones de navegación
  - `SidebarMainNavigation.tsx` - Navegación principal
  - `AdministracionNavigation.tsx` - Menú de administración
  - `ComunidadNavigation.tsx` - Sección de comunidad
  - `CursosNavigation.tsx` - Navegación de cursos
  - `PerfilNavigation.tsx` - Sección de perfil
  - ...

### Componentes de Menú
- `src/components/layout/sidebar/SidebarGroup.tsx` - Grupo/sección de menú
- `src/components/layout/sidebar/MenuItems.tsx` - Elementos individuales de menú

## Criterios para Nuevos Elementos de Navegación

Al añadir nuevos elementos de navegación, considerar:

1. **Relevancia por rol** - ¿A qué roles debe ser visible?
2. **Frecuencia de uso** - Los elementos más usados deben ser más accesibles
3. **Agrupación lógica** - Mantener elementos relacionados juntos
4. **Jerarquía** - Estructura de padres e hijos clara
5. **Consistencia** - Mantener patrones de navegación coherentes

## Proceso para Modificar la Navegación

1. Identificar la sección adecuada según el contenido/funcionalidad
2. Consultar este documento para determinar el componente a modificar
3. Buscar el archivo correspondiente en la estructura de código
4. Proponer el cambio con la ubicación específica antes de implementar
5. Actualizar este documento después de realizar el cambio

## Secciones de Gamificación (Nueva)

La nueva funcionalidad de gamificación se ha integrado en:
- **Perfil de Usuario**: Sección de insignias y logros
- **Panel de Administración**: Gestión de insignias y sistema de puntos
- **Rutas**: `/profile/achievements` (vista de estudiante) y `/admin/gamification` (administración)

---

Este documento se actualizará regularmente para reflejar cambios en la estructura de navegación.
