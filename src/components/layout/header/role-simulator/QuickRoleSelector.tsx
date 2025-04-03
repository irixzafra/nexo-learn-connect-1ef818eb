
import React from 'react';
import { CommandSeparator, CommandGroup, CommandItem } from '@/components/ui/command';
import { UserRoleType } from '@/types/auth';
import { Shield, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRoleName } from './roleUtils';

interface QuickRoleSelectorProps {
  effectiveRole: string;
  handleSwitchRole: (role: UserRoleType) => void;
  handleClose: () => void;
  availableRoles?: UserRoleType[];
}

export const QuickRoleSelector: React.FC<QuickRoleSelectorProps> = ({
  effectiveRole,
  handleSwitchRole,
  handleClose,
  availableRoles = ['admin', 'instructor', 'student', 'moderator', 'content_creator']
}) => {
  // Filter out current role
  const roleOptions = availableRoles.filter(role => role !== effectiveRole);

  if (roleOptions.length === 0) {
    return null;
  }

  return (
    <>
      <CommandGroup heading="Cambiar a rol">
        {roleOptions.map((role) => (
          <CommandItem
            key={role}
            onSelect={() => {
              handleSwitchRole(role);
              handleClose();
            }}
            className="flex items-center gap-3 py-3 px-3 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              {role === 'admin' ? (
                <Shield className="h-4 w-4 text-primary" />
              ) : (
                <User className="h-4 w-4 text-primary" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{role}</span>
              <span className="text-xs text-muted-foreground">{getRoleName(role)}</span>
            </div>
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandSeparator className="my-2" />
    </>
  );
};
