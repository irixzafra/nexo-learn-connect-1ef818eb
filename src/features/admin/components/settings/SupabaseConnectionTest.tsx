
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type ConnectionStatus = 'connected' | 'disconnected' | 'checking';

const SupabaseConnectionTest: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatus>('checking');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Comprobar la conexión a Supabase
  const checkConnection = async () => {
    setIsLoading(true);
    setStatus('checking');
    setError(null);
    
    try {
      // Intenta hacer una consulta simple para verificar la conexión
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);
      
      if (error) {
        throw error;
      }
      
      setStatus('connected');
    } catch (err: any) {
      console.error('Error al verificar la conexión a Supabase:', err);
      setStatus('disconnected');
      setError(err.message || 'No se pudo conectar a Supabase');
    } finally {
      setLastChecked(new Date());
      setIsLoading(false);
    }
  };

  // Verificar la conexión al montar el componente
  React.useEffect(() => {
    checkConnection();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estado de Conexión a Supabase</CardTitle>
        <CardDescription>
          Verifica la conexión con la base de datos en tiempo real
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status === 'connected' ? (
          <Alert variant="success">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Conectado a Supabase</AlertTitle>
            <AlertDescription>
              La conexión a la base de datos está funcionando correctamente.
              {lastChecked && (
                <p className="text-xs mt-1">
                  Última verificación: {lastChecked.toLocaleString()}
                </p>
              )}
            </AlertDescription>
          </Alert>
        ) : status === 'disconnected' ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error de Conexión</AlertTitle>
            <AlertDescription>
              No se pudo establecer conexión con Supabase.
              {error && <p className="font-mono text-xs mt-1 break-all">{error}</p>}
              {lastChecked && (
                <p className="text-xs mt-1">
                  Última verificación: {lastChecked.toLocaleString()}
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
      </CardContent>
      <CardFooter className="justify-end">
        <Button 
          variant="outline" 
          onClick={checkConnection} 
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
