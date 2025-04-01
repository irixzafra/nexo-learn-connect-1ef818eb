
import { LucideIcon } from 'lucide-react';

/**
 * Definición de tipo para los elementos del menú administrativo
 */
export interface AdminMenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
  description?: string;
  badge?: string | number;
}
