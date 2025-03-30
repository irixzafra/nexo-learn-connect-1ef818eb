
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { UserProfile, UserRoleType, toUserRoleType } from '@/types/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { UserRoleSwitcher } from './UserRoleSwitcher';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

interface UserRoleSearchProps {
  onClose?: () => void;
}

export const UserRoleSearch: React.FC<UserRoleSearchProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      // Search for users by name or email (assuming email might be stored in profiles)
      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .ilike('full_name', `%${searchTerm}%`);
      
      if (error) throw error;
      
      // Ensure all roles are valid UserRoleType
      const typedData = data?.map(user => ({
        ...user,
        role: toUserRoleType(user.role)
      })) || [];
      
      setUsers(typedData);
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

      // Update local state with properly typed data
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

  const getRoleBadgeVariant = (role: UserRoleType) => {
    switch (role) {
      case 'admin': return "bg-yellow-100 text-yellow-800";
      case 'instructor': return "bg-blue-100 text-blue-800";
      case 'sistemas': return "bg-purple-100 text-purple-800";
      case 'student': return "bg-green-100 text-green-800";
      case 'anonimo': return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nombre..."
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
      </div>

      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : hasSearched ? (
        users.length > 0 ? (
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Rol actual</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.full_name || 'Sin nombre'}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={getRoleBadgeVariant(user.role)}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <UserRoleSwitcher
                        userId={user.id}
                        currentRole={user.role}
                        onRoleChange={handleRoleChange}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No se encontraron usuarios con ese nombre
          </div>
        )
      ) : null}

      <div className="flex justify-end pt-2">
        <Button variant="outline" onClick={onClose}>
          <X className="h-4 w-4 mr-2" />
          Cerrar
        </Button>
      </div>
    </div>
  );
};
