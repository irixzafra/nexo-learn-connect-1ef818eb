
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface Achievement {
  id: string;
  title: string;
  description: string;
  earned_date: string;
}

interface Certificate {
  id: string;
  course_id: string;
  course_name: string;
  issue_date: string;
  certificate_url: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon_name: string;
  earned_at: string;
}

interface UserStats {
  completedCourses: number;
  completedLessons: number;
  totalPoints: number;
  leaderboardPosition: number | null;
}

export const useUserAchievements = (userId: string) => {
  return useQuery({
    queryKey: ['userAchievements', userId],
    queryFn: async () => {
      // Fetch achievements
      const { data: achievements, error: achievementsError } = await supabase
        .from('user_achievements')
        .select(`
          id,
          achievement:achievement_id (
            id,
            title,
            description
          ),
          earned_at
        `)
        .eq('user_id', userId);
      
      if (achievementsError) {
        console.error('Error fetching achievements:', achievementsError);
        throw achievementsError;
      }

      // Fetch certificates
      const { data: certificates, error: certificatesError } = await supabase
        .from('certificates')
        .select(`
          id,
          course_id,
          courses:course_id (
            title
          ),
          issue_date,
          certificate_url
        `)
        .eq('user_id', userId);
      
      if (certificatesError) {
        console.error('Error fetching certificates:', certificatesError);
        throw certificatesError;
      }

      // Fetch badges
      const { data: badges, error: badgesError } = await supabase
        .from('user_badges')
        .select(`
          id,
          badges:badge_id (
            id,
            name,
            description,
            icon_name
          ),
          earned_at
        `)
        .eq('user_id', userId);
      
      if (badgesError) {
        console.error('Error fetching badges:', badgesError);
        throw badgesError;
      }

      // Fetch user stats
      const { data: userStats, error: userStatsError } = await supabase
        .rpc('get_user_stats', { user_id_param: userId });
      
      if (userStatsError) {
        console.error('Error fetching user stats:', userStatsError);
        throw userStatsError;
      }

      // Format achievements
      const formattedAchievements = achievements.map((item) => ({
        id: item.id,
        title: item.achievement.title,
        description: item.achievement.description,
        earned_date: item.earned_at
      })) as Achievement[];

      // Format certificates
      const formattedCertificates = certificates.map((item) => ({
        id: item.id,
        course_id: item.course_id,
        course_name: item.courses?.title || 'Curso',
        issue_date: item.issue_date,
        certificate_url: item.certificate_url
      })) as Certificate[];

      // Format badges
      const formattedBadges = badges.map((item) => ({
        id: item.id,
        name: item.badges?.name || '',
        description: item.badges?.description || '',
        icon_name: item.badges?.icon_name || 'award',
        earned_at: item.earned_at
      })) as Badge[];

      // If RPC doesn't exist, provide a fallback for stats
      const stats = userStats || {
        completed_courses: 0,
        completed_lessons: 0,
        total_points: 0,
        leaderboard_position: null
      };

      // Format user stats
      const formattedStats: UserStats = {
        completedCourses: stats.completed_courses || 0,
        completedLessons: stats.completed_lessons || 0,
        totalPoints: stats.total_points || 0,
        leaderboardPosition: stats.leaderboard_position
      };

      return {
        achievements: formattedAchievements,
        certificates: formattedCertificates,
        badges: formattedBadges,
        stats: formattedStats
      };
    },
    enabled: !!userId
  });
};
