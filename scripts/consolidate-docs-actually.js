
#!/usr/bin/env node

/**
 * Script para consolidar toda la documentación Markdown del proyecto
 * desde 'docs/' y 'src/docs/' hacia 'docs_nexo/'
 */

const fs = require('fs');
const path = require('path');

// Configuración de rutas
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(PROJECT_ROOT, 'docs');
const SRC_DOCS_DIR = path.join(PROJECT_ROOT, 'src', 'docs');
const DOCS_NEXO_DIR = path.join(PROJECT_ROOT, 'docs_nexo');

// Registro de operaciones
const movedFiles = [];
const renamedFiles = [];
const createdDirs = [];

// Crear la estructura de directorios necesaria
function createDirectoryStructure() {
  console.log('Creando estructura de directorios en docs_nexo/...');
  
  const directories = [
    DOCS_NEXO_DIR,
    path.join(DOCS_NEXO_DIR, 'features'),
    path.join(DOCS_NEXO_DIR, 'features', 'admin'),
    path.join(DOCS_NEXO_DIR, 'features', 'authentication'),
    path.join(DOCS_NEXO_DIR, 'features', 'community'),
    path.join(DOCS_NEXO_DIR, 'features', 'courses'),
    path.join(DOCS_NEXO_DIR, 'features', 'instructor'),
    path.join(DOCS_NEXO_DIR, 'features', 'payments'),
    path.join(DOCS_NEXO_DIR, 'features', 'profiles'),
    path.join(DOCS_NEXO_DIR, 'guides')
  ];
  
  for (const dir of directories) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      createdDirs.push(dir);
    }
  }
}

// Determinar la ruta de destino para un archivo
function determineDestinationPath(filePath) {
  const relativePath = path.relative(PROJECT_ROOT, filePath);
  let destinationPath;
  
  // Determinar si viene de docs/ o src/docs/
  if (relativePath.startsWith('docs/')) {
    // Para archivos en la raíz de docs/
    if (relativePath.split('/').length === 2) {
      // Ej: docs/ARCHITECTURE.md -> docs_nexo/01_ARCHITECTURE.md
      const fileName = path.basename(relativePath);
      destinationPath = path.join(DOCS_NEXO_DIR, `01_${fileName}`);
    } 
    // Para archivos en docs/guides/
    else if (relativePath.startsWith('docs/guides/')) {
      // Ej: docs/guides/development_workflow.md -> docs_nexo/guides/02_development_workflow.md
      const guidePath = relativePath.replace('docs/guides/', '');
      const fileName = path.basename(guidePath);
      destinationPath = path.join(DOCS_NEXO_DIR, 'guides', `02_${fileName}`);
    }
    // Para archivos en docs/admin/
    else if (relativePath.startsWith('docs/admin/')) {
      // Ej: docs/admin/README.md -> docs_nexo/features/admin/README.md
      const adminPath = relativePath.replace('docs/admin/', '');
      destinationPath = path.join(DOCS_NEXO_DIR, 'features', 'admin', adminPath);
    }
    // Para otros subdirectorios en docs/
    else {
      // Mover manteniendo la estructura
      const subPath = relativePath.replace('docs/', '');
      destinationPath = path.join(DOCS_NEXO_DIR, subPath);
    }
  } 
  // Para archivos en src/docs/
  else if (relativePath.startsWith('src/docs/')) {
    // Para archivos en la raíz de src/docs/
    if (relativePath.split('/').length === 3) {
      // Ej: src/docs/index.md -> docs_nexo/03_index.md
      const fileName = path.basename(relativePath);
      destinationPath = path.join(DOCS_NEXO_DIR, `03_${fileName}`);
    }
    // Para archivos en src/docs/features/
    else if (relativePath.startsWith('src/docs/features/')) {
      // Preservar la estructura dentro de features
      const featuresPath = relativePath.replace('src/docs/features/', '');
      destinationPath = path.join(DOCS_NEXO_DIR, 'features', featuresPath);
    }
    // Para archivos en src/docs/modules/
    else if (relativePath.startsWith('src/docs/modules/')) {
      // Mover a una carpeta específica dentro de features
      const modulesPath = relativePath.replace('src/docs/modules/', '');
      destinationPath = path.join(DOCS_NEXO_DIR, 'features', 'modules', modulesPath);
    }
    // Para otros subdirectorios en src/docs/
    else {
      // Mover manteniendo la estructura
      const subPath = relativePath.replace('src/docs/', '');
      destinationPath = path.join(DOCS_NEXO_DIR, subPath);
    }
  }
  
  return destinationPath;
}

