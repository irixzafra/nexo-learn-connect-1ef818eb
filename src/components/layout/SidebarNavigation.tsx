
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { 
  HomeNavigation,
  AprendizajeNavigation,
  ComunidadNavigation,
  EnsenanzaNavigation,
  AdministracionNavigation,
  CuentaNavigation
} from './sidebar/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar/components/sidebar-trigger';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { cn } from '@/lib/utils';

interface SidebarNavigationProps {
  viewAsRole?: string;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ viewAsRole }) => {
  const { userRole } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  // Determine the effective role - refactorado para mayor claridad
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
        aprendizaje: true,
        comunidad: true,
        ensenanza: true,
        administracion: true,
        cuenta: true
      };
    } catch (e) {
      // Fallback defaults if localStorage fails
      return {
        aprendizaje: true,
        comunidad: true,
        ensenanza: true,
        administracion: true,
        cuenta: true
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
  const canSeeEnsenanza = effectiveRole === 'instructor' || effectiveRole === 'admin';
  const canSeeAdmin = effectiveRole === 'admin';

  return (
    <div className={cn(
      "flex flex-col py-2 h-full",
      isCollapsed ? "px-2" : "px-4"
    )}>
      <div className="flex items-center justify-between mb-6 mt-2">
        {!isCollapsed && <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Nexo Academia</h1>}
        <SidebarTrigger className={cn(
          "ml-auto", 
          isCollapsed && "mx-auto"
        )} />
      </div>
      
      {/* Bloque 1: Principal / Acceso Rápido - Siempre visible */}
      <HomeNavigation userRole={effectiveRole} />
      
      {/* Spacer */}
      <div className="h-2" />
      
      {/* Bloque 2: Aprendizaje */}
      <AprendizajeNavigation 
        isOpen={openGroups.aprendizaje} 
        onToggle={() => toggleGroup('aprendizaje')} 
      />
      
      {/* Bloque 3: Comunidad */}
      <ComunidadNavigation 
        isOpen={openGroups.comunidad} 
        onToggle={() => toggleGroup('comunidad')} 
      />
      
      {/* Bloque 4: Enseñanza - Solo visible para instructor o admin */}
      {canSeeEnsenanza && (
        <EnsenanzaNavigation 
          isOpen={openGroups.ensenanza} 
          onToggle={() => toggleGroup('ensenanza')} 
        />
      )}
      
      {/* Bloque 5: Administración - Solo visible para admin */}
      {canSeeAdmin && (
        <AdministracionNavigation 
          isOpen={openGroups.administracion} 
          onToggle={() => toggleGroup('administracion')} 
        />
      )}
      
      {/* Bloque 6: Cuenta */}
      <CuentaNavigation 
        isOpen={openGroups.cuenta} 
        onToggle={() => toggleGroup('cuenta')} 
      />
    </div>
  );
};

export default SidebarNavigation;
