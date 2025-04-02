
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { UserRoleType } from '@/types/auth';

interface SafeRouteWrapperProps {
  children: React.ReactNode;
  requiredRole?: UserRoleType | UserRoleType[];
}

const SafeRouteWrapper: React.FC<SafeRouteWrapperProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { session, userRole, isLoading } = useAuth(); // Obtener session en lugar de isAuthenticated
  const location = useLocation();
  
  console.log('SafeRouteWrapper evaluating:', location.pathname);
  console.log('SafeRouteWrapper auth state:', { isLoading, session, userRole });
  
  // Show loading spinner while auth state is being determined
  if (isLoading) {
    console.log('SafeRouteWrapper: isLoading, showing spinner...');
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // If not authenticated (no session after loading), redirect to login
  if (!session) {
    console.log('SafeRouteWrapper: No session, redirecting to login...');
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }
  
  // If requiredRole is specified, check if user has the required role
  if (requiredRole) {
    const hasRequiredRole = Array.isArray(requiredRole)
      ? requiredRole.includes(userRole as UserRoleType)
      : requiredRole === userRole;
    
    console.log('SafeRouteWrapper: Role check:', { requiredRole, userRole, hasRequiredRole });
    
    if (!hasRequiredRole) {
      console.log('SafeRouteWrapper: Role check failed, redirecting to app...');
      // Redirect to the app main page if role doesn't match
      return <Navigate to="/app" replace />;
    }
  }
  
  // If session exists and (no role required or role matches), render children
  console.log('SafeRouteWrapper: All checks passed, rendering children...');
  return <>{children}</>;
};

export default SafeRouteWrapper;