// Procesar un archivo Markdown
function processMarkdownFile(filePath) {
  // Ignorar archivos que no son .md
  if (!filePath.toLowerCase().endsWith('.md')) {
    return;
  }
  
  const destinationPath = determineDestinationPath(filePath);
  
  // Asegurar que exista el directorio de destino
  const destDir = path.dirname(destinationPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    createdDirs.push(destDir);
  }
  
  // Verificar si el archivo de destino ya existe
  if (fs.existsSync(destinationPath)) {
    // Crear un nombre alternativo con sufijo para el archivo duplicado
    const originalName = path.basename(filePath, '.md');
    const extension = path.extname(filePath);
    
    // Determinar el sufijo apropiado (docs o srcdocs)
    let sourceSuffix = '';
    if (filePath.includes('src/docs/')) {
      sourceSuffix = 'srcdocs';
    } else {
      sourceSuffix = 'docs';
    }
    
    const newName = `${originalName}_duplicate_from_${sourceSuffix}${extension}`;
    const newDestination = path.join(destDir, newName);
    
    // Copiar el archivo con el nuevo nombre
    fs.copyFileSync(filePath, newDestination);
    renamedFiles.push({
      original: filePath,
      renamed: newDestination
    });
  } else {
    // Copiar el archivo al destino normal
    fs.copyFileSync(filePath, destinationPath);
    movedFiles.push({
      from: filePath,
      to: destinationPath
    });
  }
}

// Procesar recursivamente una carpeta
function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // Procesamos recursivamente los subdirectorios
      processDirectory(itemPath);
    } else {
      // Procesamos los archivos individuales
      processMarkdownFile(itemPath);
    }
  }
}

// Eliminar directorios recursivamente
function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`Eliminado directorio: ${dirPath}`);
    return true;
  }
  return false;
}

// Listar la estructura de archivos
function listDirectoryStructure(dir, prefix = '') {
  const items = fs.readdirSync(dir);
  let output = '';
  
  items.sort((a, b) => {
    // Primero directorios, luego archivos
    const aIsDir = fs.statSync(path.join(dir, a)).isDirectory();
    const bIsDir = fs.statSync(path.join(dir, b)).isDirectory();
    
    if (aIsDir && !bIsDir) return -1;
    if (!aIsDir && bIsDir) return 1;
    return a.localeCompare(b);
  });
  
  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const itemPath = path.join(dir, item);
    const isDir = fs.statSync(itemPath).isDirectory();
    
    // Caracteres para la representación en árbol
    const connector = isLast ? '└── ' : '├── ';
    const newPrefix = prefix + (isLast ? '    ' : '│   ');
    
    output += `${prefix}${connector}${item}\n`;
    
    if (isDir) {
      output += listDirectoryStructure(itemPath, newPrefix);
    }
  });
  
  return output;
}

// Función principal
function consolidateDocumentation() {
  console.log('Iniciando consolidación de documentación...');
  
  // Paso 1: Crear estructura de directorios
  createDirectoryStructure();
  
  // Paso 2: Procesar archivos de docs/ si existe
  if (fs.existsSync(DOCS_DIR)) {
    console.log('Procesando archivos en docs/...');
    processDirectory(DOCS_DIR);
  } else {
    console.log('El directorio docs/ no existe, omitiendo...');
  }
  
  // Paso 3: Procesar archivos de src/docs/ si existe
  if (fs.existsSync(SRC_DOCS_DIR)) {
    console.log('Procesando archivos en src/docs/...');
    processDirectory(SRC_DOCS_DIR);
  } else {
    console.log('El directorio src/docs/ no existe, omitiendo...');
  }
  
  // Paso 4: Eliminar directorios originales
  let docsRemoved = removeDirectory(DOCS_DIR);
  let srcDocsRemoved = removeDirectory(SRC_DOCS_DIR);
  
  // Paso 5: Generar informe
  console.log('\n===== INFORME DE CONSOLIDACIÓN =====');
  
  console.log('\nDirectorios creados:');
  createdDirs.forEach(dir => {
    console.log(`- ${path.relative(PROJECT_ROOT, dir)}`);
  });
  
  console.log('\nArchivos movidos:');
  movedFiles.forEach(file => {
    console.log(`- ${path.relative(PROJECT_ROOT, file.from)} -> ${path.relative(PROJECT_ROOT, file.to)}`);
  });
  
  console.log('\nArchivos renombrados por duplicidad:');
  if (renamedFiles.length === 0) {
    console.log('- Ninguno');
  } else {
    renamedFiles.forEach(file => {
      console.log(`- ${path.relative(PROJECT_ROOT, file.original)} -> ${path.relative(PROJECT_ROOT, file.renamed)}`);
    });
  }
  
  console.log('\nDirectorios eliminados:');
  if (docsRemoved) console.log('- docs/');
  if (srcDocsRemoved) console.log('- src/docs/');
  if (!docsRemoved && !srcDocsRemoved) console.log('- Ninguno');
  
  console.log('\nEstructura final en docs_nexo/:');
  console.log(listDirectoryStructure(DOCS_NEXO_DIR));
  
  console.log('\nOperación completada con éxito.');
  console.log(`Archivos procesados: ${movedFiles.length + renamedFiles.length}`);
}

// Ejecutar la función principal
try {
  consolidateDocumentation();
} catch (error) {
  console.error('Error durante la consolidación:', error);
  process.exit(1);
}
