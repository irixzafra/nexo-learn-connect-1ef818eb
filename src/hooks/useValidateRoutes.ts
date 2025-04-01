
import { useState, useEffect, useCallback, useMemo } from 'react';
import { isValidPath } from '@/utils/routeValidation';

export interface MenuValidationResult {
  path: string;
  isValid: boolean;
}

export interface MenuValidation {
  results: MenuValidationResult[];
  invalidCount: number;
  validate: (paths: string[]) => MenuValidationResult[];
}

export function useValidateRoutes(): MenuValidation {
  const [results, setResults] = useState<MenuValidationResult[]>([]);
  
  const validate = useCallback((paths: string[]): MenuValidationResult[] => {
    const newResults = paths.map(path => ({
      path,
      isValid: isValidPath(path)
    }));
    
    setResults(newResults);
    return newResults;
  }, []);
  
  const invalidCount = useMemo(() => {
    return results.filter(result => !result.isValid).length;
  }, [results]);
  
  return {
    results,
    invalidCount,
    validate
  };
}
