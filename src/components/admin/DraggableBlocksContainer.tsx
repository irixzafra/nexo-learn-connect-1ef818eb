
import React, { useState } from 'react';
import { 
  DndContext, 
  closestCenter, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay 
} from '@dnd-kit/core';
import { 
  SortableContext, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { PageBlock } from '@/types/pages';
import DraggableBlock from './DraggableBlock';
import BlockInsertMenu from './BlockInsertMenu';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface DraggableBlocksContainerProps {
  blocks: PageBlock[];
  onBlocksChange: (blocks: PageBlock[]) => void;
  renderBlockContent: (block: PageBlock) => React.ReactNode;
  className?: string;
}

const DraggableBlocksContainer: React.FC<DraggableBlocksContainerProps> = ({
  blocks,
  onBlocksChange,
  renderBlockContent,
  className
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Only start dragging after moving 5px
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex(block => block.id === active.id);
      const newIndex = blocks.findIndex(block => block.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newBlocks = [...blocks];
        const [movedBlock] = newBlocks.splice(oldIndex, 1);
        newBlocks.splice(newIndex, 0, movedBlock);
        
        // Update the order property for each block
        const updatedBlocks = newBlocks.map((block, index) => ({
          ...block,
          order: index + 1
        }));
        
        onBlocksChange(updatedBlocks);
        toast.success('Bloques reordenados', { id: 'reorder-blocks' });
      }
    }
    
    setActiveId(null);
  };

  const handleRemoveBlock = (id: string) => {
    const newBlocks = blocks.filter(block => block.id !== id);
    onBlocksChange(newBlocks);
    toast.success('Bloque eliminado', { id: 'remove-block' });
  };

  const handleDuplicateBlock = (id: string) => {
    const blockToDuplicate = blocks.find(block => block.id === id);
    
    if (blockToDuplicate) {
      const duplicatedBlock: PageBlock = {
        ...blockToDuplicate,
        id: `block-${Date.now()}`, // Generate a new ID
      };
      
      const blockIndex = blocks.findIndex(block => block.id === id);
      const newBlocks = [...blocks];
      newBlocks.splice(blockIndex + 1, 0, duplicatedBlock);
      
      onBlocksChange(newBlocks);
      toast.success('Bloque duplicado', { id: 'duplicate-block' });
    }
  };

  const handleAddBlock = (type: PageBlock['type'], content?: string | Record<string, any>) => {
    const newBlock: PageBlock = {
      id: `block-${Date.now()}`,
      type,
      content: content || '',
      isContainer: true,
      layout: 'column',
      order: blocks.length + 1
    };
    
    onBlocksChange([...blocks, newBlock]);
  };

  const handleResize = (block: PageBlock, size: { width?: string; height?: string }) => {
    const updatedBlocks = blocks.map(b => 
      b.id === block.id 
        ? { ...b, ...size }
        : b
    );
    
    onBlocksChange(updatedBlocks);
  };

  const handleLayoutChange = (id: string, layout: 'column' | 'row' | 'grid-2' | 'grid-3' | 'grid-4') => {
    const updatedBlocks = blocks.map(block => 
      block.id === id 
        ? { ...block, layout }
        : block
    );
    
    onBlocksChange(updatedBlocks);
  };

  const handleMoveBlock = (id: string, direction: 'up' | 'down') => {
    const blockIndex = blocks.findIndex(block => block.id === id);
    
    if (blockIndex === -1) return;
    
    if (direction === 'up' && blockIndex > 0) {
      const newBlocks = [...blocks];
      const temp = newBlocks[blockIndex];
      newBlocks[blockIndex] = newBlocks[blockIndex - 1];
      newBlocks[blockIndex - 1] = temp;
      
      onBlocksChange(newBlocks);
    } else if (direction === 'down' && blockIndex < blocks.length - 1) {
      const newBlocks = [...blocks];
      const temp = newBlocks[blockIndex];
      newBlocks[blockIndex] = newBlocks[blockIndex + 1];
      newBlocks[blockIndex + 1] = temp;
      
      onBlocksChange(newBlocks);
    }
  };

  // Find the active block
  const activeBlock = activeId ? blocks.find(block => block.id === activeId) : null;

  return (
    <div className={cn("space-y-4", className)}>
      <BlockInsertMenu 
        onAddBlock={handleAddBlock} 
        position="top"
        className="mb-6" 
      />
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={blocks.map(block => block.id)} 
          strategy={verticalListSortingStrategy}
        >
          {blocks.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
              <p className="text-muted-foreground mb-4">
                No hay bloques de contenido. Añade alguno para comenzar.
              </p>
              <BlockInsertMenu onAddBlock={handleAddBlock} />
            </div>
          ) : (
            <div className="space-y-2">
              {blocks.map(block => (
                <DraggableBlock
                  key={block.id}
                  block={block}
                  onRemove={handleRemoveBlock}
                  onDuplicate={handleDuplicateBlock}
                  onResize={handleResize}
                  onMoveUp={(id) => handleMoveBlock(id, 'up')}
                  onMoveDown={(id) => handleMoveBlock(id, 'down')}
                  onLayoutChange={handleLayoutChange}
                >
                  {renderBlockContent(block)}
                </DraggableBlock>
              ))}
            </div>
          )}
        </SortableContext>
        
        <DragOverlay>
          {activeId && activeBlock ? (
            <div className="opacity-80">
              <DraggableBlock
                block={activeBlock}
                onRemove={handleRemoveBlock}
                onDuplicate={handleDuplicateBlock}
              >
                {renderBlockContent(activeBlock)}
              </DraggableBlock>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
      
      {blocks.length > 0 && (
        <div className="pt-4">
          <BlockInsertMenu 
            onAddBlock={handleAddBlock} 
            position="bottom" 
          />
        </div>
      )}
    </div>
  );
};

export default DraggableBlocksContainer;
