
import React, { useState } from 'react';
import { 
  Sheet, 
  SheetContent
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageData } from './types';
import { getStatusBadge } from './utils/statusBadge';
import PageDrawerHeader from './drawer-parts/PageDrawerHeader';
import PageTabsNavigation from './drawer-parts/PageTabsNavigation';
import PageDrawerFooter from './drawer-parts/PageDrawerFooter';
import PagePreviewTab from './drawer-tabs/PagePreviewTab';
import PageEditTab from './drawer-tabs/PageEditTab';
import PageCodeTab from './drawer-tabs/PageCodeTab';
import PageSettingsTab from './drawer-tabs/PageSettingsTab';
import PageAIContentGenerator from './ai-generator/PageAIContentGenerator';
import { useForm } from 'react-hook-form';

interface PageEditorDrawerProps {
  page: PageData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PageEditorDrawer: React.FC<PageEditorDrawerProps> = ({
  page,
  open,
  onOpenChange
}) => {
  const [activeTab, setActiveTab] = useState('preview');
  const form = useForm({
    defaultValues: {
      content: { blocks: [] }
    }
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl overflow-y-auto">
        <PageDrawerHeader 
          page={page} 
          getStatusBadge={getStatusBadge} 
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <PageTabsNavigation 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
          
          <TabsContent value="preview">
            <PagePreviewTab page={page} />
          </TabsContent>
          
          <TabsContent value="edit">
            <PageEditTab page={page} />
            <PageAIContentGenerator form={form} />
          </TabsContent>
          
          <TabsContent value="code">
            <PageCodeTab page={page} />
          </TabsContent>
          
          <TabsContent value="settings">
            <PageSettingsTab page={page} />
          </TabsContent>
        </Tabs>
        
        <PageDrawerFooter onClose={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default PageEditorDrawer;
