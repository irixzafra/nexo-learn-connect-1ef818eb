
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Search, User } from 'lucide-react';
import { UserRole } from '@/types/auth';
import { UserRoleEditor } from '@/components/admin/UserRoleEditor';

interface UserResult {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
}

interface UserRoleSearchProps {
  onClose?: () => void;
}

export const UserRoleSearch: React.FC<UserRoleSearchProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<UserResult[]>([]);
  const { toast } = useToast();

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
      // Búsqueda por email (coincidencia exacta o parcial)
      const { data: emailResults, error: emailError } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .or(`email.ilike.%${searchTerm}%,full_name.ilike.%${searchTerm}%`)
        .limit(5);

      if (emailError) throw emailError;

      // Búsqueda por nombre (coincidencia parcial)
      const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
      
      if (usersError) throw usersError;

      // Combinar resultados y eliminar duplicados
      const combinedResults: UserResult[] = [];
      
      if (emailResults && emailResults.length > 0) {
        for (const profile of emailResults) {
          // Buscar el usuario correspondiente para obtener el email
          const user = users?.users.find(u => u.id === profile.id);
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

  const handleRoleChanged = () => {
    // Actualizar resultados
    handleSearch();
    toast({
      title: "Rol actualizado",
      description: "El rol del usuario ha sido actualizado correctamente.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button 
          onClick={handleSearch} 
          disabled={isSearching}
        >
          {isSearching ? (
            <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-current"></span>
          ) : (
            <Search className="h-4 w-4" />
          )}
          <span className="ml-2">Buscar</span>
        </Button>
      </div>

      <div className="space-y-4">
        {searchResults.length > 0 ? (
          <div className="space-y-4">
            {searchResults.map((user) => (
              <div key={user.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-muted rounded-full h-10 w-10 flex items-center justify-center">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">{user.full_name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
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
        ) : !isSearching && (
          <div className="text-center py-6 text-muted-foreground">
            {searchTerm ? "No se encontraron resultados" : "Busca usuarios por nombre o email"}
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
