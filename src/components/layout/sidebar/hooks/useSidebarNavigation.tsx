
import { useState, useEffect } from 'react';
import { UserRoleType } from '@/types/auth';
import { getHomePath, getRoleName } from '@/utils/roleUtils';
import { useToast } from '@/components/ui/use-toast';

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
  
  // Toast notifications
  const { toast } = useToast();
  
  // Load saved view role preference
  useEffect(() => {
    const savedViewRole = localStorage.getItem('viewAsRole');
    if (savedViewRole) {
      setCurrentViewRole(savedViewRole as UserRoleType);
    }
  }, []);
  
  // Determinar el rol efectivo basado en la vista actual
  const effectiveRole = currentViewRole === 'current' ? userRole : currentViewRole;
  
  // Manejar cambio de rol
  const handleRoleChange = (newRole: UserRoleType) => {
    console.log(`Changing role from ${effectiveRole} to ${newRole}`);
    setCurrentViewRole(newRole);
    
    // Save preference to localStorage
    localStorage.setItem('viewAsRole', newRole);
    
    // Call the provided callback
    if (onRoleChange) {
      onRoleChange(newRole);
    }
    
    // Show toast notification
    toast({
      title: "Rol cambiado",
      description: `Ahora estás viendo la aplicación como ${getRoleName(newRole)}`,
    });
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
