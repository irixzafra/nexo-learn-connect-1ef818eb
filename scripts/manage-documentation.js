
#!/usr/bin/env node

/**
 * Script para gestionar documentación del proyecto
 * 
 * Propósito:
 * - Verificar documentación desactualizada
 * - Mover documentos obsoletos a la carpeta legacy
 * - Generar informes de estado de documentación
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuración
const DOCS_DIR = path.join(__dirname, '../docs');
const LEGACY_DIR = path.join(DOCS_DIR, 'legacy');
const ADMIN_DIR = path.join(DOCS_DIR, 'admin');

// Asegurar que las carpetas existan
ensureDirectoryExists(DOCS_DIR);
ensureDirectoryExists(LEGACY_DIR);
ensureDirectoryExists(ADMIN_DIR);

// Documentos por categoría
const CURRENT_DOCS = [
  'ESTRUCTURA_NAVEGACION.md',
  'admin/ADMINISTRACION.md'
];

const LEGACY_DOCS = [
  'legacy/NAVEGACION_ANTIGUA.md',
  'legacy/README.md'
];

// Funciones auxiliares
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Directorio creado: ${dir}`);
  }
}

function moveToLegacy(file) {
  const baseName = path.basename(file);
  const source = path.join(DOCS_DIR, file);
  const destination = path.join(LEGACY_DIR, baseName);
  
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, destination);
    fs.unlinkSync(source);
    console.log(`Movido a legacy: ${file}`);
    
    // Añadir advertencia al inicio del archivo
    const content = fs.readFileSync(destination, 'utf8');
    const warning = `> **IMPORTANTE**: Esta documentación está obsoleta y se mantiene solo como referencia histórica. No utilizar para desarrollos actuales.\n\n`;
    fs.writeFileSync(destination, warning + content);
  }
}

function checkDocumentation() {
  console.log('Verificando documentación...');
  
  // Verificar documentos actuales
  let missingCount = 0;
  for (const doc of CURRENT_DOCS) {
    const fullPath = path.join(DOCS_DIR, doc);
    if (!fs.existsSync(fullPath)) {
      console.log(`❌ Documento faltante: ${doc}`);
      missingCount++;
    } else {
      const stats = fs.statSync(fullPath);
      const lastModified = new Date(stats.mtime);
      const daysOld = Math.floor((Date.now() - lastModified) / (1000 * 60 * 60 * 24));
      
      if (daysOld > 60) {
        console.log(`⚠️ Documento posiblemente desactualizado (${daysOld} días): ${doc}`);
      } else {
        console.log(`✅ Documento actualizado: ${doc}`);
      }
    }
  }
  
  // Verificar documentos legacy
  for (const doc of LEGACY_DOCS) {
    const fullPath = path.join(DOCS_DIR, doc);
    if (!fs.existsSync(fullPath)) {
      console.log(`ℹ️ Documento legacy faltante: ${doc}`);
    } else {
      console.log(`📁 Documento legacy presente: ${doc}`);
    }
  }
  
  return missingCount === 0;
}

// Función principal
function main() {
  const command = process.argv[2] || 'check';
  
  switch (command) {
    case 'check':
      const docsOk = checkDocumentation();
      process.exit(docsOk ? 0 : 1);
      break;
      
    case 'archive':
      const fileToArchive = process.argv[3];
      if (!fileToArchive) {
        console.error('Especifica un archivo para archivar');
        process.exit(1);
      }
      moveToLegacy(fileToArchive);
      break;
      
    case 'list':
      console.log('Documentos actuales:');
      CURRENT_DOCS.forEach(doc => console.log(`- ${doc}`));
      console.log('\nDocumentos legacy:');
      LEGACY_DOCS.forEach(doc => console.log(`- ${doc}`));
      break;
      
    default:
      console.log('Comandos disponibles:');
      console.log('- check: Verificar estado de documentación');
      console.log('- archive [file]: Mover un documento a legacy');
      console.log('- list: Listar todos los documentos registrados');
      break;
  }
}

// Ejecutar
main();
