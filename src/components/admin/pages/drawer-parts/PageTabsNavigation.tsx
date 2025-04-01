
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, FileText, Code, Settings } from 'lucide-react';

interface PageTabsNavigationProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const PageTabsNavigation: React.FC<PageTabsNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <Tabs 
      defaultValue="preview" 
      value={activeTab}
      onValueChange={onTabChange}
      className="mt-6"
    >
      <TabsList className="grid grid-cols-4 w-full mb-4">
        <TabsTrigger value="preview" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          <span>Vista previa</span>
        </TabsTrigger>
        <TabsTrigger value="edit" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>Editar</span>
        </TabsTrigger>
        <TabsTrigger value="code" className="flex items-center gap-2">
          <Code className="h-4 w-4" />
          <span>Código</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span>Configuración</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default PageTabsNavigation;
