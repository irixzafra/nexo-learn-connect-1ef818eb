
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupabaseSync } from '@/hooks/useSupabaseSync';

interface SupabaseConnectionTestProps {
  showCard?: boolean;
  autoTest?: boolean;
}

const SupabaseConnectionTest: React.FC<SupabaseConnectionTestProps> = ({ 
  showCard = true,
  autoTest = true
}) => {
  const { connectionStatus, lastSyncAttempt, error, checkDatabaseStatus } = useSupabaseSync();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Verificar la conexión al montar el componente si autoTest está habilitado
  React.useEffect(() => {
    if (autoTest) {
      checkDatabaseStatus();
    }
  }, [autoTest, checkDatabaseStatus]);

  const handleCheckConnection = async () => {
    setIsLoading(true);
    await checkDatabaseStatus();
    setIsLoading(false);
  };

  const getContent = () => (
    <>
      {connectionStatus === 'connected' ? (
        <Alert variant="success">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Conectado a Supabase</AlertTitle>
          <AlertDescription>
            La conexión a la base de datos está funcionando correctamente.
            {lastSyncAttempt && (
              <p className="text-xs mt-1">
                Última verificación: {lastSyncAttempt.toLocaleString()}
              </p>
            )}
          </AlertDescription>
        </Alert>
      ) : connectionStatus === 'disconnected' ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error de Conexión</AlertTitle>
          <AlertDescription>
            No se pudo establecer conexión con Supabase.
            {error && <p className="font-mono text-xs mt-1 break-all">{error.message}</p>}
            {lastSyncAttempt && (
              <p className="text-xs mt-1">
                Última verificación: {lastSyncAttempt.toLocaleString()}
              </p>
            )}
          </AlertDescription>
        </Alert>
      ) : (
        <Alert>
          <RefreshCw className="h-4 w-4 animate-spin" />
          <AlertTitle>Verificando conexión...</AlertTitle>
          <AlertDescription>
            Comprobando el estado de la conexión con Supabase...
          </AlertDescription>
        </Alert>
      )}
    </>
  );

  if (!showCard) {
    return getContent();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estado de Conexión a Supabase</CardTitle>
        <CardDescription>
          Verifica la conexión con la base de datos en tiempo real
        </CardDescription>
      </CardHeader>
      <CardContent>
        {getContent()}
      </CardContent>
      <CardFooter className="justify-end">
        <Button 
          variant="outline" 
          onClick={handleCheckConnection} 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Verificando...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Comprobar Conexión
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupabaseConnectionTest;
