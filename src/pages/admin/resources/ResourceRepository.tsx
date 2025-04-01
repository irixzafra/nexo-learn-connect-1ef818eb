
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, FolderOpen, Upload, Filter, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ResourceRepository: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Datos de ejemplo para mostrar en la interfaz
  const resourceCategories = [
    { id: 'all', name: 'Todos los recursos' },
    { id: 'documents', name: 'Documentos' },
    { id: 'presentations', name: 'Presentaciones' },
    { id: 'videos', name: 'Videos' },
    { id: 'images', name: 'Imágenes' },
    { id: 'audio', name: 'Audio' },
    { id: 'other', name: 'Otros' }
  ];
  
  const resourcesData = [
    { id: 1, title: 'Guía de introducción a React', type: 'pdf', category: 'documents', size: '2.4 MB', lastUpdated: '2024-07-15', author: 'María González' },
    { id: 2, title: 'Fundamentos de programación', type: 'pptx', category: 'presentations', size: '5.7 MB', lastUpdated: '2024-06-28', author: 'Juan Pérez' },
    { id: 3, title: 'Tutorial de TypeScript', type: 'mp4', category: 'videos', size: '45.2 MB', lastUpdated: '2024-07-02', author: 'Ana Rodríguez' },
    { id: 4, title: 'Diagrama de arquitectura', type: 'png', category: 'images', size: '0.8 MB', lastUpdated: '2024-07-10', author: 'Carlos López' },
    { id: 5, title: 'Conceptos de UX/UI', type: 'pdf', category: 'documents', size: '1.5 MB', lastUpdated: '2024-07-08', author: 'Elena Martínez' },
    { id: 6, title: 'Podcast sobre desarrollo', type: 'mp3', category: 'audio', size: '18.3 MB', lastUpdated: '2024-06-25', author: 'Roberto Sánchez' }
  ];
  
  // Filtrado por búsqueda
  const filteredResources = resourcesData.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Renderizado de recursos en modo grid
  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {filteredResources.map(resource => (
        <Card key={resource.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base font-medium truncate">{resource.title}</CardTitle>
              <span className="text-xs uppercase px-2 py-1 rounded-full bg-primary/10 text-primary">
                {resource.type}
              </span>
            </div>
            <CardDescription className="text-xs">{resource.author} · {resource.lastUpdated}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{resource.size}</span>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <FolderOpen className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Renderizado de recursos en modo lista
  const renderListView = () => (
    <div className="overflow-x-auto mt-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4">Nombre</th>
            <th className="text-left py-3 px-4">Tipo</th>
            <th className="text-left py-3 px-4">Autor</th>
            <th className="text-left py-3 px-4">Tamaño</th>
            <th className="text-left py-3 px-4">Actualizado</th>
            <th className="text-right py-3 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredResources.map(resource => (
            <tr key={resource.id} className="border-b hover:bg-muted/50">
              <td className="py-3 px-4 font-medium">{resource.title}</td>
              <td className="py-3 px-4">
                <span className="text-xs uppercase px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {resource.type}
                </span>
              </td>
              <td className="py-3 px-4">{resource.author}</td>
              <td className="py-3 px-4">{resource.size}</td>
              <td className="py-3 px-4">{resource.lastUpdated}</td>
              <td className="py-3 px-4 text-right">
                <div className="flex justify-end space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <FolderOpen className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Repositorio de Recursos</h1>
          <p className="text-muted-foreground">
            Gestiona y organiza todos los recursos educativos en un único repositorio centralizado
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Subir Recurso
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Buscar por título o autor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              {resourceCategories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Filter className="h-4 w-4" />
          </Button>
          
          <div className="border rounded-md overflow-hidden flex">
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'ghost'} 
              size="icon" 
              className="h-10 w-10 rounded-none"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'ghost'} 
              size="icon" 
              className="h-10 w-10 rounded-none"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          {resourceCategories.map(category => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {resourceCategories.map(category => (
          <TabsContent key={category.id} value={category.id}>
            {viewMode === 'grid' ? renderGridView() : renderListView()}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ResourceRepository;
