
import React, { useState, useRef } from 'react';
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
import { DeleteTypeDataDialog } from './DeleteTypeDataDialog';
import { Trash2, Check, Calendar, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataTypeTabContentProps {
  type: TestDataType;
  label: string;
}

export const DataTypeTabContent: React.FC<DataTypeTabContentProps> = ({ 
  type, 
  label 
}) => {
  const { testData, clearTestData, deleteSelectedItems, selectedItems, selectItem, selectAllItems } = useTestData();
  const items = testData[type];
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Using the selected items directly from context
  const selectedIds = selectedItems[type];

  // Select/deselect all items
  const handleSelectAll = () => {
    selectAllItems(type, selectedIds.length !== items.length);
  };

  // Handle individual item selection
  const handleSelectItem = (id: string) => {
    selectItem(type, id, !selectedIds.includes(id));
  };

  // Calculate if the header checkbox should be in an indeterminate state
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < items.length;
  const isAllSelected = items.length > 0 && selectedIds.length === items.length;

  // Create a ref for the checkbox
  const checkboxRef = useRef<HTMLButtonElement>(null);

  // Update indeterminate state using a side effect
  React.useEffect(() => {
    if (checkboxRef.current) {
      // We need to use DOM API to set indeterminate state
      // This is a workaround since indeterminate is not a standard prop in React
      (checkboxRef.current as any).indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  return (
    <Card className="shadow-sm border-muted">
      <CardHeader className="pb-2 bg-muted/10">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            {label} ({items.length})
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Checkbox 
              checked={isAllSelected}
              ref={checkboxRef}
              onCheckedChange={handleSelectAll}
              aria-label="Seleccionar todos"
              className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            />
            <span className="text-sm text-muted-foreground">
              {selectedIds.length} seleccionados
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {items.length > 0 ? (
          <div className="max-h-96 overflow-y-auto divide-y divide-muted">
            {items.map((item) => (
              <div 
                key={item.id} 
                className={cn(
                  "flex items-center space-x-3 p-3 hover:bg-muted/30 transition-colors",
                  selectedIds.includes(item.id) && "bg-muted/20"
                )}
              >
                <Checkbox 
                  checked={selectedIds.includes(item.id)}
                  onCheckedChange={() => handleSelectItem(item.id)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <div className="flex-1 truncate">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{item.name || item.id}</span>
                    {item.createdAt && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-muted-foreground flex flex-col items-center gap-2">
            <FileText className="h-8 w-8 text-muted-foreground/50" />
            <p>No hay datos de {label.toLowerCase()} disponibles</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-3 pb-3 border-t bg-muted/10 gap-2">
        <Button 
          variant="destructive" 
          size="sm"
          disabled={items.length === 0}
          onClick={() => setShowDeleteDialog(true)}
          className="gap-1"
        >
          <Trash2 className="h-4 w-4" />
          Eliminar todos
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          disabled={selectedIds.length === 0}
          onClick={() => deleteSelectedItems(type)}
          className="gap-1"
        >
          <Check className="h-4 w-4" />
          Eliminar seleccionados ({selectedIds.length})
        </Button>
      </CardFooter>
      
      <DeleteTypeDataDialog 
        type={type}
        label={label}
        onOpenChange={setShowDeleteDialog}
        open={showDeleteDialog}
      />
    </Card>
  );
};
