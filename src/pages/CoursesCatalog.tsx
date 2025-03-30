import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  GraduationCap, 
  BookOpen, 
  Code, 
  LineChart, 
  Palette, 
  Languages, 
  Briefcase, 
  Award, 
  Flame,
  SlidersHorizontal
} from 'lucide-react';
import CourseGrid, { FeaturedCourse } from '@/features/courses/components/CourseGrid';
import { LearningPathCard } from '@/features/courses/components/LearningPathCard';
import { useMediaQuery } from '@/hooks/use-media-query';

// Categorías disponibles con iconos
const categories = [
  { id: 'all', name: 'Todos', icon: BookOpen },
  { id: 'masters', name: 'Másters', icon: GraduationCap },
  { id: 'programming', name: 'Programación', icon: Code },
  { id: 'business', name: 'Negocios', icon: Briefcase },
  { id: 'marketing', name: 'Marketing', icon: LineChart },
  { id: 'design', name: 'Diseño', icon: Palette },
  { id: 'languages', name: 'Idiomas', icon: Languages },
  { id: 'certificates', name: 'Certificaciones', icon: Award }
];

// Datos de ejemplo para rutas de aprendizaje
const learningPaths = [
  {
    id: "1",
    title: 'Full Stack Developer',
    description: 'Conviértete en un desarrollador completo dominando frontend y backend',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2831&q=80',
    courses: 5,
    duration: '6 meses',
    level: 'Intermedio',
    categories: ['programming', 'design'],
    badge: 'Popular'
  },
  {
    id: "2",
    title: 'Marketing Digital Avanzado',
    description: 'Aprende estrategias avanzadas de marketing digital para hacer crecer tu negocio',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2815&q=80',
    courses: 4,
    duration: '4 meses',
    level: 'Avanzado',
    categories: ['marketing', 'business']
  },
  {
    id: "3",
    title: 'Ciencia de Datos Completa',
    description: 'Domina Python, estadísticas y machine learning para análisis de datos',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    courses: 6,
    duration: '8 meses',
    level: 'Intermedio-Avanzado',
    categories: ['programming'],
    badge: 'Nuevo'
  }
];

