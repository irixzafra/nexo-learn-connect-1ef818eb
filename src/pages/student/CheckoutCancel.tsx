
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const CheckoutCancel: React.FC = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('course');
  const navigate = useNavigate();
  
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    } else {
      setIsLoading(false);
    }
  }, [courseId]);

  const fetchCourseDetails = async () => {
    if (!courseId) {
      setIsLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (error) throw error;
      setCourse(data);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setIsLoading(false);
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

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <AlertCircle className="h-12 w-12 text-amber-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Pago cancelado</CardTitle>
            <CardDescription>
              No se ha completado el proceso de pago
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2">{course?.title || 'Curso'}</h3>
              <p className="text-sm text-muted-foreground">
                Has cancelado el proceso de pago. No se ha realizado ningún cargo a tu tarjeta.
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
            {courseId && (
              <Button onClick={() => navigate(`/checkout/${courseId}`)}>
                Reintentar pago
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => navigate('/courses')}
            >
              Explorar cursos
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default CheckoutCancel;
