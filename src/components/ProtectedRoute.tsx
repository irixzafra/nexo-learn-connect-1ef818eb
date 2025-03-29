
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiredRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole,
  requiredRoles
}) => {
  const { isAuthenticated, userRole, isLoading } = useAuth();
  const location = useLocation();

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

  // If requiredRoles array is provided, check if the user has any of the required roles
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = userRole === 'admin' || requiredRoles.includes(userRole as UserRole);
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }
  // If a single role is required, check if the user has that role
  else if (requiredRole && userRole !== requiredRole && userRole !== 'admin') {
    // Admin can access everything, otherwise must have the required role
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
