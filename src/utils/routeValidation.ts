import { MenuItem } from '@/types/navigation';

// This is a simple implementation - replace with your actual routes
const appRoutes: string[] = [
  '/',
  '/dashboard',
  '/courses',
  '/profile',
  '/settings',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password'
];

// Validate if a path exists in the application
export const isValidPath = (path: string): boolean => {
  // Strip leading and trailing slashes for consistency
  const normalizedPath = path.replace(/^\/+|\/+$/g, '');
  
  // Direct match in appRoutes
  if (appRoutes.some(route => {
    const normalizedRoute = route.replace(/^\/+|\/+$/g, '');
    return normalizedPath === normalizedRoute;
  })) {
    return true;
  }
  
  // Check if it's a dynamic route with parameters
  // For example: /courses/:id should match /courses/123
  const potentialDynamicRoutes = appRoutes.filter(route => route.includes(':'));
  
  for (const dynamicRoute of potentialDynamicRoutes) {
    const routeParts = dynamicRoute.split('/').filter(Boolean);
    const pathParts = normalizedPath.split('/').filter(Boolean);
    
    if (routeParts.length !== pathParts.length) continue;
    
    let isMatch = true;
    for (let i = 0; i < routeParts.length; i++) {
      // If this part is a parameter (starts with :), it matches anything
      if (routeParts[i].startsWith(':')) continue;
      
      // Otherwise, the parts must match exactly
      if (routeParts[i] !== pathParts[i]) {
        isMatch = false;
        break;
      }
    }
    
    if (isMatch) return true;
  }
  
  return false;
};

// Flatten menu items to a simple array of paths
export const extractPathsFromMenuItems = (menuItems: MenuItem[]): string[] => {
  const paths: string[] = [];
  
  const extractPaths = (items: MenuItem[]) => {
    items.forEach(item => {
      if (item.path) {
        paths.push(item.path);
      }
      
      if (item.submenu && item.submenu.length > 0) {
        extractPaths(item.submenu);
      }
    });
  };
  
  extractPaths(menuItems);
  return paths;
};

// Check if a route map exists
export const routeExists = (path: string, routeMap: Record<string, string>): boolean => {
  return Object.values(routeMap).includes(path);
};

// Validate a route against menu items
export const validateRoute = (route: string, menuItems: MenuItem[]): boolean => {
  // Extract all paths from menu items
  const validPaths = extractPathsFromMenuItems(menuItems);
  
  // Check if the route exists in valid paths
  return validPaths.includes(route);
};

// Get a display name for a route
export const getRouteDisplayName = (route: string, menuItems: MenuItem[]): string | null => {
  let displayName: string | null = null;
  
  const findDisplayName = (items: MenuItem[]) => {
    for (const item of items) {
      if (item.path === route) {
        displayName = item.label;
        return;
      }
      
      if (item.submenu && item.submenu.length > 0) {
        findDisplayName(item.submenu);
        if (displayName) return;
      }
    }
  };
  
  findDisplayName(menuItems);
  return displayName;
};
