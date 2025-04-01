
#!/usr/bin/env node

/**
 * Script para normalizar la estructura de archivos del proyecto
 * 
 * Funcionalidades:
 * - Normalizar mayúsculas/minúsculas en nombres de archivos
 * - Eliminar archivos duplicados
 * - Corregir problemas de nomenclatura
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuración
const PROJECT_ROOT = path.join(__dirname, '..');
const DOCS_DIR = path.join(PROJECT_ROOT, 'docs');

// Función para normalizar nombres de archivos (convertir a minúsculas)
function normalizeFileName(filePath) {
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const baseName = path.basename(filePath, ext);
  
  const normalizedBaseName = baseName.toLowerCase();
  const normalizedExt = ext.toLowerCase();
  
  const normalizedPath = path.join(dir, normalizedBaseName + normalizedExt);
  
  if (filePath !== normalizedPath && fs.existsSync(filePath)) {
    try {
      // Verificar si el archivo normalizado ya existe
      if (fs.existsSync(normalizedPath)) {
        console.log(`⚠️ No se puede normalizar ${filePath} porque ${normalizedPath} ya existe`);
        return false;
      }
      
      // Mover archivo con nombre normalizado
      console.log(`Normalizando: ${filePath} → ${normalizedPath}`);
      fs.renameSync(filePath, normalizedPath);
      return true;
    } catch (error) {
      console.error(`Error al normalizar ${filePath}:`, error);
      return false;
    }
  }
  
  return false;
}

// Función para eliminar archivos duplicados
function removeDuplicates(directory) {
  const fileMap = new Map();
  const filesToRemove = [];
  
  function scanDir(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      
      if (fs.statSync(fullPath).isDirectory()) {
        scanDir(fullPath);
        continue;
      }
      
      // Normalizar nombre para comparación
      const normalizedName = file.toLowerCase();
      const ext = path.extname(file).toLowerCase();
      
      // Solo procesar ciertos tipos de archivos
      if (['.md', '.tsx', '.ts', '.js', '.jsx'].includes(ext)) {
        const dirPath = path.relative(PROJECT_ROOT, dir);
        const fileKey = path.join(dirPath, normalizedName);
        
        if (fileMap.has(fileKey)) {
          // Ya existe un archivo con este nombre (normalizado)
          const existingFile = fileMap.get(fileKey);
          
          // Si el actual tiene mayúsculas y el existente no, marcamos el actual para eliminar
          if (file !== normalizedName && existingFile.basename === normalizedName) {
            filesToRemove.push(fullPath);
          } 
          // Si el existente tiene mayúsculas y el actual no, marcamos el existente para eliminar
          else if (file === normalizedName && existingFile.basename !== normalizedName) {
            filesToRemove.push(existingFile.path);
            fileMap.set(fileKey, { path: fullPath, basename: file });
          }
          // Si ambos tienen mayúsculas o ambos no tienen, nos quedamos con el más reciente
          else {
            const existingStat = fs.statSync(existingFile.path);
            const currentStat = fs.statSync(fullPath);
            
            if (currentStat.mtime > existingStat.mtime) {
              filesToRemove.push(existingFile.path);
              fileMap.set(fileKey, { path: fullPath, basename: file });
            } else {
              filesToRemove.push(fullPath);
            }
          }
        } else {
          // Primer archivo con este nombre
          fileMap.set(fileKey, { path: fullPath, basename: file });
        }
      }
    }
  }
  
  // Escanear directorio para encontrar duplicados
  scanDir(directory);
  
  // Eliminar archivos duplicados
  let removedCount = 0;
  for (const file of filesToRemove) {
    try {
      console.log(`Eliminando duplicado: ${file}`);
      fs.unlinkSync(file);
      removedCount++;
    } catch (error) {
      console.error(`Error al eliminar ${file}:`, error);
    }
  }
  
  return removedCount;
}

// Función para corregir problemas de nomenclatura en documentación
function fixDocumentationNaming(directory) {
  const problems = [];
  
  function scanDir(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      
      if (fs.statSync(fullPath).isDirectory()) {
        // Verificar nombre del directorio
        if (/^\d\d_/.test(file)) {
          problems.push({
            type: 'directory',
            path: fullPath,
            issue: 'Prefijo numérico',
            suggestion: file.replace(/^\d\d_/, '')
          });
        }
        
        scanDir(fullPath);
        continue;
      }
      
      // Verificar nombre del archivo
      if (file.endsWith('.md')) {
        // Detectar archivos con formato incorrecto
        if (file.toUpperCase() === file && file !== 'README.md') {
          problems.push({
            type: 'file',
            path: fullPath,
            issue: 'Mayúsculas',
            suggestion: file.toLowerCase()
          });
        }
        
        if (/^\d\d_/.test(file)) {
          problems.push({
            type: 'file',
            path: fullPath,
            issue: 'Prefijo numérico',
            suggestion: file.replace(/^\d\d_/, '')
          });
        }
      }
    }
  }
  
  // Escanear directorio para encontrar problemas
  scanDir(directory);
  
  // Corregir problemas
  let fixedCount = 0;
  for (const problem of problems) {
    try {
      const dir = path.dirname(problem.path);
      const newPath = path.join(dir, problem.suggestion);
      
      console.log(`Corrigiendo: ${problem.path} → ${newPath}`);
      fs.renameSync(problem.path, newPath);
      fixedCount++;
    } catch (error) {
      console.error(`Error al corregir ${problem.path}:`, error);
    }
  }
  
  return fixedCount;
}

// Función principal
function main() {
  const command = process.argv[2] || 'all';
  
  switch (command) {
    case 'normalize':
      console.log('Normalizando nombres de archivos...');
      // TODO: Implementar recorrido recursivo
      normalizeFileName(path.join(DOCS_DIR, 'admin/ADMINISTRACION.md'));
      break;
      
    case 'duplicates':
      console.log('Eliminando archivos duplicados...');
      const removedCount = removeDuplicates(PROJECT_ROOT);
      console.log(`Se eliminaron ${removedCount} archivos duplicados.`);
      break;
      
    case 'fix-docs':
      console.log('Corrigiendo nomenclatura en documentación...');
      const fixedCount = fixDocumentationNaming(DOCS_DIR);
      console.log(`Se corrigieron ${fixedCount} problemas de nomenclatura.`);
      break;
      
    case 'all':
      console.log('Ejecutando todas las correcciones...');
      normalizeFileName(path.join(DOCS_DIR, 'admin/ADMINISTRACION.md'));
      const removed = removeDuplicates(PROJECT_ROOT);
      const fixed = fixDocumentationNaming(DOCS_DIR);
      console.log(`Resumen: ${removed} duplicados eliminados, ${fixed} problemas de nomenclatura corregidos.`);
      break;
      
    case 'help':
    default:
      console.log('Uso: node normalize-file-structure.js [comando]');
      console.log('Comandos:');
      console.log('  normalize      - Normalizar nombres de archivos');
      console.log('  duplicates     - Eliminar archivos duplicados');
      console.log('  fix-docs       - Corregir nomenclatura en documentación');
      console.log('  all            - Ejecutar todas las correcciones');
      console.log('  help           - Mostrar esta ayuda');
      break;
  }
}

// Ejecutar
main();
