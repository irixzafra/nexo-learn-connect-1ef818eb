
#!/usr/bin/env node

/**
 * Script para normalizar la documentación del proyecto
 * 
 * Este script sirve como punto de entrada y orquestador para 
 * normalizar toda la documentación del proyecto según la nueva estructura.
 */

const { execSync } = require('child_process');
const path = require('path');

// Ruta a los scripts de utilidad
const consolidationScriptPath = path.join(__dirname, 'consolidate-docs-actually.js');

console.log('🔍 Iniciando normalización de documentación...');

try {
  // Ejecutar el script de consolidación
  console.log('\n📂 Consolidando documentación...');
  execSync(`node ${consolidationScriptPath}`, { stdio: 'inherit' });
  
  console.log('\n✅ Normalización de documentación completada con éxito.');
  console.log('\nℹ️ Para mantener la documentación actualizada, ejecute este script regularmente.');
  
} catch (error) {
  console.error('\n❌ Error durante la normalización:', error.message);
  process.exit(1);
}
