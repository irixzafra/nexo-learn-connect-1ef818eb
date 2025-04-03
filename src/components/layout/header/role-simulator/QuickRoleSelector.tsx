
import React from 'react';
import { CommandGroup, CommandItem } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { UserRoleType } from '@/types/auth';
import { availableRoles, getRoleIcon, getRoleName } from './roleUtils';

interface QuickRoleSelectorProps {
  effectiveRole: string;
  handleSwitchRole: (role: UserRoleType) => void;
}

export const QuickRoleSelector: React.FC<QuickRoleSelectorProps> = ({ 
  effectiveRole, 
  handleSwitchRole 
}) => {
  return (
    <CommandGroup heading="Cambiar a rol">
      {availableRoles.map((role) => (
        <CommandItem
          key={role}
          onSelect={() => handleSwitchRole(role)}
          className="flex items-center gap-2"
        >
          {getRoleIcon(role)}
          <span>{getRoleName(role)}</span>
          {role === effectiveRole && 
            <Badge variant="outline" className="ml-auto text-xs">Actual</Badge>
          }
        </CommandItem>
      ))}
    </CommandGroup>
  );
};
