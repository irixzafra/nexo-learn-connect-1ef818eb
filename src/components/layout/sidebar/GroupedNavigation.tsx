
import React from 'react';
import { UserRole } from '@/types/auth';
import { 
  HomeNavigation,
  SistemasNavigation,
  AprendizajeNavigation,
  ComunidadNavigation,
  GestionNavigation,
  CuentaNavigation
} from './navigation';

interface GroupedNavigationProps {
  viewAsRole?: string;
}

const GroupedNavigation: React.FC<GroupedNavigationProps> = ({ viewAsRole }) => {
  // Retrieve previous state from localStorage or use defaults
  const savedState = localStorage.getItem('sidebarGroups');
  const initialState = savedState ? JSON.parse(savedState) : {
    aprendizaje: true,
    comunidad: false,
    gestion: true,
    sistemas: true,
    cuenta: false
  };

  const [openGroups, setOpenGroups] = React.useState(initialState);

  // Save state to localStorage when it changes
  React.useEffect(() => {
    localStorage.setItem('sidebarGroups', JSON.stringify(openGroups));
  }, [openGroups]);

  const toggleGroup = (group: keyof typeof openGroups) => {
    setOpenGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Inicio - Siempre visible */}
      <HomeNavigation />
      
      {/* Grupo Sistemas */}
      <SistemasNavigation 
        isOpen={openGroups.sistemas} 
        onToggle={() => toggleGroup('sistemas')} 
      />
      
      {/* Grupo Aprendizaje */}
      <AprendizajeNavigation 
        isOpen={openGroups.aprendizaje} 
        onToggle={() => toggleGroup('aprendizaje')} 
      />
      
      {/* Grupo Comunidad */}
      <ComunidadNavigation 
        isOpen={openGroups.comunidad} 
        onToggle={() => toggleGroup('comunidad')} 
      />
      
      {/* Grupo Gestión - Solo visible para instructor o admin */}
      {(viewAsRole === 'instructor' || viewAsRole === 'admin') && (
        <GestionNavigation 
          isOpen={openGroups.gestion} 
          onToggle={() => toggleGroup('gestion')} 
          role={viewAsRole as UserRole}
        />
      )}
      
      {/* Grupo Cuenta */}
      <CuentaNavigation 
        isOpen={openGroups.cuenta} 
        onToggle={() => toggleGroup('cuenta')} 
      />
    </div>
  );
};

export default GroupedNavigation;
