
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LucideIcon } from 'lucide-react';

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => Promise<void>;
  disabled: boolean;
  warning?: React.ReactNode;
  dependent?: React.ReactNode;
  showDependencies?: boolean;
}

export interface FeatureAccordionGroupProps {
  title: string;
  icon: React.ReactNode;
  features: FeatureItem[];
}

const FeatureAccordionGroup: React.FC<FeatureAccordionGroupProps> = ({ 
  title, 
  icon, 
  features 
}) => {
  const hasFeatures = features && features.length > 0;

  return (
    <div className="mb-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={title} className="border bg-card rounded-lg">
          <AccordionTrigger className="px-4 hover:no-underline hover:bg-accent/50 rounded-t-lg">
            <div className="flex items-center gap-2 text-xl">
              {icon}
              <span>{title}</span>
              <span className="ml-2 text-xs text-muted-foreground font-normal">
                ({features.length} funcionalidades)
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            {hasFeatures ? (
              <div className="space-y-4">
                {features.map((feature) => (
                  <div key={feature.id} className="flex flex-col space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">{feature.title}</div>
                        <div className="text-xs text-muted-foreground">{feature.description}</div>
                        {feature.warning && (
                          <div className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center gap-1 mt-1">
                            {feature.warning}
                          </div>
                        )}
                        {feature.dependent && feature.showDependencies && (
                          <div className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-1">
                            {feature.dependent}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center h-5">
                        <input
                          id={`feature-${feature.id}`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                          checked={feature.checked}
                          onChange={(e) => feature.onCheckedChange(e.target.checked)}
                          disabled={feature.disabled}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No hay características configuradas</div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FeatureAccordionGroup;
