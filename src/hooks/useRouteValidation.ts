
import { useState, useCallback } from 'react';
import { validateRoute } from '@/utils/routeValidation';

interface RouteValidationResult {
  isValid: boolean;
  message?: string;
}

export function useRouteValidation() {
  const [validationResult, setValidationResult] = useState<RouteValidationResult>({
    isValid: true
  });

  const validatePath = useCallback((path: string, validateRelatedRoutes = false) => {
    const result = validateRoute(path, validateRelatedRoutes);
    setValidationResult(result);
    return result;
  }, []);

  return {
    validatePath,
    validationResult
  };
}

export default useRouteValidation;
