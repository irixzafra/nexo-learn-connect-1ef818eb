
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PopularCourse {
  id: string;
  title: string;
  enrollmentCount: number;
}

interface PopularCoursesCardProps {
  courses: PopularCourse[];
  totalEnrollments: number;
}

export const PopularCoursesCard: React.FC<PopularCoursesCardProps> = ({
  courses,
  totalEnrollments,
}) => {
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
