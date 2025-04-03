
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
}) => {
  // Reset search results when component unmounts
  useEffect(() => {
    return () => {
      setSearchQuery('');
    };
  }, [setSearchQuery]);

  return (
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
          effectiveRole={effectiveRole} 
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
          userRole={userRole} 
          resetToOriginalRole={resetToOriginalRole} 
          handleClose={handleClose} 
        />
      </CommandList>
    </Command>
  );
};
