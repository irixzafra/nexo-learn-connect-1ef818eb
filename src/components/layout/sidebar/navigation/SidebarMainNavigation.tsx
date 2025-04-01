
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
      { path: '/home', label: 'Dashboard', icon: Home },
      { path: '/notifications', label: 'Notificaciones', icon: Home }
    ]
  },
  {
    id: 'mis-cursos',
    title: 'Mis Cursos',
    icon: BookOpen,
    items: [
      { path: '/home/my-courses', label: 'En Progreso', icon: BookOpen },
      { path: '/home/completed-courses', label: 'Completados', icon: BookOpen }
    ]
  },
  {
    id: 'comunidad',
    title: 'Comunidad',
    icon: Users,
    items: [
      { path: '/community', label: 'Foros', icon: Users },
      { path: '/messages', label: 'Mensajes', icon: Users }
    ]
  },
  {
    id: 'explorar',
    title: 'Explorar',
    icon: Search,
    items: [
      { path: '/courses', label: 'Catálogo', icon: Search },
      { path: '/learning-paths', label: 'Rutas de Aprendizaje', icon: Search }
    ]
  },
  {
    id: 'profesor',
    title: 'Profesor',
    icon: GraduationCap,
    requiredRole: ['instructor', 'admin'],
    items: [
      { path: '/instructor/courses', label: 'Mis Cursos', icon: GraduationCap },
      { path: '/instructor/students', label: 'Estudiantes', icon: GraduationCap }
    ]
  },
  {
    id: 'gestion',
    title: 'Gestión Académica',
    icon: Building2,
    requiredRole: ['admin', 'sistemas'],
    items: [
      { path: '/admin/courses', label: 'Cursos', icon: Building2 },
      { path: '/admin/users', label: 'Usuarios', icon: Building2 },
      { path: '/admin/certificates', label: 'Certificaciones', icon: Building2 }
    ]
  },
  {
    id: 'finanzas',
    title: 'Finanzas',
    icon: CreditCard,
    requiredRole: ['admin', 'sistemas'],
    items: [
      { path: '/admin/billing', label: 'Transacciones', icon: CreditCard },
      { path: '/admin/billing/reports', label: 'Informes', icon: CreditCard },
      { path: '/admin/billing/invoices', label: 'Facturación', icon: CreditCard }
    ]
  },
  {
    id: 'configuracion',
    title: 'Configuración',
    icon: Settings,
    items: [
      { path: '/settings', label: 'General', icon: Settings },
      { path: '/settings/security', label: 'Seguridad', icon: Settings },
      { path: '/settings/notifications', label: 'Notificaciones', icon: Settings }
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
      let badge = undefined;
      
      if (item.path === '/messages') {
        badge = messagesCount > 0 ? messagesCount : undefined;
      }
      
      if (item.path === '/notifications') {
        badge = notificationsCount > 0 ? notificationsCount : undefined;
      }
      
      // Devolver el item con badge actualizado si corresponde
      return {
        ...item,
        badge
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
