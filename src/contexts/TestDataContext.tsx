
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

// Tipos de datos de prueba que podemos generar
export type TestDataType = 'course' | 'user' | 'lesson' | 'message';

// Interfaz para los datos de prueba generados
export interface TestDataItem {
  id: string;
  type: TestDataType;
  name: string;
  createdAt: Date;
  data: Record<string, any>;
}

interface TestDataContextType {
  testData: Record<TestDataType, TestDataItem[]>;
  generateTestData: (type: TestDataType, count: number) => void;
  clearTestData: (type?: TestDataType) => void;
  isGenerating: boolean;
}

const TestDataContext = createContext<TestDataContextType | undefined>(undefined);

export const useTestData = (): TestDataContextType => {
  const context = useContext(TestDataContext);
  if (!context) {
    throw new Error('useTestData must be used within a TestDataProvider');
  }
  return context;
};

// Funciones de generación de datos de prueba
const generateCourse = (index: number): TestDataItem => {
  const id = uuidv4();
  return {
    id,
    type: 'course',
    name: `Curso de Prueba ${index}`,
    createdAt: new Date(),
    data: {
      title: `Curso de Prueba ${index}`,
      description: `Descripción del curso de prueba ${index}`,
      price: Math.floor(Math.random() * 100) + 9.99,
      coverImage: 'https://source.unsplash.com/random/800x600/?course',
      duration: Math.floor(Math.random() * 20) + 5,
      lessons: Math.floor(Math.random() * 10) + 3,
      level: ['Principiante', 'Intermedio', 'Avanzado'][Math.floor(Math.random() * 3)],
      published: Math.random() > 0.3,
    }
  };
};

const generateUser = (index: number): TestDataItem => {
  const id = uuidv4();
  return {
    id,
    type: 'user',
    name: `Usuario de Prueba ${index}`,
    createdAt: new Date(),
    data: {
      email: `usuario${index}@ejemplo.com`,
      fullName: `Usuario Prueba ${index}`,
      role: ['student', 'instructor', 'admin'][Math.floor(Math.random() * 3)],
      avatarUrl: `https://source.unsplash.com/random/150x150/?person&sig=${index}`,
      bio: `Bio de usuario de prueba número ${index}`,
      enrolledCourses: Math.floor(Math.random() * 5),
    }
  };
};

const generateLesson = (index: number): TestDataItem => {
  const id = uuidv4();
  return {
    id,
    type: 'lesson',
    name: `Lección de Prueba ${index}`,
    createdAt: new Date(),
    data: {
      title: `Lección de Prueba ${index}`,
      content: `Contenido de la lección de prueba ${index}. Este es un texto de ejemplo para simular el contenido de una lección.`,
      duration: Math.floor(Math.random() * 60) + 10,
      videoUrl: Math.random() > 0.5 ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' : null,
      order: index,
      completed: Math.random() > 0.6,
    }
  };
};

const generateMessage = (index: number): TestDataItem => {
  const id = uuidv4();
  return {
    id,
    type: 'message',
    name: `Mensaje de Prueba ${index}`,
    createdAt: new Date(),
    data: {
      subject: `Asunto del mensaje ${index}`,
      content: `Este es el contenido del mensaje de prueba número ${index}. Es un texto generado para simular una conversación.`,
      sender: `usuario${Math.floor(Math.random() * 10)}@ejemplo.com`,
      receiver: `usuario${Math.floor(Math.random() * 10)}@ejemplo.com`,
      read: Math.random() > 0.5,
    }
  };
};

const generators: Record<TestDataType, (index: number) => TestDataItem> = {
  course: generateCourse,
  user: generateUser,
  lesson: generateLesson,
  message: generateMessage,
};

export const TestDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [testData, setTestData] = useState<Record<TestDataType, TestDataItem[]>>({
    course: [],
    user: [],
    lesson: [],
    message: [],
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTestData = (type: TestDataType, count: number) => {
    setIsGenerating(true);
    
    // Creamos un nuevo array con los datos generados
    const newItems = Array.from({ length: count }, (_, index) => {
      return generators[type](index + 1);
    });

    setTestData(prevData => ({
      ...prevData,
      [type]: [...prevData[type], ...newItems]
    }));
    
    setIsGenerating(false);
    toast.success(`Se han generado ${count} elementos de tipo "${type}"`);
  };

  const clearTestData = (type?: TestDataType) => {
    if (type) {
      setTestData(prevData => ({
        ...prevData,
        [type]: []
      }));
      toast.success(`Se han eliminado todos los elementos de tipo "${type}"`);
    } else {
      setTestData({
        course: [],
        user: [],
        lesson: [],
        message: [],
      });
      toast.success('Se han eliminado todos los datos de prueba');
    }
  };

  return (
    <TestDataContext.Provider 
      value={{ 
        testData, 
        generateTestData, 
        clearTestData,
        isGenerating
      }}
    >
      {children}
    </TestDataContext.Provider>
  );
};
