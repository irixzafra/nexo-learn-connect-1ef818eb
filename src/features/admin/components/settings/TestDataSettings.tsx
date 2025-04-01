
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { DatabaseZap, RotateCcw, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FeaturesConfig } from '@/contexts/features/types';

interface TestDataSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

export const TestDataSettings: React.FC<TestDataSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading = false
}) => {
  const handleGenerateTestData = () => {
    toast.info('Generando datos de prueba...', {
      description: 'Este proceso puede tardar unos momentos.'
    });
    
    // Simulación del proceso
    setTimeout(() => {
      toast.success('Datos de prueba generados', {
        description: 'Se han creado 50 usuarios, 20 cursos y 100 inscripciones de prueba.'
      });
    }, 2000);
  };

  const handlePurgeTestData = () => {
    toast.info('Eliminando datos de prueba...', {
      description: 'Este proceso puede tardar unos momentos.'
    });
    
    // Simulación del proceso
    setTimeout(() => {
      toast.success('Datos de prueba eliminados', {
        description: 'Se han eliminado todos los datos de prueba del sistema.'
      });
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DatabaseZap className="h-5 w-5 text-amber-500" />
          Datos de Prueba
        </CardTitle>
        <CardDescription>
          Genera y gestiona datos de prueba para el desarrollo y las demostraciones
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableTestDataGenerator">Habilitar generador de datos de prueba</Label>
            <p className="text-sm text-muted-foreground">
              Permite generar datos ficticios para pruebas y desarrollo
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableTestDataGenerator"
              checked={!!featuresConfig.enableTestDataGenerator}
              onCheckedChange={(value) => onToggleFeature('enableTestDataGenerator', value)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 h-auto py-3"
            onClick={handleGenerateTestData}
            disabled={!featuresConfig.enableTestDataGenerator || isLoading}
          >
            <DatabaseZap className="h-4 w-4" />
            <span>Generar datos de prueba</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center gap-2 h-auto py-3 border-red-200 text-red-600 hover:bg-red-50"
            onClick={handlePurgeTestData}
            disabled={!featuresConfig.enableTestDataGenerator || isLoading}
          >
            <RotateCcw className="h-4 w-4" />
            <span>Eliminar datos de prueba</span>
          </Button>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mt-4">
          <div className="flex gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800 mb-1">Precaución</h4>
              <p className="text-sm text-amber-700">
                Los datos de prueba son solo para fines de desarrollo y demostración.
                No uses esta funcionalidad en un entorno de producción con datos reales.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestDataSettings;
