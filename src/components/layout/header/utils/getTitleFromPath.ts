
export function getPageTitle(path: string): string {
  const segments = path.split('/').filter(p => p);
  if (segments.length === 0) return 'Inicio';
  
  const lastSegment = segments[segments.length - 1];
  
  const titleMap: { [key: string]: string } = {
    'profile': 'Mi Perfil',
    'courses': 'Cursos',
    'my-courses': 'Mis Cursos',
    'settings': 'Configuración',
    'messages': 'Mensajes',
    'calendar': 'Calendario',
    'admin': 'Administración',
    'instructor': 'Instructor',
    'dashboard': 'Dashboard',
    'search': 'Búsqueda',
    'system-settings': 'Configuración del Sistema',
    'roles': 'Gestión de Roles',
    'users': 'Gestión de Usuarios',
    'categories': 'Gestión de Categorías',
    'test-data': 'Datos de Prueba',
    'instructors': 'Instructores'
  };
  
  return titleMap[lastSegment] || 
    (lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).toLowerCase());
}
