
import React from 'react';
import { CommandGroup, CommandItem } from '@/components/ui/command';
import { UserRoleType } from '@/types/auth';
import { getRoleIcon, getRoleName, getRoleBadgeColor } from './roleUtils';
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
  availableRoles = ['admin', 'instructor', 'student', 'moderator', 'beta_tester', 'guest'],
}) => {
  return (
    <CommandGroup heading="Roles disponibles" className="pb-2">
      <div className="grid grid-cols-2 gap-1.5 p-2">
        {availableRoles.map((role) => {
          const isActive = role === effectiveRole;
          
          return (
            <CommandItem
              key={role}
              onSelect={() => handleSwitchRole(role as UserRoleType)}
              className={cn(
                "flex items-center gap-2 text-sm py-2 px-3 rounded-md",
                "transition-all duration-200 border",
                isActive 
                  ? "bg-primary/10 border-primary/20" 
                  : "hover:bg-accent/20 border-transparent hover:border-accent/10"
              )}
            >
              <div className="flex items-center gap-2 flex-1">
                <span className={cn(
                  "flex-shrink-0 w-4 h-4",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {getRoleIcon(role)}
                </span>
                <span className={cn(
                  "text-xs font-medium",
                  isActive && "font-semibold text-primary"
                )}>
                  {getRoleName(role)}
                </span>
              </div>
              {isActive && <Check className="h-3.5 w-3.5 text-primary" />}
            </CommandItem>
          );
        })}
      </div>
    </CommandGroup>
  );
};
