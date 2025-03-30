
import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import CourseGrid, { FeaturedCourse } from '@/features/courses/components/CourseGrid';
import { CoursesHeader } from '@/features/courses/components/CoursesHeader';
import { LearningPathCard } from '@/features/courses/components/LearningPathCard';
import CategorySelector from '@/features/courses/components/CategorySelector';
import AdvancedCourseFilters from '@/features/courses/components/AdvancedCourseFilters';
import { Book, Code, Dumbbell, HeartPulse, Lightbulb, PenTool, Smartphone, Zap } from 'lucide-react';

const availableCategories = [
  { id: 'all', name: 'Todos', icon: Zap },
  { id: 'development', name: 'Desarrollo', icon: Code },
  { id: 'design', name: 'Diseño', icon: PenTool },
  { id: 'business', name: 'Negocios', icon: Lightbulb },
  { id: 'health', name: 'Salud', icon: HeartPulse },
  { id: 'fitness', name: 'Fitness', icon: Dumbbell },
  { id: 'technology', name: 'Tecnología', icon: Smartphone },
  { id: 'education', name: 'Educación', icon: Book },
];

// Learning Paths Mock Data
const learningPaths = [
  {
    id: '1',
    title: 'Desarrollo Web Full Stack',
    description: 'Domina el desarrollo web front-end y back-end con este completo path de aprendizaje.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
    courses: 5,
    duration: '6 meses',
    level: 'Intermedio',
    categories: ['development', 'technology'],
    badge: 'Popular'
  },
  {
    id: '2',
    title: 'Diseño UX/UI Profesional',
    description: 'Aprende a crear experiencias de usuario excepcionales y diseños visuales atractivos.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80',
    courses: 4,
    duration: '4 meses',
    level: 'Todos los niveles',
    categories: ['design'],
  },
  {
    id: '3',
    title: 'Marketing Digital Completo',
    description: 'Estrategias de marketing digital para aumentar la visibilidad y conversiones de tu negocio.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1426&q=80',
    courses: 6,
    duration: '5 meses',
    level: 'Principiante',
    categories: ['business'],
  }
];

