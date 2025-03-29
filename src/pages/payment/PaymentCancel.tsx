
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import AppLayout from "@/layouts/AppLayout";

const PaymentCancel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="container mx-auto flex items-center justify-center min-h-[80vh] p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-10 w-10 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Pago Cancelado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              El proceso de pago ha sido cancelado. No se ha realizado ningún cargo en tu cuenta.
            </p>
            <p className="text-sm">
              Si tuviste algún problema durante el proceso, puedes intentarlo nuevamente o contactar con nuestro equipo de soporte.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 items-center sm:flex-row">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Volver al curso
            </Button>
            <Button onClick={() => navigate("/courses")}>
              Explorar cursos
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default PaymentCancel;
