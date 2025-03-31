
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Badge, UserBadge } from '../types';
import { toast } from 'sonner';

export const useBadges = (userId?: string) => {
  const queryClient = useQueryClient();

  // Obtener todas las insignias disponibles en el sistema
  const {
    data: allBadges,
    isLoading: isLoadingBadges,
    error: badgesError
  } = useQuery({
    queryKey: ['badges'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('badges')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Badge[];
    },
    enabled: true
  });

  // Obtener las insignias del usuario
  const {
    data: userBadges,
    isLoading: isLoadingUserBadges,
    error: userBadgesError
  } = useQuery({
    queryKey: ['user-badges', userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from('user_badges')
        .select(`
          id,
          user_id,
          badge_id,
          awarded_at,
          badges (*)
        `)
        .eq('user_id', userId);
      
      if (error) throw error;
      
      // Corregir el tipado de los datos de retorno
      return data.map(item => ({
        id: item.id,
        user_id: item.user_id,
        badge_id: item.badge_id,
        awarded_at: item.awarded_at,
        badge: item.badges as unknown as Badge  // Conversión explícita para resolver problema de tipado
      })) as UserBadge[];
    },
    enabled: !!userId
  });

  // Otorgar una insignia a un usuario
  const awardBadge = useMutation({
    mutationFn: async ({ userId, badgeId }: { userId: string, badgeId: string }) => {
      const { data, error } = await supabase
        .from('user_badges')
        .insert([
          { user_id: userId, badge_id: badgeId }
        ])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('¡Insignia otorgada!');
      queryClient.invalidateQueries({ queryKey: ['user-badges', userId] });
      queryClient.invalidateQueries({ queryKey: ['user-points', userId] });
    },
    onError: (error) => {
      toast.error('Error al otorgar la insignia');
      console.error('Error al otorgar la insignia:', error);
    }
  });

  return {
    allBadges,
    userBadges,
    isLoadingBadges,
    isLoadingUserBadges,
    badgesError,
    userBadgesError,
    awardBadge
  };
};
