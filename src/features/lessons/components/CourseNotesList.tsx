
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLessonNotes, LessonNote } from "../hooks/useLessonNotes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, FileText, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface CourseNotesListProps {
  userId: string;
  courseId: string;
  lessons?: Array<{ id: string; title: string }>;
}

export const CourseNotesList: React.FC<CourseNotesListProps> = ({
  userId,
  courseId,
  lessons = [],
}) => {
  const navigate = useNavigate();
  const { courseNotes, isLoading } = useLessonNotes(userId, undefined, courseId);

  // Función para obtener el título de la lección
  const getLessonTitle = (lessonId: string) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    return lesson ? lesson.title : "Lección desconocida";
  };

  // Agrupar notas por lección
  const groupedNotes = courseNotes?.reduce((acc, note) => {
    if (!acc[note.lesson_id]) {
      acc[note.lesson_id] = [];
    }
    acc[note.lesson_id].push(note);
    return acc;
  }, {} as Record<string, LessonNote[]>);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!courseNotes || courseNotes.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center p-6">
            <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No hay notas</h3>
            <p className="text-muted-foreground mb-4">
              Todavía no has creado ninguna nota para este curso.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {groupedNotes &&
        Object.entries(groupedNotes).map(([lessonId, notes]) => (
          <Card key={lessonId} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                {getLessonTitle(lessonId)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notes.map((note) => (
                  <div key={note.id} className="relative group">
                    <div className="bg-muted p-4 rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-muted-foreground">
                          Actualizado {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true, locale: es })}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => navigate(`/courses/${courseId}/learn/${lessonId}`)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="whitespace-pre-wrap text-sm">
                        {note.content.length > 300
                          ? `${note.content.substring(0, 300)}...`
                          : note.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};
