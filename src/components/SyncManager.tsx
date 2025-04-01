
import { useState, useEffect } from 'react';
import { useSupabaseSync } from '@/hooks/useSupabaseSync';
import { Button } from '@/components/ui/button';
import { RefreshCw, Wifi, WifiOff, Clock, Check } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from './ui/badge';

interface SyncManagerProps {
  className?: string;
  variant?: 'default' | 'minimal';
}

export const SyncManager: React.FC<SyncManagerProps> = ({ 
  className = '',
  variant = 'default'
}) => {
  const { 
    isOnline, 
    lastSynced, 
    pendingOperations, 
    isSyncing, 
    syncNow 
  } = useSupabaseSync();

  // Format time difference
  const getTimeSinceLastSync = () => {
    if (!lastSynced) return 'Nunca';
    
    const now = new Date();
    const diffMs = now.getTime() - lastSynced.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Hace menos de un minuto';
    if (diffMins === 1) return 'Hace 1 minuto';
    if (diffMins < 60) return `Hace ${diffMins} minutos`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return 'Hace 1 hora';
    if (diffHours < 24) return `Hace ${diffHours} horas`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Hace 1 día';
    return `Hace ${diffDays} días`;
  };

  // Minimal variant (icon only)
  if (variant === 'minimal') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className={className}
              onClick={syncNow}
              disabled={isSyncing || !isOnline}
            >
              {isSyncing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : isOnline ? (
                <Wifi className={`h-4 w-4 ${pendingOperations > 0 ? 'text-amber-500' : 'text-green-500'}`} />
              ) : (
                <WifiOff className="h-4 w-4 text-red-500" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {isSyncing ? (
              <p>Sincronizando datos...</p>
            ) : !isOnline ? (
              <p>Sin conexión. Los cambios se guardarán localmente.</p>
            ) : pendingOperations > 0 ? (
              <p>{pendingOperations} {pendingOperations === 1 ? 'cambio pendiente' : 'cambios pendientes'} de sincronizar</p>
            ) : (
              <p>Todos los datos están sincronizados{lastSynced && `. Última sincronización: ${getTimeSinceLastSync()}`}</p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Default variant (with text)
  return (
    <div className={`flex items-center gap-2 p-2 rounded-md bg-background border ${className}`}>
      <div className="flex items-center gap-1.5">
        {isSyncing ? (
          <RefreshCw className="h-4 w-4 animate-spin text-primary" />
        ) : isOnline ? (
          <Wifi className={`h-4 w-4 ${pendingOperations > 0 ? 'text-amber-500' : 'text-green-500'}`} />
        ) : (
          <WifiOff className="h-4 w-4 text-red-500" />
        )}
        
        <span className="text-sm font-medium">
          {isSyncing ? (
            "Sincronizando..."
          ) : !isOnline ? (
            "Sin conexión"
          ) : pendingOperations > 0 ? (
            `${pendingOperations} pendientes`
          ) : (
            "Sincronizado"
          )}
        </span>
      </div>
      
      {!isSyncing && lastSynced && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{getTimeSinceLastSync()}</span>
        </div>
      )}
      
      {!isSyncing && pendingOperations > 0 && isOnline && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="ml-auto h-7 px-2 text-xs"
          onClick={syncNow}
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Sincronizar
        </Button>
      )}
      
      {!isSyncing && pendingOperations === 0 && isOnline && (
        <Badge variant="outline" className="ml-auto bg-green-50 text-green-700 text-xs border-green-200">
          <Check className="h-3 w-3 mr-1" />
          Al día
        </Badge>
      )}
    </div>
  );
};

export default SyncManager;
