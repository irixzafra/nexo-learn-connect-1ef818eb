
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { useAuth } from '@/contexts/auth';
import SidebarFooterSection from './SidebarFooterSection';

interface SidebarFooterProps {
  isCollapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isCollapsed }) => {
  console.log('>>> DEBUG SidebarFooter RENDERING');
  const { userRole, effectiveRole } = useAuth();

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
      default:
        return role;
    }
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
    languagesProp: languages
  });

  return (
    <div className="border-t border-border p-3">
      <SidebarFooterSection
        userRole={userRole as UserRoleType}
        isCollapsed={isCollapsed}
        effectiveRole={effectiveRole as UserRoleType}
        currentViewRole={null}
        handleRoleChange={() => {}}
        getRoleName={getRoleName}
        currentLanguage={currentLanguage}
        languages={languages}
        changeLanguage={changeLanguage}
      />
      {/* Use a React fragment with an effect instead of inline console.log */}
      {React.useEffect(() => {
        console.log('>>> DEBUG SidebarFooter: Finished rendering SidebarFooterSection');
      }, [])}
    </div>
  );
};

export default SidebarFooter;
