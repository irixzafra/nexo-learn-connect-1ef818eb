
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useDebounce } from '@/hooks/useDebounce';

interface UserResult {
  id: string;
  full_name?: string;
  email?: string;
  role: string;
}

export const useUserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [userResults, setUserResults] = useState<UserResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const searchUsers = async () => {
      if (!debouncedSearchQuery || debouncedSearchQuery.length < 2) {
        setUserResults([]);
        return;
      }

      setIsSearching(true);

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, full_name, email, role')
          .or(`full_name.ilike.%${debouncedSearchQuery}%,email.ilike.%${debouncedSearchQuery}%`)
          .limit(10);

        if (error) {
          console.error('Error searching users:', error);
          return;
        }

        setUserResults(data || []);
      } catch (error) {
        console.error('Exception in searchUsers:', error);
      } finally {
        setIsSearching(false);
      }
    };

    searchUsers();
  }, [debouncedSearchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    userResults,
    isSearching,
  };
};

export default useUserSearch;
