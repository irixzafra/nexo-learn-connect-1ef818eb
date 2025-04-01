
#!/usr/bin/env node

/**
 * Script para gestionar la documentación del proyecto
 * 
 * Funcionalidades:
 * - Verificar la actualización de documentos
 * - Listar documentos desactualizados
 * - Generar índice de documentación
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuración
const DOCS_DIR = path.join(__dirname, '../docs');
const CURRENT_DATE = new Date().toISOString().split('T')[0];

// Documentos principales a verificar
const CORE_DOCS = [
  'index.md',
  'arquitectura-del-sistema.md'
];

// Función para generar un índice de la documentación
function generateDocsIndex() {
  const index = { 
    updated: CURRENT_DATE,
    categories: []
  };
  
  function scanDir(dir, category) {
    const files = fs.readdirSync(dir);
    const docs = [];
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      
      if (fs.statSync(fullPath).isDirectory()) {
        const subCategory = {
          name: file,
          path: path.relative(DOCS_DIR, fullPath),
          documents: []
        };
        
        scanDir(fullPath, subCategory);
        
        if (subCategory.documents.length > 0) {
          index.categories.push(subCategory);
        }
      } else if (file.endsWith('.md')) {
        const relativePath = path.relative(DOCS_DIR, fullPath);
        
        // Extraer título del documento
        const content = fs.readFileSync(fullPath, 'utf8');
        const titleMatch = content.match(/^# (.*)/m);
        const title = titleMatch ? titleMatch[1] : file.replace('.md', '');
        
        if (category) {
          category.documents.push({
            title,
            path: relativePath
          });
        } else {
          docs.push({
            title,
            path: relativePath
          });
        }
      }
    }
    
    if (docs.length > 0 && !category) {
      index.categories.push({
        name: 'General',
        path: '.',
        documents: docs
      });
    }
  }
  
  scanDir(DOCS_DIR);
  
  fs.writeFileSync(
    path.join(DOCS_DIR, 'docs-index.json'),
    JSON.stringify(index, null, 2)
  );
  
  console.log('✓ Índice de documentación generado');
}

// Verificar documentos desactualizados (última modificación > 90 días)
function checkOutdatedDocs() {
  const now = new Date();
  const outdatedDocs = [];
  
  function scanDir(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      
      if (fs.statSync(fullPath).isDirectory()) {
        scanDir(fullPath);
        continue;
      }
      
      if (!file.endsWith('.md')) continue;
      
      const stats = fs.statSync(fullPath);
      const lastModified = new Date(stats.mtime);
      const daysSinceModified = Math.floor((now - lastModified) / (1000 * 60 * 60 * 24));
      
      if (daysSinceModified > 90) {
        const relativePath = path.relative(DOCS_DIR, fullPath);
        outdatedDocs.push({ path: relativePath, days: daysSinceModified });
      }
    }
  }
  
  scanDir(DOCS_DIR);
  
  if (outdatedDocs.length > 0) {
    console.log('\nDocumentos desactualizados (última modificación > 90 días):');
    outdatedDocs.forEach(doc => {
      console.log(`- ${doc.path} (${doc.days} días)`);
    });
  } else {
    console.log('\n✓ No hay documentos desactualizados');
  }
}

// Actualizar fecha en documentos
function updateDocsDates() {
  CORE_DOCS.forEach(docPath => {
    const fullPath = path.join(DOCS_DIR, docPath);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(
        /Última actualización: .*$/m,
        `Última actualización: ${CURRENT_DATE}`
      );
      
      fs.writeFileSync(fullPath, content);
      console.log(`✓ Actualizada fecha en: ${docPath}`);
    }
  });
}

// Función principal
function main() {
  const command = process.argv[2] || 'help';
  
  switch (command) {
    case 'check':
      console.log('Verificando documentación...');
      checkOutdatedDocs();
      break;
      
    case 'update-dates':
      console.log('Actualizando fechas en documentos principales...');
      updateDocsDates();
      break;
      
    case 'generate-index':
      console.log('Generando índice de documentación...');
      generateDocsIndex();
      break;
      
    case 'all':
      console.log('Ejecutando todas las funciones de mantenimiento...');
      checkOutdatedDocs();
      updateDocsDates();
      generateDocsIndex();
      break;
      
    case 'help':
    default:
      console.log('Uso: node docs-manager.js [comando]');
      console.log('Comandos:');
      console.log('  check           - Verificar documentos desactualizados');
      console.log('  update-dates    - Actualizar fechas en documentos principales');
      console.log('  generate-index  - Generar índice de documentación');
      console.log('  all             - Ejecutar todas las funciones');
      console.log('  help            - Mostrar esta ayuda');
      break;
  }
}

// Ejecutar
main();
