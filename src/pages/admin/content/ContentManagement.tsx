
import React, { useState } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileEdit, FilePlus, FolderPlus, List, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ContentCategoriesTab from '@/components/admin/content/ContentCategoriesTab';
import ContentPagesTab from '@/components/admin/content/ContentPagesTab';
import ContentFilesTab from '@/components/admin/content/ContentFilesTab';
import { AdminTabItem } from '@/components/shared/AdminNavTabs';
import { useFeatures } from '@/contexts/features/FeaturesContext';

/**
 * Página de gestión de contenido
 */
const ContentManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('pages');
  const { features } = useFeatures();

  const handleCreatePage = () => {
    navigate('/admin/pages/create');
  };

  const handleCreateCategory = () => {
    // Implementación pendiente: abrir modal o navegar a página de creación
    console.log('Crear categoría');
  };

  const tabs: AdminTabItem[] = [
    {
      label: 'Páginas',
      value: 'pages',
      dataTag: 'admin-content-pages-tab',
      icon: <FileEdit className="h-4 w-4" />,
      content: (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Páginas del Sistema</h2>
            <Button onClick={handleCreatePage}>
              <Plus className="mr-2 h-4 w-4" /> Nueva Página
            </Button>
          </div>
          <ContentPagesTab />
        </>
      )
    },
    {
      label: 'Categorías',
      value: 'categories',
      dataTag: 'admin-content-categories-tab',
      icon: <FolderPlus className="h-4 w-4" />,
      content: (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Categorías de Contenido</h2>
            <Button onClick={handleCreateCategory} variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Nueva Categoría
            </Button>
          </div>
          <ContentCategoriesTab />
        </>
      )
    },
    {
      label: 'Archivos',
      value: 'files',
      dataTag: 'admin-content-files-tab',
      icon: <List className="h-4 w-4" />,
      content: <ContentFilesTab />
    }
  ];

  return (
    <AdminPageLayout
      title="Gestión de Contenido"
      subtitle="Administra todo el contenido de la plataforma"
    >
      <Tabs
        defaultValue="pages"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <Button
                key={tab.value}
                variant={activeTab === tab.value ? "default" : "outline"}
                onClick={() => setActiveTab(tab.value)}
                className="flex items-center"
                data-tag={tab.dataTag}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-0">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>

      {/* Agregar un card con información adicional */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Consejos de Gestión de Contenido</CardTitle>
          <CardDescription>
            Optimiza el contenido de tu plataforma siguiendo estas recomendaciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Estructura Efectiva</h3>
              <p className="text-sm text-muted-foreground">
                Organiza tu contenido en categorías lógicas y mantén una estructura
                coherente para facilitar la navegación de los usuarios.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Optimización para Búsqueda</h3>
              <p className="text-sm text-muted-foreground">
                Utiliza palabras clave relevantes en títulos y descripciones para
                mejorar la visibilidad en los resultados de búsqueda.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminPageLayout>
  );
};

export default ContentManagement;
