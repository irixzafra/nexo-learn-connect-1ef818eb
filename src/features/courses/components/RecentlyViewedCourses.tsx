
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Course } from '@/types/course';

interface RecentlyViewedCoursesProps {
  limit?: number;
}

export const RecentlyViewedCourses: React.FC<RecentlyViewedCoursesProps> = ({ 
  limit = 5 
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This function would ideally fetch from a "recently_viewed" table
    // For now, we'll just fetch some courses as an example
    const fetchRecentlyViewed = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .limit(limit);
          
        if (error) throw error;
        setCourses(data as Course[]);
      } catch (error) {
        console.error('Error fetching recently viewed courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentlyViewed();
  }, [limit]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Vistos recientemente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="bg-muted h-12 w-12 rounded"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (courses.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Vistos recientemente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map(course => (
            <div key={course.id} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center text-primary">
                {course.title.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <Link to={`/courses/${course.id}`} className="font-medium text-sm hover:underline truncate block">
                  {course.title}
                </Link>
                <p className="text-xs text-muted-foreground truncate">
                  {course.instructor?.full_name || 'Instructor'}
                </p>
              </div>
            </div>
          ))}
          
          <Button variant="outline" asChild className="w-full mt-2">
            <Link to="/courses" className="flex items-center justify-center gap-2">
              <span>Explorar más cursos</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
