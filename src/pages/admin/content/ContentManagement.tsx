
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageIcon, FolderIcon, ImageIcon } from 'lucide-react';

// Importar los componentes de las pestañas
import ContentCategoriesTab from '@/components/admin/content/ContentCategoriesTab';
import ContentPagesTab from '@/components/admin/content/ContentPagesTab';
import ContentFilesTab from '@/components/admin/content/ContentFilesTab';

/**
 * Página de gestión de contenido unificada
 * Proporciona acceso a las distintas áreas de contenido del sistema
 */
const ContentManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestión de Contenido</h1>
        <p className="text-muted-foreground mt-1">
          Administra el contenido estático y organizativo de la plataforma
        </p>
      </div>
      
      <Tabs defaultValue="pages" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pages" className="flex items-center gap-2 py-3">
            <PageIcon className="h-4 w-4" />
            <span>Páginas</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2 py-3">
            <FolderIcon className="h-4 w-4" />
            <span>Categorías</span>
          </TabsTrigger>
          <TabsTrigger value="files" className="flex items-center gap-2 py-3">
            <ImageIcon className="h-4 w-4" />
            <span>Archivos</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pages">
          <ContentPagesTab />
        </TabsContent>
        
        <TabsContent value="categories">
          <ContentCategoriesTab />
        </TabsContent>
        
        <TabsContent value="files">
          <ContentFilesTab />
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Información de Contenido</CardTitle>
          <CardDescription>
            Estado actual del contenido en la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Páginas Publicadas</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-muted-foreground">Páginas Borrador</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Categorías</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">126</div>
                <div className="text-sm text-muted-foreground">Archivos</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;
