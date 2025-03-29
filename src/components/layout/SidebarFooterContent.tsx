
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import RoleSwitcher from '@/components/admin/RoleSwitcher';
import UserInfoDisplay from './UserInfoDisplay';
import RoleSwitcherReturnButton from './RoleSwitcherReturnButton';
import { trackRoleSwitch } from '@/lib/sentry';

// This component is used in the AppSidebar
type ViewAsRole = UserRole | 'current';

interface SidebarFooterContentProps {
  viewAsRole: ViewAsRole;
  onRoleChange: (role: UserRole) => void;
}

const SidebarFooterContent: React.FC<SidebarFooterContentProps> = ({ 
  viewAsRole,
  onRoleChange 
}) => {
  const { user, userRole } = useAuth();

  const handleRoleChange = (role: UserRole) => {
    // Track role switch for analytics
    if (userRole) {
      trackRoleSwitch(userRole, role);
    }
    
    onRoleChange(role);
  };

  const isViewingAsOtherRole = viewAsRole !== 'current' && viewAsRole !== userRole;

  return (
    <div className="flex flex-col gap-3">
      {/* Role switcher for admins */}
      {userRole === 'admin' && (
        <div className="px-2">
          <RoleSwitcher 
            currentViewRole={viewAsRole} 
            onChange={handleRoleChange}
          />

          <RoleSwitcherReturnButton 
            isViewingAsOtherRole={isViewingAsOtherRole}
            onRoleChange={handleRoleChange}
            userRole={userRole}
          />
        </div>
      )}
      
      <UserInfoDisplay 
        viewAsRole={viewAsRole}
        onRoleChange={handleRoleChange}
      />
    </div>
  );
};

export default SidebarFooterContent;
