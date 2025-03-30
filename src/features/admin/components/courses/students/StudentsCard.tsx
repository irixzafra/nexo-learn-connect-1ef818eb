
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Sparkles, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import useCourseDetail from '@/features/admin/hooks/useCourseDetail';
import PublishStatusBadge from './PublishStatusBadge';

interface StudentsCardProps {
  courseId: string;
  enrolledCount: number;
  actionButtons?: React.ReactNode;
}

const StudentsCard: React.FC<StudentsCardProps> = ({ 
  courseId, 
  enrolledCount,
  actionButtons
}) => {
  const { course, fetchCourseDetails } = useCourseDetail({ courseId });
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP', { locale: es });
    } catch (e) {
      return 'Fecha desconocida';
    }
  };

  const togglePublishStatus = async () => {
    if (!course) return;
    
    try {
      const newStatus = !course.is_published;
      
      const { error } = await supabase
        .from('courses')
        .update({
          is_published: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', courseId);
      
      if (error) throw error;
      
      // Refetch course details
      fetchCourseDetails(courseId);
      
      toast({
        title: newStatus ? "Curso publicado" : "Curso despublicado",
        description: newStatus 
          ? "El curso ahora es visible para los estudiantes" 
          : "El curso ya no es visible para los estudiantes",
      });
    } catch (error) {
      console.error('Error al cambiar estado de publicación:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cambiar el estado de publicación del curso.",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            Resumen de estudiantes
          </CardTitle>
          <div className="flex gap-2">
            {actionButtons}
          </div>
        </div>
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
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Estado:</span>
            <Button 
              variant="ghost" 
              className="p-0 h-auto hover:bg-transparent"
              onClick={togglePublishStatus}
            >
              <PublishStatusBadge isPublished={course?.is_published || false} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentsCard;
