
import { routeMap } from './routeUtils';

/**
 * Types of route issues that can be detected
 */
export enum RouteIssueType {
  BROKEN_LINK = 'broken_link',
  DUPLICATE_ROUTE = 'duplicate_route',
  DEPRECATED_ROUTE = 'deprecated_route',
  MISSING_ROLE_CHECK = 'missing_role_check',
  INCONSISTENT_NAMING = 'inconsistent_naming'
}

/**
 * Interface for route validation issue
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
 * Interface for the validation result
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
 * Validates a single route
 * @param path The route path to validate
 */
const validateSingleRoute = (path: string): RouteIssue[] => {
  const issues: RouteIssue[] = [];
  
  // Check if the route exists in our routeMap
  const routeExists = Object.values(routeMap).some(route => {
    if (typeof route === 'function') {
      // For dynamic routes, we can't automatically check
      return false;
    }
    return route === path;
  });
  
  if (!routeExists) {
    issues.push({
      path,
      type: RouteIssueType.BROKEN_LINK,
      severity: 'warning',
      message: `La ruta "${path}" no está definida en el routeMap centralizado`,
      suggestion: 'Considera añadir esta ruta al routeMap en utils/routeUtils.ts'
    });
  }
  
  // Check for deprecated patterns
  if (path.includes('/admin/admin')) {
    issues.push({
      path,
      type: RouteIssueType.DEPRECATED_ROUTE,
      severity: 'warning',
      message: 'Patrón de ruta duplicada /admin/admin',
      suggestion: 'Simplifica a un solo nivel /admin'
    });
  }
  
  // Check for inconsistent naming conventions
  if (path.includes('_') && !path.includes('api')) {
    issues.push({
      path,
      type: RouteIssueType.INCONSISTENT_NAMING,
      severity: 'info',
      message: 'Inconsistencia en nomenclatura de rutas',
      suggestion: 'Considera usar kebab-case en lugar de snake_case para rutas'
    });
  }
  
  return issues;
};

/**
 * Validates a collection of routes
 * @param routes Routes to validate
 */
export const validateRoutes = (routes: string[]): ValidationResult => {
  const allIssues: RouteIssue[] = [];
  const checkedRoutes = new Set<string>();
  
  // Check each route
  routes.forEach(route => {
    // Check for duplicates in the input
    if (checkedRoutes.has(route)) {
      allIssues.push({
        path: route,
        type: RouteIssueType.DUPLICATE_ROUTE,
        severity: 'warning',
        message: `Ruta duplicada "${route}" en la configuración de navegación`,
        suggestion: 'Elimina rutas duplicadas para evitar confusión'
      });
    } else {
      checkedRoutes.add(route);
      
      // Validate the individual route
      const issues = validateSingleRoute(route);
      allIssues.push(...issues);
    }
  });
  
  // Calculate stats
  const stats = {
    total: allIssues.length,
    errors: allIssues.filter(issue => issue.severity === 'error').length,
    warnings: allIssues.filter(issue => issue.severity === 'warning').length,
    info: allIssues.filter(issue => issue.severity === 'info').length
  };
  
  return {
    valid: allIssues.length === 0,
    issues: allIssues,
    stats
  };
};

/**
 * Extract all routes from navigation configuration
 * @param navigationItems Array of navigation items
 */
export const extractRoutesFromNavigationItems = (navigationItems: any[]): string[] => {
  const routes: string[] = [];
  
  const extractRoutes = (items: any[]) => {
    items.forEach(item => {
      if (item.path) {
        routes.push(item.path);
      }
      
      if (item.items && Array.isArray(item.items)) {
        extractRoutes(item.items);
      }
    });
  };
  
  extractRoutes(navigationItems);
  return routes;
};

/**
 * Checks if a route is accessible for the given roles
 * @param route Route to check
 * @param userRoles Array of user roles
 */
export const isRouteAccessible = (route: string, userRoles: string[]): boolean => {
  // In a real implementation, this would check against a permissions database
  // For now, we'll use a simple pattern matching approach
  
  // Admin routes should only be accessible to admin and sistemas roles
  if (route.startsWith('/admin')) {
    return userRoles.some(role => role === 'admin' || role === 'sistemas');
  }
  
  // Instructor routes
  if (route.startsWith('/instructor')) {
    return userRoles.some(role => ['instructor', 'admin', 'sistemas'].includes(role));
  }
  
  // Most other routes are accessible to all authenticated users
  return true;
};
