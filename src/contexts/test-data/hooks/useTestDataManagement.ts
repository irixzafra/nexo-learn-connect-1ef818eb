
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { TestDataType, TestDataItem, TestDataState } from '../testDataTypes';
import { generateMockData, getItemName } from '../generateTestData';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

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
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Cargar datos guardados al iniciar
  useEffect(() => {
    const loadSavedTestData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('test_data_items')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error loading test data:', error);
          toast.error('Error al cargar datos de prueba');
          return;
        }
        
        if (data && data.length > 0) {
          // Agrupar los datos por tipo
          const groupedData: TestDataState = {
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
          };
          
          data.forEach(item => {
            const type = item.type as TestDataType;
            if (groupedData[type]) {
              groupedData[type].push({
                id: item.id,
                name: item.name,
                createdAt: item.created_at,
                data: item.data
              });
            }
          });
          
          setTestData(groupedData);
          console.log('Test data loaded from database:', groupedData);
        }
      } catch (err) {
        console.error('Error in loadSavedTestData:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSavedTestData();
  }, [user]);

  const generateTestData = async (type: TestDataType, count: number) => {
    if (!user) {
      toast.error('Debes iniciar sesión para guardar datos de prueba');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const newItems: TestDataItem[] = [];
      
      // Generate the requested number of mock data items
      for (let i = 0; i < count; i++) {
        let mockData = generateMockData[type]();
        let name = getItemName(type, mockData, i);
        
        const newItem = {
          id: uuidv4(),
          name,
          createdAt: new Date().toISOString(),
          data: mockData
        };
        
        // Guardar en Supabase
        const { error } = await supabase
          .from('test_data_items')
          .insert({
            id: newItem.id,
            name: newItem.name,
            type: type,
            data: newItem.data,
            user_id: user.id
          });
          
        if (error) {
          console.error('Error saving test data to database:', error);
          toast.error('Error al guardar datos en la base de datos');
          continue;
        }
        
        newItems.push(newItem);
        
        // Small delay for UI feedback
        await new Promise(resolve => setTimeout(resolve, 10));
      }
      
      // Update state with new items
      setTestData(prev => ({
        ...prev,
        [type]: [...prev[type], ...newItems]
      }));
      
      toast.success(`${count} datos de prueba generados y guardados correctamente`);
    } catch (error) {
      console.error('Error generating test data:', error);
      toast.error('Error al generar datos de prueba');
    } finally {
      setIsGenerating(false);
    }
  };

  const clearTestData = async (type?: TestDataType) => {
    if (!user) {
      toast.error('Debes iniciar sesión para eliminar datos de prueba');
      return;
    }
    
    try {
      let query = supabase
        .from('test_data_items')
        .delete();
      
      if (type) {
        // Clear only the specified type
        const idsToDelete = testData[type].map(item => item.id);
        if (idsToDelete.length === 0) return;
        
        query = query.in('id', idsToDelete);
        
        const { error } = await query;
        if (error) {
          console.error(`Error clearing test data of type ${type}:`, error);
          toast.error(`Error al eliminar datos de tipo ${type}`);
          return;
        }
        
        setTestData(prev => ({
          ...prev,
          [type]: []
        }));
        
        toast.success(`Datos de prueba de tipo ${type} eliminados`);
      } else {
        // Clear all test data
        const { error } = await query;
        if (error) {
          console.error('Error clearing all test data:', error);
          toast.error('Error al eliminar todos los datos de prueba');
          return;
        }
        
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
    } catch (error) {
      console.error('Error in clearTestData:', error);
      toast.error('Error al eliminar datos de prueba');
    }
  };

  const deleteTestDataItem = async (type: TestDataType, id: string) => {
    if (!user) {
      toast.error('Debes iniciar sesión para eliminar datos de prueba');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('test_data_items')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error('Error deleting test data item:', error);
        toast.error('Error al eliminar el elemento');
        return;
      }
      
      setTestData(prev => ({
        ...prev,
        [type]: prev[type].filter(item => item.id !== id)
      }));
      
      toast.success('Elemento eliminado correctamente');
    } catch (error) {
      console.error('Error in deleteTestDataItem:', error);
      toast.error('Error al eliminar el elemento');
    }
  };

  return {
    testData,
    isGenerating,
    isLoading,
    generateTestData,
    clearTestData,
    deleteTestDataItem
  };
};
