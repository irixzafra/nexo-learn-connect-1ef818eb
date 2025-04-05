
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { UserRoleType } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
import { getHomePathByRole } from '@/config/navigation/roleBasedNavigation';
import { useInlineEditor } from '@/contexts/InlineEditorContext';

export const useSidebarNavigation = (
  userRole: UserRoleType,
  viewAsRole?: UserRoleType | null,
  onRoleChange?: (role: UserRoleType) => void
) => {
  const navigate = useNavigate();
  const { state, setState } = useSidebar();
  const { userRole: currentRole } = useAuth();
  const { isEditModeEnabled } = useInlineEditor();
  
  const [currentLanguage, setCurrentLanguage] = useState<string>('es');
  const [currentViewRole, setCurrentViewRole] = useState<UserRoleType | null>(viewAsRole || null);
  
  const isCollapsed = state === "collapsed";

  const changeLanguage = useCallback((lang: string) => {
    setCurrentLanguage(lang);
    // Lógica para cambiar el idioma en la aplicación
    console.log(`Cambiando idioma a: ${lang}`);
  }, []);
  
  // Callback para cambiar el rol visualizado
  const handleRoleChange = useCallback((role: UserRoleType) => {
    setCurrentViewRole(role);
    
    // Notificar al componente padre si existe un handler
    if (onRoleChange) {
      onRoleChange(role);
    }
    
    // Navegar a la página de inicio correspondiente al rol
    const homePath = getHomePathByRole(role);
    navigate(homePath);
    
  }, [navigate, onRoleChange]);

  // Efecto para actualizar el rol actual cuando cambia externamente
  useEffect(() => {
    if (viewAsRole !== undefined && viewAsRole !== currentViewRole) {
      setCurrentViewRole(viewAsRole);
    }
  }, [viewAsRole, currentViewRole]);

  // Si estamos en modo edición, asegurarse de que la barra lateral esté expandida
  useEffect(() => {
    if (isEditModeEnabled && isCollapsed) {
      setState("expanded");
    }
  }, [isEditModeEnabled, isCollapsed, setState]);

  return {
    isCollapsed,
    currentViewRole,
    currentLanguage,
    changeLanguage,
    handleRoleChange
  };
};

export default useSidebarNavigation;
