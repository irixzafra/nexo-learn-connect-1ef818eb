
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
const LEGACY_DIR = path.join(DOCS_DIR, 'legacy');
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
    path.join(DOCS_DIR, 'admin'),
    LEGACY_DIR
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
      content: `# Guías de usuario\n\nEsta sección contiene guías paso a paso para usuarios del sistema.\n\n## Contenido\n\n1. [Primeros pasos](./primeros-pasos.md)\n2. [Navegación del sistema](./navegacion.md)\n3. [Gestión de cursos](./cursos.md)\n\n## Para desarrolladores\n\nSi estás contribuyendo a este proyecto, por favor consulta la [guía de desarrollo](./desarrollo.md).\n`
    },
    { 
      path: path.join(DOCS_DIR, 'api', 'README.md'),
      content: `# Documentación de API\n\nEsta sección contiene la documentación técnica de las APIs del sistema.\n\n## Endpoints principales\n\n- Autenticación\n- Usuarios\n- Cursos\n- Contenido\n\n## Autenticación\n\nTodas las APIs requieren autenticación mediante token JWT.\n\n## Formatos de respuesta\n\nLas APIs responden en formato JSON con la siguiente estructura:\n\n\`\`\`json\n{\n  "success": true|false,\n  "data": { ... },\n  "error": { "code": "ERROR_CODE", "message": "Descripción del error" }\n}\n\`\`\`\n`
    },
    { 
      path: path.join(DOCS_DIR, 'admin', 'README.md'),
      content: `# Documentación para administradores\n\nEsta sección contiene guías y referencias para administradores del sistema.\n\n## Panel de administración\n\nEl panel de administración proporciona herramientas para:\n\n- Gestión de usuarios\n- Configuración del sistema\n- Gestión de contenido\n- Monitorización y analíticas\n\n## Seguridad\n\nPor favor, consulta la [guía de seguridad](./seguridad.md) para conocer las mejores prácticas.\n`
    },
    { 
      path: path.join(LEGACY_DIR, 'README.md'),
      content: `# Documentación Legada\n\nEsta carpeta contiene documentación obsoleta o histórica que se mantiene por referencia.\n\n> **Nota:** Esta documentación puede contener información desactualizada y no debe utilizarse como fuente principal.\n\n## Contenido\n\nLa documentación aquí archivada incluye:\n\n- Estructuras de documentación anteriores\n- Documentación técnica histórica\n- Archivos de documentación reemplazados por versiones más recientes\n`
    }
  ];
  
  sections.forEach(section => {
    fs.writeFileSync(section.path, section.content);
    console.log(`✓ Creado archivo: ${path.relative(DOCS_DIR, section.path)}`);
  });
}

// Función para mover documentos obsoletos a la carpeta legacy
function moveObsoleteDocuments() {
  // Lista de directorios a verificar
  const dirsToCheck = [
    DOCS_DIR,
    path.join(DOCS_DIR, 'guias'),
    path.join(DOCS_DIR, 'api'),
    path.join(DOCS_DIR, 'admin')
  ];
  
  // Patrones de archivos considerados obsoletos
  const obsoletePatterns = [
    /^0[0-9]_/,             // Archivos con prefijos numéricos
    /\.MD$/,                // Archivos .MD en mayúsculas
    /^ESTRUCTURA_/,         // Archivos antiguos de estructura
    /\.(backup|bak|old)$/,  // Archivos de respaldo
    /^draft-/,              // Borradores
    /-deprecated$/          // Marcados como deprecados
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
      dest: path.join(DOCS_DIR, 'guias', 'caracteristicas.md'),
      isFeature: true
    },
    { 
      source: path.join(DOCS_NEXO_DIR, 'ARCHITECTURE.md'), 
      dest: path.join(DOCS_DIR, 'api', 'arquitectura.md'),
      isFeature: false
    }
  ];
  
  // Migrar archivos clave
  keyFiles.forEach(file => {
    if (fs.existsSync(file.source)) {
      ensureDirectoryExists(path.dirname(file.dest));
      fs.copyFileSync(file.source, file.dest);
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

// Función principal para consolidar y simplificar
function simplifyDocs() {
  console.log('🔄 Iniciando simplificación de documentación...');
  
  // 1. Crear documentación minimalista
  createMinimalDocStructure();
  
  // 2. Mover documentos obsoletos a legacy
  moveObsoleteDocuments();
  
  // 3. Migrar docs_nexo
  migrateDocsNexo();

  console.log('✅ Documentación simplificada correctamente.');
  console.log(`ℹ️ Documentación obsoleta archivada en: docs/legacy`);
}

// Ejecutar si se llama directamente
if (require.main === module) {
  simplifyDocs();
}

module.exports = { simplifyDocs };
