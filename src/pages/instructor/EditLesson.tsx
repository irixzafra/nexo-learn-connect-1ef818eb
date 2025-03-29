
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import { toast } from 'sonner';
import { Lesson } from '@/types/course';

// Esta es una implementación básica. Para una edición más rica, se debería integrar
// Tiptap o algún otro editor WYSIWYG como se menciona en el documento.

const EditLesson: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [contentType, setContentType] = useState<'text' | 'video'>('text');
  const [textContent, setTextContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  // Fetch lesson details
  const { data: lesson, isLoading: isLoadingLesson } = useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .single();

      if (error) {
        console.error('Error fetching lesson:', error);
        throw error;
      }

      return data as Lesson;
    },
    enabled: !!lessonId,
    onSuccess: (data) => {
      setContentType(data.content_type);
      setTextContent(data.content_text?.content || '');
      setVideoUrl(data.content_video_url || '');
    },
  });

  // Update lesson content
  const updateLessonMutation = useMutation({
    mutationFn: async () => {
      const updates: any = {
        content_type: contentType,
      };

      if (contentType === 'text') {
        updates.content_text = { content: textContent };
        updates.content_video_url = null;
      } else {
        updates.content_video_url = videoUrl;
        updates.content_text = null;
      }

      const { data, error } = await supabase
        .from('lessons')
        .update(updates)
        .eq('id', lessonId)
        .select()
        .single();

      if (error) {
        console.error('Error updating lesson content:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      toast.success('Contenido de la lección actualizado correctamente');
      queryClient.invalidateQueries({ queryKey: ['lesson', lessonId] });
    },
    onError: (error) => {
      console.error('Error al actualizar el contenido de la lección:', error);
      toast.error('Error al actualizar el contenido de la lección');
    },
  });

  const handleContentTypeChange = (value: string) => {
    setContentType(value as 'text' | 'video');
  };

  const handleSave = async () => {
    if (contentType === 'video' && !videoUrl.trim()) {
      toast.error('Por favor, proporciona una URL de video válida');
      return;
    }

    await updateLessonMutation.mutateAsync();
  };

  if (isLoadingLesson) {
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

  if (!lesson) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Lección no encontrada</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No se pudo encontrar la lección solicitada.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate(`/instructor/courses/${courseId}/structure`)}>
                Volver a la estructura del curso
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
            onClick={() => navigate(`/instructor/courses/${courseId}/structure`)}
            className="mr-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver a Estructura
          </Button>
          <h1 className="text-2xl font-bold">Editar Lección: {lesson.title}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contenido de la Lección</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Tipo de Contenido</label>
              <Select 
                value={contentType} 
                onValueChange={handleContentTypeChange}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Seleccionar tipo de contenido" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Texto</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <Tabs value={contentType} className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger 
                  value="text" 
                  onClick={() => setContentType('text')}
                  disabled={updateLessonMutation.isPending}
                >
                  Texto
                </TabsTrigger>
                <TabsTrigger 
                  value="video" 
                  onClick={() => setContentType('video')}
                  disabled={updateLessonMutation.isPending}
                >
                  Video
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="text" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Contenido de Texto
                    </label>
                    <Textarea
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      rows={12}
                      placeholder="Escribe el contenido de la lección aquí..."
                      className="w-full"
                      disabled={updateLessonMutation.isPending}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Nota: Este es un editor básico. Implementaremos un editor WYSIWYG (Tiptap) en una versión futura.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="video" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      URL del Video
                    </label>
                    <Input
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full"
                      disabled={updateLessonMutation.isPending}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Ingresa la URL completa del video (YouTube, Vimeo, etc.)
                    </p>
                  </div>
                  
                  {videoUrl && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">
                        Vista Previa
                      </label>
                      <div className="w-full bg-muted p-4 rounded-md">
                        <div className="aspect-video">
                          <p className="text-center p-12 text-muted-foreground">
                            Vista previa del video disponible en la vista de estudiante
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => navigate(`/instructor/courses/${courseId}/structure`)}
              disabled={updateLessonMutation.isPending}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              disabled={updateLessonMutation.isPending}
              className="flex items-center gap-1"
            >
              {updateLessonMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-1"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-1" />
                  Guardar Cambios
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default EditLesson;
