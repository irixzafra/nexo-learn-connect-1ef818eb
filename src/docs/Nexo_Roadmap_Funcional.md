
# NEXO LEARNING - ROADMAP FUNCIONAL

## Resumen de Fases

### Fase 1: Estructura Base y Funcionalidades Core
- [x] Configuración inicial del proyecto
- [x] Sistema de autenticación y gestión de usuarios
- [x] Creación y visualización de cursos
- [x] Funcionalidades esenciales de aprendizaje

### Fase 2: Mejora de Experiencia de Usuario y Monetización
- [🧪] Mejoras de UX para instructores y estudiantes
- [🧪] Sistema de pagos y suscripciones
- [ ] Gamificación inicial y recompensas

### Fase 3: Interacción Social y Personalización
- [ ] Comunidad y características sociales
- [ ] Recomendaciones personalizadas
- [ ] Sistema avanzado de evaluación y certificación

### Fase 4: Expansión e Integración
- [ ] Marketplace de instructores
- [ ] Integraciones con herramientas de terceros
- [ ] Características para empresas y equipos

### Fase 5: Inteligencia y Personalización Avanzada
- [ ] Asistente de aprendizaje con IA
- [ ] Analíticas avanzadas y predicción
- [ ] Experiencias personalizadas basadas en datos

## Funcionalidades Planificadas por Fase

### Fase 1: Estructura Base y Funcionalidades Core

#### CORE-AUTH-01: Sistema Base de Autenticación
- [x] Implementación del sistema de registro, inicio de sesión y gestión de perfiles básicos.
- Incluye páginas de registro y login, verificación de correo, y recuperación de contraseña.

#### CORE-ROLES-01: Sistema de Roles y Permisos
- [x] Establecimiento de roles (estudiante, instructor, admin) con sus respectivos permisos y vistas.
- Incluye navegación adaptada según rol y protección de rutas.

#### CORE-COURSE-CREATE-01: Creación Básica de Cursos
- [x] Funcionalidad para que instructores creen cursos con información básica y estructura modular.
- Incluye formularios de creación, edición y gestión de estructura de módulos/lecciones.

#### CORE-COURSE-VIEW-01: Visualización de Cursos
- [x] Interfaces para explorar el catálogo de cursos, ver detalles y previsualizar contenido.
- Incluye listado, filtrado y páginas detalladas de cursos.

#### CORE-LEARN-01: Interfaz de Aprendizaje
- [x] Sistema para que estudiantes accedan a las lecciones de cursos a los que están inscritos.
- Incluye reproductor de contenido, navegación entre lecciones y seguimiento básico.

#### CORE-ENROLL-01: Sistema de Inscripción a Cursos
- [x] Funcionalidad para que estudiantes se inscriban en cursos gratuitos o de pago.
- Incluye verificación de inscripción y acceso diferenciado para usuarios inscritos.

#### CORE-COURSE-PROGRESS-01: Seguimiento de Progreso de Cursos
- [x] Sistema para rastrear y visualizar el progreso de los estudiantes en los cursos.
- Incluye marcado de lecciones completadas y barras de progreso.

#### CORE-UI-EDIT-01: Edición Inline y Reordenamiento de Contenido
- [x] Sistema para edición in-situ de contenido para administradores.
- Incluye edición de textos y reordenamiento de elementos vía drag-and-drop.

#### CORE-PROFILE-EDIT-01: Edición Básica de Perfil
- [x] Funcionalidad para que usuarios editen su información personal básica.
- Incluye formulario de edición con validación y feedback.

#### CORE-INSTRUCTOR-STATS-01: Panel de Estadísticas para Instructores
- [x] Dashboard con métricas relevantes para instructores sobre sus cursos.
- Incluye contador de inscripciones, popularidad de cursos y tendencias.

### Fase 2: Mejora de Experiencia de Usuario y Monetización

#### UX-COMMENTS-01: Sistema de Comentarios en Lecciones
- [🧪] Funcionalidad para que estudiantes comenten lecciones y respondan a otros comentarios.
- Incluye hilo de discusión, notificaciones y moderación básica.

#### PAY-STRIPE-01: Integración de Pagos con Stripe
- [ ] Sistema para procesar pagos de cursos mediante la plataforma Stripe.
- Incluye checkout, confirmación de pago y gestión de transacciones.

#### UX-LESSON-NOTES-01: Notas Personales en Lecciones
- [ ] Funcionalidad para que estudiantes tomen notas privadas durante las lecciones.
- Incluye editor de texto, guardado automático y exportación.

#### UX-COURSE-REVIEWS-01: Sistema de Reseñas y Valoraciones
- [ ] Sistema para que estudiantes califiquen y escriban reseñas sobre los cursos completados.
- Incluye promedio de valoraciones, filtrado por estrellas y respuestas de instructores.

