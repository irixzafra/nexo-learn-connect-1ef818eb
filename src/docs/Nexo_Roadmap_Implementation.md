
# NEXO LEARNING - ROADMAP DE IMPLEMENTACIÓN

## Leyenda de Estado
- ✅ Completado
- 🧪 En pruebas
- 🔄 En progreso
- ⏱️ Pendiente
- ❌ Bloqueado

## Prioridad ALTA (Estabilización y Bugs Pendientes)

- ⏱️ **Validar Funcionalidad de Slugs**
  - Descripción: Pruebas de generación automática de slugs (crear/editar curso, duplicados) y navegación (/cursos/:slug y enlaces desde catálogo).
  - Estado: Pendiente de validación final.

- ⏱️ **Validar/Ajustar Estilo `<AdminTabs>`**
  - Descripción: Obtener código final para `<AdminTabs>` y verificar/ajustar estilo (similar a /admin/settings, con iconos y responsive).
  - Estado: Pendiente de recibir y validar código.

- ⏱️ **Validar Carga Inicial Comunidad**
  - Descripción: Verificar carga sin errores críticos en página /community tras implementación masiva.
  - Estado: Pendiente de validación inicial.

## Prioridad MEDIA (Completar Funcionalidades Iniciadas / Mejoras Clave)

### Implementar Contenido Tabs Admin - CURSOS

- 🔄 **Tab "Categorías"**
  - Descripción: Implementar CRUD completo (Tabla, Formulario, Lógica Supabase).
  - Requisitos: Definir/crear tabla course_categories.

- 🔄 **Tab "Rutas"**
  - Descripción: Implementar CRUD básico para learning_paths y gestión de cursos asociados.
  - Requisitos: Definir/crear tablas learning_paths, learning_path_courses.

- ⏱️ **Tab "Certificados"**
  - Descripción: Implementar UI (tabla con switch) y lógica para marcar cursos con grants_certificate.
  - Requisitos: Añadir columna a courses.

- ⏱️ **Tab "Analíticas"**
  - Descripción: Implementar KPIs básicos y gráficos.
  - Requisitos: RPC para obtener datos agregados.

### Implementar Contenido Tabs Admin - USUARIOS

- ⏱️ **Tab "Roles"**
  - Descripción: Implementar CRUD completo.
  - Requisitos: Definir/crear tabla roles.

- ⏱️ **Tab "Permisos"**
  - Descripción: Implementar UI de asignación.
  - Requisitos: Definir/crear tablas permissions, role_permissions.

- ⏱️ **Tab "Analíticas"**
  - Descripción: Implementar KPIs y gráficos.
  - Requisitos: RPC.

### Implementar Contenido Tabs Admin - FINANZAS

- ⏱️ **Tab "Cobros"**
  - Descripción: Implementar tabla/vista de transacciones (Stripe).

- ⏱️ **Tab "Suscripciones"**
  - Descripción: Implementar gestión (si aplica).

- ⏱️ **Tab "Analíticas"**
  - Descripción: Implementar KPIs/gráficos.
  - Requisitos: RPC/API Stripe.

### Implementar Contenido Tabs Admin - DATOS

- ⏱️ **Tab "Generación Contenido"**
  - Descripción: Implementar botones y RPCs seed_test_*.

- ⏱️ **Tab "Logs (Auditoría)"**
  - Descripción: Implementar tabla con filtros/paginación server-side.
  - Requisitos: Hook useAuditLogs.

- ⏱️ **Tab "Analíticas"**
  - Descripción: Implementar KPIs/gráficos.
  - Requisitos: RPC.

### Implementar Contenido Tabs Admin - CONFIG

- ⏱️ **Tab "Funcionalidades"**
  - Descripción: UI para activar/desactivar módulos (Feature Flags - Fase 1).

- ⏱️ **Tab "Seguridad"**
  - Descripción: Opciones de configuración de seguridad.

- ⏱️ **Tab "Apariencia"**
  - Descripción: Opciones de personalización (logos, colores).

- ⏱️ **Tab "Contenido"**
  - Descripción: Gestión de contenido global (emails, textos legales).

- ⏱️ **Tab "Analíticas"**
  - Descripción: Métricas de configuración/uso.

### Landing Page

- ⏱️ **Mostrar Temario Real**
  - Descripción: Modificar useCoursePublicData y CourseLandingPage para cargar y mostrar módulos/lecciones.

- ⏱️ **Lógica de Inscripción**
  - Descripción: Implementar handleEnroll en CourseDetailPage (conectar con Stripe para cursos de pago).

- ⏱️ **Datos Adicionales**
  - Descripción: Cargar y mostrar datos reales para isEnrolled, totalLessons, previewableLessons.

## Prioridad BAJA (Mejoras y Deuda Técnica)

- ⏱️ **Tablas Avanzadas**
  - Descripción: Diseñar/Implementar solución reutilizable (TanStack Table?) para selección/reordenación de columnas y exportación CSV personalizada.

- ⏱️ **Selección Múltiple Matriculación**
  - Descripción: Mejorar ManualEnrollmentDialog.

- ⏱️ **Generador Datos Prueba (Avanzado)**
  - Descripción: Añadir opción de limpieza y más control.

- ⏱️ **Mejorar Navegación Móvil**
  - Descripción: Optimizar responsividad general de layouts y navegación.

- ⏱️ **Refactorizar useCourseEnrollments**
  - Descripción: Reintroducir join directo a profiles o confirmar RPC como solución definitiva.

- ⏱️ **Actualizar students_count**
  - Descripción: Implementar RPC o trigger para mantener conteo real en courses.

- ⏱️ **Completar Documentación**
  - Descripción: Rellenar contenido detallado de estructura docs/.

## Próximos Pasos Recomendados

1. Abordar los puntos de Prioridad ALTA primero:
   - Validar los Slugs
   - Validar/Arreglar estilo de `<AdminTabs>`
   - Validar carga inicial de /community

2. Continuar con Prioridad Media, enfocando en:
   - Terminar implementación de "Rutas de Aprendizaje"
   - Completar Landing Page (Temario y lógica de inscripción)

## Progreso Actual

- Total tareas: 34
- Completadas: 0 (0%)
- En progreso: 2 (5.9%)
- Pendientes: 32 (94.1%)
