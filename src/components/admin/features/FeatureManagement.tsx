
import React, { useState } from 'react';
import { useFeatures } from '@/contexts/features/FeaturesContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { FeatureAccordionGroup } from './FeatureAccordionGroup';
import { toast } from 'sonner';

export const FeatureManagement: React.FC = () => {
  const { features, isLoading, updateFeatures, reloadFeatures } = useFeatures();
  const [isReloading, setIsReloading] = useState(false);

  const handleReload = async () => {
    setIsReloading(true);
    try {
      await reloadFeatures();
      toast.success('Configuración de características recargada');
    } catch (err) {
      toast.error('Error al recargar la configuración');
      console.error(err);
    } finally {
      setIsReloading(false);
    }
  };

  if (isLoading) {
    return <div className="py-6">Cargando configuración de características...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Características</h2>
        <Button 
          variant="outline" 
          onClick={handleReload}
          disabled={isReloading}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isReloading ? 'animate-spin' : ''}`} />
          Recargar
        </Button>
      </div>
      
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Precaución</AlertTitle>
        <AlertDescription>
          Modificar estas configuraciones puede afectar la funcionalidad de la plataforma.
          Algunos cambios pueden requerir reiniciar la aplicación.
        </AlertDescription>
      </Alert>
      
      <FeatureAccordionGroup />
    </div>
  );
};
