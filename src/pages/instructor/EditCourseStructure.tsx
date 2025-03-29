
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Separator } from '@/components/ui/separator';
import { Loader2, GripVertical, Plus, Save, X, ArrowLeft } from 'lucide-react';

// Schema for module form
const moduleSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'El título debe tener al menos 3 caracteres' })
    .max(100, { message: 'El título no puede exceder 100 caracteres' }),
});

// Schema for lesson form
const lessonSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'El título debe tener al menos 3 caracteres' })
    .max(100, { message: 'El título no puede exceder 100 caracteres' }),
});

type Module = {
  id: string;
  title: string;
  module_order: number;
  lessons: Lesson[];
};

type Lesson = {
  id: string;
  title: string;
  lesson_order: number;
  module_id: string;
  content_type: 'text' | 'video';
  is_previewable: boolean;
};

const EditCourseStructure: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);
  const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false);
  const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false);
  const [moduleToDeleteId, setModuleToDeleteId] = useState<string | null>(null);
  const [lessonToDeleteId, setLessonToDeleteId] = useState<string | null>(null);
  const [lessonModuleId, setLessonModuleId] = useState<string | null>(null);

  const moduleForm = useForm<{ title: string }>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      title: '',
    },
  });

  const lessonForm = useForm<{ title: string }>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: '',
    },
  });

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

      // Fetch modules with their order
      const { data: modulesData, error: modulesError } = await supabase
        .from('modules')
        .select('*')
        .eq('course_id', id)
        .order('module_order', { ascending: true });

      if (modulesError) throw modulesError;

      // Fetch lessons for all modules
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', id)
        .order('lesson_order', { ascending: true });

      if (lessonsError) throw lessonsError;

      // Group lessons by module_id
      const lessonsGroupedByModule = lessonsData.reduce((acc: Record<string, Lesson[]>, lesson: Lesson) => {
        if (!acc[lesson.module_id]) {
          acc[lesson.module_id] = [];
        }
        acc[lesson.module_id].push(lesson);
        return acc;
      }, {});

      // Combine modules with their lessons
      const modulesWithLessons = modulesData.map((module: Module) => ({
        ...module,
        lessons: lessonsGroupedByModule[module.id] || [],
      }));

      setModules(modulesWithLessons);
    } catch (error: any) {
      console.error('Error fetching course structure:', error);
      toast({
        title: 'Error',
        description: error.message || 'Ha ocurrido un error inesperado',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = async (result: any) => {
    const { destination, source, type } = result;

    // If dropped outside of droppable area or dropped in the same position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    // Handle module reordering
    if (type === 'MODULE') {
      const reorderedModules = Array.from(modules);
      const [movedModule] = reorderedModules.splice(source.index, 1);
      reorderedModules.splice(destination.index, 0, movedModule);

      // Update order indexes
      const updatedModules = reorderedModules.map((module, index) => ({
        ...module,
        module_order: index,
      }));

      setModules(updatedModules);

      // Update in database
      try {
        const updates = updatedModules.map((module) => ({
          id: module.id,
          module_order: module.module_order,
        }));

        const { error } = await supabase.from('modules').upsert(updates);
        if (error) throw error;
      } catch (error: any) {
        console.error('Error updating module order:', error);
        toast({
          title: 'Error',
          description: 'No se pudo actualizar el orden de los módulos',
          variant: 'destructive',
        });
        fetchCourseData(); // Revert to previous state
      }
      return;
    }

    // Handle lesson reordering within the same module
    if (source.droppableId === destination.droppableId) {
      const moduleIndex = modules.findIndex(m => m.id === source.droppableId);
      const modulesCopy = Array.from(modules);
      const lessonsCopy = Array.from(modulesCopy[moduleIndex].lessons);
      
      const [movedLesson] = lessonsCopy.splice(source.index, 1);
      lessonsCopy.splice(destination.index, 0, movedLesson);
      
      // Update order indexes
      const updatedLessons = lessonsCopy.map((lesson, index) => ({
        ...lesson,
        lesson_order: index,
      }));
      
      modulesCopy[moduleIndex].lessons = updatedLessons;
      setModules(modulesCopy);
      
      // Update in database
      try {
        const updates = updatedLessons.map((lesson) => ({
          id: lesson.id,
          lesson_order: lesson.lesson_order,
        }));
        
        const { error } = await supabase.from('lessons').upsert(updates);
        if (error) throw error;
      } catch (error: any) {
        console.error('Error updating lesson order:', error);
        toast({
          title: 'Error',
          description: 'No se pudo actualizar el orden de las lecciones',
          variant: 'destructive',
        });
        fetchCourseData(); // Revert to previous state
      }
      return;
    }

    // Handle lesson moving between modules
    const sourceModuleIndex = modules.findIndex(m => m.id === source.droppableId);
    const destModuleIndex = modules.findIndex(m => m.id === destination.droppableId);
    
    const modulesCopy = Array.from(modules);
    const sourceLessons = Array.from(modulesCopy[sourceModuleIndex].lessons);
    const destLessons = Array.from(modulesCopy[destModuleIndex].lessons);
    
    const [movedLesson] = sourceLessons.splice(source.index, 1);
    movedLesson.module_id = destination.droppableId;
    destLessons.splice(destination.index, 0, movedLesson);
    
    // Update order indexes for both source and destination modules
    const updatedSourceLessons = sourceLessons.map((lesson, index) => ({
      ...lesson,
      lesson_order: index,
    }));
    
    const updatedDestLessons = destLessons.map((lesson, index) => ({
      ...lesson,
      lesson_order: index,
    }));
    
    modulesCopy[sourceModuleIndex].lessons = updatedSourceLessons;
    modulesCopy[destModuleIndex].lessons = updatedDestLessons;
    setModules(modulesCopy);
    
    // Update in database
    try {
      const allUpdates = [
        ...updatedSourceLessons.map((lesson) => ({
          id: lesson.id,
          lesson_order: lesson.lesson_order,
        })),
        ...updatedDestLessons.map((lesson) => ({
          id: lesson.id,
          module_id: destination.droppableId,
          lesson_order: lesson.lesson_order,
        })),
      ];
      
      const { error } = await supabase.from('lessons').upsert(allUpdates);
      if (error) throw error;
    } catch (error: any) {
      console.error('Error moving lesson between modules:', error);
      toast({
        title: 'Error',
        description: 'No se pudo mover la lección entre módulos',
        variant: 'destructive',
      });
      fetchCourseData(); // Revert to previous state
    }
  };

  const handleAddModule = async (data: { title: string }) => {
    if (!id) return;
    
    const newModuleOrder = modules.length;
    
    try {
      const { data: newModule, error } = await supabase
        .from('modules')
        .insert({
          course_id: id,
          title: data.title,
          module_order: newModuleOrder,
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Add the new module to the state
      setModules([...modules, { ...newModule, lessons: [] }]);
      moduleForm.reset();
      setIsModuleDialogOpen(false);
      
      toast({
        title: 'Módulo creado',
        description: 'El módulo ha sido creado exitosamente',
      });
    } catch (error: any) {
      console.error('Error creating module:', error);
      toast({
        title: 'Error',
        description: error.message || 'No se pudo crear el módulo',
        variant: 'destructive',
      });
    }
  };

  const handleAddLesson = async (data: { title: string }) => {
    if (!id || !lessonModuleId) return;
    
    const moduleIndex = modules.findIndex(m => m.id === lessonModuleId);
    if (moduleIndex === -1) return;
    
    const newLessonOrder = modules[moduleIndex].lessons.length;
    
    try {
      const { data: newLesson, error } = await supabase
        .from('lessons')
        .insert({
          course_id: id,
          module_id: lessonModuleId,
          title: data.title,
          content_type: 'text', // Default type
          lesson_order: newLessonOrder,
          is_previewable: false,
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Add the new lesson to the module
      const updatedModules = [...modules];
      updatedModules[moduleIndex].lessons.push(newLesson);
      setModules(updatedModules);
      
      lessonForm.reset();
      setIsLessonDialogOpen(false);
      setLessonModuleId(null);
      
      toast({
        title: 'Lección creada',
        description: 'La lección ha sido creada exitosamente',
      });
    } catch (error: any) {
      console.error('Error creating lesson:', error);
      toast({
        title: 'Error',
        description: error.message || 'No se pudo crear la lección',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteModule = async () => {
    if (!moduleToDeleteId) return;
    
    try {
      // First, delete all lessons in this module
      const { error: lessonsError } = await supabase
        .from('lessons')
        .delete()
        .eq('module_id', moduleToDeleteId);
        
      if (lessonsError) throw lessonsError;
      
      // Then delete the module
      const { error: moduleError } = await supabase
        .from('modules')
        .delete()
        .eq('id', moduleToDeleteId);
        
      if (moduleError) throw moduleError;
      
      // Update the state
      setModules(modules.filter(module => module.id !== moduleToDeleteId));
      setModuleToDeleteId(null);
      
      toast({
        title: 'Módulo eliminado',
        description: 'El módulo y todas sus lecciones han sido eliminados',
      });
      
      // Refresh to update order
      fetchCourseData();
    } catch (error: any) {
      console.error('Error deleting module:', error);
      toast({
        title: 'Error',
        description: error.message || 'No se pudo eliminar el módulo',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteLesson = async () => {
    if (!lessonToDeleteId) return;
    
    try {
      const { error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', lessonToDeleteId);
        
      if (error) throw error;
      
      // Update the state
      const updatedModules = modules.map(module => ({
        ...module,
        lessons: module.lessons.filter(lesson => lesson.id !== lessonToDeleteId),
      }));
      
      setModules(updatedModules);
      setLessonToDeleteId(null);
      
      toast({
        title: 'Lección eliminada',
        description: 'La lección ha sido eliminada exitosamente',
      });
      
      // Refresh to update order
      fetchCourseData();
    } catch (error: any) {
      console.error('Error deleting lesson:', error);
      toast({
        title: 'Error',
        description: error.message || 'No se pudo eliminar la lección',
        variant: 'destructive',
      });
    }
  };

  const navigateToEditLesson = (lessonId: string) => {
    navigate(`/instructor/courses/${id}/lessons/${lessonId}/edit`);
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
            <h1 className="text-3xl font-bold">Estructura del Curso</h1>
            <p className="text-muted-foreground">{course.title}</p>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" onClick={() => navigate(`/instructor/courses/${id}/edit`)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Detalles
            </Button>
            
            <Dialog open={isModuleDialogOpen} onOpenChange={setIsModuleDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Módulo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Añadir Módulo</DialogTitle>
                  <DialogDescription>
                    Los módulos te permiten organizar el contenido de tu curso en secciones.
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...moduleForm}>
                  <form onSubmit={moduleForm.handleSubmit(handleAddModule)} className="space-y-4">
                    <FormField
                      control={moduleForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título del Módulo</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Ej: Introducción" autoFocus />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsModuleDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit">Guardar Módulo</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Separator className="mb-6" />
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="modules" type="MODULE">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-6"
              >
                {modules.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <p className="text-muted-foreground mb-4">Este curso aún no tiene módulos</p>
                      <Button onClick={() => setIsModuleDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Añadir primer módulo
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  modules.map((module, index) => (
                    <Draggable key={module.id} draggableId={module.id} index={index}>
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="border"
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center">
                              <div
                                {...provided.dragHandleProps}
                                className="mr-2 cursor-grab hover:text-primary"
                              >
                                <GripVertical className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-xl">{module.title}</CardTitle>
                                <CardDescription>
                                  {module.lessons.length} lecciones
                                </CardDescription>
                              </div>
                              <div className="flex space-x-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      onClick={() => {
                                        setLessonModuleId(module.id);
                                        setIsLessonDialogOpen(true);
                                      }}
                                    >
                                      <Plus className="h-4 w-4 mr-1" />
                                      Lección
                                    </Button>
                                  </DialogTrigger>
                                </Dialog>
                                
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                      onClick={() => setModuleToDeleteId(module.id)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>¿Eliminar módulo?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Esta acción eliminará el módulo "{module.title}" y todas sus lecciones.
                                        Esta acción no se puede deshacer.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel onClick={() => setModuleToDeleteId(null)}>
                                        Cancelar
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={handleDeleteModule}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        Eliminar
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>
                          </CardHeader>
                          <Separator />
                          <CardContent className="pt-4">
                            <Droppable droppableId={module.id} type="LESSON">
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className="space-y-2"
                                >
                                  {module.lessons.length === 0 ? (
                                    <div className="flex justify-center p-4 text-sm text-muted-foreground border border-dashed rounded-md">
                                      No hay lecciones en este módulo
                                    </div>
                                  ) : (
                                    module.lessons.map((lesson, index) => (
                                      <Draggable
                                        key={lesson.id}
                                        draggableId={lesson.id}
                                        index={index}
                                      >
                                        {(provided) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className="flex items-center p-3 bg-background border rounded-md"
                                          >
                                            <div
                                              {...provided.dragHandleProps}
                                              className="mr-2 cursor-grab hover:text-primary"
                                            >
                                              <GripVertical className="h-4 w-4" />
                                            </div>
                                            <div 
                                              className="flex-1 cursor-pointer" 
                                              onClick={() => navigateToEditLesson(lesson.id)}
                                            >
                                              <div className="font-medium">{lesson.title}</div>
                                              <div className="flex items-center text-xs text-muted-foreground">
                                                <span className="capitalize">
                                                  {lesson.content_type === 'text' ? 'Texto' : 'Video'}
                                                </span>
                                                {lesson.is_previewable && (
                                                  <span className="ml-2 px-1.5 py-0.5 bg-primary/10 text-primary rounded-sm">
                                                    Vista previa
                                                  </span>
                                                )}
                                              </div>
                                            </div>
                                            <AlertDialog>
                                              <AlertDialogTrigger asChild>
                                                <Button
                                                  size="sm"
                                                  variant="ghost"
                                                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                                                  onClick={() => setLessonToDeleteId(lesson.id)}
                                                >
                                                  <X className="h-4 w-4" />
                                                </Button>
                                              </AlertDialogTrigger>
                                              <AlertDialogContent>
                                                <AlertDialogHeader>
                                                  <AlertDialogTitle>¿Eliminar lección?</AlertDialogTitle>
                                                  <AlertDialogDescription>
                                                    Esta acción eliminará la lección "{lesson.title}" y todo su contenido.
                                                    Esta acción no se puede deshacer.
                                                  </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                  <AlertDialogCancel onClick={() => setLessonToDeleteId(null)}>
                                                    Cancelar
                                                  </AlertDialogCancel>
                                                  <AlertDialogAction
                                                    onClick={handleDeleteLesson}
                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                  >
                                                    Eliminar
                                                  </AlertDialogAction>
                                                </AlertDialogFooter>
                                              </AlertDialogContent>
                                            </AlertDialog>
                                          </div>
                                        )}
                                      </Draggable>
                                    ))
                                  )}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        
        {/* Dialog for adding lesson */}
        <Dialog open={isLessonDialogOpen} onOpenChange={setIsLessonDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Añadir Lección</DialogTitle>
              <DialogDescription>
                Añade una nueva lección a este módulo. Podrás editar su contenido después.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...lessonForm}>
              <form onSubmit={lessonForm.handleSubmit(handleAddLesson)} className="space-y-4">
                <FormField
                  control={lessonForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título de la Lección</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ej: Introducción al tema" autoFocus />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => {
                    setIsLessonDialogOpen(false);
                    setLessonModuleId(null);
                  }}>
                    Cancelar
                  </Button>
                  <Button type="submit">Guardar Lección</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default EditCourseStructure;
