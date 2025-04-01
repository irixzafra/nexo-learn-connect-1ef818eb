
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCoursesCatalog } from '@/features/courses/hooks/useCoursesCatalog';
import PublicLayout from '@/layouts/PublicLayout';

// Componentes de la landing
import LandingHero from '@/components/landing/LandingHero';
import FeaturedCoursesSection from '@/components/landing/FeaturedCoursesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import CallToActionSection from '@/components/landing/CallToActionSection';
import PartnersSection from '@/components/landing/PartnersSection';
import StatsSection from '@/components/landing/StatsSection';

const LandingPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { courses: featuredCourses, isLoading } = useCoursesCatalog();
  
  // Obtener solo los primeros 6 cursos para mostrar en la sección destacada
  const topCourses = featuredCourses?.slice(0, 6) || [];

  return (
    <PublicLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <LandingHero isAuthenticated={isAuthenticated} />
        
        {/* Estadísticas de la plataforma */}
        <StatsSection />
        
        {/* Sección de características */}
        <FeatureGrid />
        
        {/* Cursos destacados */}
        <FeaturedCoursesSection 
          courses={topCourses} 
          isLoading={isLoading} 
        />
        
        {/* Sección de partners y confianza */}
        <PartnersSection />
        
        {/* Testimonios */}
        <TestimonialsSection />
        
        {/* Call to Action */}
        <CallToActionSection isAuthenticated={isAuthenticated} />
      </div>
    </PublicLayout>
  );
};

export default LandingPage;
