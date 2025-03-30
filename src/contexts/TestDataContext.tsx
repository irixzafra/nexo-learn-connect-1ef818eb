
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

// Types
export type TestDataType = 'course' | 'user' | 'lesson' | 'message' | 'module' | 'profile' | 'assignment' | 'category' | 'enrollment' | 'quiz' | 'certificate' | 'payment';

export interface TestDataItem {
  id: string;
  name: string;
  createdAt: string;
  data: any;
}

interface TestDataState {
  course: TestDataItem[];
  user: TestDataItem[];
  lesson: TestDataItem[];
  message: TestDataItem[];
  module: TestDataItem[];
  profile: TestDataItem[];
  assignment: TestDataItem[];
  category: TestDataItem[];
  enrollment: TestDataItem[];
  quiz: TestDataItem[];
  certificate: TestDataItem[];
  payment: TestDataItem[];
}

export interface TestDataContextType {
  testData: TestDataState;
  isGenerating: boolean;
  selectedItems: Record<TestDataType, string[]>;
  selectItem: (type: TestDataType, id: string, selected: boolean) => void;
  selectAllItems: (type: TestDataType, selected: boolean) => void;
  generateTestData: (type: TestDataType, count: number) => Promise<void>;
  clearTestData: (type?: TestDataType) => void;
  deleteTestDataItem: (type: TestDataType, id: string) => void;
  deleteSelectedItems: (type: TestDataType) => void;
}

const TestDataContext = createContext<TestDataContextType | undefined>(undefined);

