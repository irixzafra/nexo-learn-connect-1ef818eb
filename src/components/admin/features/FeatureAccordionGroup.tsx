
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { FeaturesConfig } from '@/contexts/features/types';
import { LucideIcon } from 'lucide-react';

interface FeatureItem {
  key: keyof FeaturesConfig;
  label: string;
  description: string;
}

interface FeatureGroupProps {
  id: string;
  title: string;
  icon: LucideIcon;
  features: FeatureItem[];
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading: boolean;
}

/**
 * Grupo de características en formato acordeón
 */
export const FeatureAccordionGroup: React.FC<FeatureGroupProps> = ({
  id,
  title,
  icon: Icon,
  features,
  featuresConfig,
  onToggleFeature,
  isLoading
}) => {
  return (
    <AccordionItem value={id} className="border rounded-lg my-2">
      <AccordionTrigger className="px-4 py-2 hover:no-underline">
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5 text-primary" />
          <span>{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <ScrollArea className={features.length > 6 ? "h-[400px]" : undefined}>
          <div className="space-y-4 pr-4">
            {features.map((feature, index) => (
              <React.Fragment key={feature.key}>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={`${id}-${feature.key}`}>{feature.label}</Label>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                  <Switch
                    id={`${id}-${feature.key}`}
                    checked={featuresConfig[feature.key] || false}
                    onCheckedChange={(checked) => onToggleFeature(feature.key, checked)}
                    disabled={isLoading}
                  />
                </div>
                {index < features.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </AccordionContent>
    </AccordionItem>
  );
};
