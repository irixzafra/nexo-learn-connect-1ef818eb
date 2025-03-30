
import React, { Suspense, useState, useRef, useEffect } from 'react';
import { useCoursesCatalog } from '@/features/courses/hooks/useCoursesCatalog';
import { LoadingPage } from '@/components/ui/loading-page';
import { CourseCardSkeleton } from '@/features/courses/components/CourseCardSkeleton';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Search, Filter, Code, PenTool, BookMarked, Briefcase, 
  TrendingUp, BarChart3, Lightbulb, Award, ChevronRight, ChevronLeft,
  Clock, Signal, Users
} from 'lucide-react';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { EnhancedCourseCard } from '@/features/courses/components/EnhancedCourseCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

// Definir categorías con iconos
const categories = [
  { id: 'all', name: 'Todos', icon: BookOpen },
  { id: 'development', name: 'Desarrollo', icon: Code },
  { id: 'design', name: 'Diseño', icon: PenTool },
  { id: 'business', name: 'Negocios', icon: Briefcase },
  { id: 'marketing', name: 'Marketing', icon: TrendingUp },
  { id: 'data', name: 'Datos', icon: BarChart3 },
  { id: 'personal', name: 'Personal', icon: Lightbulb }
];

// Definir rutas de aprendizaje
const learningPaths = [
  {
    id: 1,
    title: 'Máster en Desarrollo Web Full Stack',
    description: 'Domina el desarrollo web desde el frontend hasta el backend',
    image: 'https://placehold.co/600x400?text=Master+Web',
    courses: 8,
    duration: '10 meses',
    level: 'Intermedio-Avanzado',
    categories: ['development', 'design'],
    badge: 'Popular'
  },
  {
    id: 2,
    title: 'Máster en Marketing Digital',
    description: 'Estrategias avanzadas para el crecimiento de negocios online',
    image: 'https://placehold.co/600x400?text=Master+Marketing',
    courses: 6,
    duration: '8 meses',
    level: 'Todos los niveles',
    categories: ['marketing', 'business'],
    badge: 'Certificado'
  },
  {
    id: 3,
    title: 'Ruta Data Science',
    description: 'Desde el análisis de datos básico hasta machine learning avanzado',
    image: 'https://placehold.co/600x400?text=Ruta+Data',
    courses: 7,
    duration: '9 meses',
    level: 'Básico-Avanzado',
    categories: ['data', 'development'],
    badge: 'Nuevo'
  },
  {
    id: 4,
    title: 'Máster UX/UI Design',
    description: 'Diseño centrado en el usuario y experiencias digitales',
    image: 'https://placehold.co/600x400?text=Master+UX/UI',
    courses: 5,
    duration: '7 meses',
    level: 'Intermedio',
    categories: ['design'],
    badge: 'Tendencia'
  }
];

