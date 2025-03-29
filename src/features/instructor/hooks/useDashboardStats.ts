
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

export const useDashboardStats = () => {
  const { user } = useAuth();

  // Fetch courses count
  const { data: coursesCount = 0, isLoading: isLoadingCourses } = useQuery({
    queryKey: ["instructorCoursesCount", user?.id],
    queryFn: async () => {
      try {
        if (!user?.id) return 0;

        const { count, error } = await supabase
          .from("courses")
          .select("*", { count: "exact", head: true })
          .eq("instructor_id", user.id);

        if (error) throw error;

        return count || 0;
      } catch (error: any) {
        console.error("Error fetching courses count:", error);
        return 0;
      }
    },
    enabled: !!user?.id,
  });

  // Fetch published courses count
  const { data: publishedCoursesCount = 0, isLoading: isLoadingPublished } = useQuery({
    queryKey: ["instructorPublishedCoursesCount", user?.id],
    queryFn: async () => {
      try {
        if (!user?.id) return 0;

        const { count, error } = await supabase
          .from("courses")
          .select("*", { count: "exact", head: true })
          .eq("instructor_id", user.id)
          .eq("is_published", true);

        if (error) throw error;

        return count || 0;
      } catch (error: any) {
        console.error("Error fetching published courses count:", error);
        return 0;
      }
    },
    enabled: !!user?.id,
  });

  // Fetch total enrollments across all instructor courses
  const { data: totalEnrollments = 0, isLoading: isLoadingEnrollments } = useQuery({
    queryKey: ["instructorTotalEnrollments", user?.id],
    queryFn: async () => {
      try {
        if (!user?.id) return 0;

        // First get all course IDs for this instructor
        const { data: courses, error: coursesError } = await supabase
          .from("courses")
          .select("id")
          .eq("instructor_id", user.id);

        if (coursesError) throw coursesError;
        
        if (!courses || courses.length === 0) return 0;
        
        // Get enrollments count for these courses
        const courseIds = courses.map(course => course.id);
        
        const { count, error } = await supabase
          .from("enrollments")
          .select("*", { count: "exact", head: true })
          .in("course_id", courseIds);

        if (error) throw error;

        return count || 0;
      } catch (error: any) {
        console.error("Error fetching total enrollments:", error);
        return 0;
      }
    },
    enabled: !!user?.id,
  });

  // Fetch recent enrollments
  const { data: recentEnrollments = [], isLoading: isLoadingRecentEnrollments } = useQuery({
    queryKey: ["instructorRecentEnrollments", user?.id],
    queryFn: async () => {
      try {
        if (!user?.id) return [];

        // First get all course IDs for this instructor
        const { data: courses, error: coursesError } = await supabase
          .from("courses")
          .select("id")
          .eq("instructor_id", user.id);

        if (coursesError) throw coursesError;
        
        if (!courses || courses.length === 0) return [];
        
        // Get recent enrollments for these courses
        const courseIds = courses.map(course => course.id);
        
        const { data, error } = await supabase
          .from("enrollments")
          .select(`
            id,
            enrolled_at,
            user_id,
            course_id,
            profiles:user_id(full_name),
            courses:course_id(title)
          `)
          .in("course_id", courseIds)
          .order("enrolled_at", { ascending: false })
          .limit(5);

        if (error) throw error;

        // Transform the data to match our expected format
        return data.map(enrollment => ({
          id: enrollment.id,
          enrolled_at: enrollment.enrolled_at,
          profiles: {
            full_name: enrollment.profiles ? enrollment.profiles.full_name : 'Unknown User'
          },
          courses: {
            title: enrollment.courses ? enrollment.courses.title : 'Unknown Course'
          }
        }));
      } catch (error: any) {
        console.error("Error fetching recent enrollments:", error);
        return [];
      }
    },
    enabled: !!user?.id,
  });

  // Fetch most popular courses (by enrollment count)
  const { data: popularCourses = [], isLoading: isLoadingPopularCourses } = useQuery({
    queryKey: ["instructorPopularCourses", user?.id],
    queryFn: async () => {
      try {
        if (!user?.id) return [];

        // This query needs to be done in two steps as Supabase doesn't support aggregations directly
        
        // 1. Get all course IDs for this instructor
        const { data: courses, error: coursesError } = await supabase
          .from("courses")
          .select("id, title, description, price, currency, cover_image_url")
          .eq("instructor_id", user.id);

        if (coursesError) throw coursesError;
        
        if (!courses || courses.length === 0) return [];
        
        // 2. For each course, get enrollment count
        const courseIds = courses.map(course => course.id);
        
        const { data: enrollments, error: enrollmentsError } = await supabase
          .from("enrollments")
          .select("course_id")
          .in("course_id", courseIds);
          
        if (enrollmentsError) throw enrollmentsError;
        
        // Count enrollments per course
        const coursesWithCount = courses.map(course => {
          const count = enrollments.filter(e => e.course_id === course.id).length;
          return { ...course, enrollmentCount: count };
        });
        
        // Sort by enrollment count and take top 3
        return coursesWithCount
          .sort((a, b) => b.enrollmentCount - a.enrollmentCount)
          .slice(0, 3);
      } catch (error: any) {
        console.error("Error fetching popular courses:", error);
        return [];
      }
    },
    enabled: !!user?.id,
  });

  const isLoading = 
    isLoadingCourses || 
    isLoadingPublished || 
    isLoadingEnrollments || 
    isLoadingRecentEnrollments || 
    isLoadingPopularCourses;

  return {
    coursesCount,
    publishedCoursesCount,
    totalEnrollments,
    recentEnrollments,
    popularCourses,
    isLoading
  };
};
