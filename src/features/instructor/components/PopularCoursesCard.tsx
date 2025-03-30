
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface PopularCourse {
  id: string;
  title: string;
  enrollmentCount: number;
}

interface PopularCoursesCardProps {
  courses: PopularCourse[];
  totalEnrollments?: number;
  isLoading?: boolean;
}

export const PopularCoursesCard: React.FC<PopularCoursesCardProps> = ({
  courses,
  totalEnrollments = 0,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Cursos Populares</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Cursos Populares</CardTitle>
      </CardHeader>
      <CardContent>
        {courses.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No hay datos de popularidad disponibles.
          </p>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => {
              const percentage = totalEnrollments > 0
                ? Math.round((course.enrollmentCount / totalEnrollments) * 100)
                : 0;
                
              return (
                <div key={course.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate" title={course.title}>
                      {course.title}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {course.enrollmentCount} {course.enrollmentCount === 1 ? 'inscripción' : 'inscripciones'}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
