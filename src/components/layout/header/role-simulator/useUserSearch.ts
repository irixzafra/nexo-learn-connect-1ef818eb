
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { UserSearchResult } from './types';

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
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, role')
        .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`)
        .limit(5);
      
      if (error) throw error;
      
      setUserResults(data || []);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  // When search query changes, search for users
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        searchUsers(searchQuery);
      } else {
        setUserResults([]);
      }
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    userResults,
    isSearching
  };
};
