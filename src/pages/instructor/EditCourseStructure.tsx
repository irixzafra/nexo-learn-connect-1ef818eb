
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  useCreateModule, 
  useUpdateModule, 
  useDeleteModule,
} from '@/hooks/use-course-structure';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import { toast } from 'sonner';
import { Course } from '@/types/course';
import { ModulesList } from '@/features/instructor/components/ModulesList';

const EditCourseStructure: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const courseId = id as string;

  // Fetch course details
  const { data: course, isLoading: isLoadingCourse } = useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (error) {
        console.error('Error fetching course:', error);
        throw error;
      }

      return data as Course;
    },
    enabled: !!courseId,
  });

  // Fetch modules
  const { data: modules = [], isLoading: isLoadingModules } = useQuery({
    queryKey: ['courseModules', courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .eq('course_id', courseId)
        .order('module_order', { ascending: true });

      if (error) {
        console.error('Error fetching modules:', error);
        throw error;
      }

      return data;
    },
    enabled: !!courseId,
  });

  // Module mutations
  const createModule = useCreateModule();
  const updateModule = useUpdateModule();
  const deleteModule = useDeleteModule();
  
  // Handle module operations
  const handleCreateModule = async (title: string) => {
    try {
      await createModule.mutateAsync({ courseId, title });
    } catch (error) {
      console.error('Error creating module:', error);
    }
  };

  const handleUpdateModule = async (moduleId: string, title: string) => {
    try {
      await updateModule.mutateAsync({ moduleId, title });
    } catch (error) {
      console.error('Error updating module:', error);
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    try {
      await deleteModule.mutateAsync({ moduleId, courseId });
    } catch (error) {
      console.error('Error deleting module:', error);
    }
  };

  // Module accordion expansion
  const toggleModuleExpansion = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId) 
        : [...prev, moduleId]
    );
  };
  
  if (isLoadingCourse || isLoadingModules) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!course) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Curso no encontrado</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No se pudo encontrar el curso solicitado.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate('/instructor/courses')}>
                Volver a mis cursos
              </Button>
            </CardFooter>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/instructor/courses/${courseId}/edit`)}
            className="mr-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver a Detalles
          </Button>
          <h1 className="text-2xl font-bold">Estructura del Curso: {course.title}</h1>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Módulos y Lecciones</CardTitle>
              <CardDescription>
                Organiza el contenido de tu curso en módulos y lecciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ModulesList 
                modules={modules}
                courseId={courseId}
                onCreateModule={handleCreateModule}
                onUpdateModule={handleUpdateModule}
                onDeleteModule={handleDeleteModule}
                expandedModules={expandedModules}
                onToggleModuleExpansion={toggleModuleExpansion}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => navigate(`/instructor/courses/${courseId}/edit`)}
              >
                Volver a Detalles
              </Button>
              <Button onClick={() => navigate(`/instructor/courses`)}>
                Finalizar
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default EditCourseStructure;
