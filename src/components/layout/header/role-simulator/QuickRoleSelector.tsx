
import React from 'react';
import { CommandGroup, CommandItem } from '@/components/ui/command';
import { UserRoleType } from '@/types/auth';
import { getRoleIcon, getRoleName, getRoleBadgeColor } from './roleUtils';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

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
      <div className="grid grid-cols-2 gap-1 p-2">
        {availableRoles.map((role) => {
          const isActive = role === effectiveRole;
          const badgeColor = getRoleBadgeColor(role).replace('bg-', '');
          
          return (
            <CommandItem
              key={role}
              onSelect={() => handleSwitchRole(role as UserRoleType)}
              className={cn(
                "flex items-center gap-2 text-sm py-2 px-2 rounded-md",
                isActive ? "bg-accent/30" : "hover:bg-accent/10"
              )}
            >
              <div className="flex items-center gap-2 flex-1">
                <span className="flex-shrink-0 w-4 h-4 text-muted-foreground">
                  {getRoleIcon(role)}
                </span>
                <span className="text-xs font-medium">{getRoleName(role)}</span>
              </div>
              {isActive && <Check className="h-3 w-3 text-primary" />}
            </CommandItem>
          );
        })}
      </div>
    </CommandGroup>
  );
};
