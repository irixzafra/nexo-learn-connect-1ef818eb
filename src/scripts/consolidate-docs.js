
#!/usr/bin/env node

/**
 * Script para consolidar y optimizar la documentación del proyecto
 * 
 * Este script implementa mejoras en la estructura de la documentación:
 * - Consolida documentos relacionados
 * - Mejora la navegabilidad con índices y enlaces
 * - Establece un sistema de versionado y mantenimiento
 * - Optimiza la visualización con tablas resumen y referencias a diagramas
 */

const fs = require('fs');
const path = require('path');

// Configuración de rutas
const PROJECT_ROOT = path.join(__dirname, '../..');
const DOCS_NEXO_DIR = path.join(PROJECT_ROOT, 'docs_nexo');
const DOCS_DIR = path.join(PROJECT_ROOT, 'docs');
const LEGACY_DIR = path.join(DOCS_DIR, 'legacy');
const TEMP_DIR = path.join(PROJECT_ROOT, 'docs_temp');

// Función para asegurar que existe un directorio
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Creado directorio: ${path.relative(PROJECT_ROOT, dir)}`);
  }
}

// Función para crear una estructura optimizada de documentación
function createOptimizedDocStructure() {
  // Crear estructura principal
  const mainDirs = [
    DOCS_DIR,
    path.join(DOCS_DIR, 'guias'),
    path.join(DOCS_DIR, 'api'),
    path.join(DOCS_DIR, 'admin'),
    path.join(DOCS_DIR, 'desarrollo'),
    path.join(DOCS_DIR, 'arquitectura'),
    LEGACY_DIR
  ];
  
  // Asegurar que existan los directorios 
  mainDirs.forEach(dir => ensureDirectoryExists(dir));
  
  // Crear archivos índice principales
  const indexContent = `# Documentación Nexo Learning

## Guía Rápida

Este documento sirve como punto central de navegación para toda la documentación del proyecto Nexo Learning.

## Secciones Principales

- [📘 Guías de Usuario](./guias/README.md) - Tutoriales y manuales para usuarios finales
- [🛠️ Desarrollo](./desarrollo/README.md) - Recursos para desarrolladores (stack, workflow, testing)
- [📐 Arquitectura](./arquitectura/README.md) - Diseño técnico y decisiones arquitectónicas
- [📡 API](./api/README.md) - Documentación de endpoints y servicios
- [👑 Administración](./admin/README.md) - Guías para administradores de la plataforma

## Estado del Proyecto

- [📊 Roadmap](./desarrollo/roadmap.md) - Plan de desarrollo y estado de las funcionalidades
- [📋 Requisitos](./desarrollo/requisitos.md) - Especificaciones funcionales y no funcionales
- [📆 Changelog](./CHANGELOG.md) - Registro de cambios por versión

## Recursos Adicionales

- [📚 Glosario](./desarrollo/glosario.md) - Terminología del proyecto
- [🔍 Índice Completo](./INDEX.md) - Listado completo de toda la documentación

---

> **Última actualización:** ${new Date().toISOString().split('T')[0]}  
> **Versión:** v1.0
`;

  fs.writeFileSync(path.join(DOCS_DIR, 'README.md'), indexContent);
  console.log(`✓ Creado índice principal: README.md`);
  
  // Crear índice completo
  const fullIndexContent = `# Índice Completo de Documentación

Este documento contiene enlaces a toda la documentación disponible del proyecto Nexo Learning.

## Por Categoría

### Guías de Usuario
${generateDirectoryIndex(path.join(DOCS_DIR, 'guias'))}

### Desarrollo
${generateDirectoryIndex(path.join(DOCS_DIR, 'desarrollo'))}

### Arquitectura
${generateDirectoryIndex(path.join(DOCS_DIR, 'arquitectura'))}

### API
${generateDirectoryIndex(path.join(DOCS_DIR, 'api'))}

### Administración
${generateDirectoryIndex(path.join(DOCS_DIR, 'admin'))}

---

## Por Audiencia

### Para Desarrolladores
- [Stack Tecnológico](./arquitectura/stack-tecnologico.md)
- [Guía de Desarrollo](./desarrollo/guia-desarrollo.md)
- [Convenciones de Código](./desarrollo/convenciones.md)
- [Testing](./desarrollo/testing.md)
- [API](./api/README.md)