const CoursesCatalog: React.FC = () => {
  const { 
    filteredCourses, 
    isLoading, 
    error, 
    searchTerm, 
    setSearchTerm, 
    clearFilters,
    fetchCourses 
  } = useCoursesCatalog();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<string>('courses');
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        const heroHeight = heroRef.current.offsetHeight;
        setIsHeroVisible(scrollPosition < heroHeight / 2);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Filtrar cursos por categoría
  const filteredByCategory = selectedCategory === 'all' 
    ? filteredCourses 
    : filteredCourses.filter(course => 
        course.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        course.tags?.includes(selectedCategory)
      );
  
  // Filtrar rutas de aprendizaje por categoría
  const filteredPaths = selectedCategory === 'all'
    ? learningPaths
    : learningPaths.filter(path => 
        path.categories.includes(selectedCategory)
      );
  
  // Manejar error
  if (error) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error al cargar los cursos</h2>
        <p className="mb-6">{error}</p>
        <Button onClick={fetchCourses}>Intentar de nuevo</Button>
      </div>
    );
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    const Icon = category?.icon || BookOpen;
    return <Icon className="h-5 w-5" />;
  };

  return (
    <div className="relative min-h-screen pb-12">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-12 md:py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('public/lovable-uploads/ed420cd9-2fc1-4d89-b094-dbb7096664a6.png')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Aprende sin límites</h1>
            <p className="text-xl opacity-90 mb-8">
              Explora nuestro catálogo de cursos y rutas de aprendizaje diseñados por expertos 
              para impulsar tu carrera profesional.
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar cursos, temas, instructores..."
                className="pl-10 py-6 rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Navegación de categorías */}
      <div className={cn(
        "sticky top-0 z-10 bg-background border-b transition-all duration-300",
        !isHeroVisible ? "shadow-md" : ""
      )}>
        <div className="container mx-auto">
          <div className="flex justify-between items-center py-2 md:py-3">
            <ScrollArea className="w-full">
              <div className="flex space-x-2 p-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === category.id;
                  
                  return (
                    <Button
                      key={category.id}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-1.5"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{category.name}</span>
                    </Button>
                  );
                })}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </div>
        
      <div className="container mx-auto px-4 py-8">
        {/* Tabs para cambiar entre cursos y rutas */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="courses" className="px-6">Cursos</TabsTrigger>
              <TabsTrigger value="paths" className="px-6">Rutas de aprendizaje</TabsTrigger>
            </TabsList>
            
            {selectedCategory !== 'all' && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedCategory('all')}>
                Borrar filtros
              </Button>
            )}
          </div>
          
          {/* Contenido de cursos */}
          <TabsContent value="courses" className="mt-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CourseCardSkeleton count={6} />
              </div>
            ) : filteredByCategory.length > 0 ? (
              <div>
                {/* Destacados */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Award className="mr-2 h-6 w-6 text-primary" />
                    Cursos destacados
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredByCategory.slice(0, 3).map((course, index) => (
                      <EnhancedCourseCard 
                        key={course.id} 
                        course={course} 
                        index={index}
                        isPopular={index === 0}
                        isNew={index === 1}
                      />
                    ))}
                  </div>
                </section>
                
                {/* Resto de cursos */}
                <section>
                  <h2 className="text-2xl font-bold mb-6">Todos los cursos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredByCategory.slice(3).map((course, index) => (
                      <EnhancedCourseCard key={course.id} course={course} index={index} />
                    ))}
                  </div>
                </section>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-block p-6 bg-muted rounded-full mb-4">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No encontramos cursos</h3>
                <p className="text-muted-foreground mb-6">
                  No hay cursos que coincidan con tu búsqueda o filtros. Intenta con otros términos.
                </p>
                <Button onClick={clearFilters}>Ver todos los cursos</Button>
              </div>
            )}
          </TabsContent>
          
          {/* Contenido de rutas de aprendizaje */}
          <TabsContent value="paths" className="mt-4">
            {filteredPaths.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <BookMarked className="mr-2 h-6 w-6 text-primary" />
                  Másters y rutas de especialización
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPaths.map((path) => (
                    <Link key={path.id} to={`/learning-paths/${path.id}`}>
                      <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300">
                        <div className="aspect-video relative">
                          <img src={path.image} alt={path.title} className="w-full h-full object-cover" />
                          {path.badge && (
                            <Badge className="absolute top-3 right-3 bg-primary">{path.badge}</Badge>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                          <p className="text-muted-foreground mb-4">{path.description}</p>
                          
                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-4">
                            <div className="flex items-center gap-1.5">
                              <BookOpen className="h-4 w-4 text-primary" />
                              <span>{path.courses} cursos</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4 text-primary" />
                              <span>{path.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Signal className="h-4 w-4 text-primary" />
                              <span>{path.level}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex gap-1">
                              {path.categories.map(cat => (
                                <Badge key={cat} variant="outline" className="flex items-center gap-1">
                                  {getCategoryIcon(cat)}
                                  <span>{categories.find(c => c.id === cat)?.name}</span>
                                </Badge>
                              ))}
                            </div>
                            <Button variant="outline" size="sm" className="gap-1">
                              Ver detalle <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="inline-block p-6 bg-muted rounded-full mb-4">
                  <BookMarked className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No encontramos rutas</h3>
                <p className="text-muted-foreground mb-6">
                  No hay rutas de aprendizaje que coincidan con tu búsqueda o filtros.
                </p>
                <Button onClick={() => setSelectedCategory('all')}>Ver todas las rutas</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* CTA Promocional */}
      <div className="container mx-auto px-4 my-12">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 md:p-12 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('public/lovable-uploads/ed420cd9-2fc1-4d89-b094-dbb7096664a6.png')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
          <div className="relative z-10 md:max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Quieres avanzar más rápido en tu carrera?</h2>
            <p className="text-white/90 mb-6">
              Nuestros programas premium te ofrecen mentoría personalizada, acceso a recursos exclusivos
              y un camino estructurado hacia tu objetivo profesional.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90">
                Explorar programas premium
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Hablar con un asesor
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navegación móvil de categorías - visible solo en móvil */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-2 md:hidden">
        <ScrollArea className="w-full">
          <div className="flex space-x-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              
              return (
                <Button
                  key={category.id}
                  variant={isActive ? "default" : "outline"}
                  size="icon"
                  onClick={() => setSelectedCategory(category.id)}
                  className="rounded-full h-10 w-10 flex-shrink-0"
                  title={category.name}
                >
                  <Icon className="h-5 w-5" />
                </Button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default CoursesCatalog;
