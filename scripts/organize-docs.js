
#!/usr/bin/env node

/**
 * Script para organizar la documentación
 * 
 * Este script:
 * 1. Crea las carpetas de documentación si no existen
 * 2. Mueve documentos obsoletos a la carpeta legacy
 * 3. Genera un informe de documentación
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Rutas principales
const docsRoot = path.resolve(__dirname, '../docs');
const legacyFolder = path.join(docsRoot, 'legacy');

// Lista de carpetas a crear
const foldersToCreate = [
  'admin',
  'architecture',
  'features',
  'guides',
  'api',
  'legacy'
];

// Lista de documentos que deben ser movidos a legacy
const legacyDocs = [
  // Añadir aquí documentos obsoletos
];

// Función para crear carpetas
function createFolders() {
  console.log('Creando estructura de carpetas...');
  
  foldersToCreate.forEach(folder => {
    const folderPath = path.join(docsRoot, folder);
    
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`  ✓ Creada carpeta: ${folder}`);
    } else {
      console.log(`  • Ya existe carpeta: ${folder}`);
    }
  });
}

// Función para mover documentos obsoletos
function moveLegacyDocs() {
  console.log('\nMoviendo documentos obsoletos...');
  
  if (legacyDocs.length === 0) {
    console.log('  • No hay documentos marcados como obsoletos');
    return;
  }
  
  legacyDocs.forEach(doc => {
    const sourcePath = path.join(docsRoot, doc);
    const destPath = path.join(legacyFolder, path.basename(doc));
    
    if (fs.existsSync(sourcePath)) {
      fs.renameSync(sourcePath, destPath);
      console.log(`  ✓ Movido a legacy: ${doc}`);
    } else {
      console.log(`  ✗ No encontrado: ${doc}`);
    }
  });
}

// Función para generar informe
function generateReport() {
  console.log('\nGenerando informe de documentación...');
  
  const allDocs = [];
  
  function scanDir(dir, basePath = '') {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const relativePath = path.join(basePath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        scanDir(filePath, relativePath);
      } else if (file.endsWith('.md')) {
        allDocs.push({
          path: relativePath,
          size: stats.size,
          modified: stats.mtime
        });
      }
    });
  }
  
  scanDir(docsRoot);
  
  const reportPath = path.join(docsRoot, 'documentation-report.json');
  fs.writeFileSync(
    reportPath, 
    JSON.stringify({
      generatedAt: new Date().toISOString(),
      totalDocuments: allDocs.length,
      documents: allDocs
    }, null, 2)
  );
  
  console.log(`  ✓ Informe generado: ${path.relative(process.cwd(), reportPath)}`);
  console.log(`  • Total documentos: ${allDocs.length}`);
}

// Función principal
function main() {
  console.log('=== Organizador de Documentación ===\n');
  
  // Verificar que estamos en la raíz del proyecto
  if (!fs.existsSync(path.join(process.cwd(), 'package.json'))) {
    console.error('Error: Este script debe ejecutarse desde la raíz del proyecto.');
    process.exit(1);
  }
  
  // Crear la estructura de carpetas
  createFolders();
  
  // Mover documentos obsoletos
  moveLegacyDocs();
  
  // Generar informe
  generateReport();
  
  console.log('\n=== Documentación organizada correctamente ===');
}

// Ejecutar
main();
