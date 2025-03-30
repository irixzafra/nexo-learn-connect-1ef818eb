
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react'; // Replacing UserGroupIcon with Users from lucide-react
import { Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import useCourseDetail from '@/features/admin/hooks/useCourseDetail'; // Fixed import syntax

interface StudentsCardProps {
  courseId: string;
  enrolledCount: number;
}

const StudentsCard: React.FC<StudentsCardProps> = ({ courseId, enrolledCount }) => {
  const { course } = useCourseDetail({ courseId }); // Updated function call to match the hook's expected parameters
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP', { locale: es });
    } catch (e) {
      return 'Fecha desconocida';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5" /> {/* Changed from UserGroupIcon to Users */}
          Resumen de estudiantes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Estudiantes inscritos:</span>
            <span className="font-semibold text-lg">{enrolledCount}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Curso:</span>
            <span className="font-medium">{course?.title || 'Cargando...'}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Creado el:</span>
            <span>{course?.created_at ? formatDate(course.created_at) : 'Cargando...'}</span>
          </div>
          
          {course?.is_published ? (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Estado:</span>
              <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                <Sparkles className="h-4 w-4" />
                Publicado
              </span>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Estado:</span>
              <span className="text-amber-600 dark:text-amber-400">Borrador</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentsCard;
