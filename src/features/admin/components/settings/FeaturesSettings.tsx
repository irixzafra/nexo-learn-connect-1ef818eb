
import React from 'react';
import { ToggleRight } from 'lucide-react';
import { FeatureManagement } from '@/components/admin/features/FeatureManagement';

/**
 * Componente para gestionar la configuración de características del sistema
 */
const FeaturesSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold flex items-center gap-2 text-purple-600">
          <ToggleRight className="h-5 w-5" />
          Funcionalidades
        </h1>
        <p className="text-muted-foreground">
          Activa o desactiva las funcionalidades del sistema. Las dependencias se manejan automáticamente.
        </p>
      </div>

      <FeatureManagement />
    </div>
  );
};

export default FeaturesSettings;
