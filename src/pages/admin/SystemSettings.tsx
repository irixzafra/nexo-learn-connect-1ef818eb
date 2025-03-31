
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
  ToggleRight,
  Server,
  Globe,
  Info,
  Users,
  Lock,
  BookMarked,
  Plug,
  MousePointer,
  FileUp,
  ShieldCheck,
  DatabaseZap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
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
  };

  const goToPageManagement = () => {
    navigate('/admin/settings/pages');
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
    },
    {
      value: 'pages',
      label: 'Páginas',
      icon: <FileText className="h-4 w-4" />,
      dataTag: "settings-tab-pages",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Páginas</CardTitle>
            <CardDescription>
              Administra las páginas públicas del sitio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Crea, edita y organiza todas las páginas del sitio. Puedes gestionar cualquier página incluyendo
              la página de inicio, páginas legales y páginas personalizadas.
            </p>
            
            <div className="flex justify-end">
              <Button onClick={goToPageManagement}>
                <FileUp className="mr-2 h-4 w-4" />
                Administrar Páginas
              </Button>
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
