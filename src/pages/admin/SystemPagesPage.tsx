
import React, { useState, useRef } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { toast } from 'sonner';
import { GlobalDataTable, TableDrawer, TableColumn, GlobalTableRef } from '@/components/global-table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useSupabaseTable } from '@/hooks/use-supabase-table';

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
}

const SystemPagesPage: React.FC = () => {
  const tableRef = useRef<GlobalTableRef>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<SitePage | null>(null);
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
      header: 'Title',
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
            {row.original.slug}
          </div>
        </div>
      )
    },
    {
      id: 'slug',
      header: 'Slug',
      accessorKey: 'slug',
      editable: true,
      required: true,
      type: 'text',
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      editable: true,
      required: true,
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' }
      ],
      cell: ({ row }) => {
        const status = row.original.status;
        let variant: 'default' | 'secondary' | 'outline' | 'destructive' = 'default';
        
        if (status === 'draft') variant = 'secondary';
        if (status === 'archived') variant = 'outline';
        
        return <Badge variant={variant}>{status}</Badge>;
      }
    },
    {
      id: 'layout',
      header: 'Layout',
      accessorKey: 'layout',
      editable: true,
      required: true,
      type: 'select',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Landing', value: 'landing' },
        { label: 'Sidebar', value: 'sidebar' }
      ]
    },
    {
      id: 'is_system_page',
      header: 'System Page',
      accessorKey: 'is_system_page',
      editable: true,
      type: 'boolean'
    },
    {
      id: 'meta_description',
      header: 'Meta Description',
      accessorKey: 'meta_description',
      editable: true,
      type: 'text',
      meta: { multiline: true },
      hidden: true
    },
    {
      id: 'updated_at',
      header: 'Updated',
      accessorKey: 'updated_at',
      type: 'date',
      editable: false
    }
  ];

  // Handle edit page
  const handleEditPage = (page: SitePage) => {
    setSelectedPage(page);
    setIsDrawerOpen(true);
  };

  // Handle create page
  const handleCreatePage = () => {
    setSelectedPage(null);
    setIsDrawerOpen(true);
  };

  // Handle view page
  const handleViewPage = (page: SitePage) => {
    // Implementation to view the page
    const baseUrl = window.location.origin;
    const pageUrl = page.is_system_page
      ? `${baseUrl}/${page.slug}`
      : `${baseUrl}/pages/${page.slug}`;
      
    window.open(pageUrl, '_blank');
  };

  // Handle delete page confirmation
  const handleDeleteConfirm = async () => {
    if (!pageToDelete) return;
    
    try {
      await remove(pageToDelete);
      setIsDeleteDialogOpen(false);
      setPageToDelete(null);
      
      // Refresh the table data
      if (tableRef.current) {
        tableRef.current.refresh();
      }
    } catch (error) {
      toast.error("Failed to delete page");
    }
  };

  // Handle form submission (create/update)
  const handleSubmit = async (formData: SitePage) => {
    try {
      if (selectedPage) {
        // Update existing page
        await update({ id: selectedPage.id, data: formData });
      } else {
        // Create new page with default values
        const newPageData = {
          ...formData,
          content: formData.content || { blocks: [] },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        await create(newPageData);
      }
      
      setIsDrawerOpen(false);
      
      // Refresh the table data
      if (tableRef.current) {
        tableRef.current.refresh();
      }
    } catch (error) {
      console.error('Error saving page:', error);
      toast.error(`Failed to ${selectedPage ? 'update' : 'create'} page`);
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
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );

  return (
    <div className="container mx-auto py-4">
      <PageHeader
        title="System Pages"
        description="Manage system pages and static content"
      />
      
      <div className="mt-6">
        <Card>
          <CardContent className="pt-6">
            <GlobalDataTable
              ref={tableRef}
              title="Pages"
              description="View and manage all pages in the system"
              data={pages}
              columns={columns}
              searchPlaceholder="Search pages..."
              searchColumn="title"
              exportFilename="system-pages"
              createButtonLabel="Create Page"
              onCreate={handleCreatePage}
              onRowClick={handleEditPage}
              renderCustomActions={renderActions}
            />
          </CardContent>
        </Card>
      </div>

      {/* Edit/Create Drawer */}
      <TableDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedPage ? 'Edit Page' : 'Create Page'}
        data={selectedPage}
        columns={columns}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SystemPagesPage;
