
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Download,
  FileText,
  Loader2,
  Calendar,
  Clock,
  User,
  Mail,
  ExternalLink,
  File,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AssignmentGradingProps {
  assignment: {
    id: string;
    title: string;
    description: string;
    dueDate?: string;
    points: number;
  };
  submission: {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    userAvatar?: string;
    content: string;
    fileUrls?: string[];
    status: 'submitted' | 'graded' | 'returned';
    grade?: number;
    feedback?: string;
    submittedAt: string;
    gradedAt?: string;
  };
  onGrade: (data: { submissionId: string; grade: number; feedback: string }) => Promise<void>;
}

export function AssignmentGrading({
  assignment,
  submission,
  onGrade,
}: AssignmentGradingProps) {
  const { toast } = useToast();
  const [grade, setGrade] = useState<number>(submission.grade || 0);
  const [feedback, setFeedback] = useState<string>(submission.feedback || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isLate = submission.submittedAt && assignment.dueDate 
    ? new Date(submission.submittedAt) > new Date(assignment.dueDate)
    : false;
  
  const handleSubmit = async () => {
    if (grade < 0 || grade > assignment.points) {
      toast({
        variant: "destructive",
        title: "Error de calificación",
        description: `La calificación debe estar entre 0 y ${assignment.points} puntos.`,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onGrade({
        submissionId: submission.id,
        grade,
        feedback,
      });
      
      toast({
        title: "Calificación guardada",
        description: "La calificación ha sido guardada y enviada al estudiante.",
      });
    } catch (error) {
      console.error('Error grading assignment:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo guardar la calificación. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const downloadAll = () => {
    // In a real implementation, this would download all files as a zip
    toast({
      title: "Descarga iniciada",
      description: "Se está generando un archivo ZIP con todos los archivos.",
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{assignment.title}</CardTitle>
            <CardDescription className="mt-2">
              {assignment.points} puntos
              {assignment.dueDate && (
                <span className="ml-4 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Fecha límite: {format(new Date(assignment.dueDate), 'PPP', { locale: es })}
                </span>
              )}
            </CardDescription>
          </div>
          <div>
            <Badge variant={submission.status === 'graded' ? 'default' : 'secondary'}>
              {submission.status === 'submitted' ? 'Pendiente de revisión' : 'Calificada'}
            </Badge>
            {isLate && (
              <Badge variant="destructive" className="ml-2">
                Entrega tardía
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Student information */}
        <div className="flex items-center space-x-4 p-4 border rounded-md">
          <Avatar className="h-12 w-12">
            <AvatarImage src={submission.userAvatar} alt={submission.userName} />
            <AvatarFallback>
              {submission.userName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{submission.userName}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{submission.userEmail}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <Clock className="h-4 w-4" />
              <span>
                Enviado el {format(new Date(submission.submittedAt), 'PPp', { locale: es })}
                {isLate && (
                  <span className="text-red-500 ml-1">
                    (Retraso de {Math.ceil((new Date(submission.submittedAt).getTime() - new Date(assignment.dueDate!).getTime()) / (1000 * 60 * 60 * 24))} días)
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
        
        {/* Submission files */}
        {submission.fileUrls && submission.fileUrls.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Archivos Adjuntos
              </h3>
              <Button variant="outline" size="sm" onClick={downloadAll} className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Descargar Todo
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {submission.fileUrls.map((fileUrl, index) => {
                const fileName = fileUrl.split('/').pop() || `Archivo ${index + 1}`;
                return (
                  <a
                    key={index}
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 border rounded-md hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <File className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm truncate">{fileName}</span>
                    </div>
                    <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  </a>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Submission content */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Contenido de la Entrega</h3>
          <ScrollArea className="h-60 w-full rounded-md border p-4">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {submission.content}
            </div>
          </ScrollArea>
        </div>
        
        {/* Grading form */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-medium">Calificación</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <Label htmlFor="grade">Puntuación (máx. {assignment.points})</Label>
              <div className="flex items-center mt-2">
                <Input
                  id="grade"
                  type="number"
                  min="0"
                  max={assignment.points}
                  value={grade}
                  onChange={(e) => setGrade(Number(e.target.value))}
                  className="w-20"
                />
                <span className="ml-2">/ {assignment.points}</span>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <Label htmlFor="feedback">Retroalimentación para el estudiante</Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Proporciona comentarios constructivos sobre la entrega..."
                className="mt-2"
                rows={6}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Volver a la lista</Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            'Guardar Calificación'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
