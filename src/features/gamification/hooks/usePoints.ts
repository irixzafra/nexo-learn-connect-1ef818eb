
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { UserPoints } from '../types';
import { toast } from 'sonner';

export const usePoints = (userId?: string) => {
  const queryClient = useQueryClient();

  // Obtener los puntos del usuario
  const {
    data: userPoints,
    isLoading: isLoadingPoints,
    error: pointsError
  } = useQuery({
    queryKey: ['user-points', userId],
    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          // No se encontraron puntos para este usuario, creamos un nuevo registro
          const { data: newPointsData, error: newPointsError } = await supabase
            .from('user_points')
            .insert([
              { user_id: userId, total_points: 0 }
            ])
            .select()
            .single();
          
          if (newPointsError) throw newPointsError;
          return newPointsData as UserPoints;
        }
        throw error;
      }
      
      return data as UserPoints;
    },
    enabled: !!userId
  });

  // Añadir puntos a un usuario
  const addPoints = useMutation({
    mutationFn: async ({ 
      userId, 
      points, 
      reason, 
      source 
    }: { 
      userId: string; 
      points: number; 
      reason: string; 
      source: string;
    }) => {
      // Primero obtenemos los puntos actuales
      const { data: currentPoints, error: fetchError } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;
      
      const newPointHistory = {
        amount: points,
        reason,
        source,
        timestamp: new Date().toISOString()
      };

      if (!currentPoints) {
        // Crear un nuevo registro
        const { data, error } = await supabase
          .from('user_points')
          .insert([
            { 
              user_id: userId, 
              total_points: points,
              points_history: [newPointHistory]
            }
          ])
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        // Actualizar registro existente
        const newTotal = currentPoints.total_points + points;
        const newHistory = [
          ...(currentPoints.points_history || []),
          newPointHistory
        ];
        
        const { data, error } = await supabase
          .from('user_points')
          .update({ 
            total_points: newTotal,
            points_history: newHistory
          })
          .eq('id', currentPoints.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      toast.success('¡Puntos añadidos!');
      queryClient.invalidateQueries({ queryKey: ['user-points', userId] });
    },
    onError: (error) => {
      toast.error('Error al añadir puntos');
      console.error('Error al añadir puntos:', error);
    }
  });

  return {
    userPoints,
    isLoadingPoints,
    pointsError,
    addPoints
  };
};
