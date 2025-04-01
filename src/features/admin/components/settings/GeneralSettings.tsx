
import React from 'react';
import { 
  Settings, 
  Globe, 
  Upload, 
  Navigation, 
  Compass, 
  Clock, 
  Mail, 
  Monitor, 
  Palette, 
  Info 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import SettingsAccordion, { SettingsSection } from '@/components/admin/settings/SettingsAccordion';

const GeneralSettings: React.FC = () => {
  // Handler for form submission
  const handleSave = () => {
    toast.success("Configuración guardada correctamente");
  };

  // Define the accordion sections
  const settingsSections: SettingsSection[] = [
    {
      id: "identidad",
      title: "Identidad del Sitio",
      icon: <Settings className="h-5 w-5" />,
      iconColor: "text-blue-500",
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="site_name">Nombre del Sitio</Label>
            <Input id="site_name" defaultValue="Nexo" />
            <p className="text-sm text-muted-foreground mt-1">
              Nombre principal de la plataforma
            </p>
          </div>
          
          <div>
            <Label htmlFor="site_description">Descripción / Lema</Label>
            <Input id="site_description" defaultValue="Plataforma de aprendizaje online" />
            <p className="text-sm text-muted-foreground mt-1">
              Breve descripción de la plataforma (aparecerá en SEO y cabeceras)
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="logo_light">Logo (Modo Claro)</Label>
              <div className="flex gap-2">
                <Input id="logo_light" />
                <Button type="button" size="icon" variant="outline">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="logo_dark">Logo (Modo Oscuro)</Label>
              <div className="flex gap-2">
                <Input id="logo_dark" />
                <Button type="button" size="icon" variant="outline">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="favicon">Favicon</Label>
            <div className="flex gap-2">
              <Input id="favicon" />
              <Button type="button" size="icon" variant="outline">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "navegacion",
      title: "Navegación y Acceso",
      icon: <Navigation className="h-5 w-5" />,
      iconColor: "text-orange-500",
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="default_landing">Página de inicio</Label>
            <Input id="default_landing" defaultValue="/landing" />
            <p className="text-sm text-muted-foreground mt-1">
              Ruta de la página principal de la plataforma
            </p>
          </div>
          
          <div>
            <Label htmlFor="login_url">URL de inicio de sesión</Label>
            <Input id="login_url" defaultValue="/login" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="auth_provider">Proveedor de autenticación</Label>
              <Select defaultValue="local">
                <SelectTrigger id="auth_provider">
                  <SelectValue placeholder="Seleccionar proveedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="microsoft">Microsoft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="auth_method">Método de autenticación</Label>
              <Select defaultValue="email">
                <SelectTrigger id="auth_method">
                  <SelectValue placeholder="Seleccionar método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email y contraseña</SelectItem>
                  <SelectItem value="passwordless">Sin contraseña</SelectItem>
                  <SelectItem value="sso">SSO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "regional",
      title: "Configuración Regional y de Contacto",
      icon: <Globe className="h-5 w-5" />,
      iconColor: "text-green-500",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="default_language">Idioma predeterminado</Label>
              <Select defaultValue="es">
                <SelectTrigger id="default_language">
                  <SelectValue placeholder="Seleccionar idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">Inglés</SelectItem>
                  <SelectItem value="fr">Francés</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="default_timezone">Zona horaria</Label>
              <Select defaultValue="Europe/Madrid">
                <SelectTrigger id="default_timezone">
                  <SelectValue placeholder="Seleccionar zona horaria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Madrid">Europe/Madrid</SelectItem>
                  <SelectItem value="America/New_York">America/New York</SelectItem>
                  <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="support_email">Email de soporte</Label>
            <Input id="support_email" defaultValue="soporte@nexo.com" type="email" />
          </div>
          
          <div>
            <Label htmlFor="contact_phone">Teléfono de contacto</Label>
            <Input id="contact_phone" defaultValue="+34 91 123 45 67" />
          </div>
        </div>
      )
    },
    {
      id: "apariencia",
      title: "Apariencia Básica",
      icon: <Palette className="h-5 w-5" />,
      iconColor: "text-purple-500",
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="default_theme">Tema predeterminado</Label>
            <Select defaultValue="light">
              <SelectTrigger id="default_theme">
                <SelectValue placeholder="Seleccionar tema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Claro</SelectItem>
                <SelectItem value="dark">Oscuro</SelectItem>
                <SelectItem value="system">Sistema</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="primary_color">Color primario</Label>
            <Input id="primary_color" defaultValue="#6366f1" type="color" />
          </div>
          
          <div>
            <Label htmlFor="accent_color">Color de acento</Label>
            <Input id="accent_color" defaultValue="#8b5cf6" type="color" />
          </div>
        </div>
      )
    },
    {
      id: "about",
      title: "Acerca del Sistema",
      icon: <Info className="h-5 w-5" />,
      iconColor: "text-blue-500",
      content: (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Versión</p>
            <p className="font-medium">1.0.0</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Fecha de liberación</p>
            <p className="font-medium">22/06/2023</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Licencia</p>
            <p className="font-medium">Profesional</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold flex items-center gap-2 text-blue-600">
          <Settings className="h-5 w-5" />
          Configuración General
        </h1>
        <p className="text-muted-foreground">
          Administra la configuración general de la plataforma
        </p>
      </div>

      <SettingsAccordion sections={settingsSections} />
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          Guardar cambios
        </Button>
      </div>
    </div>
  );
};

export default GeneralSettings;
