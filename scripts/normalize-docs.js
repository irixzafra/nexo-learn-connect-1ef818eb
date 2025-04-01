
#!/usr/bin/env node

/**
 * Script para normalizar la documentación del proyecto
 * 
 * Este script sirve como punto de entrada y orquestador para 
 * normalizar toda la documentación del proyecto.
 */

const { execSync } = require('child_process');
const path = require('path');

// Ruta a los scripts de utilidad
const docManagerPath = path.join(__dirname, 'docs-manager.js');
const normalizeStructurePath = path.join(__dirname, 'normalize-file-structure.js');

console.log('🔍 Iniciando normalización de documentación...');

try {
  // Paso 1: Normalizar estructura de archivos
  console.log('\n📂 Normalizando estructura de archivos...');
  execSync(`node ${normalizeStructurePath} all`, { stdio: 'inherit' });
  
  // Paso 2: Actualizar fechas en documentos principales
  console.log('\n📅 Actualizando fechas en documentos principales...');
  execSync(`node ${docManagerPath} update-dates`, { stdio: 'inherit' });
  
  // Paso 3: Generar índice de documentación
  console.log('\n📑 Generando índice de documentación...');
  execSync(`node ${docManagerPath} generate-index`, { stdio: 'inherit' });
  
  // Paso 4: Verificar documentos obsoletos
  console.log('\n⏳ Verificando documentos obsoletos...');
  execSync(`node ${docManagerPath} check`, { stdio: 'inherit' });
  
  console.log('\n✅ Normalización de documentación completada con éxito.');
  console.log('\nℹ️ Para mantener la documentación actualizada, ejecute este script regularmente.');
  
} catch (error) {
  console.error('\n❌ Error durante la normalización:', error.message);
  process.exit(1);
}
