
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

// Cell renderers for different column types
export function renderCellContent(value: any, type: string, options?: { label: string; value: string | number | boolean }[]) {
  switch (type) {
    case 'boolean':
      return value ? 
        <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">Yes</Badge> : 
        <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">No</Badge>;
    
    case 'date':
      return value ? format(new Date(value), 'dd/MM/yyyy HH:mm') : '—';
    
    case 'select':
      if (!options) return String(value || '');
      const option = options.find(opt => opt.value === value);
      return option?.label || String(value || '');
    
    case 'image':
      return value ? (
        <div className="h-8 w-8 rounded-full overflow-hidden bg-muted">
          <img src={value} alt="Preview" className="h-full w-full object-cover" />
        </div>
      ) : '—';
    
    default:
      return String(value || '');
  }
}

// Render actions dropdown
export function renderActions({
  item,
  itemId,
  hasEdit,
  hasDelete,
  onEdit,
  onDelete,
  renderCustomActions
}: {
  item: any;
  itemId: string | number;
  hasEdit?: boolean;
  hasDelete?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  renderCustomActions?: (data: any) => React.ReactNode;
}) {
  return (
    <div className="flex justify-end">
      {renderCustomActions ? (
        renderCustomActions(item)
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {hasEdit && (
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
            )}
            {hasDelete && (
              <DropdownMenuItem 
                className="text-red-600" 
                onClick={onDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
