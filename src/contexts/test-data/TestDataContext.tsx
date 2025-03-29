
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { 
  TestDataType, 
  TestDataState, 
  TestDataContextType, 
  TestDataItem 
} from './types';
import * as generators from './generators';

// Initialize context with undefined
const TestDataContext = createContext<TestDataContextType | undefined>(undefined);

// Provider Component
export const TestDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [testData, setTestData] = useState<TestDataState>({
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
  
  const [isGenerating, setIsGenerating] = useState(false);
  
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

  const generateTestData = async (type: TestDataType, count: number) => {
    setIsGenerating(true);
    
    try {
      const newItems: TestDataItem[] = [];
      
      // Generate the requested number of mock data items
      for (let i = 0; i < count; i++) {
        let mockData;
        let name;
        
        // Generate different mock data based on type
        switch (type) {
          case 'course':
            mockData = generators.generateCourseMock();
            name = mockData.title;
            break;
          case 'user':
            mockData = generators.generateUserMock();
            name = mockData.fullName;
            break;
          case 'lesson':
            mockData = generators.generateLessonMock();
            name = mockData.title;
            break;
          case 'message':
            mockData = generators.generateMessageMock();
            name = mockData.subject;
            break;
          case 'module':
            mockData = generators.generateModuleMock();
            name = mockData.title;
            break;
          case 'profile':
            mockData = generators.generateProfileMock();
            name = mockData.full_name;
            break;
          case 'assignment':
            mockData = generators.generateAssignmentMock();
            name = mockData.title;
            break;
          case 'category':
            mockData = generators.generateCategoryMock();
            name = mockData.name;
            break;
          case 'enrollment':
            mockData = generators.generateEnrollmentMock();
            name = `Enrollment ${i + 1}`;
            break;
          case 'quiz':
            mockData = generators.generateQuizMock();
            name = mockData.title;
            break;
          case 'certificate':
            mockData = generators.generateCertificateMock();
            name = mockData.certificate_number;
            break;
          case 'payment':
            mockData = generators.generatePaymentMock();
            name = `Payment ${i + 1}`;
            break;
          default:
            mockData = {};
            name = 'Unknown';
        }
        
        newItems.push({
          id: uuidv4(),
          name,
          createdAt: new Date().toISOString(),
          data: mockData
        });
        
        // Small delay for UI feedback
        await new Promise(resolve => setTimeout(resolve, 10));
      }
      
      // Update state with new items
      setTestData(prev => ({
        ...prev,
        [type]: [...prev[type], ...newItems]
      }));
      
      toast.success(`${count} datos de prueba generados correctamente`);
    } catch (error) {
      console.error('Error generating test data:', error);
      toast.error('Error al generar datos de prueba');
    } finally {
      setIsGenerating(false);
    }
  };

  const clearTestData = (type?: TestDataType) => {
    if (type) {
      // Clear only the specified type
      setTestData(prev => ({
        ...prev,
        [type]: []
      }));
      setSelectedItems(prev => ({
        ...prev,
        [type]: []
      }));
      toast.success(`Datos de prueba de tipo ${type} eliminados`);
    } else {
      // Clear all test data
      setTestData({
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
      toast.success('Todos los datos de prueba eliminados');
    }
  };

  const deleteTestDataItem = (type: TestDataType, id: string) => {
    setTestData(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
    setSelectedItems(prev => ({
      ...prev,
      [type]: prev[type].filter(itemId => itemId !== id)
    }));
    toast.success('Elemento eliminado correctamente');
  };

  const deleteSelectedItems = (type: TestDataType) => {
    if (selectedItems[type].length === 0) {
      toast.info('No hay elementos seleccionados para eliminar');
      return;
    }
    
    setTestData(prev => ({
      ...prev,
      [type]: prev[type].filter(item => !selectedItems[type].includes(item.id))
    }));
    
    setSelectedItems(prev => ({
      ...prev,
      [type]: []
    }));
    
    toast.success(`${selectedItems[type].length} elementos eliminados correctamente`);
  };

  const value = {
    testData,
    isGenerating,
    selectedItems,
    selectItem,
    selectAllItems,
    generateTestData,
    clearTestData,
    deleteTestDataItem,
    deleteSelectedItems
  };

  return (
    <TestDataContext.Provider value={value}>
      {children}
    </TestDataContext.Provider>
  );
};

export default TestDataContext;