### Para Product Managers
- [Requisitos](./desarrollo/requisitos.md)
- [Roadmap](./desarrollo/roadmap.md)
- [Flujo de Trabajo](./desarrollo/workflow.md)

### Para Administradores
- [Guía de Administración](./admin/README.md)
- [Configuración](./admin/configuracion.md)
- [Despliegue](./arquitectura/despliegue.md)

---

> **Mantenido por:** Equipo de Documentación  
> **Última actualización:** ${new Date().toISOString().split('T')[0]}
`;

  fs.writeFileSync(path.join(DOCS_DIR, 'INDEX.md'), fullIndexContent);
  console.log(`✓ Creado índice completo: INDEX.md`);
  
  // Crear README para las secciones principales
  const sections = [
    { 
      path: path.join(DOCS_DIR, 'desarrollo', 'README.md'),
      content: `# Guía de Desarrollo Integral

## Introducción

Esta guía unifica toda la información necesaria para desarrolladores que trabajan en el proyecto Nexo Learning, desde la configuración del entorno hasta las mejores prácticas de código.

## Contenido

1. [Configuración del Entorno](./stack-tecnologico.md)
2. [Flujo de Trabajo](./workflow.md)
3. [Convenciones de Código](./convenciones.md)
4. [Testing](./testing.md)
5. [Contribución](./contribucion.md)

## Stack Tecnológico Resumido

- **Frontend:** React 18, TypeScript, Tailwind CSS, Shadcn/UI
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Estado:** React Context, React Query
- **Testing:** Vitest, React Testing Library, Playwright

## Estándares de Código

- TypeScript para todo el código
- ESLint + Prettier para formateo
- Pruebas unitarias para componentes clave
- Documentación para todas las funciones y componentes públicos

## Flujo de Trabajo Simplificado

