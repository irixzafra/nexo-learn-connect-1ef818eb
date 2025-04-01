
import { UserRoleType } from '@/types/auth';

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
  
  /** Menú de exploración */
  explore: MenuItem[];
  
  /** Menú de profesores */
  instructor: MenuItem[];
  
  /** Menú de gestión académica */
  academic: MenuItem[];
  
  /** Menú de finanzas */
  finance: MenuItem[];
  
  /** Menú de configuración */
  settings: MenuItem[];
}

/**
 * Define un grupo de navegación (nivel 1)
 */
export interface NavGroup {
  /** Identificador único del grupo */
  id: string;
  
  /** Título del grupo */
  title: string;
  
  /** Icono del grupo */
  icon: React.ElementType;
  
  /** Opcional: Roles que pueden ver este grupo */
  requiredRole?: UserRoleType | UserRoleType[];
  
  /** Elementos del grupo (nivel 2) */
  items: MenuItem[];
}
