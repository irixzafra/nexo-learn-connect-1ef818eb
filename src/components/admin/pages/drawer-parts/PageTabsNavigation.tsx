
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Edit, Code, Settings, Wand2 } from 'lucide-react';

interface PageTabsNavigationProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const PageTabsNavigation: React.FC<PageTabsNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <TabsList className="grid grid-cols-4 mb-6">
      <TabsTrigger value="preview" className="flex items-center space-x-2">
        <FileText className="h-4 w-4" />
        <span>Vista previa</span>
      </TabsTrigger>
      
      <TabsTrigger value="edit" className="flex items-center space-x-2">
        <Edit className="h-4 w-4" />
        <span>Editar</span>
      </TabsTrigger>
      
      <TabsTrigger value="code" className="flex items-center space-x-2">
        <Code className="h-4 w-4" />
        <span>Código</span>
      </TabsTrigger>
      
      <TabsTrigger value="settings" className="flex items-center space-x-2">
        <Settings className="h-4 w-4" />
        <span>Ajustes</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default PageTabsNavigation;
