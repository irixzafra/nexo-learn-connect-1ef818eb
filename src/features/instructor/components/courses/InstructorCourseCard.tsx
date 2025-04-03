
import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Course } from '@/types/course';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Eye, Trash2, Users, Clock, BookOpen, FileEdit, BookCopy, BarChart } from 'lucide-react';

interface InstructorCourseCardProps {
  course: Course;
  onViewCourse: (courseId: string) => void;
  onEditCourse: (courseId: string) => void;
  onEditStructure: (courseId: string) => void;
  onEditContent: (courseId: string) => void;
  onDeleteCourse: (course: Course) => void;
  onAnalytics: (courseId: string) => void;
}

export const InstructorCourseCard: React.FC<InstructorCourseCardProps> = ({
  course,
  onViewCourse,
  onEditCourse,
  onEditStructure,
  onEditContent,
  onDeleteCourse,
  onAnalytics
}) => {
  return (
    <Card key={course.id}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="line-clamp-1 text-lg">
              {course.title}
            </CardTitle>
            <CardDescription className="line-clamp-1">
              {course.description}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEditCourse(course.id)}>
                <Edit className="h-4 w-4 mr-2" />
                Editar curso
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEditStructure(course.id)}>
                <BookCopy className="h-4 w-4 mr-2" />
                Editar estructura
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEditContent(course.id)}>
                <FileEdit className="h-4 w-4 mr-2" />
                Editor de contenido
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewCourse(course.id)}>
                <Eye className="h-4 w-4 mr-2" />
                Ver curso
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDeleteCourse(course)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar curso
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="relative aspect-video overflow-hidden rounded-md mb-4 bg-gray-100">
          <img
            src={course.cover_image_url || '/placeholder-course.jpg'}
            alt={course.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 right-2">
            <Badge variant={course.is_published ? 'default' : 'outline'}>
              {course.is_published ? 'Publicado' : 'Borrador'}
            </Badge>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{course.student_count || 0} estudiantes</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>{course.modules?.[0]?.count || 0} módulos</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>
              {format(new Date(course.updated_at), 'dd MMM', { locale: es })}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onAnalytics(course.id)}
        >
          <BarChart className="h-4 w-4 mr-2" />
          Analíticas
        </Button>
        <Button
          variant="default"
          size="sm"
          className="w-full"
          onClick={() => onEditCourse(course.id)}
        >
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </CardFooter>
    </Card>
  );
};
