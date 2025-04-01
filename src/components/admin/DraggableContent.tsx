
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditMode } from '@/contexts/EditModeContext';
import SectionInsert from './SectionInsert';
import { toast } from 'sonner';

interface DraggableItem {
  id: string;
  order: number;
  content: React.ReactNode;
  text?: string;
}

interface DraggableContentProps {
  items: DraggableItem[];
  table: string;
  className?: string;
  onReorder?: (items: DraggableItem[]) => void;
  onAddItem?: (content: string, type?: string) => void;
}

const DraggableContent: React.FC<DraggableContentProps> = ({
  items,
  table,
  className,
  onReorder,
  onAddItem,
}) => {
  const { isEditMode, isReorderMode, reorderElements } = useEditMode();
  const [draggableItems, setDraggableItems] = useState<DraggableItem[]>(items);
  const [showAddSection, setShowAddSection] = useState(false);

  // Update local state when items prop changes
  useEffect(() => {
    setDraggableItems(items);
  }, [items]);

  if (!isEditMode) {
    return (
      <div className={className}>
        {items.map((item) => (
          <React.Fragment key={item.id}>{item.content}</React.Fragment>
        ))}
      </div>
    );
  }

  // Handle reordering
  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    console.log('Drag completed:', result);

    const reordered = Array.from(draggableItems);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    // Update order numbers
    const updatedItems = reordered.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    // Update local state
    setDraggableItems(updatedItems);

    // Save to database
    if (onReorder) {
      onReorder(updatedItems);
    } else {
      const success = await reorderElements(
        table,
        updatedItems.map(item => ({ id: item.id, order: item.order }))
      );
      if (!success) {
        // Revert to original order if save fails
        setDraggableItems(items);
        toast.error('No se pudo actualizar el orden');
      }
    }
  };

  const handleAddItem = (content: string, type?: string) => {
    if (onAddItem) {
      onAddItem(content, type);
      setShowAddSection(false);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={`droppable-${table}`}>
          {(provided: DroppableProvided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {draggableItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided: DraggableProvided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={cn(
                        "relative", 
                        isReorderMode ? "border border-dashed border-primary/50 rounded-md p-1" : "",
                        snapshot.isDragging ? "opacity-70 bg-primary/5 ring-2 ring-primary" : ""
                      )}
                    >
                      {isReorderMode && (
                        <div
                          {...provided.dragHandleProps}
                          className="absolute top-0 left-0 right-0 z-10 h-8 bg-primary/10 flex items-center justify-center rounded-t-md cursor-move"
                        >
                          <span className="text-xs font-medium text-primary/70">
                            {index + 1}. {item.text?.substring(0, 30)}
                            {item.text && item.text.length > 30 ? '...' : ''}
                          </span>
                        </div>
                      )}
                      <div className={isReorderMode ? "pt-8" : ""}>
                        {item.content}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {isEditMode && onAddItem && (
        <div className="flex justify-center mt-6">
          {showAddSection ? (
            <div className="w-full max-w-xl border border-dashed border-primary/50 rounded-md p-4">
              <SectionInsert 
                onAddSection={handleAddItem} 
                onCancel={() => setShowAddSection(false)} 
              />
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowAddSection(true)}
              className="border-dashed flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>Añadir elemento</span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default DraggableContent;