// Data generators
const generateMockData = {
  course: () => {
    const levels = ['beginner', 'intermediate', 'advanced'];
    const titles = [
      'Introducción a la Programación',
      'Desarrollo Web Avanzado',
      'Machine Learning Fundamentals',
      'Diseño UX/UI',
      'Marketing Digital',
      'Gestión de Proyectos Ágiles',
      'Data Science con Python',
      'Blockchain para Desarrolladores',
      'React Native desde Cero',
      'DevOps y CI/CD'
    ];
    
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    
    return {
      title: randomTitle,
      description: `Curso completo sobre ${randomTitle.toLowerCase()} con ejercicios prácticos y proyectos reales.`,
      price: Math.floor(Math.random() * 15000) / 100,
      currency: 'eur',
      level: levels[Math.floor(Math.random() * levels.length)],
      duration: Math.floor(Math.random() * 40) + 5,
      coverImage: `https://picsum.photos/seed/${Math.random().toString(36).substring(7)}/800/450`,
      published: Math.random() > 0.3 // 70% chance to be published
    };
  },
  
  user: () => {
    const roles = ['student', 'instructor', 'admin'];
    const firstNames = ['Ana', 'Juan', 'María', 'Carlos', 'Laura', 'Pedro', 'Elena', 'Miguel', 'Sofía', 'David'];
    const lastNames = ['García', 'Rodríguez', 'Martínez', 'López', 'Pérez', 'González', 'Sánchez', 'Romero', 'Torres', 'Ramírez'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return {
      fullName: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      role: roles[Math.floor(Math.random() * roles.length)],
      bio: `${firstName} es un${firstName.endsWith('a') ? 'a' : ''} profesional con experiencia en el área de educación online.`,
      avatarUrl: `https://i.pravatar.cc/150?u=${firstName.toLowerCase()}-${lastName.toLowerCase()}`
    };
  },
  
  lesson: () => {
    const lessonTitles = [
      'Primeros pasos',
      'Conceptos fundamentales',
      'Aplicación práctica',
      'Ejercicios avanzados',
      'Estudio de caso',
      'Proyecto final',
      'Debugging y optimización',
      'Mejores prácticas',
      'Integración con APIs',
      'Despliegue en producción'
    ];
    
    const title = lessonTitles[Math.floor(Math.random() * lessonTitles.length)];
    const hasVideo = Math.random() > 0.5;
    
    return {
      title,
      order: Math.floor(Math.random() * 10) + 1,
      content: hasVideo ? null : 'Contenido detallado de la lección con ejemplos y referencias.',
      videoUrl: hasVideo ? 'https://example.com/video.mp4' : null,
      completed: Math.random() > 0.5
    };
  },
  
  message: () => {
    const topics = ['Pregunta sobre el curso', 'Problema técnico', 'Solicitud de información', 'Feedback'];
    const messages = [
      'Tengo una duda sobre el material del módulo 3.',
      'No puedo acceder al último video del curso.',
      '¿Podrías proporcionarme más recursos sobre este tema?',
      'Me encantó el curso, muy bien explicado.',
      '¿Cuándo estará disponible el próximo módulo?'
    ];
    
    return {
      subject: topics[Math.floor(Math.random() * topics.length)],
      content: messages[Math.floor(Math.random() * messages.length)],
      isRead: Math.random() > 0.5,
      sender: `user${Math.floor(Math.random() * 1000)}@example.com`
    };
  },
  
  module: () => {
    const titles = [
      'Introducción',
      'Fundamentos',
      'Conceptos Avanzados',
      'Aplicaciones Prácticas',
      'Proyectos Finales'
    ];
    
    return {
      title: titles[Math.floor(Math.random() * titles.length)],
      module_order: Math.floor(Math.random() * 10) + 1
    };
  },
  
  profile: () => {
    const roles = ['student', 'instructor', 'admin'];
    const firstNames = ['Ana', 'Juan', 'María', 'Carlos', 'Laura'];
    const lastNames = ['García', 'Rodríguez', 'Martínez', 'López', 'Pérez'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return {
      full_name: `${firstName} ${lastName}`,
      role: roles[Math.floor(Math.random() * roles.length)]
    };
  },
  
  assignment: () => {
    const titles = [
      'Proyecto Final',
      'Ejercicio Práctico',
      'Investigación',
      'Estudio de Caso',
      'Presentación'
    ];
    
    return {
      title: titles[Math.floor(Math.random() * titles.length)],
      description: 'Descripción de la tarea asignada a los estudiantes.',
      max_points: Math.floor(Math.random() * 50) + 50,
      due_date: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      is_published: Math.random() > 0.3
    };
  },
  
  category: () => {
    const categories = [
      'Desarrollo Web',
      'Inteligencia Artificial',
      'Diseño UX/UI',
      'Marketing Digital',
      'Ciencia de Datos'
    ];
    
    return {
      name: categories[Math.floor(Math.random() * categories.length)],
      slug: categories[Math.floor(Math.random() * categories.length)].toLowerCase().replace(/\s+/g, '-'),
      description: 'Descripción de la categoría.',
      is_active: true
    };
  },
  
  enrollment: () => {
    return {
      enrolled_at: new Date().toISOString()
    };
  },
  
  quiz: () => {
    const titles = [
      'Quiz de Evaluación',
      'Test de Conocimientos',
      'Evaluación Final',
      'Quiz Rápido',
      'Examen Parcial'
    ];
    
    return {
      title: titles[Math.floor(Math.random() * titles.length)],
      description: 'Quiz para evaluar el conocimiento adquirido.',
      passing_score: 70,
      is_published: Math.random() > 0.3,
      time_limit: Math.floor(Math.random() * 30) + 15
    };
  },
  
  certificate: () => {
    return {
      certificate_number: `CERT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      issue_date: new Date().toISOString(),
      status: 'issued'
    };
  },
  
  payment: () => {
    return {
      amount: Math.floor(Math.random() * 15000) / 100,
      currency: Math.random() > 0.5 ? 'eur' : 'usd',
      status: 'succeeded',
      created_at: new Date().toISOString()
    };
  }
};

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
        
        // Use the specific generator function from our mockData object
        mockData = generateMockData[type]();
        
        // Determine the name based on type and data
        switch (type) {
          case 'course':
            name = mockData.title;
            break;
          case 'user':
            name = mockData.fullName;
            break;
          case 'lesson':
            name = mockData.title;
            break;
          case 'message':
            name = mockData.subject;
            break;
          case 'module':
            name = mockData.title;
            break;
          case 'profile':
            name = mockData.full_name;
            break;
          case 'assignment':
            name = mockData.title;
            break;
          case 'category':
            name = mockData.name;
            break;
          case 'enrollment':
            name = `Enrollment ${i + 1}`;
            break;
          case 'quiz':
            name = mockData.title;
            break;
          case 'certificate':
            name = mockData.certificate_number;
            break;
          case 'payment':
            name = `Payment ${i + 1}`;
            break;
          default:
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

// Hook for consuming the context
export const useTestData = () => {
  const context = useContext(TestDataContext);
  
  if (context === undefined) {
    throw new Error('useTestData must be used within a TestDataProvider');
  }
  
  return context;
};
