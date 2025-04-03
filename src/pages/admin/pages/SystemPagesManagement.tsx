
import React, { useState, useEffect } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, FileText, FileQuestion } from 'lucide-react';
import { toast } from 'sonner';
import { AdvancedDataTable } from '@/components/shared/AdvancedDataTable';
import { createColumn } from '@/components/shared/DataTableUtils';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { SitePage, PageStatus } from '@/types/pages';
import { getAllPages, updatePageStatus, deletePage } from '@/features/admin/services/pagesService';
import { getOrphanPages, OrphanPage } from '@/features/admin/services/componentsService';
import PageEditorDialog from '@/components/admin/pages/PageEditorDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Eye, PenSquare, Trash2, Clock, Layout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SystemPagesManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('system-pages');
  const [searchQuery, setSearchQuery] = useState('');
  const [pages, setPages] = useState<SitePage[]>([]);
  const [orphanPages, setOrphanPages] = useState<OrphanPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingOrphan, setLoadingOrphan] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<SitePage | OrphanPage | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState<string | undefined>(undefined);
  
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        if (activeTab === 'system-pages') {
          setLoading(true);
          const data = await getAllPages();
          setPages(data);
          setLoading(false);
        } else if (activeTab === 'orphan-pages') {
          setLoadingOrphan(true);
          const data = await getOrphanPages();
          setOrphanPages(data);
          setLoadingOrphan(false);
        }
      } catch (error) {
        console.error(`Error loading ${activeTab}:`, error);
        toast.error(`Error al cargar datos: ${(error as Error).message}`);
      }
    };

    loadData();
  }, [activeTab]);

  const handleStatusChange = async (page: SitePage, status: PageStatus) => {
    try {
      await updatePageStatus(page.id, status);
      setPages(pages.map(p => p.id === page.id ? { ...p, status } : p));
      toast.success(`Estado de página actualizado a "${status}"`);
    } catch (error) {
      console.error('Error updating page status:', error);
      toast.error('Error al actualizar el estado de la página');
    }
  };

  const handleDeleteClick = (page: SitePage | OrphanPage) => {
    setPageToDelete(page);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!pageToDelete) return;
    
    try {
      await deletePage(pageToDelete.id);
      if ('title' in pageToDelete && 'slug' in pageToDelete) {
        setPages(pages.filter(p => p.id !== pageToDelete.id));
      } else {
        setOrphanPages(orphanPages.filter(p => p.id !== pageToDelete.id));
      }
      toast.success('Página eliminada correctamente');
    } catch (error) {
      console.error('Error deleting page:', error);
      toast.error('Error al eliminar la página');
    } finally {
      setDeleteDialogOpen(false);
      setPageToDelete(null);
    }
  };

  const handleEditPage = (page: SitePage) => {
    setSelectedPageId(page.id);
    setEditorOpen(true);
  };

  const handleViewPage = (page: SitePage | OrphanPage) => {
    if ('slug' in page) {
      // For system pages, we use their slug directly
      if (page.is_system_page) {
        window.open(`/${page.slug}`, '_blank');
      } else {
        window.open(`/${page.slug}`, '_blank');
      }
    } else {
      // For orphan pages, use the path
      window.open(page.path, '_blank');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500">Publicada</Badge>;
      case 'draft':
        return <Badge variant="outline">Borrador</Badge>;
      case 'archived':
        return <Badge variant="secondary">Archivada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Columnas para páginas del sistema
  const systemPagesColumns = [
    createColumn<SitePage>({
      accessorKey: 'title',
      header: 'Título',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{row.getValue('title')}</span>
          {row.original.is_system_page && (
            <Badge variant="outline" className="ml-2 text-xs">Sistema</Badge>
          )}
        </div>
      )
    }),
    createColumn<SitePage>({
      accessorKey: 'slug',
      header: 'Slug',
      cell: ({ getValue }) => (
        <code className="text-xs bg-muted px-1 py-0.5 rounded">
          /{getValue() as string}
        </code>
      )
    }),
    createColumn<SitePage>({
      accessorKey: 'layout',
      header: 'Diseño',
      cell: ({ getValue }) => (
        <Badge variant="outline" className="flex items-center gap-1">
          <Layout className="h-3 w-3" />
          {getValue() as string}
        </Badge>
      )
    }),
    createColumn<SitePage>({
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ getValue }) => getStatusBadge(getValue() as string)
    }),
    createColumn<SitePage>({
      accessorKey: 'updated_at',
      header: 'Actualización',
      cell: ({ getValue }) => (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-3 w-3" />
          {format(new Date(getValue() as string), 'dd/MM/yyyy HH:mm')}
        </div>
      )
    }),
    createColumn<SitePage>({
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => {
        const page = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleEditPage(page);
              }}
            >
              <PenSquare className="h-4 w-4" />
              <span className="sr-only">Editar</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleViewPage(page);
              }}
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">Ver</span>
            </Button>
            
            {!page.is_system_page && (
              <Button 
                variant="ghost" 
                size="icon"
                className="text-destructive hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(page);
                }}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Eliminar</span>
              </Button>
            )}
          </div>
        );
      }
    })
  ];

  // Columnas para páginas huérfanas
  const orphanPagesColumns = [
    createColumn<OrphanPage>({
      accessorKey: 'title',
      header: 'Título',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <FileQuestion className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{row.getValue('title')}</span>
          <Badge variant="outline" className="ml-2 text-xs bg-amber-100 text-amber-800">Huérfana</Badge>
        </div>
      )
    }),
    createColumn<OrphanPage>({
      accessorKey: 'path',
      header: 'Ruta',
      cell: ({ getValue }) => (
        <code className="text-xs bg-muted px-1 py-0.5 rounded">
          {getValue() as string}
        </code>
      )
    }),
    createColumn<OrphanPage>({
      accessorKey: 'access_count',
      header: 'Accesos',
      cell: ({ getValue }) => (
        <Badge variant="outline">{getValue() as number}</Badge>
      )
    }),
    createColumn<OrphanPage>({
      accessorKey: 'last_accessed',
      header: 'Último acceso',
      cell: ({ getValue }) => {
        const date = getValue() as string;
        return (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            {date ? format(new Date(date), 'dd/MM/yyyy HH:mm') : 'Nunca'}
          </div>
        );
      }
    }),
    createColumn<OrphanPage>({
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ getValue }) => getStatusBadge(getValue() as string)
    }),
    createColumn<OrphanPage>({
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => {
        const page = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleViewPage(page);
              }}
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">Ver</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="text-destructive hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick(page);
              }}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Eliminar</span>
            </Button>
          </div>
        );
      }
    })
  ];

  return (
    <AdminPageLayout title="Gestión de Páginas del Sistema">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Gestión de Páginas del Sistema</h1>

        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Input
            placeholder="Buscar páginas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />

          <Button onClick={() => navigate('/admin/settings/pages/create')}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Página
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full md:w-auto justify-start">
            <TabsTrigger value="system-pages" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Páginas del Sistema
            </TabsTrigger>
            <TabsTrigger value="orphan-pages" className="flex items-center">
              <FileQuestion className="h-4 w-4 mr-2" />
              Páginas Huérfanas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="system-pages">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Páginas del Sistema</CardTitle>
                <CardDescription>
                  Administra las páginas registradas en el sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdvancedDataTable
                  columns={systemPagesColumns}
                  data={pages.filter(page => 
                    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    page.slug.toLowerCase().includes(searchQuery.toLowerCase())
                  )}
                  emptyState={
                    <div className="flex flex-col items-center justify-center text-muted-foreground py-8">
                      <FileText className="h-8 w-8 mb-2" />
                      <p className="mb-2">No hay páginas disponibles</p>
                      <Button 
                        variant="link" 
                        onClick={() => navigate('/admin/settings/pages/create')}
                      >
                        Crear primera página
                      </Button>
                    </div>
                  }
                  onRowClick={(page) => handleEditPage(page as SitePage)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orphan-pages">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Páginas Huérfanas</CardTitle>
                <CardDescription>
                  Páginas sin referencias en la navegación principal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdvancedDataTable
                  columns={orphanPagesColumns}
                  data={orphanPages.filter(page => 
                    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    page.path.toLowerCase().includes(searchQuery.toLowerCase())
                  )}
                  emptyState={
                    <div className="flex flex-col items-center justify-center text-muted-foreground py-8">
                      <FileQuestion className="h-8 w-8 mb-2" />
                      <p className="mb-2">No se han detectado páginas huérfanas</p>
                    </div>
                  }
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <PageEditorDialog
        pageId={selectedPageId}
        isOpen={editorOpen}
        onOpenChange={setEditorOpen}
        onPageUpdated={() => {
          // Reload pages when a page is updated
          getAllPages().then(setPages);
        }}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar página?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La página 
              <span className="font-semibold mx-1">
                {pageToDelete ? ('title' in pageToDelete ? pageToDelete.title : '') : ''}
              </span> 
              será eliminada permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminPageLayout>
  );
};

export default SystemPagesManagement;
