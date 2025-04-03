
import React from 'react';
import { UserSearchResult } from './types';
import { CommandSeparator, CommandGroup, CommandItem } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { getRoleIcon, getRoleName } from './roleUtils';
import { UserRoleType } from '@/types/auth';

interface UserSearchProps {
  userResults: UserSearchResult[];
  handleSwitchRole: (role: UserRoleType) => void;
}

export const UserSearch: React.FC<UserSearchProps> = ({ userResults, handleSwitchRole }) => {
  if (userResults.length === 0) {
    return null;
  }

  return (
    <>
      <CommandSeparator />
      <CommandGroup heading="Usuarios encontrados">
        {userResults.map((user) => (
          <CommandItem
            key={user.id}
            onSelect={() => {
              // Simulate this user's role
              if (user.role) {
                handleSwitchRole(user.role as UserRoleType);
              }
            }}
            className="flex items-center gap-2"
          >
            {getRoleIcon(user.role)}
            <div className="flex flex-col">
              <span className="text-sm">{user.full_name}</span>
              <span className="text-xs text-muted-foreground">{user.email || 'No email'}</span>
            </div>
            <Badge variant="outline" className="ml-auto text-xs">
              {getRoleName(user.role)}
            </Badge>
          </CommandItem>
        ))}
      </CommandGroup>
    </>
  );
};
