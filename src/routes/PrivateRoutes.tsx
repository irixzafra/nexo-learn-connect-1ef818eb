
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLocalization } from '@/hooks/useLocalization';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requiredRole?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, isLoading } = useAuth();
  const { localizeUrl } = useLocalization();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={localizeUrl('/auth/login')} replace />;
  }

  if (requiredRole && !requiredRole.includes(user.role)) {
    return <Navigate to={localizeUrl('/dashboard')} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

const PrivateRoutes: React.FC = () => {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
};

export default PrivateRoutes;
