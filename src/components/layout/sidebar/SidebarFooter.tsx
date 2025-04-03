
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { useAuth } from '@/contexts/auth';
import SidebarFooterSection from './SidebarFooterSection';

interface SidebarFooterProps {
  isCollapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isCollapsed }) => {
  console.log('>>> DEBUG SidebarFooter RENDERING');
  const { 
    userRole, 
    effectiveRole, 
    logout, 
    setSimulatedRole, 
    resetToOriginalRole, 
    isViewingAsOtherRole,
    forceUpdateRole
  } = useAuth();

  // Get role name function
  const getRoleName = (role: UserRoleType): string => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'instructor':
        return 'Instructor';
      case 'student':
        return 'Estudiante';
      case 'sistemas':
        return 'Sistemas';
      case 'moderator':
        return 'Moderador';
      case 'content_creator':
        return 'Creador de Contenido';
      case 'guest':
        return 'Invitado';
      case 'anonimo':
        return 'Anónimo';
      default:
        return role;
    }
  };

  // Handler para cambio de rol
  const handleRoleChange = (role: UserRoleType) => {
    console.log('>>> DEBUG SidebarFooter: Changing role to', role);
    setSimulatedRole(role);
  };

  // Handler para volver al rol original
  const handleResetRole = () => {
    console.log('>>> DEBUG SidebarFooter: Resetting to original role');
    resetToOriginalRole();
  };

  // Handler for forcing admin role
  const handleForceAdminRole = async () => {
    console.log('>>> DEBUG SidebarFooter: Forcing admin role');
    await forceUpdateRole('admin@nexo.com', 'admin');
  };

  // Mock data for language selector
  const currentLanguage = 'es';
  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
  ];
  const changeLanguage = (lang: string) => console.log('Change language to', lang);

  console.log('>>> DEBUG SidebarFooter: About to render SidebarFooterSection with props:', { 
    userRoleProp: userRole, 
    isCollapsedProp: isCollapsed,
    effectiveRoleProp: effectiveRole,
    currentLanguageProp: currentLanguage,
    languagesProp: languages,
    isViewingAsOtherRole
  });

  // Usamos useEffect para el log después del renderizado
  React.useEffect(() => {
    console.log('>>> DEBUG SidebarFooter: Finished rendering SidebarFooterSection');
  }, []);

  return (
    <div className="border-t border-border p-3">
      <SidebarFooterSection
        userRole={userRole as UserRoleType}
        isCollapsed={isCollapsed}
        effectiveRole={effectiveRole as UserRoleType}
        currentViewRole={effectiveRole as UserRoleType}
        handleRoleChange={handleRoleChange}
        getRoleName={getRoleName}
        currentLanguage={currentLanguage}
        languages={languages}
        changeLanguage={changeLanguage}
        logout={logout}
        resetToOriginalRole={handleResetRole}
        isViewingAsOtherRole={isViewingAsOtherRole}
        forceAdminRole={handleForceAdminRole}
      />
    </div>
  );
};

export default SidebarFooter;
