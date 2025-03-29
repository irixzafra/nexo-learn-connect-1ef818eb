
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { UserMenu } from './header/UserMenu';
import { RoleIndicator } from './header/RoleIndicator';
import { HeaderActions } from './header/HeaderActions';
import { useLocation } from 'react-router-dom';

interface HeaderContentProps {
  userRole: string | null;
  viewingAs: string | null;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ userRole, viewingAs }) => {
  const viewAsRole = viewingAs || 'current';
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Extraer el nombre de la página actual del path
  const getPageTitle = () => {
    const path = currentPath.split('/').filter(p => p);
    if (path.length === 0) return 'Inicio';
    
    const lastSegment = path[path.length - 1];
    // Convertir a título (primera letra mayúscula, resto minúscula)
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).toLowerCase();
  };
  
  return (
    <div className="w-full py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side: Logo/Trigger */}
        <div className="flex items-center gap-2">
          {/* SidebarTrigger visible on desktop */}
          <div className="hidden md:block">
            <SidebarTrigger className="h-8 w-8" />
          </div>
          
          {/* Page title */}
          <span className="text-lg font-medium">{getPageTitle()}</span>
          
          {/* Role view indicator */}
          <RoleIndicator viewingAs={viewingAs} />
        </div>
        
        {/* Right side: Actions and user menu */}
        <div className="flex items-center gap-2">
          {/* Actions (Notifications, Help) */}
          <HeaderActions userRole={userRole} />
          
          {/* User menu */}
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;