\`\`\`
1. Crear rama feature/ o fix/
2. Implementar cambios (con tests)
3. Solicitar revisión de código
4. Merge a develop
5. Despliegue a entorno de staging
\`\`\`

Para más detalles, consulta los documentos específicos enlazados arriba.

---

> **Versión:** v1.0  
> **Última actualización:** ${new Date().toISOString().split('T')[0]}  
> **Mantenedores:** Equipo de Desarrollo
`
    },
    { 
      path: path.join(DOCS_DIR, 'arquitectura', 'README.md'),
      content: `# Arquitectura de Nexo Learning

## Visión General

Nexo Learning está construido como una aplicación web moderna siguiendo principios de diseño escalable, modular y mantenible.

## Índice de Documentación de Arquitectura

- [Arquitectura General](./arquitectura-general.md)
- [Stack Tecnológico](./stack-tecnologico.md)
- [Modelo de Datos](./modelo-datos.md)
- [Flujo de Datos](./flujo-datos.md)
- [Despliegue](./despliegue.md)
- [Seguridad](./seguridad.md)

## Decisiones Arquitectónicas Clave

- **Arquitectura Feature-First:** Organización del código por dominios funcionales en lugar de por capas técnicas
- **Backend Serverless:** Uso de Supabase como plataforma principal de backend
- **Seguridad mediante RLS:** Políticas Row-Level Security para control de acceso a datos
- **Optimización de Rendimiento:** Code splitting, lazy loading, y estrategias de caché

## Diagrama Simplificado

\`\`\`
+-------------------------------------------+
|             Cliente (Browser)             |
+-------------------+-----------------------+
                    |
+-------------------v-----------------------+
|         Frontend SPA (React + TS)         |
+-------------------+-----------------------+
                    |
+-------------------v-----------------------+
|         API Layer (Supabase APIs)         |
+---------------+-------------+-------------+
                |             |
+---------------v-----+ +-----v-------------+
|   Base de Datos     | |   Autenticación   |
|   (PostgreSQL)      | |   (Supabase Auth) |
+---------------------+ +-------------------+
\`\`\`

Para más detalles sobre cada componente, consulta los documentos específicos enlazados arriba.

---

> **Versión:** v1.0  
> **Última actualización:** ${new Date().toISOString().split('T')[0]}  
> **Mantenedores:** Arquitectos de Software
`
    },
    { 
      path: path.join(DOCS_DIR, 'guias', 'README.md'),
      content: `# Guías de Usuario de Nexo Learning

Esta sección contiene tutoriales y manuales diseñados para usuarios finales de la plataforma.

## Guías por Rol

### Para Estudiantes
- [Primeros Pasos como Estudiante](./estudiante/primeros-pasos.md)
- [Navegación de Cursos](./estudiante/navegacion-cursos.md)
- [Completar Actividades](./estudiante/actividades.md)
- [Certificados y Logros](./estudiante/certificados.md)

### Para Instructores
- [Primeros Pasos como Instructor](./instructor/primeros-pasos.md)
- [Crear un Curso](./instructor/crear-curso.md)
- [Gestionar Estudiantes](./instructor/gestion-estudiantes.md)
- [Análisis de Rendimiento](./instructor/analytics.md)

### Para Administradores
- [Panel de Administración](./admin/panel-admin.md)
- [Gestión de Usuarios](./admin/gestion-usuarios.md)
- [Configuración del Sistema](./admin/configuracion.md)

## Temas Generales

- [Perfil de Usuario](./general/perfil.md)
- [Mensajería y Notificaciones](./general/mensajeria.md)
- [Configuración de Cuenta](./general/cuenta.md)
- [Preguntas Frecuentes](./general/faq.md)

## Tutoriales en Video

Encuentra tutoriales en video para las funcionalidades más utilizadas en nuestro [canal oficial](https://ejemplo.com/tutoriales).

---

> **Versión:** v1.0  
> **Última actualización:** ${new Date().toISOString().split('T')[0]}  
> **Mantenedores:** Equipo de Documentación
`
    },
    { 
      path: path.join(DOCS_DIR, 'api', 'README.md'),
      content: `# Documentación de API - Nexo Learning

## Introducción

Esta sección contiene la documentación técnica completa de las APIs disponibles en Nexo Learning, orientada tanto a desarrolladores internos como a integradores externos.

## Endpoints Principales

- [Autenticación](./endpoints/autenticacion.md)
- [Usuarios](./endpoints/usuarios.md)
- [Cursos](./endpoints/cursos.md)
- [Contenido](./endpoints/contenido.md)
- [Análisis](./endpoints/analisis.md)

## Guías de Integración

- [Primeros Pasos](./guias/primeros-pasos.md)
- [Autenticación y Autorización](./guias/autenticacion.md)
- [Manejo de Errores](./guias/errores.md)
- [Limitaciones y Cuotas](./guias/limitaciones.md)

## Ejemplos de Código

### Autenticación

\`\`\`javascript
import { supabase } from './supabaseClient';

// Iniciar sesión con email y contraseña
const signIn = async (email, password) => {
  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    console.error('Error al iniciar sesión:', error.message);
    return null;
  }
  
  return user;
};
\`\`\`

### Obtener Cursos

\`\`\`javascript
import { supabase } from './supabaseClient';

// Obtener cursos disponibles
const getCourses = async () => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('is_published', true);
    
  if (error) {
    console.error('Error al obtener cursos:', error.message);
    return [];
  }
  
  return data;
};
\`\`\`

---

> **Versión:** v1.0  
> **Última actualización:** ${new Date().toISOString().split('T')[0]}  
> **Mantenedores:** Equipo de API
`
    },
    { 
      path: path.join(DOCS_DIR, 'admin', 'README.md'),
      content: `# Documentación para Administradores

Esta sección contiene guías y referencias específicas para administradores de la plataforma Nexo Learning.

## Guías de Administración

- [Panel de Administración](./panel-admin.md)
- [Gestión de Usuarios](./usuarios.md)
- [Configuración del Sistema](./configuracion.md)
- [Monitoreo y Analíticas](./monitoreo.md)
- [Seguridad y Permisos](./seguridad.md)

## Procedimientos Esenciales

### Gestión de Cuentas

- [Crear Administradores](./procedimientos/crear-admin.md)
- [Asignar Roles](./procedimientos/asignar-roles.md)
- [Resetear Contraseñas](./procedimientos/reset-password.md)

### Mantenimiento

- [Respaldos](./procedimientos/respaldos.md)
- [Optimización de Base de Datos](./procedimientos/optimizacion-db.md)
- [Limpieza de Archivos](./procedimientos/limpieza-archivos.md)

## Referencias Rápidas

### Panel de Administración

El panel de administración proporciona herramientas para:

- Gestión centralizada de usuarios
- Configuración del sistema
- Gestión de contenido
- Monitorización y analíticas

### Seguridad

Por favor, consulta la [guía de seguridad](./seguridad.md) para conocer las mejores prácticas:

- Gestión de contraseñas
- Control de acceso
- Monitoreo de actividad sospechosa
- Protocolos de respuesta a incidentes

---

> **Versión:** v1.0  
> **Última actualización:** ${new Date().toISOString().split('T')[0]}  
> **Mantenedores:** Equipo de Operaciones
`
    }
  ];
  
  // Crear archivos README para cada sección
  sections.forEach(section => {
    ensureDirectoryExists(path.dirname(section.path));
    fs.writeFileSync(section.path, section.content);
    console.log(`✓ Creado archivo: ${path.relative(DOCS_DIR, section.path)}`);
  });
  
  // Crear archivos para el sistema de desarrollo integral
  createDevelopmentGuides();
  
  // Crear archivos de arquitectura
  createArchitectureFiles();
  
  // Crear changelog
  createChangelog();
}

