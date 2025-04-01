
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FeaturesConfig, defaultFeaturesConfig } from '@/contexts/features/types';
import { Button } from '@/components/ui/button';
import { Undo2, Save } from 'lucide-react';
import { toast } from 'sonner';
import FeatureAccordionGroup from './FeatureAccordionGroup';
import { useFeatures } from '@/contexts/features/FeaturesContext';

const FeatureManagement: React.FC = () => {
  const { features, updateFeatures, isLoading: contextLoading } = useFeatures();
  const [localFeatures, setLocalFeatures] = useState<FeaturesConfig>({...features});
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleFeature = (key: keyof FeaturesConfig, value: boolean) => {
    setLocalFeatures(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReset = () => {
    setLocalFeatures({...features});
    toast.info('Cambios descartados', {
      description: 'Los cambios han sido restaurados al estado actual.'
    });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await updateFeatures(localFeatures);
      toast.success('Configuración guardada', {
        description: 'Los cambios han sido aplicados correctamente.'
      });
    } catch (error) {
      toast.error('Error al guardar', {
        description: 'No se pudieron guardar los cambios. Inténtalo de nuevo.'
      });
      console.error('Error saving features:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestoreDefaults = () => {
    setLocalFeatures({...defaultFeaturesConfig});
    toast.info('Valores predeterminados', {
      description: 'Se han restaurado los valores predeterminados. Guarda para aplicar los cambios.'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Funcionalidades</CardTitle>
        <CardDescription>
          Activa o desactiva funcionalidades específicas de la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <FeatureAccordionGroup 
            features={localFeatures} 
            onToggleFeature={handleToggleFeature} 
          />
          
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handleRestoreDefaults}
              disabled={isLoading || contextLoading}
            >
              Restaurar predeterminados
            </Button>
            
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={isLoading || contextLoading}
              >
                <Undo2 className="mr-2 h-4 w-4" />
                Descartar
              </Button>
              
              <Button
                onClick={handleSave}
                disabled={isLoading || contextLoading}
              >
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureManagement;
