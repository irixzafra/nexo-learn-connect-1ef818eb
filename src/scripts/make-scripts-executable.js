
#!/usr/bin/env node

/**
 * Script para hacer ejecutables todos los scripts del proyecto
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Ruta de scripts
const SCRIPTS_DIR = path.join(__dirname);

// Hacer ejecutable un archivo
function makeExecutable(filePath) {
  try {
    // Para sistemas tipo Unix
    if (process.platform !== 'win32') {
      execSync(`chmod +x "${filePath}"`);
      console.log(`✓ Script ejecutable: ${path.basename(filePath)}`);
    } else {
      // En Windows no se necesita chmod
      console.log(`ℹ️ En Windows no se requiere chmod: ${path.basename(filePath)}`);
    }
  } catch (error) {
    console.error(`❌ Error al hacer ejecutable ${path.basename(filePath)}: ${error.message}`);
  }
}

// Buscar y hacer ejecutables todos los scripts .js
function makeAllScriptsExecutable() {
  console.log('🔧 Haciendo ejecutables los scripts...');
  
  const files = fs.readdirSync(SCRIPTS_DIR);
  
  for (const file of files) {
    const filePath = path.join(SCRIPTS_DIR, file);
    
    // Saltarse directorios y archivos que no son .js
    if (fs.statSync(filePath).isDirectory() || !file.endsWith('.js')) {
      continue;
    }
    
    // Verificar si es un script con shebang
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.trim().startsWith('#!/usr/bin/env node')) {
      makeExecutable(filePath);
    }
  }
  
  console.log('✅ Proceso completado.');
}

// Ejecutar
if (require.main === module) {
  makeAllScriptsExecutable();
}
