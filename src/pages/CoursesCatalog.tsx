
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SectionPageLayout from '@/layouts/SectionPageLayout';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CategorySelector } from "@/features/courses/components/CategorySelector";
import { AdvancedCourseFilters } from "@/features/courses/components/AdvancedCourseFilters";
import { CourseCarousel } from "@/features/courses/components/CourseCarousel";
import { CourseCatalogError } from "@/features/courses/components/CourseCatalogError";
import { CourseCardSkeleton } from "@/features/courses/components/CourseCardSkeleton";
import { useCoursesCatalog } from "@/features/courses/hooks/useCoursesCatalog";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Filter, RefreshCw, Search, BookOpen, Sparkles, ArrowRight, Flame, GraduationCap } from "lucide-react";

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
    <div className="w-full overflow-x-hidden">
      {/* Hero section with gradient background */}
      <div className="bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container max-w-screen-xl mx-auto px-4 pt-6 pb-12 md:pt-10 md:pb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="text-center mb-6 md:mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Oferta Académica</h1>
              <Sparkles className="h-5 w-5 text-amber-400" />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explora nuestra selección premium de programas formativos diseñados para potenciar tu carrera profesional.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar cursos, instructores o temas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-9 pr-16 rounded-full border border-input bg-background shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              />
              <Button 
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full px-3 h-8 text-xs"
                variant="default"
                size="sm"
              >
                Buscar
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              <Button size="sm" variant="outline" className="rounded-full text-xs">
                <Flame className="w-3 h-3 mr-1 text-amber-500" />
                Populares
              </Button>
              <Button size="sm" variant="outline" className="rounded-full text-xs">Principiantes</Button>
              <Button size="sm" variant="outline" className="rounded-full text-xs">Certificados</Button>
              <Button size="sm" variant="outline" className="rounded-full text-xs">Gratuitos</Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container max-w-screen-xl mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between mb-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
            className="mt-4 md:mt-0 w-full md:w-auto"
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
            className="flex-shrink-0"
          >
            <Button 
              variant="outline"
              onClick={handleToggleFilters}
              className="w-full md:w-auto text-sm"
              size="sm"
            >
              <Filter className="mr-1.5 h-3.5 w-3.5" />
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
            className="mb-6"
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

        <Separator className="my-4" />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <CourseCatalogError 
            message={error}
            onRetry={fetchCourses} 
          />
        ) : !filteredCourses || filteredCourses.length === 0 ? (
          <div className="bg-muted/20 rounded-lg p-8 text-center">
            <div className="max-w-md mx-auto">
              <Search className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No se encontraron cursos</h3>
              <p className="text-muted-foreground mb-4">
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
          <CourseCarousel
            courses={filteredCourses}
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
          className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 md:p-8 mt-12 shadow-sm"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-muted-foreground mb-5 text-sm md:text-base">
              Explora nuestra variedad de rutas de aprendizaje diseñadas para guiarte paso a paso hasta dominar las habilidades que necesitas.
            </p>
            <Button className="group text-sm md:text-base px-4 py-2 md:px-6 md:py-2">
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
