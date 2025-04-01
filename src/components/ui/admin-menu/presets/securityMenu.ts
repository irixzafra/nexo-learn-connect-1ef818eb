
import { 
  Shield, 
  KeyRound, 
  History 
} from 'lucide-react';
import { AdminMenuItem } from './types';

/**
 * Menú de seguridad para administración
 */
export const adminSecurityMenuItems: AdminMenuItem[] = [
  {
    icon: Shield,
    label: 'Control de Acceso',
    href: '/admin/access',
    description: 'Políticas de seguridad'
  },
  {
    icon: KeyRound,
    label: 'Roles y Permisos',
    href: '/admin/roles',
    description: 'Gestión de roles de usuario'
  },
  {
    icon: History,
    label: 'Auditoría',
    href: '/admin/audit-log',
    description: 'Registros de actividad'
  }
];
