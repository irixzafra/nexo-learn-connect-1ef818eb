
import React from 'react';
import { toast } from 'sonner';
import { TestDataContext } from './TestDataContext';
import { TestDataType } from './testDataTypes';
import { useTestDataManagement, useSelectionManager } from './hooks';

// Provider Component
export const TestDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    testData,
    isGenerating,
    generateTestData,
    clearTestData,
    deleteTestDataItem
  } = useTestDataManagement();
  
  const {
    selectedItems,
    selectItem,
    selectAllItems,
    deleteSelectedItems,
    clearSelections
  } = useSelectionManager(testData);

  // Handle deleting selected items with toast feedback
  const handleDeleteSelectedItems = (type: TestDataType) => {
    if (selectedItems[type].length === 0) {
      toast.info('No hay elementos seleccionados para eliminar');
      return;
    }
    
    const count = selectedItems[type].length;
    const success = deleteSelectedItems(type, (callback) => {
      // This is a wrapper that calls the testData setter with the provided callback
      setTestData(callback(testData));
    });
    
    if (success) {
      toast.success(`${count} elementos eliminados correctamente`);
    }
  };
  
  // This is a helper function to access the setter from the custom hook
  const setTestData = (newState) => {
    clearTestData();
    Object.entries(newState).forEach(([type, items]) => {
      if (items.length > 0) {
        items.forEach(item => {
          testData[type].push(item);
        });
      }
    });
  };

  // When clearing test data, also clear selections
  const handleClearTestData = (type?: TestDataType) => {
    clearTestData(type);
    clearSelections(type);
  };

  const value = {
    testData,
    isGenerating,
    selectedItems,
    selectItem,
    selectAllItems,
    generateTestData,
    clearTestData: handleClearTestData,
    deleteTestDataItem,
    deleteSelectedItems: handleDeleteSelectedItems
  };

  return (
    <TestDataContext.Provider value={value}>
      {children}
    </TestDataContext.Provider>
  );
};
