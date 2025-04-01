
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Files, LayoutGrid, FolderTree, Tags } from 'lucide-react';
import ContentPagesTab from '@/components/admin/content/ContentPagesTab';
import ContentFilesTab from '@/components/admin/content/ContentFilesTab';
import ContentCategoriesTab from '@/components/admin/content/ContentCategoriesTab';

const ContentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pages');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestión de Contenido</h1>
        <p className="text-muted-foreground">
          Administra páginas, medios y categorías de contenido de tu plataforma
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Gestión Centralizada de Contenido</CardTitle>
          <CardDescription>
            Administra todo el contenido de tu plataforma desde un único lugar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pages" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full mb-6">
              <TabsTrigger value="pages" className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" />
                <span>Páginas</span>
              </TabsTrigger>
              <TabsTrigger value="files" className="flex items-center gap-2">
                <Files className="h-4 w-4" />
                <span>Archivos</span>
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center gap-2">
                <Tags className="h-4 w-4" />
                <span>Categorías</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pages" className="space-y-4">
              <ContentPagesTab />
            </TabsContent>
            
            <TabsContent value="files" className="space-y-4">
              <ContentFilesTab />
            </TabsContent>
            
            <TabsContent value="categories" className="space-y-4">
              <ContentCategoriesTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;
