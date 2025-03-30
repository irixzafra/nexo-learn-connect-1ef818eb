
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  PlusCircle, 
  Trash2, 
  MoveVertical, 
  CheckCircle, 
  XCircle,
  Edit,
  Clock,
  HelpCircle,
  GripVertical,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
  explanation?: string;
}

interface QuizCreatorProps {
  lessonId: string;
  existingQuiz?: {
    id: string;
    title: string;
    description: string;
    passPercentage: number;
    timeLimit?: number;
    questions: QuizQuestion[];
  };
  onSave: (quizData: any) => void;
}

export function QuizCreator({ 
  lessonId, 
  existingQuiz, 
  onSave 
}: QuizCreatorProps) {
  const { toast } = useToast();
  
  const [quizData, setQuizData] = useState({
    title: existingQuiz?.title || '',
    description: existingQuiz?.description || '',
    passPercentage: existingQuiz?.passPercentage || 70,
    timeLimit: existingQuiz?.timeLimit || 0,
    questions: existingQuiz?.questions || [],
  });
  
  const [activeQuestion, setActiveQuestion] = useState<QuizQuestion | null>(null);
  const [newQuestion, setNewQuestion] = useState<Partial<QuizQuestion>>({
    question: '',
    type: 'multiple_choice',
    options: ['', ''],
    correctAnswer: '',
    points: 1,
    explanation: '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  const handleQuizDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuizData({
      ...quizData,
      [name]: name === 'passPercentage' || name === 'timeLimit' ? Number(value) : value,
    });
  };
  
  const handleNewQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewQuestion({
      ...newQuestion,
      [name]: name === 'points' ? Number(value) : value,
    });
  };
  
  const handleOptionChange = (index: number, value: string) => {
    if (!newQuestion.options) return;
    
    const newOptions = [...newQuestion.options];
    newOptions[index] = value;
    
    setNewQuestion({
      ...newQuestion,
      options: newOptions,
    });
  };
  
  const addOption = () => {
    if (!newQuestion.options) return;
    
    setNewQuestion({
      ...newQuestion,
      options: [...newQuestion.options, ''],
    });
  };
  
  const removeOption = (index: number) => {
    if (!newQuestion.options || newQuestion.options.length <= 2) return;
    
    const newOptions = newQuestion.options.filter((_, i) => i !== index);
    
    setNewQuestion({
      ...newQuestion,
      options: newOptions,
      correctAnswer: Array.isArray(newQuestion.correctAnswer)
        ? newQuestion.correctAnswer.filter(answer => Number(answer) !== index)
        : newQuestion.correctAnswer === String(index) ? '' : newQuestion.correctAnswer,
    });
  };
  
  const setCorrectAnswer = (value: string | string[]) => {
    setNewQuestion({
      ...newQuestion,
      correctAnswer: value,
    });
  };
  
  const addQuestion = () => {
    // Validate question
    if (!newQuestion.question || (newQuestion.type === 'multiple_choice' && (!newQuestion.options || !newQuestion.correctAnswer))) {
      toast({
        variant: "destructive",
        title: "Datos incompletos",
        description: "Por favor completa todos los campos requeridos de la pregunta.",
      });
      return;
    }
    
    const question: QuizQuestion = {
      id: isEditing && activeQuestion ? activeQuestion.id : Date.now().toString(),
      question: newQuestion.question || '',
      type: newQuestion.type || 'multiple_choice',
      options: newQuestion.type === 'multiple_choice' ? newQuestion.options : undefined,
      correctAnswer: newQuestion.correctAnswer || '',
      points: newQuestion.points || 1,
      explanation: newQuestion.explanation,
    };
    
    if (isEditing && activeQuestion) {
      // Update existing question
      setQuizData({
        ...quizData,
        questions: quizData.questions.map(q => q.id === activeQuestion.id ? question : q),
      });
      toast({
        title: "Pregunta actualizada",
        description: "La pregunta ha sido actualizada con éxito.",
      });
    } else {
      // Add new question
      setQuizData({
        ...quizData,
        questions: [...quizData.questions, question],
      });
      toast({
        title: "Pregunta añadida",
        description: "La pregunta ha sido añadida con éxito.",
      });
    }
    
    // Reset form
    setNewQuestion({
      question: '',
      type: 'multiple_choice',
      options: ['', ''],
      correctAnswer: '',
      points: 1,
      explanation: '',
    });
    setIsEditing(false);
    setActiveQuestion(null);
  };
  
  const editQuestion = (question: QuizQuestion) => {
    setActiveQuestion(question);
    setNewQuestion({
      question: question.question,
      type: question.type,
      options: question.options || ['', ''],
      correctAnswer: question.correctAnswer,
      points: question.points,
      explanation: question.explanation,
    });
    setIsEditing(true);
  };
  
  const deleteQuestion = (id: string) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.filter(q => q.id !== id),
    });
    toast({
      title: "Pregunta eliminada",
      description: "La pregunta ha sido eliminada con éxito.",
    });
  };
  
  const moveQuestion = (id: string, direction: 'up' | 'down') => {
    const index = quizData.questions.findIndex(q => q.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === quizData.questions.length - 1)
    ) return;
    
    const newQuestions = [...quizData.questions];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newQuestions[index], newQuestions[newIndex]] = [newQuestions[newIndex], newQuestions[index]];
    
    setQuizData({
      ...quizData,
      questions: newQuestions,
    });
  };
  
  const handleSubmit = () => {
    if (!quizData.title || quizData.questions.length === 0) {
      toast({
        variant: "destructive",
        title: "Datos incompletos",
        description: "Por favor completa el título del cuestionario y añade al menos una pregunta.",
      });
      return;
    }
    
    onSave({
      ...quizData,
      lessonId,
    });
  };
  
  const cancelEditing = () => {
    setIsEditing(false);
    setActiveQuestion(null);
    setNewQuestion({
      question: '',
      type: 'multiple_choice',
      options: ['', ''],
      correctAnswer: '',
      points: 1,
      explanation: '',
    });
  };
  
  const getTotalPoints = () => {
    return quizData.questions.reduce((total, q) => total + q.points, 0);
  };
  
  const getPassingScore = () => {
    const total = getTotalPoints();
    return Math.ceil((total * quizData.passPercentage) / 100);
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="content">
        <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2">
          <TabsTrigger value="content">Contenido</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-6">
          {/* Quiz Title and Description */}
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título del Cuestionario</Label>
                <Input
                  id="title"
                  name="title"
                  value={quizData.title}
                  onChange={handleQuizDataChange}
                  placeholder="Ej. Cuestionario del Módulo 1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción (opcional)</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={quizData.description}
                  onChange={handleQuizDataChange}
                  placeholder="Describe brevemente el propósito de este cuestionario..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Questions Editor */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Preguntas</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <PlusCircle className="h-4 w-4" />
                      Añadir Pregunta
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>
                        {isEditing ? "Editar Pregunta" : "Añadir Nueva Pregunta"}
                      </DialogTitle>
                      <DialogDescription>
                        Completa los campos para {isEditing ? "actualizar la" : "crear una nueva"} pregunta
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="question-text">Pregunta</Label>
                        <Textarea
                          id="question-text"
                          name="question"
                          value={newQuestion.question}
                          onChange={handleNewQuestionChange}
                          placeholder="Escribe la pregunta aquí..."
                          rows={3}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Tipo de Pregunta</Label>
                        <RadioGroup 
                          value={newQuestion.type} 
                          onValueChange={(value) => setNewQuestion({
                            ...newQuestion,
                            type: value as any,
                            correctAnswer: value === 'multiple_choice' ? '' : '',
                          })}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="multiple_choice" id="multiple_choice" />
                            <Label htmlFor="multiple_choice">Opción múltiple</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true_false" id="true_false" />
                            <Label htmlFor="true_false">Verdadero / Falso</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="short_answer" id="short_answer" />
                            <Label htmlFor="short_answer">Respuesta corta</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {newQuestion.type === 'multiple_choice' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label>Opciones</Label>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addOption}
                              className="flex items-center gap-1"
                            >
                              <PlusCircle className="h-3.5 w-3.5" />
                              Añadir Opción
                            </Button>
                          </div>
                          
                          {newQuestion.options?.map((option, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="flex-1 flex items-center gap-2">
                                <div className="flex items-center h-5">
                                  <Checkbox
                                    id={`option-${index}`}
                                    checked={
                                      Array.isArray(newQuestion.correctAnswer)
                                        ? newQuestion.correctAnswer.includes(String(index))
                                        : newQuestion.correctAnswer === String(index)
                                    }
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setCorrectAnswer(String(index));
                                      } else {
                                        setCorrectAnswer('');
                                      }
                                    }}
                                  />
                                </div>
                                <Input
                                  value={option}
                                  onChange={(e) => handleOptionChange(index, e.target.value)}
                                  placeholder={`Opción ${index + 1}`}
                                  className="flex-1"
                                />
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeOption(index)}
                                disabled={newQuestion.options?.length! <= 2}
                                className="h-8 w-8"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <div className="text-sm text-muted-foreground">
                            Marca la casilla junto a la respuesta correcta
                          </div>
                        </div>
                      )}
                      
                      {newQuestion.type === 'true_false' && (
                        <div className="space-y-2">
                          <Label>Respuesta Correcta</Label>
                          <RadioGroup 
                            value={newQuestion.correctAnswer as string} 
                            onValueChange={(value) => setCorrectAnswer(value)}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="true" id="true" />
                              <Label htmlFor="true">Verdadero</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="false" id="false" />
                              <Label htmlFor="false">Falso</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      )}
                      
                      {newQuestion.type === 'short_answer' && (
                        <div className="space-y-2">
                          <Label htmlFor="correct-answer">Respuesta Correcta</Label>
                          <Input
                            id="correct-answer"
                            value={newQuestion.correctAnswer as string}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                            placeholder="Respuesta esperada"
                          />
                          <p className="text-sm text-muted-foreground">
                            La respuesta del estudiante debe coincidir exactamente (no distingue mayúsculas/minúsculas)
                          </p>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="points">Puntos</Label>
                        <Input
                          id="points"
                          name="points"
                          type="number"
                          min="1"
                          max="100"
                          value={newQuestion.points}
                          onChange={handleNewQuestionChange}
                          className="w-20"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="explanation">Explicación (opcional)</Label>
                        <Textarea
                          id="explanation"
                          name="explanation"
                          value={newQuestion.explanation}
                          onChange={handleNewQuestionChange}
                          placeholder="Explica por qué esta es la respuesta correcta..."
                          rows={2}
                        />
                        <p className="text-sm text-muted-foreground">
                          Se mostrará a los estudiantes después de responder
                        </p>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={cancelEditing}>
                        Cancelar
                      </Button>
                      <Button onClick={addQuestion}>
                        {isEditing ? "Actualizar Pregunta" : "Añadir Pregunta"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {quizData.questions.length === 0 ? (
                <div className="text-center py-12 border border-dashed rounded-md">
                  <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No hay preguntas todavía</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Haz clic en "Añadir Pregunta" para empezar a crear tu cuestionario.
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {quizData.questions.map((question, index) => (
                      <div key={question.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              <GripVertical className="h-5 w-5 text-muted-foreground drag-handle" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground text-sm">#{index + 1}</span>
                                    <span className="font-medium">{question.question}</span>
                                  </div>
                                  <div className="mt-1 text-sm text-muted-foreground">
                                    {question.points} punto{question.points !== 1 ? 's' : ''} • 
                                    {question.type === 'multiple_choice' && ' Opción múltiple'}
                                    {question.type === 'true_false' && ' Verdadero/Falso'}
                                    {question.type === 'short_answer' && ' Respuesta corta'}
                                  </div>
                                </div>
                              </div>
                              
                              {question.type === 'multiple_choice' && question.options && (
                                <div className="mt-3 space-y-2">
                                  {question.options.map((option, optIndex) => (
                                    <div key={optIndex} className="flex items-center gap-2">
                                      {String(optIndex) === question.correctAnswer ? (
                                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                      ) : (
                                        <XCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                      )}
                                      <span className="text-sm">{option}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              {question.type === 'true_false' && (
                                <div className="mt-3">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">Respuesta correcta:</span>
                                    <span className="text-sm">
                                      {question.correctAnswer === 'true' ? 'Verdadero' : 'Falso'}
                                    </span>
                                  </div>
                                </div>
                              )}
                              
                              {question.type === 'short_answer' && (
                                <div className="mt-3">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">Respuesta correcta:</span>
                                    <span className="text-sm">{question.correctAnswer}</span>
                                  </div>
                                </div>
                              )}
                              
                              {question.explanation && (
                                <div className="mt-3 p-2 bg-muted rounded-md">
                                  <p className="text-xs font-medium mb-1">Explicación:</p>
                                  <p className="text-sm">{question.explanation}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveQuestion(question.id, 'up')}
                              disabled={index === 0}
                              className="h-8 w-8"
                            >
                              <MoveVertical className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveQuestion(question.id, 'down')}
                              disabled={index === quizData.questions.length - 1}
                              className="h-8 w-8"
                            >
                              <MoveVertical className="h-4 w-4 rotate-180" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => editQuestion(question)}
                              className="h-8 w-8"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteQuestion(question.id)}
                              className="h-8 w-8 text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración del Cuestionario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pass-percentage">Porcentaje para Aprobar</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="pass-percentage"
                    name="passPercentage"
                    type="number"
                    min="1"
                    max="100"
                    value={quizData.passPercentage}
                    onChange={handleQuizDataChange}
                    className="w-20"
                  />
                  <span>%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Los estudiantes necesitan alcanzar este porcentaje para aprobar el cuestionario
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="time-limit">Límite de Tiempo</Label>
                  <Switch
                    checked={quizData.timeLimit > 0}
                    onCheckedChange={(checked) => 
                      setQuizData({
                        ...quizData,
                        timeLimit: checked ? 10 : 0,
                      })
                    }
                    id="enable-time-limit"
                  />
                </div>
                
                {quizData.timeLimit > 0 && (
                  <>
                    <div className="flex items-center gap-2">
                      <Input
                        id="time-limit"
                        name="timeLimit"
                        type="number"
                        min="1"
                        max="180"
                        value={quizData.timeLimit}
                        onChange={handleQuizDataChange}
                        className="w-20"
                      />
                      <span>minutos</span>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      Los estudiantes tendrán un tiempo limitado para completar el cuestionario
                    </p>
                  </>
                )}
              </div>
              
              {quizData.questions.length > 0 && (
                <div className="border rounded-md p-4 bg-muted/50 space-y-2">
                  <h3 className="font-medium">Resumen de Puntuación</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Preguntas:</div>
                    <div className="font-medium">{quizData.questions.length}</div>
                    
                    <div>Puntos totales:</div>
                    <div className="font-medium">{getTotalPoints()}</div>
                    
                    <div>Puntos para aprobar:</div>
                    <div className="font-medium">{getPassingScore()} ({quizData.passPercentage}%)</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancelar</Button>
          <Button onClick={handleSubmit}>
            {existingQuiz ? 'Guardar Cambios' : 'Crear Cuestionario'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
