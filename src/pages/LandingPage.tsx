
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCoursesCatalog } from '@/features/courses/hooks/useCoursesCatalog';
import { ChevronRight, CheckCircle, Users, Shield, BookOpen, Zap } from 'lucide-react';

// Componentes de la landing
import LandingNav from '@/components/LandingNav';
import LandingHero from '@/components/landing/LandingHero';
import FeaturedCoursesSection from '@/components/landing/FeaturedCoursesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import CallToActionSection from '@/components/landing/CallToActionSection';
import LandingFooter from '@/components/landing/LandingFooter';
import PartnersSection from '@/components/landing/PartnersSection';
import StatsSection from '@/components/landing/StatsSection';

const LandingPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { courses: featuredCourses, isLoading } = useCoursesCatalog();
  
  // Obtener solo los primeros 6 cursos para mostrar en la sección destacada
  const topCourses = featuredCourses.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Navegación */}
      <LandingNav />
      
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
      
      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
