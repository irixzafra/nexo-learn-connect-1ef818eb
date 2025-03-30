
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { FileUp, FileText, Clock, Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface Assignment {
  id: string;
  title: string;
  description: string;
  instructions?: string;
  due_date?: string;
  max_points: number;
  course_id: string;
}

interface AssignmentSubmission {
  id: string;
  assignment_id: string;
  user_id: string;
  content?: string;
  submission_files?: {
    file_name: string;
    file_url: string;
    file_type: string;
  }[];
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
  submitted_at: string;
}

interface AssignmentSubmissionProps {
  assignmentId: string;
  courseId: string;
  isInstructor?: boolean;
}

export function AssignmentSubmission({
  assignmentId,
  courseId,
  isInstructor = false
}: AssignmentSubmissionProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [grade, setGrade] = useState<number | ''>('');
  
  // Dummy data for development since we don't have the tables yet
  const dummyAssignment: Assignment = {
    id: assignmentId,
    title: 'Proyecto Final: Implementación de una API REST',
    description: 'En este proyecto final, implementarás una API REST completa utilizando los conceptos aprendidos durante el curso.',
    instructions: `
1. Crea un nuevo proyecto utilizando Node.js y Express.
2. Implementa al menos 5 endpoints: GET, POST, PUT, PATCH y DELETE.
3. Integra una base de datos MongoDB para persistencia de datos.
4. Documenta tu API utilizando Swagger.
5. Implementa autenticación mediante JWT.
6. Incluye validación de datos de entrada.
7. Escribe tests para tus endpoints principales.
    `,
    due_date: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days in the future
    max_points: 100,
    course_id: courseId
  };
  
  const dummySubmission: AssignmentSubmission | null = user ? {
    id: '123',
    assignment_id: assignmentId,
    user_id: user.id,
    content: 'Adjunto mi implementación de la API REST utilizando Node.js, Express y MongoDB. He incluido autenticación JWT y validación de datos utilizando Joi.',
    submission_files: [
      {
        file_name: 'proyecto-final.zip',
        file_url: '#',
        file_type: 'application/zip'
      }
    ],
    status: 'submitted',
    submitted_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  } : null;
  
  const { data: assignment, isLoading: isLoadingAssignment } = useQuery({
    queryKey: ['assignment', assignmentId],
    queryFn: async () => {
      // In a real app, this would fetch from the database
      return dummyAssignment;
    },
  });
  
  const { data: submission, isLoading: isLoadingSubmission } = useQuery({
    queryKey: ['assignmentSubmission', assignmentId, user?.id],
    queryFn: async () => {
      // In a real app, this would fetch from the database
      return dummySubmission;
    },
    enabled: !!user,
  });
  
  const submitAssignmentMutation = useMutation({
    mutationFn: async () => {
      // Simulate API call delay
      setIsUploading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would upload files to storage and create a submission record
      console.log('Submitting assignment:', { content, files });
      
      // Return mock response
      return {
        id: '123',
        assignment_id: assignmentId,
        user_id: user?.id,
        content,
        submission_files: files.map(file => ({
          file_name: file.name,
          file_url: '#',
          file_type: file.type
        })),
        status: 'submitted',
        submitted_at: new Date().toISOString()
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignmentSubmission', assignmentId, user?.id] });
      toast({
        title: 'Tarea enviada',
        description: 'Tu tarea ha sido enviada correctamente.',
      });
      setContent('');
      setFiles([]);
      setIsUploading(false);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo enviar la tarea. Inténtalo de nuevo.',
        variant: 'destructive'
      });
      setIsUploading(false);
    }
  });
  
  const gradeSubmissionMutation = useMutation({
    mutationFn: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would update the submission record
      console.log('Grading submission:', { grade, feedback });
      
      // Return mock response
      return {
        ...submission,
        grade,
        feedback,
        status: 'graded'
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignmentSubmission', assignmentId, user?.id] });
      toast({
        title: 'Calificación guardada',
        description: 'La calificación ha sido guardada correctamente.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo guardar la calificación. Inténtalo de nuevo.',
        variant: 'destructive'
      });
    }
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };
  
  const handleSubmit = () => {
    if (!content && files.length === 0) {
      toast({
        title: 'Entrada requerida',
        description: 'Por favor, escribe un comentario o adjunta archivos antes de enviar.',
        variant: 'destructive'
      });
      return;
    }
    
    submitAssignmentMutation.mutate();
  };
  
  const handleGradeSubmit = () => {
    if (grade === '') {
      toast({
        title: 'Calificación requerida',
        description: 'Por favor, asigna una calificación antes de guardar.',
        variant: 'destructive'
      });
      return;
    }
    
    gradeSubmissionMutation.mutate();
  };
  
  const isOverdue = () => {
    if (!assignment?.due_date) return false;
    return new Date() > new Date(assignment.due_date);
  };
  
  if (isLoadingAssignment) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!assignment) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center items-center h-40 text-muted-foreground">
            <p>No se encontró la tarea.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{assignment.title}</CardTitle>
        <CardDescription>
          {assignment.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Assignment details */}
        {assignment.instructions && (
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Instrucciones</h3>
            <div className="whitespace-pre-line text-sm text-muted-foreground">
              {assignment.instructions}
            </div>
          </div>
        )}
        
        {assignment.due_date && (
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Fecha límite:</span>
            <span className={isOverdue() ? 'text-red-500 font-medium' : 'font-medium'}>
              {format(parseISO(assignment.due_date), 'PPP', { locale: es })} a las {format(parseISO(assignment.due_date), 'HH:mm')}
            </span>
            {isOverdue() && <Badge variant="outline" className="text-red-500 border-red-200">Vencida</Badge>}
          </div>
        )}
        
        <div className="flex items-center gap-2 text-sm">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Puntuación máxima:</span>
          <span className="font-medium">{assignment.max_points} puntos</span>
        </div>
        
        <Separator className="my-4" />
        
        {/* View submission for instructors or students with existing submissions */}
        {(isInstructor || submission) && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              {isInstructor ? 'Envío del estudiante' : 'Tu envío'}
            </h3>
            
            {submission ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Enviado el {format(parseISO(submission.submitted_at), 'PPP', { locale: es })}</span>
                  </div>
                  
                  {submission.status === 'graded' && (
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Calificación:</span>
                      <span className="font-bold">{submission.grade}/{assignment.max_points}</span>
                    </div>
                  )}
                </div>
                
                {submission.content && (
                  <div className="border rounded-md p-3 bg-muted/20">
                    <p className="whitespace-pre-line text-sm">{submission.content}</p>
                  </div>
                )}
                
                {submission.submission_files && submission.submission_files.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Archivos adjuntos:</h4>
                    <div className="space-y-2">
                      {submission.submission_files.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 border rounded-md p-2">
                          <FileUp className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{file.file_name}</span>
                          <Button variant="ghost" size="sm" className="ml-auto h-7 px-2">
                            Descargar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {submission.status === 'graded' && submission.feedback && (
                  <div className="space-y-2 mt-4">
                    <h4 className="text-sm font-medium">Retroalimentación del instructor:</h4>
                    <div className="border rounded-md p-3 bg-blue-50">
                      <p className="whitespace-pre-line text-sm">{submission.feedback}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-yellow-600">
                <AlertCircle className="h-5 w-5" />
                <span>El estudiante aún no ha enviado esta tarea.</span>
              </div>
            )}
            
            {/* Grading section for instructors */}
            {isInstructor && submission && (
              <div className="space-y-4 mt-6 pt-4 border-t">
                <h3 className="text-lg font-medium">Calificar envío</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <Label htmlFor="grade">Calificación (sobre {assignment.max_points})</Label>
                    <Input
                      id="grade"
                      type="number"
                      min="0"
                      max={assignment.max_points}
                      placeholder={`0-${assignment.max_points}`}
                      value={grade}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (isNaN(value)) {
                          setGrade('');
                        } else if (value >= 0 && value <= assignment.max_points) {
                          setGrade(value);
                        }
                      }}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="md:col-span-3">
                    <Label htmlFor="feedback">Retroalimentación</Label>
                    <Textarea
                      id="feedback"
                      placeholder="Proporciona retroalimentación detallada para el estudiante..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="mt-1 min-h-[100px]"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    onClick={handleGradeSubmit}
                    disabled={gradeSubmissionMutation.isPending}
                  >
                    {gradeSubmissionMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      'Guardar calificación'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Submission form for students */}
        {!isInstructor && !submission && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Enviar tarea</h3>
            
            <div>
              <Label htmlFor="assignment-comment">Comentario (opcional)</Label>
              <Textarea
                id="assignment-comment"
                placeholder="Escribe un comentario o descripción de tu envío..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 min-h-[100px]"
              />
            </div>
            
            <div>
              <Label htmlFor="assignment-files">Archivos adjuntos</Label>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex-1">
                  <Input
                    id="assignment-files"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              {files.length > 0 && (
                <div className="mt-2 space-y-1">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center text-xs text-muted-foreground">
                      <FileUp className="h-3 w-3 mr-1" />
                      {file.name} ({(file.size / 1024).toFixed(1)} KB)
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Enviar tarea
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
