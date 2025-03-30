
import React, { createContext, useContext } from 'react';
import { TestDataContextType } from './testDataTypes';

// Create the context
const TestDataContext = createContext<TestDataContextType | undefined>(undefined);

// Hook for consuming the context
export const useTestData = () => {
  const context = useContext(TestDataContext);
  
  if (context === undefined) {
    throw new Error('useTestData must be used within a TestDataProvider');
  }
  
  return context;
};

export { TestDataContext };