#### UX-DASHBOARD-01: Dashboard Personalizado para Estudiantes
- [ ] Página de inicio personalizada con resumen de actividad, cursos en progreso y recomendaciones.
- Incluye widgets configurables y accesos rápidos.

#### GAM-BADGES-01: Sistema Básico de Insignias y Logros
- [ ] Mecanismo de recompensas virtuales por completar cursos y alcanzar hitos de aprendizaje.
- Incluye visualización de insignias en perfil y notificaciones de logros.

### Fase 3: Interacción Social y Personalización

#### SOCIAL-CONNECT-01: Conexiones entre Estudiantes
- [ ] Funcionalidad para que estudiantes se conecten, sigan perfiles y compartan actividad.
- Incluye búsqueda de usuarios, perfiles públicos y feed de actividad.

#### SOCIAL-GROUPS-01: Grupos de Estudio
- [ ] Sistema para crear y unirse a grupos relacionados con cursos o temas específicos.
- Incluye foros grupales, recursos compartidos y eventos.

#### PERSONALIZE-RECOMMEND-01: Motor de Recomendaciones
- [ ] Algoritmo para sugerir cursos relevantes basados en intereses y comportamiento previo.
- Incluye secciones "Cursos recomendados para ti" y emails personalizados.

#### CERT-ADVANCED-01: Certificaciones Avanzadas
- [ ] Sistema completo de evaluación y certificación oficial para cursos completados.
- Incluye exámenes cronometrados, verificación de identidad y certificados descargables/compartibles.

#### EVAL-QUIZ-01: Sistema de Cuestionarios
- [ ] Funcionalidad para crear y responder cuestionarios evaluativos dentro de los cursos.
- Incluye diferentes tipos de preguntas, valoración automática y retroalimentación.

#### EVAL-ASSIGNMENT-01: Sistema de Tareas y Entregas
- [ ] Mecanismo para que instructores asignen tareas y estudiantes las entreguen para evaluación.
- Incluye submisión de archivos, comentarios, calificación y retroalimentación.

### Fase 4: Expansión e Integración

#### MARKET-AFFILIATE-01: Programa de Afiliados
- [ ] Sistema para que usuarios promocionen cursos y ganen comisiones por inscripciones.
- Incluye enlaces de afiliado, tracking y dashboard de ganancias.

#### MARKET-SUBSCRIPTIONS-01: Modelo de Suscripción
- [ ] Opción para ofrecer acceso a múltiples cursos mediante suscripciones recurrentes.
- Incluye planes mensuales/anuales, beneficios por nivel y gestión de suscripciones.

#### INTEGRATE-CALENDAR-01: Integración con Calendarios
- [ ] Sincronización con Google Calendar, Outlook y otras herramientas de calendario.
- Incluye programación de sesiones de estudio y recordatorios personalizables.

#### TEAMS-CORPORATE-01: Funcionalidades para Equipos
- [ ] Herramientas para empresas que quieran ofrecer formación a sus empleados.
- Incluye administración de grupos, informes de progreso y facturación corporativa.

#### JOB-BOARD-01: Tablón de Ofertas de Empleo
- [ ] Plataforma para publicar y buscar ofertas de trabajo relacionadas con las áreas de estudio.
- Incluye filtros por categoría, ubicación y tipo de contrato.

#### PATH-LEARNING-01: Rutas de Aprendizaje
- [ ] Sistema para agrupar cursos en secuencias estructuradas que lleven a objetivos formativos específicos.
- Incluye prerequisitos, progreso global y certificaciones de ruta.

### Fase 5: Inteligencia y Personalización Avanzada

#### AI-ASSIST-01: Asistente de Aprendizaje con IA
- [ ] Asistente inteligente que responde preguntas y proporciona recursos adicionales.
- Incluye respuestas contextuales según el contenido de la lección y tracking de conceptos difíciles.

#### ANALYTICS-ADVANCED-01: Analíticas Avanzadas
- [ ] Sistema completo de análisis de datos para administradores e instructores.
- Incluye métricas detalladas, tendencias, reportes personalizables y visualizaciones interactivas.

#### AI-RECOMMEND-02: Sistema Avanzado de Recomendaciones
- [ ] Evolución del sistema de recomendaciones básico con IA más sofisticada.
- Incluye predicción de intereses, recomendaciones proactivas y ajuste basado en feedback.

#### AI-CONTENT-01: Generación de Contenido Asistida
- [ ] Herramientas para que instructores generen material educativo con ayuda de IA.
- Incluye creación de cuestionarios, resúmenes y material complementario.

**Leyenda:**
- [ ] = Pendiente de implementación
- [🧪] = En fase de pruebas/verificación
- [x] = Implementado y verificado
