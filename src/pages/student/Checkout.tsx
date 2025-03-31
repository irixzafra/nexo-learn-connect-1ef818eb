
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  CreditCard, 
  Check, 
  LockKeyhole, 
  ArrowLeft, 
  Shield, 
  AlertCircle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import AppLayout from '@/layouts/AppLayout';
import { supabase } from "@/lib/supabase";
import { useStripeCheckout } from "@/features/payments/hooks/useStripeCheckout";

const Checkout: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<any>(null);
  const { checkoutCourse, isLoading: isCheckoutLoading } = useStripeCheckout({
    successUrl: `${window.location.origin}/payment/success?course=${courseId}`,
    cancelUrl: `${window.location.origin}/payment/cancel?course=${courseId}`
  });

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        toast({
          title: "Error",
          description: "ID del curso no especificado",
          variant: "destructive",
        });
        navigate('/courses');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Curso no encontrado");

        setCourse(data);
      } catch (error: any) {
        console.error("Error fetching course:", error);
        toast({
          title: "Error",
          description: "No se pudo cargar la información del curso",
          variant: "destructive",
        });
        navigate('/courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, navigate, toast]);

  const handleCheckout = async () => {
    if (!courseId) return;
    
    try {
      await checkoutCourse(courseId);
    } catch (error: any) {
      console.error("Error initiating checkout:", error);
      toast({
        title: "Error",
        description: "No se pudo iniciar el proceso de pago",
        variant: "destructive",
      });
    }
  };

  const formatPrice = (price: number, currency: string = 'EUR') => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Cargando información del curso...</span>
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
              <CardDescription>
                No se pudo encontrar la información del curso solicitado.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate('/courses')}>
                Volver al catálogo
              </Button>
            </CardFooter>
          </Card>
        </div>
      </AppLayout>
    );
  }

  const discountedPrice = course.discount_price || course.price;
  const hasDiscount = course.discount_price && course.discount_price < course.price;

  return (
    <AppLayout>
      <div className="container mx-auto p-6 max-w-5xl">
        <Link to={`/courses/${courseId}`} className="mb-6 flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver al curso
        </Link>
        
        <h1 className="text-3xl font-bold mb-6">Completar Compra</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {course.image && (
                  <div className="aspect-video bg-muted rounded-md overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div>
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">Por {course.instructor_name || "Instructor"}</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Acceso completo de por vida</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Certificado de finalización</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-1">
                  {hasDiscount && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Precio original:</span>
                      <span className="line-through text-muted-foreground">{formatPrice(course.price, course.currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="font-medium">Precio final:</span>
                    <span className="font-medium">{formatPrice(discountedPrice, course.currency)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/20 flex justify-between">
                <span className="font-bold">Total:</span>
                <span className="font-bold">{formatPrice(discountedPrice, course.currency)}</span>
              </CardFooter>
            </Card>
            
            <div className="mt-4 p-4 bg-muted rounded-md border">
              <div className="flex items-start mb-2">
                <Shield className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Garantía de devolución de 30 días</h3>
                  <p className="text-sm text-muted-foreground">Si no estás satisfecho con el curso, puedes solicitar un reembolso completo dentro de los primeros 30 días.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Proceder al Pago Seguro</CardTitle>
                <CardDescription>Serás redirigido a la pasarela de pago de Stripe para finalizar tu compra de forma segura</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="border-primary/20 bg-primary/5">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  <AlertTitle>Pago seguro</AlertTitle>
                  <AlertDescription>
                    Todos los pagos se procesan de forma segura a través de Stripe, uno de los procesadores de pago más seguros del mundo. Tus datos nunca son almacenados en nuestros servidores.
                  </AlertDescription>
                </Alert>
                
                <div className="mt-6 flex flex-col items-center">
                  <img 
                    src="/lovable-uploads/1905d13b-c9b8-4af8-ae8a-cffede4bb617.png" 
                    alt="Stripe Logo" 
                    className="h-10 mb-4" 
                  />
                  
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    <CreditCard className="h-8 w-8 text-muted-foreground" />
                    <img 
                      src="/lovable-uploads/f1432cd5-57e8-488e-a71c-d88ae7e3b0a2.png" 
                      alt="Payment Methods" 
                      className="h-8" 
                    />
                  </div>
                  
                  <Button 
                    onClick={handleCheckout} 
                    className="w-full sm:w-auto px-8 py-6 text-lg" 
                    size="lg"
                    disabled={isCheckoutLoading}
                  >
                    {isCheckoutLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      `Pagar ${formatPrice(discountedPrice, course.currency)}`
                    )}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Al completar la compra, aceptas nuestros <Link to="/terms" className="underline">Términos de servicio</Link> y <Link to="/privacy" className="underline">Política de privacidad</Link>.
                  </p>
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
