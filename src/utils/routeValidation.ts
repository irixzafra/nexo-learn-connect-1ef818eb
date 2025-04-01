
import { routeMap } from './routeUtils';

/**
 * Checks if a path is valid in our application
 * @param path The path to check
 * @returns boolean indicating if the path is valid
 */
export const isValidPath = (path: string): boolean => {
  if (!path) return false;
  
  // Remove leading slash for comparison
  const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Check if it's a dynamic path with parameters
  const hasDynamicSegment = normalizedPath.includes(':') || normalizedPath.includes('*');
  
  // If it's a dynamic path, we need to check if it matches any pattern
  if (hasDynamicSegment) {
    // This would require more complex pattern matching
    // For now, we'll assume it's valid and let the router handle it
    return true;
  }
  
  // Check against our route map (converted to array of paths)
  const allRoutes = Object.values(routeMap)
    .map(route => typeof route === 'function' ? null : route)
    .filter(Boolean) as string[];
  
  // Check if the path exists in our route map
  return allRoutes.some(route => {
    const routeNormalized = route.startsWith('/') ? route.substring(1) : route;
    return routeNormalized === normalizedPath;
  });
};

/**
 * Normalizes a path by ensuring it has a leading slash
 * @param path The path to normalize
 * @returns The normalized path
 */
export const normalizePath = (path: string): string => {
  if (!path) return '/';
  return path.startsWith('/') ? path : `/${path}`;
};
