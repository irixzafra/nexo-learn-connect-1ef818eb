
import { useEffect } from 'react';
import { toast } from 'sonner';
import { clearOldCaches, checkForUpdates } from '@/lib/cache/serviceWorkerRegistration';
import { connectionService } from '@/lib/offline/connectionService';
import { useSyncManager } from '@/lib/offline/useSyncManager';

export const CacheManager = () => {
  const { syncNow, pendingOperations } = useSyncManager();
  
  // Verificar actualizaciones de caché e intentar sincronizar datos pendientes
  useEffect(() => {
    // Limpiar cachés antiguas al iniciar
    clearOldCaches();
    
    // Comprobar actualizaciones del service worker periódicamente
    const updateInterval = setInterval(() => {
      checkForUpdates();
    }, 30 * 60 * 1000); // Cada 30 minutos
    
    // Verificar si hay datos pendientes para sincronizar cuando se restaura la conexión
    const unsubscribe = connectionService.addListener(online => {
      if (online && pendingOperations > 0) {
        toast.info(
          `Conexión restaurada. Sincronizando ${pendingOperations} ${pendingOperations === 1 ? 'operación' : 'operaciones'} pendiente${pendingOperations === 1 ? '' : 's'}.`
        );
        syncNow();
      }
    });
    
    return () => {
      clearInterval(updateInterval);
      unsubscribe();
    };
  }, [syncNow, pendingOperations]);

  // Este componente no renderiza nada, solo gestiona la caché
  return null;
};

export default CacheManager;
