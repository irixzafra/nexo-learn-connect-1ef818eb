
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import AppLayout from '@/layouts/AppLayout';
import { Course } from '@/types/course';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Eye, LayoutGrid, Pencil, FileText, Settings } from 'lucide-react';
import { CourseEditBasic } from '@/features/instructor/components/CourseEditBasic';
import { CourseEditContent } from '@/features/instructor/components/CourseEditContent';
import { CourseEditSettings } from '@/features/instructor/components/CourseEditSettings';

const CourseEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Course>>({});
  const [hasChanges, setHasChanges] = useState(false);
  
  const { data: course, isLoading } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      return data as Course;
    },
    enabled: !!id,
  });
  
  useEffect(() => {
    if (course) {
      setFormData(course);
    }
  }, [course]);
  
  const handleInputChange = (field: keyof Course, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };
  
  const handleSave = async () => {
    if (!id) return;
    
    try {
      setIsSaving(true);
      
      const { error } = await supabase
        .from('courses')
        .update(formData)
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success('Curso actualizado correctamente');
      setHasChanges(false);
    } catch (error: any) {
      console.error('Error updating course:', error);
      toast.error('Error al actualizar el curso');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handlePreview = () => {
    if (id) {
      window.open(`/courses/${id}`, '_blank');
    }
  };
  
  const confirmNavigation = (path: string) => {
    if (hasChanges) {
      const confirmed = window.confirm('Tienes cambios sin guardar. ¿Quieres continuar sin guardar?');
      if (confirmed) {
        navigate(path);
      }
    } else {
      navigate(path);
    }
  };
  
  if (isLoading) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6 flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AppLayout>
    );
  }
  
  if (!course) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Curso no encontrado</h1>
          <p className="mb-4">No se pudo encontrar el curso solicitado.</p>
          <Button onClick={() => navigate('/instructor/courses')}>
            Volver a mis cursos
          </Button>
        </div>
      </AppLayout>
    );
  }
  
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => confirmNavigation('/instructor/courses')}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver
            </Button>
            <h1 className="text-2xl font-bold">Editar Curso</h1>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreview}
            >
              <Eye className="h-4 w-4 mr-2" />
              Vista previa
            </Button>
            
            <Button
              size="sm"
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
            >
              {isSaving ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar cambios
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-lg mb-6">
          <h2 className="font-semibold text-lg">{course.title}</h2>
          <p className="text-muted-foreground">{course.is_published ? 'Publicado' : 'Borrador'}</p>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="basic" className="flex gap-2">
              <Pencil className="h-4 w-4" />
              <span className="hidden sm:inline">Información básica</span>
              <span className="inline sm:hidden">Básico</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex gap-2">
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Contenido</span>
              <span className="inline sm:hidden">Contenido</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Configuración</span>
              <span className="inline sm:hidden">Config.</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <CourseEditBasic
              formData={formData}
              onChange={handleInputChange}
            />
          </TabsContent>
          
          <TabsContent value="content">
            <CourseEditContent courseId={id || ''} />
          </TabsContent>
          
          <TabsContent value="settings">
            <CourseEditSettings
              formData={formData}
              onChange={handleInputChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default CourseEditor;
