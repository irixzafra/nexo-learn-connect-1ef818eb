
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import AppLayout from "@/layouts/AppLayout";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  // En una implementación real, aquí se verificaría el estado del pago con Stripe

  // Redirección automática después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/my-courses");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <AppLayout>
      <div className="container mx-auto flex items-center justify-center min-h-[80vh] p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">¡Pago Completado!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Tu pago ha sido procesado correctamente. Ya puedes acceder al curso completo.
            </p>
            <p className="text-sm">Serás redirigido automáticamente a tus cursos en 5 segundos...</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate("/my-courses")}>
              Ver Mis Cursos
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default PaymentSuccess;
