
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
  UploadCloud,
  File,
  Trash2,
  Loader2,
  Calendar,
  Clock,
  HelpCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface AssignmentSubmissionProps {
  assignment: {
    id: string;
    title: string;
    description: string;
    dueDate?: string;
    points: number;
    attachments?: {
      name: string;
      url: string;
      type: string;
    }[];
  };
  userSubmission?: {
    id: string;
    content: string;
    fileUrls?: string[];
    status: 'submitted' | 'graded' | 'returned';
    grade?: number;
    feedback?: string;
    submittedAt: string;
    gradedAt?: string;
  };
  onSubmit: (data: { content: string; files: File[] }) => Promise<void>;
}

export function AssignmentSubmission({
  assignment,
  userSubmission,
  onSubmit,
}: AssignmentSubmissionProps) {
  const { toast } = useToast();
  const [content, setContent] = useState(userSubmission?.content || '');
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(userSubmission?.fileUrls || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isOverdue = assignment.dueDate ? new Date(assignment.dueDate) < new Date() : false;
  const canSubmit = !userSubmission || userSubmission.status === 'returned';
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFiles(prev => [...prev, ...fileList]);
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async () => {
    if (!content.trim() && files.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debes incluir contenido o archivos en tu entrega.",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit({ content, files });
      
      toast({
        title: "Entrega exitosa",
        description: "Tu tarea ha sido enviada correctamente.",
      });
      
      // Reset form if it's a new submission
      if (!userSubmission) {
        setContent('');
        setFiles([]);
      }
    } catch (error) {
      console.error('Error submitting assignment:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo enviar la tarea. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formatFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} bytes`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    }
  };
  
  // Determine submission status badge
  const getStatusBadge = () => {
    if (!userSubmission) {
      if (isOverdue) {
        return <Badge variant="destructive">Vencida</Badge>;
      }
      return <Badge variant="outline">Pendiente</Badge>;
    }
    
    switch (userSubmission.status) {
      case 'submitted':
        return <Badge variant="secondary">Enviada</Badge>;
      case 'graded':
        return <Badge variant="default">Calificada</Badge>;
      case 'returned':
        return <Badge variant="outline">Revisada</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
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
                    {isOverdue && (
                      <Badge variant="destructive" className="ml-2">Vencida</Badge>
                    )}
                  </span>
                )}
              </CardDescription>
            </div>
            {getStatusBadge()}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: assignment.description }} />
          </div>
          
          {assignment.attachments && assignment.attachments.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Archivos adjuntos:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {assignment.attachments.map((file, index) => (
                  <a
                    key={index}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 border rounded-md hover:bg-accent transition-colors"
                  >
                    <File className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm truncate">{file.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
          
          {/* Submission Section */}
          {canSubmit ? (
            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-medium">Enviar tarea</h3>
              
              <div className="space-y-2">
                <Label htmlFor="submission-content">Contenido de la entrega</Label>
                <Textarea
                  id="submission-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Escribe tu respuesta aquí..."
                  rows={6}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Archivos adjuntos</Label>
                <div className="grid grid-cols-1 gap-2">
                  {/* File upload input */}
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-accent transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Haz clic para seleccionar archivos</span> o arrastra y suelta
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, Word, Excel, PowerPoint, imágenes (máx. 10MB)
                      </p>
                    </div>
                    <Input
                      id="file-upload"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                  
                  {/* Selected files list */}
                  {files.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Archivos seleccionados:</h4>
                      <ScrollArea className="h-40 rounded-md border p-2">
                        <div className="space-y-2">
                          {files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-accent/50 rounded-md"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <File className="h-4 w-4 flex-shrink-0" />
                                <span className="text-sm font-medium truncate">{file.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  ({formatFileSize(file.size)})
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFile(index)}
                                className="h-8 w-8 text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  )}
                  
                  {/* Previously uploaded files */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Archivos anteriores:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {uploadedFiles.map((fileUrl, index) => {
                          const fileName = fileUrl.split('/').pop() || `Archivo ${index + 1}`;
                          return (
                            <a
                              key={index}
                              href={fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-2 border rounded-md hover:bg-accent transition-colors"
                            >
                              <File className="h-4 w-4 flex-shrink-0" />
                              <span className="text-sm truncate">{fileName}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Tu entrega</h3>
                {userSubmission && (
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    Enviada el {format(new Date(userSubmission.submittedAt), 'PPp', { locale: es })}
                  </div>
                )}
              </div>
              
              {userSubmission && (
                <div className="mt-4 space-y-4">
                  {/* Submission content */}
                  <div className="p-4 bg-muted/50 rounded-md">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      {userSubmission.content}
                    </div>
                  </div>
                  
                  {/* Submission files */}
                  {userSubmission.fileUrls && userSubmission.fileUrls.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Archivos adjuntos:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {userSubmission.fileUrls.map((fileUrl, index) => {
                          const fileName = fileUrl.split('/').pop() || `Archivo ${index + 1}`;
                          return (
                            <a
                              key={index}
                              href={fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-2 border rounded-md hover:bg-accent transition-colors"
                            >
                              <File className="h-4 w-4 flex-shrink-0" />
                              <span className="text-sm truncate">{fileName}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* Grade and feedback */}
                  {userSubmission.status === 'graded' && (
                    <div className="space-y-4 mt-6 p-4 border rounded-md">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Calificación</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-lg">
                            {userSubmission.grade} / {assignment.points}
                          </Badge>
                          {userSubmission.grade! >= assignment.points * 0.6 ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </div>
                      
                      {userSubmission.feedback && (
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">Retroalimentación del instructor:</h5>
                          <div className="p-3 bg-muted rounded-md">
                            <div className="prose prose-sm max-w-none">
                              {userSubmission.feedback}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {userSubmission.gradedAt && (
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          Calificada el {format(new Date(userSubmission.gradedAt), 'PPp', { locale: es })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
        {canSubmit && (
          <CardFooter className="flex justify-between">
            <div>
              {assignment.dueDate && isOverdue && (
                <div className="flex items-center text-amber-500 text-sm gap-1">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Esta tarea está vencida pero aún puedes enviarla.</span>
                </div>
              )}
            </div>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || (!content.trim() && files.length === 0)}
              className="ml-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Tarea'
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
