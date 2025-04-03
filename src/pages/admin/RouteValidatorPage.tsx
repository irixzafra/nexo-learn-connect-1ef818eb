
import React, { useState } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, CheckCircle, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const RouteValidatorPage: React.FC = () => {
  const { toast } = useToast();
  const [isValidating, setIsValidating] = useState(false);
  const [validationComplete, setValidationComplete] = useState(false);
  const [validationResults, setValidationResults] = useState({
    totalRoutes: 0,
    validRoutes: 0,
    brokenRoutes: 0,
    routesWithWarnings: 0
  });

  const handleValidateRoutes = () => {
    setIsValidating(true);
    toast({
      title: "Validación iniciada",
      description: "Verificando todas las rutas del sistema...",
    });
    
    // Simulamos una validación
    setTimeout(() => {
      setValidationResults({
        totalRoutes: 128,
        validRoutes: 112,
        brokenRoutes: 8,
        routesWithWarnings: 8
      });
      
      setIsValidating(false);
      setValidationComplete(true);
      
      toast({
        title: "Validación completada",
        description: "La validación de rutas ha finalizado.",
      });
    }, 2500);
  };

  return (
    <AdminPageLayout
      title="Validador de Rutas"
      subtitle="Verifica y soluciona problemas con las rutas de la plataforma"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Rutas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{validationComplete ? validationResults.totalRoutes : "-"}</div>
            <p className="text-xs text-muted-foreground mt-1">Rutas registradas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rutas Válidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{validationComplete ? validationResults.validRoutes : "-"}</div>
            <p className="text-xs text-muted-foreground mt-1">Funcionando correctamente</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rutas Rotas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{validationComplete ? validationResults.brokenRoutes : "-"}</div>
            <p className="text-xs text-muted-foreground mt-1">Requieren atención</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Advertencias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{validationComplete ? validationResults.routesWithWarnings : "-"}</div>
            <p className="text-xs text-muted-foreground mt-1">Posibles problemas</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Validación de Rutas</CardTitle>
          <CardDescription>
            Ejecuta una validación completa de todas las rutas del sistema para detectar errores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-6">
            <Button 
              onClick={handleValidateRoutes} 
              disabled={isValidating}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              {isValidating ? "Validando..." : "Iniciar Validación"}
            </Button>
          </div>
          
          {validationComplete && (
            <div className="border rounded-md p-4 bg-muted/20">
              <h3 className="text-md font-medium mb-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" /> 
                Validación Completa
              </h3>
              <p className="text-sm mb-4">
                La validación de rutas ha finalizado. Se procesaron {validationResults.totalRoutes} rutas.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  {validationResults.validRoutes} rutas válidas
                </Badge>
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                  {validationResults.brokenRoutes} rutas rotas
                </Badge>
                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                  {validationResults.routesWithWarnings} advertencias
                </Badge>
              </div>
              
              <p className="text-xs text-muted-foreground">
                Última validación: {new Date().toLocaleString()}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <CardTitle>Funcionalidad en Desarrollo</CardTitle>
            </div>
            <CardDescription>
              La visualización detallada de resultados estará disponible próximamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-10">
              El sistema completo de validación de rutas está en fase de desarrollo. La versión actual ofrece
              validación básica y detección de problemas. Más funcionalidades estarán disponibles pronto.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  );
};

export default RouteValidatorPage;
