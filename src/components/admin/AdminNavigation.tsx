
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  FileText, 
  PanelLeft, 
  Database, 
  Shield,
  School
} from 'lucide-react';
import { routeMap } from '@/utils/routeUtils';
import { Button } from '@/components/ui/button';

interface AdminNavigationProps {
  enabled?: boolean;
}

export const AdminNavigation: React.FC<AdminNavigationProps> = ({ enabled = true }) => {
  if (!enabled) return null;

  // Admin navigation items based on the SSOT in NAVIGATION.md
  const navigationGroups = [
    {
      label: 'Dashboard',
      items: [
        { path: routeMap.adminDashboard, label: 'Visión General', icon: LayoutDashboard }
      ]
    },
    {
      label: 'Académico',
      items: [
        { path: routeMap.adminCourses, label: 'Gestión de Cursos', icon: BookOpen },
        { path: routeMap.adminInstructors, label: 'Instructores', icon: School }
      ]
    },
    {
      label: 'Gestión Central',
      items: [
        { path: routeMap.adminUsers, label: 'Gestión de Usuarios', icon: Users },
        { path: routeMap.adminRoles, label: 'Roles y Permisos', icon: Shield }
      ]
    },
    {
      label: 'Sistema',
      items: [
        { path: routeMap.adminSystemPages, label: 'Páginas CMS', icon: FileText },
        { path: routeMap.adminNavigationManager, label: 'Gestión de Navegación', icon: PanelLeft },
        { path: routeMap.adminSettings, label: 'Configuración', icon: Settings }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {navigationGroups.map((group, index) => (
        <div key={index} className="space-y-2">
          <h3 className="px-4 text-sm font-medium text-muted-foreground">{group.label}</h3>
          <div className="space-y-1">
            {group.items.map((item, itemIndex) => (
              <Button 
                key={itemIndex} 
                variant="ghost" 
                asChild 
                className="w-full justify-start"
                size="sm"
              >
                <Link to={item.path} className="flex items-center">
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  <span>{item.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminNavigation;