// Función para generar índice de un directorio
function generateDirectoryIndex(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return '- *Sin documentación disponible*';
  }
  
  try {
    const files = fs.readdirSync(dirPath).filter(file => 
      file.endsWith('.md') && file !== 'README.md'
    );
    
    if (files.length === 0) {
      if (fs.existsSync(path.join(dirPath, 'README.md'))) {
        return `- [Índice](${path.relative(DOCS_DIR, path.join(dirPath, 'README.md'))})`;
      }
      return '- *Sin documentación disponible*';
    }
    
    const index = files.map(file => {
      const filePath = path.join(dirPath, file);
      const relativePath = path.relative(DOCS_DIR, filePath);
      const name = file.replace('.md', '').split('-').map(
        word => word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      return `- [${name}](${relativePath})`;
    }).join('\n');
    
    if (fs.existsSync(path.join(dirPath, 'README.md'))) {
      return `- [Índice](${path.relative(DOCS_DIR, path.join(dirPath, 'README.md'))})\n${index}`;
    }
    
    return index;
  } catch (err) {
    console.error(`Error al generar índice para ${dirPath}:`, err);
    return '- *Error al generar índice*';
  }
}

// Función para crear archivos de guías de desarrollo
function createDevelopmentGuides() {
  // Migrar contenido de documentos existentes
  const techStackContent = migrateFileContent(
    path.join(DOCS_NEXO_DIR, 'TECHNOLOGY_STACK.md'),
    'Stack Tecnológico'
  );
  
  const devGuideFiles = [
    {
      path: path.join(DOCS_DIR, 'desarrollo', 'stack-tecnologico.md'),
      content: techStackContent || `# Stack Tecnológico

## Frontend

### Core
- **React**: v18 - Biblioteca principal de UI
- **TypeScript**: v5 - Tipado estático para JavaScript
- **Vite**: Sistema de construcción y bundling rápido

### Enrutamiento y Navegación
- **React Router**: v6 - Navegación y gestión de rutas

### Estado y Gestión de Datos
- **React Context API**: Estado global de aplicación
- **React Query**: v5 - Fetching, caching y sincronización de estado servidor

### Interfaz de Usuario
- **Tailwind CSS**: Framework de utilidades CSS
- **Shadcn/UI**: Componentes UI modulares basados en Radix
- **Framer Motion**: Animaciones fluidas

## Backend (Supabase)

- **PostgreSQL**: Sistema de base de datos relacional
- **Supabase Auth**: Sistema completo de identidad
- **Row Level Security**: Políticas de acceso basadas en roles
- **Supabase Storage**: Sistema de almacenamiento para archivos

---

> **Versión:** v1.0  
> **Última actualización:** ${new Date().toISOString().split('T')[0]}  
> **Mantenedores:** Equipo de Desarrollo`
    },
    {
      path: path.join(DOCS_DIR, 'desarrollo', 'workflow.md'),
      content: `# Flujo de Trabajo

## Introducción

Este documento describe el flujo de trabajo estándar para el desarrollo de Nexo Learning, desde la concepción de funcionalidades hasta su despliegue en producción.

## Flujo de Desarrollo

### 1. Planificación

- **Definición de Requisitos**: Documentación clara de la funcionalidad en el sistema de tickets
- **Diseño**: Creación de mockups y aprobación por el equipo de diseño
- **Estimación**: Evaluación de esfuerzo y tiempo requerido

### 2. Desarrollo

- **Creación de Rama**: \`feature/nombre-caracteristica\` o \`fix/descripcion-bug\`
- **Implementación**: Desarrollo siguiendo las convenciones de código
- **Testing**: Pruebas unitarias y de integración
- **Documentación**: Comentarios en el código y actualización de documentación relevante

### 3. Revisión

- **Pull Request**: Crear PR con descripción detallada de cambios
- **Code Review**: Al menos un revisor debe aprobar los cambios
- **QA**: Verificación por el equipo de calidad en ambiente de staging

### 4. Despliegue

- **Merge a Develop**: Tras aprobación, se integra a la rama develop
- **Deploy a Staging**: Despliegue automático al entorno de pruebas
- **Validación**: Verificación final en ambiente similar a producción
- **Release**: Merge a main y despliegue a producción

## Convenciones

### Ramas

- \`main\`: Código en producción
- \`develop\`: Integraciones para próxima release
- \`feature/*\`: Desarrollo de nuevas funcionalidades
- \`fix/*\`: Corrección de bugs
- \`hotfix/*\`: Correcciones urgentes para producción

### Commits

Formato: \`tipo(ámbito): descripción\`

Tipos:
- \`feat\`: Nueva funcionalidad
- \`fix\`: Corrección de bug
- \`docs\`: Cambios en documentación
- \`style\`: Cambios que no afectan al comportamiento
- \`refactor\`: Refactorización de código
- \`test\`: Adición o modificación de tests
- \`chore\`: Cambios en el proceso de build, herramientas, etc.

Ejemplo: \`feat(auth): implementar autenticación con Google\`

---

> **Versión:** v1.0  
> **Última actualización:** ${new Date().toISOString().split('T')[0]}  
> **Mantenedores:** Tech Lead`
    },
    {
      path: path.join(DOCS_DIR, 'desarrollo', 'testing.md'),
      content: `# Guía de Testing

## Introducción

Esta guía detalla las mejores prácticas y enfoques para el testing en Nexo Learning, asegurando calidad, estabilidad y confiabilidad del código.

## Tipos de Tests

### Tests Unitarios

- **Herramientas**: Vitest, React Testing Library
- **Enfoque**: Testear componentes y funciones aisladas
- **Ubicación**: Junto al código en archivos \`*.test.ts(x)\`
- **Cobertura Mínima**: 80% del código base

### Tests de Integración

- **Herramientas**: Vitest, MSW (Mock Service Worker)
- **Enfoque**: Testear interacción entre componentes y servicios
- **Ubicación**: Directorio \`src/tests/integration\`

### Tests End-to-End

- **Herramientas**: Playwright
- **Enfoque**: Simular interacción de usuario completa
- **Ubicación**: Directorio \`e2e\`
- **Cobertura**: Flujos principales de usuario

## Mejores Prácticas

### General

- Tests deben ser determinísticos (mismo resultado en cada ejecución)
- Independientes (no dependan de otros tests)
- Rápidos en ejecución

### Componentes React

- Testear comportamiento, no implementación
- Usar queries accesibles (getByRole, getByText) en vez de testId cuando sea posible
- Simular eventos de usuario con \`userEvent\` en vez de \`fireEvent\`

### Mocks

- Usar MSW para mockear API en lugar de manipular implementaciones directamente
- Declarar mocks al inicio del archivo de test
- Restaurar mocks después de cada test

## Ejemplos

### Test de Componente

\`\`\`typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
\`\`\`

### Test de Hook

\`\`\`typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('increments counter', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });
});
\`\`\`

---

> **Versión:** v1.0  
> **Última actualización:** ${new Date().toISOString().split('T')[0]}  
> **Mantenedores:** Equipo QA`
    },
    {
      path: path.join(DOCS_DIR, 'desarrollo', 'requisitos.md'),
      content: migrateFileContent(
        path.join(DOCS_NEXO_DIR, 'REQUIREMENTS.md'),
        'Requisitos del Proyecto'
      ) || '# Requisitos del Proyecto\n\n*Contenido pendiente*'
    }
  ];
  
  devGuideFiles.forEach(file => {
    ensureDirectoryExists(path.dirname(file.path));
    fs.writeFileSync(file.path, file.content);
    console.log(`✓ Creado archivo: ${path.relative(DOCS_DIR, file.path)}`);
  });
}

