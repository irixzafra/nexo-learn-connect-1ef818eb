
import { 
  Folder, 
  FileText 
} from 'lucide-react';
import { AdminMenuItem } from './types';

/**
 * Menú de contenido para administración
 */
export const adminContentMenuItems: AdminMenuItem[] = [
  {
    icon: Folder,
    label: 'Gestión de Contenido',
    href: '/admin/content',
    description: 'Centro de gestión de contenido'
  },
  {
    icon: FileText,
    label: 'Categorías',
    href: '/admin/content/categories',
    description: 'Gestión de categorías'
  }
];
