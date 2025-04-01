
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Loader2, 
  Database, 
  Save, 
  Construction, 
  LayoutList, 
  Server, 
  AlertTriangle,
  Download,
  Upload,
  RefreshCw,
  HardDrive,
  KeyRound
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import type { FeaturesConfig } from '@/contexts/features/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface SettingsAccordionProps {
  title: string;
  description: string;
  sections: any[];
  className?: string;
}

const SettingsAccordion: React.FC<SettingsAccordionProps> = ({ title, description, sections, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-4">
          {sections.map((section) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="flex items-center">
                {section.icon}
                <span className="ml-2">{section.title}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                {section.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

interface DataSettingsProps {
  featuresConfig?: FeaturesConfig;
  onToggleFeature?: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

const DataSettings: React.FC<DataSettingsProps> = ({ 
  featuresConfig, 
  onToggleFeature,
  isLoading
}) => {
  const sections = [
    {
      id: 'backups',
      title: 'Respaldos automáticos',
      icon: <Database className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableAutoBackups" className="text-base">Activar respaldos automáticos</Label>
              <p className="text-sm text-muted-foreground">Los respaldos se realizarán automáticamente cada noche</p>
            </div>
            <Switch 
              id="enableAutoBackups" 
              checked={featuresConfig?.enableAutoBackups}
              onCheckedChange={(checked) => onToggleFeature?.('enableAutoBackups', checked)}
              disabled={isLoading}
            />
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Último respaldo</p>
              <p className="text-sm text-muted-foreground">Hace 6 horas</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Siguiente respaldo</p>
              <p className="text-sm text-muted-foreground">En 18 horas</p>
            </div>
          </div>
          <div className="pt-2 flex gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Download className="mr-1 h-3 w-3" />
              Descargar último respaldo
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Upload className="mr-1 h-3 w-3" />
              Subir respaldo
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 'cache',
      title: 'Caché de consultas',
      icon: <RefreshCw className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableQueryCache" className="text-base">Activar caché de consultas</Label>
              <p className="text-sm text-muted-foreground">Las consultas frecuentes se guardarán en caché para mejorar el rendimiento</p>
            </div>
            <Switch 
              id="enableQueryCache" 
              checked={featuresConfig?.enableQueryCache}
              onCheckedChange={(checked) => onToggleFeature?.('enableQueryCache', checked)}
              disabled={isLoading}
            />
          </div>
          <Separator />
          <div>
            <Button variant="outline" size="sm" className="text-xs">
              <RefreshCw className="mr-1 h-3 w-3" />
              Limpiar caché
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 'maintenance',
      title: 'Modo mantenimiento',
      icon: <HardDrive className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableMaintenanceMode" className="text-base">Activar modo mantenimiento</Label>
              <p className="text-sm text-muted-foreground">La plataforma mostrará una página de mantenimiento a los usuarios</p>
            </div>
            <Switch 
              id="enableMaintenanceMode" 
              checked={featuresConfig?.enableMaintenanceMode}
              onCheckedChange={(checked) => onToggleFeature?.('enableMaintenanceMode', checked)}
              disabled={isLoading}
            />
          </div>
        </div>
      )
    },
    {
      id: 'testData',
      title: 'Datos de prueba',
      icon: <Server className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Label htmlFor="enableTestDataGenerator" className="text-base">Generador de datos de prueba</Label>
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">En desarrollo</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Herramienta para generar datos de prueba para desarrollo y testing</p>
            </div>
            <Switch 
              id="enableTestDataGenerator" 
              checked={featuresConfig?.enableTestDataGenerator}
              onCheckedChange={(checked) => onToggleFeature?.('enableTestDataGenerator', checked)}
              disabled={isLoading}
            />
          </div>
        </div>
      )
    },
    {
      id: 'devMode',
      title: 'Modo desarrollador',
      icon: <KeyRound className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Label htmlFor="enableDatabaseDevMode" className="text-base">Activar modo desarrollador</Label>
                <Badge variant="outline" className="bg-red-500/10 text-red-600 hover:bg-red-500/20">Solo administradores</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Habilita herramientas avanzadas y logs de diagnóstico</p>
            </div>
            <Switch 
              id="enableDatabaseDevMode" 
              checked={featuresConfig?.enableDatabaseDevMode}
              onCheckedChange={(checked) => onToggleFeature?.('enableDatabaseDevMode', checked)}
              disabled={isLoading}
            />
          </div>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <SettingsAccordion 
        title="Datos"
        description="Administra la configuración de datos y respaldos"
        sections={sections}
        className="bg-card"
      />
    </div>
  );
};

export default DataSettings;
