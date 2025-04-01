
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useFeatureDependencies } from '@/hooks/useFeatureDependencies';
import { getDependencyDescription } from '@/contexts/features/dependencies';
import { Info } from 'lucide-react';
import { FeaturesConfig } from '@/contexts/features/types';

interface PlatformFeaturesAccordionProps {
  features: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

/**
 * Componente para mostrar todas las características de la plataforma en un acordeón
 */
const PlatformFeaturesAccordion: React.FC<PlatformFeaturesAccordionProps> = ({ 
  features, 
  onToggleFeature, 
  isLoading = false 
}) => {
  const { getDependentFeatures, checkIfCanDisable } = useFeatureDependencies();

  return (
    <ScrollArea className="h-[600px]">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-3 text-lg font-medium hover:no-underline">
            Características de la Plataforma
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <div className="space-y-4">
              {Object.entries(features).map(([key, value]) => {
                // Convertir key de string a keyof FeaturesConfig
                const featureKey = key as keyof FeaturesConfig;
                const dependentFeatures = getDependentFeatures(featureKey);
                const hasDependents = dependentFeatures.length > 0;
                const canDisable = checkIfCanDisable(featureKey);

                return (
                  <div key={key} className="flex flex-col space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">
                          {key}
                          {hasDependents && !canDisable && (
                            <span className="ml-2 text-xs text-yellow-600">
                              (Requerido por otras características)
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {getDependencyDescription(featureKey) || 'Descripción no disponible'}
                        </div>
                        {hasDependents && (
                          <div className="mt-1 text-xs text-blue-600 flex items-center">
                            <Info className="h-3 w-3 mr-1" />
                            <span>
                              Necesario para: {dependentFeatures.join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center h-5">
                        <input
                          id={`feature-${key}`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                          checked={!!value}
                          onChange={() => onToggleFeature(featureKey, !value)}
                          disabled={isLoading || (hasDependents && !canDisable)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ScrollArea>
  );
};

export default PlatformFeaturesAccordion;
export { PlatformFeaturesAccordion };
