
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

// Fixed overloaded function implementation
export function useValidateRoutes(): MenuValidation;
export function useValidateRoutes(paths: string[]): MenuValidationResult[];
export function useValidateRoutes(paths?: string[]): MenuValidation | MenuValidationResult[] {
  const [results, setResults] = useState<MenuValidationResult[]>([]);
  
  const validate = useCallback((pathsToValidate: string[]): MenuValidationResult[] => {
    const newResults = pathsToValidate.map(path => ({
      path,
      isValid: isValidPath(path)
    }));
    
    setResults(newResults);
    return newResults;
  }, []);
  
  useEffect(() => {
    if (paths) {
      validate(paths);
    }
  }, [paths, validate]);
  
  const invalidCount = useMemo(() => {
    return results.filter(result => !result.isValid).length;
  }, [results]);
  
  if (paths) {
    return results;
  }
  
  return {
    results,
    invalidCount,
    validate
  };
}