// Mock courses data
const mockCourses: FeaturedCourse[] = [
  {
    id: "1",
    title: "Introducción a React con TypeScript",
    description: "Aprende a utilizar React con TypeScript desde cero hasta un nivel avanzado en este curso completo.",
    image_url: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    price: 49.99,
    instructor: {
      id: "i1",
      full_name: "Alex Moreno",
      name: "Alex Moreno",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    category: "development",
    level: "Principiante",
    duration: "12 horas",
    students_count: 1200,
    rating: 4.8,
    is_featured: true,
    currency: "eur",
    instructor_id: "i1",
    is_published: true,
    created_at: "2023-01-15T00:00:00Z",
    updated_at: "2023-01-15T00:00:00Z"
  },
  {
    id: "2",
    title: "Diseño UX/UI con Figma",
    description: "Domina el diseño de interfaces y experiencias de usuario utilizando Figma como herramienta principal.",
    image_url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    price: 39.99,
    instructor: {
      id: "i2",
      full_name: "Laura Sánchez",
      name: "Laura Sánchez",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    category: "design",
    level: "Intermedio",
    duration: "10 horas",
    students_count: 850,
    rating: 4.7,
    is_featured: true,
    start_date: "2023-09-15T00:00:00Z",
    currency: "eur",
    instructor_id: "i2",
    is_published: true,
    created_at: "2023-01-18T00:00:00Z",
    updated_at: "2023-01-18T00:00:00Z"
  },
  {
    id: "3",
    title: "Node.js: Desarrollo Backend Completo",
    description: "Aprende a crear aplicaciones backend escalables y robustas utilizando Node.js y Express.",
    image_url: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    price: 59.99,
    instructor: {
      id: "i3",
      full_name: "Carlos Rodríguez",
      name: "Carlos Rodríguez",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    category: "development",
    level: "Avanzado",
    duration: "16 horas",
    students_count: 740,
    rating: 4.9,
    currency: "eur",
    instructor_id: "i3",
    is_published: true,
    created_at: "2023-02-01T00:00:00Z",
    updated_at: "2023-02-01T00:00:00Z"
  },
  {
    id: "4",
    title: "Gestión de Proyectos Ágiles",
    description: "Metodologías ágiles para la gestión efectiva de proyectos digitales y equipos de desarrollo.",
    image_url: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    price: 44.99,
    instructor: {
      id: "i4",
      full_name: "Elena Martínez",
      name: "Elena Martínez",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    category: "business",
    level: "Intermedio",
    duration: "8 horas",
    students_count: 520,
    rating: 4.6,
    currency: "eur",
    instructor_id: "i4",
    is_published: true,
    created_at: "2023-02-15T00:00:00Z",
    updated_at: "2023-02-15T00:00:00Z"
  },
  {
    id: "5",
    title: "Introducción a la Inteligencia Artificial",
    description: "Fundamentos de IA, machine learning y aplicaciones prácticas en diferentes industrias.",
    image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    price: 64.99,
    instructor: {
      id: "i5",
      full_name: "Miguel Ángel López",
      name: "Miguel Ángel López",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    category: "technology",
    level: "Principiante-Intermedio",
    duration: "14 horas",
    students_count: 980,
    rating: 4.8,
    currency: "eur",
    instructor_id: "i5",
    is_published: true,
    created_at: "2023-03-01T00:00:00Z",
    updated_at: "2023-03-01T00:00:00Z"
  },
  {
    id: "6",
    title: "Nutrición y Bienestar Integral",
    description: "Aprende los principios de la nutrición saludable y cómo implementarlos para mejorar tu calidad de vida.",
    image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1753&q=80",
    price: 34.99,
    instructor: {
      id: "i6",
      full_name: "Ana García",
      name: "Ana García",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    category: "health",
    level: "Todos los niveles",
    duration: "9 horas",
    students_count: 1450,
    rating: 4.9,
    discount: 20,
    currency: "eur",
    instructor_id: "i6",
    is_published: true,
    created_at: "2023-03-15T00:00:00Z",
    updated_at: "2023-03-15T00:00:00Z"
  },
  {
    id: "7",
    title: "Desarrollo de Aplicaciones Móviles con Flutter",
    description: "Crea aplicaciones nativas para iOS y Android utilizando un solo código base con Flutter y Dart.",
    image_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    price: 49.99,
    instructor: {
      id: "i7",
      full_name: "Javier Torres",
      name: "Javier Torres",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    category: "development",
    level: "Intermedio",
    duration: "15 horas",
    students_count: 720,
    rating: 4.7,
    tags: ["flutter", "mobile", "dart"],
    currency: "eur",
    instructor_id: "i7",
    is_published: true,
    created_at: "2023-04-01T00:00:00Z",
    updated_at: "2023-04-01T00:00:00Z"
  },
  {
    id: "8",
    title: "Fotografía Digital para Principiantes",
    description: "Domina tu cámara digital y aprende los principios básicos de la fotografía para capturar imágenes impresionantes.",
    image_url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    price: 29.99,
    instructor: {
      id: "i8",
      full_name: "María Jiménez",
      name: "María Jiménez",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    category: "design",
    level: "Principiante",
    duration: "7 horas",
    students_count: 890,
    rating: 4.5,
    currency: "eur",
    instructor_id: "i8",
    is_published: true,
    created_at: "2023-04-15T00:00:00Z",
    updated_at: "2023-04-15T00:00:00Z"
  }
];

const CoursesCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredCourses, setFilteredCourses] = useState<FeaturedCourse[]>(mockCourses);
  const [activeTab, setActiveTab] = useState('courses');
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredCourses(mockCourses);
    } else {
      setFilteredCourses(mockCourses.filter(course => course.category === selectedCategory));
    }
  }, [selectedCategory]);
  
  const handleFilterChange = (filterData: any) => {
    let filtered = mockCourses;
    
    // Filter by category if not 'all'
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }
    
    // Apply additional filters
    if (filterData.level && filterData.level !== 'all') {
      filtered = filtered.filter(course => course.level.toLowerCase().includes(filterData.level.toLowerCase()));
    }
    
    if (filterData.duration && filterData.duration !== 'all') {
      // Simple duration filtering logic
      if (filterData.duration === 'short') {
        filtered = filtered.filter(course => parseInt(course.duration.split(' ')[0]) < 10);
      } else if (filterData.duration === 'medium') {
        const hours = parseInt(course.duration.split(' ')[0]);
        filtered = filtered.filter(course => hours >= 10 && hours <= 15);
      } else if (filterData.duration === 'long') {
        filtered = filtered.filter(course => parseInt(course.duration.split(' ')[0]) > 15);
      }
    }
    
    if (filterData.price && filterData.price !== 'all') {
      if (filterData.price === 'free') {
        filtered = filtered.filter(course => course.price === 0);
      } else if (filterData.price === 'paid') {
        filtered = filtered.filter(course => course.price > 0);
      } else if (filterData.price === 'discount') {
        filtered = filtered.filter(course => course.discount !== undefined && course.discount > 0);
      }
    }
    
    setFilteredCourses(filtered);
  };
  
  const filteredLearningPaths = selectedCategory === 'all' 
    ? learningPaths 
    : learningPaths.filter(path => path.categories.includes(selectedCategory));
  
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <CoursesHeader 
          title="Explora el conocimiento"
          subtitle="Descubre cursos y rutas de aprendizaje diseñados por expertos para impulsar tu carrera"
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />
        
        <div className="mb-8">
          <CategorySelector 
            categories={availableCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
        
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <AdvancedCourseFilters onFilterChange={handleFilterChange} />
          </motion.div>
        )}
        
        <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="courses">Cursos</TabsTrigger>
            <TabsTrigger value="paths">Rutas de Aprendizaje</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses">
            {filteredCourses.length > 0 ? (
              <CourseGrid 
                filteredCourses={filteredCourses} 
                selectedCategory={selectedCategory}
              />
            ) : (
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold mb-2">No se encontraron cursos</h3>
                <p className="text-muted-foreground mb-4">
                  No hay cursos disponibles para los filtros seleccionados.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="paths">
            {filteredLearningPaths.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLearningPaths.map((path, index) => (
                  <LearningPathCard 
                    key={path.id}
                    id={path.id}
                    title={path.title}
                    description={path.description}
                    image={path.image}
                    courses={path.courses}
                    duration={path.duration}
                    level={path.level}
                    categories={path.categories}
                    badge={path.badge}
                    index={index}
                    availableCategories={availableCategories}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold mb-2">No se encontraron rutas de aprendizaje</h3>
                <p className="text-muted-foreground mb-4">
                  No hay rutas disponibles para la categoría seleccionada.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default CoursesCatalog;
