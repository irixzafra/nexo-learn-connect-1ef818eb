
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight, ChevronLeft, Check, AlertCircle, RefreshCw } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  questionType: 'multiple_choice' | 'single_choice' | 'true_false';
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation?: string;
}

interface LessonQuizProps {
  quizId: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  onComplete?: (score: number, passed: boolean) => void;
  passingScore?: number;
}

export function LessonQuiz({
  quizId,
  title,
  description,
  questions,
  onComplete,
  passingScore = 70
}: LessonQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const currentQuestion = questions[currentQuestionIndex];
  
  const handleSingleChoiceAnswer = (optionId: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: [optionId]
    });
  };
  
  const handleMultipleChoiceAnswer = (optionId: string, checked: boolean) => {
    const currentAnswers = answers[currentQuestion.id] || [];
    const newAnswers = checked
      ? [...currentAnswers, optionId]
      : currentAnswers.filter(id => id !== optionId);
    
    setAnswers({
      ...answers,
      [currentQuestion.id]: newAnswers
    });
  };
  
  const isQuestionAnswered = (questionId: string) => {
    return !!answers[questionId]?.length;
  };
  
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  const handleNext = () => {
    if (!isQuestionAnswered(currentQuestion.id)) {
      toast({
        title: "Respuesta requerida",
        description: "Por favor, responde la pregunta antes de continuar.",
        variant: "destructive",
      });
      return;
    }
    
    if (isLastQuestion) {
      // Calculate score
      calculateScore();
      setIsSubmitted(true);
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const calculateScore = () => {
    let correctQuestions = 0;
    
    questions.forEach(question => {
      const userAnswers = answers[question.id] || [];
      const correctOptions = question.options
        .filter(option => option.isCorrect)
        .map(option => option.id);
      
      // For single choice, check if the single answer is correct
      if (question.questionType === 'single_choice' || question.questionType === 'true_false') {
        if (userAnswers.length === 1 && correctOptions.includes(userAnswers[0])) {
          correctQuestions += 1;
        }
      } 
      // For multiple choice, check if user selected all correct options and no incorrect ones
      else if (question.questionType === 'multiple_choice') {
        const allCorrectSelected = correctOptions.every(id => userAnswers.includes(id));
        const noIncorrectSelected = userAnswers.every(id => correctOptions.includes(id));
        
        if (allCorrectSelected && noIncorrectSelected) {
          correctQuestions += 1;
        }
      }
    });
    
    const calculatedScore = Math.round((correctQuestions / questions.length) * 100);
    setScore(calculatedScore);
    
    const passed = calculatedScore >= passingScore;
    if (onComplete) {
      onComplete(calculatedScore, passed);
    }
    
    return calculatedScore;
  };
  
  const isOptionCorrect = (questionId: string, optionId: string) => {
    if (!showResults) return null;
    
    const question = questions.find(q => q.id === questionId);
    if (!question) return null;
    
    const option = question.options.find(o => o.id === optionId);
    return option?.isCorrect;
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setShowResults(false);
    setScore(0);
  };
  
  if (showResults) {
    const passed = score >= passingScore;
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {passed ? (
              <>
                <Check className="h-5 w-5 text-green-500" />
                <span>¡Quiz Completado!</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <span>Repaso Necesario</span>
              </>
            )}
          </CardTitle>
          <CardDescription>
            {passed 
              ? "Has completado el quiz exitosamente." 
              : "No has alcanzado la puntuación mínima requerida."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="relative h-40 w-40">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold">{score}%</span>
              </div>
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="5"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={passed ? "#22c55e" : "#f59e0b"}
                  strokeWidth="5"
                  strokeDasharray={`${score * 2.83} 283`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <p className="font-medium">
              {passed 
                ? "¡Felicidades! Has superado el quiz satisfactoriamente." 
                : "No te preocupes, puedes revisar el material e intentarlo de nuevo."}
            </p>
            <p className="text-sm text-muted-foreground">
              Puntuación: {score}% (Mínimo requerido: {passingScore}%)
            </p>
          </div>
          
          <div className="pt-4">
            <h3 className="font-medium mb-2">Revisión de preguntas:</h3>
            <div className="space-y-3">
              {questions.map((question, index) => {
                const userAnswers = answers[question.id] || [];
                const correctOptions = question.options
                  .filter(option => option.isCorrect)
                  .map(option => option.id);
                
                let isCorrect = false;
                if (question.questionType === 'single_choice' || question.questionType === 'true_false') {
                  isCorrect = userAnswers.length === 1 && correctOptions.includes(userAnswers[0]);
                } else {
                  const allCorrectSelected = correctOptions.every(id => userAnswers.includes(id));
                  const noIncorrectSelected = userAnswers.every(id => correctOptions.includes(id));
                  isCorrect = allCorrectSelected && noIncorrectSelected;
                }
                
                return (
                  <div 
                    key={question.id} 
                    className={`p-3 rounded-md ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}
                  >
                    <p className="font-medium flex items-center gap-2">
                      {isCorrect ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                      Pregunta {index + 1}: {question.question}
                    </p>
                    {question.explanation && !isCorrect && (
                      <p className="text-sm mt-1 text-muted-foreground">
                        {question.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={resetQuiz}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Reintentar Quiz
          </Button>
          <Button onClick={() => setShowResults(false)}>
            Continuar
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="text-sm font-medium">
            Pregunta {currentQuestionIndex + 1} de {questions.length}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
            
            {/* Single choice or true/false question */}
            {(currentQuestion.questionType === 'single_choice' || currentQuestion.questionType === 'true_false') && (
              <RadioGroup
                value={answers[currentQuestion.id]?.[0] || ""}
                onValueChange={handleSingleChoiceAnswer}
                className="space-y-2"
              >
                {currentQuestion.options.map(option => (
                  <div 
                    key={option.id}
                    className={`flex items-center space-x-2 rounded-md border p-3 ${
                      showResults && isOptionCorrect(currentQuestion.id, option.id) 
                        ? 'bg-green-50 border-green-200' 
                        : showResults && answers[currentQuestion.id]?.includes(option.id) && !isOptionCorrect(currentQuestion.id, option.id)
                          ? 'bg-red-50 border-red-200'
                          : ''
                    }`}
                  >
                    <RadioGroupItem 
                      value={option.id}
                      id={option.id}
                      disabled={showResults}
                    />
                    <Label 
                      htmlFor={option.id}
                      className="flex-1 cursor-pointer font-normal"
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            
            {/* Multiple choice question */}
            {currentQuestion.questionType === 'multiple_choice' && (
              <div className="space-y-2">
                {currentQuestion.options.map(option => (
                  <div 
                    key={option.id}
                    className={`flex items-center space-x-2 rounded-md border p-3 ${
                      showResults && isOptionCorrect(currentQuestion.id, option.id) 
                        ? 'bg-green-50 border-green-200' 
                        : showResults && answers[currentQuestion.id]?.includes(option.id) && !isOptionCorrect(currentQuestion.id, option.id)
                          ? 'bg-red-50 border-red-200'
                          : ''
                    }`}
                  >
                    <Checkbox 
                      id={option.id}
                      checked={answers[currentQuestion.id]?.includes(option.id) || false}
                      onCheckedChange={(checked) => 
                        handleMultipleChoiceAnswer(option.id, checked === true)
                      }
                      disabled={showResults}
                    />
                    <Label 
                      htmlFor={option.id}
                      className="flex-1 cursor-pointer font-normal"
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Anterior
        </Button>
        <Button onClick={handleNext}>
          {isLastQuestion ? "Finalizar" : "Siguiente"}
          {!isLastQuestion && <ChevronRight className="h-4 w-4 ml-1" />}
        </Button>
      </CardFooter>
    </Card>
  );
}
