
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
  DatabaseZap
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import GeneralSettings from '@/features/admin/components/settings/GeneralSettings';
import FeaturesSettings from '@/features/admin/components/settings/FeaturesSettings';
import ConnectionsSettings from '@/features/admin/components/settings/ConnectionsSettings';
import SecuritySettings from '@/features/admin/components/settings/SecuritySettings';
import DataSettings from '@/features/admin/components/settings/DataSettings';
import { FeaturesConfig } from '@/contexts/OnboardingContext';

const SystemSettings: React.FC = () => {
  const [featuresConfig, setFeaturesConfig] = useState<FeaturesConfig>({} as FeaturesConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [tabNavigationEnabled, setTabNavigationEnabled] = useState(true);
  const navigate = useNavigate();
  
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

  const tabs: AdminTabItem[] = [
    {
      value: 'general',
      label: 'General',
      icon: <Settings className="h-4 w-4" />,
      dataTag: "settings-tab-general",
      content: <GeneralSettings />
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
      defaultTabValue="general"
    />
  );
};

export default SystemSettings;
