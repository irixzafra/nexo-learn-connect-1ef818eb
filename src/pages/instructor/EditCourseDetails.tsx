
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Loader2, 
  Save, 
  ArrowLeft, 
  Pencil, 
  FileText, 
  Eye, 
  ListChecks,
  Users,
  Settings,
  Globe 
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// Schema for course form
const courseSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'El título debe tener al menos 5 caracteres' })
    .max(100, { message: 'El título no puede exceder 100 caracteres' }),
  description: z
    .string()
    .min(20, { message: 'La descripción debe tener al menos 20 caracteres' })
    .max(1000, { message: 'La descripción no puede exceder 1000 caracteres' }),
  price: z
    .string()
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
      { message: 'El precio debe ser un número válido igual o mayor a 0' }
    ),
  currency: z.enum(['eur', 'usd'], {
    required_error: 'Selecciona la moneda',
  }),
  is_published: z.boolean().default(false),
});

type CourseFormValues = z.infer<typeof courseSchema>;

const EditCourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [course, setCourse] = useState<any>(null);
  const [modulesCount, setModulesCount] = useState(0);
  const [lessonsCount, setLessonsCount] = useState(0);
  const [enrollmentsCount, setEnrollmentsCount] = useState(0);
  const [showPublishAlert, setShowPublishAlert] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '0',
      currency: 'eur',
      is_published: false,
    },
  });

  const isPublished = form.watch('is_published');

  useEffect(() => {
    if (id && user) {
      fetchCourseData();
    }
  }, [id, user]);

  const fetchCourseData = async () => {
    setIsLoading(true);
    try {
      // Fetch course details
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .eq('instructor_id', user?.id)
        .single();

      if (courseError) throw courseError;
      if (!courseData) {
        toast({
          title: 'Error',
          description: 'No se encontró el curso o no tienes permisos para editarlo',
          variant: 'destructive',
        });
        navigate('/instructor/courses');
        return;
      }

      setCourse(courseData);

      // Count modules
      const { data: modules, error: modulesError } = await supabase
        .from('modules')
        .select('id')
        .eq('course_id', id);

      if (modulesError) throw modulesError;
      setModulesCount(modules?.length || 0);

      // Count lessons
      const { data: lessons, error: lessonsError } = await supabase
        .from('lessons')
        .select('id')
        .eq('course_id', id);

      if (lessonsError) throw lessonsError;
      setLessonsCount(lessons?.length || 0);

      // Count enrollments
      const { data: enrollments, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select('id')
        .eq('course_id', id);

      if (enrollmentsError) throw enrollmentsError;
      setEnrollmentsCount(enrollments?.length || 0);

      // Set form values
      form.reset({
        title: courseData.title,
        description: courseData.description || '',
        price: courseData.price.toString(),
        currency: courseData.currency,
        is_published: courseData.is_published,
      });
    } catch (error: any) {
      console.error('Error fetching course:', error);
      toast({
        title: 'Error',
        description: error.message || 'Ha ocurrido un error inesperado',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: CourseFormValues) => {
    if (!id) return;
    
    // If trying to publish but there are no modules or lessons, show warning
    if (data.is_published && !course.is_published && (modulesCount === 0 || lessonsCount === 0)) {
      setShowPublishAlert(true);
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Convert price to number
      const numericPrice = parseFloat(data.price);
      
      // Prepare the update object
      const courseUpdate = {
        title: data.title,
        description: data.description,
        price: numericPrice,
        currency: data.currency,
        is_published: data.is_published,
      };
      
      // Update the course
      const { error } = await supabase
        .from('courses')
        .update(courseUpdate)
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setCourse({ ...course, ...courseUpdate });
      
      toast({
        title: 'Curso actualizado',
        description: data.is_published 
          ? 'El curso ha sido publicado y está visible para los estudiantes' 
          : 'El curso ha sido actualizado como borrador',
      });
    } catch (error: any) {
      console.error('Error updating course:', error);
      toast({
        title: 'Error',
        description: error.message || 'No se pudo actualizar el curso',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const confirmPublish = async () => {
    // Update the form value and submit
    form.setValue('is_published', true);
    await form.handleSubmit(onSubmit)();
    setShowPublishAlert(false);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
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

  if (!course) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Curso no encontrado</h1>
          <p>El curso que intentas editar no existe o no tienes permisos para editarlo.</p>
          <Button onClick={() => navigate('/instructor/courses')} className="mt-4">
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
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <div className="flex items-center mt-1">
              <div className={`px-2 py-1 text-xs rounded-full ${course.is_published ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                {course.is_published ? 'Publicado' : 'Borrador'}
              </div>
              {enrollmentsCount > 0 && (
                <div className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {enrollmentsCount} {enrollmentsCount === 1 ? 'Estudiante' : 'Estudiantes'}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" onClick={() => navigate('/instructor/courses')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a mis cursos
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
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="col-span-1 md:col-span-1">
            <CardHeader>
              <CardTitle>Gestión del Curso</CardTitle>
              <CardDescription>Configura las diferentes secciones del curso</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 px-6">
                <Button 
                  variant={activeTab === 'details' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => handleTabChange('details')}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Detalles
                </Button>
                <Button 
                  variant={activeTab === 'structure' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => navigate(`/instructor/courses/${id}/structure`)}
                >
                  <ListChecks className="mr-2 h-4 w-4" />
                  Estructura
                </Button>
                <Button 
                  variant={activeTab === 'settings' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => handleTabChange('settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </Button>
                <Separator className="my-4" />
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.open(`/courses/${id}`, '_blank')}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Página del Curso
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="col-span-1 md:col-span-3">
            {activeTab === 'details' && (
              <Card>
                <CardHeader>
                  <CardTitle>Detalles del Curso</CardTitle>
                  <CardDescription>
                    Información básica sobre tu curso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Título del Curso</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Introducción a la Programación" />
                            </FormControl>
                            <FormDescription>
                              Un título descriptivo y atractivo para tu curso
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                placeholder="Describe tu curso de manera detallada..." 
                                rows={5}
                              />
                            </FormControl>
                            <FormDescription>
                              Explica de qué trata el curso, qué aprenderán los estudiantes y a quién está dirigido
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Precio</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" min="0" step="0.01" />
                              </FormControl>
                              <FormDescription>
                                Establece 0 para cursos gratuitos
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="currency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Moneda</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona la moneda" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="eur">EUR (€)</SelectItem>
                                  <SelectItem value="usd">USD ($)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Moneda en la que se cobrará el curso
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="is_published"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Estado de Publicación
                              </FormLabel>
                              <FormDescription>
                                {field.value 
                                  ? 'El curso está publicado y visible para los estudiantes'
                                  : 'El curso está guardado como borrador y no es visible para los estudiantes'}
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

                      <div className="hidden">
                        <Button type="submit">Guardar Cambios</Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/instructor/courses')}
                  >
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
            )}
            
            {activeTab === 'settings' && (
              <Card>
                <CardHeader>
                  <CardTitle>Configuración del Curso</CardTitle>
                  <CardDescription>
                    Opciones avanzadas para tu curso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Próximamente: Opciones de configuración adicionales como certificados, cuestionarios, y más.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        {/* Alert Dialog for publishing without content */}
        <AlertDialog open={showPublishAlert} onOpenChange={setShowPublishAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Publicar curso incompleto?</AlertDialogTitle>
              <AlertDialogDescription>
                {modulesCount === 0 
                  ? 'Este curso no tiene módulos ni lecciones.' 
                  : 'Este curso no tiene lecciones.'}
                Se recomienda añadir contenido antes de publicar.
                ¿Estás seguro de que deseas publicarlo ahora?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowPublishAlert(false)}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmPublish}>
                Publicar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AppLayout>
  );
};

export default EditCourseDetails;
