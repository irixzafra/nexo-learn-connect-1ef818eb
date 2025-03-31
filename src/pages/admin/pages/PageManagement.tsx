
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
} from '@/components/ui/alert-dialog';
import {
  FileText,
  MoreHorizontal,
  Plus,
  Search,
  Eye,
  EyeOff,
  PenSquare,
  Trash2,
  FileArchive,
  Clock,
  Layout,
  Tag
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { SitePage, PageStatus } from '@/types/pages'; 
import { getAllPages, updatePageStatus, deletePage } from '@/features/admin/services/pagesService';

const PageManagement: React.FC = () => {
  const [pages, setPages] = useState<SitePage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<SitePage | null>(null);
  
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

  const filteredPages = pages.filter((page) => {
    const query = searchQuery.toLowerCase();
    return (
      page.title.toLowerCase().includes(query) ||
      page.slug.toLowerCase().includes(query) ||
      page.status.toLowerCase().includes(query)
    );
  });

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
          <div className="flex gap-4 items-center">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar páginas..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={() => navigate('/admin/settings/pages/create')}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Página
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>URL / Slug</TableHead>
                  <TableHead>Layout</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Actualización</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-24 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredPages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center">
                      {searchQuery ? (
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <FileText className="h-8 w-8 mb-2" />
                          <p>No se encontraron páginas para "{searchQuery}"</p>
                          <Button variant="link" onClick={() => setSearchQuery('')}>
                            Limpiar búsqueda
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <FileText className="h-8 w-8 mb-2" />
                          <p>No hay páginas disponibles</p>
                          <Button 
                            variant="link" 
                            onClick={() => navigate('/admin/settings/pages/create')}
                          >
                            Crear primera página
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPages.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        {page.is_system_page && (
                          <span title="Página del sistema" className="text-blue-500">
                            <Tag className="h-4 w-4" />
                          </span>
                        )}
                        {page.title}
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-1 py-0.5 rounded">
                          /{page.slug}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Layout className="h-3 w-3" />
                          {page.layout}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(page.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(page.updated_at).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Acciones</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem 
                              onClick={() => navigate(`/admin/settings/pages/edit/${page.id}`)}
                            >
                              <PenSquare className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            {page.status !== 'published' && (
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(page, 'published')}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Publicar
                              </DropdownMenuItem>
                            )}
                            
                            {page.status !== 'draft' && (
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(page, 'draft')}
                              >
                                <EyeOff className="h-4 w-4 mr-2" />
                                Pasar a borrador
                              </DropdownMenuItem>
                            )}
                            
                            {page.status !== 'archived' && (
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(page, 'archived')}
                              >
                                <FileArchive className="h-4 w-4 mr-2" />
                                Archivar
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuSeparator />
                            
                            {!page.is_system_page && (
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteClick(page)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

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
