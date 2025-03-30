
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { TestDataType, TestDataItem, TestDataState } from '../testDataTypes';
import { generateMockData, getItemName } from '../generateTestData';

export const useTestDataManagement = () => {
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

  const generateTestData = async (type: TestDataType, count: number) => {
    setIsGenerating(true);
    
    try {
      const newItems: TestDataItem[] = [];
      
      // Generate the requested number of mock data items
      for (let i = 0; i < count; i++) {
        let mockData = generateMockData[type]();
        let name = getItemName(type, mockData, i);
        
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
      toast.success('Todos los datos de prueba eliminados');
    }
  };

  const deleteTestDataItem = (type: TestDataType, id: string) => {
    setTestData(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
    toast.success('Elemento eliminado correctamente');
  };

  return {
    testData,
    isGenerating,
    generateTestData,
    clearTestData,
    deleteTestDataItem
  };
};
