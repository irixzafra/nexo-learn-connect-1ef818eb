
import { useState, useCallback } from 'react';
import { routeMap } from '@/utils/routeUtils';

interface RouteIssue {
  severity: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  path?: string;
  recommendation?: string;
}

interface ValidationResult {
  valid: boolean;
  issues: RouteIssue[];
  stats: {
    total: number;
    errors: number;
    warnings: number;
    info: number;
  };
}

export function useRouteValidation() {
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [lastValidated, setLastValidated] = useState<Date | null>(null);

  const runValidation = useCallback(() => {
    // Start validation process
    setIsValidating(true);

    // Simulate validation with timeout (would be replaced with actual validation logic)
    setTimeout(() => {
      const issues: RouteIssue[] = [];
      
      // Check for dynamic routes without parameter validation
      Object.entries(routeMap).forEach(([key, route]) => {
        if (typeof route === 'function') {
          const exampleRoute = route('example');
          if (exampleRoute.includes('example') && !exampleRoute.includes(':')) {
            issues.push({
              severity: 'warning',
              title: 'Dynamic route without parameter validation',
              description: `The route "${key}" uses parameters but doesn't validate them in the URL pattern.`,
              path: exampleRoute,
              recommendation: 'Consider adding parameter validation to prevent injection attacks.'
            });
          }
        }
      });
      
      // Add example validation issues for demonstration purposes
      issues.push({
        severity: 'error',
        title: 'Broken link detected',
        description: 'The route "/example/non-existent" does not correspond to any defined page.',
        path: '/example/non-existent',
        recommendation: 'Remove all links to this URL or create a corresponding route handler.'
      });
      
      issues.push({
        severity: 'warning',
        title: 'Potential duplicate route',
        description: 'The routes "/dashboard" and "/home" point to similar content.',
        path: '/dashboard',
        recommendation: 'Consider consolidating these routes to improve SEO and user experience.'
      });
      
      issues.push({
        severity: 'info',
        title: 'Route not covered by tests',
        description: 'The admin routes lack proper test coverage.',
        path: '/admin/*',
        recommendation: 'Add unit and integration tests for these routes.'
      });

      // Count issue types
      const stats = {
        total: issues.length,
        errors: issues.filter(i => i.severity === 'error').length,
        warnings: issues.filter(i => i.severity === 'warning').length,
        info: issues.filter(i => i.severity === 'info').length
      };

      // Determine if validation passed (no errors)
      const valid = stats.errors === 0;

      // Set validation result
      setValidationResult({
        valid,
        issues,
        stats
      });
      
      // Record the validation time
      setLastValidated(new Date());
      
      // End validation
      setIsValidating(false);
    }, 1500); // Simulate processing time
  }, []);

  return {
    validationResult,
    isValidating,
    lastValidated,
    runValidation
  };
}
