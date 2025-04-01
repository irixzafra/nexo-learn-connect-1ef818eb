
#!/usr/bin/env node

/**
 * Script para actualizar la documentación del sistema
 * 
 * Este script analiza el código fuente del proyecto, extrae información
 * sobre las rutas, componentes y funcionalidades, y actualiza el documento
 * maestro de arquitectura del sistema.
 * 
 * Uso:
 * node updateSystemDocumentation.js
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Rutas de documentación
const masterDocPath = path.join(__dirname, '../docs/NEXO_SYSTEM_ARCHITECTURE.md');
const navDocPath = path.join(__dirname, '../docs/ESTRUCTURA_NAVEGACION_ACTUALIZADA.md');

// Ruta de configuración de navegación
const navConfigPath = path.join(__dirname, '../src/config/navigation');

// Fecha actual formateada
const currentDate = new Date().toLocaleDateString('es-ES', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

// Actualizar la fecha en un documento
function updateDocumentDate(docPath) {
  if (fs.existsSync(docPath)) {
    let content = fs.readFileSync(docPath, 'utf8');
    content = content.replace(/Documento actualizado: \[.*?\]/g, `Documento actualizado: [${currentDate}]`);
    fs.writeFileSync(docPath, content, 'utf8');
    console.log(`Fecha de documentación actualizada correctamente en ${path.basename(docPath)}`);
  } else {
    console.error('Documento no encontrado:', docPath);
  }
}

// Extraer información de archivos de navegación 
function extractNavigationConfig() {
  const navFiles = fs.readdirSync(navConfigPath).filter(file => file.endsWith('.ts') && !file.includes('utils') && !file.includes('types'));
  
  const navigationConfig = {};
  
  navFiles.forEach(file => {
    const filePath = path.join(navConfigPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extraer nombre del archivo sin extensión
    const section = file.replace('.ts', '');
    
    // Extraer elementos de navegación usando regex simple
    // Esto es una simplificación - en un escenario real sería mejor usar un parser de TS
    const menuItems = [];
    const regex = /icon:\s*([\w]+),\s*label:\s*['"]([^'"]+)['"],\s*path:\s*['"]([^'"]+)['"]/g;
    
    let match;
    while ((match = regex.exec(content)) !== null) {
      menuItems.push({
        icon: match[1],
        label: match[2],
        path: match[3]
      });
    }
    
    navigationConfig[section] = menuItems;
  });
  
  return navigationConfig;
}

// Generar documentación de estructura de navegación
function generateNavigationDoc(navConfig) {
  // Implementación simplificada para generar documentación
  const sections = Object.keys(navConfig);
  
  let docContent = `# ESTRUCTURA DE NAVEGACIÓN ACTUALIZADA\n\n`;
  docContent += `Este documento se genera automáticamente a partir de la configuración en src/config/navigation\n\n`;
  
  sections.forEach(section => {
    docContent += `## ${section.replace('Navigation', '')}\n\n`;
    
    navConfig[section].forEach(item => {
      // Asegurar que las rutas tengan como máximo 2 niveles
      const formattedPath = formatToTwoLevels(item.path);
      docContent += `- **${item.label}** (${item.icon}) - Ruta: \`${formattedPath}\`\n`;
    });
    
    docContent += '\n';
  });
  
  docContent += `---\n\nDocumento actualizado: [${currentDate}]\n`;
  
  return docContent;
}

// Función para formatear rutas a máximo 2 niveles
function formatToTwoLevels(path) {
  const parts = path.split('/').filter(p => p);
  if (parts.length <= 2) return path;
  
  // Si hay más de 2 niveles, podemos convertir los niveles extra en slugs únicos
  return `/${parts[0]}/${parts[1]}`;
}

// Extraer rutas y componentes desde AppRouter.tsx
function extractRoutesAndComponents() {
  const routerPath = path.join(__dirname, '../src/routes/AppRouter.tsx');
  
  if (!fs.existsSync(routerPath)) {
    console.error('Archivo AppRouter.tsx no encontrado');
    return {};
  }
  
  const content = fs.readFileSync(routerPath, 'utf8');
  
  // Extraer rutas usando regex simple
  // En un escenario real sería mejor usar un parser de React/TS
  const routes = [];
  const routeRegex = /<Route\s+path=["']([^"']+)["']/g;
  
  let match;
  while ((match = routeRegex.exec(content)) !== null) {
    routes.push(match[1]);
  }
  
  // Extraer componentes importados
  const components = [];
  const importRegex = /import\s+(\w+)\s+from\s+["']([^"']+)["']/g;
  
  while ((match = importRegex.exec(content)) !== null) {
    components.push({
      name: match[1],
      path: match[2]
    });
  }
  
  return { routes, components };
}

// Generar documentación de arquitectura del sistema con la nueva estructura
function generateSystemArchitectureDoc(navConfig, routesInfo) {
  // Template para el documento de arquitectura del sistema
  let docContent = `# ARQUITECTURA DEL SISTEMA NEXO LEARNING

## Introducción

Este documento sirve como la referencia maestra para la arquitectura, navegación y funcionalidades de Nexo Learning. Proporciona una visión clara de la estructura de la aplicación, rutas, componentes y mapeo de funcionalidades.

## Roles de Usuario

| Rol | Descripción | Acceso |
|-----|-------------|--------|
| \`guest\` | Usuario no autenticado | Páginas públicas y landing |
| \`student\` | Estudiante registrado | Dashboard personal, cursos, comunidad |
| \`instructor\` | Profesor | Todo lo de estudiante + herramientas de instructor |
| \`moderator\` | Moderador de contenido | Todo lo de estudiante + moderación |
| \`admin\` | Administrador | Acceso completo al sistema |
| \`sistemas\` | Administrador técnico | Configuración técnica y monitoreo |
| \`content_creator\` | Creador de contenido | Herramientas de creación de contenido |
| \`beta_tester\` | Probador de nuevas funciones | Acceso a características en beta |

## Navegación Unificada y Estructura de Rutas

La aplicación utiliza un sistema de navegación unificado, adaptado según el rol del usuario.
Todas las rutas están optimizadas para tener máximo dos niveles de profundidad.

### Dashboard

- **Slug**: \`/home\` (personalizado según rol de usuario)
- **Roles**: Todos
- **Funcionalidades**:
  - Resumen personalizado según rol
  - Notificaciones recientes
  - Actividades pendientes
  - Estadísticas relevantes
- **Componentes principales**:
  - \`DashboardStats\`
  - \`RoleSpecificContent\`
  - \`NotificationsSummary\`
  - \`ActivityFeed\`

### Mis Cursos

#### Mi Perfil
- **Slug**: \`/profile\`
- **Roles**: Todos (excepto invitado)
- **Funcionalidades**:
  - Visualización/edición de datos personales
  - Configuración de privacidad
  - Preferencias de aprendizaje
- **Componentes principales**:
  - \`ProfileForm\`
  - \`UserAvatar\`
  - \`PrivacySettings\`
  - \`SocialConnections\`

#### Mis Cursos
- **Slug**: \`/my-courses\`
- **Roles**: Todos
- **Funcionalidades**:
  - Lista de cursos en progreso
  - Cursos completados
  - Filtros y búsqueda
  - Progreso de aprendizaje
- **Componentes principales**:
  - \`CourseList\`
  - \`CourseCard\`
  - \`ProgressBar\`
  - \`CourseFilters\`

#### Certificados
- **Slug**: \`/certificates\`
- **Roles**: Estudiante, Instructor, Admin
- **Funcionalidades**:
  - Certificados obtenidos
  - Descarga en PDF
  - Validación
  - Compartir en redes
- **Componentes principales**:
  - \`CertificateList\`
  - \`CertificateCard\`
  - \`CertificateDownload\`
  - \`CertificateShare\`

#### Recomendaciones
- **Slug**: \`/recommendations\`
- **Roles**: Estudiante, Instructor, Admin
- **Funcionalidades**:
  - Cursos recomendados
  - Rutas de aprendizaje sugeridas
  - Basado en actividad previa
- **Componentes principales**:
  - \`RecommendationEngine\`
  - \`CourseRecommendations\`
  - \`LearningPathSuggestions\`

#### Mensajes
- **Slug**: \`/messages\`
- **Roles**: Estudiante, Instructor, Admin, Moderador
- **Funcionalidades**:
  - Chat en tiempo real
  - Mensajes privados
  - Foros de discusión
  - Notificaciones
- **Componentes principales**:
  - \`MessageList\`
  - \`ChatInterface\`
  - \`ForumDiscussions\`
  - \`MessageNotifications\`

#### Calendario
- **Slug**: \`/calendar\`
- **Roles**: Estudiante, Instructor, Admin
- **Funcionalidades**:
  - Eventos programados
  - Vencimientos de tareas
  - Sincronización con calendario externo
  - Recordatorios
- **Componentes principales**:
  - \`CalendarView\`
  - \`EventsList\`
  - \`CalendarSync\`
  - \`ReminderSettings\`

#### Preferencias
- **Slug**: \`/preferences\`
- **Roles**: Todos (excepto invitado)
- **Funcionalidades**:
  - Configuración de notificaciones
  - Preferencias de visualización
  - Idioma y zona horaria
  - Accesibilidad
- **Componentes principales**:
  - \`PreferencesForm\`
  - \`NotificationSettings\`
  - \`LanguageSelector\`
  - \`AccessibilityOptions\`

#### Analíticas
- **Slug**: \`/analytics\`
- **Roles**: Estudiante, Instructor, Admin
- **Funcionalidades**:
  - Tiempo de estudio
  - Progreso por habilidades
  - Comparativas
  - Metas de aprendizaje
- **Componentes principales**:
  - \`PersonalAnalytics\`
  - \`StudyTimeChart\`
  - \`SkillsRadar\`
  - \`LearningGoals\`

### Explorar

#### Explorar Catálogo
- **Slug**: \`/courses\`
- **Roles**: Todos
- **Funcionalidades**:
  - Catálogo completo de cursos
  - Filtros avanzados
  - Categorías
  - Valoraciones
- **Componentes principales**:
  - \`CourseCatalog\`
  - \`CourseFilters\`
  - \`CategoryList\`
  - \`RatingSystem\`

#### Carreras
- **Slug**: \`/careers\`
- **Roles**: Estudiante, Instructor, Admin
- **Funcionalidades**:
  - Programas de carrera
  - Requisitos
  - Proyección profesional
  - Certificaciones asociadas
- **Componentes principales**:
  - \`CareersList\`
  - \`CareerDetail\`
  - \`CareerRequirements\`
  - \`CareerPathVisualization\`

#### Rutas de aprendizaje
- **Slug**: \`/learning-paths\`
- **Roles**: Estudiante, Instructor, Admin, Sistemas
- **Funcionalidades**:
  - Rutas temáticas
  - Progresión de cursos
  - Requisitos previos
  - Habilidades adquiribles
- **Componentes principales**:
  - \`LearningPathsList\`
  - \`PathDetail\`
  - \`PathProgressTracker\`
  - \`SkillsTree\`

#### Empleo
- **Slug**: \`/jobs\`
- **Roles**: Estudiante, Instructor, Admin
- **Funcionalidades**:
  - Ofertas de empleo
  - Postulaciones
  - Perfiles de empresas
  - Recomendaciones laborales
- **Componentes principales**:
  - \`JobBoard\`
  - \`JobFilters\`
  - \`ApplicationProcess\`
  - \`CompanyProfiles\`

#### Leader Board
- **Slug**: \`/leaderboard\`
- **Roles**: Estudiante, Instructor, Admin, Sistemas
- **Funcionalidades**:
  - Ranking de estudiantes
  - Logros y medallas
  - Competencias
  - Retos
- **Componentes principales**:
  - \`LeaderboardTable\`
  - \`AchievementSystem\`
  - \`Competitions\`
  - \`Challenges\`

#### Grupos
- **Slug**: \`/groups\`
- **Roles**: Estudiante, Instructor, Admin, Sistemas
- **Estado**: Próximamente
- **Funcionalidades**:
  - Creación de grupos de estudio
  - Foros grupales
  - Recursos compartidos
  - Proyectos colaborativos
- **Componentes principales**:
  - \`GroupsList\`
  - \`GroupDetail\`
  - \`GroupForums\`
  - \`CollaborativeTools\`

### Profesores

#### Mis Cursos (Instructor)
- **Slug**: \`/instructor/courses\`
- **Roles**: Instructor, Admin, Sistemas
- **Funcionalidades**:
  - Cursos creados
  - Editor de contenidos
  - Estadísticas de participación
  - Configuración de cursos
- **Componentes principales**:
  - \`InstructorCoursesList\`
  - \`CourseEditor\`
  - \`CourseStats\`
  - \`CourseSettings\`

#### Notas y Tareas
- **Slug**: \`/instructor/assignments\`
- **Roles**: Instructor, Admin, Sistemas
- **Funcionalidades**:
  - Gestión de tareas
  - Calificaciones
  - Feedback a estudiantes
  - Sistema de evaluación
- **Componentes principales**:
  - \`AssignmentManager\`
  - \`GradingSystem\`
  - \`FeedbackTools\`
  - \`EvaluationCriteria\`

#### Mensajes (Instructor)
- **Slug**: \`/instructor/messages\`
- **Roles**: Instructor, Admin, Sistemas
- **Funcionalidades**:
  - Comunicación con estudiantes
  - Anuncios de cursos
  - Mensajes grupales
  - Plantillas de mensajes
- **Componentes principales**:
  - \`InstructorMessages\`
  - \`CourseAnnouncements\`
  - \`GroupMessaging\`
  - \`MessageTemplates\`

#### Analíticas (Instructor)
- **Slug**: \`/instructor/analytics\`
- **Roles**: Instructor, Admin, Sistemas
- **Funcionalidades**:
  - Rendimiento de estudiantes
  - Participación en cursos
  - Tasas de finalización
  - Métricas de contenido
- **Componentes principales**:
  - \`InstructorAnalytics\`
  - \`StudentPerformanceMetrics\`
  - \`CourseCompletionRates\`
  - \`ContentEngagementStats\`

### Gestión Académica

#### Estudiantes
- **Slug**: \`/admin/students\`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Listado de estudiantes
  - Perfiles detallados
  - Historial académico
  - Gestión de inscripciones
- **Componentes principales**:
  - \`StudentsList\`
  - \`StudentProfile\`
  - \`AcademicHistory\`
  - \`EnrollmentManager\`

#### Profesores
- **Slug**: \`/admin/instructors\`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Listado de instructores
  - Evaluación de desempeño
  - Asignación de cursos
  - Permisos especiales
- **Componentes principales**:
  - \`InstructorsList\`
  - \`InstructorEvaluation\`
  - \`CourseAssignment\`
  - \`InstructorPermissions\`

#### Cursos (Tabla)
- **Slug**: \`/admin/courses\`
- **Roles**: Admin, Sistemas, Instructor
- **Funcionalidades**:
  - Catálogo completo
  - Gestión de contenidos
  - Aprobación de cursos
  - Estadísticas
- **Componentes principales**:
  - \`AdminCoursesList\`
  - \`CourseApprovalSystem\`
  - \`ContentManagement\`
  - \`CourseStatistics\`

#### Categorías
- **Slug**: \`/admin/categories\`
- **Roles**: Admin, Sistemas, Creador de contenido
- **Funcionalidades**:
  - Estructura de categorías
  - Asignación de cursos
  - Taxonomía
  - SEO
- **Componentes principales**:
  - \`CategoryManager\`
  - \`CategoryAssignment\`
  - \`TaxonomySystem\`
  - \`CategorySEO\`

#### Certificados
- **Slug**: \`/admin/certificates\`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Plantillas de certificados
  - Criterios de emisión
  - Validación
  - Histórico
- **Componentes principales**:
  - \`CertificateTemplates\`
  - \`CertificateIssuance\`
  - \`ValidationSystem\`
  - \`CertificateHistory\`

#### Rutas de aprendizaje (Admin)
- **Slug**: \`/admin/learning\`
- **Roles**: Admin, Sistemas, Creador de contenido
- **Funcionalidades**:
  - Creación de rutas
  - Estructura curricular
  - Requisitos y dependencias
  - Publicación
- **Componentes principales**:
  - \`LearningPathCreator\`
  - \`CurriculumDesigner\`
  - \`RequirementsManager\`
  - \`PathPublisher\`

#### Actividad de Alumnos
- **Slug**: \`/admin/activity\`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Seguimiento en tiempo real
  - Reportes de actividad
  - Alertas de inactividad
  - Patrones de uso
- **Componentes principales**:
  - \`ActivityTracker\`
  - \`ActivityReports\`
  - \`InactivityAlerts\`
  - \`UsagePatterns\`

### Finanzas

#### Finanzas (Dashboard)
- **Slug**: \`/admin/finance\`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Resumen financiero
  - KPIs
  - Tendencias
  - Ingresos vs Gastos
- **Componentes principales**:
  - \`FinanceDashboard\`
  - \`FinancialKPIs\`
  - \`TrendAnalysis\`
  - \`RevenueExpenseChart\`

#### Facturas
- **Slug**: \`/admin/invoices\`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Gestión de facturas
  - Generación automática
  - Plantillas
  - Envío por email
- **Componentes principales**:
  - \`InvoiceManager\`
  - \`InvoiceGenerator\`
  - \`InvoiceTemplates\`
  - \`EmailSender\`

#### Suscripciones
- **Slug**: \`/admin/subscriptions\`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Planes de suscripción
  - Gestión de renovaciones
  - Análisis de retención
  - Descuentos
- **Componentes principales**:
  - \`SubscriptionPlans\`
  - \`RenewalManager\`
  - \`RetentionAnalytics\`
  - \`DiscountSystem\`

#### Bancos
- **Slug**: \`/admin/banks\`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Conexiones bancarias
  - Conciliación
  - Transferencias
  - Reportes
- **Componentes principales**:
  - \`BankConnections\`
  - \`ReconciliationTools\`
  - \`TransferSystem\`
  - \`BankReports\`

#### Cash-flow
- **Slug**: \`/admin/cashflow\`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Proyecciones
  - Historial
  - Análisis
  - Exportación
- **Componentes principales**:
  - \`CashFlowProjections\`
  - \`TransactionHistory\`
  - \`CashFlowAnalysis\`
  - \`DataExport\`

#### Alertas
- **Slug**: \`/admin/alerts\`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Umbrales de alertas
  - Notificaciones
  - Priorización
  - Reglas
- **Componentes principales**:
  - \`AlertThresholds\`
  - \`NotificationSystem\`
  - \`AlertPriority\`
  - \`RuleEngine\`

#### Analíticas (Finanzas)
- **Slug**: \`/admin/analytics\`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Métricas financieras
  - Visualizaciones
  - Comparativas
  - Exportación
- **Componentes principales**:
  - \`FinanceAnalytics\`
  - \`DataVisualizations\`
  - \`BenchmarkComparisons\`
  - \`AnalyticsExport\`

### Configuración

#### Configuración General
- **Slug**: \`/admin/settings\`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Parámetros generales
  - Personalización
  - Integración de APIs
  - Mantenimiento
- **Componentes principales**:
  - \`GeneralSettings\`
  - \`SiteCustomization\`
  - \`APIIntegration\`
  - \`MaintenanceTools\`

#### Funcionalidades
- **Slug**: \`/admin/features\`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Activación/desactivación
  - Features flags
  - Configuración por característica
  - Beta testing
- **Componentes principales**:
  - \`FeatureFlags\`
  - \`FeatureConfiguration\`
  - \`BetaTestManagement\`
  - \`FeatureRollout\`

#### Diseño
- **Slug**: \`/admin/design\`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Temas visuales
  - Editor de componentes
  - Personalización
  - Previsualizaciones
- **Componentes principales**:
  - \`ThemeManager\`
  - \`ComponentEditor\`
  - \`DesignCustomization\`
  - \`DesignPreview\`

#### Conexiones
- **Slug**: \`/admin/integrations\`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Integraciones externas
  - APIs
  - Webhooks
  - Autenticación
- **Componentes principales**:
  - \`IntegrationManager\`
  - \`APISettings\`
  - \`WebhookConfigurator\`
  - \`OAuthSettings\`

#### Datos
- **Slug**: \`/admin/data\`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Importación/exportación
  - Backups
  - Limpieza
  - Migraciones
- **Componentes principales**:
  - \`DataImportExport\`
  - \`BackupSystem\`
  - \`DataCleanup\`
  - \`MigrationTools\`

#### Páginas
- **Slug**: \`/admin/pages\`
- **Roles**: Admin, Sistemas, Creador de contenido
- **Funcionalidades**:
  - Gestión de páginas estáticas
  - Editor visual
  - SEO
  - Publicación
- **Componentes principales**:
  - \`PageManager\`
  - \`VisualEditor\`
  - \`PageSEO\`
  - \`PublicationSystem\`

#### Roles y Permisos
- **Slug**: \`/admin/roles\`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Gestión de roles
  - Asignación de permisos
  - Políticas de acceso
  - Auditoría
- **Componentes principales**:
  - \`RoleManager\`
  - \`PermissionAssignment\`
  - \`AccessPolicies\`
  - \`AccessAudit\`

## Plan de Transición

Para gestionar la transición a esta nueva estructura de navegación, se implementará un enfoque en tres fases:

### Fase 1: Mapeo de Rutas Antiguas a Nuevas

1. Crear un mapa de redirecciones que dirija las rutas antiguas a las nuevas.
2. Implementar un middleware de redirección en el enrutador de la aplicación.
3. Mantener compatibilidad con marcadores/enlaces existentes.

### Fase 2: Refactorización de Componentes

1. Trasladar todos los componentes de diseño a las nuevas rutas.
2. Asegurar que las funcionalidades existentes se mantengan intactas.
3. Implementar pruebas para verificar que no haya regresiones.

### Fase 3: Despliegue y Monitoreo

1. Implementar registros detallados para identificar problemas de navegación.
2. Monitorear el uso de rutas anticuadas para detectar áreas problemáticas.
3. Recopilar feedback de usuarios para mejoras continuas.

## Mapa de Funcionalidades por Rol

Cada funcionalidad está disponible para roles específicos:

| Funcionalidad | Student | Instructor | Admin | Sistemas | Moderator | Content Creator | Guest |
|--------------|---------|------------|-------|----------|-----------|-----------------|-------|
| Dashboard Personal | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| Exploración de Cursos | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Gestión Académica | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ |
| Herramientas de Instructor | ✗ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| Herramientas Financieras | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ |
| Configuración del Sistema | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ |
| Creación de Contenido | ✗ | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |
| Mensajería | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |

---

Documento actualizado: [${currentDate}]

_Este documento debe ser actualizado cuando se realicen cambios significativos en la estructura de navegación o se añadan nuevas funcionalidades._
`;

  return docContent;
}

// Función principal
async function main() {
  try {
    console.log('Actualizando documentación del sistema...');
    
    // Actualizar fechas en documentos existentes
    updateDocumentDate(masterDocPath);
    updateDocumentDate(navDocPath);
    
    // Extraer configuración de navegación
    const navConfig = extractNavigationConfig();
    
    // Extraer rutas y componentes
    const routesInfo = extractRoutesAndComponents();
    
    // Generar documentación de navegación
    const navDocContent = generateNavigationDoc(navConfig);
    
    // Generar documentación de arquitectura del sistema
    const sysDocContent = generateSystemArchitectureDoc(navConfig, routesInfo);
    
    // Escribir documentación generada
    fs.writeFileSync(
      path.join(__dirname, '../docs/ESTRUCTURA_NAVEGACION_GENERADA.md'), 
      navDocContent, 
      'utf8'
    );
    
    // Escribir documentación de arquitectura actualizada
    fs.writeFileSync(
      masterDocPath,
      sysDocContent,
      'utf8'
    );
    
    console.log('Documentación actualizada correctamente');
    console.log(`Se han documentado ${Object.keys(navConfig).length} secciones de navegación y ${routesInfo.routes?.length || 0} rutas.`);
    
  } catch (error) {
    console.error('Error al actualizar la documentación:', error);
    process.exit(1);
  }
}

// Ejecutar
main();
