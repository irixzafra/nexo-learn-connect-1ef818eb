
import React from 'react';
import { useTestData, TestDataType } from '@/contexts/TestDataContext';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import { DeleteTypeDataDialog } from './DeleteTypeDataDialog';
import { Checkbox } from '@/components/ui/checkbox';

interface DataTypeTabContentProps {
  type: TestDataType;
  label: string;
}

export const DataTypeTabContent: React.FC<DataTypeTabContentProps> = ({ type, label }) => {
  const { 
    testData, 
    deleteTestDataItem, 
    selectedItems, 
    selectItem, 
    selectAllItems,
    deleteSelectedItems 
  } = useTestData();
  
  const items = testData[type];
  const hasItems = items.length > 0;
  
  // Check if all items are selected
  const allSelected = hasItems && selectedItems[type].length === items.length;
  
  // Check if some but not all items are selected
  const someSelected = selectedItems[type].length > 0 && !allSelected;

  const handleToggleSelectAll = () => {
    selectAllItems(type, !allSelected);
  };

  const handleDeleteSelected = () => {
    deleteSelectedItems(type);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                {hasItems && (
                  <Checkbox 
                    checked={allSelected}
                    indeterminate={someSelected}
                    onCheckedChange={handleToggleSelectAll}
                  />
                )}
              </TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Fecha creación</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!hasItems ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No hay datos de prueba para {label.toLowerCase()}
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedItems[type].includes(item.id)}
                      onCheckedChange={(checked) => selectItem(type, item.id, !!checked)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTestDataItem(type, item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {hasItems && (
        <div className="mt-4 flex justify-between">
          {selectedItems[type].length > 0 && (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleDeleteSelected}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Eliminar seleccionados ({selectedItems[type].length})
            </Button>
          )}
          <div className="ml-auto">
            <DeleteTypeDataDialog type={type} label={label} />
          </div>
        </div>
      )}
    </>
  );
};