// Función para crear archivos de arquitectura
function createArchitectureFiles() {
  // Migrar contenido de arquitectura
  const architectureContent = migrateFileContent(
    path.join(DOCS_NEXO_DIR, 'ARCHITECTURE.md'),
    'Arquitectura General'
  );
  
  const deploymentContent = migrateFileContent(
    path.join(DOCS_NEXO_DIR, 'DEPLOYMENT.md'),
    'Guía de Despliegue'
  );
  
  const architectureFiles = [
    {
      path: path.join(DOCS_DIR, 'arquitectura', 'arquitectura-general.md'),
      content: architectureContent || `# Arquitectura General\n\n*Contenido pendiente*`
    },
    {
      path: path.join(DOCS_DIR, 'arquitectura', 'despliegue.md'),
      content: deploymentContent || `# Guía de Despliegue\n\n*Contenido pendiente*`
    },
    {
      path: path.join(DOCS_DIR, 'arquitectura', 'stack-tecnologico.md'),
      content: `# Stack Tecnológico Detallado

*Este documento es una referencia detallada del stack tecnológico utilizado en Nexo Learning. Para una guía de desarrollo, consulte [Guía de Desarrollo](../desarrollo/stack-tecnologico.md).*

## Frontend

### Core
- **React**: v18 - Biblioteca principal de UI
- **TypeScript**: v5 - Tipado estático para JavaScript
- **Vite**: Sistema de construcción y bundling rápido

### Enrutamiento y Navegación
- **React Router**: v6 - Navegación y gestión de rutas
- **History API**: Para manipulación programática del historial

### Estado y Gestión de Datos
- **React Context API**: Estado global de aplicación
- **React Query**: v5 - Fetching, caching y sincronización de estado servidor

### Interfaz de Usuario
- **Tailwind CSS**: Framework de utilidades CSS
- **Shadcn/UI**: Componentes UI modulares basados en Radix
- **Framer Motion**: Animaciones fluidas
- **Lucide React**: Iconografía
- **React Hook Form**: Manejo de formularios
- **Zod**: Validación de esquemas

### Utilidades
- **date-fns**: Manipulación de fechas
- **lodash-es**: Utilidades de programación funcional
- **react-helmet-async**: Gestión de metadatos de documento

## Backend (Supabase)

### Base de Datos
- **PostgreSQL**: 15+ - Sistema de base de datos relacional
- **Row Level Security (RLS)**: Políticas de seguridad a nivel de fila
- **Supabase Schema**: Estructura de base de datos optimizada

### Autenticación y Autorización
- **Supabase Auth**: Sistema completo de identidad
- **JWT**: Tokens para autenticación
- **OAuth**: Integración con proveedores externos (Google, etc.)
- **Row Level Security**: Políticas de acceso basadas en roles

### APIs y Funciones
- **Supabase Client**: Cliente JavaScript para acceso a API
- **RESTful API**: Endpoints para operaciones CRUD
- **Realtime API**: Suscripciones para actualizaciones en tiempo real
- **Edge Functions**: Funciones serverless para lógica personalizada

### Almacenamiento
- **Supabase Storage**: Sistema de almacenamiento para archivos
- **Políticas de Acceso**: Control granular sobre archivos

## Testing

### Unitarios y de Componentes
- **Vitest**: Framework de testing rápido
- **React Testing Library**: Testing de componentes
- **MSW**: Mocking de API

### E2E
- **Playwright**: Testing end-to-end automatizado

---

> **Versión:** v1.0  
> **Última actualización:** ${new Date().toISOString().split('T')[0]}  
> **Mantenedores:** Equipo de Arquitectura`
    }
  ];
  
  architectureFiles.forEach(file => {
    ensureDirectoryExists(path.dirname(file.path));
    fs.writeFileSync(file.path, file.content);
    console.log(`✓ Creado archivo: ${path.relative(DOCS_DIR, file.path)}`);
  });
}

