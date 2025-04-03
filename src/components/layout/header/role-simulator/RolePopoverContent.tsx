
import React, { useEffect } from 'react';
import { Command, CommandInput, CommandList, CommandEmpty } from '@/components/ui/command';
import { UserRoleType } from '@/types/auth';
import { QuickRoleSelector } from './QuickRoleSelector';
import { UserSearch } from './UserSearch';
import { ResetRoleOption } from './ResetRoleOption';
import { UserSearchResult } from './types';

interface RolePopoverContentProps {
  effectiveRole: string;
  isViewingAsOtherRole: boolean;
  userRole: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  userResults: UserSearchResult[];
  handleSwitchRole: (role: UserRoleType) => void;
  resetToOriginalRole: () => void;
  handleClose: () => void;
  availableRoles?: UserRoleType[];
}

export const RolePopoverContent: React.FC<RolePopoverContentProps> = ({
  effectiveRole,
  isViewingAsOtherRole,
  userRole,
  searchQuery,
  setSearchQuery,
  userResults,
  handleSwitchRole,
  resetToOriginalRole,
  handleClose,
  availableRoles = [],
}) => {
  // Reset search results when component unmounts
  useEffect(() => {
    return () => {
      setSearchQuery('');
    };
  }, [setSearchQuery]);

  const handleSelectUser = (userId: string, userRole: string) => {
    if (userRole) {
      handleSwitchRole(userRole as UserRoleType);
    }
  };

  return (
    <Command className="rounded-lg shadow-lg border-none overflow-hidden">
      <CommandInput 
        placeholder="Buscar rol o usuario..." 
        value={searchQuery}
        onValueChange={setSearchQuery}
        className="border-0 focus:ring-1 focus:ring-primary/30 py-3"
      />
      <CommandList className="max-h-[350px] overflow-y-auto px-1">
        <CommandEmpty className="py-4 text-center text-sm text-muted-foreground">
          No se encontraron resultados
        </CommandEmpty>
        
        {/* Quick role selection */}
        <QuickRoleSelector 
          effectiveRole={effectiveRole} 
          handleSwitchRole={handleSwitchRole} 
          availableRoles={availableRoles}
          handleClose={handleClose}
        />
        
        {/* User search results */}
        <UserSearch 
          onSelectUser={handleSelectUser} 
          handleClose={handleClose} 
        />
        
        {/* Reset option when viewing as another role */}
        <ResetRoleOption 
          isViewingAsOtherRole={isViewingAsOtherRole} 
          userRole={userRole} 
          resetToOriginalRole={resetToOriginalRole} 
          handleClose={handleClose} 
        />
      </CommandList>
    </Command>
  );
};
