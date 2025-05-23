
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { UserRoleType } from '@/types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRoleType;
  roles?: UserRoleType[];
  requiredRoles?: UserRoleType[];
  checkFn?: () => boolean;
  fallbackPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole,
  roles, // Para compatibilidad con código existente
  requiredRoles,
  checkFn,
  fallbackPath = "/unauthorized"
}) => {
  const { isAuthenticated, userRole, isLoading } = useAuth();
  const location = useLocation();
  
  // Normalizar roles y requiredRoles para manejar ambas propiedades
  const rolesToCheck = roles || requiredRoles;

  // Show loading state if authentication is still being verified
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If a custom check function is provided, use it
  if (checkFn && !checkFn()) {
    return <Navigate to={fallbackPath} replace />;
  }

  // If rolesToCheck array is provided, check if the user has any of the required roles
  if (rolesToCheck && rolesToCheck.length > 0) {
    const hasRequiredRole = userRole === 'admin' || rolesToCheck.includes(userRole as UserRoleType);
    if (!hasRequiredRole) {
      return <Navigate to={fallbackPath} replace />;
    }
  }
  // If a single role is required, check if the user has that role
  else if (requiredRole && userRole !== requiredRole && userRole !== 'admin') {
    // Admin can access everything, otherwise must have the required role
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
