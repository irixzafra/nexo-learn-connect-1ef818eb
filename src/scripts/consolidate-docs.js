
#!/usr/bin/env node

/**
 * Script para consolidar y simplificar la documentación
 */

const fs = require('fs');
const path = require('path');

// Configuración de rutas
const PROJECT_ROOT = path.join(__dirname, '../..');
const DOCS_NEXO_DIR = path.join(PROJECT_ROOT, 'docs_nexo');
const DOCS_DIR = path.join(PROJECT_ROOT, 'docs');
const TEMP_DIR = path.join(PROJECT_ROOT, 'docs_temp');

// Función para asegurar que existe un directorio
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Creado directorio: ${path.relative(PROJECT_ROOT, dir)}`);
  }
}

// Función para crear una estructura minimalista de documentación
function createMinimalDocStructure() {
  // Crear estructura básica
  const mainDirs = [
    DOCS_DIR,
    path.join(DOCS_DIR, 'guias'),
    path.join(DOCS_DIR, 'api'),
    path.join(DOCS_DIR, 'admin')
  ];
  
  // Asegurar que existan los directorios básicos
  mainDirs.forEach(dir => ensureDirectoryExists(dir));
  
  // Crear/Actualizar archivos esenciales
  const indexContent = `# Documentación Nexo Learning

## Secciones principales

- [Guías de usuario](./guias/README.md)
- [Documentación de API](./api/README.md)
- [Documentación para administradores](./admin/README.md)

## Acerca de esta documentación

Esta documentación ha sido simplificada para facilitar su mantenimiento y consulta.

---

Última actualización: ${new Date().toISOString().split('T')[0]}
`;

  fs.writeFileSync(path.join(DOCS_DIR, 'README.md'), indexContent);
  console.log(`✓ Creado archivo principal: README.md`);
  
  // Crear archivos README básicos para cada sección
  const sections = [
    { 
      path: path.join(DOCS_DIR, 'guias', 'README.md'),
      content: `# Guías de usuario\n\nEsta sección contiene guías paso a paso para usuarios del sistema.\n`
    },
    { 
      path: path.join(DOCS_DIR, 'api', 'README.md'),
      content: `# Documentación de API\n\nEsta sección contiene la documentación técnica de las APIs del sistema.\n`
    },
    { 
      path: path.join(DOCS_DIR, 'admin', 'README.md'),
      content: `# Documentación para administradores\n\nEsta sección contiene guías y referencias para administradores del sistema.\n`
    }
  ];
  
  sections.forEach(section => {
    fs.writeFileSync(section.path, section.content);
    console.log(`✓ Creado archivo: ${path.relative(DOCS_DIR, section.path)}`);
  });
}

// Función para eliminar documentos redundantes
function removeRedundantDocs() {
  // Lista de archivos y carpetas a limpiar (patrones)
  const patternsToClean = [
    /^0[0-9]_/,        // Archivos con prefijos numéricos
    /\.MD$/,           // Archivos .MD en mayúsculas
    /^ESTRUCTURA_/,    // Archivos antiguos de estructura
    /\.(backup|bak|old)$/  // Archivos de respaldo
  ];

  function cleanDir(dir) {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      
      // Si es un directorio, procesar recursivamente
      if (fs.statSync(fullPath).isDirectory()) {
        cleanDir(fullPath);
        continue;
      }
      
      // Verificar si el archivo coincide con algún patrón para eliminar
      const shouldRemove = patternsToClean.some(pattern => pattern.test(item));
      
      if (shouldRemove) {
        fs.unlinkSync(fullPath);
        console.log(`✓ Eliminado archivo redundante: ${path.relative(DOCS_DIR, fullPath)}`);
      }
    }
  }
  
  cleanDir(DOCS_DIR);
}

// Función principal para consolidar y simplificar
function simplifyDocs() {
  console.log('🔄 Iniciando simplificación de documentación...');
  
  // 1. Crear documentación minimalista
  createMinimalDocStructure();
  
  // 2. Eliminar documentos redundantes
  removeRedundantDocs();
  
  // 3. Consolidar docs_nexo si existe
  if (fs.existsSync(DOCS_NEXO_DIR)) {
    console.log('🔄 Consolidando docs_nexo...');
    
    // Guardar archivos importantes de docs_nexo
    const docsToKeep = [
      { src: path.join(DOCS_NEXO_DIR, 'features/README.md'), dest: path.join(DOCS_DIR, 'guias', 'caracteristicas.md') },
      { src: path.join(DOCS_NEXO_DIR, 'ARCHITECTURE.md'), dest: path.join(DOCS_DIR, 'api', 'arquitectura.md') }
    ];
    
    docsToKeep.forEach(doc => {
      if (fs.existsSync(doc.src)) {
        ensureDirectoryExists(path.dirname(doc.dest));
        fs.copyFileSync(doc.src, doc.dest);
        console.log(`✓ Guardado documento importante: ${path.relative(PROJECT_ROOT, doc.dest)}`);
      }
    });
    
    // Eliminar docs_nexo
    fs.rmSync(DOCS_NEXO_DIR, { recursive: true, force: true });
    console.log(`✓ Eliminado directorio: docs_nexo`);
  }

  console.log('✅ Documentación simplificada correctamente.');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  simplifyDocs();
}

module.exports = { simplifyDocs };
