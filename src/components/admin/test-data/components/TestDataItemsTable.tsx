
import React, { useRef } from 'react';
import { useTestData, TestDataType } from '@/contexts/test-data';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestDataItemsTableProps {
  type: TestDataType;
  filteredItems: any[];
  selectedIds: string[];
  onSelectItem: (id: string) => void;
  onSelectAll: () => void;
}

export const TestDataItemsTable: React.FC<TestDataItemsTableProps> = ({
  type,
  filteredItems,
  selectedIds,
  onSelectItem,
  onSelectAll
}) => {
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

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <div className="max-h-[calc(100vh-400px)] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox 
                checked={isAllSelected}
                ref={checkboxRef}
                onCheckedChange={onSelectAll}
                aria-label="Seleccionar todos"
                className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
            </TableHead>
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
                  onCheckedChange={() => onSelectItem(item.id)}
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
  );
};
