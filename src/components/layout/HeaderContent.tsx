
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserMenu } from './header/UserMenu';
import { HeaderActions } from './header/HeaderActions';
import { useLocation } from 'react-router-dom';

const HeaderContent: React.FC = () => {
  const location = useLocation();
  
  // Extraer el nombre de la página actual del path
  const getPageTitle = () => {
    const path = location.pathname.split('/').filter(p => p);
    if (path.length === 0) return 'Inicio';
    
    const lastSegment = path[path.length - 1];
    
    // Mapeo específico para traducir algunos términos en inglés o darles mejor formato
    const titleMap: { [key: string]: string } = {
      'profile': 'Mi Perfil',
      'courses': 'Cursos',
      'my-courses': 'Mis Cursos',
      'settings': 'Configuración',
      'messages': 'Mensajes',
      'calendar': 'Calendario',
      'admin': 'Administración',
      'instructor': 'Instructor'
    };
    
    return titleMap[lastSegment] || 
      (lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).toLowerCase());
  };
  
  return (
    <header className="w-full py-2 px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-20 border-b">
      <div className="container mx-auto flex justify-between items-center h-14">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <SidebarTrigger className="h-8 w-8" />
          <span className="text-lg font-medium">{getPageTitle()}</span>
        </div>
        
        {/* Right side */}
        <div className="flex items-center gap-2">
          <HeaderActions />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default HeaderContent;
