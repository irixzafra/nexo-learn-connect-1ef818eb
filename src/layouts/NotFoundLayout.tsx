
import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useLocalization } from '@/hooks/useLocalization';

interface NotFoundLayoutProps {
  children: ReactNode;
  reportBrokenLink?: boolean;
}

const NotFoundLayout: React.FC<NotFoundLayoutProps> = ({ 
  children,
  reportBrokenLink = false
}) => {
  const location = useLocation();
  const { t } = useLocalization();
  
  useEffect(() => {
    if (reportBrokenLink) {
      // Log the broken link to console for debugging
      console.error(`Broken link detected: ${location.pathname}`);
      
      // En un entorno de producción, podríamos enviar esto a un servicio de analítica o backend
      // Por ahora, solo mostramos una notificación toast para demostración
      toast.error(
        t('errors.brokenLink', { 
          default: 'Se ha detectado un enlace roto', 
          path: location.pathname 
        }),
        {
          description: t('errors.brokenLinkDesc', { 
            default: 'Hemos registrado este problema para solucionarlo.', 
            path: location.pathname 
          }),
          duration: 5000,
        }
      );
    }
  }, [location.pathname, reportBrokenLink, t]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      {children}
    </div>
  );
};

export default NotFoundLayout;
