
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
    forceUpdateRole,
    isViewingAsOtherRole,
    resetToOriginalRole
  } = useAuth();

  console.log('>>> DEBUG SidebarFooter AUTH VALUES:', { 
    userRole, 
    effectiveRole, 
    userRoleType: typeof userRole,
    userRoleExactValue: JSON.stringify(userRole),
  });

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
    userRoleType: typeof userRole
  });

  return (
    <div className="border-t border-border p-3">
      <SidebarFooterSection
        userRole={userRole as UserRoleType}
        isCollapsed={isCollapsed}
        effectiveRole={effectiveRole as UserRoleType}
        currentLanguage={currentLanguage}
        languages={languages}
        changeLanguage={changeLanguage}
        logout={logout}
        isViewingAsOtherRole={isViewingAsOtherRole}
        resetToOriginalRole={resetToOriginalRole}
        forceAdminRole={handleForceAdminRole}
      />
    </div>
  );
};

export default SidebarFooter;
