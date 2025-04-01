
import React from 'react';

// This is a placeholder component since resizable blocks have been removed
const ResizableBlockContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children }) => {
  return <div>{children}</div>;
};

export default ResizableBlockContainer;
