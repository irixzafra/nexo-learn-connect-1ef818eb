
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { UserSearchResult } from './types';
import { toast } from 'sonner';
import { UserRoleType, toUserRoleType } from '@/types/auth';

export const useUserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userResults, setUserResults] = useState<UserSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Search for users by name or email
  const searchUsers = async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setUserResults([]);
      return;
    }
    
    setIsSearching(true);
    
    try {
      console.log('🔍 Iniciando búsqueda de usuarios con término:', query);
      
      // Llamada a la Edge Function para buscar usuarios
      const { data, error } = await supabase.functions.invoke('search-users-simulation', {
        body: { searchTerm: query }
      });
      
      console.log('📊 Respuesta de la búsqueda de usuarios:', { data, error });
      
      if (error) {
        console.error('❌ Error al invocar search-users-simulation:', error);
        toast.error('Error al buscar usuarios');
        setUserResults([]);
        return;
      }
      
      if (data?.data && Array.isArray(data.data)) {
        // Mapear los resultados a formato compatible con UserSearchResult
        // y asegurarnos de que el role sea un UserRoleType válido
        const formattedResults: UserSearchResult[] = data.data.map((user: any) => ({
          id: user.id,
          full_name: user.fullName || 'Sin nombre',
          email: user.email || 'No email',
          role: toUserRoleType(user.role) // Convertir a UserRoleType válido
        }));
        
        console.log('✅ Resultados de búsqueda formateados:', formattedResults);
        setUserResults(formattedResults);
      } else {
        console.log('⚠️ No se encontraron resultados o formato de respuesta inesperado', data);
        setUserResults([]);
      }
    } catch (error) {
      console.error('🔴 Error completo en searchUsers:', error);
      toast.error('Error al buscar usuarios');
      setUserResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  
  // When search query changes, search for users
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery && searchQuery.length >= 2) {
        console.log('⏱️ Ejecutando búsqueda después de debounce:', searchQuery);
        searchUsers(searchQuery);
      } else {
        setUserResults([]);
      }
    }, 300);
    
    return () => {
      clearTimeout(timeoutId);
    }
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    userResults,
    isSearching
  };
};
