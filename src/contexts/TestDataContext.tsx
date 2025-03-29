
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

// Types
export type TestDataType = 'course' | 'user' | 'lesson' | 'message';

interface TestDataItem {
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
}

interface TestDataContextType {
  testData: TestDataState;
  isGenerating: boolean;
  generateTestData: (type: TestDataType, count: number) => void;
  clearTestData: (type?: TestDataType) => void;
  deleteTestDataItem: (type: TestDataType, id: string) => void;
}

const TestDataContext = createContext<TestDataContextType | undefined>(undefined);

// Mock data generators
const generateCourseMock = () => {
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
};

const generateUserMock = () => {
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
};

const generateLessonMock = () => {
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
};

const generateMessageMock = () => {
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
};

// Provider Component
export const TestDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [testData, setTestData] = useState<TestDataState>({
    course: [],
    user: [],
    lesson: [],
    message: []
  });
  const [isGenerating, setIsGenerating] = useState(false);

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
            mockData = generateCourseMock();
            name = mockData.title;
            break;
          case 'user':
            mockData = generateUserMock();
            name = mockData.fullName;
            break;
          case 'lesson':
            mockData = generateLessonMock();
            name = mockData.title;
            break;
          case 'message':
            mockData = generateMessageMock();
            name = mockData.subject;
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
      toast.success(`Datos de prueba de tipo ${type} eliminados`);
    } else {
      // Clear all test data
      setTestData({
        course: [],
        user: [],
        lesson: [],
        message: []
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

  const value = {
    testData,
    isGenerating,
    generateTestData,
    clearTestData,
    deleteTestDataItem
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
