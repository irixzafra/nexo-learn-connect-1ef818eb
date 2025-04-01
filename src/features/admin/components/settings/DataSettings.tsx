
import React from 'react';
import { 
  DatabaseZap, 
  Database, 
  Server, 
  Archive, 
  Clock,
  BarChart3,
  Loader2,
  Construction
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import SettingsAccordion, { SettingsSection } from '@/components/admin/settings/SettingsAccordion';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

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
  const dataSections: SettingsSection[] = [
    {
      id: "database",
      title: "Base de Datos",
      icon: <Database className="h-5 w-5" />,
      iconColor: "text-blue-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <div className="text-left">
              <h3 className="text-sm font-medium">Modo desarrollador de base de datos</h3>
              <p className="text-xs text-muted-foreground">
                Habilita herramientas de diagnóstico para la base de datos
              </p>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs border-amber-200 mt-1">
                Solo para desarrollo
              </Badge>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableDatabaseDevMode"
                checked={featuresConfig.enableDatabaseDevMode}
                onCheckedChange={(value) => onToggleFeature('enableDatabaseDevMode', value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <Separator className="my-2" />
          
          <div>
            <Label htmlFor="dbConnectionMode" className="text-left block mb-1">Modo de conexión</Label>
            <Select defaultValue="pool">
              <SelectTrigger id="dbConnectionMode">
                <SelectValue placeholder="Seleccionar modo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Simple</SelectItem>
                <SelectItem value="pool">Pool de conexiones</SelectItem>
                <SelectItem value="advanced">Avanzado</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1 text-left">
              Define el método de conexión a la base de datos
            </p>
          </div>
        </div>
      )
    },
    {
      id: "backups",
      title: "Copias de Seguridad",
      icon: <Archive className="h-5 w-5" />,
      iconColor: "text-green-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <div className="text-left">
              <h3 className="text-sm font-medium">Copias de seguridad automáticas</h3>
              <p className="text-xs text-muted-foreground">
                Programa copias de seguridad automáticas de la base de datos
              </p>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableAutoBackups"
                checked={featuresConfig.enableAutoBackups}
                onCheckedChange={(value) => onToggleFeature('enableAutoBackups', value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <Separator className="my-2" />
          
          <div>
            <Label htmlFor="backupFrequency" className="text-left block mb-1">Frecuencia de copias</Label>
            <Select defaultValue="daily">
              <SelectTrigger id="backupFrequency">
                <SelectValue placeholder="Seleccionar frecuencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Cada hora</SelectItem>
                <SelectItem value="daily">Diaria</SelectItem>
                <SelectItem value="weekly">Semanal</SelectItem>
                <SelectItem value="monthly">Mensual</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1 text-left">
              Frecuencia con la que se realizan las copias de seguridad
            </p>
          </div>
          
          <Separator className="my-2" />
          
          <div>
            <Label htmlFor="backupRetention" className="text-left block mb-1">Retención de copias</Label>
            <Select defaultValue="30">
              <SelectTrigger id="backupRetention">
                <SelectValue placeholder="Seleccionar periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 días</SelectItem>
                <SelectItem value="30">30 días</SelectItem>
                <SelectItem value="90">90 días</SelectItem>
                <SelectItem value="365">1 año</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1 text-left">
              Tiempo que se mantienen las copias de seguridad
            </p>
          </div>
        </div>
      )
    },
    {
      id: "cache",
      title: "Caché",
      icon: <BarChart3 className="h-5 w-5" />,
      iconColor: "text-purple-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <div className="text-left">
              <h3 className="text-sm font-medium">Caché de consultas</h3>
              <p className="text-xs text-muted-foreground">
                Activa el almacenamiento en caché de consultas frecuentes
              </p>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableQueryCache"
                checked={featuresConfig.enableQueryCache}
                onCheckedChange={(value) => onToggleFeature('enableQueryCache', value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <Separator className="my-2" />
          
          <div>
            <Label htmlFor="cacheTTL" className="text-left block mb-1">Tiempo de vida del caché</Label>
            <Select defaultValue="300">
              <SelectTrigger id="cacheTTL">
                <SelectValue placeholder="Seleccionar tiempo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="60">1 minuto</SelectItem>
                <SelectItem value="300">5 minutos</SelectItem>
                <SelectItem value="600">10 minutos</SelectItem>
                <SelectItem value="3600">1 hora</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1 text-left">
              Tiempo que permanecen las consultas en caché
            </p>
          </div>
        </div>
      )
    },
    {
      id: "server",
      title: "Servidor",
      icon: <Server className="h-5 w-5" />,
      iconColor: "text-red-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <div className="text-left">
              <h3 className="text-sm font-medium">Modo mantenimiento</h3>
              <p className="text-xs text-muted-foreground">
                Activa el modo mantenimiento para realizar actualizaciones
              </p>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs border-amber-200 mt-1">
                <Construction className="h-3 w-3 mr-1" />
                En desarrollo
              </Badge>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableMaintenanceMode"
                checked={featuresConfig.enableMaintenanceMode}
                onCheckedChange={(value) => onToggleFeature('enableMaintenanceMode', value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <Separator className="my-2" />
          
          <div>
            <Label htmlFor="serverRegion" className="text-left block mb-1">Región del servidor</Label>
            <Select defaultValue="eu-west">
              <SelectTrigger id="serverRegion">
                <SelectValue placeholder="Seleccionar región" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us-east">US Este</SelectItem>
                <SelectItem value="us-west">US Oeste</SelectItem>
                <SelectItem value="eu-west">Europa Oeste</SelectItem>
                <SelectItem value="eu-central">Europa Central</SelectItem>
                <SelectItem value="asia">Asia Pacífico</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1 text-left">
              Localización geográfica del servidor principal
            </p>
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
          Configura las opciones relacionadas con la base de datos y almacenamiento
        </p>
      </div>

      <SettingsAccordion sections={dataSections} />
    </div>
  );
};

export default DataSettings;
