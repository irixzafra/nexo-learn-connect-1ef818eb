
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { UserRoleType } from '@/types/auth';
import { RoleBadge } from './RoleBadge';
import { useUserSearch } from './useUserSearch';
import { RolePopoverContent } from './RolePopoverContent';

export const EnhancedRoleSimulator = () => {
  const { userRole, effectiveRole, isViewingAsOtherRole, setSimulatedRole, resetToOriginalRole } = useAuth();
  const [open, setOpen] = useState(false);
  const { searchQuery, setSearchQuery, userResults } = useUserSearch();
  
  // Handle switching to a specific role
  const handleSwitchRole = (role: UserRoleType) => {
    setSimulatedRole(role);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <RoleBadge 
          role={effectiveRole || ''} 
          isSimulated={isViewingAsOtherRole}
        />
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <RolePopoverContent
          effectiveRole={effectiveRole || ''}
          isViewingAsOtherRole={isViewingAsOtherRole}
          userRole={userRole || ''}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          userResults={userResults}
          handleSwitchRole={handleSwitchRole}
          resetToOriginalRole={resetToOriginalRole}
          handleClose={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EnhancedRoleSimulator;
