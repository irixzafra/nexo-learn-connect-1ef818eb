
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { UserProfile, UserRoleType } from '@/types/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserRoleSwitcher } from './UserRoleSwitcher';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface UserSearchProps {
  onClose?: () => void;
  className?: string;
}

export const UserSearch: React.FC<UserSearchProps> = ({ onClose, className }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Search handler for dynamically loading users as you type
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim().length >= 2) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      // Search for users by name or email
      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .or(`full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)
        .limit(10);
      
      if (error) throw error;
      
      setUsers(data || []);
    } catch (error) {
      console.error('Error searching for users:', error);
      toast.error('Error al buscar usuarios');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: UserRoleType) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) {
        throw error;
      }

      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, role: newRole } : user
        )
      );

      toast.success(`Rol de usuario actualizado a ${newRole}`);
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Error al actualizar el rol del usuario');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getInitials = (name: string | null): string => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-8"
            autoFocus
          />
        </div>
        <Button onClick={handleSearch} disabled={isLoading || !searchTerm.trim()}>
          {isLoading ? 'Buscando...' : 'Buscar'}
        </Button>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : hasSearched ? (
        users.length > 0 ? (
          <ScrollArea className="h-[250px]">
            <div className="space-y-2">
              {users.map(user => (
                <div key={user.id} className="flex items-center justify-between border p-2 rounded-md">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{getInitials(user.full_name)}</AvatarFallback>
                      <AvatarImage src={user.avatar_url} />
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.full_name || 'Sin nombre'}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <UserRoleSwitcher
                    userId={user.id}
                    currentRole={user.role}
                    onRoleChange={handleRoleChange}
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No se encontraron usuarios con ese nombre o email
          </div>
        )
      ) : null}
    </div>
  );
};
