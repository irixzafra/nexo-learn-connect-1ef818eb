
import React from 'react';
import { Shield, Users, BookOpen, FileText, PanelLeft, Palette, Navigation } from 'lucide-react';
import MenuItem from '@/components/layout/sidebar/navigation/common/MenuItem';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { UserRoleType } from '@/types/auth';

interface AdministracionNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
  userRole: UserRoleType;
}

const AdministracionNavigation: React.FC<AdministracionNavigationProps> = ({ 
  isOpen,
  onToggle,
  userRole 
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const isSistemas = userRole === 'sistemas';

  return (
    <div className="px-3 py-2">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>Administración</span>
        </div>
      </button>
      
      {isOpen && (
        <div className="mt-1 space-y-1 px-1">
          <MenuItem
            to="/admin/dashboard"
            icon={Shield}
            label="Panel Admin"
            isCollapsed={isCollapsed}
          />
          <MenuItem
            to="/admin/users"
            icon={Users}
            label="Usuarios"
            isCollapsed={isCollapsed}
          />
          <MenuItem
            to="/admin/courses"
            icon={BookOpen}
            label="Cursos"
            isCollapsed={isCollapsed}
          />
          <MenuItem
            to="/admin/system-pages"
            icon={FileText}
            label="Páginas del Sistema"
            isCollapsed={isCollapsed}
          />
          <MenuItem
            to="/admin/design-system"
            icon={Palette}
            label="Sistema de Diseño"
            isCollapsed={isCollapsed}
          />
          <MenuItem
            to="/admin/navigation-diagram"
            icon={Navigation}
            label="Diagrama de Navegación" 
            isCollapsed={isCollapsed}
          />
          {isSistemas && (
            <MenuItem
              to="/admin/route-validator"
              icon={FileText}
              label="Validador de Rutas"
              isCollapsed={isCollapsed}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AdministracionNavigation;
