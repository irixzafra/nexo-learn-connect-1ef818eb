
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  useCourseModules, 
  useCreateModule, 
  useUpdateModule, 
  useDeleteModule,
  useModuleLessons,
  useCreateLesson,
  useUpdateLesson,
  useDeleteLesson
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
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
import { 
  Plus, 
  Edit, 
  Trash2, 
  FileText, 
  ArrowLeft, 
  Eye, 
  EyeOff,
  MoveUp,
  MoveDown
} from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import { toast } from 'sonner';
import { Course, Module, Lesson } from '@/types/course';

const EditCourseStructure: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [editModuleId, setEditModuleId] = useState<string | null>(null);
  const [editModuleTitle, setEditModuleTitle] = useState('');
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonModuleId, setNewLessonModuleId] = useState<string | null>(null);
  const [editLessonId, setEditLessonId] = useState<string | null>(null);
  const [editLessonTitle, setEditLessonTitle] = useState('');
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
  const { data: modules = [], isLoading: isLoadingModules } = useCourseModules(courseId);

  // Module mutations
  const createModule = useCreateModule();
  const updateModule = useUpdateModule();
  const deleteModule = useDeleteModule();
  
  // Lesson mutations
  const createLesson = useCreateLesson();
  const updateLesson = useUpdateLesson();
  const deleteLesson = useDeleteLesson();

  // Handle module operations
  const handleCreateModule = async () => {
    if (!newModuleTitle.trim()) {
      toast.error('El título del módulo no puede estar vacío');
      return;
    }

    try {
      await createModule.mutateAsync({ courseId, title: newModuleTitle });
      setNewModuleTitle('');
    } catch (error) {
      console.error('Error creating module:', error);
    }
  };

  const handleUpdateModule = async () => {
    if (!editModuleTitle.trim() || !editModuleId) {
      toast.error('El título del módulo no puede estar vacío');
      return;
    }

    try {
      await updateModule.mutateAsync({ moduleId: editModuleId, title: editModuleTitle });
      setEditModuleId(null);
      setEditModuleTitle('');
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

  // Handle lesson operations
  const handleCreateLesson = async () => {
    if (!newLessonTitle.trim() || !newLessonModuleId) {
      toast.error('El título de la lección no puede estar vacío');
      return;
    }

    try {
      await createLesson.mutateAsync({ 
        moduleId: newLessonModuleId, 
        courseId, 
        title: newLessonTitle 
      });
      setNewLessonTitle('');
      setNewLessonModuleId(null);
    } catch (error) {
      console.error('Error creating lesson:', error);
    }
  };

  const handleUpdateLesson = async () => {
    if (!editLessonTitle.trim() || !editLessonId) {
      toast.error('El título de la lección no puede estar vacío');
      return;
    }

    try {
      await updateLesson.mutateAsync({ 
        lessonId: editLessonId, 
        title: editLessonTitle 
      });
      setEditLessonId(null);
      setEditLessonTitle('');
    } catch (error) {
      console.error('Error updating lesson:', error);
    }
  };

  const handleDeleteLesson = async (lessonId: string, moduleId: string) => {
    try {
      await deleteLesson.mutateAsync({ lessonId, moduleId });
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const handleToggleLessonPreview = async (lesson: Lesson) => {
    try {
      await updateLesson.mutateAsync({ 
        lessonId: lesson.id, 
        isPreviewable: !lesson.is_previewable 
      });
    } catch (error) {
      console.error('Error toggling lesson preview:', error);
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
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Añadir Nuevo Módulo</h3>
                <div className="flex items-center gap-2">
                  <Input
                    value={newModuleTitle}
                    onChange={(e) => setNewModuleTitle(e.target.value)}
                    placeholder="Título del nuevo módulo"
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleCreateModule} 
                    disabled={createModule.isPending}
                  >
                    {createModule.isPending ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-1" />
                        Añadir
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Estructura del Curso</h3>
                
                {modules.length === 0 ? (
                  <div className="p-4 bg-muted rounded-md text-center">
                    <p>No hay módulos en este curso todavía. Añade tu primer módulo.</p>
                  </div>
                ) : (
                  <Accordion type="multiple" value={expandedModules} className="border rounded-md">
                    {modules.map((module) => (
                      <AccordionItem key={module.id} value={module.id} className="border-b">
                        <AccordionTrigger
                          onClick={() => toggleModuleExpansion(module.id)}
                          className="px-4 hover:no-underline"
                        >
                          <div className="flex items-center justify-between w-full">
                            <span>{module.title}</span>
                            <div className="flex items-center gap-1 mr-4">
                              <Dialog>
                                <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Editar Módulo</DialogTitle>
                                    <DialogDescription>
                                      Actualiza el título del módulo
                                    </DialogDescription>
                                  </DialogHeader>
                                  <Input
                                    value={editModuleId === module.id ? editModuleTitle : module.title}
                                    onChange={(e) => {
                                      setEditModuleId(module.id);
                                      setEditModuleTitle(e.target.value);
                                    }}
                                    placeholder="Título del módulo"
                                    className="my-4"
                                  />
                                  <DialogFooter>
                                    <Button 
                                      onClick={handleUpdateModule} 
                                      disabled={updateModule.isPending}
                                    >
                                      {updateModule.isPending ? 'Guardando...' : 'Guardar Cambios'}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Esta acción eliminará el módulo y todas sus lecciones. Esta acción no puede deshacerse.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeleteModule(module.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Eliminar
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <ModuleLessons 
                            moduleId={module.id}
                            courseId={courseId}
                            onCreateLesson={(title) => {
                              setNewLessonTitle(title);
                              setNewLessonModuleId(module.id);
                              handleCreateLesson();
                            }}
                            onUpdateLesson={(lessonId, title) => {
                              setEditLessonId(lessonId);
                              setEditLessonTitle(title);
                              handleUpdateLesson();
                            }}
                            onDeleteLesson={(lessonId) => handleDeleteLesson(lessonId, module.id)}
                            onTogglePreview={handleToggleLessonPreview}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </div>
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

interface ModuleLessonsProps {
  moduleId: string;
  courseId: string;
  onCreateLesson: (title: string) => void;
  onUpdateLesson: (lessonId: string, title: string) => void;
  onDeleteLesson: (lessonId: string) => void;
  onTogglePreview: (lesson: Lesson) => void;
}

const ModuleLessons: React.FC<ModuleLessonsProps> = ({ 
  moduleId, 
  courseId,
  onCreateLesson,
  onUpdateLesson,
  onDeleteLesson,
  onTogglePreview
}) => {
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [editingLesson, setEditingLesson] = useState<{ id: string; title: string } | null>(null);

  const { data: lessons = [], isLoading } = useModuleLessons(moduleId);

  const handleSubmitNewLesson = () => {
    if (!newLessonTitle.trim()) {
      toast.error('El título de la lección no puede estar vacío');
      return;
    }
    onCreateLesson(newLessonTitle);
    setNewLessonTitle('');
  };

  const handleSubmitEditLesson = () => {
    if (!editingLesson || !editingLesson.title.trim()) {
      toast.error('El título de la lección no puede estar vacío');
      return;
    }
    onUpdateLesson(editingLesson.id, editingLesson.title);
    setEditingLesson(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-20">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mt-2 mb-4">
        <h4 className="text-sm font-medium mb-2">Añadir Nueva Lección</h4>
        <div className="flex items-center gap-2">
          <Input
            value={newLessonTitle}
            onChange={(e) => setNewLessonTitle(e.target.value)}
            placeholder="Título de la nueva lección"
            className="flex-1"
          />
          <Button 
            onClick={handleSubmitNewLesson} 
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Añadir
          </Button>
        </div>
      </div>

      {lessons.length === 0 ? (
        <div className="p-3 bg-muted rounded-md text-center text-sm">
          <p>No hay lecciones en este módulo todavía. Añade tu primera lección.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {lessons.map((lesson) => (
            <div 
              key={lesson.id} 
              className="flex items-center justify-between p-3 border rounded-md bg-muted/40"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                {editingLesson?.id === lesson.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      value={editingLesson.title}
                      onChange={(e) => setEditingLesson({ ...editingLesson, title: e.target.value })}
                      placeholder="Título de la lección"
                      className="text-sm h-8"
                      autoFocus
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleSubmitEditLesson}
                    >
                      Guardar
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setEditingLesson(null)}
                    >
                      Cancelar
                    </Button>
                  </div>
                ) : (
                  <span className="text-sm">{lesson.title}</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onTogglePreview(lesson)}
                  title={lesson.is_previewable ? "Deshabilitar vista previa" : "Habilitar vista previa"}
                >
                  {lesson.is_previewable ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </Button>
                <Link 
                  to={`/instructor/courses/${courseId}/lessons/${lesson.id}/edit`}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  title="Editar contenido"
                >
                  <FileText className="h-4 w-4" />
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setEditingLesson({ id: lesson.id, title: lesson.title })}
                  title="Renombrar"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción eliminará la lección y todo su contenido. Esta acción no puede deshacerse.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => onDeleteLesson(lesson.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditCourseStructure;
