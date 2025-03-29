
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

// Arrays for generating more diverse sample data
const courseNames = [
  'Introducción a la Programación',
  'Diseño Web Avanzado',
  'Inteligencia Artificial para Principiantes',
  'Marketing Digital Estratégico',
  'Ciencia de Datos con Python',
  'Desarrollo de Aplicaciones Móviles',
  'Gestión de Proyectos Ágiles',
  'Ciberseguridad Empresarial',
  'Blockchain y Criptomonedas',
  'Negocios Digitales',
  'Fotografía Digital',
  'Edición de Video Profesional',
  'UX/UI Design',
  'Inglés para Negocios',
  'Liderazgo y Coaching'
];

const courseDescriptions = [
  'Aprende los fundamentos esenciales para comenzar tu carrera en programación',
  'Domina las últimas técnicas en diseño web responsive y optimización',
  'Descubre el fascinante mundo de la inteligencia artificial y machine learning',
  'Implementa estrategias efectivas para impulsar tu negocio en el entorno digital',
  'Analiza grandes volúmenes de datos utilizando las bibliotecas más populares de Python',
  'Crea aplicaciones nativas para iOS y Android desde cero',
  'Gestiona equipos y proyectos utilizando metodologías ágiles de última generación',
  'Protege a tu organización contra las amenazas digitales más comunes y avanzadas',
  'Comprende los fundamentos de la tecnología blockchain y su aplicación práctica',
  'Aprende a construir modelos de negocio exitosos en la economía digital',
  'Captura imágenes impactantes con técnicas profesionales',
  'Crea videos de calidad profesional utilizando software de edición avanzado',
  'Diseña interfaces intuitivas y experiencias de usuario memorables',
  'Desarrolla tus habilidades de comunicación en inglés para el entorno empresarial',
  'Potencia tus habilidades de liderazgo y gestión de equipos'
];

const firstName = [
  'Ana', 'Juan', 'María', 'Carlos', 'Laura', 'Pedro', 'Sofía', 'Miguel', 
  'Elena', 'David', 'Lucía', 'Javier', 'Carmen', 'Daniel', 'Patricia',
  'Fernando', 'Claudia', 'Jorge', 'Alicia', 'Roberto'
];

const lastName = [
  'García', 'Rodríguez', 'López', 'Martínez', 'González', 'Pérez', 'Sánchez', 
  'Fernández', 'Gómez', 'Torres', 'Ruiz', 'Hernández', 'Ramírez', 'Romero', 
  'Alvarez', 'Moreno', 'Jiménez', 'Díaz', 'Muñoz', 'Vásquez'
];

const roles = ['student', 'instructor', 'admin'];

const lessonTitles = [
  'Introducción y Objetivos del Curso',
  'Fundamentos Básicos',
  'Herramientas Necesarias',
  'Configuración del Entorno',
  'Primeros Pasos Prácticos',
  'Conceptos Intermedios',
  'Técnicas Avanzadas',
  'Estudio de Casos',
  'Mejores Prácticas',
  'Optimización y Rendimiento',
  'Resolución de Problemas Comunes',
  'Integración con Otras Tecnologías',
  'Proyecto Final - Parte 1',
  'Proyecto Final - Parte 2',
  'Conclusiones y Siguientes Pasos'
];

// Funciones de generación de datos de prueba con mayor diversidad
const generateCourse = (index: number): TestDataItem => {
  const id = uuidv4();
  const randomIndex = Math.floor(Math.random() * courseNames.length);
  const courseTitle = courseNames[randomIndex];
  const courseDescription = courseDescriptions[randomIndex];
  
  return {
    id,
    type: 'course',
    name: courseTitle,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000)), // Random date within the last 60 days
    data: {
      title: courseTitle,
      description: courseDescription,
      price: (Math.floor(Math.random() * 20) + 5) * 9.99,
      coverImage: `https://source.unsplash.com/random/800x600/?education,${encodeURIComponent(courseTitle.split(' ')[0])}`,
      duration: Math.floor(Math.random() * 20) + 5,
      lessons: Math.floor(Math.random() * 10) + 3,
      level: ['Principiante', 'Intermedio', 'Avanzado'][Math.floor(Math.random() * 3)],
      published: Math.random() > 0.3,
      category: ['Tecnología', 'Negocios', 'Diseño', 'Marketing', 'Idiomas'][Math.floor(Math.random() * 5)]
    }
  };
};

