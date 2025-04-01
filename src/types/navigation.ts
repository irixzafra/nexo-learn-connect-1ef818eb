
import { UserRoleType } from './auth';

/**
 * Interfaz para definir un ítem de menú en la navegación
 */
export interface MenuItem {
  /** Componente de icono (generalmente de Lucide) */
  icon: React.ElementType;
  
  /** Texto visible del ítem */
  label: string;
  
  /** Ruta de navegación */
  path: string;
  
  /** Opcional: Insignia numérica o texto */
  badge?: number;
  
  /** Opcional: Estado deshabilitado */
  disabled?: boolean;
  
  /** Opcional: Descripción para tooltip o info adicional */
  description?: string;
  
  /** Opcional: Roles que pueden ver este ítem */
  requiredRole?: UserRoleType | UserRoleType[];
  
  /** Opcional: Submenús */
  children?: MenuItem[];
}

/**
 * Estructura con todos los menús de navegación filtrados por rol
 */
export interface NavigationMenus {
  /** Menú principal */
  main: MenuItem[];
  
  /** Menú de administración */
  admin: MenuItem[];
  
  /** Menú de gamificación */
  gamification: MenuItem[];
}
