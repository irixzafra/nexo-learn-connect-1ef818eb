
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useEditMode } from '@/contexts/EditModeContext';
import { cn } from '@/lib/utils';
import { GripVertical } from 'lucide-react';

export interface DraggableItem {
  id: string;
  order: number;
  content: React.ReactNode;
}

export interface DraggableContentProps {
  items: DraggableItem[];
  table: string;
  className?: string;
  itemClassName?: string; // Added itemClassName prop
  onReorder?: (items: DraggableItem[]) => void;
}

const DraggableContent: React.FC<DraggableContentProps> = ({
  items,
  table,
  className,
  itemClassName,
  onReorder
}) => {
  const [elements, setElements] = useState<DraggableItem[]>(
    [...items].sort((a, b) => a.order - b.order)
  );
  const { isEditMode, isReorderMode, reorderElements } = useEditMode();

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    
    const reorderedItems = Array.from(elements);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);
    
    // Update the order property for each item
    const updatedItems = reorderedItems.map((item, index) => ({
      ...item,
      order: index + 1
    }));
    
    setElements(updatedItems);
    
    // If onReorder callback is provided, call it with the updated items
    if (onReorder) {
      onReorder(updatedItems);
    }
    
    // Send the update to the server
    if (isEditMode && isReorderMode) {
      const reorderData = updatedItems.map(item => ({
        id: item.id,
        order: item.order
      }));
      
      await reorderElements(table, reorderData);
    }
  };
  
  if (!isEditMode || !isReorderMode) {
    // When not in edit/reorder mode, just render the items normally
    return (
      <div className={className}>
        {elements.map((item) => (
          <div key={item.id} className={itemClassName}>
            {item.content}
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={`droppable-${table}`}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={className}
          >
            {elements.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={cn(
                      "relative transition-colors duration-200 group",
                      snapshot.isDragging && "opacity-70 bg-accent/50",
                      itemClassName
                    )}
                  >
                    <div 
                      {...provided.dragHandleProps}
                      className="absolute left-2 top-1/2 -translate-y-1/2 opacity-40 group-hover:opacity-100 cursor-grab z-10"
                    >
                      <GripVertical className="h-5 w-5" />
                    </div>
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableContent;
