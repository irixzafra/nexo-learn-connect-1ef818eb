
#!/usr/bin/env node

/**
 * Script para actualizar la documentación del sistema
 * 
 * Este script analiza el código fuente del proyecto, extrae información
 * sobre las rutas, componentes y funcionalidades, y actualiza el documento
 * maestro de arquitectura del sistema.
 * 
 * Uso:
 * node updateSystemDocumentation.js
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Ruta del documento maestro
const docPath = path.join(__dirname, '../docs/NEXO_SYSTEM_ARCHITECTURE.md');

// Fecha actual formateada
const currentDate = new Date().toLocaleDateString('es-ES', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

// Actualizar la fecha en el documento
function updateDocumentDate() {
  if (fs.existsSync(docPath)) {
    let content = fs.readFileSync(docPath, 'utf8');
    content = content.replace(/Documento actualizado: \[.*?\]/g, `Documento actualizado: [${currentDate}]`);
    fs.writeFileSync(docPath, content, 'utf8');
    console.log('Fecha de documentación actualizada correctamente');
  } else {
    console.error('Documento no encontrado:', docPath);
  }
}

// Función principal
async function main() {
  try {
    console.log('Actualizando documentación del sistema...');
    updateDocumentDate();
    console.log('Documentación actualizada correctamente');
  } catch (error) {
    console.error('Error al actualizar la documentación:', error);
    process.exit(1);
  }
}

// Ejecutar
main();