// Función para migrar contenido de un archivo existente
function migrateFileContent(sourcePath, title) {
  if (!fs.existsSync(sourcePath)) {
    return null;
  }
  
  try {
    let content = fs.readFileSync(sourcePath, 'utf8');
    
    // Añadir metadata de versión y actualización
    if (!content.includes('> **Versión:**')) {
      content += `\n\n---\n\n> **Versión:** v1.0  \n> **Última actualización:** ${new Date().toISOString().split('T')[0]}`;
    }
    
    return content;
  } catch (err) {
    console.error(`Error al migrar contenido de ${sourcePath}:`, err);
    return `# ${title}\n\n*Error al migrar contenido*\n\n> **Versión:** v1.0  \n> **Última actualización:** ${new Date().toISOString().split('T')[0]}`;
  }
}

// Función para crear el changelog
function createChangelog() {
  const changelogContent = migrateFileContent(
    path.join(DOCS_NEXO_DIR, 'CHANGELOG.md'),
    'Registro de Cambios'
  );
  
  const content = changelogContent || `# Registro de Cambios (Changelog)

Todas las modificaciones notables a este proyecto serán documentadas en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Añadido
- Sistema de documentación optimizada
- Estructura de directorios mejorada
- Índices y navegación entre documentos

### Cambiado
- Consolidación de documentos relacionados
- Mejora en el formato de la documentación
- Estructuración por audiencia y categoría

## [0.1.0] - ${new Date().toISOString().split('T')[0]}

### Añadido
- Estructura inicial del proyecto
- Configuración del entorno de desarrollo
- Documentación base

---

> **Mantenedores:** Equipo de Desarrollo`;

  fs.writeFileSync(path.join(DOCS_DIR, 'CHANGELOG.md'), content);
  console.log(`✓ Creado changelog: CHANGELOG.md`);
}

