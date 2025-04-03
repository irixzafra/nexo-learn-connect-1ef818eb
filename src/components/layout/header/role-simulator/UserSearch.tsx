
import React from 'react';
import { UserSearchResult } from './types';
import { CommandSeparator, CommandGroup, CommandItem } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { getRoleIcon, getRoleName, getRoleBadgeColor } from './roleUtils';
import { UserRoleType } from '@/types/auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserSearchProps {
  userResults: UserSearchResult[];
  handleSwitchRole: (role: UserRoleType) => void;
}

export const UserSearch: React.FC<UserSearchProps> = ({ userResults, handleSwitchRole }) => {
  if (userResults.length === 0) {
    return null;
  }

  const getInitials = (name: string): string => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

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
            className="flex items-center gap-2 py-2"
          >
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {getInitials(user.full_name || '')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm truncate">{user.full_name || 'Sin nombre'}</span>
              <span className="text-xs text-muted-foreground truncate">{user.email || 'No email'}</span>
            </div>
            <Badge 
              variant="outline" 
              className={cn(
                "ml-auto text-xs px-1.5 py-0.5", 
                getRoleBadgeColor(user.role || '').replace('bg-', 'border-')
              )}
            >
              {getRoleName(user.role || '')}
            </Badge>
          </CommandItem>
        ))}
      </CommandGroup>
    </>
  );
};
