
import React, { useState } from 'react';
import { toast } from 'sonner';
import { AdvancedDataTable } from './AdvancedDataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus, Loader2, Eye, Edit, Trash2 } from 'lucide-react';
import { EntityDrawer } from './EntityDrawer';

interface CrudTableProps<T> {
  title: string;
  description?: string;
  entityName: string;
  data: T[];
  columns: any[];
  isLoading: boolean;
  onCreate: () => void;
  onEdit: (item: T) => void;
  onDelete: (id: string) => Promise<void>;
  onView?: (item: T) => void;
  idField?: keyof T;
  renderForm: (props: { data: T | null; onChange: (data: T) => void }) => React.ReactNode;
  canCreate?: boolean;
  canEdit?: boolean;
  canView?: boolean;
  canDelete?: boolean;
  searchPlaceholder?: string;
  searchColumn?: string;
  exportFilename?: string;
  emptyState?: React.ReactNode;
}

export function CrudTable<T extends Record<string, any>>({
  title,
  description,
  entityName,
  data,
  columns,
  isLoading,
  onCreate,
  onEdit,
  onDelete,
  onView,
  idField = 'id' as keyof T,
  renderForm,
  canCreate = true,
  canEdit = true,
  canView = false,
  canDelete = true,
  searchPlaceholder,
  searchColumn = 'name',
  exportFilename,
  emptyState
}: CrudTableProps<T>) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreate = () => {
    onCreate();
    setIsDrawerOpen(true);
  };

  const handleEdit = (item: T) => {
    setSelectedItem(item);
    onEdit(item);
    setIsDrawerOpen(true);
  };

  const handleView = (item: T) => {
    if (onView) {
      onView(item);
    }
  };

  const handleDeleteClick = (item: T) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    
    try {
      setIsDeleting(true);
      await onDelete(String(itemToDelete[idField]));
      setIsDeleteDialogOpen(false);
      toast.success(`${entityName} eliminado correctamente`);
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error(`Error al eliminar ${entityName.toLowerCase()}`);
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const renderActions = (item: T) => (
    <div className="flex space-x-2">
      {canView && onView && (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            handleView(item);
          }}
          title={`Ver ${entityName.toLowerCase()}`}
        >
          <Eye className="h-4 w-4" />
        </Button>
      )}
      
      {canEdit && (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(item);
          }}
          title={`Editar ${entityName.toLowerCase()}`}
        >
          <Edit className="h-4 w-4" />
        </Button>
      )}
      
      {canDelete && (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteClick(item);
          }}
          title={`Eliminar ${entityName.toLowerCase()}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );

  const tableColumns = [
    ...columns,
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }: any) => renderActions(row.original)
    }
  ];

  // Create a function that returns a Promise to satisfy TypeScript
  const handleDrawerSave = async (data: T): Promise<void> => {
    // This is just a placeholder - the actual save functionality
    // will be managed by the parent component through the form
    return Promise.resolve();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {canCreate && (
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              {`Nuevo ${entityName}`}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <AdvancedDataTable
            columns={tableColumns}
            data={data}
            searchPlaceholder={searchPlaceholder || `Buscar ${entityName.toLowerCase()}...`}
            searchColumn={searchColumn}
            exportFilename={exportFilename || entityName.toLowerCase().replace(/\s+/g, '-')}
            onRowClick={canEdit ? handleEdit : undefined}
            emptyState={
              isLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                  <p className="text-muted-foreground">Cargando...</p>
                </div>
              ) : emptyState || (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-muted-foreground mb-2">No hay {entityName.toLowerCase()}s disponibles</p>
                  {canCreate && (
                    <Button variant="outline" onClick={handleCreate}>
                      <Plus className="mr-2 h-4 w-4" />
                      Crear {entityName.toLowerCase()}
                    </Button>
                  )}
                </div>
              )
            }
          />
        </CardContent>
      </Card>

      <EntityDrawer
        title={selectedItem ? `Editar ${entityName}` : `Crear ${entityName}`}
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        entity={selectedItem}
        onSave={handleDrawerSave}
      >
        {renderForm({
          data: selectedItem,
          onChange: () => {}
        })}
      </EntityDrawer>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El {entityName.toLowerCase()} será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
