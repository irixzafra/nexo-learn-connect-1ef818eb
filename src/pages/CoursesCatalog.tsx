
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SectionPageLayout from '@/layouts/SectionPageLayout';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CategorySelector } from "@/features/courses/components/CategorySelector";
import { AdvancedCourseFilters } from "@/features/courses/components/AdvancedCourseFilters";
import { CourseGrid } from "@/features/courses/components/CourseGrid";
import { CourseCatalogError } from "@/features/courses/components/CourseCatalogError";
import { CourseCardSkeleton } from "@/features/courses/components/CourseCardSkeleton";
import { useCoursesCatalog } from "@/features/courses/hooks/useCoursesCatalog";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Filter, RefreshCw, Search, BookOpen, Sparkles, ArrowRight, Flame } from "lucide-react";

const CoursesCatalog: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showPopular, setShowPopular] = useState(false);
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const {
    courses,
    isLoading,
    error,
    fetchCourses,
    filteredCourses
  } = useCoursesCatalog();

  // Extract unique categories
  const availableCategories = React.useMemo(() => {
    if (!courses) return [];
    const categories = courses
      .map((course) => course.category)
      .filter((category): category is string => !!category);
    return Array.from(new Set(categories));
  }, [courses]);

  // Extract unique tags
  const availableTags = React.useMemo(() => {
    if (!courses) return [];
    const tags = courses
      .flatMap((course) => course.tags || [])
      .filter(Boolean);
    return Array.from(new Set(tags));
  }, [courses]);

  const handleFilterChange = (filterData: any) => {
    if (filterData.level !== undefined) {
      setSelectedLevel(filterData.level);
    }
    
    if (filterData.category !== undefined) {
      setSelectedCategory(filterData.category);
    }
    
    if (filterData.price) {
      switch (filterData.price) {
        case 'free':
          setPriceRange([0, 0]);
          break;
        case 'paid':
          setPriceRange([1, 1000]);
          break;
        case 'all':
        default:
          setPriceRange([0, 1000]);
          break;
      }
    }
    
    if (filterData.sort) {
      setSortBy(filterData.sort);
    }
  };

  const handleCourseClick = (courseId: string, courseName?: string) => {
    navigate(`/courses/${courseId}`);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleClearFilters = () => {
    setSelectedLevel(null);
    setSelectedCategory(null);
    setSelectedTags([]);
    setPriceRange([0, 1000]);
    setShowPopular(false);
    setShowUpcoming(false);
    setSortBy("relevance");
  };

  return (
    <div className="relative">
      {/* Hero section with gradient background */}
      <div className="bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 pt-8 pb-16 md:pt-16 md:pb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Catálogo de Cursos</h1>
              <Sparkles className="h-6 w-6 text-amber-400" />
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explora nuestra colección premium de cursos y encuentra el perfecto para impulsar tu carrera.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar cursos, instructores o temas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-10 pr-4 rounded-full border border-input bg-background shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              />
              <Button 
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full px-4 h-9"
                variant="default"
                size="sm"
              >
                Buscar
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <Button size="sm" variant="outline" className="rounded-full">
                <Flame className="w-4 h-4 mr-1 text-amber-500" />
                Cursos populares
              </Button>
              <Button size="sm" variant="outline" className="rounded-full">Principiantes</Button>
              <Button size="sm" variant="outline" className="rounded-full">Certificados</Button>
              <Button size="sm" variant="outline" className="rounded-full">Gratuitos</Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between mb-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
            className="mt-4 md:mt-0"
          >
            <CategorySelector 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={availableCategories}
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <Button 
              variant="outline"
              onClick={handleToggleFilters}
              className="w-full md:w-auto"
            >
              <Filter className="mr-2 h-4 w-4" />
              {showFilters ? "Ocultar filtros" : "Filtros avanzados"}
            </Button>
          </motion.div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
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
              onClearFilters={handleClearFilters}
              availableCategories={availableCategories}
              availableTags={availableTags}
              onFilterChange={handleFilterChange}
            />
          </motion.div>
        )}

        <Separator className="my-6" />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <CourseCatalogError 
            message={error}
            onRetry={fetchCourses} 
          />
        ) : !filteredCourses || filteredCourses.length === 0 ? (
          <div className="bg-muted/20 rounded-lg p-10 text-center">
            <div className="max-w-md mx-auto">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No se encontraron cursos</h3>
              <p className="text-muted-foreground mb-6">
                No hay cursos que coincidan con los filtros seleccionados. Prueba ajustando tus criterios de búsqueda.
              </p>
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="flex items-center mx-auto"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Limpiar filtros
              </Button>
            </div>
          </div>
        ) : (
          <CourseGrid
            filteredCourses={filteredCourses}
            selectedCategory={selectedCategory || 'all'}
            onCourseClick={handleCourseClick}
          />
        )}
        
        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 mt-16 shadow-sm"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-muted-foreground mb-6">
              Explora nuestra variedad de rutas de aprendizaje diseñadas para guiarte paso a paso hasta dominar las habilidades que necesitas.
            </p>
            <Button className="group" size="lg">
              Explorar rutas de aprendizaje
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CoursesCatalog;
