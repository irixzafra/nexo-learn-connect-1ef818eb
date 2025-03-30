
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CoursesWidget: React.FC = () => {
  const courses = [
    { id: 1, title: 'Introducción a React', progress: 60, badges: ['En progreso'] },
    { id: 2, title: 'HTML y CSS Fundamentals', progress: 100, badges: ['Completado'] },
    { id: 3, title: 'Node.js para Principiantes', progress: 15, badges: ['Nuevo'] },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Tus Cursos</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="border-b pb-3 last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium truncate">{course.title}</h4>
                <div className="flex gap-1">
                  {course.badges.map((badge, i) => (
                    <Badge key={i} variant={badge === 'Completado' ? 'default' : 'outline'} className="whitespace-nowrap">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${course.progress === 100 ? 'bg-green-500' : 'bg-primary'}`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {course.progress}% completado
              </p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" asChild className="w-full justify-between">
          <Link to="/student/courses">
            Ver todos los cursos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
