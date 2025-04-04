
/**
 * Script para listar todos los archivos de documentación con sus descripciones
 */

const fs = require('fs');
const path = require('path');

// Configuración de rutas
const PROJECT_ROOT = path.join(__dirname, '..');
const DOCS_LEGACY_DIR = path.join(PROJECT_ROOT, 'docs_nexo/docs_legacy');
const DOCS_NEXO_DIR = path.join(PROJECT_ROOT, 'docs_nexo');

// Función para extraer una descripción breve del archivo markdown
function extractBriefDescription(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Buscar el título principal (# Título)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : 'Sin título definido';
    
    // Buscar el primer párrafo después del título
    let description = 'Sin descripción disponible';
    const paragraphMatch = content.match(/^#.+\n\n(.+?)(\n\n|$)/s);
    
    if (paragraphMatch) {
      description = paragraphMatch[1].replace(/\n/g, ' ').trim();
      // Limitar longitud de la descripción
      if (description.length > 150) {
        description = description.substring(0, 147) + '...';
      }
    }
    
    return { title, description };
  } catch (error) {
    return { title: 'Error al leer archivo', description: 'No se pudo leer el contenido' };
  }
}

// Función para buscar archivos markdown recursivamente
function findMarkdownFiles(dir, fileList = []) {
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Ignorar node_modules y .git para evitar búsquedas innecesarias
        if (file !== 'node_modules' && file !== '.git') {
          findMarkdownFiles(filePath, fileList);
        }
      } else if (file.endsWith('.md')) {
        // Agregar archivo a la lista con ruta relativa
        const relativePath = path.relative(PROJECT_ROOT, filePath);
        const { title, description } = extractBriefDescription(filePath);
        
        fileList.push({
          path: relativePath,
          title,
          description
        });
      }
    }
  } catch (error) {
    console.error(`Error al leer directorio ${dir}: ${error.message}`);
  }
  
  return fileList;
}

// Ejecutar la búsqueda
console.log('Listado de Archivos de Documentación\n');
console.log('========================================\n');

try {
  const docsFiles = findMarkdownFiles(PROJECT_ROOT);
  
  // Organizar por directorios para mejor visualización
  const filesByDir = {};
  
  docsFiles.forEach(file => {
    const dir = path.dirname(file.path);
    if (!filesByDir[dir]) {
      filesByDir[dir] = [];
    }
    filesByDir[dir].push(file);
  });
  
  // Mostrar archivos organizados por directorio
  Object.keys(filesByDir).sort().forEach(dir => {
    console.log(`\n📁 ${dir}/\n`);
    
    filesByDir[dir].sort((a, b) => path.basename(a.path).localeCompare(path.basename(b.path)))
      .forEach(file => {
        console.log(`📄 ${path.basename(file.path)}`);
        console.log(`   Título: ${file.title}`);
        console.log(`   Descripción: ${file.description}`);
        console.log();
      });
  });
  
  console.log('\nTotal de archivos encontrados:', docsFiles.length);
} catch (error) {
  console.error('Error al generar el listado:', error.message);
}
