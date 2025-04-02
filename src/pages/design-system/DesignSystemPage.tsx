
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Grid, LayoutList, Filter, Component } from 'lucide-react';
import ComponentsGrid from '@/features/design-system/components/ComponentsGrid';
import ComponentsList from '@/features/design-system/components/ComponentsList';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useDesignSystem } from '@/contexts/DesignSystemContext';

export interface DesignComponent {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'stable' | 'beta' | 'deprecated' | 'experimental';
  usage: string;
  path: string;
}

const DesignSystemPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { theme } = useDesignSystem();
  
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'inputs', name: 'Entradas' },
    { id: 'display', name: 'Visualización' },
    { id: 'layout', name: 'Estructura' },
    { id: 'feedback', name: 'Feedback' },
    { id: 'navigation', name: 'Navegación' },
    { id: 'data', name: 'Datos' },
    { id: 'overlay', name: 'Superposición' },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilter = (categoryId: string) => {
    setActiveCategory(categoryId === 'all' ? null : categoryId);
  };

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="flex flex-col space-y-2 mb-8">
        <h1 className="text-3xl font-bold">Sistema de Diseño Nexo</h1>
        <p className="text-muted-foreground">
          Guía completa de componentes, patrones y estilos
        </p>
      </div>

      <Tabs defaultValue="components" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="components">Componentes</TabsTrigger>
            <TabsTrigger value="foundation">Fundamentos</TabsTrigger>
            <TabsTrigger value="patterns">Patrones</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-accent' : ''}
            >
              <Grid className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-accent' : ''}
            >
              <LayoutList className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <TabsContent value="components" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Component className="h-5 w-5" />
                  Componentes
                </CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar componentes..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <CardDescription>
                Todos los componentes de UI disponibles en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-wrap gap-2">
                <div className="mr-2 flex items-center">
                  <Filter className="mr-1 h-4 w-4" />
                  <span className="text-sm font-medium">Filtrar:</span>
                </div>
                {categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={activeCategory === category.id || (category.id === 'all' && activeCategory === null) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => handleCategoryFilter(category.id)}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              {viewMode === 'grid' ? (
                <ComponentsGrid 
                  searchTerm={searchTerm} 
                  categoryFilter={activeCategory}
                />
              ) : (
                <ComponentsList 
                  searchTerm={searchTerm} 
                  categoryFilter={activeCategory}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="foundation">
          <Card>
            <CardHeader>
              <CardTitle>Fundamentos del Sistema</CardTitle>
              <CardDescription>
                Principios básicos, tipografía, colores y espaciados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Paleta de Colores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full" style={{ backgroundColor: theme.colors.primary }}></div>
                          <span className="text-sm font-medium">Primary</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full" style={{ backgroundColor: theme.colors.secondary }}></div>
                          <span className="text-sm font-medium">Secondary</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full" style={{ backgroundColor: theme.colors.accent }}></div>
                          <span className="text-sm font-medium">Accent</span>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded border" style={{ backgroundColor: theme.colors.background }}></div>
                          <span className="text-sm font-medium">Background</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded" style={{ backgroundColor: theme.colors.foreground }}></div>
                          <span className="text-sm font-medium">Foreground</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded border" style={{ backgroundColor: theme.colors.muted }}></div>
                          <span className="text-sm font-medium">Muted</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Tipografía</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h1 className="text-2xl font-bold">Título Principal</h1>
                      <p className="text-sm text-muted-foreground">
                        font-bold, text-2xl
                      </p>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Título Secundario</h2>
                      <p className="text-sm text-muted-foreground">
                        font-semibold, text-xl
                      </p>
                    </div>
                    <div>
                      <p className="text-base">Texto Base</p>
                      <p className="text-sm text-muted-foreground">text-base</p>
                    </div>
                    <div>
                      <p className="text-sm">Texto Pequeño</p>
                      <p className="text-sm text-muted-foreground">text-sm</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns">
          <Card>
            <CardHeader>
              <CardTitle>Patrones de Diseño</CardTitle>
              <CardDescription>
                Patrones comunes utilizados en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Formularios</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Patrones comunes para la creación y validación de formularios.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Navegación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Patrones para la navegación y estructura del sitio.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Layouts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Estructuras de páginas y componentes reutilizables.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DesignSystemPage;
