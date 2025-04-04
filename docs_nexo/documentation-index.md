
# Índice Detallado de la Documentación de Nexo Learning

Este documento proporciona un inventario completo de todos los archivos de documentación existentes en el directorio `docs_nexo/` y sus subcarpetas, organizado por estructura de directorios. Las descripciones incluyen el contenido principal y los temas abordados en cada documento para facilitar la identificación de duplicaciones y solapamientos.

## Raíz de Documentación

- **README.md**: Documento principal que presenta Nexo Learning como plataforma educativa SaaS modular. Detalla los principios clave (modularidad, escalabilidad, personalización), describe los módulos principales (gestión de cursos, sistema de aprendizaje, comunidad, administración, analíticas), y proporciona enlaces rápidos a la documentación más relevante. Incluye información sobre el estado actual del proyecto.

## Estructura por Características (features/)

### Administración (features/admin/)

- **README.md**: Describe el módulo de administración organizado por dominios funcionales. Detalla el panel principal con KPIs, el dominio académico (gestión de cursos, categorías), personas (gestión de usuarios, roles), finanzas (pagos, facturación), analíticas (dashboards, informes), plataforma (configuración global, diseño) y herramientas técnicas (diagnóstico, logs). Incluye rutas principales y componentes clave como AdminDashboard, DomainNavigation y EntityManagers.

### Autenticación (features/authentication/)

- **README.md**: Documentación del sistema de autenticación. Aborda los flujos de login (email/contraseña, redes sociales), registro (validación, onboarding), recuperación de contraseña, verificación en dos pasos, y gestión de sesiones. Incluye consideraciones de seguridad y buenas prácticas.

### Comunidad (features/community/)

- **README.md**: Documentación de las características sociales de la plataforma. Cubre foros de discusión (por curso y generales), sistema de mensajería directa, grupos de estudio, comentarios en lecciones, sistema de valoraciones y reseñas, y mecanismos de reporte de contenido inapropiado.

### Cursos (features/courses/)

- **README.md**: Documento general sobre el sistema de cursos. Proporciona una introducción al módulo de cursos, su propósito dentro de la plataforma, y enlaces a documentación más detallada como overview.md.

- **overview.md**: Documentación detallada del sistema de cursos. Describe características para estudiantes (exploración de catálogo, visualización de contenido multimedia, seguimiento de progreso), instructores (editor de lecciones, herramientas de organización, analíticas) y administradores (panel de control, moderación, configuración global). Detalla componentes del sistema como catálogo, editor de lecciones y sistema de aprendizaje. Incluye implementación técnica con tablas de base de datos, componentes frontend y gestión de medios.

### Instructor (features/instructor/)

- **README.md**: Describe las funcionalidades específicas para instructores. Detalla la organización por flujo de trabajo natural: panel principal (resumen de actividad), mis cursos (creación y edición), mis estudiantes (seguimiento, calificaciones), analíticas (estadísticas de engagement), recursos (material didáctico) y perfil (información personal). Incluye rutas principales, componentes clave, estado actual y próximas mejoras como herramientas de clase virtual.

### Páginas (features/pages/)

- **README.md**: Documentación sobre el sistema de gestión de páginas y contenido estático. Cubre la creación, edición y publicación de páginas dinámicas, sistema de plantillas, editor WYSIWYG, gestión de SEO, integración de medios y control de acceso a contenido.

### Usuarios (features/users/)

- **README.md**: Documentación sobre el sistema de gestión de usuarios, roles y permisos. Aborda perfiles de usuario, sistema de roles (administrador, instructor, estudiante), gestión de permisos granulares, integración con autenticación, y flujos de gestión de cuenta como registro, actualización y eliminación.

## Guías (guides/)

- **development_workflow.md**: Guía paso a paso sobre los flujos de trabajo de desarrollo. Detalla convenciones de código, estructura de branching, proceso de pull request, revisión de código, integración continua, y estrategia de despliegue. Incluye ejemplos prácticos y buenas prácticas.

- **testing_guidelines.md**: Directrices y mejores prácticas para pruebas. Cubre pruebas unitarias (Jest, React Testing Library), integración, end-to-end (Cypress), mocks y stubs, cobertura de código, y automatización de pruebas en CI/CD. Incluye ejemplos de código y patrones recomendados.

## Documentación Legacy (docs_legacy/)

### Raíz Legacy

- **README.md**: Índice principal de la documentación antigua con enlaces a secciones clave. Sirve como punto de entrada a la documentación legacy, organizando el acceso a arquitectura, características, componentes y guías del sistema anterior.

