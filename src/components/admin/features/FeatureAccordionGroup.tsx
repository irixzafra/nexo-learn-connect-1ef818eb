
import React from 'react';
import { Shield, MessageCircle, Users, FileText, Boxes, Cog } from 'lucide-react';
import { StyledAccordion, StyledAccordionItem } from '@/components/ui/styled-accordion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface Feature {
  id: string;
  name: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

interface FeatureGroup {
  id: string;
  title: string;
  icon: React.ReactNode;
  features: Feature[];
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
  return (
    <StyledAccordion
      variant={variant}
      gap={gap}
      type={type}
      collapsible={true}
      defaultValue={groups.length > 0 ? groups[0].id : undefined}
    >
      {groups.map((group) => (
        <StyledAccordionItem
          key={group.id}
          value={group.id}
          title={group.title}
          icon={group.icon}
        >
          <div className="space-y-2">
            {group.features.map((feature) => (
              <div key={feature.id} className="flex items-center justify-between">
                <Label htmlFor={`feature-${feature.id}`} className="flex-1">{feature.name}</Label>
                <Switch
                  id={`feature-${feature.id}`}
                  checked={feature.enabled}
                  onCheckedChange={feature.onChange}
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
