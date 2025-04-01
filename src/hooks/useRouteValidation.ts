
import { useState, useEffect } from 'react';
import { 
  validateRoutes, 
  extractRoutesFromNavigationItems, 
  ValidationResult 
} from '@/utils/routeValidation';
import { 
  mainNavigation, 
  adminNavigation, 
  exploreNavigation, 
  instructorNavigation 
} from '@/config/navigation';
import { toast } from 'sonner';

/**
 * Hook to validate all navigation routes in the application
 */
export const useRouteValidation = () => {
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [lastValidated, setLastValidated] = useState<Date | null>(null);
  
  const runValidation = () => {
    setIsValidating(true);
    
    try {
      // Extract routes from all navigation configurations
      const mainRoutes = extractRoutesFromNavigationItems(mainNavigation);
      const adminRoutes = extractRoutesFromNavigationItems(adminNavigation);
      const exploreRoutes = extractRoutesFromNavigationItems(exploreNavigation);
      const instructorRoutes = extractRoutesFromNavigationItems(instructorNavigation);
      
      // Combine all routes
      const allRoutes = [
        ...mainRoutes, 
        ...adminRoutes, 
        ...exploreRoutes, 
        ...instructorRoutes
      ];
      
      // Validate the routes
      const result = validateRoutes(allRoutes);
      setValidationResult(result);
      setLastValidated(new Date());
      
      // Show toast with result
      if (result.valid) {
        toast.success('All routes are valid!');
      } else {
        toast.warning(`Found ${result.stats.total} route issues`, {
          description: `${result.stats.errors} errors, ${result.stats.warnings} warnings, ${result.stats.info} info`,
        });
      }
    } catch (error) {
      console.error('Error validating routes:', error);
      toast.error('Failed to validate routes', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsValidating(false);
    }
  };
  
  useEffect(() => {
    // We don't run validation on mount by default, but this could be an option
    // runValidation();
  }, []);
  
  return {
    validationResult,
    isValidating,
    lastValidated,
    runValidation
  };
};
