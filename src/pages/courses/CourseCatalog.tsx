
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { CourseCard } from '@/features/courses/components/CourseCard';
import { CourseFilters } from '@/features/courses/components/CourseFilters';
import { PageHeader } from '@/components/ui/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon, Filter } from 'lucide-react';
import { Course } from '@/types/course';
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const CourseCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('latest');
  
  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses', searchTerm, category, level, sortBy],
    queryFn: async () => {
      let query = supabase
        .from('courses')
        .select('*, instructor:instructor_id(id, full_name)')
        .eq('is_published', true);
      
      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }
      
      if (category) {
        query = query.eq('category', category);
      }
      
      if (level) {
        query = query.eq('level', level);
      }
      
      if (sortBy === 'latest') {
        query = query.order('created_at', { ascending: false });
      } else if (sortBy === 'popular') {
        query = query.order('student_count', { ascending: false });
      } else if (sortBy === 'price-low') {
        query = query.order('price', { ascending: true });
      } else if (sortBy === 'price-high') {
        query = query.order('price', { ascending: false });
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Course[];
    }
  });

  const { data: categories } = useQuery({
    queryKey: ['courseCategories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('course_categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <PageHeader
        title="Catálogo de Cursos"
        description="Explora nuestra oferta formativa y encuentra el curso que necesitas"
      />
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar cursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </form>
        
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
                <SheetDescription>
                  Filtra los cursos según tus preferencias
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4">
                <CourseFilters
                  categories={categories || []}
                  category={category}
                  setCategory={setCategory}
                  level={level}
                  setLevel={setLevel}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="hidden md:block w-64 shrink-0">
          <CourseFilters
            categories={categories || []}
            category={category}
            setCategory={setCategory}
            level={level}
            setLevel={setLevel}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
        
        <div className="flex-1">
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">Todos los cursos</TabsTrigger>
              <TabsTrigger value="featured">Destacados</TabsTrigger>
              <TabsTrigger value="new">Nuevos</TabsTrigger>
              <TabsTrigger value="popular">Populares</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="pt-4">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="border rounded-lg p-4">
                      <Skeleton className="h-40 w-full rounded-md mb-4" />
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-2" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  ))}
                </div>
              ) : courses?.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No se encontraron cursos que coincidan con tus criterios.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm('');
                      setCategory(null);
                      setLevel(null);
                      setSortBy('latest');
                    }}
                  >
                    Borrar filtros
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses?.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="featured">
              {/* Similar structure for featured courses */}
            </TabsContent>
            
            <TabsContent value="new">
              {/* Similar structure for new courses */}
            </TabsContent>
            
            <TabsContent value="popular">
              {/* Similar structure for popular courses */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CourseCatalog;
