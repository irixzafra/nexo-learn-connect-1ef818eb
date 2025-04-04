
#!/usr/bin/env node

/**
 * Script para normalizar la documentación del proyecto
 * 
 * Este script ejecuta directamente todas las operaciones necesarias para
 * consolidar y normalizar la documentación sin depender de ejecuciones externas.
 */

const fs = require('fs');
const path = require('path');

// Directorios principales
const DOCS_LEGACY_DIR = path.join(__dirname, '../docs_nexo/docs_legacy');
const DOCS_NEXO_DIR = path.join(__dirname, '../docs_nexo');
const FEATURES_DIR = path.join(DOCS_NEXO_DIR, 'features');

console.log('🔍 Iniciando normalización de documentación...');

// Función para asegurar que un directorio existe
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Creado directorio: ${dirPath}`);
  }
}

// Función para mover archivos conservando su contenido
function moveFile(source, destination) {
  if (fs.existsSync(source)) {
    ensureDirectoryExists(path.dirname(destination));
    fs.copyFileSync(source, destination);
    console.log(`📄 Movido: ${source} -> ${destination}`);
  } else {
    console.log(`⚠️ No se encuentra el archivo: ${source}`);
  }
}

// Función para consolidar la documentación de cursos
function consolidateCoursesDocumentation() {
  console.log('\n📚 Consolidando documentación de cursos...');
  
  // Asegurar que existe el directorio de cursos
  const coursesDir = path.join(FEATURES_DIR, 'courses');
  ensureDirectoryExists(coursesDir);
  
  // Buscar documentación de cursos en legacy y moverla
  const legacyCoursesFiles = [
    { src: path.join(DOCS_LEGACY_DIR, '03_features/courses.md'), 
      dest: path.join(coursesDir, 'legacy-courses.md') },
    { src: path.join(DOCS_LEGACY_DIR, 'lesson-editor-system.md'), 
      dest: path.join(coursesDir, 'lesson-editor.md') }
  ];
  
  legacyCoursesFiles.forEach(file => {
    moveFile(file.src, file.dest);
  });
}

// Función para consolidar la documentación de CI/CD
function consolidateCICD() {
  console.log('\n🔄 Consolidando documentación de CI/CD...');
  
  // Crear directorio para CI/CD
  const cicdDir = path.join(DOCS_NEXO_DIR, 'core/ci_cd');
  ensureDirectoryExists(cicdDir);
  
  // Mover documentación de CI/CD
  moveFile(
    path.join(DOCS_LEGACY_DIR, 'ci_cd/ci_cd_documentation.md'), 
    path.join(cicdDir, 'overview.md')
  );
}

// Función para consolidar la documentación de API
function consolidateAPI() {
  console.log('\n🔌 Consolidando documentación de API...');
  
  // Crear directorio para API
  const apiDir = path.join(DOCS_NEXO_DIR, 'api');
  ensureDirectoryExists(apiDir);
  
  // Asegurar que existe el directorio de endpoints
  const endpointsDir = path.join(apiDir, 'endpoints');
  ensureDirectoryExists(endpointsDir);
  
  // Mover README de API si existe
  moveFile(
    path.join(DOCS_LEGACY_DIR, 'api/README.md'), 
    path.join(apiDir, 'README.md')
  );
}

// Función para consolidar documentación de guías
function consolidateGuides() {
  console.log('\n📘 Consolidando guías...');
  
  // Crear directorio de guías
  const guidesDir = path.join(DOCS_NEXO_DIR, 'guides');
  ensureDirectoryExists(guidesDir);
  
  // Mover guías de usuario
  moveFile(
    path.join(DOCS_LEGACY_DIR, 'guias/primeros-pasos.md'), 
    path.join(guidesDir, 'getting-started.md')
  );
  
  // Mover README de guías
  moveFile(
    path.join(DOCS_LEGACY_DIR, 'guias/README.md'), 
    path.join(guidesDir, 'user-guides-index.md')
  );
}

// Ejecutar todas las funciones de consolidación
try {
  consolidateCoursesDocumentation();
  consolidateCICD();
  consolidateAPI();
  consolidateGuides();
  
  console.log('\n✅ Normalización de documentación completada con éxito.');
  console.log('\nℹ️ Este script ha realizado una consolidación básica. Para una migración completa,');
  console.log('revisa el contenido movido y ajusta según sea necesario.');
  
} catch (error) {
  console.error('\n❌ Error durante la normalización:', error.message);
  process.exit(1);
}

