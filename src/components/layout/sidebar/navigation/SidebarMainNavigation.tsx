
import React from 'react';
import { UserRoleType } from '@/types/auth';
import SidebarNavSection from './SidebarNavSection';
import SidebarNavGroup from './SidebarNavGroup';
import { getNavigationByRole } from '@/config/navigation';
import {
  Home,
  BookOpen,
  Users,
  Search,
  GraduationCap,
  Building2,
  CreditCard,
  Settings
} from 'lucide-react';

// Definir la estructura de navegación principal con jerarquía
const navigationStructure = [
  {
    id: 'inicio',
    title: 'Inicio',
    icon: Home,
    items: [
      { path: '/home', label: 'Dashboard' },
      { path: '/notifications', label: 'Notificaciones' }
    ]
  },
  {
    id: 'mis-cursos',
    title: 'Mis Cursos',
    icon: BookOpen,
    items: [
      { path: '/home/my-courses', label: 'En Progreso' },
      { path: '/home/completed-courses', label: 'Completados' }
    ]
  },
  {
    id: 'comunidad',
    title: 'Comunidad',
    icon: Users,
    items: [
      { path: '/community', label: 'Foros' },
      { path: '/messages', label: 'Mensajes' }
    ]
  },
  {
    id: 'explorar',
    title: 'Explorar',
    icon: Search,
    items: [
      { path: '/courses', label: 'Catálogo' },
      { path: '/learning-paths', label: 'Rutas de Aprendizaje' }
    ]
  },
  {
    id: 'profesor',
    title: 'Profesor',
    icon: GraduationCap,
    requiredRole: ['instructor', 'admin'],
    items: [
      { path: '/instructor/courses', label: 'Mis Cursos' },
      { path: '/instructor/students', label: 'Estudiantes' }
    ]
  },
  {
    id: 'gestion',
    title: 'Gestión Académica',
    icon: Building2,
    requiredRole: ['admin', 'sistemas'],
    items: [
      { path: '/admin/courses', label: 'Cursos' },
      { path: '/admin/users', label: 'Usuarios' },
      { path: '/admin/certificates', label: 'Certificaciones' }
    ]
  },
  {
    id: 'finanzas',
    title: 'Finanzas',
    icon: CreditCard,
    requiredRole: ['admin', 'sistemas'],
    items: [
      { path: '/admin/billing', label: 'Transacciones' },
      { path: '/admin/billing/reports', label: 'Informes' },
      { path: '/admin/billing/invoices', label: 'Facturación' }
    ]
  },
  {
    id: 'configuracion',
    title: 'Configuración',
    icon: Settings,
    items: [
      { path: '/settings', label: 'General' },
      { path: '/settings/security', label: 'Seguridad' },
      { path: '/settings/notifications', label: 'Notificaciones' }
    ]
  }
];

interface SidebarMainNavigationProps {
  effectiveRole: UserRoleType;
  isCollapsed: boolean;
  messagesCount: number;
  notificationsCount: number;
  getHomePath: () => string;
}

const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({
  effectiveRole,
  isCollapsed,
  messagesCount,
  notificationsCount,
  getHomePath
}) => {
  // Obtener menús filtrados por rol
  const menus = getNavigationByRole(effectiveRole);

  // Actualizar badges para mensajes y notificaciones en la estructura
  const enhancedStructure = navigationStructure.map(group => {
    // Filtrar por rol del grupo
    if (group.requiredRole) {
      if (Array.isArray(group.requiredRole) && !group.requiredRole.includes(effectiveRole)) {
        return null;
      }
      if (!Array.isArray(group.requiredRole) && group.requiredRole !== effectiveRole) {
        return null;
      }
    }

    // Actualizar items con badges si corresponde
    const updatedItems = group.items.map(item => {
      let updatedItem = { ...item };
      
      if (item.path === '/messages') {
        updatedItem.badge = messagesCount > 0 ? messagesCount : undefined;
      }
      
      if (item.path === '/notifications') {
        updatedItem.badge = notificationsCount > 0 ? notificationsCount : undefined;
      }
      
      // Agregar tipos para mantener compatibilidad con MenuItem
      return {
        ...updatedItem,
        icon: updatedItem.icon || Home,
        path: updatedItem.path,
        label: updatedItem.label
      };
    });

    return {
      ...group,
      items: updatedItems
    };
  }).filter(Boolean);

  return (
    <div className={`flex-1 overflow-auto ${isCollapsed ? "px-2" : "px-4"}`}>
      <div className="space-y-4 py-4">
        {enhancedStructure.map(group => (
          group && (
            <SidebarNavGroup
              key={group.id}
              title={group.title}
              icon={group.icon}
              items={group.items}
              isCollapsed={isCollapsed}
              effectiveRole={effectiveRole}
              defaultOpen={group.id === 'inicio'}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default SidebarMainNavigation;
