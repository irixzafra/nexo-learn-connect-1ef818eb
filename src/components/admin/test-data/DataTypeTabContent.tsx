
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
import { 
  Trash2, 
  Check, 
  Calendar, 
  FileText,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { dataTypeLabels } from './DataTypeSelector';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';

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

  // Calculate if the header checkbox should be in an indeterminate state
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < filteredItems.length;
  const isAllSelected = filteredItems.length > 0 && selectedIds.length === filteredItems.length;

  // Create a ref for the checkbox
  const checkboxRef = useRef<HTMLButtonElement>(null);

  // Update indeterminate state using a side effect
  React.useEffect(() => {
    if (checkboxRef.current) {
      // We need to use DOM API to set indeterminate state
      (checkboxRef.current as any).indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  return (
    <Card className="shadow-sm border-muted">
      <CardHeader className="pb-2 bg-muted/10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
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
                checked={isAllSelected}
                ref={checkboxRef}
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
          <div className="max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]"></TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead className="hidden md:table-cell">ID</TableHead>
                  <TableHead className="hidden sm:table-cell">Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow 
                    key={item.id}
                    className={cn(
                      selectedIds.includes(item.id) && "bg-muted/40"
                    )}
                  >
                    <TableCell className="py-2">
                      <Checkbox 
                        checked={selectedIds.includes(item.id)}
                        onCheckedChange={() => handleSelectItem(item.id)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      />
                    </TableCell>
                    <TableCell className="py-2 font-medium">{item.name}</TableCell>
                    <TableCell className="py-2 hidden md:table-cell text-xs text-muted-foreground truncate max-w-[150px]">
                      {item.id}
                    </TableCell>
                    <TableCell className="py-2 hidden sm:table-cell text-xs text-muted-foreground whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="py-10 text-center text-muted-foreground flex flex-col items-center gap-2">
            <FileText className="h-8 w-8 text-muted-foreground/50" />
            {searchTerm ? (
              <p>No se encontraron datos que coincidan con "{searchTerm}"</p>
            ) : (
              <p>No hay datos de {label.toLowerCase()} disponibles</p>
            )}
          </div>
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
