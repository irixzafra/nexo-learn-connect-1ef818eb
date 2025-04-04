
import React from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import UnderConstructionPage from '@/components/shared/UnderConstructionPage';
import { useParams, useLocation } from 'react-router-dom';

const ComingSoonPage: React.FC = () => {
  const { pathname } = useLocation();
  const { section } = useParams();
  
  // Determinar el título basado en la ruta
  const getTitle = () => {
    if (pathname.includes('/app/learning-paths')) {
      return "Rutas de Aprendizaje";
    } else if (pathname.includes('/app/certificates')) {
      return "Certificados";
    } else if (pathname.includes('/app/calendar')) {
      return "Calendario";
    } else if (pathname.includes('/app/help')) {
      return "Centro de Ayuda";
    } else if (pathname.includes('/app/messages')) {
      return "Mensajes";
    } else if (pathname.includes('/app/community')) {
      return "Comunidad";
    } else if (pathname.includes('/app/support')) {
      return "Soporte";
    } else {
      return section ? `${section.charAt(0).toUpperCase() + section.slice(1)}` : "Página en Construcción";
    }
  };
  
  // Determinar la ruta de retorno
  const getBackPath = () => {
    if (pathname.includes('/app/admin')) {
      return '/app/admin/dashboard';
    } else if (pathname.includes('/app/instructor')) {
      return '/app/instructor/dashboard';
    } else {
      return '/app/dashboard';
    }
  };
  
  return (
    <DefaultLayout>
      <div className="container mx-auto py-8">
        <UnderConstructionPage 
          title={getTitle()}
          backPath={getBackPath()}
        />
      </div>
    </DefaultLayout>
  );
};

export default ComingSoonPage;
