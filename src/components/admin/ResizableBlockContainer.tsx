
import React from 'react';

interface ResizableBlockContainerProps {
  children: React.ReactNode;
  className?: string;
  block?: any;
  onResize?: (selectedBlock: any, newSize: any) => void;
  onLayoutChange?: (selectedBlock: any, newLayout: any) => void;
  onMoveBlock?: (selectedBlock: any, direction: any) => void;
}

// This is a placeholder component since resizable blocks have been removed
const ResizableBlockContainer: React.FC<ResizableBlockContainerProps> = ({ 
  children, 
  className = ""
}) => {
  return <div className={className}>{children}</div>;
};

export default ResizableBlockContainer;
