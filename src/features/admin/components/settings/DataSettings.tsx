
import React from 'react';
import { 
  DatabaseZap, 
  Database, 
  HardDrive, 
  Trash2, 
  RefreshCw
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import SettingsAccordion, { SettingsSection } from '@/components/admin/settings/SettingsAccordion';
import { toast } from 'sonner';

interface DataSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

const DataSettings: React.FC<DataSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading = false
}) => {
  const handleBackupNow = () => {
    toast.loading("Creando copia de seguridad...");
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Copia de seguridad creada correctamente");
    }, 2000);
  };
  
  const handleClearCache = () => {
    toast.loading("Limpiando caché...");
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Caché limpiada correctamente");
    }, 1500);
  };

  const dataSections: SettingsSection[] = [
    {
      id: "database",
      title: "Base de Datos",
      icon: <Database className="h-5 w-5" />,
      iconColor: "text-blue-500",
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="db_connection">Conexión a la base de datos</Label>
            <Input id="db_connection" defaultValue="postgresql://localhost:5432/nexo" />
            <p className="text-xs text-muted-foreground mt-1">
              URL de conexión a la base de datos
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Modo de desarrollo</h3>
              <p className="text-xs text-muted-foreground">
                Habilita el modo de desarrollo para la base de datos
              </p>
            </div>
            <Switch
              id="enableDevMode"
              checked={featuresConfig.enableDatabaseDevMode}
              onCheckedChange={(value) => onToggleFeature('enableDatabaseDevMode', value)}
              disabled={isLoading}
            />
          </div>
        </div>
      )
    },
    {
      id: "backup",
      title: "Copias de Seguridad",
      icon: <HardDrive className="h-5 w-5" />,
      iconColor: "text-green-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Copias de seguridad automáticas</h3>
              <p className="text-xs text-muted-foreground">
                Realiza copias de seguridad automáticas periódicamente
              </p>
            </div>
            <Switch
              id="enableAutoBackups"
              checked={featuresConfig.enableAutoBackups}
              onCheckedChange={(value) => onToggleFeature('enableAutoBackups', value)}
              disabled={isLoading}
            />
          </div>
          
          <div>
            <Label htmlFor="backup_frequency">Frecuencia de copia de seguridad</Label>
            <Select defaultValue="daily">
              <SelectTrigger id="backup_frequency">
                <SelectValue placeholder="Seleccionar frecuencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Cada hora</SelectItem>
                <SelectItem value="daily">Diaria</SelectItem>
                <SelectItem value="weekly">Semanal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="backup_retention">Retención de copias de seguridad</Label>
            <Select defaultValue="30">
              <SelectTrigger id="backup_retention">
                <SelectValue placeholder="Seleccionar periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 días</SelectItem>
                <SelectItem value="30">30 días</SelectItem>
                <SelectItem value="90">90 días</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={handleBackupNow} variant="outline" size="sm">
            <HardDrive className="h-4 w-4 mr-2" />
            Crear copia de seguridad ahora
          </Button>
        </div>
      )
    },
    {
      id: "cache",
      title: "Caché",
      icon: <RefreshCw className="h-5 w-5" />,
      iconColor: "text-orange-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Caché de consultas</h3>
              <p className="text-xs text-muted-foreground">
                Almacena en caché las consultas frecuentes
              </p>
            </div>
            <Switch
              id="enableQueryCache"
              checked={featuresConfig.enableQueryCache}
              onCheckedChange={(value) => onToggleFeature('enableQueryCache', value)}
              disabled={isLoading}
            />
          </div>
          
          <div>
            <Label htmlFor="cache_ttl">Tiempo de vida del caché</Label>
            <div className="flex items-center gap-2">
              <Input id="cache_ttl" type="number" defaultValue="60" />
              <span className="text-sm text-muted-foreground">minutos</span>
            </div>
          </div>
          
          <Button onClick={handleClearCache} variant="outline" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Limpiar caché
          </Button>
        </div>
      )
    },
    {
      id: "maintenance",
      title: "Mantenimiento",
      icon: <Trash2 className="h-5 w-5" />,
      iconColor: "text-red-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Modo de mantenimiento</h3>
              <p className="text-xs text-muted-foreground">
                Activa el modo de mantenimiento para la plataforma
              </p>
            </div>
            <Switch
              id="enableMaintenanceMode"
              checked={featuresConfig.enableMaintenanceMode}
              onCheckedChange={(value) => onToggleFeature('enableMaintenanceMode', value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-md">
            <h3 className="text-sm font-medium text-yellow-800">Operaciones destructivas</h3>
            <p className="text-xs text-yellow-700 mt-1 mb-3">
              Estas operaciones pueden causar pérdida de datos. Procede con precaución.
            </p>
            
            <div className="flex flex-col gap-2">
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Vaciar base de datos
              </Button>
              
              <Button variant="destructive" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reiniciar a valores de fábrica
              </Button>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold flex items-center gap-2 text-blue-600">
          <DatabaseZap className="h-5 w-5" />
          Datos
        </h1>
        <p className="text-muted-foreground">
          Administra la configuración de datos y respaldos
        </p>
      </div>

      <SettingsAccordion sections={dataSections} />
    </div>
  );
};

export default DataSettings;
