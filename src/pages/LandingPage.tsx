
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Bookmark, CheckCircle, Clock, Smartphone, Cpu, Database, CloudLightning, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAppNavigation } from '@/utils/routeUtils';

const LandingPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { courses: featuredCourses, isLoading } = useCoursesCatalog();
  const { routes } = useAppNavigation();
  
  // Obtener solo los primeros 6 cursos para mostrar en la sección destacada
  const topCourses = featuredCourses?.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <LandingHero isAuthenticated={isAuthenticated} />
      
      {/* Estadísticas de la plataforma */}
      <StatsSection />
      
      {/* Next on Roadmap Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-10">
            <Badge variant="outline" className="mb-2">Próximamente</Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Próximas Funcionalidades</h2>
            <p className="text-muted-foreground max-w-[700px]">
              Estamos constantemente mejorando nuestra plataforma para brindar la mejor experiencia de aprendizaje
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Certificados Verificables
                </CardTitle>
                <CardDescription>Ya disponible</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Nuestros certificados ahora incluyen códigos QR y un sistema de verificación público para validar su autenticidad.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to={routes.certificateVerificationPortal}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Verificar un Certificado
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-primary" />
                  Credenciales Digitales
                </CardTitle>
                <CardDescription>En desarrollo</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Integración con blockchain para emitir credenciales digitales permanentes y verificables por cualquier institución.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Aprendizaje Adaptativo
                </CardTitle>
                <CardDescription>Próximamente</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Algoritmos de IA que adaptan el contenido según tu ritmo de aprendizaje y fortalezas personales.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  Aplicación Móvil Nativa
                </CardTitle>
                <CardDescription>Q4 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Accede a tus cursos desde cualquier lugar con nuestra app móvil optimizada para aprendizaje en movimiento, con soporte para modo offline.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  Tutor Virtual Inteligente
                </CardTitle>
                <CardDescription>En investigación</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Un asistente de aprendizaje potenciado por IA que resuelve dudas, recomienda recursos y crea planes de estudio personalizados.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/docs/ROADMAP_ERP_LMS.md">
              <Button variant="link" className="text-primary">
                Ver roadmap completo <Lightbulb className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
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
  );
};

export default LandingPage;
