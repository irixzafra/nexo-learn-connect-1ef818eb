import React from 'react';

interface DraggableItem {
  id: string;
  order: number;
  content: React.ReactNode;
  width?: string;
  text?: string;
}

interface DraggableContentProps {
  children?: React.ReactNode;
  className?: string;
  items?: DraggableItem[];
  table?: string;
  itemClassName?: string;
  onReorder?: (items: DraggableItem[]) => void;
  onAddItem?: (content: any, position: any) => void;
}

// This is a simplified component since draggable content has been removed
const DraggableContent: React.FC<DraggableContentProps> = ({ 
  children, 
  className = "",
  items = [],
  itemClassName = ""
}) => {
  // If items are provided, render them
  if (items && items.length > 0) {
    return (
      <div className={className}>
        {items.map(item => (
          <div key={item.id} className={itemClassName}>
            {item.content}
          </div>
        ))}
      </div>
    );
  }
  
  // Otherwise, render children
  return <div className={className}>{children}</div>;
};

export default DraggableContent;
