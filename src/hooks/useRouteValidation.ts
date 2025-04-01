
import { useState, useCallback, useEffect } from 'react';
import { validateRoutes } from '@/utils/routeValidation';

export interface RouteValidationResult {
  isValid: boolean;
  message?: string;
  issues?: Array<any>;
  stats?: {
    total: number;
    errors: number;
    warnings: number;
    info: number;
  };
  valid?: boolean; // Alias for isValid for backward compatibility
}

export function useRouteValidation() {
  const [validationResult, setValidationResult] = useState<RouteValidationResult>({
    isValid: true
  });
  const [isValidating, setIsValidating] = useState(false);
  const [lastValidated, setLastValidated] = useState<Date | null>(null);

  const validatePath = useCallback((path: string, validateRelatedRoutes = false) => {
    // Temporary implementation using validateRoutes
    const routes = validateRelatedRoutes ? [path, `${path}/index`, `${path}/:id`] : [path];
    const result = validateRoutes(routes);
    
    // Convert to the expected format
    const mappedResult: RouteValidationResult = {
      isValid: result.valid,
      valid: result.valid, // Alias for backward compatibility
      issues: result.issues,
      stats: result.stats,
      message: result.issues.length > 0 ? result.issues[0].message : undefined
    };
    
    setValidationResult(mappedResult);
    setLastValidated(new Date());
    return mappedResult;
  }, []);

  const runValidation = useCallback(() => {
    setIsValidating(true);
    
    // Simulate a comprehensive route validation
    setTimeout(() => {
      // Use the existing validateRoutes function from the utils
      const commonRoutes = [
        '/', '/dashboard', '/profile', '/courses', 
        '/admin', '/admin/dashboard', '/admin/users', 
        '/admin/settings', '/admin/route-validator'
      ];
      
      const result = validateRoutes(commonRoutes);
      
      // Convert to the expected format
      const mappedResult: RouteValidationResult = {
        isValid: result.valid,
        valid: result.valid, // Alias for backward compatibility
        issues: result.issues,
        stats: result.stats
      };
      
      setValidationResult(mappedResult);
      setIsValidating(false);
      setLastValidated(new Date());
    }, 1000);
  }, []);

  return {
    validatePath,
    runValidation,
    isValidating,
    lastValidated,
    validationResult
  };
}

export default useRouteValidation;
