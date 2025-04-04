
#!/usr/bin/env node

/**
 * Script para consolidar la documentación de Nexo Learning
 * Este script reorganiza la estructura de documentación,
 * elimina duplicados y crea una estructura limpia y minimalista
 */

const fs = require('fs');
const path = require('path');

// Configuración de rutas
const PROJECT_ROOT = path.resolve('.');
const DOCS_DIR = path.join(PROJECT_ROOT, 'docs_nexo');
const LEGACY_DIR = path.join(DOCS_DIR, 'docs_legacy');

// Definir la nueva estructura de carpetas
const NEW_STRUCTURE = {
  core: ['architecture', 'tech-stack', 'design-system', 'data-model', 'security'],
  guides: ['users', 'admin', 'developers'],
  api: ['endpoints', 'schemas'],
  features: ['courses', 'users', 'navigation', 'roadmap'],
  templates: ['components', 'documentation']
};

// Mapa de consolidación para determinar qué archivos fusionar
const CONSOLIDATION_MAP = {
  // Roadmap - consolidar archivos similares
  'roadmap': ['roadmap.md', 'ROADMAP.md', 'docs_legacy/roadmap.md'],
  
  // Navegación - consolidar documentos de estructura de navegación
  'features/navigation': ['NAVIGATION_MASTER.md', 'docs_legacy/ESTRUCTURA_NAVEGACION.md', 'docs_legacy/docs/ESTRUCTURA_NAVEGACION.md', 'docs_legacy/routes.md'],
  
  // Seguridad - consolidar documentos relacionados
  'core/security': ['docs_legacy/security/security_policy.md', 'docs_legacy/security/security_documentation.md'],
  
  // Stack tecnológico - consolidar documentos relacionados
  'core/tech-stack': ['TECHNOLOGY_STACK.md', 'docs_legacy/docs/tech/stack/TECHNOLOGY_STACK.md'],
  
  // Diseño del sistema - consolidar documentos relacionados
  'core/design-system': ['DESIGN_SYSTEM.md', 'docs_legacy/docs/modules/design-system/index.md', 'docs_legacy/docs/modules/design-system/typography.md', 'docs_legacy/docs/modules/design-system/spacing.md', 'docs_legacy/docs/modules/design-system/philosophy.md']
};

// Mensaje de inicio
console.log('🚀 Iniciando consolidación de documentación...');

// Crear nueva estructura de carpetas
function createDirectoryStructure() {
  console.log('\n📁 Creando estructura de carpetas...');
  
  // Asegurar que existe el directorio principal
  if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR, { recursive: true });
  }
  
  // Crear estructura de carpetas
  Object.keys(NEW_STRUCTURE).forEach(mainDir => {
    const mainPath = path.join(DOCS_DIR, mainDir);
    
    if (!fs.existsSync(mainPath)) {
      fs.mkdirSync(mainPath, { recursive: true });
      console.log(`  ✓ Creada carpeta: ${mainDir}`);
    }
    
    NEW_STRUCTURE[mainDir].forEach(subDir => {
      const subPath = path.join(mainPath, subDir);
      if (!fs.existsSync(subPath)) {
        fs.mkdirSync(subPath, { recursive: true });
        console.log(`  ✓ Creada subcarpeta: ${mainDir}/${subDir}`);
      }
    });
  });
}

// Mover y consolidad documentos
function consolidateDocuments() {
  console.log('\n📄 Consolidando documentos...');
  
  // Procesar el mapa de consolidación
  Object.keys(CONSOLIDATION_MAP).forEach(targetPath => {
    const sourceFiles = CONSOLIDATION_MAP[targetPath];
    const fullTargetPath = path.join(DOCS_DIR, `${targetPath}.md`);
    
    console.log(`\n  📑 Consolidando documentos en: ${targetPath}.md`);
    let consolidatedContent = `# ${path.basename(targetPath).toUpperCase()}\n\n`;
    consolidatedContent += `_Este documento es el resultado de la consolidación de múltiples fuentes._\n\n`;
    
    // Asegurar que existe el directorio del archivo destino
    const targetDir = path.dirname(fullTargetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Leer y procesar cada archivo fuente
    sourceFiles.forEach(sourceFile => {
      const fullSourcePath = path.join(DOCS_DIR, sourceFile);
      if (fs.existsSync(fullSourcePath)) {
        console.log(`    ✓ Procesando: ${sourceFile}`);
        const content = fs.readFileSync(fullSourcePath, 'utf8');
        
        // Extraer el contenido sin el título principal (si existe)
        let cleanContent = content;
        if (content.startsWith('# ')) {
          cleanContent = content.split('\n').slice(1).join('\n').trim();
        }
        
        consolidatedContent += `\n## Contenido de ${path.basename(sourceFile)}\n\n${cleanContent}\n\n`;
      } else {
        console.log(`    ⚠️ No encontrado: ${sourceFile}`);
      }
    });
    
    // Agregar pie de documento
    const today = new Date().toISOString().split('T')[0];
    consolidatedContent += `\n---\n\nÚltima actualización: ${today}\n`;
    
    // Escribir el archivo consolidado
    fs.writeFileSync(fullTargetPath, consolidatedContent);
    console.log(`  ✅ Documento consolidado creado: ${targetPath}.md`);
  });
}

// Copiar archivos principales
function copyMainDocuments() {
  console.log('\n📋 Copiando documentos principales...');
  
  // Lista de archivos principales a copiar directamente
  const mainDocs = [
    { source: 'README.md', target: 'README.md' },
    { source: 'ARCHITECTURE.md', target: 'core/architecture/overview.md' },
    { source: 'DATA_MODEL.md', target: 'core/data-model/overview.md' },
    { source: 'REQUIREMENTS.md', target: 'core/requirements.md' },
    { source: 'CONTRIBUTING.md', target: 'guides/developers/contributing.md' },
    { source: 'DEPLOYMENT.md', target: 'guides/developers/deployment.md' }
  ];
  
  mainDocs.forEach(({ source, target }) => {
    const sourcePath = path.join(DOCS_DIR, source);
    const targetPath = path.join(DOCS_DIR, target);
    
    // Asegurar que existe el directorio del archivo destino
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    if (fs.existsSync(sourcePath)) {
      // Copiar contenido
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`  ✓ Copiado: ${source} → ${target}`);
    } else {
      console.log(`  ⚠️ No encontrado: ${source}`);
    }
  });
}

