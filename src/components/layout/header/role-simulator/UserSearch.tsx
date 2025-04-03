
import React from 'react';
import { 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Loader2, UserIcon } from 'lucide-react';
import { useUserSearch } from './useUserSearch';
import { cn } from '@/lib/utils';
import { getRoleBadgeColor } from './roleUtils';

interface UserSearchProps {
  onSelectUser: (userId: string, userRole: string) => void;
  handleClose: () => void;
}

export const UserSearch: React.FC<UserSearchProps> = ({ 
  onSelectUser,
  handleClose
}) => {
  const { searchQuery, setSearchQuery, userResults, isSearching } = useUserSearch();

  return (
    <div className="py-2">
      <CommandInput
        placeholder="Buscar usuario por nombre o email..."
        value={searchQuery}
        onValueChange={setSearchQuery}
        className="h-9 px-3"
      />
      
      <CommandList className="mt-2 max-h-[300px]">
        <CommandEmpty className="py-6">
          {isSearching ? (
            <div className="flex flex-col items-center justify-center text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin mb-2" />
              <p>Buscando usuarios...</p>
            </div>
          ) : (
            searchQuery.length > 0 ? (
              <p className="text-sm text-muted-foreground">No se encontraron usuarios.</p>
            ) : (
              <p className="text-sm text-muted-foreground">Comienza a escribir para buscar usuarios.</p>
            )
          )}
        </CommandEmpty>
        
        {userResults.length > 0 && (
          <CommandGroup heading="Resultados">
            {userResults.map((user) => (
              <CommandItem
                key={user.id}
                onSelect={() => {
                  if (user.role) {
                    onSelectUser(user.id, user.role);
                    handleClose();
                  }
                }}
                className={cn(
                  "flex items-center gap-2 cursor-pointer py-2 px-1",
                  "hover:bg-accent hover:text-accent-foreground rounded-md transition-colors",
                  "border-l-2 border-transparent hover:border-l-primary"
                )}
                disabled={!user.role}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-medium truncate">
                    {user.full_name || 'Usuario sin nombre'}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {user.email || 'Sin email'}
                  </span>
                </div>
                
                {user.role ? (
                  <Badge className={cn(
                    "ml-auto px-2 py-0.5 text-xs",
                    getRoleBadgeColor(user.role)
                  )}>
                    {user.role}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="ml-auto px-2 py-0.5 text-xs">
                    Sin rol
                  </Badge>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </div>
  );
};
