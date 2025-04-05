
import React from 'react';

interface AppLayoutWrapperProps {
  children: React.ReactNode;
}

/**
 * A wrapper component to provide consistent layout structure for pages
 * Resolves TypeScript errors with children props
 */
const AppLayoutWrapper: React.FC<AppLayoutWrapperProps> = ({ children }) => {
  return (
    <div className="container mx-auto py-6">
      {children}
    </div>
  );
};

export default AppLayoutWrapper;
