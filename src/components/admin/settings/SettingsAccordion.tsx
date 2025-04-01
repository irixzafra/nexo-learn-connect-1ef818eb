
import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Settings, Navigation, Globe, Palette, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SettingsSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  iconColor?: string;
}

interface SettingsAccordionProps {
  sections: SettingsSection[];
  className?: string;
}

const SettingsAccordion: React.FC<SettingsAccordionProps> = ({ 
  sections,
  className 
}) => {
  const [openSections, setOpenSections] = useState<string[]>([sections[0]?.id]);

  const handleOpenChange = (value: string[]) => {
    setOpenSections(value);
  };

  const expandAll = () => {
    setOpenSections(sections.map(section => section.id));
  };

  const collapseAll = () => {
    setOpenSections([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={expandAll}
          className="text-xs"
        >
          Expandir todo
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={collapseAll}
          className="text-xs"
        >
          Colapsar todo
        </Button>
      </div>

      <Accordion 
        type="multiple" 
        value={openSections} 
        onValueChange={handleOpenChange}
        className={cn("border rounded-md overflow-hidden", className)}
      >
        {sections.map((section) => (
          <AccordionItem 
            key={section.id} 
            value={section.id}
            className="px-0 border-b last:border-b-0"
          >
            <AccordionTrigger className="flex items-center px-4 py-3 hover:bg-muted/30 data-[state=open]:bg-muted/20">
              <div className="flex items-center gap-3">
                <div className={cn("flex items-center justify-center", section.iconColor || "text-primary")}>
                  {section.icon}
                </div>
                <span className="text-base font-medium">{section.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-2 pb-4">
              {section.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SettingsAccordion;
