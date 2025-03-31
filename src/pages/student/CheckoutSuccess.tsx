
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Loader2 } from 'lucide-react';

const CheckoutSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('course');
  const sessionId = searchParams.get('session_id');
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    } else {
      setIsLoading(false);
      setError('Información del curso no encontrada');
    }
  }, [courseId]);

  useEffect(() => {
    if (sessionId && user && courseId) {
      verifyPayment();
    } else if (!isLoading) {
      setIsProcessing(false);
    }
  }, [sessionId, user, courseId, isLoading]);

  const fetchCourseDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (error) throw error;
      setCourse(data);
    } catch (error: any) {
      console.error('Error fetching course:', error);
      setError('No se pudo cargar la información del curso');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPayment = async () => {
    if (!user || !courseId || !sessionId) return;

    try {
      const { error } = await supabase.functions.invoke('verify-payment', {
        body: {
          sessionId,
          userId: user.id,
          courseId,
        },
      });

      if (error) throw error;
      
      // The edge function should have enrolled the user and created an invoice
    } catch (error: any) {
      console.error('Payment verification error:', error);
      setError('Error al verificar el pago');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6 flex justify-center items-center min-h-[80vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-500">Error en el pago</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate('/courses')}>
                Explorar cursos
              </Button>
            </CardFooter>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">¡Pago completado con éxito!</CardTitle>
            <CardDescription>
              {isProcessing ? 
                "Estamos procesando tu inscripción..." : 
                "Ya tienes acceso al curso completo"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="bg-muted p-4 rounded-md mb-6">
              <h3 className="font-medium mb-2">{course?.title}</h3>
              <p className="text-sm text-muted-foreground">
                Gracias por tu compra. Ahora tienes acceso completo a todos los materiales del curso.
              </p>
            </div>
            
            {isProcessing && (
              <div className="flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => navigate(`/courses/${courseId}/learn`)}
              disabled={isProcessing}
            >
              Comenzar a aprender
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/my-courses')}
              disabled={isProcessing}
            >
              Ver mis cursos
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default CheckoutSuccess;
