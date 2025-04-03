
import React from 'react';
import { CommandGroup, CommandItem } from '@/components/ui/command';
import { UserRoleType } from '@/types/auth';
import { getRoleIcon, getRoleName } from './roleUtils';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickRoleSelectorProps {
  effectiveRole: string;
  handleSwitchRole: (role: UserRoleType) => void;
  availableRoles?: UserRoleType[];
}

export const QuickRoleSelector: React.FC<QuickRoleSelectorProps> = ({ 
  effectiveRole, 
  handleSwitchRole,
  availableRoles = ['admin', 'instructor', 'student', 'sistemas', 'moderator', 'content_creator', 'guest'],
}) => {
  return (
    <CommandGroup heading="Roles disponibles">
      {availableRoles.map((role) => {
        const isActive = role === effectiveRole;
        return (
          <CommandItem
            key={role}
            onSelect={() => handleSwitchRole(role as UserRoleType)}
            className={cn(
              "flex items-center gap-2 text-sm py-2",
              isActive ? "bg-accent/30" : ""
            )}
          >
            <div className="flex items-center gap-2 flex-1">
              <span className="flex-shrink-0 w-4 h-4 text-muted-foreground">
                {getRoleIcon(role)}
              </span>
              <span>{getRoleName(role)}</span>
            </div>
            {isActive && <Check className="h-4 w-4 text-primary" />}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
};
