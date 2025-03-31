
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCourseDetails } from '@/features/courses/hooks/useCourseDetails';
import { supabase } from '@/lib/supabase';
import { formatCurrency } from '@/lib/utils';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader2, ArrowLeft, CreditCard, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const Checkout: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { course, isLoading: isLoadingCourse } = useCourseDetails(courseId);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingEnrollment, setIsCheckingEnrollment] = useState(true);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user && courseId) {
      checkEnrollmentStatus();
    } else {
      setIsCheckingEnrollment(false);
    }
  }, [user, courseId]);

  const checkEnrollmentStatus = async () => {
    if (!user || !courseId) {
      setIsEnrolled(false);
      setIsCheckingEnrollment(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      setIsEnrolled(!!data);
    } catch (error) {
      console.error("Error checking enrollment status:", error);
    } finally {
      setIsCheckingEnrollment(false);
    }
  };

  const handleCheckout = async () => {
    if (!user || !courseId || !course) {
      setPaymentError("Información del usuario o curso faltante");
      return;
    }

    setIsSubmitting(true);
    setPaymentError(null);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          courseId,
          userId: user.id,
          userEmail: user.email,
          courseName: course.title,
          price: course.price,
          currency: course.currency || 'eur',
          successUrl: `${window.location.origin}/checkout/success?course=${courseId}`,
          cancelUrl: `${window.location.origin}/checkout/cancel?course=${courseId}`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        setCheckoutUrl(data.url);
        window.location.href = data.url;
      } else {
        throw new Error('No se pudo crear la sesión de pago');
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      setPaymentError(error.message || "Error al procesar el pago");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingCourse || isCheckingEnrollment) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6 flex justify-center items-center min-h-[80vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  if (!course) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle>Curso no encontrado</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No se pudo encontrar el curso solicitado.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate("/courses")}>
                Explorar cursos
              </Button>
            </CardFooter>
          </Card>
        </div>
      </AppLayout>
    );
  }

  if (isEnrolled) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle>Ya estás inscrito en este curso</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Ya tienes acceso a este curso, no es necesario realizar el pago nuevamente.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate(`/courses/${courseId}/learn`)}>
                Ir al curso
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
        <Button
          variant="ghost"
          onClick={() => navigate(`/courses/${courseId}`)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Volver al curso
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Finalizar compra</CardTitle>
                <CardDescription>
                  Completa tu compra para acceder al curso
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {paymentError && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {paymentError}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Resumen del pedido</h3>
                    <div className="bg-muted p-4 rounded-md">
                      <div className="flex justify-between mb-2">
                        <span>{course.title}</span>
                        <span>{formatCurrency(course.price, course.currency)}</span>
                      </div>
                      
                      <Separator className="my-3" />
                      
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>{formatCurrency(course.price, course.currency)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Método de pago</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Serás redirigido a la pasarela de pago segura de Stripe para completar tu compra.
                    </p>
                    
                    <Button
                      onClick={handleCheckout}
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Pagar {formatCurrency(course.price, course.currency)}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumen del curso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">{course.title}</p>
                    {course.instructor && (
                      <p className="text-sm text-muted-foreground">
                        Por {course.instructor.full_name || "Instructor"}
                      </p>
                    )}
                  </div>
                  
                  {course.level && (
                    <div>
                      <p className="text-sm text-muted-foreground">Nivel</p>
                      <p className="font-medium">{course.level}</p>
                    </div>
                  )}
                  
                  {course.duration_text && (
                    <div>
                      <p className="text-sm text-muted-foreground">Duración</p>
                      <p className="font-medium">{course.duration_text}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Incluye</p>
                    <ul className="text-sm space-y-1">
                      <li>• Acceso completo de por vida</li>
                      <li>• Acceso a todos los materiales</li>
                      {course.grants_certificate && (
                        <li>• Certificado de finalización</li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Checkout;
