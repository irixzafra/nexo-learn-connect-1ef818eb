
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { useAuth } from '@/contexts/auth';
import RoleSwitcher from '@/components/admin/RoleSwitcher';
import SidebarFooterSection from './SidebarFooterSection';

interface SidebarFooterProps {
  isCollapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isCollapsed }) => {
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

  return (
    <div className="border-t border-border p-3">
      {/* RoleSwitcher - Only visible for admin users */}
      {userRole === 'admin' && (
        <div className={isCollapsed ? "mb-4 flex justify-center" : "mb-4"}>
          <RoleSwitcher className="w-full" />
        </div>
      )}
      
      <SidebarFooterSection
        userRole={userRole as UserRoleType}
        isCollapsed={isCollapsed}
        effectiveRole={effectiveRole as UserRoleType}
        currentViewRole="current"
        handleRoleChange={() => {}}
        getRoleName={getRoleName}
        currentLanguage={currentLanguage}
        languages={languages}
        changeLanguage={changeLanguage}
      />
    </div>
  );
};

export default SidebarFooter;
