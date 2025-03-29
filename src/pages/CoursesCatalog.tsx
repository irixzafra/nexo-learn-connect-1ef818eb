
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, BookOpen, Compass, Clock, TrendingUp, Filter, Search, Calendar } from 'lucide-react';
import { featuredCourses } from '@/features/courses/utils/featuredCoursesData';
import { useCoursesCatalog } from '@/features/courses/hooks/useCoursesCatalog';
import { CatalogHeader } from '@/features/courses/components/CatalogHeader';
import { AdvancedCourseFilters } from '@/features/courses/components/AdvancedCourseFilters';
import { EnhancedCourseCard } from '@/features/courses/components/EnhancedCourseCard';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const CoursesCatalog = () => {
  const { 
    filteredCourses, 
    isLoading, 
    error, 
    debugInfo, 
    searchTerm, 
    setSearchTerm, 
    clearFilters
  } = useCoursesCatalog();
  
  // Advanced filter state
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showPopular, setShowPopular] = useState(false);
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [visibleCourses, setVisibleCourses] = useState(6);
  const [hasError, setHasError] = useState(false);

  // Derived data for filters
  const availableCategories = Array.from(
    new Set(filteredCourses?.map(course => course.category || 'Sin categoría'))
  );
  
  const availableTags = Array.from(
    new Set(filteredCourses?.flatMap(course => course.tags || []))
  );

  // Reset visible courses when filters change
  useEffect(() => {
    setVisibleCourses(6);
  }, [selectedLevel, selectedCategory, selectedTags, priceRange, showPopular, showUpcoming, sortBy, searchTerm]);

  // Set error state based on API response
  useEffect(() => {
    setHasError(!!error);
  }, [error]);

  // Apply filters to courses
  const applyFilters = () => {
    if (!filteredCourses) return [];
    
    let result = [...filteredCourses];
    
    // Apply level filter
    if (selectedLevel) {
      result = result.filter(course => 
        course.level?.toLowerCase() === selectedLevel.toLowerCase()
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(course => 
        course.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Apply tags filter
    if (selectedTags.length > 0) {
      result = result.filter(course => 
        course.tags?.some(tag => selectedTags.includes(tag))
      );
    }
    
    // Apply price filter
    result = result.filter(course => 
      course.price >= priceRange[0] && course.price <= priceRange[1]
    );
    
    // Apply popular filter
    if (showPopular) {
      result = result.filter(course => 
        (course.popular_score && course.popular_score > 8) || 
        (course.student_count && course.student_count > 100) ||
        (course.rating && course.rating >= 4.5)
      );
    }
    
    // Apply upcoming filter
    if (showUpcoming) {
      const now = new Date();
      const twoWeeksFromNow = new Date();
      twoWeeksFromNow.setDate(now.getDate() + 14);
      
      result = result.filter(course => 
        course.start_date && 
        new Date(course.start_date) > now && 
        new Date(course.start_date) < twoWeeksFromNow
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "popular":
        result.sort((a, b) => (b.student_count || 0) - (a.student_count || 0));
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // By default, sort by relevance (no change)
        break;
    }
    
    return result;
  };

  const handleClearAllFilters = () => {
    setSelectedLevel(null);
    setSelectedCategory(null);
    setSelectedTags([]);
    setPriceRange([0, 1000]);
    setShowPopular(false);
    setShowUpcoming(false);
    setSortBy("relevance");
    setSearchTerm("");
    clearFilters();
    
    toast.info("Filtros eliminados", {
      description: "Mostrando todos los cursos disponibles"
    });
  };

  // Load more courses when button is clicked
  const handleLoadMore = () => {
    setVisibleCourses(prev => prev + 6);
  };

  const filteredAndSortedCourses = applyFilters();
  const coursesToShow = filteredAndSortedCourses?.slice(0, visibleCourses) || [];
  const hasMoreCourses = filteredAndSortedCourses && visibleCourses < filteredAndSortedCourses.length;

  // Container animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="py-6">
      <div className="mb-8">
        <CatalogHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <AdvancedCourseFilters
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          showPopular={showPopular}
          setShowPopular={setShowPopular}
          showUpcoming={showUpcoming}
          setShowUpcoming={setShowUpcoming}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onClearFilters={handleClearAllFilters}
          availableCategories={availableCategories}
          availableTags={availableTags}
        />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      ) : hasError ? (
        <Alert variant="destructive" className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error al cargar los cursos</AlertTitle>
          <AlertDescription>
            {error || "Error de recursión en políticas RLS. Por favor, contacte al administrador."}
          </AlertDescription>
          
          {debugInfo && (
            <div className="mt-6 text-sm">
              <h3 className="font-medium mb-2">Información de depuración:</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 my-2">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-700 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Detectado error de recursión RLS</p>
                    <p className="text-yellow-800">Revisar las políticas RLS de la tabla courses y la función get_user_role</p>
                  </div>
                </div>
              </div>
              
              <h3 className="font-medium my-2">Sugerencias de verificación:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Verificar que las políticas RLS estén correctamente configuradas</li>
                <li>Comprobar permisos de acceso para usuarios anónimos</li>
                <li>Revisar estructura de la tabla courses</li>
                <li>Verificar que existan cursos publicados en la base de datos</li>
                <li>Revisar que no haya recursión en las políticas RLS</li>
              </ul>
              
              <div className="bg-gray-100 rounded p-3 mt-4 font-mono text-xs overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </div>
            </div>
          )}
        </Alert>
      ) : filteredAndSortedCourses?.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Search className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">No se encontraron cursos</h3>
          <p className="text-muted-foreground mb-6">
            No hay cursos que coincidan con los criterios de búsqueda.
          </p>
          <Button onClick={handleClearAllFilters}>Ver todos los cursos</Button>
        </div>
      ) : (
        <>
          {/* Featured courses section */}
          {showPopular && filteredAndSortedCourses.some(course => course.rating && course.rating >= 4.5) && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Cursos Populares</h2>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredAndSortedCourses
                  .filter(course => course.rating && course.rating >= 4.5)
                  .slice(0, 3)
                  .map((course, index) => (
                    <EnhancedCourseCard 
                      key={course.id}
                      course={course}
                      index={index}
                      isPopular
                      isFeatured
                    />
                  ))}
              </motion.div>
            </div>
          )}
          
          {/* Upcoming courses section */}
          {showUpcoming && filteredAndSortedCourses.some(course => 
            course.start_date && new Date(course.start_date) > new Date()
          ) && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Cursos de Próximo Inicio</h2>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredAndSortedCourses
                  .filter(course => 
                    course.start_date && new Date(course.start_date) > new Date()
                  )
                  .slice(0, 3)
                  .map((course, index) => (
                    <EnhancedCourseCard 
                      key={course.id}
                      course={course}
                      index={index}
                      isUpcoming
                    />
                  ))}
              </motion.div>
            </div>
          )}
          
          {/* All courses grid */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">
                {searchTerm ? `Resultados para "${searchTerm}"` : 'Todos los Cursos'}
              </h2>
              <span className="text-sm text-muted-foreground ml-2">
                ({filteredAndSortedCourses.length} cursos)
              </span>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {coursesToShow.map((course, index) => (
                <EnhancedCourseCard 
                  key={course.id}
                  course={course}
                  index={index}
                  isPopular={course.rating && course.rating >= 4.5}
                  isNew={new Date(course.created_at) > new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)}
                  isUpcoming={course.start_date && new Date(course.start_date) > new Date()}
                />
              ))}
            </motion.div>
          </div>
          
          {hasMoreCourses && (
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={handleLoadMore}
                className="gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Cargar Más Cursos ({filteredAndSortedCourses.length - visibleCourses} restantes)
              </Button>
            </div>
          )}
          
          <div className="mt-16 bg-gradient-to-r from-primary/10 to-accent/20 dark:from-primary/20 dark:to-accent/30 rounded-lg p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">¿No encuentras lo que buscas?</h2>
                <p className="text-muted-foreground max-w-lg">
                  Explora nuestras categorías temáticas o comunícate con nuestro equipo para obtener recomendaciones personalizadas.
                </p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline">Contactar asesor</Button>
                <Button>Ver categorías</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesCatalog;
