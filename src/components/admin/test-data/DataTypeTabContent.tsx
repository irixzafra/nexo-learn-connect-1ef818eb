
import React, { useState } from 'react';
import { useTestData, TestDataType } from '@/contexts/TestDataContext';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/data-table';
import { DeleteTypeDataDialog } from './DeleteTypeDataDialog';

interface DataTypeTabContentProps {
  type: TestDataType;
  label: string;
}

export const DataTypeTabContent: React.FC<DataTypeTabContentProps> = ({ 
  type, 
  label 
}) => {
  const { testData, deleteAllOfType, deleteSelected, setSelectedItems } = useTestData();
  const items = testData[type];
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Select/deselect all items
  const handleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
      setSelectedItems(type, []);
    } else {
      const allIds = items.map(item => item.id);
      setSelectedIds(allIds);
      setSelectedItems(type, allIds);
    }
  };

  // Handle individual item selection
  const handleSelectItem = (id: string) => {
    setSelectedIds(prev => {
      const newSelection = prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id];
      
      // Update the context with the new selection
      setSelectedItems(type, newSelection);
      return newSelection;
    });
  };

  // Calculate if the header checkbox should be in an indeterminate state
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < items.length;
  const isAllSelected = items.length > 0 && selectedIds.length === items.length;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">
            {label} ({items.length})
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Checkbox 
              checked={isAllSelected}
              // Using ref to set indeterminate state
              ref={(checkbox) => {
                if (checkbox) {
                  checkbox.indeterminate = isIndeterminate;
                }
              }}
              onCheckedChange={handleSelectAll}
              aria-label="Seleccionar todos"
            />
            <span className="text-sm text-muted-foreground">
              {selectedIds.length} seleccionados
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {items.length > 0 ? (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 py-1 border-b last:border-0">
                <Checkbox 
                  checked={selectedIds.includes(item.id)}
                  onCheckedChange={() => handleSelectItem(item.id)}
                />
                <div className="flex-1 truncate">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{item.title || item.name || item.id}</span>
                    {item.createdAt && (
                      <span className="text-xs text-muted-foreground">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-muted-foreground">
            No hay datos de {label.toLowerCase()} disponibles
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2 border-t">
        <Button 
          variant="destructive" 
          size="sm"
          disabled={items.length === 0}
          onClick={() => setShowDeleteDialog(true)}
        >
          Eliminar todos
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          disabled={selectedIds.length === 0}
          onClick={() => deleteSelected(type, selectedIds)}
        >
          Eliminar seleccionados ({selectedIds.length})
        </Button>
      </CardFooter>
      
      <DeleteTypeDataDialog 
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => {
          deleteAllOfType(type);
          setShowDeleteDialog(false);
          setSelectedIds([]);
        }}
        dataType={label}
        count={items.length}
      />
    </Card>
  );
};
