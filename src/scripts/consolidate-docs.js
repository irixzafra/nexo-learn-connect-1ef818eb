
#!/usr/bin/env node

/**
 * Script para consolidar la documentación entre docs_nexo y docs
 * 
 * Este script mueve el contenido único de docs_nexo a docs y elimina docs_nexo
 * para tener una única fuente de verdad en la documentación.
 */

const fs = require('fs');
const path = require('path');

// Configuración de rutas
const PROJECT_ROOT = path.join(__dirname, '../..');
const DOCS_NEXO_DIR = path.join(PROJECT_ROOT, 'docs_nexo');
const DOCS_DIR = path.join(PROJECT_ROOT, 'docs');

// Función para asegurar que existe un directorio
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Creado directorio: ${path.relative(PROJECT_ROOT, dir)}`);
  }
}

// Función para copiar un archivo
function copyFile(source, destination) {
  ensureDirectoryExists(path.dirname(destination));
  fs.copyFileSync(source, destination);
  console.log(`✓ Copiado: ${path.relative(PROJECT_ROOT, source)} → ${path.relative(PROJECT_ROOT, destination)}`);
}

// Función para verificar si un archivo en docs_nexo ya existe en docs
function fileExistsInDocs(sourceFile, relativePath) {
  const destFile = path.join(DOCS_DIR, relativePath);
  return fs.existsSync(destFile);
}

// Función para determinar qué archivo es más reciente
function isMoreRecent(file1, file2) {
  const stats1 = fs.statSync(file1);
  const stats2 = fs.statSync(file2);
  return stats1.mtime > stats2.mtime;
}

// Función para procesar un directorio y copiar archivos
function processDirectory(sourceDir, targetDir, relativePath = '') {
  // Asegurar que el directorio de destino existe
  ensureDirectoryExists(targetDir);
  
  // Leer archivos y directorios
  const items = fs.readdirSync(sourceDir);
  
  // Procesar cada elemento
  for (const item of items) {
    const sourcePath = path.join(sourceDir, item);
    const relPath = path.join(relativePath, item);
    const targetPath = path.join(targetDir, item);
    
    // Si es un directorio, procesarlo recursivamente
    if (fs.statSync(sourcePath).isDirectory()) {
      processDirectory(sourcePath, targetPath, relPath);
      continue;
    }
    
    // Si es un archivo, verificar si ya existe en docs
    const exists = fileExistsInDocs(sourcePath, relPath);
    
    if (!exists) {
      // Si no existe, copiarlo
      copyFile(sourcePath, targetPath);
    } else {
      // Si existe, comparar fechas y quedarse con el más reciente
      const existingFile = path.join(DOCS_DIR, relPath);
      if (isMoreRecent(sourcePath, existingFile)) {
        console.log(`✓ Actualizando archivo más reciente: ${relPath}`);
        copyFile(sourcePath, targetPath);
      } else {
        console.log(`ℹ️ Manteniendo archivo existente: ${relPath}`);
      }
    }
  }
}

// Función principal
function consolidateDocs() {
  console.log('🔄 Iniciando consolidación de documentación...');
  
  // Verificar que existen ambos directorios
  if (!fs.existsSync(DOCS_NEXO_DIR)) {
    console.error('❌ El directorio docs_nexo no existe.');
    process.exit(1);
  }
  
  if (!fs.existsSync(DOCS_DIR)) {
    console.error('❌ El directorio docs no existe.');
    process.exit(1);
  }
  
  // Procesar documentación
  processDirectory(DOCS_NEXO_DIR, DOCS_DIR);
  
  // Eliminar docs_nexo después de la consolidación
  try {
    fs.rmSync(DOCS_NEXO_DIR, { recursive: true, force: true });
    console.log(`✓ Eliminado directorio: docs_nexo`);
  } catch (error) {
    console.error(`❌ Error al eliminar docs_nexo: ${error.message}`);
  }
  
  console.log('✅ Consolidación completada. Toda la documentación se encuentra ahora en /docs');
  console.log('ℹ️ Recuerde actualizar cualquier referencia a docs_nexo en su código.');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  consolidateDocs();
}

module.exports = { consolidateDocs };
