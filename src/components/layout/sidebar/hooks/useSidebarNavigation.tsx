
import { useState, useEffect } from 'react';
import { UserRoleType } from '@/types/auth';
import { getHomePath, getRoleName } from '@/utils/roleUtils';

export const useSidebarNavigation = (
  userRole: UserRoleType, 
  viewAsRole?: 'current' | UserRoleType,
  onRoleChange?: (role: UserRoleType) => void
) => {
  // Estado para el colapso del sidebar
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Estado para el rol de vista actual
  const [currentViewRole, setCurrentViewRole] = useState<'current' | UserRoleType>(viewAsRole || 'current');
  
  // Estado para el idioma actual
  const [currentLanguage, setCurrentLanguage] = useState('es');
  
  // Determinar el rol efectivo basado en la vista actual
  const effectiveRole = currentViewRole === 'current' ? userRole : currentViewRole;
  
  // Manejar cambio de rol
  const handleRoleChange = (newRole: UserRoleType) => {
    setCurrentViewRole(newRole);
    if (onRoleChange) {
      onRoleChange(newRole);
    }
  };
  
  // Cambiar idioma
  const changeLanguage = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  };
  
  // Cargar preferencia de idioma al iniciar
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);
  
  return {
    isCollapsed,
    currentViewRole,
    currentLanguage,
    effectiveRole,
    handleRoleChange,
    getRoleName,
    getHomePath,
    changeLanguage
  };
};
