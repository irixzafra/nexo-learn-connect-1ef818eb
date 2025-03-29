
import React, { useState } from 'react';
import { useTestData, TestDataType } from '@/contexts/test-data';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from '@/components/ui/checkbox';
import { DeleteTypeDataDialog } from './DeleteTypeDataDialog';
import { Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { MoreDropdownMenu } from './MoreDropdownMenu';

interface DataTypeTabContentProps {
  type: TestDataType;
  label: string;
}

export const DataTypeTabContent: React.FC<DataTypeTabContentProps> = ({ type, label }) => {
  const { testData, selectItem, selectedItems, deleteTestDataItem, deleteSelectedItems, selectAllItems } = useTestData();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);

  const data = testData[type];
  const selectedItemIds = selectedItems[type];
  const allSelected = data.length > 0 && selectedItemIds.length === data.length;

  const handleSelectAll = (checked: boolean) => {
    selectAllItems(type, checked);
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    selectItem(type, id, checked);
  };

  const handleDeleteItem = (id: string) => {
    deleteTestDataItem(type, id);
  };

  const handleDeleteSelected = () => {
    deleteSelectedItems(type);
  };

  const toggleColumnVisibility = (field: string) => {
    setVisibleColumns(prev => {
      if (prev.includes(field)) {
        return prev.filter(col => col !== field);
      } else {
        return [...prev, field];
      }
    });
  };

  const columns: GridColDef[] = React.useMemo(() => {
    if (data.length === 0) {
      return [];
    }

    const firstItem = data[0].data;
    const keys = Object.keys(firstItem);

    const initialVisibleColumns = keys.slice(0, 3);
    setVisibleColumns(initialVisibleColumns);

    return [
      { 
        field: 'select', 
        headerName: '', 
        width: 60, 
        sortable: false,
        renderHeader: () => (
          <Checkbox
            checked={allSelected}
            onCheckedChange={(checked) => handleSelectAll(!!checked)}
            aria-label="Select all"
          />
        ),
        renderCell: (params) => (
          <Checkbox
            checked={selectedItemIds.includes(params.row.id)}
            onCheckedChange={(checked) => handleSelectItem(params.row.id, !!checked)}
            aria-label={`Select row ${params.row.id}`}
          />
        ),
      },
      { field: 'name', headerName: 'Nombre', width: 200 },
      { field: 'createdAt', headerName: 'Creado', width: 150 },
      ...keys.map(key => ({
        field: key,
        headerName: key,
        width: 200,
        hide: !initialVisibleColumns.includes(key),
        renderCell: (params: GridRenderCellParams) => (
          <div className="whitespace-nowrap overflow-x-auto">
            {JSON.stringify(params.value)}
          </div>
        ),
      })),
      {
        field: 'actions',
        headerName: 'Acciones',
        width: 120,
        sortable: false,
        renderCell: (params) => (
          <div className="flex items-center gap-2">
            <MoreDropdownMenu>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Detalles de {label.slice(0, -1).toLowerCase()}</DialogTitle>
                    <DialogDescription>
                      <pre className="mt-4 rounded-md bg-muted/50 p-4 font-mono text-sm">
                        {JSON.stringify(params.row, null, 2)}
                      </pre>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(params.row.id)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </Button>
            </MoreDropdownMenu>
          </div>
        ),
      },
    ];
  }, [testData, type, selectedItems, allSelected, visibleColumns, selectItem, selectAllItems, deleteTestDataItem]);

  const rows = data.map(item => ({
    id: item.id,
    name: item.name,
    createdAt: item.createdAt,
    ...item.data,
  }));

  return (
    <div className="w-full">
      {data.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <Button variant="destructive" size="sm" onClick={handleDeleteSelected} disabled={selectedItemIds.length === 0}>
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar seleccionados ({selectedItemIds.length})
            </Button>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4 mr-2" />
                    Columnas
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Mostrar / Ocultar columnas</DialogTitle>
                    <DialogDescription>
                      Selecciona las columnas que quieres ver en la tabla.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-2 mt-4">
                    {columns.slice(3, -1).map(col => (
                      <label key={col.field} className="flex items-center space-x-2">
                        <Checkbox
                          checked={!col.hide}
                          onCheckedChange={() => toggleColumnVisibility(col.field)}
                        />
                        <span>{col.headerName}</span>
                      </label>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="destructive" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar todos
              </Button>
            </div>
          </div>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5, 10, 20]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </div>
        </>
      ) : (
        <div className="text-center p-4 border rounded-md bg-muted/20 text-muted-foreground">
          No hay datos de tipo {label.toLowerCase()} generados.
        </div>
      )}

      <DeleteTypeDataDialog 
        type={type} 
        label={label}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </div>
  );
};
