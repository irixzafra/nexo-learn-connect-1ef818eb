
/**
 * Script para ejecutar la normalización de documentación en GitHub.dev
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Ejecutando script de normalización de documentación...');

try {
  // Hacer ejecutable el script principal si es posible (puede no funcionar en GitHub.dev)
  try {
    execSync('chmod +x scripts/normalize-docs.js');
    console.log('✓ Permisos de ejecución establecidos');
  } catch (e) {
    console.log('ℹ️ No se pudieron establecer permisos de ejecución (normal en GitHub.dev)');
  }
  
  // Ejecutar el script principal usando node
  execSync('node scripts/normalize-docs.js', { stdio: 'inherit' });
  
} catch (error) {
  console.error('❌ Error al ejecutar el script:', error.message);
  process.exit(1);
}