// Copiar documentos de guías de usuario
function copyGuideDocuments() {
  console.log('\n📚 Procesando guías de usuario...');
  
  // Copiar documentos de primeros pasos
  const userGuides = [
    { source: 'docs_legacy/guias/primeros-pasos.md', target: 'guides/users/getting-started.md' },
    { source: 'docs_legacy/student-onboarding.md', target: 'guides/users/onboarding.md' }
  ];
  
  userGuides.forEach(({ source, target }) => {
    const sourcePath = path.join(DOCS_DIR, source);
    const targetPath = path.join(DOCS_DIR, target);
    
    // Asegurar que existe el directorio del archivo destino
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    if (fs.existsSync(sourcePath)) {
      // Copiar contenido
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`  ✓ Copiado: ${source} → ${target}`);
    } else {
      console.log(`  ⚠️ No encontrado: ${source}`);
    }
  });
  
  // Crear índice de guías de usuario
  const userGuidesIndex = `# Guías de Usuario

Esta sección contiene guías paso a paso para usuarios del sistema Nexo Learning.

## Contenido

- [Primeros pasos](./getting-started.md) - Guía básica para nuevos usuarios
- [Proceso de onboarding](./onboarding.md) - Proceso completo de incorporación de estudiantes

## Recursos adicionales

Para información más específica, consulte:
- [Documentación de API](../../api/endpoints/overview.md)
- [Características principales](../../features/courses/overview.md)

---

Última actualización: ${new Date().toISOString().split('T')[0]}
`;

  fs.writeFileSync(path.join(DOCS_DIR, 'guides/users/README.md'), userGuidesIndex);
  console.log('  ✓ Creado índice de guías de usuario');
}

// Limpiar archivos duplicados
function cleanupDuplicates() {
  console.log('\n🧹 Limpiando archivos duplicados...');

  // No eliminar los archivos originales todavía, solo registrar
  // Podemos implementar esta función cuando estemos seguros de que todo está consolidado
  console.log('  ⚠️ Este paso se implementará después de verificar que todo funciona correctamente');
}

// Crear índice principal
function createMainIndex() {
  console.log('\n📑 Creando índice principal...');
  
  const mainIndex = `# Nexo Learning - Documentación Oficial

## Visión General

Nexo Learning es una plataforma educativa SaaS modular diseñada para facilitar la creación, distribución y consumo de contenido educativo en línea.

## Secciones Principales

### Documentación Core
- [Arquitectura](./core/architecture/overview.md)
- [Stack Tecnológico](./core/tech-stack.md)
- [Modelo de Datos](./core/data-model/overview.md)
- [Sistema de Diseño](./core/design-system.md)
- [Seguridad](./core/security.md)

### Guías
- [Guías para Usuarios](./guides/users/README.md)
- [Guías para Administradores](./guides/admin/README.md)
- [Guías para Desarrolladores](./guides/developers/contributing.md)

### API y Referencias
- [Documentación de API](./api/endpoints/overview.md)
- [Esquemas de Datos](./api/schemas/README.md)

### Características
- [Sistema de Cursos](./features/courses/overview.md)
- [Gestión de Usuarios](./features/users/overview.md)
- [Sistema de Navegación](./features/navigation.md)
- [Hoja de Ruta](./features/roadmap.md)

## Herramientas de Documentación

Esta documentación ha sido consolidada y simplificada para facilitar su mantenimiento y consulta.

---

Copyright © 2025 Nexo Learning. Todos los derechos reservados.
`;

  fs.writeFileSync(path.join(DOCS_DIR, 'README.md'), mainIndex);
  console.log('  ✓ Creado índice principal');
}

// Ejecutar todas las funciones
function run() {
  createDirectoryStructure();
  consolidateDocuments();
  copyMainDocuments();
  copyGuideDocuments();
  createMainIndex();
  cleanupDuplicates();
  
  console.log('\n✅ Consolidación completada con éxito!');
  console.log('\n⚠️ Importante: La carpeta docs_legacy no ha sido eliminada automáticamente.');
  console.log('   Revise los documentos consolidados antes de eliminarla manualmente.');
}

// Iniciar el proceso
try {
  run();
} catch (error) {
  console.error('\n❌ Error en la consolidación:', error);
  process.exit(1);
}
