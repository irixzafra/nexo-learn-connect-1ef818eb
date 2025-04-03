
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { isValidPath } from '@/utils/routeValidation';
import { useLocalization } from '@/hooks/useLocalization';
import { Badge } from '@/components/ui/badge';

interface BrokenLinkMonitorProps {
  enabled?: boolean;
  showNotifications?: boolean;
  logToConsole?: boolean;
  reportToAnalytics?: boolean;
  showDebugInfo?: boolean;
}

const BrokenLinkMonitor: React.FC<BrokenLinkMonitorProps> = ({
  enabled = true,
  showNotifications = true,
  logToConsole = true,
  reportToAnalytics = false,
  showDebugInfo = false,
}) => {
  const location = useLocation();
  const { t } = useLocalization();
  const [invalidRoutesCount, setInvalidRoutesCount] = useState<number>(0);
  
  useEffect(() => {
    if (!enabled) return;
    
    const currentPath = location.pathname;
    const isValid = isValidPath(currentPath);
    
    if (!isValid) {
      // Incrementar contador
      setInvalidRoutesCount(prev => prev + 1);
      
      // Log to console
      if (logToConsole) {
        console.error(`[BrokenLinkMonitor] Broken link detected: ${currentPath}`);
      }
      
      // Show toast notification
      if (showNotifications) {
        toast.error(
          t('errors.brokenLink', { 
            default: 'Broken link detected', 
            path: currentPath 
          }),
          {
            description: t('errors.brokenLinkDesc', { 
              default: 'We have logged this issue to resolve it.', 
              path: currentPath 
            }),
            duration: 5000,
            action: {
              label: 'Reportar',
              onClick: () => {
                // Acción al hacer clic en el botón
                console.log('Reporting broken link:', currentPath);
              }
            }
          }
        );
      }
      
      // Report to analytics service
      if (reportToAnalytics) {
        // En una implementación real, esto enviaría datos a un servicio de análisis
        try {
          // Ejemplo: sendToAnalytics('broken_link', { path: currentPath });
          console.log('[Analytics] Reporting broken link:', currentPath);
        } catch (error) {
          console.error('Failed to report broken link to analytics', error);
        }
      }
    }
  }, [location.pathname, enabled, showNotifications, logToConsole, reportToAnalytics, t]);

  // Mostrar información de depuración si está habilitada
  if (showDebugInfo) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Badge variant="outline" className="bg-background">
          <span className="mr-1">Enlaces inválidos detectados:</span>
          <span className={`font-bold ${invalidRoutesCount > 0 ? 'text-destructive' : 'text-success'}`}>
            {invalidRoutesCount}
          </span>
        </Badge>
      </div>
    );
  }

  return null; // Este componente normalmente no renderiza nada visible
};

export default BrokenLinkMonitor;