const generateUser = (index: number): TestDataItem => {
  const id = uuidv4();
  const fName = firstName[Math.floor(Math.random() * firstName.length)];
  const lName = lastName[Math.floor(Math.random() * lastName.length)];
  const role = roles[Math.floor(Math.random() * roles.length)];
  
  return {
    id,
    type: 'user',
    name: `${fName} ${lName}`,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)), // Random date within the last 90 days
    data: {
      email: `${fName.toLowerCase()}.${lName.toLowerCase()}${Math.floor(Math.random() * 100)}@ejemplo.com`,
      fullName: `${fName} ${lName}`,
      role: role,
      avatarUrl: `https://source.unsplash.com/random/150x150/?portrait&sig=${index}`,
      bio: `Profesional con experiencia en ${['desarrollo web', 'marketing digital', 'diseño gráfico', 'educación', 'gestión de proyectos'][Math.floor(Math.random() * 5)]}`,
      enrolledCourses: Math.floor(Math.random() * 5)
    }
  };
};

const generateLesson = (index: number): TestDataItem => {
  const id = uuidv4();
  const randomTitle = lessonTitles[Math.floor(Math.random() * lessonTitles.length)];
  const lessonOrder = index;
  
  const isVideo = Math.random() > 0.7;
  const videoUrls = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://www.youtube.com/watch?v=jNQXAC9IVRw',
    'https://www.youtube.com/watch?v=8fbyfDbi-MI',
    'https://www.youtube.com/watch?v=C0DPdy98e4c',
    'https://www.youtube.com/watch?v=QH2-TGUlwu4'
  ];
  
  return {
    id,
    type: 'lesson',
    name: randomTitle,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)), // Random date within the last 30 days
    data: {
      title: randomTitle,
      content: isVideo ? null : `# ${randomTitle}\n\nEste es el contenido de la lección **${index + 1}**. \n\n## Objetivos\n\n- Aprender los conceptos básicos\n- Practicar con ejemplos\n- Aplicar en casos reales\n\n## Contenido principal\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies ultrices, nisl nisl aliquet nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl aliquet nisl, eget ultricies nisl nisl eget nisl.`,
      videoUrl: isVideo ? videoUrls[Math.floor(Math.random() * videoUrls.length)] : null,
      duration: Math.floor(Math.random() * 60) + 10,
      order: lessonOrder,
      completed: Math.random() > 0.5,
    }
  };
};

const generateMessage = (index: number): TestDataItem => {
  const id = uuidv4();
  const senderIdx = Math.floor(Math.random() * firstName.length);
  const receiverIdx = Math.floor(Math.random() * firstName.length);
  const sender = `${firstName[senderIdx].toLowerCase()}.${lastName[senderIdx].toLowerCase()}@ejemplo.com`;
  const receiver = `${firstName[receiverIdx].toLowerCase()}.${lastName[receiverIdx].toLowerCase()}@ejemplo.com`;
  
  return {
    id,
    type: 'message',
    name: `Mensaje #${index + 1}`,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 14 * 24 * 60 * 60 * 1000)), // Random date within the last 14 days
    data: {
      subject: [
        'Consulta sobre el curso',
        'Problema con la lección',
        'Solicitud de información',
        'Dudas sobre el contenido',
        'Feedback sobre la plataforma'
      ][Math.floor(Math.random() * 5)],
      content: `Hola,\n\n${[
        'Me gustaría obtener más información sobre el curso.',
        'Estoy teniendo problemas para acceder a la lección.',
        'Quisiera saber si hay descuentos disponibles.',
        'Tengo algunas dudas sobre el contenido del módulo 3.',
        'Quiero compartir mi experiencia con la plataforma.'
      ][Math.floor(Math.random() * 5)]}\n\nSaludos,\n${firstName[senderIdx]}`,
      sender: sender,
      receiver: receiver,
      read: Math.random() > 0.5,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000))
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