// Datos de ejemplo para los cursos
const mockCourses: FeaturedCourse[] = [
  {
    id: "1",
    title: 'Máster en Desarrollo Web Full Stack',
    description: 'Aprende desarrollo web completo, desde el frontend con React hasta el backend con Node.js',
    image_url: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    price: 999,
    instructor: {
      name: 'Carlos Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    category: 'masters',
    level: 'Todos los niveles',
    duration: '6 meses',
    students_count: 1245,
    rating: 4.8,
    is_featured: true,
    tags: ['React', 'Node.js', 'JavaScript', 'MongoDB'],
    start_date: '2023-11-01',
    instructor_id: 'ins-001',
    is_published: true,
    created_at: '2023-01-15T12:00:00Z',
    updated_at: '2023-08-20T15:30:00Z',
    currency: 'eur'
  },
  {
    id: "2",
    title: 'Marketing Digital Completo',
    description: 'Domina todas las estrategias de marketing digital: SEO, SEM, redes sociales y más',
    image_url: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f5a70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80',
    price: 699,
    instructor: {
      name: 'Laura Gómez',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    category: 'marketing',
    level: 'Principiante a Intermedio',
    duration: '4 meses',
    students_count: 2356,
    rating: 4.7,
    is_featured: true,
    tags: ['SEO', 'Redes Sociales', 'Google Ads'],
    start_date: '2023-12-15',
    instructor_id: 'ins-002',
    is_published: true,
    created_at: '2023-02-10T10:00:00Z',
    updated_at: '2023-09-05T14:20:00Z',
    currency: 'eur'
  },
  {
    id: "3",
    title: 'Diseño UI/UX Profesional',
    description: 'Conviértete en un diseñador UI/UX profesional y crea interfaces atractivas y funcionales',
    image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2864&q=80',
    price: 799,
    instructor: {
      name: 'Miguel Ángel Durán',
      avatar: 'https://randomuser.me/api/portraits/men/36.jpg'
    },
    category: 'design',
    level: 'Intermedio',
    duration: '3 meses',
    students_count: 1856,
    rating: 4.9,
    tags: ['Figma', 'Adobe XD', 'Sketch', 'Principios de Diseño'],
    start_date: '2024-01-10',
    instructor_id: 'ins-003',
    is_published: true,
    created_at: '2023-03-15T09:30:00Z',
    updated_at: '2023-10-01T16:45:00Z',
    currency: 'eur'
  },
  {
    id: "4",
    title: 'Python para Ciencia de Datos',
    description: 'Aprende Python enfocado en análisis de datos, visualización y machine learning',
    image_url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    price: 849,
    instructor: {
      name: 'Ana Martínez',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    category: 'programming',
    level: 'Intermedio a Avanzado',
    duration: '5 meses',
    students_count: 1532,
    rating: 4.7,
    tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'],
    instructor_id: 'ins-004',
    is_published: true,
    created_at: '2023-04-20T11:15:00Z',
    updated_at: '2023-10-15T13:40:00Z',
    currency: 'eur'
  },
  {
    id: "5",
    title: 'MBA en Transformación Digital',
    description: 'Aprende a liderar la transformación digital en tu empresa con este MBA especializado',
    image_url: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80',
    price: 1299,
    instructor: {
      name: 'Francisco Javier López',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
    },
    category: 'masters',
    level: 'Avanzado',
    duration: '10 meses',
    students_count: 875,
    rating: 4.8,
    is_featured: true,
    tags: ['MBA', 'Transformación Digital', 'Liderazgo', 'Estrategia'],
    start_date: '2023-11-30',
    instructor_id: 'ins-005',
    is_published: true,
    created_at: '2023-05-05T10:00:00Z',
    updated_at: '2023-11-01T09:30:00Z',
    currency: 'eur'
  },
  {
    id: "6",
    title: 'Inglés para Negocios',
    description: 'Mejora tu inglés profesional para reuniones, presentaciones y comunicación empresarial',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    price: 599,
    instructor: {
      name: 'Elizabeth Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg'
    },
    category: 'languages',
    level: 'Intermedio',
    duration: '3 meses',
    students_count: 2145,
    rating: 4.6,
    tags: ['Inglés', 'Business English', 'Comunicación'],
    instructor_id: 'ins-006',
    is_published: true,
    created_at: '2023-06-10T14:20:00Z',
    updated_at: '2023-11-15T15:10:00Z',
    currency: 'eur'
  },
  {
    id: "7",
    title: 'Fundamentos de React Native',
    description: 'Aprende a crear aplicaciones móviles multiplataforma con React Native',
    image_url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2674&q=80',
    price: 649,
    instructor: {
      name: 'David Torres',
      avatar: 'https://randomuser.me/api/portraits/men/85.jpg'
    },
    category: 'programming',
    level: 'Intermedio',
    duration: '2 meses',
    students_count: 987,
    rating: 4.5,
    tags: ['React Native', 'JavaScript', 'Mobile Development'],
    instructor_id: 'ins-007',
    is_published: true,
    created_at: '2023-07-15T09:45:00Z',
    updated_at: '2023-12-01T11:30:00Z',
    currency: 'eur'
  },
  {
    id: "8",
    title: 'Certificación AWS Solutions Architect',
    description: 'Prepárate para obtener la certificación de AWS Solutions Architect Associate',
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2944&q=80',
    price: 749,
    instructor: {
      name: 'Roberto Sánchez',
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg'
    },
    category: 'certificates',
    level: 'Intermedio a Avanzado',
    duration: '2 meses',
    students_count: 1245,
    rating: 4.8,
    tags: ['AWS', 'Cloud', 'Certificación'],
    instructor_id: 'ins-008',
    is_published: true,
    created_at: '2023-08-20T13:15:00Z',
    updated_at: '2023-12-15T16:40:00Z',
    currency: 'eur'
  }
];

const CoursesCatalog: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('courses');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredCourses, setFilteredCourses] = useState<FeaturedCourse[]>(mockCourses);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    // Filter courses based on search query and selected category
    const filtered = mockCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategory]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section with search */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Explora nuestro catálogo de formación</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Encuentra cursos, másters, certificaciones y rutas de aprendizaje adaptados a tus necesidades
            </p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Buscar cursos, temas o habilidades..." 
                className="pl-10 h-12 rounded-full" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
          
          {/* Badges for popular searches - only on desktop */}
          {!isMobile && (
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              <Badge variant="outline" className="cursor-pointer hover:bg-primary/10" onClick={() => setSearchQuery('javascript')}>
                JavaScript
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary/10" onClick={() => setSearchQuery('marketing')}>
                Marketing Digital
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary/10" onClick={() => setSearchQuery('diseño')}>
                Diseño UX/UI
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary/10" onClick={() => setSearchQuery('data')}>
                Data Science
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary/10" onClick={() => setSearchQuery('inglés')}>
                Inglés
              </Badge>
            </div>
          )}
        </div>
      </section>
      
      {/* Category navigation */}
      <div className="bg-background sticky top-[56px] z-10 border-b">
        <div className="container mx-auto py-4">
          <ScrollArea className="pb-2">
            <div className={`flex ${isMobile ? 'gap-2' : 'gap-4'} px-1`}>
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                
                return (
                  <Card 
                    key={category.id}
                    className={`cursor-pointer transition-all duration-200 border ${
                      isActive 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border bg-background hover:bg-muted/50'
                    }`}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <CardContent className={`p-3 ${isMobile ? 'flex flex-col items-center text-center' : 'flex items-center gap-2'}`}>
                      <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`${isMobile ? 'text-xs mt-1' : 'text-sm'} font-medium ${isActive ? 'text-primary' : ''}`}>
                        {category.name}
                      </span>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
      
      {/* Main content with tabs */}
      <main className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <Tabs defaultValue="courses" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="courses" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Cursos
                </TabsTrigger>
                <TabsTrigger value="learning-paths" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Rutas de Aprendizaje
                </TabsTrigger>
              </TabsList>
              
              <Button variant="outline" size="sm" className="gap-1">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Filtros</span>
              </Button>
            </div>
            
            <TabsContent value="courses" className="mt-0">
              <CourseGrid 
                filteredCourses={filteredCourses} 
                selectedCategory={selectedCategory} 
              />
            </TabsContent>
            
            <TabsContent value="learning-paths" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningPaths.map((path, index) => (
                  <LearningPathCard 
                    key={path.id}
                    {...path}
                    index={index}
                    availableCategories={categories}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Promotional section at the bottom */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <Flame className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
            <p className="text-lg mb-6 text-blue-100">
              Contáctanos para recibir asesoramiento personalizado o para solicitar un curso específico
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Solicitar un curso
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-white/20 hover:text-white">
                Hablar con un asesor
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesCatalog;
