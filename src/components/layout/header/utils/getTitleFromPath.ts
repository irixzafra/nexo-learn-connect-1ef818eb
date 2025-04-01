
/**
 * Utility to get the page title based on the current path
 */
export const getPageTitle = (path: string): string => {
  // Remove leading and trailing slashes, then split by slash
  const segments = path.replace(/^\/|\/$/g, '').split('/');
  
  // Special case for home and root path
  if (!segments[0] || segments[0] === 'home') {
    return 'Inicio';
  }
  
  // Handle admin paths
  if (segments[0] === 'admin') {
    if (segments.length === 1) return 'Administración';
    
    switch (segments[1]) {
      case 'dashboard': return 'Dashboard';
      case 'users': return 'Gestión de Usuarios';
      case 'courses': return 'Gestión de Cursos';
      case 'roles': return 'Roles y Permisos';
      case 'settings': return 'Configuración';
      case 'analytics': return 'Analíticas';
      case 'content': return 'Contenido';
      case 'billing': return 'Facturación';
      case 'test-data': return 'Datos de Prueba';
      case 'learning-paths': return 'Rutas de Aprendizaje';
      case 'audit-log': return 'Historial de Auditoría';
      case 'instructors': return 'Instructores';
      case 'certificates': 
        if (segments[2] === 'verify') return 'Verificación de Certificado';
        if (segments[2] === 'verification-portal') return 'Portal de Verificación';
        return 'Certificados';
      default: 
        // Try to capitalize the path segment
        return segments[1].charAt(0).toUpperCase() + segments[1].slice(1);
    }
  }

  // Handle instructor paths
  if (segments[0] === 'instructor') {
    if (segments.length === 1) return 'Instructor';
    
    switch (segments[1]) {
      case 'dashboard': return 'Dashboard';
      case 'courses': return 'Mis Cursos';
      case 'students': return 'Mis Estudiantes';
      case 'analytics': return 'Analíticas';
      default: 
        return segments[1].charAt(0).toUpperCase() + segments[1].slice(1);
    }
  }

  // Handle other known paths
  switch (segments[0]) {
    case 'courses': return 'Cursos';
    case 'profile': return 'Perfil';
    case 'settings': return 'Configuración';
    case 'messages': return 'Mensajes';
    case 'notifications': return 'Notificaciones';
    case 'billing': return 'Facturación';
    case 'community': return 'Comunidad';
    case 'learning-paths': return 'Rutas de Aprendizaje';
    case 'certificates': 
      if (segments[1] === 'verify') return 'Verificación de Certificado';
      return 'Certificados';
    default:
      // Capitalize the first segment as a fallback
      return segments[0].charAt(0).toUpperCase() + segments[0].slice(1);
  }
};
