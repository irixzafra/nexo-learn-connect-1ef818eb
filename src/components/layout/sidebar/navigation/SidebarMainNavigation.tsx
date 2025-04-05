
import React, { useState } from 'react';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { useAuth } from '@/contexts/auth';
import { UserRoleType } from '@/types/auth';
import DashboardNavigation from './DashboardNavigation';
import CursosNavigation from './CursosNavigation';
import MisCursosNavigation from './MisCursosNavigation';

interface SidebarMainNavigationProps {
  effectiveRole?: UserRoleType;
}

export const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({ effectiveRole }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { userRole } = useAuth();
  
  const role = effectiveRole || userRole as UserRoleType;
  
  // Estados para controlar secciones expandidas
  const [isDashboardOpen, setIsDashboardOpen] = useState(true);
  const [isCursosOpen, setIsCursosOpen] = useState(false);
  const [isMisCursosOpen, setIsMisCursosOpen] = useState(false);
  
  return (
    <div className="space-y-1">
      {/* Sección Dashboard - siempre visible */}
      <DashboardNavigation 
        isOpen={isDashboardOpen} 
        onToggle={() => setIsDashboardOpen(!isDashboardOpen)} 
      />
      
      {/* Sección Cursos - visible para todos */}
      <CursosNavigation 
        isOpen={isCursosOpen}
        onToggle={() => setIsCursosOpen(!isCursosOpen)}
      />
      
      {/* Sección Mis Cursos - para estudiantes */}
      <MisCursosNavigation 
        isOpen={isMisCursosOpen}
        onToggle={() => setIsMisCursosOpen(!isMisCursosOpen)}
      />
    </div>
  );
};
