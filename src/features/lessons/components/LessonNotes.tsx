
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLessonNotes } from "../hooks/useLessonNotes";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, Trash2 } from "lucide-react";
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

interface LessonNotesProps {
  lessonId: string;
  courseId: string;
}

export const LessonNotes: React.FC<LessonNotesProps> = ({ lessonId, courseId }) => {
  const { user } = useAuth();
  const [noteContent, setNoteContent] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const { note, isLoading, saveNote, deleteNote } = useLessonNotes(
    user?.id,
    lessonId,
    courseId
  );

  // Actualizar el estado cuando la nota cambia
  useEffect(() => {
    if (note) {
      setNoteContent(note.content);
      setHasChanges(false);
    } else {
      setNoteContent("");
      setHasChanges(false);
    }
  }, [note]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (noteContent.trim()) {
      await saveNote.mutateAsync(noteContent);
      setHasChanges(false);
    }
  };

  const handleDelete = async () => {
    if (note) {
      await deleteNote.mutateAsync(note.id);
      setNoteContent("");
      setHasChanges(false);
    }
  };

  if (!user) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Mis Notas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Inicia sesión para añadir notas a esta lección
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Mis Notas</span>
          {note && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={isLoading}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Se eliminará permanentemente tu nota de esta lección.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <Textarea
            placeholder="Escribe tus notas aquí..."
            className="min-h-[150px] resize-none"
            value={noteContent}
            onChange={handleChange}
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-end pb-3">
        <Button
          onClick={handleSave}
          disabled={isLoading || !hasChanges || !noteContent.trim()}
          size="sm"
          className="gap-1"
        >
          {saveNote.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Guardar nota
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
