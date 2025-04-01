
#!/usr/bin/env node

/**
 * Script para gestionar la documentación del proyecto
 * 
 * Funcionalidades:
 * - Verificar la actualización de documentos
 * - Listar documentos desactualizados
 * - Crear estructura de documentación inicial
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
  'ESTRUCTURA_NAVEGACION.md',
  'admin/ADMINISTRACION.md'
];

// Asegurar que existan las carpetas principales
function ensureDirectories() {
  const directories = [
    DOCS_DIR,
    path.join(DOCS_DIR, 'admin'),
    path.join(DOCS_DIR, 'architecture'),
    path.join(DOCS_DIR, 'components'),
    path.join(DOCS_DIR, 'guides')
  ];
  
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Creado directorio: ${dir}`);
    }
  });
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
    console.log('\nNo hay documentos desactualizados.');
  }
}

// Verificar documentos principales
function checkCoreDocs() {
  console.log('\nVerificando documentos principales:');
  
  let allPresent = true;
  
  CORE_DOCS.forEach(docPath => {
    const fullPath = path.join(DOCS_DIR, docPath);
    
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      const lastModified = new Date(stats.mtime).toISOString().split('T')[0];
      console.log(`✓ ${docPath} (Última modificación: ${lastModified})`);
    } else {
      console.log(`✗ ${docPath} (No encontrado)`);
      allPresent = false;
    }
  });
  
  return allPresent;
}

// Actualizar fecha en un documento
function updateDocDate(docPath) {
  if (!fs.existsSync(docPath)) {
    console.log(`No se encuentra el documento: ${docPath}`);
    return;
  }
  
  let content = fs.readFileSync(docPath, 'utf8');
  content = content.replace(
    /Última actualización: .*$/m,
    `Última actualización: ${CURRENT_DATE}`
  );
  
  fs.writeFileSync(docPath, content);
  console.log(`Actualizada fecha en: ${path.relative(DOCS_DIR, docPath)}`);
}

// Crear un índice de la documentación
function createDocsIndex() {
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
  
  console.log('\nCreado índice de documentación.');
}

// Función principal
function main() {
  const command = process.argv[2] || 'check';
  
  ensureDirectories();
  
  switch (command) {
    case 'check':
      checkCoreDocs();
      checkOutdatedDocs();
      break;
      
    case 'update-dates':
      CORE_DOCS.forEach(doc => {
        updateDocDate(path.join(DOCS_DIR, doc));
      });
      break;
      
    case 'index':
      createDocsIndex();
      break;
      
    case 'create-template':
      const template = process.argv[3];
      const templatePath = path.join(DOCS_DIR, 'templates', `${template}.md`);
      
      if (fs.existsSync(templatePath)) {
        const destPath = process.argv[4];
        
        if (!destPath) {
          console.error('Especifique una ruta de destino');
          process.exit(1);
        }
        
        const fullDestPath = path.join(DOCS_DIR, destPath);
        const content = fs.readFileSync(templatePath, 'utf8')
          .replace('{{date}}', CURRENT_DATE);
        
        fs.writeFileSync(fullDestPath, content);
        console.log(`Creado documento desde plantilla: ${destPath}`);
      } else {
        console.log('Plantillas disponibles:');
        const templates = fs.readdirSync(path.join(DOCS_DIR, 'templates'))
          .filter(f => f.endsWith('.md'))
          .map(f => f.replace('.md', ''));
        
        templates.forEach(t => console.log(`- ${t}`));
      }
      break;
      
    default:
      console.log('Uso: node manage-documentation.js [comando]');
      console.log('Comandos:');
      console.log('  check            - Verificar estado de la documentación');
      console.log('  update-dates     - Actualizar fechas en documentos principales');
      console.log('  index            - Crear índice de documentación');
      console.log('  create-template  - Crear documento desde plantilla');
      break;
  }
}

// Ejecutar
main();
