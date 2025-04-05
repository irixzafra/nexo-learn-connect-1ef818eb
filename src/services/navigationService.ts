
// src/services/navigationService.ts
import { NavigationItemWithChildren } from '@/types/navigation-manager';
import { LucideIcon } from 'lucide-react';
import { UserRoleType } from '@/types/auth';
import { MenuItem } from '@/types/navigation';

// Función para crear un elemento de navegación
export const createNavigationItem = (
  id: string,
  label: string,
  path: string,
  sortOrder: number = 0
): NavigationItemWithChildren => {
  return {
    id,
    label,
    path,
    sortOrder,
    isActive: true,
    isVisible: true,
    itemType: 'link',
    children: []
  };
};

// Función para convertir un string de icono a componente
export const getIconComponent = (icon: string | LucideIcon | undefined) => {
  if (!icon) return null;
  
  // Si es un componente de Lucide, devolverlo directamente
  if (typeof icon !== 'string') {
    return icon;
  }
  
  // Si es string, podría ser un nombre de icono o una URL
  // Aquí se podría implementar lógica para cargar dinámicamente iconos
  return null;
};

// Función para filtrar elementos de navegación por rol
export const filterNavigationByRole = (
  items: NavigationItemWithChildren[],
  role: UserRoleType
): NavigationItemWithChildren[] => {
  return items.filter(item => {
    // Si no hay restricción de rol, mostrar para todos
    if (!item.requiredRole) return true;
    
    // Comprobar si el rol del usuario está permitido
    if (Array.isArray(item.requiredRole)) {
      return item.requiredRole.includes(role);
    } else {
      return item.requiredRole === role;
    }
  });
};

// Función para ordenar elementos de navegación
export const sortNavigationItems = (
  items: NavigationItemWithChildren[]
): NavigationItemWithChildren[] => {
  return [...items].sort((a, b) => {
    // Primero por sortOrder si existe
    if (a.sortOrder !== undefined && b.sortOrder !== undefined) {
      return a.sortOrder - b.sortOrder;
    }
    // Luego alfabéticamente por etiqueta
    return a.label.localeCompare(b.label);
  });
};

// Mock fetch navigation items
export const fetchNavigationItems = async (): Promise<NavigationItemWithChildren[]> => {
  // This would be a real API call in a production environment
  return Promise.resolve([
    createNavigationItem('dashboard', 'Dashboard', '/app/dashboard', 0),
    createNavigationItem('courses', 'Courses', '/app/courses', 1),
    createNavigationItem('profile', 'Profile', '/app/profile', 2),
  ]);
};

// Mock save navigation items
export const saveNavigationItems = async (items: NavigationItemWithChildren[]): Promise<boolean> => {
  // This would be a real API call in a production environment
  console.log('Saving navigation items:', items);
  return Promise.resolve(true);
};

// Mock sync navigation from code
export const syncNavigationFromCode = async (): Promise<boolean> => {
  // This would be a real API call in a production environment
  console.log('Syncing navigation from code');
  return Promise.resolve(true);
};

// Export auxiliar functions
export default {
  createNavigationItem,
  getIconComponent,
  filterNavigationByRole,
  sortNavigationItems,
  fetchNavigationItems,
  saveNavigationItems,
  syncNavigationFromCode
};
