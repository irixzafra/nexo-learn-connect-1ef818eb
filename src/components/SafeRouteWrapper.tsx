
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
  
  // Logs ampliados para facilitar la depuración
  console.debug('🛡️ [SafeRoute] Evaluando acceso a ruta:', location.pathname);
  console.debug('🛡️ [SafeRoute] Estado de autenticación completo:', { 
    isInitialized, 
    isLoading, 
    hasSession: !!session, 
    sessionExpiry: session?.expires_at ? new Date(session.expires_at * 1000).toISOString() : 'N/A',
    userRole,
    requiredRole,
    currentPath: location.pathname,
    timestamp: new Date().toISOString()
  });
  
  // FASE 1: Verificación de inicialización
  // Esta es la fase más crítica y debe ser la primera verificación
  if (!isInitialized) {
    console.debug('🛡️ [SafeRoute] Sistema de autenticación todavía inicializando, mostrando indicador...');
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-background">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
        <span className="text-primary font-medium">Inicializando sistema de autenticación...</span>
        <span className="text-sm text-muted-foreground mt-2">Esto puede tardar unos segundos</span>
      </div>
    );
  }
  
  // FASE 2: Verificación de carga
  // Solo se ejecuta DESPUÉS de que la autenticación se haya inicializado
  if (isLoading) {
    console.debug('🛡️ [SafeRoute] Autenticación inicializada pero cargando datos, mostrando spinner...');
    return (
      <div className="h-screen w-full flex justify-center items-center bg-background">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // FASE 3: Verificación de sesión
  // Ahora podemos verificar con seguridad si el usuario tiene sesión
  if (!session) {
    console.debug('🛡️ [SafeRoute] No hay sesión activa, redirigiendo a login...');
    // Guardamos la ruta actual para redirigir después del login
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }
  
  // Verificación adicional de la validez de la sesión
  const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
  if (session.expires_at && session.expires_at < now) {
    console.debug('🛡️ [SafeRoute] Sesión expirada, redirigiendo a login...');
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }
  
  // FASE 4: Verificación de roles (si se especificaron)
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
      console.debug('🛡️ [SafeRoute] Usuario sin rol requerido, redirigiendo a app...');
      // Redirigir a la página principal de la aplicación si el rol no coincide
      return <Navigate to="/app" replace />;
    }
  }
  
  // FASE 5: Renderizado de la ruta protegida
  // Si llegamos aquí, significa que:
  // 1. La autenticación está inicializada
  // 2. No estamos en proceso de carga
  // 3. El usuario tiene una sesión válida
  // 4. El usuario tiene el rol requerido (si se especificó)
  console.debug('🛡️ [SafeRoute] Todas las verificaciones pasadas, renderizando contenido protegido...');
  return <>{children}</>;
};

export default SafeRouteWrapper;
