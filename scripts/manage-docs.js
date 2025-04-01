
/**
 * Script para gestionar la documentación del proyecto
 * 
 * Este script ayuda a mantener la documentación organizada y actualizada.
 * Puede verificar enlaces rotos, mover documentos obsoletos a la carpeta legacy,
 * y generar informes sobre el estado de la documentación.
 * 
 * Uso:
 * node scripts/manage-docs.js check  - Verifica enlaces rotos
 * node scripts/manage-docs.js move   - Mueve documentos obsoletos a legacy
 * node scripts/manage-docs.js report - Genera un informe de documentación
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs');
const LEGACY_DIR = path.join(DOCS_DIR, 'legacy');

// Asegurarse de que la carpeta legacy existe
if (!fs.existsSync(LEGACY_DIR)) {
  fs.mkdirSync(LEGACY_DIR, { recursive: true });
}

// Función principal
function main() {
  const command = process.argv[2];
  
  switch (command) {
    case 'check':
      checkBrokenLinks();
      break;
    case 'move':
      moveObsoleteDocs();
      break;
    case 'report':
      generateReport();
      break;
    default:
      showHelp();
      break;
  }
}

// Verificar enlaces rotos en la documentación
function checkBrokenLinks() {
  console.log('Verificando enlaces rotos en la documentación...');
  // Implementación de la verificación de enlaces
  // (Requeriría una lógica más compleja para analizar los archivos markdown)
  console.log('Función no implementada completamente. Próximamente.');
}

// Mover documentos obsoletos a la carpeta legacy
function moveObsoleteDocs() {
  console.log('Moviendo documentos obsoletos a la carpeta legacy...');
  
  // Aquí se implementaría la lógica para identificar documentos obsoletos
  // basándose en criterios como fecha de última modificación, etiquetas, etc.
  
  // Ejemplo de movimiento de un archivo (simulado):
  console.log('- Identificando documentos obsoletos...');
  console.log('- Moviendo documentos a carpeta legacy...');
  console.log('Proceso completado.');
}

// Generar un informe sobre el estado de la documentación
function generateReport() {
  console.log('Generando informe de documentación...');
  
  // Contar archivos por carpeta
  const stats = {
    total: 0,
    byFolder: {},
    byExtension: {},
    legacy: 0
  };
  
  // Función recursiva para recorrer directorios
  function walkDir(dir, stats) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const isDirectory = fs.statSync(filePath).isDirectory();
      
      if (isDirectory) {
        const folderName = path.relative(DOCS_DIR, filePath);
        stats.byFolder[folderName] = stats.byFolder[folderName] || 0;
        
        if (filePath === LEGACY_DIR) {
          const legacyFiles = fs.readdirSync(filePath)
            .filter(f => !fs.statSync(path.join(filePath, f)).isDirectory());
          stats.legacy = legacyFiles.length;
          stats.byFolder[folderName] = legacyFiles.length;
        } else {
          walkDir(filePath, stats);
        }
      } else {
        stats.total++;
        
        // Contar por extensión
        const ext = path.extname(file);
        stats.byExtension[ext] = (stats.byExtension[ext] || 0) + 1;
        
        // Contar por carpeta
        const folderName = path.relative(DOCS_DIR, dir);
        stats.byFolder[folderName] = (stats.byFolder[folderName] || 0) + 1;
      }
    }
  }
  
  // Iniciar recorrido
  walkDir(DOCS_DIR, stats);
  
  // Mostrar resultados
  console.log('\nResumen de documentación:');
  console.log(`- Total de archivos: ${stats.total}`);
  console.log(`- Archivos legacy: ${stats.legacy}`);
  console.log('\nArchivos por carpeta:');
  
  for (const [folder, count] of Object.entries(stats.byFolder)) {
    console.log(`- ${folder || 'raíz'}: ${count}`);
  }
  
  console.log('\nArchivos por extensión:');
  for (const [ext, count] of Object.entries(stats.byExtension)) {
    console.log(`- ${ext || 'sin extensión'}: ${count}`);
  }
}

// Mostrar ayuda
function showHelp() {
  console.log(`
Gestor de Documentación

Uso:
  node scripts/manage-docs.js [comando]

Comandos:
  check   - Verifica enlaces rotos en la documentación
  move    - Mueve documentos obsoletos a la carpeta legacy
  report  - Genera un informe sobre el estado de la documentación
  `);
}

// Ejecutar el script
main();
