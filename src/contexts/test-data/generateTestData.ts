
// Data generators for each test data type
export const generateMockData = {
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

// Helper to determine item name based on data type
export const getItemName = (type: string, data: any, index: number): string => {
  switch (type) {
    case 'course':
      return data.title;
    case 'user':
      return data.fullName;
    case 'lesson':
      return data.title;
    case 'message':
      return data.subject;
    case 'module':
      return data.title;
    case 'profile':
      return data.full_name;
    case 'assignment':
      return data.title;
    case 'category':
      return data.name;
    case 'enrollment':
      return `Enrollment ${index + 1}`;
    case 'quiz':
      return data.title;
    case 'certificate':
      return data.certificate_number;
    case 'payment':
      return `Payment ${index + 1}`;
    default:
      return 'Unknown';
  }
};
