
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import {
  FileText,
  Plus,
  Eye,
  EyeOff,
  PenSquare,
  Trash2,
  FileArchive,
  Clock,
  Layout,
  Tag
} from 'lucide-react';
import { SitePage, PageStatus } from '@/types/pages'; 
import { getAllPages, updatePageStatus, deletePage } from '@/features/admin/services/pagesService';
import { AdvancedDataTable } from '@/components/shared/AdvancedDataTable';
import { createColumn, createActionsColumn } from '@/components/shared/DataTableUtils';
import { format } from 'date-fns';
import PageEditorDialog from '@/components/admin/pages/PageEditorDialog';

const PageManagement: React.FC = () => {
  const [pages, setPages] = useState<SitePage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<SitePage | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState<string | undefined>(undefined);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const data = await getAllPages();
      setPages(data);
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast.error('Error al cargar las páginas');
    } finally {
      setLoading(false);
    }
  };

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

  const handleDeleteClick = (page: SitePage) => {
    setPageToDelete(page);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!pageToDelete) return;
    
    try {
      await deletePage(pageToDelete.id);
      setPages(pages.filter(p => p.id !== pageToDelete.id));
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

  const handleViewPage = (page: SitePage) => {
    // For system pages, we use their slug directly
    if (page.is_system_page) {
      window.open(`/${page.slug}`, '_blank');
    } else {
      window.open(`/${page.slug}`, '_blank');
    }
  };

  const getStatusBadge = (status: PageStatus) => {
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

  const columns = [
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
      cell: ({ getValue }) => getStatusBadge(getValue() as PageStatus)
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
    createActionsColumn<SitePage>(({ row }) => {
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
    })
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl">Gestión de Páginas</CardTitle>
            <CardDescription>
              Administra todas las páginas del sitio web
            </CardDescription>
          </div>
          <div>
            <Button onClick={() => navigate('/admin/settings/pages/create')}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Página
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <AdvancedDataTable
            columns={columns}
            data={pages}
            searchPlaceholder="Buscar por título, slug o estado..."
            exportFilename="paginas-sitio"
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

      <PageEditorDialog
        pageId={selectedPageId}
        isOpen={editorOpen}
        onOpenChange={setEditorOpen}
        onPageUpdated={fetchPages}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar página?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La página 
              <span className="font-semibold mx-1">
                {pageToDelete?.title}
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
    </div>
  );
};

export default PageManagement;