// Función para mover documentos obsoletos a la carpeta legacy
function moveObsoleteDocuments() {
  // Lista de directorios a verificar
  const dirsToCheck = [
    DOCS_DIR,
    path.join(DOCS_DIR, 'guias'),
    path.join(DOCS_DIR, 'api'),
    path.join(DOCS_DIR, 'admin'),
    path.join(DOCS_DIR, 'desarrollo'),
    path.join(DOCS_DIR, 'arquitectura')
  ];
  
  // Patrones de archivos considerados obsoletos
  const obsoletePatterns = [
    /^0[0-9]_/,             // Archivos con prefijos numéricos
    /\.MD$/,                // Archivos .MD en mayúsculas
    /^ESTRUCTURA_/,         // Archivos antiguos de estructura
    /\.(backup|bak|old)$/,  // Archivos de respaldo
    /^draft-/,              // Borradores
    /-deprecated$/,         // Marcados como deprecados
    /^tmp_/,                // Archivos temporales
    /^old_/                 // Archivos antiguos
  ];

  function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      
      // Si es un directorio, procesar recursivamente (excepto legacy)
      if (fs.statSync(fullPath).isDirectory() && fullPath !== LEGACY_DIR) {
        processDir(fullPath);
        continue;
      }
      
      // Verificar si el archivo coincide con algún patrón obsoleto
      const isObsolete = obsoletePatterns.some(pattern => pattern.test(item));
      
      if (isObsolete) {
        // Crear ruta relativa para mantener estructura
        const relativePath = path.relative(DOCS_DIR, fullPath);
        const destPath = path.join(LEGACY_DIR, relativePath);
        
        // Asegurar que exista el directorio destino
        ensureDirectoryExists(path.dirname(destPath));
        
        // Mover el archivo
        fs.renameSync(fullPath, destPath);
        console.log(`✓ Movido archivo obsoleto a legacy: ${relativePath}`);
      }
    }
  }
  
  dirsToCheck.forEach(dir => processDir(dir));
}

