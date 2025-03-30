
import React, { useState } from 'react';
import { useTestData, TestDataType } from '@/contexts/test-data';
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
import { typeIcons } from './utils/dataTypeUtils';
import { Trash2, Check, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { TestDataItemsTable } from './components/TestDataItemsTable';
import { EmptyDataState } from './components/EmptyDataState';

interface DataTypeTabContentProps {
  type: TestDataType;
  label: string;
}

export const DataTypeTabContent: React.FC<DataTypeTabContentProps> = ({ 
  type, 
  label 
}) => {
  const { testData, deleteSelectedItems, selectedItems, selectItem, selectAllItems } = useTestData();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Get items for this type
  const items = testData[type];
  
  // Filter items based on search term
  const filteredItems = searchTerm 
    ? items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : items;

  // Using the selected items directly from context
  const selectedIds = selectedItems[type];

  // Select/deselect all items
  const handleSelectAll = () => {
    selectAllItems(type, selectedIds.length !== filteredItems.length);
  };

  // Handle individual item selection
  const handleSelectItem = (id: string) => {
    selectItem(type, id, !selectedIds.includes(id));
  };

  return (
    <Card className="shadow-sm border-muted">
      <CardHeader className="pb-2 bg-muted/10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            {typeIcons[type]}
            {label} ({items.length})
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                className="pl-8 h-9 w-full sm:w-[180px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={filteredItems.length > 0 && selectedIds.length === filteredItems.length}
                onCheckedChange={handleSelectAll}
                aria-label="Seleccionar todos"
                className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {selectedIds.length} seleccionados
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {filteredItems.length > 0 ? (
          <TestDataItemsTable
            type={type}
            filteredItems={filteredItems}
            selectedIds={selectedIds}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
          />
        ) : (
          <EmptyDataState
            type={type}
            label={label}
            searchTerm={searchTerm}
          />
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-3 pb-3 border-t bg-muted/10 gap-2 flex-wrap">
        <Button 
          variant="destructive" 
          size="sm"
          disabled={items.length === 0}
          onClick={() => setShowDeleteDialog(true)}
          className="gap-1"
        >
          <Trash2 className="h-4 w-4" />
          <span className="hidden sm:inline">Eliminar todos</span>
          <span className="sm:hidden">Todos</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          disabled={selectedIds.length === 0}
          onClick={() => deleteSelectedItems(type)}
          className="gap-1"
        >
          <Check className="h-4 w-4" />
          <span className="hidden sm:inline">Eliminar seleccionados</span>
          <span className="sm:hidden">Seleccionados</span>
          <span className="ml-1">({selectedIds.length})</span>
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
