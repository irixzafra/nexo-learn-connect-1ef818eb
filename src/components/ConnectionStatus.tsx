
import React, { useState, useEffect } from 'react';
import { connectionService } from '@/lib/offline/connectionService';
import { useSyncManager } from '@/lib/offline/useSyncManager';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ConnectionStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(connectionService.isCurrentlyOnline());
  const { pendingOperations, syncNow, isSyncing } = useSyncManager();

  useEffect(() => {
    const unsubscribe = connectionService.addListener(online => {
      setIsOnline(online);
    });
    
    return unsubscribe;
  }, []);

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge 
              variant={isOnline ? "outline" : "secondary"}
              className={`flex items-center gap-1 cursor-default ${isOnline ? 'bg-green-100 dark:bg-green-900/20 border-green-300 dark:border-green-600' : 'border-yellow-300 dark:border-yellow-700'}`}
            >
              {isOnline ? (
                <Wifi className="h-3 w-3 text-green-600 dark:text-green-400" />
              ) : (
                <WifiOff className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
              )}
              {isOnline ? 'Conectado' : 'Sin conexión'}
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {isOnline 
              ? 'Conectado a Internet. Todas las funciones están disponibles.'
              : 'Modo offline. Algunas funciones estarán limitadas hasta que se restablezca la conexión.'
            }
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {pendingOperations > 0 && isOnline && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 gap-1 text-xs"
                onClick={syncNow}
                disabled={isSyncing}
              >
                <RefreshCw className={`h-3 w-3 ${isSyncing ? 'animate-spin' : ''}`} />
                {isSyncing ? 'Sincronizando...' : `Sincronizar (${pendingOperations})`}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {pendingOperations} {pendingOperations === 1 ? 'cambio pendiente' : 'cambios pendientes'} de sincronización
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
