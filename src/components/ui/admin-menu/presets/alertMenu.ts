
import { 
  AlertCircle, 
  CheckCircle 
} from 'lucide-react';
import { AdminMenuItem } from './types';

/**
 * Menú de alertas para administración
 */
export const adminAlertMenuItems: AdminMenuItem[] = [
  {
    icon: AlertCircle,
    label: 'Actualización de Seguridad Pendiente',
    href: '/admin/security-updates',
    description: 'Se recomienda actualizar los módulos de seguridad a la última versión.'
  },
  {
    icon: CheckCircle,
    label: 'Auditoría Completada',
    href: '/admin/audit-log',
    description: 'La auditoría de seguridad mensual ha sido completada. Sin problemas encontrados.'
  }
];
