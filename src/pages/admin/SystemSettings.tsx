
import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Settings } from 'lucide-react';
import { toast } from 'sonner';
import { SettingsTabs } from '@/features/admin/components/settings/SettingsTabs';

const SystemSettings: React.FC = () => {
  const { featuresConfig, updateFeaturesConfig } = useOnboarding();

  const handleToggleFeature = (feature: keyof typeof featuresConfig, value: boolean) => {
    updateFeaturesConfig({ [feature]: value });
    toast.success(`Configuración "${feature}" actualizada`);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Configuración del Sistema</h1>
        </div>

        <SettingsTabs 
          featuresConfig={featuresConfig}
          onToggleFeature={handleToggleFeature}
        />
      </div>
    </AppLayout>
  );
};

export default SystemSettings;
