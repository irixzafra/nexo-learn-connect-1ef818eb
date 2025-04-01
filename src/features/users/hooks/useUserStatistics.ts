
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface UserCounts {
  total: number;
  active: number;
  new: number;
}

interface RoleDistribution {
  role: string;
  count: number;
}

interface DailyRegistration {
  date: string;
  count: number;
}

export const useUserStatistics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userCounts, setUserCounts] = useState<UserCounts>({ total: 0, active: 0, new: 0 });
  const [roleDistribution, setRoleDistribution] = useState<RoleDistribution[]>([]);
  const [dailyRegistrations, setDailyRegistrations] = useState<DailyRegistration[]>([]);

  // Función para obtener todas las estadísticas
  const fetchAllStatistics = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // Simulamos datos para fines de demostración
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Total de usuarios y usuarios activos
      setUserCounts({
        total: 1250,
        active: 875,
        new: 38
      });
      
      // Distribución por roles
      setRoleDistribution([
        { role: 'student', count: 1100 },
        { role: 'instructor', count: 85 },
        { role: 'admin', count: 15 },
        { role: 'moderator', count: 30 },
        { role: 'support', count: 20 }
      ]);
      
      // Registros diarios (últimos 14 días)
      const today = new Date();
      const registrations = [];
      
      for (let i = 13; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        
        registrations.push({
          date: date.toISOString().split('T')[0],
          count: Math.floor(Math.random() * 10) + 1 // Entre 1 y 10 registros por día
        });
      }
      
      setDailyRegistrations(registrations);
    } catch (error) {
      console.error('Error al cargar estadísticas de usuarios:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Cargar datos al montar el componente
  useEffect(() => {
    fetchAllStatistics();
  }, [fetchAllStatistics]);
  
  return {
    userCounts,
    roleDistribution,
    dailyRegistrations,
    isLoading,
    refetchAll: fetchAllStatistics
  };
};
