
import React, { useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { GripVertical, ArrowsHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

interface DraggableItem {
  id: string;
  order: number;
  content: React.ReactNode;
  width?: number;
}

interface DraggableContentProps {
  items: DraggableItem[];
  table: string;
  className?: string;
  itemClassName?: string;
  onReorder?: (items: DraggableItem[]) => void;
  resizable?: boolean;
  layout?: 'vertical' | 'horizontal';
  minSize?: number;
}

const DraggableContent: React.FC<DraggableContentProps> = ({
  items,
  table,
  className = '',
  itemClassName = '',
  onReorder,
  resizable = false,
  layout = 'vertical',
  minSize = 10
}) => {
  const { isEditMode, reorderElements } = useEditMode();
  const [draggableItems, setDraggableItems] = useState<DraggableItem[]>(items);
  const [draggedItem, setDraggedItem] = useState<DraggableItem | null>(null);

  if (!isEditMode) {
    if (resizable) {
      return (
        <ResizablePanelGroup 
          direction={layout === 'vertical' ? 'vertical' : 'horizontal'}
          className={className}
        >
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              <ResizablePanel 
                defaultSize={item.width || 100 / items.length} 
                minSize={minSize}
                className={itemClassName}
              >
                {item.content}
              </ResizablePanel>
              {index < items.length - 1 && (
                <ResizableHandle />
              )}
            </React.Fragment>
          ))}
        </ResizablePanelGroup>
      );
    }
    
    return (
      <div className={className}>
        {items.map((item) => (
          <div key={item.id} className={itemClassName}>
            {item.content}
          </div>
        ))}
      </div>
    );
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: DraggableItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    // Required for Firefox
    e.dataTransfer.setData('text/plain', item.id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, item: DraggableItem) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === item.id) return;
    
    // Reorder items
    const newItems = [...draggableItems];
    const draggedIndex = newItems.findIndex(i => i.id === draggedItem.id);
    const targetIndex = newItems.findIndex(i => i.id === item.id);
    
    if (draggedIndex === -1 || targetIndex === -1) return;
    
    // Remove dragged item and insert at target position
    const [removedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, removedItem);
    
    // Update order values
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      order: index + 1
    }));
    
    setDraggableItems(updatedItems);
  };

  const handleDragEnd = async () => {
    if (!draggedItem) return;
    setDraggedItem(null);
    
    // Save the new order to the database
    if (reorderElements) {
      try {
        const elementsToUpdate = draggableItems.map(item => ({
          id: item.id,
          order: item.order
        }));
        
        const success = await reorderElements(table, elementsToUpdate);
        
        if (success) {
          if (onReorder) {
            onReorder(draggableItems);
          }
        } else {
          // Revert to original order on failure
          setDraggableItems(items);
          toast.error("No se pudo guardar el nuevo orden");
        }
      } catch (error) {
        console.error('Error saving new order:', error);
        toast.error("Error al reordenar los elementos");
        // Revert to original order on error
        setDraggableItems(items);
      }
    }
  };

  if (resizable) {
    return (
      <ResizablePanelGroup 
        direction={layout === 'vertical' ? 'vertical' : 'horizontal'}
        className={className}
      >
        {draggableItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <ResizablePanel 
              defaultSize={item.width || 100 / items.length} 
              minSize={minSize}
              className={`${itemClassName} ${isEditMode ? 'cursor-move relative border border-dashed border-primary-500 p-2 group' : ''}`}
            >
              <div
                draggable={isEditMode}
                onDragStart={(e) => handleDragStart(e, item)}
                onDragOver={(e) => handleDragOver(e, item)}
                onDragEnd={handleDragEnd}
                className="h-full w-full"
              >
                {isEditMode && (
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 z-10">
                    <GripVertical className="h-4 w-4" />
                  </div>
                )}
                <div className={isEditMode ? 'pl-6' : ''}>
                  {item.content}
                </div>
              </div>
            </ResizablePanel>
            {index < draggableItems.length - 1 && (
              <ResizableHandle withHandle />
            )}
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
    );
  }

  return (
    <div className={className}>
      {draggableItems.map((item) => (
        <div
          key={item.id}
          draggable={isEditMode}
          onDragStart={(e) => handleDragStart(e, item)}
          onDragOver={(e) => handleDragOver(e, item)}
          onDragEnd={handleDragEnd}
          className={`${itemClassName} ${isEditMode ? 'cursor-move relative border border-dashed border-primary-500 p-2 group' : ''}`}
        >
          {isEditMode && (
            <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100">
              <GripVertical className="h-4 w-4" />
            </div>
          )}
          <div className={isEditMode ? 'pl-6' : ''}>
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DraggableContent;
