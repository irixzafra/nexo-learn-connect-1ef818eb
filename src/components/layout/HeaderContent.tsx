
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
  const location = useLocation();
  
  // Extraer el nombre de la página actual del path
  const getPageTitle = () => {
    const path = location.pathname.split('/').filter(p => p);
    if (path.length === 0) return 'Inicio';
    
    const lastSegment = path[path.length - 1];
    // Convertir a título (primera letra mayúscula, resto minúscula)
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).toLowerCase();
  };
  
  return (
    <div className="w-full py-2 px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-20 border-b">
      <div className="container mx-auto flex justify-between items-center h-14">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <SidebarTrigger className="h-8 w-8" />
          <span className="text-lg font-medium">{getPageTitle()}</span>
          <RoleIndicator viewingAs={viewingAs} />
        </div>
        
        {/* Right side */}
        <div className="flex items-center gap-2">
          <HeaderActions userRole={userRole} />
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;
