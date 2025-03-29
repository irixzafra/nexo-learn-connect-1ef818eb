
import { useContext } from 'react';
import TestDataContext from './TestDataContext';

// Hook for consuming the context
export const useTestData = () => {
  const context = useContext(TestDataContext);
  
  if (context === undefined) {
    throw new Error('useTestData must be used within a TestDataProvider');
  }
  
  return context;
};
