
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
        // First try to get roles from the roles table
        let { data, error } = await supabase
          .from('roles')
          .select('name')
          .order('name', { ascending: true });
          
        if (error || !data || data.length === 0) {
          // If no roles table or no data, fall back to getting distinct roles from profiles
          const { data: profileRoles, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .limit(20);
            
          if (!profileError && profileRoles && profileRoles.length > 0) {
            // Extract unique roles from profiles
            const uniqueRoles = [...new Set(profileRoles.map(p => p.role))];
            setAvailableRoles(uniqueRoles as UserRoleType[]);
          } else {
            // Fallback to default roles
            setAvailableRoles(['admin', 'instructor', 'student', 'sistemas', 'moderator', 'content_creator', 'guest']);
          }
        } else {
          // Use roles from the roles table
          setAvailableRoles(data.map(role => role.name as UserRoleType));
        }
      } catch (error) {
        console.error('Error in fetchRoles:', error);
        // Fallback to default roles
        setAvailableRoles(['admin', 'instructor', 'student', 'sistemas', 'moderator', 'content_creator', 'guest']);
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
        <div className="flex items-center">
          <RoleBadge 
            role={effectiveRole || ''} 
            isSimulated={isViewingAsOtherRole}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0 rounded-md shadow-md border border-muted/30" align="end">
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
