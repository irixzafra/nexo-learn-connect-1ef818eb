
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { PageSection } from '@/layouts/SectionPageLayout';
import { Button } from "@/components/ui/button";
import { FileText, Plus, Edit, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Module, Lesson } from '@/types/course';

interface CourseContentTabProps {
  course?: any;
}

const CourseContentTab: React.FC<CourseContentTabProps> = ({ course }) => {
  const { toast } = useToast();
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [editModuleId, setEditModuleId] = useState<string | null>(null);
  const [editModuleTitle, setEditModuleTitle] = useState("");
  const [isCreatingLesson, setIsCreatingLesson] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);
  const [newLesson, setNewLesson] = useState({
    title: '',
    content_type: 'text' as 'text' | 'video',
    content_text: '',
    content_video_url: '',
    is_previewable: false
  });
  const [isEditingLesson, setIsEditingLesson] = useState(false);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);

  // Fetch modules
  const { data: modules = [], isLoading: isLoadingModules, refetch: refetchModules } = useQuery({
    queryKey: ['courseModules', course?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .eq('course_id', course?.id)
        .order('module_order', { ascending: true });

      if (error) {
        console.error('Error fetching modules:', error);
        throw error;
      }

      return data as Module[];
    },
    enabled: !!course?.id,
  });

  // Fetch lessons for each module
  const { data: lessons = [], isLoading: isLoadingLessons, refetch: refetchLessons } = useQuery({
    queryKey: ['courseLessons', course?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', course?.id)
        .order('lesson_order', { ascending: true });

      if (error) {
        console.error('Error fetching lessons:', error);
        throw error;
      }

      return data as Lesson[];
    },
    enabled: !!course?.id,
  });

  const getLessonsForModule = (moduleId: string) => {
    return lessons.filter(lesson => lesson.module_id === moduleId);
  };

  const handleCreateModule = async () => {
    if (!newModuleTitle.trim()) {
      toast({
        title: "Error",
        description: "El título del módulo no puede estar vacío",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('modules')
        .insert({
          course_id: course?.id,
          title: newModuleTitle,
          module_order: modules.length + 1
        });

      if (error) throw error;

      toast({
        title: "Módulo creado",
        description: "El módulo ha sido creado correctamente",
      });
      setNewModuleTitle("");
      refetchModules();
    } catch (error) {
      console.error('Error creating module:', error);
      toast({
        title: "Error",
        description: "No se pudo crear el módulo",
        variant: "destructive"
      });
    }
  };

  const handleUpdateModule = async () => {
    if (!editModuleTitle.trim() || !editModuleId) return;

    try {
      const { error } = await supabase
        .from('modules')
        .update({ title: editModuleTitle })
        .eq('id', editModuleId);

      if (error) throw error;

      toast({
        title: "Módulo actualizado",
        description: "El módulo ha sido actualizado correctamente",
      });
      setEditModuleId(null);
      setEditModuleTitle("");
      refetchModules();
    } catch (error) {
      console.error('Error updating module:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el módulo",
        variant: "destructive"
      });
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    try {
      // First, delete all lessons associated with this module
      const { error: lessonError } = await supabase
        .from('lessons')
        .delete()
        .eq('module_id', moduleId);

      if (lessonError) throw lessonError;

      // Then delete the module
      const { error } = await supabase
        .from('modules')
        .delete()
        .eq('id', moduleId);

      if (error) throw error;

      toast({
        title: "Módulo eliminado",
        description: "El módulo y sus lecciones han sido eliminados correctamente",
      });
      refetchModules();
      refetchLessons();
    } catch (error) {
      console.error('Error deleting module:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el módulo",
        variant: "destructive"
      });
    }
  };

  const handleCreateLesson = async () => {
    if (!newLesson.title.trim() || !currentModuleId) {
      toast({
        title: "Error",
        description: "El título de la lección no puede estar vacío",
        variant: "destructive"
      });
      return;
    }

    try {
      const moduleLessons = getLessonsForModule(currentModuleId);
      
      const lessonData = {
        module_id: currentModuleId,
        course_id: course?.id,
        title: newLesson.title,
        content_type: newLesson.content_type,
        content_text: newLesson.content_type === 'text' ? { content: newLesson.content_text } : null,
        content_video_url: newLesson.content_type === 'video' ? newLesson.content_video_url : null,
        lesson_order: moduleLessons.length + 1,
        is_previewable: newLesson.is_previewable
      };
      
      const { error } = await supabase
        .from('lessons')
        .insert(lessonData);

      if (error) throw error;

      toast({
        title: "Lección creada",
        description: "La lección ha sido creada correctamente",
      });
      
      setNewLesson({
        title: '',
        content_type: 'text',
        content_text: '',
        content_video_url: '',
        is_previewable: false
      });
      
      setIsCreatingLesson(false);
      refetchLessons();
    } catch (error) {
      console.error('Error creating lesson:', error);
      toast({
        title: "Error",
        description: "No se pudo crear la lección",
        variant: "destructive"
      });
    }
  };

  const handleUpdateLesson = async () => {
    if (!newLesson.title.trim() || !currentLessonId) {
      toast({
        title: "Error",
        description: "El título de la lección no puede estar vacío",
        variant: "destructive"
      });
      return;
    }

    try {
      const lessonData = {
        title: newLesson.title,
        content_type: newLesson.content_type,
        content_text: newLesson.content_type === 'text' ? { content: newLesson.content_text } : null,
        content_video_url: newLesson.content_type === 'video' ? newLesson.content_video_url : null,
        is_previewable: newLesson.is_previewable
      };
      
      const { error } = await supabase
        .from('lessons')
        .update(lessonData)
        .eq('id', currentLessonId);

      if (error) throw error;

      toast({
        title: "Lección actualizada",
        description: "La lección ha sido actualizada correctamente",
      });
      
      setNewLesson({
        title: '',
        content_type: 'text',
        content_text: '',
        content_video_url: '',
        is_previewable: false
      });
      
      setIsEditingLesson(false);
      setCurrentLessonId(null);
      refetchLessons();
    } catch (error) {
      console.error('Error updating lesson:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la lección",
        variant: "destructive"
      });
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    try {
      const { error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', lessonId);

      if (error) throw error;

      toast({
        title: "Lección eliminada",
        description: "La lección ha sido eliminada correctamente",
      });
      refetchLessons();
    } catch (error) {
      console.error('Error deleting lesson:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la lección",
        variant: "destructive"
      });
    }
  };

  const handleEditLesson = (lesson: Lesson) => {
    setCurrentLessonId(lesson.id);
    setCurrentModuleId(lesson.module_id);
    setNewLesson({
      title: lesson.title,
      content_type: lesson.content_type as 'text' | 'video',
      content_text: lesson.content_text?.content || '',
      content_video_url: lesson.content_video_url || '',
      is_previewable: lesson.is_previewable
    });
    setIsEditingLesson(true);
  };

  const handleToggleModuleExpansion = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId) 
        : [...prev, moduleId]
    );
  };

  const handleToggleLessonPreview = async (lesson: Lesson) => {
    try {
      const { error } = await supabase
        .from('lessons')
        .update({ is_previewable: !lesson.is_previewable })
        .eq('id', lesson.id);

      if (error) throw error;

      toast({
        title: lesson.is_previewable ? "Vista previa desactivada" : "Vista previa activada",
        description: lesson.is_previewable 
          ? "La lección ya no estará disponible en vista previa" 
          : "La lección estará disponible en vista previa",
      });
      
      refetchLessons();
    } catch (error) {
      console.error('Error toggling lesson preview:', error);
      toast({
        title: "Error",
        description: "No se pudo cambiar el estado de vista previa",
        variant: "destructive"
      });
    }
  };

  if (isLoadingModules || isLoadingLessons) {
    return (
      <PageSection variant="card" title="Contenido del Curso" description="Cargando contenido...">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection variant="card" title="Contenido del Curso" description="Módulos y lecciones">
      {modules.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Estructura del Curso</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Este curso aún no tiene módulos. Comienza a organizar el contenido añadiendo módulos y lecciones.
          </p>
          <div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
              <div className="flex items-center space-x-2">
                <Input
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                  placeholder="Título del nuevo módulo"
                  className="max-w-xs"
                />
                <Button onClick={handleCreateModule}>
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir módulo
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Módulos del curso</h3>
            <div className="flex items-center space-x-2">
              <Input
                value={newModuleTitle}
                onChange={(e) => setNewModuleTitle(e.target.value)}
                placeholder="Título del nuevo módulo"
                className="max-w-xs"
              />
              <Button onClick={handleCreateModule}>
                <Plus className="h-4 w-4 mr-2" />
                Añadir
              </Button>
            </div>
          </div>

          <Accordion
            type="multiple"
            value={expandedModules}
            className="border rounded-md"
          >
            {modules.map((module) => (
              <AccordionItem key={module.id} value={module.id} className="border-b">
                <AccordionTrigger
                  onClick={() => handleToggleModuleExpansion(module.id)}
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
                            <Button onClick={handleUpdateModule}>
                              Guardar Cambios
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <FileText className="h-4 w-4" />
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
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium mb-2">Lecciones del módulo</h4>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setCurrentModuleId(module.id);
                          setIsCreatingLesson(true);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Añadir lección
                      </Button>
                    </div>

                    {getLessonsForModule(module.id).length === 0 ? (
                      <div className="p-4 bg-muted/50 rounded-md text-center">
                        <p className="text-sm text-muted-foreground">No hay lecciones en este módulo. Añade una nueva lección.</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {getLessonsForModule(module.id).map((lesson) => (
                          <div 
                            key={lesson.id} 
                            className="flex items-center justify-between p-3 border rounded-md bg-muted/40"
                          >
                            <div className="flex items-center gap-2 flex-1">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <div className="flex flex-col">
                                <span className="text-sm">{lesson.title}</span>
                                <span className="text-xs text-muted-foreground">
                                  {lesson.content_type === 'text' ? 'Texto' : 'Video'}
                                  {lesson.is_previewable && (
                                    <span className="inline-flex items-center ml-2 text-primary">
                                      <Eye className="h-3 w-3 mr-1" />
                                      Preview
                                    </span>
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => handleToggleLessonPreview(lesson)}
                                title={lesson.is_previewable ? "Deshabilitar vista previa" : "Habilitar vista previa"}
                              >
                                {lesson.is_previewable ? (
                                  <Eye className="h-4 w-4 text-primary" />
                                ) : (
                                  <EyeOff className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => handleEditLesson(lesson)}
                                title="Editar lección"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-destructive"
                                    title="Eliminar lección"
                                  >
                                    <FileText className="h-4 w-4" />
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
                                      onClick={() => handleDeleteLesson(lesson.id)}
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
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {/* Dialog for creating/editing lessons */}
      <Dialog 
        open={isCreatingLesson || isEditingLesson} 
        onOpenChange={(open) => {
          if (!open) {
            setIsCreatingLesson(false);
            setIsEditingLesson(false);
            setNewLesson({
              title: '',
              content_type: 'text',
              content_text: '',
              content_video_url: '',
              is_previewable: false
            });
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEditingLesson ? "Editar Lección" : "Crear Nueva Lección"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            <div className="space-y-2">
              <Label htmlFor="lesson-title">Título de la lección</Label>
              <Input
                id="lesson-title"
                value={newLesson.title}
                onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                placeholder="Título de la lección"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content-type">Tipo de contenido</Label>
              <Select
                value={newLesson.content_type}
                onValueChange={(value: 'text' | 'video') => 
                  setNewLesson({ ...newLesson, content_type: value })
                }
              >
                <SelectTrigger id="content-type">
                  <SelectValue placeholder="Selecciona el tipo de contenido" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Texto</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newLesson.content_type === 'text' ? (
              <div className="space-y-2">
                <Label htmlFor="content-text">Contenido de la lección</Label>
                <Textarea
                  id="content-text"
                  value={newLesson.content_text}
                  onChange={(e) => setNewLesson({ ...newLesson, content_text: e.target.value })}
                  placeholder="Escribe el contenido de la lección..."
                  rows={10}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="video-url">URL del video</Label>
                <Input
                  id="video-url"
                  value={newLesson.content_video_url}
                  onChange={(e) => setNewLesson({ ...newLesson, content_video_url: e.target.value })}
                  placeholder="https://www.youtube.com/embed/..."
                />
                <p className="text-xs text-muted-foreground">
                  Introduce la URL de inserción del video (YouTube embed URL)
                </p>
              </div>
            )}

            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="preview"
                checked={newLesson.is_previewable}
                onCheckedChange={(checked) => setNewLesson({ ...newLesson, is_previewable: checked })}
              />
              <Label htmlFor="preview">Disponible en vista previa</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreatingLesson(false);
                setIsEditingLesson(false);
              }}
            >
              Cancelar
            </Button>
            <Button onClick={isEditingLesson ? handleUpdateLesson : handleCreateLesson}>
              {isEditingLesson ? "Actualizar" : "Crear"} Lección
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageSection>
  );
};

export default CourseContentTab;
