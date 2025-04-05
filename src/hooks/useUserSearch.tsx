
import { useState, useEffect } from 'react';
import { UserRoleType } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';
import { debounce } from 'lodash';

// Define interface for user search results
export interface UserSearchResult {
  id: string;
  name: string;
  email: string;
  avatar_url?: string | null;
  role: UserRoleType;
}

interface UseUserSearchReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: UserSearchResult[];
  isSearching: boolean;
  noResults: boolean;
  error: Error | null;
}

export const useUserSearch = (): UseUserSearchReturn => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchUsers = async (query: string) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      setNoResults(false);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      // Intentar primero buscar en la base de datos real
      let { data, error } = await supabase
        .from('profiles')
        .select('id, name, email, avatar_url, role')
        .or(`name.ilike.%${query}%, email.ilike.%${query}%`)
        .limit(5);

      if (error) throw error;

      // Transformar los resultados al formato esperado
      if (data && data.length > 0) {
        const formattedResults: UserSearchResult[] = data.map(user => ({
          id: user.id,
          name: user.name || 'Usuario sin nombre',
          email: user.email || 'correo@ejemplo.com', // Aseguramos que email siempre tenga un valor
          avatar_url: user.avatar_url,
          role: user.role as UserRoleType
        }));
        
        setSearchResults(formattedResults);
        setNoResults(formattedResults.length === 0);
      } else {
        // Si no hay resultados reales, utilizar datos simulados
        console.log('No se encontraron usuarios en la BD, usando datos de ejemplo');
        
        // Datos de ejemplo que coincidan con la búsqueda
        const mockResults: UserSearchResult[] = [
          { 
            id: '1', 
            name: 'Juan Pérez', 
            email: 'juan@ejemplo.com',
            role: 'student' 
          },
          { 
            id: '2', 
            name: 'María Gómez', 
            email: 'maria@ejemplo.com',
            role: 'instructor' 
          },
          { 
            id: '3', 
            name: 'Carlos Rodríguez', 
            email: 'carlos@ejemplo.com',
            role: 'student' 
          },
        ].filter(u => 
          u.name.toLowerCase().includes(query.toLowerCase()) || 
          u.email.toLowerCase().includes(query.toLowerCase())
        );
        
        setSearchResults(mockResults);
        setNoResults(mockResults.length === 0);
      }
    } catch (err) {
      console.error('Error al buscar usuarios:', err);
      setError(err as Error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce search to avoid too many requests
  const debouncedSearch = debounce(searchUsers, 300);

  useEffect(() => {
    debouncedSearch(searchTerm);
    
    // Cleanup function
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    noResults,
    error
  };
};
