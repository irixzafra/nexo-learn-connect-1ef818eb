import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Folder, Table, Grid, Filter, Search, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/shared/DataTable';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';
import { createColumn, createActionsColumn } from '@/components/shared/DataTableUtils';

interface PageData {
  title: string;
  path: string;
  description: string;
  status: string;
  category: string;
  importance?: 'high' | 'medium' | 'low';
  updated?: string;
}

const PagesManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const pages: PageData[] = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      description: 'Página principal con resumen de actividad',
      status: 'active',
      category: 'General',
      importance: 'high',
      updated: '2023-05-10'
    },
    {
      title: 'Cursos',
      path: '/courses',
      description: 'Listado de cursos disponibles',
      status: 'active',
      category: 'Learning',
      importance: 'high',
      updated: '2023-06-15'
    },
    {
      title: 'Mi Curso',
      path: '/my-courses',
      description: 'Cursos en los que el usuario está inscrito',
      status: 'active',
      category: 'Learning',
      importance: 'high',
      updated: '2023-06-22'
    },
    {
      title: 'Comunidad',
      path: '/community',
      description: 'Foros y grupos de discusión',
      status: 'active',
      category: 'Community',
      updated: '2023-04-30'
    },
    {
      title: 'Mensajes',
      path: '/messages',
      description: 'Sistema de mensajería interna',
      status: 'active',
      category: 'Community',
      updated: '2023-05-28'
    },
    {
      title: 'Administración',
      path: '/admin',
      description: 'Panel de administración del sistema',
      status: 'active',
      category: 'Admin',
      importance: 'high',
      updated: '2023-06-01'
    },
    {
      title: 'Configuración',
      path: '/settings',
      description: 'Configuración general de la plataforma',
      status: 'development',
      category: 'Admin',
      updated: '2023-05-05'
    }
  ];

  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Activo</Badge>;
      case 'development':
        return <Badge variant="secondary" className="bg-amber-500 text-black hover:bg-amber-600">En Desarrollo</Badge>;
      case 'not-implemented':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">No Implementado</Badge>;
      case 'duplicate':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-200">Duplicado</Badge>;
      case 'deprecated':
        return <Badge variant="destructive">Deprecado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const columns = [
    createColumn<PageData>({
      accessorKey: 'title',
      header: 'Título',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{row.getValue('title')}</span>
        </div>
      )
    }),
    createColumn<PageData>({
      accessorKey: 'path',
      header: 'Ruta',
      cell: ({ getValue }) => (
        <code className="text-xs bg-muted px-1 py-0.5 rounded">
          {getValue() as string}
        </code>
      )
    }),
    createColumn<PageData>({
      accessorKey: 'category',
      header: 'Categoría',
    }),
    createColumn<PageData>({
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ getValue }) => getStatusBadge(getValue() as string)
    }),
    createColumn<PageData>({
      accessorKey: 'updated',
      header: 'Actualización',
    }),
    createActionsColumn<PageData>(({ row }) => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/admin/settings/pages/edit/${row.getValue('title')}`}>
            Editar
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link to={row.getValue('path') as string} target="_blank">
            Ver
          </Link>
        </Button>
      </div>
    ))
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">Gestión de Páginas</CardTitle>
              <CardDescription>
                Administra las páginas y la navegación del sistema
              </CardDescription>
            </div>
            <Button asChild>
              <Link to="/admin/settings/pages/create">
                <Plus className="mr-2 h-4 w-4" />
                Nueva Página
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Buscar página..." 
                className="max-w-sm" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'table' | 'grid')}>
                <ToggleGroupItem value="table" aria-label="Vista tabla">
                  <Table className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="grid" aria-label="Vista cuadrícula">
                  <Grid className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          <DataTable 
            columns={columns} 
            data={filteredPages} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PagesManagement;
