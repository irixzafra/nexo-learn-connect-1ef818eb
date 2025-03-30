
import React from 'react';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { RoleIndicator } from '../../layout/header/RoleIndicator';
import { LanguageSelector } from '../../shared/LanguageSelector';

// Types for SidebarFooterSection
interface SidebarFooterSectionProps {
  userRole: UserRoleType;
  isCollapsed: boolean;
  effectiveRole: UserRoleType;
  currentViewRole: 'current' | UserRoleType;
  handleRoleChange: (role: UserRoleType) => void;
  getRoleName: (role: UserRoleType) => string;
  currentLanguage: string;
  languages: { code: string; name: string }[];
  changeLanguage: (code: string) => void;
}

const SidebarFooterSection: React.FC<SidebarFooterSectionProps> = ({
  userRole,
  isCollapsed,
  effectiveRole,
  currentViewRole,
  handleRoleChange,
  getRoleName,
  currentLanguage,
  languages,
  changeLanguage
}) => {
  const isViewingAsOtherRole = currentViewRole !== 'current' && toUserRoleType(currentViewRole) !== userRole;
  
  // If sidebar is collapsed, show only minimal UI
  if (isCollapsed) {
    return (
      <div className="mt-auto flex flex-col items-center gap-2">
        {userRole === 'admin' && (
          <RoleIndicator 
            viewingAs={currentViewRole} 
            onRoleChange={handleRoleChange}
          />
        )}
      </div>
    );
  }
  
  // If sidebar is expanded, show full UI
  return (
    <div className="mt-auto flex flex-col gap-3">
      
      {/* Role Switcher - Only visible for admins */}
      {userRole === 'admin' && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-muted-foreground">Vista previa como:</span>
          </div>
          
          <div className="flex flex-col space-y-1">
            {['admin', 'instructor', 'student', 'sistemas', 'anonimo'].map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role as UserRoleType)}
                className={`w-full text-left p-2 rounded-md text-sm ${
                  effectiveRole === role 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'hover:bg-accent text-foreground/80 hover:text-foreground'
                }`}
              >
                {getRoleName(role as UserRoleType)}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Language Selector */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-muted-foreground">Idioma:</span>
        </div>
        
        <LanguageSelector 
          currentLanguage={currentLanguage} 
          languages={languages} 
          onChange={changeLanguage} 
        />
      </div>
    </div>
  );
};

export default SidebarFooterSection;
