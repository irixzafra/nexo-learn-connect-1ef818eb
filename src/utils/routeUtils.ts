
/**
 * Verifica si una ruta está activa basada en la ruta actual y la ruta de destino
 * 
 * @param currentPath Ruta actual del navegador
 * @param targetPath Ruta de destino para verificar
 * @param exact Si se debe hacer una coincidencia exacta (true) o parcial (false)
 * @returns Booleano indicando si la ruta está activa
 */
export function isRouteActive(currentPath: string, targetPath: string, exact: boolean = false): boolean {
  if (targetPath === '/') {
    return exact ? currentPath === '/' : currentPath === '/';
  }
  
  // Eliminar los parámetros de consulta si existen
  const cleanCurrentPath = currentPath.split('?')[0];
  
  if (exact) {
    return cleanCurrentPath === targetPath;
  }
  
  return cleanCurrentPath === targetPath || 
         cleanCurrentPath.startsWith(targetPath + '/');
}
