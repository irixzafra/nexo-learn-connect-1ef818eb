
import React, { useState } from 'react';
import { SitePage, PageStatus } from '@/types/pages';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EnhancedDataTable } from '@/components/shared/EnhancedDataTable';
import { createColumn, createActionsColumn } from '@/components/shared/DataTableUtils';
import { 
  Edit, 
  Trash2, 
  Eye, 
  Archive, 
  CheckCircle, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { format } from 'date-fns';
import { updatePageStatus, deletePage } from '@/services/pagesService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface PageListProps {
  pages: SitePage[];
  onPageUpdated: () => void;
}

const PageList: React.FC<PageListProps> = ({ pages, onPageUpdated }) => {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<SitePage | null>(null);

  const getStatusBadge = (status: PageStatus) => {
    switch (status) {
      case 'published':
        return <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-200">Publicada</Badge>;
      case 'draft':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">Borrador</Badge>;
      case 'archived':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Archivada</Badge>;
      default:
        return null;
    }
  };

  const handleStatusChange = async (page: SitePage, newStatus: PageStatus) => {
    try {
      await updatePageStatus(page.id, newStatus);
      toast.success(`La página "${page.title}" ha sido actualizada a estado: ${newStatus}`);
      onPageUpdated();
    } catch (error) {
      toast.error('Error al actualizar el estado de la página');
      console.error(error);
    }
  };

  const handleDeleteClick = (page: SitePage) => {
    setPageToDelete(page);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!pageToDelete) return;
    
    try {
      await deletePage(pageToDelete.id);
      toast.success(`La página "${pageToDelete.title}" ha sido eliminada`);
      setDeleteDialogOpen(false);
      setPageToDelete(null);
      onPageUpdated();
    } catch (error) {
      toast.error('Error al eliminar la página');
      console.error(error);
    }
  };

  const handleEditPage = (page: SitePage) => {
    navigate(`/admin/settings/pages/edit/${page.id}`);
  };

  const handleViewPage = (page: SitePage) => {
    // For system pages, we use their slug directly
    if (page.is_system_page) {
      window.open(`/${page.slug}`, '_blank');
    } else {
      window.open(`/pages/${page.slug}`, '_blank');
    }
  };

  const columns = [
    createColumn<SitePage>({
      accessorKey: 'title',
      header: 'Título',
      cell: ({ getValue }) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{getValue() as string}</span>
          {pages.find(p => p.title === getValue())?.is_system_page && (
            <Badge variant="outline" className="ml-2 text-xs">Sistema</Badge>
          )}
        </div>
      )
    }),
    createColumn<SitePage>({
      accessorKey: 'slug',
      header: 'Slug',
    }),
    createColumn<SitePage>({
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ getValue }) => getStatusBadge(getValue() as PageStatus)
    }),
    createColumn<SitePage>({
      accessorKey: 'updated_at',
      header: 'Última actualización',
      cell: ({ getValue }) => format(new Date(getValue() as string), 'dd/MM/yyyy HH:mm')
    }),
    createActionsColumn<SitePage>(({ row }) => {
      const page = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <Edit className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEditPage(page)}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleViewPage(page)}>
              <Eye className="mr-2 h-4 w-4" />
              <span>Ver página</span>
            </DropdownMenuItem>
            
            {page.status !== 'published' && (
              <DropdownMenuItem onClick={() => handleStatusChange(page, 'published')}>
                <CheckCircle className="mr-2 h-4 w-4" />
                <span>Publicar</span>
              </DropdownMenuItem>
            )}
            
            {page.status !== 'draft' && (
              <DropdownMenuItem onClick={() => handleStatusChange(page, 'draft')}>
                <AlertCircle className="mr-2 h-4 w-4" />
                <span>Cambiar a borrador</span>
              </DropdownMenuItem>
            )}
            
            {page.status !== 'archived' && (
              <DropdownMenuItem onClick={() => handleStatusChange(page, 'archived')}>
                <Archive className="mr-2 h-4 w-4" />
                <span>Archivar</span>
              </DropdownMenuItem>
            )}
            
            {!page.is_system_page && (
              <DropdownMenuItem 
                className="text-red-600" 
                onClick={() => handleDeleteClick(page)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Eliminar</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    })
  ];

  return (
    <div>
      <EnhancedDataTable 
        columns={columns} 
        data={pages} 
        searchPlaceholder="Buscar páginas..."
        searchColumn="title"
        exportFilename="paginas-del-sitio"
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente la página "{pageToDelete?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PageList;
