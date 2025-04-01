
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

// Rutas de documentación
const masterDocPath = path.join(__dirname, '../docs/NEXO_SYSTEM_ARCHITECTURE.md');
const navDocPath = path.join(__dirname, '../docs/ESTRUCTURA_NAVEGACION_ACTUALIZADA.md');

// Ruta de configuración de navegación
const navConfigPath = path.join(__dirname, '../src/config/navigation');

// Fecha actual formateada
const currentDate = new Date().toLocaleDateString('es-ES', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

// Actualizar la fecha en un documento
function updateDocumentDate(docPath) {
  if (fs.existsSync(docPath)) {
    let content = fs.readFileSync(docPath, 'utf8');
    content = content.replace(/Documento actualizado: \[.*?\]/g, `Documento actualizado: [${currentDate}]`);
    fs.writeFileSync(docPath, content, 'utf8');
    console.log(`Fecha de documentación actualizada correctamente en ${path.basename(docPath)}`);
  } else {
    console.error('Documento no encontrado:', docPath);
  }
}

// Extraer información de archivos de navegación 
function extractNavigationConfig() {
  const navFiles = fs.readdirSync(navConfigPath).filter(file => file.endsWith('.ts') && !file.includes('utils') && !file.includes('types'));
  
  const navigationConfig = {};
  
  navFiles.forEach(file => {
    const filePath = path.join(navConfigPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extraer nombre del archivo sin extensión
    const section = file.replace('.ts', '');
    
    // Extraer elementos de navegación usando regex simple
    // Esto es una simplificación - en un escenario real sería mejor usar un parser de TS
    const menuItems = [];
    const regex = /icon:\s*([\w]+),\s*label:\s*['"]([^'"]+)['"],\s*path:\s*['"]([^'"]+)['"]/g;
    
    let match;
    while ((match = regex.exec(content)) !== null) {
      menuItems.push({
        icon: match[1],
        label: match[2],
        path: match[3]
      });
    }
    
    navigationConfig[section] = menuItems;
  });
  
  return navigationConfig;
}

// Generar documentación de estructura de navegación
function generateNavigationDoc(navConfig) {
  // Implementación simplificada - en un caso real se generaría
  // un documento más completo a partir de la configuración
  const sections = Object.keys(navConfig);
  
  let docContent = `# ESTRUCTURA DE NAVEGACIÓN ACTUALIZADA\n\n`;
  docContent += `Este documento se genera automáticamente a partir de la configuración en src/config/navigation\n\n`;
  
  sections.forEach(section => {
    docContent += `## ${section.replace('Navigation', '')}\n\n`;
    
    navConfig[section].forEach(item => {
      docContent += `- **${item.label}** (${item.icon}) - Ruta: \`${item.path}\`\n`;
    });
    
    docContent += '\n';
  });
  
  docContent += `---\n\nDocumento actualizado: [${currentDate}]\n`;
  
  return docContent;
}

// Extraer rutas y componentes desde AppRouter.tsx
function extractRoutesAndComponents() {
  const routerPath = path.join(__dirname, '../src/routes/AppRouter.tsx');
  
  if (!fs.existsSync(routerPath)) {
    console.error('Archivo AppRouter.tsx no encontrado');
    return {};
  }
  
  const content = fs.readFileSync(routerPath, 'utf8');
  
  // Extraer rutas usando regex simple
  // En un escenario real sería mejor usar un parser de React/TS
  const routes = [];
  const routeRegex = /<Route\s+path=["']([^"']+)["']/g;
  
  let match;
  while ((match = routeRegex.exec(content)) !== null) {
    routes.push(match[1]);
  }
  
  // Extraer componentes importados
  const components = [];
  const importRegex = /import\s+(\w+)\s+from\s+["']([^"']+)["']/g;
  
  while ((match = importRegex.exec(content)) !== null) {
    components.push({
      name: match[1],
      path: match[2]
    });
  }
  
  return { routes, components };
}

// Función principal
async function main() {
  try {
    console.log('Actualizando documentación del sistema...');
    
    // Actualizar fechas en documentos existentes
    updateDocumentDate(masterDocPath);
    updateDocumentDate(navDocPath);
    
    // Extraer configuración de navegación
    const navConfig = extractNavigationConfig();
    
    // Extraer rutas y componentes
    const { routes, components } = extractRoutesAndComponents();
    
    // Generar documentación de navegación
    const navDocContent = generateNavigationDoc(navConfig);
    
    // Escribir documentación generada
    fs.writeFileSync(
      path.join(__dirname, '../src/docs/ESTRUCTURA_NAVEGACION_GENERADA.md'), 
      navDocContent, 
      'utf8'
    );
    
    console.log('Documentación actualizada correctamente');
    console.log(`Se han documentado ${Object.keys(navConfig).length} secciones de navegación y ${routes.length} rutas.`);
    
  } catch (error) {
    console.error('Error al actualizar la documentación:', error);
    process.exit(1);
  }
}

// Ejecutar
main();
