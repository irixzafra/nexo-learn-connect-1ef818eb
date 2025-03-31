
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FeaturedCourseCard } from '@/features/courses/components/FeaturedCourseCard';
import { ArrowRight } from 'lucide-react';
import { Course } from '@/types/course';

interface FeaturedCoursesSectionProps {
  courses: any[];
  isLoading: boolean;
}

const FeaturedCoursesSection: React.FC<FeaturedCoursesSectionProps> = ({ 
  courses, 
  isLoading 
}) => {
  // Convertir los cursos al formato esperado por FeaturedCourseCard
  const formattedCourses = courses.map(course => ({
    id: course.id,
    title: course.title,
    description: course.description || "Sin descripción disponible",
    instructor: course.featured_instructor || "Instructor Nexo",
    price: course.price || 0,
    rating: course.rating || 4.5,
    students: course.student_count || 0,
    hours: 10, // Valor por defecto ya que no tenemos esta info
    level: course.level || "Todos los niveles",
    category: course.category || "General",
    image: course.cover_image_url || "https://via.placeholder.com/800x450?text=Curso+Nexo"
  }));

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Cursos destacados</h2>
            <p className="text-muted-foreground max-w-2xl">
              Descubre nuestra selección de cursos más populares y empieza tu aprendizaje hoy mismo
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 group" asChild>
            <Link to="/courses">
              Ver todos los cursos
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-muted animate-pulse rounded-xl h-[400px]"></div>
            ))}
          </div>
        ) : formattedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formattedCourses.slice(0, 6).map((course, index) => (
              <FeaturedCourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No hay cursos disponibles en este momento.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;
