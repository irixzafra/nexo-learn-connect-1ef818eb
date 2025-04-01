
import React from 'react';
import { PageBlock } from '@/types/pages';

interface DraggableBlocksContainerProps {
  blocks: PageBlock[];
  onBlocksChange: (blocks: PageBlock[]) => void;
  renderBlockContent: (block: PageBlock) => React.ReactNode;
}

// Simplified container that doesn't enable dragging since inline editing is removed
const DraggableBlocksContainer: React.FC<DraggableBlocksContainerProps> = ({ 
  blocks, 
  renderBlockContent 
}) => {
  return (
    <div className="space-y-4">
      {blocks.map((block) => (
        <div key={block.id} className="block-container">
          {renderBlockContent(block)}
        </div>
      ))}
      {blocks.length === 0 && (
        <div className="text-center p-8 border border-dashed rounded-md">
          <p className="text-muted-foreground">No content blocks available</p>
        </div>
      )}
    </div>
  );
};

export default DraggableBlocksContainer;
