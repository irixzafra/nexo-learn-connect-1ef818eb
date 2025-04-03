
import React from 'react';
import { DatabaseIcon, Wifi, WifiOff } from 'lucide-react';
import { useSupabaseSync } from '@/hooks/useSupabaseSync';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface DatabaseConnectionIndicatorProps {
  className?: string;
}

const DatabaseConnectionIndicator: React.FC<DatabaseConnectionIndicatorProps> = ({ 
  className 
}) => {
  const { connectionStatus, checkDatabaseStatus } = useSupabaseSync();
  
  const handleCheckConnection = async () => {
    await checkDatabaseStatus();
  };
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn("rounded-full h-9 w-9", className)}
          onClick={handleCheckConnection}
        >
          {connectionStatus === 'connected' && (
            <DatabaseIcon className="h-5 w-5 text-emerald-500" />
          )}
          {connectionStatus === 'disconnected' && (
            <WifiOff className="h-5 w-5 text-destructive" />
          )}
          {connectionStatus === 'checking' && (
            <div className="h-5 w-5 animate-pulse text-muted-foreground">
              <DatabaseIcon className="h-5 w-5" />
            </div>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>
          {connectionStatus === 'connected' && 'Conectado a base de datos'}
          {connectionStatus === 'disconnected' && 'Sin conexión a base de datos'}
          {connectionStatus === 'checking' && 'Verificando conexión...'}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

export default DatabaseConnectionIndicator;
