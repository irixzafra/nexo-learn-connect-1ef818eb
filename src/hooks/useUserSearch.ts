
import { useState, useEffect, useCallback } from 'react';
import { supabase } from "@/lib/supabase";
import debounce from 'lodash.debounce';

export interface UserProfile {
  id: string;
  full_name: string | null;
  role: string;
}

export function useUserSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Función de búsqueda de usuarios
  const searchUsers = async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      setNoResults(false);
      setSearchError(null);
      return;
    }
    
    try {
      setIsSearching(true);
      setSearchError(null);
      
      // Buscar usuarios que coincidan con el término de búsqueda
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .ilike('full_name', `%${term}%`)
        .limit(10);
      
      if (error) throw error;
      
      setSearchResults(data || []);
      setNoResults(data?.length === 0);
    } catch (error: any) {
      console.error('Error buscando usuarios:', error);
      setSearchError(`Error al buscar usuarios: ${error.message}`);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce para evitar demasiadas peticiones mientras se escribe
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      searchUsers(term);
    }, 300),
    []
  );

  // Efecto para manejar el cambio en el término de búsqueda
  useEffect(() => {
    debouncedSearch(searchTerm);
    
    // Limpiar el debounce al desmontar
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    noResults,
    searchError,
    setSearchResults
  };
}
