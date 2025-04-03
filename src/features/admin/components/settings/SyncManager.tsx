
import React from 'react';
import { useSupabaseSync } from '@/hooks/useSupabaseSync';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Database, WifiOff } from 'lucide-react';

interface SyncManagerProps {
  className?: string;
}

/**
 * Admin version of the SyncManager showing database connection status 
 * with more detailed information for administrators
 */
const AdminSyncManager: React.FC<SyncManagerProps> = ({ className }) => {
  const { connectionStatus, checkDatabaseStatus } = useSupabaseSync();

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {connectionStatus === 'connected' ? (
            <Database className="h-4 w-4 text-green-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-500" />
          )}
          Estado de Conexión a Base de Datos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={connectionStatus === 'connected' ? 'success' : 'destructive'}>
              {connectionStatus === 'connected' ? 'Conectado' : connectionStatus === 'checking' ? 'Verificando...' : 'Desconectado'}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {connectionStatus === 'connected' 
                ? 'La base de datos está disponible' 
                : connectionStatus === 'checking' 
                ? 'Comprobando conexión...' 
                : 'Sin conexión a la base de datos'}
            </span>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => checkDatabaseStatus()}
            disabled={connectionStatus === 'checking'}
          >
            {connectionStatus === 'checking' && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
            Comprobar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSyncManager;
