
import React, { ReactNode } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NotFound from '@/pages/NotFound';
import { isValidPath } from '@/utils/routeValidation';

export interface RouteRedirectorProps {
  children?: ReactNode;
  fallback?: React.ReactNode;
}

const RouteRedirector: React.FC<RouteRedirectorProps> = ({ 
  children,
  fallback = <NotFound />
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { path } = useParams<{ path: string }>();
  const [isValidRoute, setIsValidRoute] = useState<boolean | null>(null);

  useEffect(() => {
    if (path) {
      // Decode the path, as it might be URL encoded
      const decodedPath = decodeURIComponent(path);
      
      // Check if this is a valid path in our application
      if (isValidPath && typeof isValidPath === 'function') {
        const valid = isValidPath(decodedPath);
        setIsValidRoute(valid);
        
        if (valid) {
          navigate(decodedPath, { replace: true });
        }
      } else {
        // If no validation function is available, just try to navigate
        navigate(decodedPath, { replace: true });
      }
    }
  }, [path, navigate]);

  // If we've determined this is not a valid route, show the fallback
  if (isValidRoute === false) {
    return <>{fallback}</>;
  }

  // While checking or if path parameter is not provided, show children
  return <>{children}</>;
};

export default RouteRedirector;
