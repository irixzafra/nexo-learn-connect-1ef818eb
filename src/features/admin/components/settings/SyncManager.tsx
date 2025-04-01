
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RefreshCw, AlertCircle, CheckCircle, Database, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useSupabaseSync } from '@/hooks/useSupabaseSync';
import SupabaseConnectionTest from './SupabaseConnectionTest';

interface SyncManagerProps {
  autoSync?: boolean;
}

const SyncManager: React.FC<SyncManagerProps> = ({ autoSync = false }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const { syncStatus, startSync, cancelSync } = useSupabaseSync();
  
  const handleSync = async () => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    try {
      await startSync();
      
      // Simular progreso de sincronización
      const syncInterval = setInterval(() => {
        setSyncProgress(prev => {
          if (prev >= 100) {
            clearInterval(syncInterval);
            setIsSyncing(false);
            setLastSyncTime(new Date());
            toast.success('Sincronización completada correctamente');
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    } catch (error) {
      console.error('Error durante la sincronización:', error);
      toast.error('Error al sincronizar con la base de datos');
      setIsSyncing(false);
    }
  };
  
  const handleCancelSync = () => {
    cancelSync();
    setIsSyncing(false);
    setSyncProgress(0);
    toast.info('Sincronización cancelada');
  };
  
  // Auto-sincronizar al cargar si está habilitado
  React.useEffect(() => {
    if (autoSync && !isSyncing && syncStatus === 'idle') {
      handleSync();
    }
  }, [autoSync, syncStatus]);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <CardTitle>Gestor de Sincronización</CardTitle>
        </div>
        <CardDescription>
          Administra la sincronización de datos con Supabase
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SupabaseConnectionTest showCard={false} autoTest={false} />
        
        <div className="bg-muted p-4 rounded-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge variant={syncStatus === 'error' ? 'destructive' : 'outline'}>
                {syncStatus === 'syncing' ? 'Sincronizando' : 
                 syncStatus === 'error' ? 'Error' : 
                 syncStatus === 'success' ? 'Sincronizado' : 'Listo'}
              </Badge>
              {lastSyncTime && (
                <span className="text-xs text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Última sincronización: {lastSyncTime.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
          
          {isSyncing && (
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Progreso</span>
                <span>{syncProgress}%</span>
              </div>
              <Progress value={syncProgress} className="h-2" />
            </div>
          )}
          
          <div className="flex gap-2 mt-2">
            <Button 
              onClick={handleSync} 
              disabled={isSyncing}
              className="flex-1"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Sincronizando...' : 'Sincronizar Datos'}
            </Button>
            
            {isSyncing && (
              <Button 
                variant="outline" 
                onClick={handleCancelSync}
              >
                Cancelar
              </Button>
            )}
          </div>
        </div>
        
        {syncStatus === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error de sincronización</AlertTitle>
            <AlertDescription>
              Se produjo un error al sincronizar con la base de datos. Por favor, verifica tu conexión e inténtalo de nuevo.
            </AlertDescription>
          </Alert>
        )}
        
        {syncStatus === 'success' && (
          <Alert variant="default" className="bg-green-50 border-green-200 text-green-800">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle>Sincronización exitosa</AlertTitle>
            <AlertDescription className="text-green-700">
              Todos los datos han sido sincronizados correctamente con la base de datos.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default SyncManager;
