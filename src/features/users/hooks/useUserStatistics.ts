
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";

export interface RoleDistribution {
  role: string;
  count: number;
}

export interface RegistrationData {
  date: string;
  count: number;
}

export function useUserStatistics() {
  const [roleDistribution, setRoleDistribution] = useState<RoleDistribution[]>([]);
  const [registrationData, setRegistrationData] = useState<RegistrationData[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState<number>(0); // Placeholder for now
  const [newUsers, setNewUsers] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const fetchStatistics = async () => {
    try {
      setIsLoading(true);
      
      // Fetch role distribution
      const { data: roleData, error: roleError } = await supabase
        .rpc('get_user_role_distribution');
      
      if (roleError) {
        console.error('Error fetching role distribution:', roleError);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo cargar la distribución de roles.",
        });
      } else {
        setRoleDistribution(roleData || []);
        
        // Calculate total users
        const total = roleData.reduce((sum, item) => sum + Number(item.count), 0);
        setTotalUsers(total);
      }
      
      // Fetch registration data
      const { data: regData, error: regError } = await supabase
        .rpc('get_user_registrations_by_day', { days_back: 30 });
      
      if (regError) {
        console.error('Error fetching registration data:', regError);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo cargar los datos de registro.",
        });
      } else {
        setRegistrationData(regData || []);
        
        // Calculate new users in last 7 days
        const last7Days = regData
          .filter(item => {
            const itemDate = new Date(item.date);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return itemDate >= weekAgo;
          })
          .reduce((sum, item) => sum + Number(item.count), 0);
        
        setNewUsers(last7Days);
        
        // For this demo, set active users to 70% of total
        setActiveUsers(Math.round(total * 0.7));
      }
    } catch (error) {
      console.error('Error in fetchStatistics:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al obtener las estadísticas.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return {
    roleDistribution,
    registrationData,
    totalUsers,
    activeUsers,
    newUsers,
    isLoading,
    refreshStatistics: fetchStatistics
  };
}
