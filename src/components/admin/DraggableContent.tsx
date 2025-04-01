
import React from 'react';

// This is a placeholder component since draggable content has been removed
const DraggableContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children }) => {
  return <div>{children}</div>;
};

export default DraggableContent;
