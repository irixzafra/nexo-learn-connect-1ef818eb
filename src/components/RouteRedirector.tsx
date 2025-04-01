
import React, { ReactNode } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NotFound from '@/pages/NotFound';
import { isValidPath } from '@/utils/routeValidation';
import { toast } from 'sonner';
import { useLocalization } from '@/hooks/useLocalization';
import NotFoundLayout from '@/layouts/NotFoundLayout';

export interface RouteRedirectorProps {
  children?: ReactNode;
  fallback?: React.ReactNode;
  reportBrokenLinks?: boolean;
}

const RouteRedirector: React.FC<RouteRedirectorProps> = ({ 
  children,
  fallback = <NotFoundLayout><NotFound /></NotFoundLayout>,
  reportBrokenLinks = true
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLocalization();
  const { path } = useParams<{ path: string }>();
  const [isValidRoute, setIsValidRoute] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    if (path) {
      // Decode the path, as it might be URL encoded
      const decodedPath = decodeURIComponent(path);
      
      // Check if this is a valid path in our application
      if (isValidPath && typeof isValidPath === 'function') {
        const valid = isValidPath(decodedPath);
        setIsValidRoute(valid);
        
        if (valid) {
          // Show a success message
          toast.success(
            t('navigation.redirecting', { 
              default: 'Redirecting you to the correct page'
            }),
            { duration: 2000 }
          );
          
          // Redirect to the valid path
          setTimeout(() => {
            navigate(decodedPath, { replace: true });
          }, 100);
        } else if (reportBrokenLinks) {
          // Log the broken link for analysis
          console.error(`[RouteRedirector] Invalid redirect path: ${decodedPath}`);
          
          // Show error message
          toast.error(
            t('errors.invalidRedirect', { 
              default: 'Invalid redirect destination', 
              path: decodedPath 
            }),
            {
              description: t('errors.redirectFailure', { 
                default: 'We could not redirect you to the requested page.', 
                path: decodedPath 
              }),
              duration: 5000,
            }
          );
        }
        
        setIsProcessing(false);
      } else {
        // If no validation function is available, just try to navigate
        navigate(decodedPath, { replace: true });
        setIsProcessing(false);
      }
    } else {
      setIsProcessing(false);
    }
  }, [path, navigate, reportBrokenLinks, t]);

  // Show loading indicator while processing
  if (isProcessing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If we've determined this is not a valid route, show the fallback
  if (isValidRoute === false) {
    return <>{fallback}</>;
  }

  // While checking or if path parameter is not provided, show children
  return <>{children}</>;
};

export default RouteRedirector;
