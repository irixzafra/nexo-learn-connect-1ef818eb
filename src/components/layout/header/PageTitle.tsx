
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

export const PageTitle: React.FC = () => {
  const location = useLocation();
  
  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/home') return 'Inicio';
    if (path === '/profile') return 'Perfil';
    if (path === '/courses') return 'Catálogo de Cursos';
    if (path === '/my-courses') return 'Mis Cursos';
    if (path === '/scholarships') return 'Becas';
    if (path === '/settings') return 'Configuración';
    if (path === '/calendar') return 'Calendario';
    if (path === '/messages') return 'Mensajes';
    if (path.startsWith('/admin/dashboard')) return 'Panel de Administración';
    if (path.startsWith('/admin/users')) return 'Gestión de Usuarios';
    if (path.startsWith('/admin/test-data')) return 'Datos de Prueba';
    if (path.startsWith('/admin/billing')) return 'Facturación';
    if (path.startsWith('/instructor/dashboard')) return 'Panel de Instructor';
    if (path.startsWith('/instructor/courses')) return 'Cursos del Instructor';
    if (path.startsWith('/instructor/students')) return 'Estudiantes';
    if (path.startsWith('/about-us')) return 'Acerca de Nosotros';
    return '';
  };

  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground pl-2">
      <Link to="/home" className="hover:text-foreground">
        <Home className="h-3.5 w-3.5" />
        <span className="sr-only">Inicio</span>
      </Link>
      {getPageTitle() && (
        <>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-foreground">{getPageTitle()}</span>
        </>
      )}
    </div>
  );
};
