
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Database, 
  Server,
  Shield,
  AlertCircle,
  RefreshCw, 
  Download,
  Upload,
  KeyRound
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import SupabaseConnectionTest from './SupabaseConnectionTest';

interface DatabaseSettingsProps {
  isLoading?: boolean;
}

const DatabaseSettings: React.FC<DatabaseSettingsProps> = ({ isLoading = false }) => {
  const handleBackupDatabase = () => {
    toast.info('Creando copia de seguridad...', {
      description: 'Este proceso puede tardar unos minutos.'
    });
    
    // Simulación de proceso
    setTimeout(() => {
      toast.success('Copia de seguridad completada', {
        description: 'La base de datos ha sido respaldada correctamente.'
      });
    }, 2000);
  };

  const handleOptimizeDatabase = () => {
    toast.info('Optimizando base de datos...', {
      description: 'Este proceso puede tardar unos minutos.'
    });
    
    // Simulación de proceso
    setTimeout(() => {
      toast.success('Optimización completada', {
        description: 'La base de datos ha sido optimizada correctamente.'
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Database connection status card */}
      <SupabaseConnectionTest showCard autoTest />
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Operaciones de Base de Datos
          </CardTitle>
          <CardDescription>
            Gestiona la base de datos del sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-4 justify-start"
              onClick={handleBackupDatabase}
              disabled={isLoading}
            >
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Crear copia de seguridad</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Genera una copia completa de la base de datos
                </span>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-4 justify-start"
              onClick={handleOptimizeDatabase}
              disabled={isLoading}
            >
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center gap-2 mb-1">
                  <Server className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Optimizar tablas</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Optimiza las tablas para mejorar el rendimiento
                </span>
              </div>
            </Button>
          </div>
          
          <Separator className="my-4" />
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800 mb-1">Operaciones sensibles</h4>
                <p className="text-xs text-amber-700">
                  Las operaciones de base de datos son sensibles y pueden afectar al rendimiento del sistema mientras se ejecutan.
                  Se recomienda realizarlas en horarios de baja actividad.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-primary" />
              Opciones de Desarrollo
            </CardTitle>
            <Badge variant="outline" className="font-normal">Desarrollo</Badge>
          </div>
          <CardDescription>
            Configuración para desarrolladores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 divide-y">
            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <Label htmlFor="devMode">Modo Desarrollo DB</Label>
                <p className="text-sm text-muted-foreground">
                  Habilitar herramientas de desarrollo para la base de datos
                </p>
              </div>
              <Switch id="devMode" />
            </div>
            
            <div className="flex items-center justify-between py-2 pt-4">
              <div className="space-y-0.5">
                <Label htmlFor="logQueries">Registro de consultas</Label>
                <p className="text-sm text-muted-foreground">
                  Registrar consultas SQL en la consola
                </p>
              </div>
              <Switch id="logQueries" />
            </div>
            
            <div className="flex items-center justify-between py-2 pt-4">
              <div className="space-y-0.5">
                <Label htmlFor="debugMode">Modo depuración</Label>
                <p className="text-sm text-muted-foreground">
                  Mostrar información detallada de depuración
                </p>
              </div>
              <Switch id="debugMode" />
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="gap-1">
              <RefreshCw className="h-4 w-4" />
              Limpiar caché
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Exportar esquema
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseSettings;
