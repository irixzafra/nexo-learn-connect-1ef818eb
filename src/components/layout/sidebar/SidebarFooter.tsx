
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { useAuth } from '@/contexts/auth';
import SidebarFooterSection from './SidebarFooterSection';
import { LanguageSelector } from '@/components/shared/LanguageSelector';
import { useLanguage, SupportedLanguage } from '@/contexts/LanguageContext';
import EnhancedRoleSimulator from '@/components/layout/header/role-simulator/EnhancedRoleSimulator';

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

  const { currentLanguage, changeLanguage } = useLanguage();

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
    if (forceUpdateRole) {
      await forceUpdateRole('admin@nexo.com', 'admin');
    }
  };

  // Language options
  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' }
  ];

  console.log('>>> DEBUG SidebarFooter: About to render with language:', currentLanguage);

  return (
    <div className="border-t border-border p-3">
      <div className="space-y-2">
        {/* Role Switcher - Only for admins */}
        {userRole === 'admin' && (
          <div className={`mb-2 pb-2 border-b border-border ${isCollapsed ? 'px-2' : 'px-4'}`}>
            <EnhancedRoleSimulator />
          </div>
        )}

        {/* Language Selector */}
        <div className={`${isCollapsed ? 'text-center' : ''}`}>
          <LanguageSelector 
            currentLanguage={currentLanguage as SupportedLanguage}
            languages={languages}
            onChange={changeLanguage}
          />
        </div>

        {/* Logout and other footer actions */}
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
    </div>
  );
};

export default SidebarFooter;
