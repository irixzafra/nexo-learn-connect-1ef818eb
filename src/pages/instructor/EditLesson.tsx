
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const lessonSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'El título debe tener al menos 3 caracteres' })
    .max(100, { message: 'El título no puede exceder 100 caracteres' }),
  content_type: z.enum(['text', 'video']),
  content_text: z.any().optional(),
  content_video_url: z.string().url({ message: 'Ingresa una URL válida' }).optional().or(z.literal('')),
  is_previewable: z.boolean().default(false),
});

type LessonFormValues = z.infer<typeof lessonSchema>;

const EditLesson: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lesson, setLesson] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const [module, setModule] = useState<any>(null);

  const form = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: '',
      content_type: 'text',
      content_text: '',
      content_video_url: '',
      is_previewable: false,
    },
  });

  const contentType = form.watch('content_type');

  useEffect(() => {
    if (courseId && lessonId && user) {
      fetchLessonData();
    }
  }, [courseId, lessonId, user]);

  const fetchLessonData = async () => {
    setIsLoading(true);
    try {
      // Fetch lesson details
      const { data: lessonData, error: lessonError } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .eq('course_id', courseId)
        .single();

      if (lessonError) throw lessonError;
      if (!lessonData) {
        toast({
          title: 'Error',
          description: 'No se encontró la lección',
          variant: 'destructive',
        });
        navigate(`/instructor/courses/${courseId}/edit`);
        return;
      }

      setLesson(lessonData);

      // Fetch course details to verify owner
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .eq('instructor_id', user?.id)
        .single();

      if (courseError) throw courseError;
      if (!courseData) {
        toast({
          title: 'Error',
          description: 'No tienes permisos para editar este curso',
          variant: 'destructive',
        });
        navigate('/instructor/courses');
        return;
      }

      setCourse(courseData);

      // Fetch module details
      const { data: moduleData, error: moduleError } = await supabase
        .from('modules')
        .select('*')
        .eq('id', lessonData.module_id)
        .single();

      if (moduleError) throw moduleError;
      setModule(moduleData);

      // Initialize form with lesson data
      form.reset({
        title: lessonData.title,
        content_type: lessonData.content_type,
        content_text: lessonData.content_text || '',
        content_video_url: lessonData.content_video_url || '',
        is_previewable: lessonData.is_previewable,
      });
    } catch (error: any) {
      console.error('Error fetching lesson:', error);
      toast({
        title: 'Error',
        description: error.message || 'Ha ocurrido un error inesperado',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: LessonFormValues) => {
    if (!courseId || !lessonId) return;

    setIsSaving(true);

    try {
      const lessonData: any = {
        title: data.title,
        content_type: data.content_type,
        is_previewable: data.is_previewable,
      };

      // Add the appropriate content field based on content_type
      if (data.content_type === 'text') {
        lessonData.content_text = data.content_text;
        lessonData.content_video_url = null;
      } else {
        lessonData.content_text = null;
        lessonData.content_video_url = data.content_video_url;
      }

      const { error } = await supabase
        .from('lessons')
        .update(lessonData)
        .eq('id', lessonId);

      if (error) throw error;

      toast({
        title: 'Lección guardada',
        description: 'Los cambios han sido guardados exitosamente',
      });

      // Refresh lesson data
      fetchLessonData();
    } catch (error: any) {
      console.error('Error saving lesson:', error);
      toast({
        title: 'Error',
        description: error.message || 'No se pudo guardar la lección',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReturnToCourse = () => {
    navigate(`/instructor/courses/${courseId}/structure`);
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6 flex justify-center items-center min-h-[80vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  if (!lesson || !course || !module) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Lección no encontrada</h1>
          <p>La lección que intentas editar no existe o no tienes permisos para editarla.</p>
          <Button onClick={() => navigate(`/instructor/courses`)} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a mis cursos
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Editar Lección</h1>
            <p className="text-muted-foreground">
              {course.title} &gt; {module.title}
            </p>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" onClick={handleReturnToCourse}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a la Estructura
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </>
              )}
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detalles de la Lección</CardTitle>
            <CardDescription>
              Configura los detalles básicos y el contenido de esta lección
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título de la Lección</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Ej: Introducción al tema" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Contenido</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona el tipo de contenido" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="text">Texto</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          El formato principal de esta lección
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="is_previewable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Permitir Vista Previa
                        </FormLabel>
                        <FormDescription>
                          Si está activado, los estudiantes podrán ver esta lección sin estar inscritos en el curso
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {contentType === 'text' ? (
                  <FormField
                    control={form.control}
                    name="content_text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contenido de Texto</FormLabel>
                        <FormControl>
                          <ReactQuill
                            theme="snow"
                            value={field.value || ''}
                            onChange={field.onChange}
                            modules={{
                              toolbar: [
                                [{ 'header': [1, 2, 3, false] }],
                                ['bold', 'italic', 'underline', 'strike'],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                ['link', 'image', 'code-block'],
                                ['clean']
                              ],
                            }}
                            className="bg-background min-h-[300px]"
                          />
                        </FormControl>
                        <FormDescription>
                          Usa el editor para dar formato al contenido de tu lección
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormField
                    control={form.control}
                    name="content_video_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL del Video</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://www.youtube.com/watch?v=..."
                          />
                        </FormControl>
                        <FormDescription>
                          Ingresa la URL de YouTube, Vimeo u otra plataforma de video
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="hidden">
                  <Button type="submit">Guardar Cambios</Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleReturnToCourse}>
              Cancelar
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
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
