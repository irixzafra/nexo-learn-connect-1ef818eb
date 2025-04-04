
#!/usr/bin/env node

/**
 * Script para listar todos los archivos .md en el proyecto
 */

const fs = require('fs');
const path = require('path');

// Configuración de rutas
const PROJECT_ROOT = path.join(__dirname, '../..');

// Función para buscar archivos .md recursivamente
function findMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Ignorar node_modules y .git para evitar búsquedas innecesarias
      if (file !== 'node_modules' && file !== '.git') {
        findMarkdownFiles(filePath, fileList);
      }
    } else if (file.endsWith('.md') || file.endsWith('.MD')) {
      // Agregar archivo a la lista con ruta relativa
      const relativePath = path.relative(PROJECT_ROOT, filePath);
      fileList.push(relativePath);
    }
  }
  
  return fileList;
}

// Ejecutar la búsqueda
try {
  console.log('Buscando archivos Markdown (.md) en el proyecto...');
  const markdownFiles = findMarkdownFiles(PROJECT_ROOT);
  
  console.log('\nArchivos Markdown encontrados:');
  console.log('==============================');
  
  // Ordenar alfabéticamente para mejor legibilidad
  markdownFiles.sort().forEach(file => {
    console.log(file);
  });
  
  console.log('\nTotal de archivos encontrados:', markdownFiles.length);
  console.log('Operación completada exitosamente.');
} catch (error) {
  console.error('Error al buscar archivos:', error.message);
}