- **index.md**: Página principal antigua con estructura de navegación por secciones. Organiza enlaces para diferentes tipos de usuarios: desarrolladores (arquitectura, proyecto), administradores (panel, gestión), componentes/UI (sistema de diseño), características (autenticación, cursos), API/base de datos, y despliegue/CI/CD.

- **01_getting_started.md**: Guía inicial para comenzar a utilizar o desarrollar en el sistema. Incluye requisitos previos, instalación, configuración inicial, y primeros pasos tanto para usuarios finales como para desarrolladores.

- **02_architecture.md**: Documentación sobre la arquitectura general del sistema. Detalla el stack tecnológico, patrones arquitectónicos, estructura de directorios, flujo de datos, y decisiones de diseño fundamentales.

### Características Legacy (docs_legacy/03_features/)

- **README.md**: Índice de documentación de características en el formato antiguo. Proporciona enlaces organizados a todos los módulos y funcionalidades documentados en el sistema legacy.

- **admin_users.md**: Documentación sobre gestión de usuarios administrativos. Detalla creación de usuarios admin, asignación de permisos especiales, limitaciones de seguridad, y buenas prácticas de administración.

- **authentication.md**: Antigua documentación del sistema de autenticación. Describe métodos de autenticación, almacenamiento de credenciales, manejo de sesiones, y flujos de recuperación de contraseña en la versión anterior.

- **community.md**: Documentación de la versión anterior de características de comunidad. Cubre funcionalidades sociales como foros, mensajería y grupos en la implementación legacy del sistema.

- **courses.md**: Versión anterior de la documentación de cursos. Detalla el modelo de datos, creación/edición de cursos, gestión de contenido, y seguimiento de progreso en la implementación original.

### Guías Legacy (docs_legacy/guias/)

- **README.md**: Índice de guías de usuario en formato antiguo. Organiza y enlaza todas las guías disponibles para usuarios finales en la versión legacy del sistema.

- **primeros-pasos.md**: Guía básica de introducción para nuevos usuarios. Cubre registro, navegación inicial, perfil de usuario, y primeras interacciones con la plataforma en español.

### Módulos Legacy (docs_legacy/modules/)

- **changelog.md**: Registro histórico de cambios significativos en la plataforma. Documenta versiones, nuevas características, correcciones de errores, y cambios importantes organizados cronológicamente.

- **design-system/index.md**: Documentación principal del sistema de diseño. Introduce la filosofía, principios, y organización del sistema de diseño utilizado en la plataforma.

- **design-system/components/index.md**: Catálogo de componentes de UI disponibles. Lista todos los componentes reutilizables con enlaces a su documentación detallada, ejemplos de uso y propiedades.

- **design-system/components/navigation.md**: Guía de componentes de navegación. Detalla menús, barras laterales, breadcrumbs, paginación y otros elementos de navegación con ejemplos y variantes.

- **design-system/theme.md**: Documentación sobre el tema visual y personalización. Describe colores, tipografía, espaciado, sombras y otros aspectos visuales configurables del sistema.

- **design-system/usage-guidelines.md**: Guías de uso del sistema de diseño. Proporciona mejores prácticas, patrones comunes, y recomendaciones para implementar correctamente los componentes del sistema de diseño.

### Documentos Sueltos Legacy

- **DOCUMENTACION.md**: Estándares y convenciones para la documentación del proyecto. Define formatos, estructura, nomenclatura, y proceso de actualización para mantener la documentación consistente.

- **ESTADO_FUNCIONALIDADES.md**: Estado actual de implementación de características. Proporciona una matriz de funcionalidades con su estado de desarrollo (planificado, en desarrollo, completado, deprecated).

- **ESTRUCTURA_NAVEGACION.md**: Documentación de la estructura de navegación. Detalla los principios de navegación (simplicidad, contextualidad, consistencia), componentes clave (barra lateral, cabecera, pie de página), y gestión del estado de navegación.

- **MAPA_DE_RUTAS.md**: Planificación de desarrollo futuro e hitos. Documenta todas las rutas del sistema con su estado (activa, en desarrollo, no implementada), importancia y notas. Incluye plan de limpieza y consolidación en fases.

- **automated-messaging-system.md**: Documentación del sistema de mensajería automatizada. Describe la arquitectura, tipos de mensajes, plantillas, condiciones de disparo, y configuración del sistema automático de comunicaciones.

- **lesson-editor-system.md**: Guía del editor de lecciones para cursos. Detalla la interfaz del editor, tipos de bloques de contenido disponibles, opciones de formateo, incorporación de medios, y gestión de versiones.

---

Este índice fue generado el 4 de abril de 2025 y representa el estado actual de la documentación. Se recomienda mantenerlo actualizado conforme se añadan nuevos documentos o se modifique la estructura de la documentación.

