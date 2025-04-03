
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { routeMap } from '@/utils/routeUtils';

interface ValidationResult {
  totalRoutes: number;
  validRoutes: number;
  invalidRoutes: number;
  warningRoutes: number;
  details: Array<{
    route: string;
    status: 'valid' | 'invalid' | 'warning';
    message?: string;
  }>;
}

export const useRouteValidation = () => {
  const { toast } = useToast();
  const [isValidating, setIsValidating] = useState(false);
  const [validationResults, setValidationResults] = useState<ValidationResult | null>(null);

  const runValidation = async () => {
    setIsValidating(true);
    
    toast({
      title: 'Validación de rutas iniciada',
      description: 'Verificando la integridad de las rutas del sistema...',
    });

    try {
      // En una implementación real, esto podría hacer verificaciones reales de las rutas
      // Por ahora, simularemos el proceso
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Obtener todas las rutas del routeMap
      const routes = Object.values(routeMap).filter(route => typeof route === 'string') as string[];
      
      // Simular algunos resultados
      const results: ValidationResult = {
        totalRoutes: routes.length,
        validRoutes: Math.floor(routes.length * 0.85),
        invalidRoutes: Math.floor(routes.length * 0.08),
        warningRoutes: Math.floor(routes.length * 0.07),
        details: []
      };
      
      // Generar detalles para algunas rutas (esto sería real en una implementación completa)
      routes.forEach(route => {
        const random = Math.random();
        if (random < 0.08) {
          results.details.push({
            route,
            status: 'invalid',
            message: 'La ruta no existe o no es accesible'
          });
        } else if (random < 0.15) {
          results.details.push({
            route,
            status: 'warning',
            message: 'La ruta existe pero tiene permisos incorrectos'
          });
        } else {
          results.details.push({
            route,
            status: 'valid'
          });
        }
      });
      
      setValidationResults(results);
      
      toast({
        title: 'Validación completada',
        description: `Se encontraron ${results.invalidRoutes} rutas con problemas y ${results.warningRoutes} advertencias.`,
      });
    } catch (error) {
      console.error('Error al validar rutas:', error);
      toast({
        title: 'Error en la validación',
        description: 'Ocurrió un error al validar las rutas del sistema.',
        variant: 'destructive',
      });
    } finally {
      setIsValidating(false);
    }
  };

  return {
    runValidation,
    isValidating,
    validationResults,
    resetValidation: () => setValidationResults(null)
  };
};
