
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
      
      // In a production environment, we could send this to an analytics service or backend
      // For now, just show a toast notification for demonstration
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
