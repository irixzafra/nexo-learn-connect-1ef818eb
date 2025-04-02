
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
  const { session, userRole, isLoading, isInitialized } = useAuth();
  const location = useLocation();
  
  // Logs detallados para facilitar la depuración
  console.debug('🛡️ [SafeRoute] Evaluando ruta:', location.pathname);
  console.debug('🛡️ [SafeRoute] Estado de autenticación:', { 
    isLoading, 
    isInitialized, 
    hasSession: !!session, 
    userRole,
    requiredRole 
  });
  
  // Paso 1: Verificar si la autenticación se ha inicializado
  if (!isInitialized) {
    console.debug('🛡️ [SafeRoute] isInitialized es false, mostrando spinner de inicialización...');
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
        <span className="text-primary font-medium">Inicializando autenticación...</span>
        <span className="text-sm text-muted-foreground mt-2">Esto puede tardar unos segundos</span>
      </div>
    );
  }
  
  // Paso 2: Verificar si aún se está cargando el estado de autenticación
  if (isLoading) {
    console.debug('🛡️ [SafeRoute] isLoading es true, mostrando spinner...');
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // Paso 3: Verificar si hay sesión activa
  if (!session) {
    console.debug('🛡️ [SafeRoute] No hay sesión, redirigiendo a login...');
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }
  
  // Paso 4: Verificar roles requeridos (si se especificaron)
  if (requiredRole) {
    const hasRequiredRole = Array.isArray(requiredRole)
      ? requiredRole.includes(userRole as UserRoleType)
      : requiredRole === userRole;
    
    console.debug('🛡️ [SafeRoute] Verificación de rol:', { 
      requiredRole, 
      userRole, 
      hasRequiredRole 
    });
    
    if (!hasRequiredRole) {
      console.debug('🛡️ [SafeRoute] Verificación de rol fallida, redirigiendo a app...');
      // Redirigir a la página principal de la aplicación si el rol no coincide
      return <Navigate to="/app" replace />;
    }
  }
  
  // Paso 5: Si la sesión existe y (no se requiere un rol o el rol coincide), renderizar los hijos
  console.debug('🛡️ [SafeRoute] Todas las verificaciones pasadas, renderizando hijos...');
  return <>{children}</>;
};

export default SafeRouteWrapper;
