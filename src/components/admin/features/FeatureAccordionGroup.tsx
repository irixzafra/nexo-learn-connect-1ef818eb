
import React from 'react';
import { useFeatures } from '@/hooks/useFeatures';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import type { FeaturesConfig } from '@/contexts/features/types';

export interface FeatureAccordionGroupProps {
  title: string;
  features: {
    id: keyof FeaturesConfig;
    name: string;
    description: string;
    isExperimental?: boolean;
  }[];
}

export const FeatureAccordionGroup: React.FC<FeatureAccordionGroupProps> = ({
  title,
  features,
}) => {
  const { featuresConfig, toggleFeature, isLoading } = useFeatures();

  const handleToggle = async (featureId: keyof FeaturesConfig, newValue: boolean) => {
    await toggleFeature(featureId, newValue);
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={title}>
        <AccordionTrigger className="text-lg font-medium">{title}</AccordionTrigger>
        <AccordionContent className="pt-3">
          <div className="space-y-5">
            {features.map((feature) => (
              <div
                key={String(feature.id)}
                className="flex items-start justify-between border-b pb-3 last:border-0"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{feature.name}</h4>
                    {feature.isExperimental && (
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                        Experimental
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground pr-8">{feature.description}</p>
                </div>
                <div className="flex items-center pt-1">
                  {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  <Switch
                    id={String(feature.id)}
                    checked={!!featuresConfig[feature.id]}
                    onCheckedChange={(checked) => handleToggle(feature.id, checked)}
                    disabled={isLoading}
                  />
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FeatureAccordionGroup;
