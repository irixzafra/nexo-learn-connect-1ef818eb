
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus, FileEdit, PlusCircle, LayoutGrid } from 'lucide-react';
import { useCreateModule, useUpdateModule, useDeleteModule } from '@/hooks/use-course-structure';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { ModulesList } from './ModulesList';

interface CourseEditContentProps {
  courseId: string;
}

export const CourseEditContent: React.FC<CourseEditContentProps> = ({ courseId }) => {
  const navigate = useNavigate();
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  
  // Fetch modules
  const { data: modules = [], isLoading } = useQuery({
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
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle>Estructura del curso</CardTitle>
              <CardDescription>
                Organiza tu curso en módulos y lecciones
              </CardDescription>
            </div>
            <Button onClick={() => navigate(`/instructor/courses/${courseId}/structure`)}>
              <LayoutGrid className="h-4 w-4 mr-2" />
              Modo avanzado
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-6">
              <ModulesList 
                modules={modules}
                courseId={courseId}
                onCreateModule={handleCreateModule}
                onUpdateModule={handleUpdateModule}
                onDeleteModule={handleDeleteModule}
                expandedModules={expandedModules}
                onToggleModuleExpansion={toggleModuleExpansion}
              />
              
              <div className="mt-6">
                <Button variant="outline" onClick={() => handleCreateModule('Nuevo módulo')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir módulo
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Organización del contenido</CardTitle>
          <CardDescription>
            Consejos para estructurar tu curso de manera efectiva
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2 items-start">
              <span className="bg-primary/10 text-primary font-medium rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <p>Organiza tu contenido en módulos lógicos que guíen al estudiante paso a paso</p>
            </li>
            <li className="flex gap-2 items-start">
              <span className="bg-primary/10 text-primary font-medium rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <p>Incluye lecciones de introducción y conclusión en cada módulo</p>
            </li>
            <li className="flex gap-2 items-start">
              <span className="bg-primary/10 text-primary font-medium rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <p>Mezcla distintos tipos de contenido (texto, video) para mantener el interés</p>
            </li>
            <li className="flex gap-2 items-start">
              <span className="bg-primary/10 text-primary font-medium rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
              <p>Marca algunas lecciones como "vista previa" para atraer a potenciales estudiantes</p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
