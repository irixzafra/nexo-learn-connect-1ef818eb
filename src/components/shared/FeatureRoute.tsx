
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useFeatureFlags } from '@/contexts/features/FeatureFlagsContext';

interface FeatureRouteProps {
  featureName: string;
  fallbackPath?: string;
  children?: React.ReactNode;
}

const FeatureRoute: React.FC<FeatureRouteProps> = ({
  featureName,
  fallbackPath = '/feature-disabled',
  children
}) => {
  const { isFeatureEnabled, isLoading } = useFeatureFlags();
  
  // Mostrar un estado de carga mientras se verifican los feature flags
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Si la feature no está habilitada, redirigir a la ruta de fallback
  if (!isFeatureEnabled(featureName)) {
    return <Navigate to={fallbackPath} replace />;
  }
  
  // Si la feature está habilitada, renderizar los hijos o el Outlet
  return <>{children || <Outlet />}</>;
};

export default FeatureRoute;
