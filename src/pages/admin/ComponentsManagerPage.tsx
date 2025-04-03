
import React, { useState, useEffect } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Package, FolderOpen, FileQuestion } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import {
  UIComponent,
  NavigationComponent,
  OrphanPage,
  getUIComponents,
  getNavigationComponents,
  getOrphanPages
} from '@/features/admin/services/componentsService';
import { EditableDataTable } from '@/components/shared/EditableDataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';

const ComponentsManagerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ui-components');
  const [uiComponents, setUIComponents] = useState<UIComponent[]>([]);
  const [navComponents, setNavComponents] = useState<NavigationComponent[]>([]);
  const [orphanPages, setOrphanPages] = useState<OrphanPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'ui-components') {
          const data = await getUIComponents();
          setUIComponents(data);
        } else if (activeTab === 'navigation-components') {
          const data = await getNavigationComponents();
          setNavComponents(data);
        } else if (activeTab === 'orphan-pages') {
          const data = await getOrphanPages();
          setOrphanPages(data);
        }
      } catch (error) {
        console.error(`Error cargando ${activeTab}:`, error);
        toast.error(`Error al cargar datos: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeTab]);

  // Columnas para componentes UI
  const uiComponentsColumns: ColumnDef<UIComponent, any>[] = [
    {
      accessorKey: 'name',
      header: 'Nombre',
      cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>
    },
    {
      accessorKey: 'category',
      header: 'Categoría'
    },
    {
      accessorKey: 'path',
      header: 'Ruta'
    },
    {
      accessorKey: 'usage',
      header: 'Uso'
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ row }) => (
        <Badge variant={row.getValue('status') === 'Activo' ? 'success' : 'default'}>
          {row.getValue('status')}
        </Badge>
      )
    }
  ];

  // Columnas para componentes de navegación
  const navComponentsColumns: ColumnDef<NavigationComponent, any>[] = [
    {
      accessorKey: 'name',
      header: 'Nombre',
      cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>
    },
    {
      accessorKey: 'category',
      header: 'Tipo'
    },
    {
      accessorKey: 'path',
      header: 'Ruta'
    },
    {
      accessorKey: 'usage',
      header: 'Uso'
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ row }) => (
        <Badge variant={row.getValue('status') === 'Activo' ? 'success' : 'default'}>
          {row.getValue('status')}
        </Badge>
      )
    }
  ];

  // Columnas para páginas huérfanas
  const orphanPagesColumns: ColumnDef<OrphanPage, any>[] = [
    {
      accessorKey: 'title',
      header: 'Título',
      cell: ({ row }) => <div className="font-medium">{row.getValue('title')}</div>
    },
    {
      accessorKey: 'path',
      header: 'Ruta'
    },
    {
      accessorKey: 'last_accessed',
      header: 'Último acceso',
      cell: ({ row }) => {
        const date = row.getValue('last_accessed');
        return date ? new Date(date as string).toLocaleDateString() : 'Nunca';
      }
    },
    {
      accessorKey: 'access_count',
      header: 'Accesos'
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ row }) => (
        <Badge variant="warning">{row.getValue('status')}</Badge>
      )
    }
  ];

  // Función para guardar un componente UI
  const handleSaveUIComponent = async (component: UIComponent): Promise<void> => {
    try {
      if (component.id) {
        // Actualizar
        const { error } = await supabase
          .from('ui_components')
          .update({
            name: component.name,
            description: component.description,
            category: component.category,
            path: component.path,
            usage: component.usage,
            status: component.status,
            type: component.type
          })
          .eq('id', component.id);

        if (error) throw error;
        toast.success('Componente actualizado correctamente');
        
        // Actualizar la lista
        setUIComponents(prev => 
          prev.map(item => item.id === component.id ? component : item)
        );
      } else {
        // Crear nuevo
        const { data, error } = await supabase
          .from('ui_components')
          .insert({
            name: component.name,
            description: component.description,
            category: component.category,
            path: component.path,
            usage: component.usage,
            status: component.status || 'Activo',
            type: component.type || 'ui'
          })
          .select();

        if (error) throw error;
        toast.success('Componente creado correctamente');
        
        // Actualizar la lista
        if (data) {
          setUIComponents(prev => [...prev, data[0] as UIComponent]);
        }
      }
    } catch (error) {
      console.error('Error guardando componente UI:', error);
      toast.error(`Error al guardar: ${(error as Error).message}`);
    }
  };

  // Función para guardar un componente de navegación
  const handleSaveNavComponent = async (component: NavigationComponent): Promise<void> => {
    try {
      if (component.id) {
        // Actualizar
        const { error } = await supabase
          .from('navigation_components')
          .update({
            name: component.name,
            description: component.description,
            category: component.category,
            path: component.path,
            usage: component.usage,
            status: component.status
          })
          .eq('id', component.id);

        if (error) throw error;
        toast.success('Componente actualizado correctamente');
        
        // Actualizar la lista
        setNavComponents(prev => 
          prev.map(item => item.id === component.id ? component : item)
        );
      } else {
        // Crear nuevo
        const { data, error } = await supabase
          .from('navigation_components')
          .insert({
            name: component.name,
            description: component.description,
            category: component.category,
            path: component.path,
            usage: component.usage,
            status: component.status || 'Activo'
          })
          .select();

        if (error) throw error;
        toast.success('Componente creado correctamente');
        
        // Actualizar la lista
        if (data) {
          setNavComponents(prev => [...prev, data[0] as NavigationComponent]);
        }
      }
    } catch (error) {
      console.error('Error guardando componente de navegación:', error);
      toast.error(`Error al guardar: ${(error as Error).message}`);
    }
  };

  // Función para guardar una página huérfana
  const handleSaveOrphanPage = async (page: OrphanPage): Promise<void> => {
    try {
      if (page.id) {
        // Actualizar
        const { error } = await supabase
          .from('orphan_pages')
          .update({
            title: page.title,
            path: page.path,
            last_accessed: page.last_accessed,
            access_count: page.access_count,
            status: page.status
          })
          .eq('id', page.id);

        if (error) throw error;
        toast.success('Página actualizada correctamente');
        
        // Actualizar la lista
        setOrphanPages(prev => 
          prev.map(item => item.id === page.id ? page : item)
        );
      } else {
        // Crear nuevo
        const { data, error } = await supabase
          .from('orphan_pages')
          .insert({
            title: page.title,
            path: page.path,
            last_accessed: page.last_accessed || new Date().toISOString(),
            access_count: page.access_count || 0,
            status: page.status
          })
          .select();

        if (error) throw error;
        toast.success('Página creada correctamente');
        
        // Actualizar la lista
        if (data) {
          setOrphanPages(prev => [...prev, data[0] as OrphanPage]);
        }
      }
    } catch (error) {
      console.error('Error guardando página huérfana:', error);
      toast.error(`Error al guardar: ${(error as Error).message}`);
    }
  };

  return (
    <AdminPageLayout title="Gestión de Componentes y Elementos">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Gestión de Componentes y Elementos</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="ui-components" className="flex items-center">
              <Package className="h-4 w-4 mr-2" />
              Componentes UI
            </TabsTrigger>
            <TabsTrigger value="navigation-components" className="flex items-center">
              <FolderOpen className="h-4 w-4 mr-2" />
              Componentes Navegación
            </TabsTrigger>
            <TabsTrigger value="orphan-pages" className="flex items-center">
              <FileQuestion className="h-4 w-4 mr-2" />
              Páginas Huérfanas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ui-components">
            <Card>
              <CardHeader>
                <CardTitle>Componentes de Interfaz</CardTitle>
                <CardDescription>
                  Administra los componentes UI de la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EditableDataTable
                  columns={uiComponentsColumns}
                  data={uiComponents}
                  title="Componente UI"
                  onSave={handleSaveUIComponent}
                  renderForm={({ data, onChange }) => (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="font-medium">Nombre</label>
                          <input
                            id="name"
                            type="text"
                            className="border p-2 w-full rounded-md"
                            value={data?.name || ''}
                            onChange={(e) => onChange({ ...data, name: e.target.value } as UIComponent)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="category" className="font-medium">Categoría</label>
                          <input
                            id="category"
                            type="text"
                            className="border p-2 w-full rounded-md"
                            value={data?.category || ''}
                            onChange={(e) => onChange({ ...data, category: e.target.value } as UIComponent)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="path" className="font-medium">Ruta</label>
                        <input
                          id="path"
                          type="text"
                          className="border p-2 w-full rounded-md"
                          value={data?.path || ''}
                          onChange={(e) => onChange({ ...data, path: e.target.value } as UIComponent)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="description" className="font-medium">Descripción</label>
                        <textarea
                          id="description"
                          className="border p-2 w-full rounded-md"
                          value={data?.description || ''}
                          onChange={(e) => onChange({ ...data, description: e.target.value } as UIComponent)}
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="usage" className="font-medium">Uso</label>
                          <select
                            id="usage"
                            className="border p-2 w-full rounded-md"
                            value={data?.usage || 'Alto'}
                            onChange={(e) => onChange({ ...data, usage: e.target.value } as UIComponent)}
                          >
                            <option value="Alto">Alto</option>
                            <option value="Medio">Medio</option>
                            <option value="Bajo">Bajo</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="status" className="font-medium">Estado</label>
                          <select
                            id="status"
                            className="border p-2 w-full rounded-md"
                            value={data?.status || 'Activo'}
                            onChange={(e) => onChange({ ...data, status: e.target.value } as UIComponent)}
                          >
                            <option value="Activo">Activo</option>
                            <option value="Deprecado">Deprecado</option>
                            <option value="Desarrollo">Desarrollo</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="navigation-components">
            <Card>
              <CardHeader>
                <CardTitle>Componentes de Navegación</CardTitle>
                <CardDescription>
                  Administra los componentes de navegación de la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EditableDataTable
                  columns={navComponentsColumns}
                  data={navComponents}
                  title="Componente de Navegación"
                  onSave={handleSaveNavComponent}
                  renderForm={({ data, onChange }) => (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="font-medium">Nombre</label>
                          <input
                            id="name"
                            type="text"
                            className="border p-2 w-full rounded-md"
                            value={data?.name || ''}
                            onChange={(e) => onChange({ ...data, name: e.target.value } as NavigationComponent)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="category" className="font-medium">Tipo</label>
                          <select
                            id="category"
                            className="border p-2 w-full rounded-md"
                            value={data?.category || 'Principal'}
                            onChange={(e) => onChange({ ...data, category: e.target.value } as NavigationComponent)}
                          >
                            <option value="Principal">Principal</option>
                            <option value="Secundario">Secundario</option>
                            <option value="Auxiliar">Auxiliar</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="path" className="font-medium">Ruta</label>
                        <input
                          id="path"
                          type="text"
                          className="border p-2 w-full rounded-md"
                          value={data?.path || ''}
                          onChange={(e) => onChange({ ...data, path: e.target.value } as NavigationComponent)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="description" className="font-medium">Descripción</label>
                        <textarea
                          id="description"
                          className="border p-2 w-full rounded-md"
                          value={data?.description || ''}
                          onChange={(e) => onChange({ ...data, description: e.target.value } as NavigationComponent)}
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="usage" className="font-medium">Uso</label>
                          <select
                            id="usage"
                            className="border p-2 w-full rounded-md"
                            value={data?.usage || 'Alto'}
                            onChange={(e) => onChange({ ...data, usage: e.target.value } as NavigationComponent)}
                          >
                            <option value="Alto">Alto</option>
                            <option value="Medio">Medio</option>
                            <option value="Bajo">Bajo</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="status" className="font-medium">Estado</label>
                          <select
                            id="status"
                            className="border p-2 w-full rounded-md"
                            value={data?.status || 'Activo'}
                            onChange={(e) => onChange({ ...data, status: e.target.value } as NavigationComponent)}
                          >
                            <option value="Activo">Activo</option>
                            <option value="Deprecado">Deprecado</option>
                            <option value="Desarrollo">Desarrollo</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orphan-pages">
            <Card>
              <CardHeader>
                <CardTitle>Páginas Huérfanas</CardTitle>
                <CardDescription>
                  Administra las páginas sin referencias en el sitio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EditableDataTable
                  columns={orphanPagesColumns}
                  data={orphanPages}
                  title="Página Huérfana"
                  onSave={handleSaveOrphanPage}
                  renderForm={({ data, onChange }) => (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="title" className="font-medium">Título</label>
                        <input
                          id="title"
                          type="text"
                          className="border p-2 w-full rounded-md"
                          value={data?.title || ''}
                          onChange={(e) => onChange({ ...data, title: e.target.value } as OrphanPage)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="path" className="font-medium">Ruta</label>
                        <input
                          id="path"
                          type="text"
                          className="border p-2 w-full rounded-md"
                          value={data?.path || ''}
                          onChange={(e) => onChange({ ...data, path: e.target.value } as OrphanPage)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="access_count" className="font-medium">Número de accesos</label>
                          <input
                            id="access_count"
                            type="number"
                            className="border p-2 w-full rounded-md"
                            value={data?.access_count || 0}
                            onChange={(e) => onChange({ ...data, access_count: parseInt(e.target.value) } as OrphanPage)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="status" className="font-medium">Estado</label>
                          <select
                            id="status"
                            className="border p-2 w-full rounded-md"
                            value={data?.status || 'no links'}
                            onChange={(e) => onChange({ ...data, status: e.target.value } as OrphanPage)}
                          >
                            <option value="no links">Sin enlaces</option>
                            <option value="no referrer">Sin referencia</option>
                            <option value="unreachable">Inalcanzable</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminPageLayout>
  );
};

export default ComponentsManagerPage;