// Función para migrar contenido de docs_nexo
function migrateDocsNexo() {
  if (!fs.existsSync(DOCS_NEXO_DIR)) {
    console.log('ℹ️ No se encontró el directorio docs_nexo, saltando migración.');
    return;
  }
  
  console.log('🔄 Migrando contenido de docs_nexo...');
  
  // Archivos clave a conservar en ubicaciones específicas
  const keyFiles = [
    // Format: { source, destination, isFeature }
    { 
      source: path.join(DOCS_NEXO_DIR, 'features/README.md'), 
      dest: path.join(DOCS_DIR, 'arquitectura', 'estructura-features.md'),
      isFeature: true
    },
    { 
      source: path.join(DOCS_NEXO_DIR, 'ARCHITECTURE.md'), 
      dest: path.join(DOCS_DIR, 'arquitectura', 'arquitectura-general.md'),
      isFeature: false
    },
    {
      source: path.join(DOCS_NEXO_DIR, 'TECHNOLOGY_STACK.md'),
      dest: path.join(DOCS_DIR, 'arquitectura', 'stack-tecnologico.md'),
      isFeature: false
    },
    {
      source: path.join(DOCS_NEXO_DIR, 'DEPLOYMENT.md'),
      dest: path.join(DOCS_DIR, 'arquitectura', 'despliegue.md'),
      isFeature: false
    },
    {
      source: path.join(DOCS_NEXO_DIR, 'REQUIREMENTS.md'),
      dest: path.join(DOCS_DIR, 'desarrollo', 'requisitos.md'),
      isFeature: false
    },
    {
      source: path.join(DOCS_NEXO_DIR, 'README.md'),
      dest: path.join(DOCS_DIR, 'README.md'),
      isFeature: false,
      append: true
    }
  ];
  
  // Migrar archivos clave
  keyFiles.forEach(file => {
    if (fs.existsSync(file.source)) {
      ensureDirectoryExists(path.dirname(file.dest));
      
      if (file.append && fs.existsSync(file.dest)) {
        // Si append es true, añadir al final del archivo existente
        const sourceContent = fs.readFileSync(file.source, 'utf8');
        const destContent = fs.readFileSync(file.dest, 'utf8');
        
        fs.writeFileSync(
          file.dest, 
          `${destContent}\n\n## Contenido Adicional (Migrado)\n\n${sourceContent}`
        );
      } else {
        // Si no, sobrescribir o crear nuevo
        fs.copyFileSync(file.source, file.dest);
      }
      
      console.log(`✓ Migrado archivo importante: ${path.relative(PROJECT_ROOT, file.dest)}`);
    }
  });
  
  // Mover el resto de archivos a legacy
  function migrateToLegacy(dir, baseDir = DOCS_NEXO_DIR) {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      
      // Si es un directorio, procesar recursivamente
      if (fs.statSync(fullPath).isDirectory()) {
        migrateToLegacy(fullPath, baseDir);
        continue;
      }
      
      // Verificar si este archivo ya fue migrado como archivo clave
      const isKeyFile = keyFiles.some(kf => kf.source === fullPath);
      
      if (!isKeyFile) {
        // Crear ruta relativa para mantener estructura
        const relativePath = path.relative(baseDir, fullPath);
        const destPath = path.join(LEGACY_DIR, 'docs_nexo', relativePath);
        
        // Asegurar que exista el directorio destino
        ensureDirectoryExists(path.dirname(destPath));
        
        // Copiar el archivo
        fs.copyFileSync(fullPath, destPath);
        console.log(`✓ Archivado en legacy: ${relativePath}`);
      }
    }
  }
  
  // Asegurar que exista el directorio de legacy para docs_nexo
  ensureDirectoryExists(path.join(LEGACY_DIR, 'docs_nexo'));
  
  // Migrar archivos
  migrateToLegacy(DOCS_NEXO_DIR);
  
  // Eliminar docs_nexo original después de migrar todo
  fs.rmSync(DOCS_NEXO_DIR, { recursive: true, force: true });
  console.log(`✓ Eliminado directorio original: docs_nexo`);
}

// Función principal para consolidar y optimizar
function optimizeDocs() {
  console.log('🔄 Iniciando optimización de documentación...');
  
  // 1. Crear documentación optimizada
  createOptimizedDocStructure();
  
  // 2. Mover documentos obsoletos a legacy
  moveObsoleteDocuments();
  
  // 3. Migrar docs_nexo
  migrateDocsNexo();

  console.log('✅ Documentación optimizada correctamente.');
  console.log(`ℹ️ Documentación obsoleta archivada en: docs/legacy`);
  console.log(`ℹ️ Índice central disponible en: docs/README.md`);
  console.log(`ℹ️ Índice completo disponible en: docs/INDEX.md`);
}

// Ejecutar si se llama directamente
if (require.main === module) {
  optimizeDocs();
}

module.exports = { optimizeDocs };
