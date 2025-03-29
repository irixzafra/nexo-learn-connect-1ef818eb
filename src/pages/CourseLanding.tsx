
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCourseDetails } from "@/features/courses/hooks/useCourseDetails";
import { useEnrollment } from "@/features/courses/hooks/useEnrollment";
import PublicLayout from "@/layouts/PublicLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Award, 
  UserCheck, 
  FileText, 
  PlayCircle, 
  DollarSign,
  Loader2 
} from "lucide-react";
import { motion } from "framer-motion";

const CourseLanding: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { course, modules, modulesWithLessons, isLoading } = useCourseDetails(id);
  const { isEnrolled, isEnrolling, isChecking, handleEnroll } = useEnrollment(id || '');
  
  const [expandedFAQs, setExpandedFAQs] = React.useState<string[]>([]);
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  const formatCurrency = (price: number, currency: string) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(price);
  };
  
  // Count total lessons
  const totalLessons = modulesWithLessons?.reduce(
    (total, module) => total + module.lessons.length,
    0
  ) || 0;
  
  // Count previewable lessons
  const previewableLessons = modulesWithLessons?.reduce(
    (total, module) => 
      total + module.lessons.filter(lesson => lesson.is_previewable).length,
    0
  ) || 0;
  
  if (isLoading || isChecking) {
    return (
      <PublicLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PublicLayout>
    );
  }
  
  if (!course) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold mb-4">Curso no encontrado</h1>
          <p className="mb-6">El curso que estás buscando no está disponible o ha sido eliminado.</p>
          <Button onClick={() => navigate('/courses')}>Ver todos los cursos</Button>
        </div>
      </PublicLayout>
    );
  }
  
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-primary/5 pt-16 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4">{course.level || 'Curso completo'}</Badge>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{course.seo_description || course.description}</p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{course.duration_text || "Curso completo"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>{totalLessons} lecciones</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  <span>Acceso completo</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={handleEnroll}
                  disabled={isEnrolled || isEnrolling}
                >
                  {isEnrolled ? "Ya estás inscrito" : 
                   isEnrolling ? "Inscribiendo..." : 
                   course.price > 0 ? "Inscribirme por " + formatCurrency(course.price, course.currency) : "Inscribirme gratis"}
                </Button>
                
                {isEnrolled && (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => navigate(`/courses/${id}/learn`)}
                  >
                    Continuar aprendiendo
                  </Button>
                )}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block rounded-lg overflow-hidden shadow-xl"
            >
              {course.cover_image_url ? (
                <img 
                  src={course.cover_image_url} 
                  alt={course.title} 
                  className="w-full h-[400px] object-cover"
                />
              ) : (
                <div className="w-full h-[400px] bg-muted flex items-center justify-center">
                  <BookOpen className="h-24 w-24 text-muted-foreground/30" />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Course Overview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-6">Descripción del curso</h2>
                <div className="prose prose-sm sm:prose lg:prose-lg max-w-none mb-12">
                  <p>{course.description}</p>
                </div>
                
                {course.prerequisites_text && (
                  <div className="mb-12">
                    <h3 className="text-xl font-semibold mb-4">Requisitos previos</h3>
                    <div className="prose max-w-none">
                      <p>{course.prerequisites_text}</p>
                    </div>
                  </div>
                )}
                
                <h3 className="text-xl font-semibold mb-4">Lo que aprenderás</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <motion.div variants={item} className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Dominarás los conceptos clave presentados en el curso</span>
                    </motion.div>
                    <motion.div variants={item} className="flex gap-2 mt-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Aplicarás los conocimientos con ejercicios prácticos</span>
                    </motion.div>
                    <motion.div variants={item} className="flex gap-2 mt-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Desarrollarás habilidades en un entorno de aprendizaje estructurado</span>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <motion.div variants={item} className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Recibirás feedback en tiempo real sobre tu progreso</span>
                    </motion.div>
                    <motion.div variants={item} className="flex gap-2 mt-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Obtendrás un certificado al finalizar satisfactoriamente</span>
                    </motion.div>
                    <motion.div variants={item} className="flex gap-2 mt-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Tendrás acceso a materiales adicionales y recursos complementarios</span>
                    </motion.div>
                  </motion.div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Temario del curso</h3>
                <div className="mb-12">
                  <Accordion type="single" collapsible className="w-full">
                    {modulesWithLessons?.map((module, index) => (
                      <AccordionItem key={module.id} value={module.id}>
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center gap-3 text-left">
                            <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center text-primary font-medium">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium">{module.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{module.lessons.length} lecciones</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="pl-11 space-y-4 my-2">
                            {module.lessons.map((lesson) => (
                              <li key={lesson.id} className="flex items-start gap-3">
                                {lesson.content_type === 'video' ? (
                                  <PlayCircle className="h-5 w-5 text-primary mt-0.5" />
                                ) : (
                                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                                )}
                                <div>
                                  <p className="font-medium">{lesson.title}</p>
                                  {lesson.is_previewable && (
                                    <Button 
                                      variant="link" 
                                      className="h-auto p-0 text-xs text-primary"
                                      onClick={() => navigate(`/courses/${id}/learn/${lesson.id}`)}
                                    >
                                      Ver vista previa
                                    </Button>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Preguntas frecuentes</h3>
                <Accordion 
                  type="multiple" 
                  value={expandedFAQs}
                  onValueChange={setExpandedFAQs}
                  className="w-full mb-12"
                >
                  <AccordionItem value="faq-1">
                    <AccordionTrigger className="hover:no-underline py-4">
                      ¿Cómo accedo al contenido del curso?
                    </AccordionTrigger>
                    <AccordionContent>
                      Una vez inscrito, podrás acceder a todo el contenido del curso desde tu panel de aprendizaje. 
                      Puedes ver las lecciones a tu propio ritmo y desde cualquier dispositivo.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq-2">
                    <AccordionTrigger className="hover:no-underline py-4">
                      ¿Por cuánto tiempo tendré acceso al curso?
                    </AccordionTrigger>
                    <AccordionContent>
                      Una vez inscrito, tendrás acceso ilimitado al curso. Puedes revisitar el contenido tantas veces como necesites.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq-3">
                    <AccordionTrigger className="hover:no-underline py-4">
                      ¿Recibiré algún certificado al completar el curso?
                    </AccordionTrigger>
                    <AccordionContent>
                      Sí, al completar todas las lecciones y aprobar las evaluaciones correspondientes, 
                      podrás descargar un certificado de finalización que valida tus conocimientos adquiridos.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq-4">
                    <AccordionTrigger className="hover:no-underline py-4">
                      ¿Cómo puedo obtener ayuda si tengo problemas?
                    </AccordionTrigger>
                    <AccordionContent>
                      Cada lección tiene una sección de comentarios donde puedes realizar consultas. 
                      También puedes contactar directamente al equipo de soporte a través de la plataforma.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>{course.price > 0 ? formatCurrency(course.price, course.currency) : "Curso gratuito"}</CardTitle>
                    <CardDescription>{previewableLessons > 0 && `${previewableLessons} lecciones en vista previa`}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Este curso incluye:</h4>
                      <ul className="space-y-3">
                        <li className="flex gap-2">
                          <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>{course.duration_text || "Acceso completo"}</span>
                        </li>
                        <li className="flex gap-2">
                          <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>{totalLessons} lecciones</span>
                        </li>
                        <li className="flex gap-2">
                          <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>Recursos complementarios</span>
                        </li>
                        <li className="flex gap-2">
                          <Award className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>Certificado de finalización</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handleEnroll}
                      disabled={isEnrolled || isEnrolling}
                    >
                      {isEnrolled ? "Ya estás inscrito" : 
                       isEnrolling ? "Inscribiendo..." : 
                       "Inscribirme ahora"}
                    </Button>
                    
                    {isEnrolled && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate(`/courses/${id}/learn`)}
                      >
                        Ir al curso
                      </Button>
                    )}
                    
                    <p className="text-xs text-center text-muted-foreground">
                      30 días de garantía de devolución de dinero
                    </p>
                  </CardFooter>
                </Card>
                
                {course.featured_instructor && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-base">Instructor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                          <UserCheck className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">{course.featured_instructor}</h4>
                          <p className="text-sm text-muted-foreground">Instructor experimentado</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Únete a miles de estudiantes que ya están mejorando sus habilidades con nuestros cursos
          </p>
          <Button 
            size="lg" 
            onClick={handleEnroll}
            disabled={isEnrolled || isEnrolling}
          >
            {isEnrolled ? "Continuar aprendiendo" : "Inscribirme ahora"}
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
};

export default CourseLanding;
