
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { UserRoleType } from '@/types/auth';
import { RoleBadge } from './RoleBadge';
import { useUserSearch } from './useUserSearch';
import { RolePopoverContent } from './RolePopoverContent';
import { supabase } from '@/lib/supabase';

export const EnhancedRoleSimulator = () => {
  const { userRole, effectiveRole, isViewingAsOtherRole, setSimulatedRole, resetToOriginalRole } = useAuth();
  const [open, setOpen] = useState(false);
  const { searchQuery, setSearchQuery, userResults } = useUserSearch();
  const [availableRoles, setAvailableRoles] = useState<UserRoleType[]>([]);
  
  // Fetch roles from database
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { data, error } = await supabase
          .from('roles')
          .select('name')
          .order('name', { ascending: true });
          
        if (error) {
          console.error('Error fetching roles:', error);
          return;
        }
        
        if (data) {
          // Map the returned role names to UserRoleType
          const roles = data.map(role => role.name as UserRoleType);
          setAvailableRoles(roles);
        }
      } catch (error) {
        console.error('Error in fetchRoles:', error);
      }
    };
    
    fetchRoles();
  }, []);
  
  // Handle switching to a specific role
  const handleSwitchRole = (role: UserRoleType) => {
    setSimulatedRole(role);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex">
          <RoleBadge 
            role={effectiveRole || ''} 
            isSimulated={isViewingAsOtherRole}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0 rounded-md shadow-md border-0" align="end">
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
          availableRoles={availableRoles}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EnhancedRoleSimulator;
