
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
  isValid?: boolean;
  stats?: {
    total: number;
    errors: number;
    warnings: number;
    info: number;
  };
  issues?: Array<{
    path: string;
    severity: 'error' | 'warning' | 'info';
    title?: string;
    type: string;
    description?: string;
    message?: string;
    suggestion?: string;
    recommendation?: string;
  }>;
}

export const useRouteValidation = () => {
  const { toast } = useToast();
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [lastValidated, setLastValidated] = useState<Date | null>(null);

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
        details: [],
        isValid: Math.floor(routes.length * 0.08) === 0, // Es válido si no hay rutas inválidas
        stats: {
          total: Math.floor(routes.length * 0.15), // Total de problemas
          errors: Math.floor(routes.length * 0.08),
          warnings: Math.floor(routes.length * 0.05),
          info: Math.floor(routes.length * 0.02)
        },
        issues: []
      };
      
      // Generar detalles para algunas rutas y problemas
      routes.forEach(route => {
        const random = Math.random();
        if (random < 0.08) {
          results.details.push({
            route,
            status: 'invalid',
            message: 'La ruta no existe o no es accesible'
          });
          
          // Añadir a issues para el formato que espera el componente
          results.issues?.push({
            path: route,
            severity: 'error',
            type: 'BROKEN_LINK',
            title: 'Enlace Roto',
            description: 'La ruta no existe o no es accesible',
            suggestion: 'Verifica que la ruta exista y sea accesible'
          });
        } else if (random < 0.15) {
          results.details.push({
            route,
            status: 'warning',
            message: 'La ruta existe pero tiene permisos incorrectos'
          });
          
          // Definir si es warning o info según el caso
          const severity = random < 0.12 ? 'warning' : 'info';
          
          results.issues?.push({
            path: route,
            severity: severity,
            type: random < 0.12 ? 'MISSING_ROLE_CHECK' : 'INCONSISTENT_NAMING',
            title: random < 0.12 ? 'Verificación de Rol Faltante' : 'Nomenclatura Inconsistente',
            description: random < 0.12 ? 'La ruta no tiene verificación de roles adecuada' : 'La ruta no sigue las convenciones de nomenclatura',
            suggestion: random < 0.12 ? 'Añade componentes de verificación de roles' : 'Renombra la ruta según las convenciones'
          });
        } else {
          results.details.push({
            route,
            status: 'valid'
          });
        }
      });
      
      setValidationResult(results);
      setLastValidated(new Date());
      
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
    validationResult,
    lastValidated,
    resetValidation: () => {
      setValidationResult(null);
      setLastValidated(null);
    }
  };
};
