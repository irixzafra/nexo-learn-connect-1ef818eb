
import { routeMap } from './routeUtils';
import { MenuItem } from '@/types/navigation';

/**
 * Types of issues that can be found in routes
 */
export enum RouteIssueType {
  BROKEN_LINK = 'BROKEN_LINK',
  DUPLICATE_ROUTE = 'DUPLICATE_ROUTE',
  MISSING_ROLE_CHECK = 'MISSING_ROLE_CHECK',
  DEPRECATED_ROUTE = 'DEPRECATED_ROUTE',
  INCONSISTENT_NAMING = 'INCONSISTENT_NAMING'
}

/**
 * Represents an issue found during route validation
 */
export interface RouteIssue {
  path: string;
  type: RouteIssueType;
  severity: 'error' | 'warning' | 'info';
  message: string;
  suggestion?: string;
  location?: string;
}

/**
 * Result of route validation
 */
export interface ValidationResult {
  valid: boolean;
  issues: RouteIssue[];
  stats: {
    total: number;
    errors: number;
    warnings: number;
    info: number;
  };
}

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

/**
 * Extracts routes from navigation items
 * @param items Navigation items to extract routes from
 * @returns Array of routes
 */
export const extractRoutesFromNavigationItems = (items: MenuItem[]): string[] => {
  const routes: string[] = [];
  
  // Recursive function to extract routes from items and their children
  const extract = (items: MenuItem[]) => {
    items.forEach(item => {
      if (item.path) {
        routes.push(item.path);
      } else if (item.url) {
        // External URLs are valid by default
        if (!item.url.startsWith('http')) {
          routes.push(item.url);
        }
      }
      
      // Process child items if they exist
      if (item.items && item.items.length > 0) {
        extract(item.items);
      }
    });
  };
  
  extract(items);
  return routes;
};

/**
 * Validates an array of routes
 * @param routes Routes to validate
 * @returns Validation result
 */
export const validateRoutes = (routes: string[]): ValidationResult => {
  const issues: RouteIssue[] = [];
  const visitedRoutes = new Set<string>();
  
  // Check each route
  routes.forEach(route => {
    // Check for duplicates
    if (visitedRoutes.has(route)) {
      issues.push({
        path: route,
        type: RouteIssueType.DUPLICATE_ROUTE,
        severity: 'warning',
        message: `Route "${route}" is defined multiple times`,
        suggestion: 'Consider consolidating duplicate routes or using a more specific path'
      });
    }
    visitedRoutes.add(route);
    
    // Skip external URLs
    if (route.startsWith('http')) {
      return;
    }
    
    // Check if the route is valid
    if (!isValidPath(route)) {
      issues.push({
        path: route,
        type: RouteIssueType.BROKEN_LINK,
        severity: 'error',
        message: `Route "${route}" does not exist in the application`,
        suggestion: 'Verify the route path or add the missing route to the application'
      });
    }
    
    // Check for role-protected routes without role check
    if (route.includes('/admin') && !route.includes(':role')) {
      issues.push({
        path: route,
        type: RouteIssueType.MISSING_ROLE_CHECK,
        severity: 'warning',
        message: `Admin route "${route}" might not have proper role verification`,
        suggestion: 'Ensure this route is properly protected by role-based access control'
      });
    }
    
    // Check for deprecated routes
    if (route.includes('/old') || route.includes('/legacy')) {
      issues.push({
        path: route,
        type: RouteIssueType.DEPRECATED_ROUTE,
        severity: 'info',
        message: `Route "${route}" appears to be a deprecated path`,
        suggestion: 'Consider updating to the newer route pattern or removing if unused'
      });
    }
  });
  
  // Count issues by severity
  const errorCount = issues.filter(issue => issue.severity === 'error').length;
  const warningCount = issues.filter(issue => issue.severity === 'warning').length;
  const infoCount = issues.filter(issue => issue.severity === 'info').length;
  
  return {
    valid: errorCount === 0,
    issues,
    stats: {
      total: issues.length,
      errors: errorCount,
      warnings: warningCount,
      info: infoCount
    }
  };
};
