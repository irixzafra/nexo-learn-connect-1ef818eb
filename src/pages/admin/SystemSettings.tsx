
import React, { useState, useEffect } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { AdminTabItem } from '@/components/shared/AdminNavTabs';
import { 
  Settings, 
  Shield, 
  Bell, 
  Palette, 
  Database, 
  FileText, 
  ToggleLeft,
  Server,
  Globe,
  Info,
  Users,
  Lock
} from 'lucide-react';
import { AppearanceSettings } from '@/features/admin/components/settings/AppearanceSettings';
import { SecuritySettings } from '@/features/admin/components/settings/SecuritySettings';
import { NotificationSettings } from '@/features/admin/components/settings/NotificationSettings';
import { ContentSettings } from '@/features/admin/components/settings/ContentSettings';
import { TestDataSettings } from '@/features/admin/components/settings/TestDataSettings';
import { OnboardingSettings } from '@/features/admin/components/settings/OnboardingSettings';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const SystemSettings: React.FC = () => {
  const [featuresConfig, setFeaturesConfig] = useState<FeaturesConfig>({} as FeaturesConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [tabNavigationEnabled, setTabNavigationEnabled] = useState(true);
  
  // Cargar la configuración actual desde localStorage
  useEffect(() => {
    const storedValue = localStorage.getItem('tabNavigationEnabled');
    if (storedValue !== null) {
      setTabNavigationEnabled(storedValue === 'true');
    }
  }, []);
  
  const handleToggleFeature = (feature: keyof FeaturesConfig, value: boolean) => {
    setFeaturesConfig(prev => ({
      ...prev,
      [feature]: value
    }));
  };

  const handleToggleTabNavigation = (checked: boolean) => {
    setTabNavigationEnabled(checked);
    
    // Guardar en localStorage
    localStorage.setItem('tabNavigationEnabled', String(checked));
    
    // Mostrar un toast para indicar que se ha cambiado la configuración
    toast.success(`Navegación por pestañas ${checked ? 'activada' : 'desactivada'}`);
    
    // Aquí en un entorno real también sincronizaríamos con la base de datos
  };

  // Crear las tabs para el AdminPageLayout
  const tabs: AdminTabItem[] = [
    {
      value: 'general',
      label: 'General',
      icon: <Settings className="h-4 w-4" />,
      dataTag: "settings-tab-general",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Configuración General</CardTitle>
            <CardDescription>
              Configuración principal del sistema, incluida la información del sitio y preferencias globales.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <Label htmlFor="tabNavigation">Navegación por pestañas</Label>
                <p className="text-sm text-muted-foreground">
                  Activa o desactiva la navegación por pestañas en las diferentes secciones de administración
                </p>
              </div>
              <Switch
                id="tabNavigation"
                checked={tabNavigationEnabled}
                onCheckedChange={handleToggleTabNavigation}
                aria-label="Toggle tab navigation"
                data-tag="tab-navigation-toggle"
              />
            </div>
            
            <div className="h-52 flex items-center justify-center bg-muted/40 rounded-md">
              <div className="text-center">
                <Server className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p>Otras configuraciones generales en desarrollo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      value: 'appearance',
      label: 'Apariencia',
      icon: <Palette className="h-4 w-4" />,
      content: (
        <AppearanceSettings 
          featuresConfig={featuresConfig}
          onToggleFeature={handleToggleFeature}
          isLoading={isSaving}
        />
      )
    },
    {
      value: 'security',
      label: 'Seguridad',
      icon: <Shield className="h-4 w-4" />,
      content: (
        <SecuritySettings 
          featuresConfig={featuresConfig}
          onToggleFeature={handleToggleFeature}
          isLoading={isSaving}
        />
      )
    },
    {
      value: 'notifications',
      label: 'Notificaciones',
      icon: <Bell className="h-4 w-4" />,
      content: (
        <NotificationSettings 
          featuresConfig={featuresConfig}
          onToggleFeature={handleToggleFeature}
          isLoading={isSaving}
        />
      )
    },
    {
      value: 'content',
      label: 'Contenido',
      icon: <FileText className="h-4 w-4" />,
      content: (
        <ContentSettings 
          featuresConfig={featuresConfig}
          onToggleFeature={handleToggleFeature}
          isLoading={isSaving}
        />
      )
    },
    {
      value: 'test-data',
      label: 'Datos de Prueba',
      icon: <Database className="h-4 w-4" />,
      content: (
        <TestDataSettings 
          featuresConfig={featuresConfig}
          onToggleFeature={handleToggleFeature}
          isLoading={isSaving}
        />
      )
    },
    {
      value: 'onboarding',
      label: 'Onboarding',
      icon: <ToggleLeft className="h-4 w-4" />,
      content: (
        <OnboardingSettings 
          featuresConfig={featuresConfig}
          onToggleFeature={handleToggleFeature}
          isLoading={isSaving}
        />
      )
    },
    {
      value: 'access',
      label: 'Acceso',
      icon: <Lock className="h-4 w-4" />,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Control de Acceso</CardTitle>
            <CardDescription>
              Configuración de políticas de acceso y permisos del sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-64 flex items-center justify-center bg-muted/40 rounded-md">
              <div className="text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p>Control de acceso en desarrollo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      value: 'localization',
      label: 'Localización',
      icon: <Globe className="h-4 w-4" />,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Localización</CardTitle>
            <CardDescription>
              Administra idiomas, formatos regionales y traducciones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-64 flex items-center justify-center bg-muted/40 rounded-md">
              <div className="text-center">
                <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p>Configuración de localización en desarrollo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      value: 'about',
      label: 'Acerca de',
      icon: <Info className="h-4 w-4" />,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Acerca del Sistema</CardTitle>
            <CardDescription>
              Información sobre la versión actual y licencias
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Información del Sistema</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Versión</span>
                    <span className="font-medium">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Entorno</span>
                    <span className="font-medium">Producción</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Última actualización</span>
                    <span className="font-medium">20 Oct 2023</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Equipo de Desarrollo</h3>
                <p className="text-muted-foreground mb-2">
                  Desarrollado con ❤️ por el equipo de Nexo
                </p>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Soporte</span>
                  <span className="font-medium">soporte@nexo.com</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }
  ];
  
  return (
    <AdminPageLayout
      title="Configuración del Sistema"
      subtitle="Administra las configuraciones y preferencias del sistema"
      tabs={tabs}
      defaultTabValue="general"
    />
  );
};

export default SystemSettings;
