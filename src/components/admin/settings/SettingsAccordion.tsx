
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';

export interface SettingsSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  iconColor?: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface SettingsAccordionProps {
  sections: SettingsSection[];
  defaultValue?: string;
  className?: string;
  title?: string;
  description?: string;
}

const SettingsAccordion: React.FC<SettingsAccordionProps> = ({
  sections,
  defaultValue,
  className,
  title,
  description
}) => {
  return (
    <div className="space-y-3">
      {/* Render title and description if provided */}
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      
      <Accordion 
        type="single" 
        collapsible 
        className={cn("w-full", className)}
        defaultValue={defaultValue || sections[0]?.id}
      >
        {sections.map((section) => (
          <AccordionItem 
            key={section.id} 
            value={section.id}
            disabled={section.disabled}
            className="border rounded-lg mb-3 last:mb-0 overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
              <div className="flex items-center">
                <div className={cn("mr-2", section.iconColor)}>
                  {section.icon}
                </div>
                <span>{section.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-2 pb-4 bg-white dark:bg-transparent">
              {section.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SettingsAccordion;
