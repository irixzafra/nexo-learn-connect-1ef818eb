
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { 
  HomeNavigation,
  AprendizajeNavigation,
  ComunidadNavigation,
  EnsenanzaNavigation,
  AdministracionNavigation,
  CuentaNavigation,
  SistemasNavigation
} from './sidebar/navigation';

interface SidebarNavigationProps {
  viewAsRole?: string;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ viewAsRole }) => {
  const { userRole } = useAuth();
  
  // Determine the effective role
  const effectiveRole = viewAsRole && viewAsRole !== 'current' ? viewAsRole as UserRole : userRole;
  
  // Retrieve previous state from localStorage or use defaults
  const getSavedState = () => {
    try {
      const savedState = localStorage.getItem('sidebarGroups');
      return savedState ? JSON.parse(savedState) : {
        aprendizaje: true,
        comunidad: true,
        ensenanza: true,
        administracion: true,
        cuenta: true,
        sistemas: true
      };
    } catch (e) {
      // Fallback defaults if localStorage fails
      return {
        aprendizaje: true,
        comunidad: true,
        ensenanza: true,
        administracion: true,
        cuenta: true,
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
  const canSeeEnsenanza = effectiveRole === 'instructor' || effectiveRole === 'admin';
  const canSeeAdmin = effectiveRole === 'admin';
  const canSeeSistemas = effectiveRole === 'sistemas' || effectiveRole === 'admin';

  return (
    <div className="flex flex-col py-2">
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
      
      {/* Bloque 7: Sistemas - Solo visible para admin o sistemas */}
      {canSeeSistemas && (
        <SistemasNavigation 
          isOpen={openGroups.sistemas} 
          onToggle={() => toggleGroup('sistemas')} 
        />
      )}
    </div>
  );
};

export default SidebarNavigation;
