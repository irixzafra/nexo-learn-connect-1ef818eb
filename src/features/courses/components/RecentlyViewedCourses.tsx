
import React from 'react';
import { useOfflineCourses } from '@/features/courses/hooks/useOfflineCourses';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CourseCard } from '@/features/courses/components/CourseCard';
import { Clock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecentlyViewedCoursesProps {
  limit?: number;
}

export const RecentlyViewedCourses: React.FC<RecentlyViewedCoursesProps> = ({ limit = 3 }) => {
  const { recentCourses, isLoading, refreshRecentCourses } = useOfflineCourses();

  const displayCourses = recentCourses.slice(0, limit);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <CardTitle>Vistos recientemente</CardTitle>
          </div>
          {!isOnline && (
            <span className="text-xs text-muted-foreground bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
              Disponibles offline
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : displayCourses.length > 0 ? (
          <div className="grid gap-4">
            {displayCourses.map(course => (
              <Link to={`/courses/${course.id}`} key={course.id}>
                <CourseCard course={course} size="compact" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No hay cursos vistos recientemente</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
