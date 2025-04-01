
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
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
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { toast } from 'sonner';
import { Lesson } from '@/types/course';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const AdminLessonEdit: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [contentType, setContentType] = useState<'text' | 'video'>('text');
  const [textContent, setTextContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isPreviewable, setIsPreviewable] = useState(false);
  const [lessonTitle, setLessonTitle] = useState('');

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
  });

  // Set initial form values when lesson data is loaded
  useEffect(() => {
    if (lesson) {
      setContentType(lesson.content_type);
      setTextContent(lesson.content_text?.content || '');
      setVideoUrl(lesson.content_video_url || '');
      setIsPreviewable(lesson.is_previewable);
      setLessonTitle(lesson.title || '');
    }
  }, [lesson]);

  // Update lesson content
  const updateLessonMutation = useMutation({
    mutationFn: async () => {
      const updates: any = {
        content_type: contentType,
        is_previewable: isPreviewable,
        title: lessonTitle
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
      queryClient.invalidateQueries({ queryKey: ['courseLessons', courseId] });
      if (lesson?.module_id) {
        queryClient.invalidateQueries({ queryKey: ['moduleLessons', lesson.module_id] });
      }
    },
    onError: (error) => {
      console.error('Error al actualizar el contenido de la lección:', error);
      toast.error('Error al actualizar el contenido de la lección');
    },
  });

  const handleContentTypeChange = (value: string) => {
    setContentType(value as 'text' | 'video');
  };

  const handleTogglePreviewable = () => {
    setIsPreviewable(!isPreviewable);
  };

  const handleSave = async () => {
    if (!lessonTitle.trim()) {
      toast.error('El título de la lección no puede estar vacío');
      return;
    }
    
    if (contentType === 'video' && !videoUrl.trim()) {
      toast.error('Por favor, proporciona una URL de video válida');
      return;
    }

    await updateLessonMutation.mutateAsync();
  };

  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url: string) => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Generate embed URL
  const getEmbedUrl = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Check if it's already an embed URL
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    // Handle Vimeo URLs (basic support)
    if (url.includes('vimeo.com')) {
      const vimeoId = url.split('/').pop();
      if (vimeoId) {
        return `https://player.vimeo.com/video/${vimeoId}`;
      }
    }
    
    return url; // Return original URL if we can't parse it
  };

  if (isLoadingLesson) {
    return (
      <AdminPageLayout
        title="Cargando..."
        subtitle="Cargando contenido de la lección"
      >
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminPageLayout>
    );
  }

  if (!lesson) {
    return (
      <AdminPageLayout
        title="Lección no encontrada"
        subtitle="No se pudo encontrar la lección solicitada"
      >
        <Card>
          <CardContent className="pt-6">
            <p>No se pudo encontrar la lección solicitada.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate(`/admin/courses/${courseId}`)}>
              Volver al curso
            </Button>
          </CardFooter>
        </Card>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout
      title={`Editar Lección: ${lesson.title}`}
      subtitle="Modifica el contenido y la configuración de esta lección"
      actions={
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(`/admin/courses/${courseId}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al curso
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Datos de la Lección</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="title">Título de la lección</Label>
            <Input
              id="title"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              className="mt-1"
              placeholder="Introduce el título de la lección"
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
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
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="preview-mode" 
                checked={isPreviewable}
                onCheckedChange={handleTogglePreviewable}
              />
              <Label htmlFor="preview-mode" className="flex items-center cursor-pointer">
                {isPreviewable ? (
                  <Eye className="h-4 w-4 text-primary mr-1" />
                ) : (
                  <EyeOff className="h-4 w-4 mr-1" />
                )}
                <span className="ml-1">
                  {isPreviewable ? 'Vista previa habilitada' : 'Vista previa deshabilitada'}
                </span>
              </Label>
            </div>
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
                    Nota: Este es un editor básico. Implementaremos un editor WYSIWYG en una versión futura.
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
                    <div className="bg-muted rounded-md overflow-hidden">
                      <div className="aspect-video">
                        <iframe
                          src={getEmbedUrl(videoUrl)}
                          className="w-full h-full"
                          title="Vista previa de video"
                          allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
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
            onClick={() => navigate(`/admin/courses/${courseId}`)}
            disabled={updateLessonMutation.isPending}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            disabled={updateLessonMutation.isPending}
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
    </AdminPageLayout>
  );
};

export default AdminLessonEdit;
