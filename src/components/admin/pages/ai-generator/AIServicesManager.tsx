
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Brain } from 'lucide-react';
import AIServiceSelector, { AIService } from './AIServiceSelector';
import AIServiceConfig from './AIServiceConfig';

interface AIServicesManagerProps {
  onConfigured?: (service: AIService) => void;
}

const AIServicesManager: React.FC<AIServicesManagerProps> = ({ onConfigured }) => {
  const [selectedService, setSelectedService] = useState<AIService>('openai');
  const [configuredServices, setConfiguredServices] = useState<Record<AIService, boolean>>({
    openai: false,
    anthropic: false,
    gemini: false,
    perplexity: false,
    hf: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleServiceChange = (service: AIService) => {
    setSelectedService(service);
    setError(undefined);
  };

  const handleKeySubmit = async (key: string) => {
    setIsLoading(true);
    setError(undefined);
    
    try {
      // En un entorno real, enviaríamos esto a una función de back-end para almacenar la clave
      // Simulamos una respuesta correcta después de un breve retraso
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Actualizar el estado
      setConfiguredServices({
        ...configuredServices,
        [selectedService]: true
      });
      
      // Notificar éxito
      toast.success(`Servicio ${selectedService} configurado correctamente`);
      
      // Notificar al componente padre
      if (onConfigured) {
        onConfigured(selectedService);
      }
    } catch (err) {
      setError('Error al guardar la API key. Por favor, inténtalo de nuevo.');
      toast.error('Error al configurar el servicio');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Servicios de IA para Generación de Contenido
        </CardTitle>
        <CardDescription>
          Configura los servicios de IA que deseas utilizar para la generación de contenido
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <AIServiceSelector
          selectedService={selectedService}
          onServiceChange={handleServiceChange}
          disabled={isLoading}
        />
        
        <AIServiceConfig
          service={selectedService}
          onKeySubmit={handleKeySubmit}
          isSaved={configuredServices[selectedService]}
          isLoading={isLoading}
          error={error}
        />
        
        <div className="pt-4">
          <h3 className="text-sm font-medium mb-2">Servicios configurados</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(configuredServices).map(([service, isConfigured]) => 
              isConfigured && (
                <Button 
                  key={service} 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedService(service as AIService)}
                  className={selectedService === service ? "border-primary" : ""}
                >
                  {service.charAt(0).toUpperCase() + service.slice(1)}
                </Button>
              )
            )}
            {!Object.values(configuredServices).some(Boolean) && (
              <p className="text-sm text-muted-foreground">No hay servicios configurados</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIServicesManager;
