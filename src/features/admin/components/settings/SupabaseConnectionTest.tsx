
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface SupabaseConnectionTestProps {
  onTestComplete?: (success: boolean) => void;
}

const SupabaseConnectionTest: React.FC<SupabaseConnectionTestProps> = ({ onTestComplete }) => {
  const [testing, setTesting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const testConnection = async () => {
    try {
      setTesting(true);
      setStatus('idle');
      
      // Simple test query to check if Supabase is connected
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Supabase connection error:", error);
        setStatus('error');
        toast.error("Error de conexión con Supabase");
        onTestComplete?.(false);
        return;
      }
      
      setStatus('success');
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

  return (
    <div className="bg-muted p-4 rounded-md flex items-center justify-between">
      <div className="flex items-center gap-2">
        {status === 'success' && (
          <CheckCircle className="h-4 w-4 text-green-500" />
        )}
        {status === 'error' && (
          <AlertCircle className="h-4 w-4 text-red-500" />
        )}
        {status === 'idle' && (
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
        )}
        <span>
          {status === 'success' && "Conexión verificada"}
          {status === 'error' && "Error de conexión"}
          {status === 'idle' && "Conectado a Supabase"}
        </span>
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
};

export default SupabaseConnectionTest;
