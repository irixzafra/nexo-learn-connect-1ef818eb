
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Search, User, Shield, UserCog } from 'lucide-react';
import { UserRole } from '@/types/auth';
import UserRoleEditor from '@/components/admin/UserRoleEditor';
import { Badge } from '@/components/ui/badge';

interface UserResult {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
}

// Define a type for the user data returned from Supabase Auth API
interface SupabaseUser {
  id: string;
  email: string;
  [key: string]: any; // For any other properties
}

interface SupabaseUsersResponse {
  users?: SupabaseUser[];
  [key: string]: any; // For any other properties
}

interface UserRoleSearchProps {
  onClose?: () => void;
}

export const UserRoleSearch: React.FC<UserRoleSearchProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<UserResult[]>([]);
  const { toast } = useToast();

  // Effect to handle dynamic search as user types
  useEffect(() => {
    const searchUsers = async () => {
      if (!searchTerm || searchTerm.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      
      try {
        // Búsqueda por email o nombre
        const { data: emailResults, error: emailError } = await supabase
          .from('profiles')
          .select('id, full_name, role')
          .or(`email.ilike.%${searchTerm}%,full_name.ilike.%${searchTerm}%`)
          .limit(5);

        if (emailError) throw emailError;

        // Obtener datos de usuario desde auth.users
        const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers() as unknown as {
          data: SupabaseUsersResponse | null;
          error: any;
        };
        
        if (usersError) throw usersError;

        // Combinar resultados y eliminar duplicados
        const combinedResults: UserResult[] = [];
        
        if (emailResults && emailResults.length > 0) {
          for (const profile of emailResults) {
            // Buscar el usuario correspondiente para obtener el email
            const user = usersData?.users?.find(u => u.id === profile.id);
            if (user) {
              combinedResults.push({
                id: profile.id,
                email: user.email || 'Sin email',
                full_name: profile.full_name || 'Sin nombre',
                role: profile.role
              });
            }
          }
        }

        setSearchResults(combinedResults);
      } catch (error) {
        console.error('Error al buscar usuarios:', error);
      } finally {
        setIsSearching(false);
      }
    };

    // Debounce the search to avoid too many requests
    const timerId = setTimeout(() => {
      searchUsers();
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const handleRoleChanged = () => {
    // Re-search to update results
    if (searchTerm.length >= 2) {
      handleSearch();
    }
    toast({
      title: "Rol actualizado",
      description: "El rol del usuario ha sido actualizado correctamente.",
    });
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor ingresa un término de búsqueda.",
      });
      return;
    }

    setIsSearching(true);
    setSearchResults([]);

    try {
      // Búsqueda por email o nombre
      const { data: emailResults, error: emailError } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .or(`email.ilike.%${searchTerm}%,full_name.ilike.%${searchTerm}%`)
        .limit(5);

      if (emailError) throw emailError;

      // Obtener datos de usuario desde auth.users
      const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers() as unknown as {
        data: SupabaseUsersResponse | null;
        error: any;
      };
      
      if (usersError) throw usersError;

      // Combinar resultados y eliminar duplicados
      const combinedResults: UserResult[] = [];
      
      if (emailResults && emailResults.length > 0) {
        for (const profile of emailResults) {
          // Buscar el usuario correspondiente para obtener el email
          const user = usersData?.users?.find(u => u.id === profile.id);
          if (user) {
            combinedResults.push({
              id: profile.id,
              email: user.email || 'Sin email',
              full_name: profile.full_name || 'Sin nombre',
              role: profile.role
            });
          }
        }
      }

      setSearchResults(combinedResults);
      
      if (combinedResults.length === 0) {
        toast({
          title: "Sin resultados",
          description: "No se encontraron usuarios que coincidan con la búsqueda.",
        });
      }
    } catch (error) {
      console.error('Error al buscar usuarios:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al buscar usuarios.",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'instructor':
        return <UserCog className="h-4 w-4" />;
      case 'student':
        return <User className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'default';
      case 'instructor':
        return 'secondary';
      case 'student':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-9"
            autoFocus
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Button 
          onClick={handleSearch} 
          disabled={isSearching}
        >
          {isSearching ? (
            <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-current"></span>
          ) : (
            <Search className="h-4 w-4 mr-2" />
          )}
          <span>Buscar</span>
        </Button>
      </div>

      <div className="space-y-4">
        {isSearching && (
          <div className="flex justify-center py-4">
            <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-current"></div>
          </div>
        )}
        
        {!isSearching && searchResults.length > 0 ? (
          <div className="space-y-4">
            {searchResults.map((user) => (
              <div key={user.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted rounded-full h-10 w-10 flex items-center justify-center">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {user.full_name}
                        <Badge variant={getRoleBadgeVariant(user.role)} className="h-5 text-xs capitalize">
                          <div className="flex items-center gap-1">
                            {getRoleIcon(user.role)}
                            <span>{user.role}</span>
                          </div>
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </div>
                
                <UserRoleEditor 
                  userId={user.id}
                  userName={user.full_name}
                  currentRole={user.role}
                  onRoleChanged={handleRoleChanged}
                />
              </div>
            ))}
          </div>
        ) : !isSearching && searchTerm.length > 0 && (
          <div className="text-center py-6 text-muted-foreground">
            No se encontraron resultados
          </div>
        )}
        
        {!isSearching && searchTerm.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            Ingresa un nombre o email para buscar usuarios
          </div>
        )}
      </div>

      {searchResults.length > 0 && (
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      )}
    </div>
  );
};
