
import { useState, useEffect } from 'react';
import { validateRoutes, extractRoutesFromNavigationItems, ValidationResult } from '@/utils/routeValidation';
import { 
  mainNavigation, 
  adminNavigation, 
  exploreNavigation, 
  instructorNavigation 
} from '@/config/navigation';

/**
 * Hook to validate all navigation routes in the application
 */
export const useRouteValidation = () => {
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  
  const runValidation = () => {
    setIsValidating(true);
    
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
    setIsValidating(false);
  };
  
  useEffect(() => {
    // Optionally run validation on mount
    // runValidation();
  }, []);
  
  return {
    validationResult,
    isValidating,
    runValidation
  };
};
