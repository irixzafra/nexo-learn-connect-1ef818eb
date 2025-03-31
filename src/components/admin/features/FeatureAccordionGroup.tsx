
import React from 'react';
import { Shield, MessageCircle, Users, FileText, Boxes, Cog } from 'lucide-react';
import { StyledAccordion, StyledAccordionItem } from '@/components/ui/styled-accordion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface Feature {
  id: string;
  name: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  description?: string;
}

interface FeatureGroup {
  id: string;
  title: string;
  icon: React.ReactNode;
  features: Feature[];
  description?: string;
}

interface FeatureAccordionGroupProps {
  groups: FeatureGroup[];
  variant?: 'default' | 'outline' | 'ghost';
  gap?: 'none' | 'sm' | 'md';
  type?: 'single' | 'multiple';
}

const FeatureAccordionGroup: React.FC<FeatureAccordionGroupProps> = ({
  groups,
  variant = 'default',
  gap = 'none',
  type = 'single'
}) => {
  // Use the correct defaultValue type based on the accordion type
  const defaultValue = type === 'single' 
    ? (groups.length > 0 ? groups[0].id : undefined)
    : (groups.length > 0 ? [groups[0].id] : []);

  return (
    <StyledAccordion
      variant={variant}
      gap={gap}
      type={type}
      collapsible={true}
      defaultValue={defaultValue}
    >
      {groups.map((group) => (
        <StyledAccordionItem
          key={group.id}
          value={group.id}
          title={group.title}
          description={group.description}
          icon={group.icon}
        >
          <div className="space-y-4">
            {group.features.map((feature) => (
              <div 
                key={feature.id} 
                className={cn(
                  "flex items-center justify-between py-2 px-1 rounded-md",
                  feature.enabled && "bg-primary/5"
                )}
              >
                <div className="space-y-1">
                  <Label 
                    htmlFor={`feature-${feature.id}`} 
                    className="flex-1 font-medium"
                  >
                    {feature.name}
                  </Label>
                  {feature.description && (
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  )}
                </div>
                <Switch
                  id={`feature-${feature.id}`}
                  checked={feature.enabled}
                  onCheckedChange={feature.onChange}
                  className="ml-4"
                />
              </div>
            ))}
          </div>
        </StyledAccordionItem>
      ))}
    </StyledAccordion>
  );
};

export default FeatureAccordionGroup;
