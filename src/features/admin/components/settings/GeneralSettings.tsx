
import React from 'react';
import { 
  Settings, 
  Database, 
  FileText, 
  Globe, 
  Clock,
  Server,
  HardDrive,
  BookOpen,
  Languages,
  Loader2,
  Construction
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SettingsAccordion, { SettingsSection } from '@/components/admin/settings/SettingsAccordion';
import { Separator } from '@/components/ui/separator';

const GeneralSettings: React.FC = () => {
  const generalSections: SettingsSection[] = [
    {
      id: "site",
      title: "Configuración del Sitio",
      icon: <Globe className="h-5 w-5" />,
      iconColor: "text-blue-500",
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="siteTitle" className="text-left block mb-1">Título del Sitio</Label>
            <Input id="siteTitle" defaultValue="Mi Plataforma" />
            <p className="text-xs text-muted-foreground mt-1 text-left">
              Nombre principal que aparecerá en el navegador y SEO
            </p>
          </div>
          
          <Separator className="my-2" />
          
          <div>
            <Label htmlFor="siteDescription" className="text-left block mb-1">Descripción</Label>
            <Input id="siteDescription" defaultValue="Plataforma de aprendizaje online" />
            <p className="text-xs text-muted-foreground mt-1 text-left">
              Descripción corta utilizada para SEO y redes sociales
            </p>
          </div>
          
          <Separator className="my-2" />
          
          <div>
            <Label htmlFor="siteLanguage" className="text-left block mb-1">Idioma Predeterminado</Label>
            <Select defaultValue="es">
              <SelectTrigger id="siteLanguage">
                <SelectValue placeholder="Seleccionar idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="en">Inglés</SelectItem>
                <SelectItem value="fr">Francés</SelectItem>
                <SelectItem value="de">Alemán</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1 text-left">
              Idioma principal del sitio
            </p>
          </div>
        </div>
      )
    },
    {
      id: "localization",
      title: "Localización",
      icon: <Languages className="h-5 w-5" />,
      iconColor: "text-green-500",
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="timezone" className="text-left block mb-1">Zona Horaria</Label>
            <Select defaultValue="europe-madrid">
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Seleccionar zona horaria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="europe-madrid">Europa/Madrid (UTC+1)</SelectItem>
                <SelectItem value="america-new_york">América/Nueva York (UTC-5)</SelectItem>
                <SelectItem value="america-los_angeles">América/Los Ángeles (UTC-8)</SelectItem>
                <SelectItem value="asia-tokyo">Asia/Tokio (UTC+9)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1 text-left">
              Zona horaria usada para mostrar fechas y horas
            </p>
          </div>
          
          <Separator className="my-2" />
          
          <div>
            <Label htmlFor="dateFormat" className="text-left block mb-1">Formato de Fecha</Label>
            <Select defaultValue="dd-mm-yyyy">
              <SelectTrigger id="dateFormat">
                <SelectValue placeholder="Seleccionar formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1 text-left">
              Formato para mostrar fechas en la plataforma
            </p>
          </div>
        </div>
      )
    },
    {
      id: "analytics",
      title: "Analítica",
      icon: <FileText className="h-5 w-5" />,
      iconColor: "text-purple-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <div className="text-left">
              <h3 className="text-sm font-medium">Google Analytics</h3>
              <p className="text-xs text-muted-foreground">
                Habilitar seguimiento con Google Analytics
              </p>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs border-amber-200 mt-1">
                <Construction className="h-3 w-3 mr-1" />
                En desarrollo
              </Badge>
            </div>
            <Switch id="googleAnalytics" />
          </div>
          
          <Separator className="my-2" />
          
          <div>
            <Label htmlFor="trackingId" className="text-left block mb-1">ID de Seguimiento</Label>
            <Input id="trackingId" placeholder="UA-XXXXXXXXX-X o G-XXXXXXXXXX" />
            <p className="text-xs text-muted-foreground mt-1 text-left">
              ID de Google Analytics para el seguimiento
            </p>
          </div>
        </div>
      )
    },
    {
      id: "performance",
      title: "Rendimiento",
      icon: <HardDrive className="h-5 w-5" />,
      iconColor: "text-orange-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <div className="text-left">
              <h3 className="text-sm font-medium">Compresión de imágenes</h3>
              <p className="text-xs text-muted-foreground">
                Optimiza automáticamente las imágenes subidas
              </p>
            </div>
            <Switch id="imageCompression" defaultChecked />
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex items-center justify-between py-1">
            <div className="text-left">
              <h3 className="text-sm font-medium">Caché del navegador</h3>
              <p className="text-xs text-muted-foreground">
                Habilita el almacenamiento en caché de activos estáticos
              </p>
            </div>
            <Switch id="browserCache" defaultChecked />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold flex items-center gap-2 text-primary">
          <Settings className="h-5 w-5" />
          Configuración General
        </h1>
        <p className="text-muted-foreground">
          Ajusta las configuraciones básicas de la plataforma
        </p>
      </div>

      <SettingsAccordion sections={generalSections} />
    </div>
  );
};

export default GeneralSettings;
