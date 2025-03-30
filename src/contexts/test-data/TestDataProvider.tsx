
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
    isLoading,
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
  const handleDeleteSelectedItems = async (type: TestDataType) => {
    if (selectedItems[type].length === 0) {
      toast.info('No hay elementos seleccionados para eliminar');
      return;
    }
    
    // Delete selected items
    const promises = selectedItems[type].map(id => deleteTestDataItem(type, id));
    await Promise.all(promises);
    
    // Clear selections for this type
    clearSelections(type);
    
    toast.success(`${selectedItems[type].length} elementos eliminados correctamente`);
  };

  // When clearing test data, also clear selections
  const handleClearTestData = (type?: TestDataType) => {
    clearTestData(type);
    clearSelections(type);
  };

  const value = {
    testData,
    isGenerating,
    isLoading,
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
