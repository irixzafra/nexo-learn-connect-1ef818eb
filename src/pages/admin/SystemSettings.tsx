
import React, { useState, useEffect } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { AdminTabItem } from '@/components/shared/AdminNavTabs';
import { 
  Settings, 
  Shield, 
  Bell, 
  Palette, 
  Database, 
  ToggleRight,
  Server,
  Plug,
  ShieldCheck,
  DatabaseZap,
  Globe,
  Layout
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import GeneralSettings from '@/features/admin/components/settings/GeneralSettings';
import FeaturesSettings from '@/features/admin/components/settings/FeaturesSettings';
import ConnectionsSettings from '@/features/admin/components/settings/ConnectionsSettings';
import SecuritySettings from '@/features/admin/components/settings/SecuritySettings';
import DataSettings from '@/features/admin/components/settings/DataSettings';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { useDesignSystem } from '@/contexts/DesignSystemContext';
import { AdminSubMenuItem } from '@/components/admin/AdminSubMenu';

const SystemSettings: React.FC = () => {
  const [featuresConfig, setFeaturesConfig] = useState<FeaturesConfig>({} as FeaturesConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [tabNavigationEnabled, setTabNavigationEnabled] = useState(true);
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();
  const { designFeatureEnabled, toggleDesignFeature } = useDesignSystem();
  
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
    
    // Show toast for feedback
    toast.success(`Configuración actualizada: ${feature} ${value ? 'activado' : 'desactivado'}`);
  };

  const handleToggleDesignSystem = async () => {
    try {
      await toggleDesignFeature(!designFeatureEnabled);
      toast.success(designFeatureEnabled 
        ? 'Sistema de Diseño desactivado' 
        : 'Sistema de Diseño activado');
      
      // Recargar la página para aplicar los cambios del sistema de diseño
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error toggling design system:', error);
      toast.error('Error al cambiar el estado del Sistema de Diseño');
    }
  };

  const subMenuItems: AdminSubMenuItem[] = [
    {
      id: 'general',
      label: 'General',
      path: '/admin/settings/general',
      icon: Settings
    },
    {
      id: 'appearance',
      label: 'Apariencia',
      path: '/admin/settings/appearance',
      icon: Palette,
      requiresFeature: 'designSystem'
    },
    {
      id: 'localization',
      label: 'Localización',
      path: '/admin/settings/localization',
      icon: Globe
    },
    {
      id: 'layout',
      label: 'Interfaz',
      path: '/admin/settings/layout',
      icon: Layout
    }
  ];

  const tabs: AdminTabItem[] = [
    {
      value: 'general',
      label: 'General',
      icon: <Settings className="h-4 w-4" />,
      dataTag: "settings-tab-general",
      content: (
        <div className="space-y-6">
          <GeneralSettings />
          
          {/* Design System Switch */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">Sistema de Diseño</h3>
                  <p className="text-sm text-muted-foreground">
                    Activa o desactiva el sistema de diseño personalizado
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="design-system-toggle">
                    {designFeatureEnabled ? 'Activado' : 'Desactivado'}
                  </Label>
                  <Switch
                    id="design-system-toggle"
                    checked={designFeatureEnabled}
                    onCheckedChange={handleToggleDesignSystem}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      value: 'features',
      label: 'Funcionalidades',
      icon: <ToggleRight className="h-4 w-4" />,
      dataTag: "settings-tab-features",
      content: <FeaturesSettings 
        featuresConfig={featuresConfig}
        onToggleFeature={handleToggleFeature}
        isLoading={isSaving}
      />
    },
    {
      value: 'connections',
      label: 'Conexiones',
      icon: <Plug className="h-4 w-4" />,
      dataTag: "settings-tab-connections",
      content: <ConnectionsSettings />
    },
    {
      value: 'security',
      label: 'Seguridad',
      icon: <ShieldCheck className="h-4 w-4" />,
      dataTag: "settings-tab-security",
      content: <SecuritySettings 
        featuresConfig={featuresConfig}
        onToggleFeature={handleToggleFeature}
        isLoading={isSaving}
      />
    },
    {
      value: 'data',
      label: 'Datos',
      icon: <DatabaseZap className="h-4 w-4" />,
      dataTag: "settings-tab-data",
      content: <DataSettings 
        featuresConfig={featuresConfig}
        onToggleFeature={handleToggleFeature}
        isLoading={isSaving}
      />
    }
  ];
  
  return (
    <AdminPageLayout
      title="Configuración del Sistema"
      subtitle="Administra las configuraciones y preferencias del sistema"
      tabs={tabs}
      defaultTabValue={tab || "general"}
      subMenuItems={subMenuItems}
      baseRoute="/admin/settings"
    />
  );
};

export default SystemSettings;
