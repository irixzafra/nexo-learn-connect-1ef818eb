
import React from 'react';
import { Helmet } from 'react-helmet';
import { 
  CalendarDays, 
  Clock, 
  BookOpen, 
  UserCircle2, 
  CheckCircle, 
  Star, 
  Users, 
  GraduationCap,
  Award,
  ArrowRight
} from 'lucide-react';
import { Course } from '@/types/course';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface CourseLandingPageProps {
  course: Course;
  isEnrolled: boolean;
  isEnrolling: boolean;
  formatCurrency: (price: number) => string;
  handleEnroll: () => Promise<void>;
  totalLessons: number;
  previewableLessons: number;
}

export const CourseLandingPage: React.FC<CourseLandingPageProps> = ({
  course,
  isEnrolled,
  isEnrolling,
  formatCurrency,
  handleEnroll,
  totalLessons,
  previewableLessons
}) => {
  // Verificar descuento
  const hasDiscount = course.original_price !== undefined && course.price < (course.original_price || 0);
  const rating = course.rating || 4.5;
  const studentCount = course.student_count || '1000+';
  
  // Controlar la longitud de la descripción para mostrar solo un extracto inicialmente
  const shortDescription = course.description?.substring(0, 180) + '...';

  return (
    <>
      {/* SEO Optimization */}
      <Helmet>
        <title>{course.seo_title || course.title} | Nexo Learning Platform</title>
        <meta 
          name="description" 
          content={course.seo_description || course.description?.substring(0, 160) || ''} 
        />
        <meta property="og:title" content={course.title} />
        <meta property="og:description" content={course.seo_description || course.description?.substring(0, 160) || ''} />
        {course.cover_image_url && <meta property="og:image" content={course.cover_image_url} />}
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Left: Course Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl shadow-xl">
                <img 
                  src={course.cover_image_url || 'https://via.placeholder.com/800x450?text=Curso+No+Imagen'} 
                  alt={`Portada del curso: ${course.title}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                {course.badge && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1.5">
                      {course.badge}
                    </Badge>
                  </div>
                )}
                {hasDiscount && course.discount_percentage && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-destructive text-destructive-foreground font-bold px-3 py-1.5">
                      {course.discount_percentage}% DESCUENTO
                    </Badge>
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Hero Right: Course Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="order-1 lg:order-2 space-y-6"
            >
              {/* Category */}
              <Badge variant="outline" className="uppercase text-xs font-medium">
                {course.category || 'Curso'}
              </Badge>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {course.title}
              </h1>
              
              {/* Short description */}
              <p className="text-lg text-muted-foreground">
                {shortDescription}
              </p>
              
              {/* Instructor */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <UserCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Instructor</p>
                  <p className="text-sm text-muted-foreground">
                    {course.featured_instructor || 'Profesor Experto'}
                  </p>
                </div>
              </div>
              
              {/* Ratings and students */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(rating) 
                        ? 'text-amber-500 fill-amber-500' 
                        : 'text-muted-foreground'}`} 
                    />
                  ))}
                  <span className="ml-2 font-medium">{rating}</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>{typeof studentCount === 'number' 
                    ? `${studentCount.toLocaleString()} estudiantes` 
                    : `${studentCount} estudiantes`}
                  </span>
                </div>
              </div>
              
              {/* Price and CTA */}
              <div className="pt-4 space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold">
                    {course.price === 0 ? "Gratis" : formatCurrency(course.price)}
                  </span>
                  {hasDiscount && course.original_price && (
                    <span className="text-lg line-through text-muted-foreground">
                      {formatCurrency(course.original_price)}
                    </span>
                  )}
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto text-base font-semibold px-8"
                  onClick={handleEnroll}
                  disabled={isEnrolled || isEnrolling}
                >
                  {isEnrolling ? "Procesando..." : isEnrolled ? "Continuar aprendiendo" : "Inscríbete ahora"}
                </Button>
                
                <p className="text-sm text-muted-foreground">
                  {course.price === 0 
                    ? "Acceso completo sin costo" 
                    : "30 días de garantía de devolución"}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Info Bar */}
      <section className="py-8 bg-card border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <Clock className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Duración</h3>
              <p className="text-sm text-muted-foreground">{course.duration_text || 'A tu ritmo'}</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Lecciones</h3>
              <p className="text-sm text-muted-foreground">{totalLessons} lecciones</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <GraduationCap className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Nivel</h3>
              <p className="text-sm text-muted-foreground capitalize">{course.level || 'Todos los niveles'}</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <Award className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Certificado</h3>
              <p className="text-sm text-muted-foreground">Incluido</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Course Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* About This Course */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6">Sobre este curso</h2>
                <div className="prose prose-slate max-w-none">
                  <p className="whitespace-pre-line">{course.description}</p>
                </div>
              </motion.div>
              
              {/* What You'll Learn */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6">Qué aprenderás</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* TODO: Implementar lista de objetivos de aprendizaje */}
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Objetivo de aprendizaje {i + 1}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Course Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6">Contenido del curso</h2>
                <Card>
                  <CardHeader className="pb-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {totalLessons} lecciones • {course.duration_text || 'Duración total'}
                        </p>
                      </div>
                      {!isEnrolled && previewableLessons > 0 && (
                        <div className="text-sm text-primary">
                          {previewableLessons} lecciones de vista previa
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* TODO: Implementar visualización de módulos y lecciones */}
                    <div className="space-y-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold">Módulo {i + 1}: Título del módulo</h3>
                            <span className="text-sm text-muted-foreground">3 lecciones</span>
                          </div>
                          <div className="pl-6 space-y-2">
                            {Array.from({ length: 3 }).map((_, j) => (
                              <div key={j} className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">Lección {j + 1}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">15:00</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Prerequisites */}
              {course.prerequisites_text && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold mb-6">Requisitos previos</h2>
                  <Card>
                    <CardContent className="p-6">
                      <p className="whitespace-pre-line">{course.prerequisites_text}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
              
              {/* Tags Section */}
              {course.tags && course.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="pt-4"
                >
                  <h2 className="text-3xl font-bold mb-6">Etiquetas</h2>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Right Column: Sidebar */}
            <div className="space-y-6">
              {/* Course Info Card */}
              <Card className="overflow-hidden border border-primary/10 shadow-lg sticky top-6">
                <div className="bg-primary/5 p-6">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-primary">
                      {course.price === 0 ? "Gratis" : formatCurrency(course.price)}
                    </span>
                    {hasDiscount && course.original_price && (
                      <span className="text-lg line-through text-muted-foreground">
                        {formatCurrency(course.original_price)}
                      </span>
                    )}
                  </div>
                  
                  <Button
                    onClick={handleEnroll}
                    disabled={isEnrolled || isEnrolling}
                    className="mt-4 w-full"
                    size="lg"
                  >
                    {isEnrolling ? "Procesando..." : isEnrolled ? "Continuar aprendiendo" : "Inscríbete ahora"}
                  </Button>
                  
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    {course.price === 0 
                      ? "Acceso completo sin costo" 
                      : "30 días de garantía de devolución"}
                  </p>
                </div>
                
                <CardContent className="p-6">
                  {/* Course Features */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duración:</span>
                      <span className="font-medium">{course.duration_text || "A tu ritmo"}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Nivel:</span>
                      <span className="font-medium capitalize">{course.level || "Todos los niveles"}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Lecciones:</span>
                      <span className="font-medium">{totalLessons}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Instructor:</span>
                      <span className="font-medium">{course.featured_instructor || "Equipo Nexo"}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Categoría:</span>
                      <Badge variant="outline" className="capitalize">
                        {course.category || "General"}
                      </Badge>
                    </div>
                    
                    <Separator />
                    
                    {/* Preview content info */}
                    {!isEnrolled && previewableLessons > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Contenido disponible:</span>
                          <span className="font-medium">{previewableLessons} / {totalLessons} lecciones</span>
                        </div>
                        <Progress 
                          value={(previewableLessons / totalLessons) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Course Benefits */}
                  <div className="mt-6 space-y-4">
                    <h4 className="font-medium">Este curso incluye:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Acceso de por vida al contenido</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Certificado de finalización</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Proyectos prácticos</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Recursos descargables</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Atención personalizada</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              {/* Testimonial Card */}
              <Card className="border border-primary/10 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Lo que dicen nuestros estudiantes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <p className="text-sm italic">
                      "Este curso ha superado todas mis expectativas. El contenido está muy bien estructurado y el instructor explica los conceptos de manera clara y concisa."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserCircle2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">María García</p>
                        <p className="text-xs text-muted-foreground">Estudiante</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">¿Listo para empezar tu aprendizaje?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Da el siguiente paso en tu formación profesional con este curso completo.
            </p>
            <Button 
              size="lg" 
              className="text-base font-semibold px-8"
              onClick={handleEnroll}
              disabled={isEnrolled || isEnrolling}
            >
              {isEnrolling ? "Procesando..." : isEnrolled ? "Continuar aprendiendo" : "Inscríbete ahora"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

