
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  Clock, 
  AlertCircle, 
  Check, 
  X, 
  HelpCircle, 
  ArrowLeft, 
  ArrowRight,
  Trophy,
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

interface QuizTakerProps {
  quizId: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  passPercentage: number;
  timeLimit?: number;
  onComplete: (results: QuizResults) => void;
  onExit: () => void;
}

export interface QuizResults {
  quizId: string;
  score: number;
  totalPoints: number;
  percentageScore: number;
  passed: boolean;
  answers: {
    questionId: string;
    userAnswer: string | string[];
    isCorrect: boolean;
    points: number;
  }[];
  timeSpent: number; // in seconds
}

export function QuizTaker({
  quizId,
  title,
  description,
  questions,
  passPercentage,
  timeLimit = 0,
  onComplete,
  onExit,
}: QuizTakerProps) {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60); // convert to seconds
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  // Timer functionality
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (timeLimit > 0 && !showResults) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsTimeUp(true);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLimit, showResults]);
  
  const handleTimeUp = () => {
    toast({
      variant: "destructive",
      title: "Tiempo agotado",
      description: "Se acabó el tiempo para completar el cuestionario.",
    });
    submitQuiz();
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };
  
  const handleMultipleChoiceChange = (questionId: string, optionIndex: string, checked: boolean) => {
    const currentAnswers = answers[questionId] || [];
    let newAnswers: string[];
    
    if (Array.isArray(currentAnswers)) {
      if (checked) {
        newAnswers = [...currentAnswers, optionIndex];
      } else {
        newAnswers = currentAnswers.filter(a => a !== optionIndex);
      }
    } else {
      newAnswers = checked ? [optionIndex] : [];
    }
    
    handleAnswerChange(questionId, newAnswers);
  };
  
  const isQuestionAnswered = (questionId: string) => {
    const answer = answers[questionId];
    if (answer === undefined) return false;
    if (Array.isArray(answer)) return answer.length > 0;
    return answer.trim() !== '';
  };
  
  const calculateResults = (): QuizResults => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000); // in seconds
    
    const results = questions.map(q => {
      const userAnswer = answers[q.id] || '';
      let isCorrect = false;
      
      if (q.type === 'multiple_choice') {
        if (Array.isArray(userAnswer) && userAnswer.length === 1) {
          // Single-choice implementation
          isCorrect = userAnswer[0] === q.correctAnswer;
        } else if (Array.isArray(userAnswer) && Array.isArray(q.correctAnswer)) {
          // Multiple-choice implementation
          isCorrect = userAnswer.length === q.correctAnswer.length &&
            userAnswer.every(a => q.correctAnswer.includes(a));
        }
      } else if (q.type === 'true_false') {
        isCorrect = userAnswer === q.correctAnswer;
      } else if (q.type === 'short_answer') {
        isCorrect = typeof userAnswer === 'string' &&
          userAnswer.toLowerCase().trim() === (q.correctAnswer as string).toLowerCase().trim();
      }
      
      return {
        questionId: q.id,
        userAnswer,
        isCorrect,
        points: isCorrect ? q.points : 0,
      };
    });
    
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const score = results.reduce((sum, r) => sum + r.points, 0);
    const percentageScore = Math.round((score / totalPoints) * 100);
    const passed = percentageScore >= passPercentage;
    
    return {
      quizId,
      score,
      totalPoints,
      percentageScore,
      passed,
      answers: results,
      timeSpent,
    };
  };
  
  const submitQuiz = () => {
    const results = calculateResults();
    setQuizResults(results);
    setShowResults(true);
    onComplete(results);
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsSubmitDialogOpen(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleSubmitQuiz = () => {
    setIsSubmitDialogOpen(false);
    submitQuiz();
  };
  
  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };
  
  // Quiz Results View
  if (showResults && quizResults) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle>{quizResults.passed ? '¡Felicidades!' : 'Cuestionario Completado'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            {quizResults.passed ? (
              <div className="rounded-full bg-green-100 p-4">
                <Trophy className="h-16 w-16 text-green-600" />
              </div>
            ) : (
              <div className="rounded-full bg-amber-100 p-4">
                <AlertCircle className="h-16 w-16 text-amber-600" />
              </div>
            )}
          </div>
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">
              {quizResults.passed 
                ? '¡Has aprobado el cuestionario!' 
                : 'No has alcanzado la puntuación mínima'}
            </h2>
            <p className="text-muted-foreground">
              {quizResults.passed 
                ? 'Excelente trabajo. Puedes revisar tus respuestas a continuación.' 
                : 'No te preocupes. Puedes revisar tus respuestas y volver a intentarlo.'}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 px-4 py-3 bg-muted rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Puntuación</p>
              <p className="text-2xl font-bold">
                {quizResults.score}/{quizResults.totalPoints}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Porcentaje</p>
              <p className="text-2xl font-bold">{quizResults.percentageScore}%</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Revisión de Respuestas</h3>
            
            {questions.map((question, index) => {
              const answer = quizResults.answers.find(a => a.questionId === question.id);
              const isCorrect = answer?.isCorrect || false;
              
              return (
                <div 
                  key={question.id} 
                  className={`p-4 border rounded-md ${
                    isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`rounded-full p-1 ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {isCorrect ? (
                        <Check className="h-4 w-4 text-white" />
                      ) : (
                        <X className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        {index + 1}. {question.question}
                      </p>
                      
                      <div className="mt-2 space-y-1">
                        {question.type === 'multiple_choice' && question.options && (
                          <div className="space-y-1">
                            {question.options.map((option, optIndex) => {
                              const optionVal = String(optIndex);
                              const isSelected = Array.isArray(answer?.userAnswer)
                                ? answer?.userAnswer.includes(optionVal)
                                : answer?.userAnswer === optionVal;
                              const isCorrectOption = String(question.correctAnswer) === optionVal;
                              
                              return (
                                <div 
                                  key={optIndex} 
                                  className={`flex items-center px-3 py-1.5 rounded-md ${
                                    isSelected && isCorrectOption
                                      ? 'bg-green-100 text-green-800'
                                      : isSelected && !isCorrectOption
                                      ? 'bg-red-100 text-red-800'
                                      : !isSelected && isCorrectOption
                                      ? 'bg-green-100/50 text-green-800'
                                      : ''
                                  }`}
                                >
                                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                                    {isSelected && isCorrectOption && (
                                      <Check className="h-4 w-4 text-green-500" />
                                    )}
                                    {isSelected && !isCorrectOption && (
                                      <X className="h-4 w-4 text-red-500" />
                                    )}
                                    {!isSelected && isCorrectOption && (
                                      <Check className="h-4 w-4 text-green-500 opacity-50" />
                                    )}
                                  </div>
                                  <span className="text-sm">{option}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        
                        {question.type === 'true_false' && (
                          <div className="space-y-1">
                            <div 
                              className={`flex items-center px-3 py-1.5 rounded-md ${
                                answer?.userAnswer === 'true' && question.correctAnswer === 'true'
                                  ? 'bg-green-100 text-green-800'
                                  : answer?.userAnswer === 'true' && question.correctAnswer !== 'true'
                                  ? 'bg-red-100 text-red-800'
                                  : answer?.userAnswer !== 'true' && question.correctAnswer === 'true'
                                  ? 'bg-green-100/50 text-green-800'
                                  : ''
                              }`}
                            >
                              <div className="w-5 h-5 flex items-center justify-center mr-2">
                                {answer?.userAnswer === 'true' && question.correctAnswer === 'true' && (
                                  <Check className="h-4 w-4 text-green-500" />
                                )}
                                {answer?.userAnswer === 'true' && question.correctAnswer !== 'true' && (
                                  <X className="h-4 w-4 text-red-500" />
                                )}
                                {answer?.userAnswer !== 'true' && question.correctAnswer === 'true' && (
                                  <Check className="h-4 w-4 text-green-500 opacity-50" />
                                )}
                              </div>
                              <span className="text-sm">Verdadero</span>
                            </div>
                            
                            <div 
                              className={`flex items-center px-3 py-1.5 rounded-md ${
                                answer?.userAnswer === 'false' && question.correctAnswer === 'false'
                                  ? 'bg-green-100 text-green-800'
                                  : answer?.userAnswer === 'false' && question.correctAnswer !== 'false'
                                  ? 'bg-red-100 text-red-800'
                                  : answer?.userAnswer !== 'false' && question.correctAnswer === 'false'
                                  ? 'bg-green-100/50 text-green-800'
                                  : ''
                              }`}
                            >
                              <div className="w-5 h-5 flex items-center justify-center mr-2">
                                {answer?.userAnswer === 'false' && question.correctAnswer === 'false' && (
                                  <Check className="h-4 w-4 text-green-500" />
                                )}
                                {answer?.userAnswer === 'false' && question.correctAnswer !== 'false' && (
                                  <X className="h-4 w-4 text-red-500" />
                                )}
                                {answer?.userAnswer !== 'false' && question.correctAnswer === 'false' && (
                                  <Check className="h-4 w-4 text-green-500 opacity-50" />
                                )}
                              </div>
                              <span className="text-sm">Falso</span>
                            </div>
                          </div>
                        )}
                        
                        {question.type === 'short_answer' && (
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm font-medium">Tu respuesta:</p>
                              <p className="text-sm">{answer?.userAnswer as string || '(Sin respuesta)'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Respuesta correcta:</p>
                              <p className="text-sm">{question.correctAnswer as string}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {question.explanation && (
                        <div className="mt-3 p-3 bg-muted rounded-md">
                          <p className="text-xs font-medium mb-1">Explicación:</p>
                          <p className="text-sm">{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onExit}>
            Salir
          </Button>
          {!quizResults.passed && (
            <Button onClick={() => window.location.reload()}>
              Intentar de nuevo
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }
  
  // Quiz Taking View
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
            <div className="flex items-center gap-4 mt-2">
              <div className="text-sm">
                Pregunta {currentQuestionIndex + 1} de {questions.length}
              </div>
              {timeLimit > 0 && (
                <div className={`flex items-center gap-1 text-sm ${
                  timeRemaining < 60 ? 'text-red-500' : ''
                }`}>
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(timeRemaining)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <Progress 
          value={(currentQuestionIndex / questions.length) * 100} 
          className="mt-2"
        />
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Question Navigation */}
        <div className="flex flex-wrap gap-2 justify-center">
          {questions.map((_, index) => (
            <Button
              key={index}
              variant={currentQuestionIndex === index ? "default" : isQuestionAnswered(questions[index].id) ? "outline" : "ghost"}
              size="icon"
              className={`h-8 w-8 ${
                isQuestionAnswered(questions[index].id) && currentQuestionIndex !== index
                  ? 'border-primary text-primary'
                  : ''
              }`}
              onClick={() => handleJumpToQuestion(index)}
            >
              {isQuestionAnswered(questions[index].id) ? (
                <Check className="h-4 w-4" />
              ) : (
                (index + 1)
              )}
            </Button>
          ))}
        </div>
        
        {/* Current Question */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {currentQuestionIndex + 1}. {currentQuestion.question}
          </h3>
          
          {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, optIndex) => (
                <div key={optIndex} className="flex items-center space-x-2">
                  <Checkbox
                    id={`option-${currentQuestion.id}-${optIndex}`}
                    checked={
                      Array.isArray(answers[currentQuestion.id])
                        ? (answers[currentQuestion.id] as string[]).includes(String(optIndex))
                        : false
                    }
                    onCheckedChange={(checked) => 
                      handleMultipleChoiceChange(currentQuestion.id, String(optIndex), !!checked)
                    }
                  />
                  <Label
                    htmlFor={`option-${currentQuestion.id}-${optIndex}`}
                    className="text-base"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          )}
          
          {currentQuestion.type === 'true_false' && (
            <RadioGroup
              value={answers[currentQuestion.id] as string || ''}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id={`true-${currentQuestion.id}`} />
                <Label htmlFor={`true-${currentQuestion.id}`} className="text-base">Verdadero</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id={`false-${currentQuestion.id}`} />
                <Label htmlFor={`false-${currentQuestion.id}`} className="text-base">Falso</Label>
              </div>
            </RadioGroup>
          )}
          
          {currentQuestion.type === 'short_answer' && (
            <div className="space-y-2">
              <Label htmlFor={`answer-${currentQuestion.id}`}>Tu respuesta:</Label>
              <Input
                id={`answer-${currentQuestion.id}`}
                value={answers[currentQuestion.id] as string || ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                placeholder="Escribe tu respuesta aquí..."
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsExitDialogOpen(true)}
          >
            Salir
          </Button>
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </Button>
        </div>
        <Button
          onClick={handleNext}
          className="flex items-center gap-1"
        >
          {currentQuestionIndex < questions.length - 1 ? (
            <>
              Siguiente
              <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            'Finalizar'
          )}
        </Button>
      </CardFooter>
      
      {/* Submit Confirmation Dialog */}
      <AlertDialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Enviar cuestionario?</AlertDialogTitle>
            <AlertDialogDescription>
              Has respondido {Object.keys(answers).length} de {questions.length} preguntas.
              {Object.keys(answers).length < questions.length && (
                <p className="text-amber-500 mt-2">
                  <AlertCircle className="h-4 w-4 inline-block mr-1" />
                  Aún tienes {questions.length - Object.keys(answers).length} preguntas sin responder.
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Revisar respuestas</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmitQuiz}>
              Enviar cuestionario
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Exit Confirmation Dialog */}
      <AlertDialog open={isExitDialogOpen} onOpenChange={setIsExitDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Seguro que quieres salir?</AlertDialogTitle>
            <AlertDialogDescription>
              Si sales ahora, perderás todas tus respuestas y tendrás que empezar de nuevo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continuar con el cuestionario</AlertDialogCancel>
            <AlertDialogAction onClick={onExit} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Salir sin guardar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Time's Up Dialog */}
      <AlertDialog open={isTimeUp}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¡Tiempo agotado!</AlertDialogTitle>
            <AlertDialogDescription>
              Se ha acabado el tiempo para completar el cuestionario. Tus respuestas serán enviadas automáticamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={submitQuiz}>
              Ver resultados
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
