
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2, FileText, Eye, EyeOff } from "lucide-react";
import { Lesson } from "@/types/course";
import { useModuleLessons } from "../hooks/useModuleLessons";
import { useCreateLesson, useUpdateLesson, useDeleteLesson } from "@/hooks/use-course-structure";

interface LessonsListProps {
  moduleId: string;
  courseId: string;
}

export const LessonsList: React.FC<LessonsListProps> = ({ 
  moduleId, 
  courseId 
}) => {
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [editingLesson, setEditingLesson] = useState<{ id: string; title: string } | null>(null);

  const { data: lessons = [], isLoading } = useModuleLessons(moduleId);
  const createLesson = useCreateLesson();
  const updateLesson = useUpdateLesson();
  const deleteLesson = useDeleteLesson();

  const handleCreateLesson = async () => {
    if (!newLessonTitle.trim()) {
      toast.error("El título de la lección no puede estar vacío");
      return;
    }

    try {
      await createLesson.mutateAsync({ 
        moduleId, 
        courseId, 
        title: newLessonTitle 
      });
      setNewLessonTitle("");
    } catch (error) {
      console.error("Error creating lesson:", error);
    }
  };

  const handleUpdateLesson = async () => {
    if (!editingLesson || !editingLesson.title.trim()) {
      toast.error("El título de la lección no puede estar vacío");
      return;
    }
    
    try {
      await updateLesson.mutateAsync({ 
        lessonId: editingLesson.id, 
        title: editingLesson.title 
      });
      setEditingLesson(null);
    } catch (error) {
      console.error("Error updating lesson:", error);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    try {
      await deleteLesson.mutateAsync({ lessonId, moduleId });
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  const handleToggleLessonPreview = async (lesson: Lesson) => {
    try {
      await updateLesson.mutateAsync({ 
        lessonId: lesson.id, 
        isPreviewable: !lesson.is_previewable 
      });
      
      toast.success(
        lesson.is_previewable 
          ? "Vista previa desactivada" 
          : "Vista previa activada",
        {
          description: lesson.is_previewable 
            ? "Los usuarios ya no podrán ver esta lección sin inscribirse" 
            : "Los usuarios podrán ver esta lección sin inscribirse"
        }
      );
    } catch (error) {
      console.error("Error toggling lesson preview:", error);
      toast.error("Error al cambiar el estado de vista previa");
    }
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
            onClick={handleCreateLesson} 
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
                      onClick={handleUpdateLesson}
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
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{lesson.title}</span>
                    {lesson.is_previewable && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </span>
                    )}
                  </div>
                )}
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
  );
};
