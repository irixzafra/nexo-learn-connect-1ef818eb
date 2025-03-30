
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { LeaderboardUser, UserLevel } from '@/types/community';
import { useToast } from '@/hooks/use-toast';

export const useLeaderboard = (limit: number = 10) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['leaderboard', limit],
    queryFn: async (): Promise<LeaderboardUser[]> => {
      try {
        // For now, we'll simulate the leaderboard with mock data
        // In a real implementation, you would fetch user points from the database
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, created_at')
          .order('created_at')
          .limit(limit);

        if (profilesError) {
          throw profilesError;
        }

        // Get user levels
        const { data: levels, error: levelsError } = await supabase
          .from('user_levels')
          .select('*')
          .order('level_number');

        if (levelsError) {
          throw levelsError;
        }

        // Create a simulated leaderboard based on when users joined
        const leaderboard: LeaderboardUser[] = profiles.map((profile, index) => {
          // Simulate points based on user ID (for demo purposes only)
          const simulatedPoints = Math.floor(Math.random() * 3000) + 50;
          
          // Find the appropriate level for this user based on points
          const userLevel = findUserLevel(levels, simulatedPoints);
          
          return {
            id: profile.id,
            full_name: profile.full_name || 'Anonymous User',
            points: simulatedPoints,
            level: userLevel?.level_number || 1,
            level_name: userLevel?.name || 'Nivel 1',
            level_icon: userLevel?.icon || '🔶',
            level_color: userLevel?.color || 'yellow',
            rank: index + 1,
            created_at: profile.created_at,
          };
        });

        // Sort by points in descending order
        return leaderboard.sort((a, b) => b.points - a.points);
      } catch (error: any) {
        toast({
          title: 'Error loading leaderboard',
          description: error.message || 'Failed to load the leaderboard data',
          variant: 'destructive',
        });
        return [];
      }
    },
  });
};

export const useUserLevels = () => {
  return useQuery({
    queryKey: ['userLevels'],
    queryFn: async (): Promise<UserLevel[]> => {
      const { data, error } = await supabase
        .from('user_levels')
        .select('*')
        .order('level_number');

      if (error) {
        console.error('Error fetching user levels:', error);
        throw error;
      }

      return data as UserLevel[];
    },
  });
};

// Helper function to find the appropriate level for a user based on points
function findUserLevel(levels: UserLevel[], points: number): UserLevel | undefined {
  // Sort levels by min_points in descending order
  const sortedLevels = [...levels].sort((a, b) => b.min_points - a.min_points);
  
  // Find the first level where the user has enough points
  return sortedLevels.find(level => points >= level.min_points);
}
