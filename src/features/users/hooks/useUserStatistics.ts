
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

export interface UserCount {
  total: number;
  active: number;
  new: number;
  inactive: number;
}

export interface RoleDistribution {
  role: string;
  count: number;
}

export interface DailyRegistration {
  date: string;
  count: number;
}

export function useUserStatistics() {
  const [userCounts, setUserCounts] = useState<UserCount>({
    total: 0,
    active: 0,
    new: 0,
    inactive: 0
  });
  const [roleDistribution, setRoleDistribution] = useState<RoleDistribution[]>([]);
  const [dailyRegistrations, setDailyRegistrations] = useState<DailyRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchUserCounts = async () => {
    try {
      // Get total users
      const { count: totalCount, error: totalError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (totalError) throw totalError;

      // Get new users (registered in the last 7 days)
      const { count: newCount, error: newError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      if (newError) throw newError;

      // For active and inactive, we'll simulate with percentages for now
      // In a real app, you'd have a last_active timestamp or similar
      const activeCount = Math.round(totalCount ? totalCount * 0.75 : 0);
      const inactiveCount = totalCount ? totalCount - activeCount : 0;

      setUserCounts({
        total: totalCount || 0,
        active: activeCount,
        new: newCount || 0,
        inactive: inactiveCount
      });
    } catch (error) {
      console.error('Error fetching user counts:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los conteos de usuarios.",
      });
    }
  };

  const fetchRoleDistribution = async () => {
    try {
      const { data, error } = await supabase.rpc('get_user_role_distribution');

      if (error) throw error;

      setRoleDistribution(data || []);
    } catch (error) {
      console.error('Error fetching role distribution:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cargar la distribución de roles.",
      });
      // Set some dummy data for visual display
      setRoleDistribution([
        { role: 'student', count: 120 },
        { role: 'instructor', count: 35 },
        { role: 'admin', count: 8 },
        { role: 'moderator', count: 15 }
      ]);
    }
  };

  const fetchDailyRegistrations = async () => {
    try {
      const { data, error } = await supabase.rpc('get_user_registrations_by_day', { days_back: 30 });
      
      if (error) throw error;

      setDailyRegistrations(data || []);
    } catch (error) {
      console.error('Error fetching daily registrations:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cargar el historial de registros.",
      });
      
      // Generate dummy data for visual display
      const dummyData = [];
      for (let i = 30; i > 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dummyData.push({
          date: date.toISOString().split('T')[0],
          count: Math.floor(Math.random() * 10)
        });
      }
      setDailyRegistrations(dummyData);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchUserCounts(),
        fetchRoleDistribution(),
        fetchDailyRegistrations()
      ]);
      setIsLoading(false);
    };

    fetchAllData();
  }, []);

  return {
    userCounts,
    roleDistribution,
    dailyRegistrations,
    isLoading,
    refetchAll: async () => {
      setIsLoading(true);
      await Promise.all([
        fetchUserCounts(),
        fetchRoleDistribution(),
        fetchDailyRegistrations()
      ]);
      setIsLoading(false);
    }
  };
}
