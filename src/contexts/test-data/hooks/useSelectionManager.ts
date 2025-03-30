
import { useState } from 'react';
import { TestDataType, TestDataState } from '../testDataTypes';

export const useSelectionManager = (testData: TestDataState) => {
  const [selectedItems, setSelectedItems] = useState<Record<TestDataType, string[]>>({
    course: [],
    user: [],
    lesson: [],
    message: [],
    module: [],
    profile: [],
    assignment: [],
    category: [],
    enrollment: [],
    quiz: [],
    certificate: [],
    payment: []
  });

  const selectItem = (type: TestDataType, id: string, selected: boolean) => {
    setSelectedItems(prev => {
      if (selected) {
        return {
          ...prev,
          [type]: [...prev[type], id]
        };
      } else {
        return {
          ...prev,
          [type]: prev[type].filter(itemId => itemId !== id)
        };
      }
    });
  };

  const selectAllItems = (type: TestDataType, selected: boolean) => {
    setSelectedItems(prev => {
      if (selected) {
        return {
          ...prev,
          [type]: testData[type].map(item => item.id)
        };
      } else {
        return {
          ...prev,
          [type]: []
        };
      }
    });
  };

  const deleteSelectedItems = (type: TestDataType, updateTestData: (callback: (prev: TestDataState) => TestDataState) => void) => {
    if (selectedItems[type].length === 0) {
      return false;
    }
    
    updateTestData(prev => ({
      ...prev,
      [type]: prev[type].filter(item => !selectedItems[type].includes(item.id))
    }));
    
    setSelectedItems(prev => ({
      ...prev,
      [type]: []
    }));
    
    return true;
  };

  const clearSelections = (type?: TestDataType) => {
    if (type) {
      setSelectedItems(prev => ({
        ...prev,
        [type]: []
      }));
    } else {
      setSelectedItems({
        course: [],
        user: [],
        lesson: [],
        message: [],
        module: [],
        profile: [],
        assignment: [],
        category: [],
        enrollment: [],
        quiz: [],
        certificate: [],
        payment: []
      });
    }
  };

  return {
    selectedItems,
    selectItem,
    selectAllItems,
    deleteSelectedItems,
    clearSelections
  };
};
