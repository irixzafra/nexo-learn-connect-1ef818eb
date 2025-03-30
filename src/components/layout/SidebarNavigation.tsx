
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import {
  HomeNavigation,
  CursosNavigation,
  ComunidadNavigation,
  AdministracionNavigation,
  PerfilNavigation,
  ConfiguracionNavigation,
  SistemasNavigation
} from './sidebar/navigation';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { cn } from '@/lib/utils';
import { useNotifications } from '@/hooks/useNotifications';

interface SidebarNavigationProps {
  viewAsRole?: 'current' | UserRole;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ viewAsRole }) => {
  const { userRole } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { unreadCount: notificationsCount } = useNotifications();
  const messagesCount = 0; // Placeholder - should be replaced with actual unread message count from a hook
  
  // Determine the effective role
  const getEffectiveRole = (): UserRole => {
    if (!viewAsRole || viewAsRole === 'current') {
      return userRole as UserRole;
    }
    return viewAsRole as UserRole;
  };
  
  const effectiveRole = getEffectiveRole();
  
  // Retrieve previous state from localStorage or use defaults
  const getSavedState = () => {
    try {
      const savedState = localStorage.getItem('sidebarGroups');
      return savedState ? JSON.parse(savedState) : {
        home: true,
        cursos: true,
        comunidad: true,
        administracion: true,
        perfil: true,
        configuracion: true,
        sistemas: true
      };
    } catch (e) {
      // Fallback defaults if localStorage fails
      return {
        home: true,
        cursos: true,
        comunidad: true,
        administracion: true,
        perfil: true,
        configuracion: true,
        sistemas: true
      };
    }
  };

  const [openGroups, setOpenGroups] = React.useState(getSavedState());

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarGroups', JSON.stringify(openGroups));
  }, [openGroups]);

  const toggleGroup = (group: keyof typeof openGroups) => {
    setOpenGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  // Check if a role should see specific sections
  const canSeeAdmin = effectiveRole === 'admin' || effectiveRole === 'instructor';
  const canSeeSistemas = effectiveRole === 'admin' || effectiveRole === 'sistemas';

  return (
    <div className="h-full flex flex-col py-4">
      {/* Logo at the top will be handled by the header in mobile view */}
      
      <div className={cn(
        "flex-1 overflow-auto",
        isCollapsed ? "px-2" : "px-4"
      )}>
        {/* Inicio */}
        <HomeNavigation 
          isOpen={openGroups.home} 
          onToggle={() => toggleGroup('home')}
          userRole={effectiveRole}
        />
        
        {/* Cursos */}
        <CursosNavigation 
          isOpen={openGroups.cursos} 
          onToggle={() => toggleGroup('cursos')} 
        />
        
        {/* Comunidad */}
        <ComunidadNavigation 
          isOpen={openGroups.comunidad} 
          onToggle={() => toggleGroup('comunidad')} 
          messagesCount={messagesCount}
        />
        
        {/* Administración - Solo visible para admin o instructor */}
        {canSeeAdmin && (
          <AdministracionNavigation 
            isOpen={openGroups.administracion} 
            onToggle={() => toggleGroup('administracion')} 
          />
        )}
        
        {/* Sistemas - Solo visible para admin o sistemas */}
        {canSeeSistemas && (
          <SistemasNavigation 
            isOpen={openGroups.sistemas} 
            onToggle={() => toggleGroup('sistemas')} 
          />
        )}
        
        {/* Perfil */}
        <PerfilNavigation 
          isOpen={openGroups.perfil} 
          onToggle={() => toggleGroup('perfil')} 
          notificationsCount={notificationsCount}
        />
        
        {/* Configuración */}
        <ConfiguracionNavigation 
          isOpen={openGroups.configuracion} 
          onToggle={() => toggleGroup('configuracion')} 
        />
      </div>
      
      <div className="mt-auto pt-4 border-t px-4">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Nexo Academia © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default SidebarNavigation;
