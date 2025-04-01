
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useEditMode } from '@/contexts/EditModeContext';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, MoveVertical } from 'lucide-react';
import SectionInsert from './SectionInsert';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export interface DraggableContentProps {
  items: {
    id: string;
    order: number;
    content: React.ReactNode;
    text?: string;
    width?: string;
  }[];
  table: string;
  className?: string;
  onReorder?: (items: any[]) => void;
  onAddItem?: (content: string, type?: string) => void;
  onRemoveItem?: (itemId: string) => void;
}

const DraggableContent: React.FC<DraggableContentProps> = ({
  items,
  table,
  className = '',
  onReorder,
  onAddItem,
  onRemoveItem
}) => {
  const { isEditMode, isReorderMode, reorderElements } = useEditMode();
  const [dragItems, setDragItems] = useState<any[]>([]);
  const [addingItemAt, setAddingItemAt] = useState<number | null>(null);
  
  // Initialize drag items
  useEffect(() => {
    setDragItems(items.sort((a, b) => a.order - b.order));
  }, [items]);
  
  // If not in edit mode, just render the content
  if (!isEditMode) {
    return (
      <div className={className}>
        {items.sort((a, b) => a.order - b.order).map((item) => (
          <div key={item.id} className="draggable-item">
            {item.content}
          </div>
        ))}
      </div>
    );
  }

  const handleDragEnd = (result: DropResult) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }
    
    const { source, destination } = result;
    
    // If dropped in the same position
    if (source.index === destination.index) {
      return;
    }
    
    // Reorder the items
    const newItems = Array.from(dragItems);
    const [removed] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, removed);
    
    // Update order property of each item
    const reorderedItems = newItems.map((item, index) => ({
      ...item,
      order: index + 1
    }));
    
    setDragItems(reorderedItems);
    
    // Update in database
    if (onReorder) {
      onReorder(reorderedItems);
    } else {
      reorderElements(table, reorderedItems.map(item => ({
        id: item.id,
        order: item.order
      })));
    }
    
    toast.success('Elemento reordenado');
  };
  
  const handleAddItem = (content: string, type?: string) => {
    // If position is provided, insert at that position
    const position = addingItemAt !== null ? addingItemAt.toString() : undefined;
    
    if (onAddItem) {
      onAddItem(content, position);
    }
    
    // Reset adding state
    setAddingItemAt(null);
  };
  
  const handleRemoveItem = (itemId: string) => {
    if (onRemoveItem) {
      onRemoveItem(itemId);
      
      // Update local state
      setDragItems(dragItems.filter(item => item.id !== itemId));
      
      toast.success('Elemento eliminado');
    }
  };
  
  const handleCancelAddItem = () => {
    setAddingItemAt(null);
  };
  
  // If there are no items, show an empty state with an add button
  if (dragItems.length === 0) {
    return (
      <div className={cn("flex flex-col items-center justify-center py-12 border-2 border-dashed border-muted-foreground/20 rounded-lg", className)}>
        <p className="text-muted-foreground mb-4">No hay elementos para mostrar</p>
        {onAddItem && (
          <Button
            variant="outline"
            onClick={() => setAddingItemAt(0)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Añadir elemento
          </Button>
        )}
        
        {addingItemAt === 0 && (
          <div className="w-full max-w-md mt-4">
            <SectionInsert 
              onAddSection={handleAddItem}
              onCancel={handleCancelAddItem}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("draggable-content", className)}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable-list">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {dragItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  {/* Insert button above */}
                  {isReorderMode && onAddItem && (
                    <div className="flex justify-center -mb-2">
                      {addingItemAt === index ? (
                        <SectionInsert 
                          onAddSection={handleAddItem}
                          onCancel={handleCancelAddItem}
                        />
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 rounded-full bg-muted/50 hover:bg-muted"
                          onClick={() => setAddingItemAt(index)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  )}
                  
                  <Draggable
                    draggableId={item.id.toString()}
                    index={index}
                    isDragDisabled={!isReorderMode}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          width: item.width || 'auto',
                        }}
                        className={cn(
                          "relative group",
                          snapshot.isDragging ? "opacity-70 z-50" : "",
                          isReorderMode ? "pt-0" : ""
                        )}
                      >
                        {/* Drag handle and controls */}
                        {isReorderMode && (
                          <div className="absolute left-2 -top-3 z-10 flex items-center gap-1">
                            <div
                              {...provided.dragHandleProps}
                              className="cursor-grab bg-primary/10 hover:bg-primary/20 rounded p-1"
                            >
                              <MoveVertical className="h-4 w-4 text-primary" />
                            </div>
                            
                            {onRemoveItem && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full bg-destructive/10 hover:bg-destructive/20"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <Trash2 className="h-3 w-3 text-destructive" />
                              </Button>
                            )}
                          </div>
                        )}
                        
                        <div className={cn(
                          "draggable-item transition-all",
                          isReorderMode ? "border border-dashed border-primary/30 rounded p-4" : "",
                          snapshot.isDragging ? "shadow-lg" : ""
                        )}>
                          {item.content}
                        </div>
                      </div>
                    )}
                  </Draggable>
                  
                  {/* Insert button below the last item */}
                  {isReorderMode && onAddItem && index === dragItems.length - 1 && (
                    <div className="flex justify-center mt-4">
                      {addingItemAt === dragItems.length ? (
                        <SectionInsert 
                          onAddSection={handleAddItem}
                          onCancel={handleCancelAddItem}
                        />
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 rounded-full bg-muted/50 hover:bg-muted"
                          onClick={() => setAddingItemAt(dragItems.length)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DraggableContent;
