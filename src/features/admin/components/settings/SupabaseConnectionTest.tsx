import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, CheckCircle, AlertCircle, Info, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SupabaseConnectionTestProps {
  onTestComplete?: (success: boolean) => void;
  showCard?: boolean;
  autoTest?: boolean;
}

const SupabaseConnectionTest: React.FC<SupabaseConnectionTestProps> = ({ 
  onTestComplete,
  showCard = false,
  autoTest = false
}) => {
  const [testing, setTesting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [lastTestedAt, setLastTestedAt] = useState<Date | null>(null);
  const [dbInfo, setDbInfo] = useState<{version?: string; size?: string} | null>(null);

  // If autoTest is true, test on component mount
  useEffect(() => {
    if (autoTest) {
      testConnection();
    }
  }, [autoTest]);

  const testConnection = async () => {
    try {
      setTesting(true);
      
      // Simple test query to check if Supabase is connected - using a known table
      const { data, error } = await supabase
        .from('profiles')
        .select('count(*)', { count: 'exact', head: true });
      
      if (error) {
        console.error("Supabase connection error:", error);
        setStatus('error');
        toast.error("Error de conexión con Supabase", {
          description: error.message
        });
        onTestComplete?.(false);
        return;
      }
      
      // Try to get some database metadata if possible
      try {
        const { data: userCount, error: countError } = await supabase
          .from('profiles')
          .select('count(*)', { count: 'exact', head: true });
          
        if (!countError) {
          setDbInfo({
            version: "Postgres (Supabase)",
            size: `${userCount?.count || 0} usuarios registrados`
          });
        }
      } catch (metaErr) {
        // Silently fail as this is not critical info
        console.log("Could not fetch database metadata:", metaErr);
      }
      
      setStatus('success');
      setLastTestedAt(new Date());
      toast.success("Conexión con Supabase exitosa");
      onTestComplete?.(true);
    } catch (error) {
      console.error("Test connection error:", error);
      setStatus('error');
      toast.error("Error al probar la conexión");
      onTestComplete?.(false);
    } finally {
      setTesting(false);
    }
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const getStatusComponent = () => {
    if (status === 'success') {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    if (status === 'error') {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
    
    // Default idle state
    return <div className="h-2 w-2 rounded-full bg-green-500"></div>;
  };

  const getStatusText = () => {
    if (status === 'success') {
      return "Conexión verificada";
    }
    if (status === 'error') {
      return "Error de conexión";
    }
    
    // Default idle state
    return "Conectado a Supabase";
  };

  const renderConnectionStatus = () => (
    <div className="bg-muted p-4 rounded-md flex items-center justify-between">
      <div className="flex items-center gap-2">
        {getStatusComponent()}
        <span>{getStatusText()}</span>
        {lastTestedAt && status === 'success' && (
          <Badge variant="outline" className="ml-2 text-xs">
            Última prueba: {lastTestedAt.toLocaleTimeString()}
          </Badge>
        )}
      </div>
      <Button 
        size="sm" 
        variant="outline"
        onClick={testConnection}
        disabled={testing}
      >
        {testing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Probar conexión
      </Button>
    </div>
  );

  if (showCard) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-indigo-500" />
            <CardTitle className="text-base">Estado de Supabase</CardTitle>
          </div>
          <CardDescription>Comprueba la conexión con tu base de datos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderConnectionStatus()}
          
          {status === 'success' && dbInfo && (
            <div className="pt-2 space-y-2">
              <h3 className="text-sm font-medium">Información de la base de datos</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {dbInfo.version && (
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-muted-foreground">Versión:</span>
                    <span className="font-medium">{dbInfo.version}</span>
                  </div>
                )}
                {dbInfo.size && (
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-muted-foreground">Tamaño:</span>
                    <span className="font-medium">{dbInfo.size}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {status === 'error' && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mt-3">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Problemas de conexión</h4>
                  <p className="text-xs text-amber-700 mt-1">
                    Verifica que tu proyecto de Supabase esté configurado correctamente y que las 
                    variables de entorno sean válidas.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return renderConnectionStatus();
};

export default SupabaseConnectionTest;
