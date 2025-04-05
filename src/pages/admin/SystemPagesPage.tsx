
import React, { useState, useRef, useCallback } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { toast } from 'sonner';
import { GlobalDataTable, TableDrawer, TableColumn, GlobalTableRef } from '@/components/global-table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useSupabaseTable } from '@/hooks/use-supabase-table';
import PageEditorDrawer from '@/components/admin/pages/PageEditorDrawer';
import { PageData } from '@/components/admin/pages/types';

// Define types for page data
interface SitePage {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  layout: string;
  is_system_page: boolean;
  created_at: string;
  updated_at: string;
  meta_description?: string;
  content?: any;
  description?: string;
  path?: string;
  category?: string;
  component?: string;
  accessType?: 'public' | 'authenticated' | 'admin' | 'student' | 'instructor';
  navigation?: string;
}

const SystemPagesPage: React.FC = () => {
  const tableRef = useRef<GlobalTableRef>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);

  // Use our custom hook to manage table data
  const {
    data: pages,
    isLoading,
    create,
    update,
    remove
  } = useSupabaseTable<SitePage>({
    tableName: 'site_pages',
    orderBy: { column: 'updated_at', ascending: false }
  });

  // Define columns for the pages table
  const columns: TableColumn<SitePage>[] = [
    {
      id: 'title',
      header: 'Título',
      accessorKey: 'title',
      editable: true,
      required: true,
      type: 'text',
      cell: ({ row }) => (
        <div>
          <div className="font-medium flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            {row.original.title}
            {row.original.is_system_page && (
              <Badge variant="outline" className="ml-2 text-xs">System</Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground truncate max-w-[300px]">
            {row.original.slug || row.original.path}
          </div>
        </div>
      )
    },
    {
      id: 'slug',
      header: 'Ruta',
      accessorKey: 'slug',
      editable: true,
      required: true,
      type: 'text',
      cell: ({ row }) => (
        <code className="text-xs bg-muted px-1 py-0.5 rounded">
          /{row.original.slug || row.original.path}
        </code>
      )
    },
    {
      id: 'status',
      header: 'Estado',
      accessorKey: 'status',
      editable: true,
      required: true,
      type: 'select',
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Publicado', value: 'published' },
        { label: 'Archivado', value: 'archived' }
      ],
      cell: ({ row }) => {
        const status = row.original.status;
        let variant: 'default' | 'secondary' | 'outline' | 'destructive' = 'default';
        let label = 'Publicado';
        
        if (status === 'draft') {
          variant = 'secondary';
          label = 'Borrador';
        }
        if (status === 'archived') {
          variant = 'outline';
          label = 'Archivado';
        }
        
        return <Badge variant={variant}>{label}</Badge>;
      }
    },
    {
      id: 'category',
      header: 'Categoría',
      accessorKey: 'category',
      editable: true,
      type: 'text',
    },
    {
      id: 'layout',
      header: 'Diseño',
      accessorKey: 'layout',
      editable: true,
      required: true,
      type: 'select',
      options: [
        { label: 'Predeterminado', value: 'default' },
        { label: 'Landing', value: 'landing' },
        { label: 'Con sidebar', value: 'sidebar' }
      ]
    },
    {
      id: 'is_system_page',
      header: 'Sistema',
      accessorKey: 'is_system_page',
      editable: true,
      type: 'boolean',
      cell: ({ row }) => (
        row.original.is_system_page ? 
          <Badge variant="outline">Sistema</Badge> : 
          <Badge variant="outline" className="bg-muted/50">Custom</Badge>
      )
    },
    {
      id: 'updated_at',
      header: 'Actualizado',
      accessorKey: 'updated_at',
      type: 'date',
      editable: false
    }
  ];

  // Handle edit page
  const handleEditPage = useCallback((page: SitePage) => {
    // Convert to PageData format for the drawer
    const pageData: PageData = {
      id: page.id,
      title: page.title,
      path: page.slug || page.path || '',
      description: page.description || page.meta_description || '',
      status: page.status,
      category: page.category || '',
      importance: 'medium',
      updated: new Date(page.updated_at).toLocaleDateString(),
      component: page.component || '',
      accessType: page.accessType || 'public',
      content: page.content,
      navigation: page.navigation || 'none',
      permissions: {
        canView: ['all'],
        canEdit: ['admin'],
        canDelete: ['admin'],
        canPublish: ['admin']
      }
    };
    
    setSelectedPage(pageData);
    setIsDrawerOpen(true);
  }, []);

  // Handle create page
  const handleCreatePage = () => {
    const newPage: PageData = {
      title: 'Nueva Página',
      path: '',
      description: '',
      status: 'draft',
      category: 'general',
      accessType: 'public',
      navigation: 'none',
      content: {
        blocks: []
      }
    };
    
    setSelectedPage(newPage);
    setIsDrawerOpen(true);
  };

  // Handle view page
  const handleViewPage = (page: SitePage) => {
    // Implementation to view the page
    const baseUrl = window.location.origin;
    const pageUrl = page.is_system_page
      ? `${baseUrl}/${page.slug || page.path}`
      : `${baseUrl}/pages/${page.slug || page.path}`;
      
    window.open(pageUrl, '_blank');
  };

  // Handle delete page confirmation
  const handleDeleteConfirm = async () => {
    if (!pageToDelete) return;
    
    try {
      await remove(pageToDelete);
      setIsDeleteDialogOpen(false);
      setPageToDelete(null);
      toast.success("Página eliminada correctamente");
      
      // Refresh the table data
      if (tableRef.current) {
        tableRef.current.refresh();
      }
    } catch (error) {
      toast.error("Error al eliminar la página");
    }
  };

  // Handle form submission (create/update)
  const handleSubmit = async (formData: Partial<SitePage>) => {
    try {
      if (selectedPage?.id) {
        // Update existing page
        await update({ id: selectedPage.id, data: formData });
        toast.success("Página actualizada correctamente");
      } else {
        // Create new page with default values
        const newPageData = {
          ...formData,
          content: formData.content || { blocks: [] },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        await create(newPageData);
        toast.success("Página creada correctamente");
      }
      
      setIsDrawerOpen(false);
      
      // Refresh the table data
      if (tableRef.current) {
        tableRef.current.refresh();
      }
    } catch (error) {
      console.error('Error saving page:', error);
      toast.error(`Error al ${selectedPage?.id ? 'actualizar' : 'crear'} la página`);
    }
  };

  // Handle save for PageEditorDrawer
  const handleSavePageEditor = async (updatedPage: PageData) => {
    try {
      // Convert PageData to SitePage format for database update
      const pageData: Partial<SitePage> = {
        title: updatedPage.title,
        slug: updatedPage.path,
        description: updatedPage.description,
        status: updatedPage.status as 'draft' | 'published' | 'archived',
        category: updatedPage.category,
        component: updatedPage.component,
        accessType: updatedPage.accessType,
        content: updatedPage.content,
        navigation: updatedPage.navigation,
        updated_at: new Date().toISOString()
      };
      
      // Update the database
      if (updatedPage.id) {
        await update({ id: updatedPage.id, data: pageData });
      } else {
        await create({
          ...pageData,
          is_system_page: false,
          created_at: new Date().toISOString(),
          layout: 'default'
        });
      }
      
      toast.success("Cambios guardados correctamente");
      
      // Refresh the table data
      if (tableRef.current) {
        tableRef.current.refresh();
      }
      
      setIsDrawerOpen(false);
    } catch (error) {
      console.error('Error updating page:', error);
      toast.error("Error al guardar los cambios");
      throw error;
    }
  };

  // Custom actions renderer
  const renderActions = (page: SitePage) => (
    <div className="flex space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          handleViewPage(page);
        }}
        title="Ver página"
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          handleEditPage(page);
        }}
        title="Editar página"
      >
        <Edit className="h-4 w-4" />
      </Button>
      {!page.is_system_page && (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            setPageToDelete(page.id);
            setIsDeleteDialogOpen(true);
          }}
          title="Eliminar página"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );

  return (
    <div className="container mx-auto py-4">
      <PageHeader
        title="Gestión de Páginas"
        description="Administra las páginas y la navegación del sistema"
      />
      
      <div className="mt-6">
        <Card>
          <CardContent className="pt-6">
            <GlobalDataTable
              ref={tableRef}
              title="Páginas"
              description="Visualiza y gestiona todas las páginas del sistema"
              data={pages}
              columns={columns}
              searchPlaceholder="Buscar páginas..."
              searchColumn="title"
              exportFilename="paginas-sistema"
              createButtonLabel="Crear Página"
              onCreate={handleCreatePage}
              onRowClick={handleEditPage}
              renderCustomActions={renderActions}
            />
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Page Editor Drawer */}
      <PageEditorDrawer
        page={selectedPage}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        onSave={handleSavePageEditor}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La página será eliminada permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SystemPagesPage;
