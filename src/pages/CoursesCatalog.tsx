
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SectionPageLayout, { PageSection } from '@/layouts/SectionPageLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CoursesHeader } from "@/features/courses/components/CoursesHeader";
import { CategorySelector } from "@/features/courses/components/CategorySelector";
import { AdvancedCourseFilters } from "@/features/courses/components/AdvancedCourseFilters";
import { CourseGrid } from "@/features/courses/components/CourseGrid";
import { CourseCatalogError } from "@/features/courses/components/CourseCatalogError";
import { CourseCardSkeleton } from "@/features/courses/components/CourseCardSkeleton";
import { useCoursesCatalog } from "@/features/courses/hooks/useCoursesCatalog";
import { CatalogHeader } from "@/features/courses/components/CatalogHeader";
import { Loader2, RefreshCw, BookOpen, Filter as FilterIcon, Search as SearchIcon } from "lucide-react";
import { motion } from "framer-motion";

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
  const navigate = useNavigate();

  // Get available categories and tags
  const {
    courses,
    isLoading,
    error,
    fetchCourses,
    filteredCourses
  } = useCoursesCatalog();

  // Extract unique categories and tags from courses
  const availableCategories = React.useMemo(() => {
    if (!courses) return [];
    const categories = courses
      .map((course) => course.category)
      .filter((category): category is string => !!category);
    return Array.from(new Set(categories));
  }, [courses]);

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
    <SectionPageLayout
      header={{
        title: "Catálogo de Cursos",
        description: "Explora nuestra colección de cursos y encuentra el perfecto para ti",
        actions: [
          {
            label: "Filtros Avanzados",
            icon: <FilterIcon />,
            onClick: handleToggleFilters,
            variant: "outline"
          }
        ]
      }}
      filters={{
        searchPlaceholder: "Buscar cursos...",
        searchValue: searchTerm,
        onSearchChange: setSearchTerm
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <CategorySelector 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={availableCategories}
        />

        {showFilters && (
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
          <Card className="w-full">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="text-muted-foreground text-center mb-4">
                <p className="text-xl font-medium mb-2">No se encontraron cursos</p>
                <p>
                  No hay cursos que coincidan con los filtros seleccionados.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="flex items-center"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Limpiar filtros
              </Button>
            </CardContent>
          </Card>
        ) : (
          <CourseGrid
            filteredCourses={filteredCourses}
            selectedCategory={selectedCategory || 'all'}
            onCourseClick={handleCourseClick}
          />
        )}
      </motion.div>
    </SectionPageLayout>
  );
};

export default CoursesCatalog;
