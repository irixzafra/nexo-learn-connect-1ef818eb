
# Documentación de Administración

## Panel de Administración

El Panel de Administración es el centro de control unificado para la gestión de la plataforma. Permite gestionar usuarios, cursos, configuraciones del sistema y monitorizar actividades.

## Principios de Diseño

La interfaz administrativa se rige por estos principios:

1. **Unificación**: Un sistema de navegación único para todos los usuarios
2. **Simplicidad**: Máximo de 2 niveles de navegación
3. **Contextualidad**: Elementos específicos según contexto
4. **Consistencia**: Diseño uniforme en todas las secciones
5. **Escalabilidad**: Fácil extensión para nuevas funcionalidades

## Navegación Administrativa

La navegación administrativa se implementa mediante:

1. **ConditionalSidebar**: Componente único que determina qué elementos mostrar según:
   - La ruta actual (automáticamente detecta rutas administrativas)
   - El rol del usuario (filtra elementos según permisos)

2. **Estructura de Menús**:
   - **Dashboard**: Visión general del sistema
   - **Usuarios**: Gestión de usuarios y roles
   - **Cursos**: Administración de contenido educativo
   - **Finanzas**: Gestión financiera
   - **Configuración**: Ajustes del sistema

## Implementación Técnica

### Funcionamiento Interno

1. El sistema detecta automáticamente las rutas que comienzan con `/admin/`
2. Para estas rutas, muestra la navegación administrativa específica
3. La navegación se filtra según el rol del usuario
4. Se mantiene una experiencia coherente y unificada

### Componentes Principales

- **ConditionalSidebar**: Componente principal de navegación condicional
- **AdminNavigation**: Navegación específica para rutas administrativas
- **AdminNavTabs**: Pestañas contextuales dentro de páginas administrativas
- **AdminHeader**: Encabezado específico para secciones administrativas

## Visibilidad según Roles

Los elementos del panel administrativo se filtran automáticamente por rol:

- **Administradores**: Acceso completo a todas las secciones
- **Instructores**: Acceso limitado a gestión de cursos propios
- **Moderadores**: Acceso a herramientas de moderación
- **Estudiantes**: Sin acceso a funciones administrativas

## Mejores Prácticas

Al desarrollar nuevas funcionalidades administrativas:

1. Utilizar los componentes de navegación existentes
2. Seguir la estructura de dos niveles de navegación
3. Implementar filtrado adecuado por rol de usuario
4. Mantener la coherencia visual con el resto del sistema
5. Documentar claramente los permisos necesarios para cada funcionalidad

## Documentación Relacionada

- [Estructura de Navegación](../ESTRUCTURA_NAVEGACION.md)
- [Roles y Permisos](../security/roles-permissions.md)
- [Componentes Administrativos](../components/admin.md)

---

Última actualización: Julio 2024
