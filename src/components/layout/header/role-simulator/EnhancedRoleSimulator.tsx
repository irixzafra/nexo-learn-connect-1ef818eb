
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { Command, CommandEmpty, CommandInput, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { UserRoleType } from '@/types/auth';
import { RoleBadge } from './RoleBadge';
import { QuickRoleSelector } from './QuickRoleSelector';
import { UserSearch } from './UserSearch';
import { ResetRoleOption } from './ResetRoleOption';
import { useUserSearch } from './useUserSearch';

export const EnhancedRoleSimulator = () => {
  const { userRole, effectiveRole, isViewingAsOtherRole, setSimulatedRole, resetToOriginalRole } = useAuth();
  const [open, setOpen] = useState(false);
  const { searchQuery, setSearchQuery, userResults, isSearching } = useUserSearch();
  
  // Handle switching to a specific role
  const handleSwitchRole = (role: UserRoleType) => {
    setSimulatedRole(role);
    setOpen(false);
  };

  // Reset search results when popover closes
  useEffect(() => {
    if (!open) {
      setSearchQuery('');
    }
  }, [open, setSearchQuery]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <RoleBadge 
          role={effectiveRole || ''} 
          isSimulated={isViewingAsOtherRole}
        />
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Command>
          <CommandInput 
            placeholder="Buscar rol o usuario..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>No se encontraron resultados</CommandEmpty>
            
            {/* Quick role selection */}
            <QuickRoleSelector 
              effectiveRole={effectiveRole || ''} 
              handleSwitchRole={handleSwitchRole} 
            />
            
            {/* User search results */}
            <UserSearch 
              userResults={userResults} 
              handleSwitchRole={handleSwitchRole} 
            />
            
            {/* Reset option when viewing as another role */}
            <ResetRoleOption 
              isViewingAsOtherRole={isViewingAsOtherRole} 
              userRole={userRole || ''} 
              resetToOriginalRole={resetToOriginalRole} 
              handleClose={() => setOpen(false)} 
            />
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default EnhancedRoleSimulator;
