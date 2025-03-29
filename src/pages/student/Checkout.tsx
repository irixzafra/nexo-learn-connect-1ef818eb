
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  CreditCard, 
  Check, 
  LockKeyhole, 
  ArrowLeft, 
  Shield, 
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from '@/components/ui/use-toast';

const Checkout: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  // Datos simulados del curso
  const courseData = {
    id: courseId || "1",
    title: "Desarrollo Web Full Stack",
    description: "Un curso completo para convertirte en desarrollador Full Stack",
    price: 149.99,
    discountedPrice: 129.99,
    instructor: "Alex Moreno",
    duration: "12 semanas",
    modules: 8,
    lessons: 64,
    image: "public/lovable-uploads/76db81f1-1b84-4977-963b-69a243d7f86a.png" // Imagen subida
  };

  // Función para procesar el pago
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulación de procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Pago procesado correctamente",
        description: "Has sido inscrito en el curso exitosamente.",
        duration: 5000,
      });
      // En un caso real, redirigir a la página de éxito
      // navigate('/payment/success');
    }, 2000);
  };

  // Formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <Link to={`/courses/${courseId}`} className="mb-6 flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Volver al curso
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">Completar Compra</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Resumen del curso */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-muted rounded-md overflow-hidden">
                <img 
                  src={courseData.image} 
                  alt={courseData.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h3 className="font-semibold text-lg">{courseData.title}</h3>
                <p className="text-sm text-muted-foreground">Por {courseData.instructor}</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">Acceso completo de por vida</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">{courseData.modules} módulos, {courseData.lessons} lecciones</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">Certificado de finalización</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Precio original:</span>
                  <span className="line-through text-muted-foreground">{formatPrice(courseData.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Precio con descuento:</span>
                  <span className="font-medium">{formatPrice(courseData.discountedPrice)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/20 flex justify-between">
              <span className="font-bold">Total:</span>
              <span className="font-bold">{formatPrice(courseData.discountedPrice)}</span>
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
        
        {/* Formulario de pago */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Información de Pago</CardTitle>
              <CardDescription>Completa los detalles para finalizar tu compra</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCheckout} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input id="name" placeholder="Ej. Juan Pérez" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Ej. juan@ejemplo.com" required />
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Label>Método de Pago</Label>
                  <RadioGroup 
                    defaultValue="card" 
                    className="mt-2 space-y-2"
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="flex items-center space-x-2 p-2 border rounded-md">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center cursor-pointer">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Tarjeta de crédito/débito
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 border rounded-md">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex items-center cursor-pointer">
                        <svg 
                          className="h-5 w-5 mr-2" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.9035 7.7596C20.9035 10.5253 19.1945 12.495 16.1769 12.495H14.3337C14.0721 12.495 13.8432 12.702 13.8104 12.9613L13.4005 15.8894L13.0898 18.0749C13.0655 18.2673 13.2182 18.4354 13.4128 18.4354H15.3267C15.5608 18.4354 15.7653 18.251 15.7945 18.0191L15.8075 17.9445L16.0604 16.1584L16.0762 16.0668C16.1054 15.8349 16.3098 15.6506 16.5439 15.6506H16.848C19.4778 15.6506 21.52 14.1435 22.0118 11.1183C22.221 9.84709 22.1144 8.7402 21.5204 7.9344C21.3528 7.7224 21.1423 7.5408 20.9034 7.3896" fill="#F19EB1" />
                          <path d="M20.1043 7.18584C19.9671 7.14264 19.8251 7.10265 19.6791 7.06585C19.5331 7.02905 19.3831 6.99625 19.2291 6.96785C18.5611 6.85345 17.8271 6.79785 17.0451 6.79785H12.9728C12.7388 6.79785 12.5344 6.98217 12.5052 7.21406L11.7 12.9255L11.7 12.9616C11.7328 12.7022 11.9616 12.4951 12.2232 12.4951H14.0664C17.084 12.4951 18.793 10.5254 18.793 7.7597C18.793 7.5584 18.78 7.3676 18.754 7.1836C18.666 7.16479 18.577 7.14719 18.486 7.13079C18.486 7.13079 18.486 7.13079 18.4858 7.13079C18.395 7.11439 18.302 7.09918 18.207 7.08518C18.839 7.22998 19.41 7.4603 19.882 7.7803C19.959 7.5751 20.0263 7.36189 20.0846 7.1358L20.1046 7.1859L20.1043 7.18584Z" fill="#FAF6F6" />
                          <path d="M12.5051 7.21436C12.5343 6.98247 12.7387 6.79815 12.9727 6.79815H17.045C17.827 6.79815 18.561 6.85376 19.229 6.96815C19.383 6.99655 19.533 7.02935 19.679 7.06615C19.825 7.10295 19.967 7.14294 20.1042 7.18615C20.166 7.20815 20.2263 7.23153 20.2853 7.25613C20.5053 6.15912 20.2842 5.40231 19.6481 4.57811C18.9401 3.66991 17.6561 3.2461 16.0441 3.2461H11.0358C10.8017 3.2461 10.5973 3.43046 10.5681 3.66237L8.50732 16.0668C8.4795 16.2864 8.6564 16.4868 8.8783 16.4868H11.7L12.5051 7.21436Z" fill="#1D274F" />
                        </svg>
                        PayPal
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="card_number">Número de tarjeta</Label>
                      <div className="relative">
                        <Input 
                          id="card_number" 
                          placeholder="0000 0000 0000 0000" 
                          required
                        />
                        <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Fecha de expiración</Label>
                        <Input id="expiry" placeholder="MM/AA" required />
                      </div>
                      <div>
                        <Label htmlFor="cvc">Código de seguridad</Label>
                        <div className="relative">
                          <Input id="cvc" placeholder="CVC" required />
                          <LockKeyhole className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <Alert variant="outline" className="border-primary/20 bg-primary/5">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  <AlertTitle>Pago seguro</AlertTitle>
                  <AlertDescription>
                    Todos los pagos se procesan de forma segura y tus datos nunca son almacenados.
                  </AlertDescription>
                </Alert>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <svg 
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4"
                        ></circle>
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    `Pagar ${formatPrice(courseData.discountedPrice)}`
                  )}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  Al completar la compra, aceptas nuestros <Link to="/terms" className="underline">Términos de servicio</Link> y <Link to="/privacy" className="underline">Política de privacidad</Link>.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
