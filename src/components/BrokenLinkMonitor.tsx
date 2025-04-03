
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { isValidPath } from '@/utils/routeValidation';
import { useLocalization } from '@/hooks/useLocalization';

interface BrokenLinkMonitorProps {
  enabled?: boolean;
  showNotifications?: boolean;
  logToConsole?: boolean;
  reportToAnalytics?: boolean;
}

const BrokenLinkMonitor: React.FC<BrokenLinkMonitorProps> = ({
  enabled = true,
  showNotifications = true,
  logToConsole = true,
  reportToAnalytics = false,
}) => {
  const location = useLocation();
  const { t } = useLocalization();
  
  useEffect(() => {
    if (!enabled) return;
    
    const currentPath = location.pathname;
    const isValid = isValidPath(currentPath);
    
    if (!isValid) {
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
          }
        );
      }
      
      // Report to analytics service
      if (reportToAnalytics) {
        // In a real implementation, this would send data to an analytics service
        try {
          // Example: sendToAnalytics('broken_link', { path: currentPath });
          console.log('[Analytics] Reporting broken link:', currentPath);
        } catch (error) {
          console.error('Failed to report broken link to analytics', error);
        }
      }
    }
  }, [location.pathname, enabled, showNotifications, logToConsole, reportToAnalytics, t]);

  return null; // This component doesn't render anything
};

export default BrokenLinkMonitor;
