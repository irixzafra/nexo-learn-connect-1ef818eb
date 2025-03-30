
import React from "react";
import { CheckCircle2, BookOpen, PlayCircle, FileText, Download, Clock, Award, Video } from "lucide-react";
import { motion } from "framer-motion";
import { Course, Module, Lesson } from "@/types/course";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseContentAccordion } from "./CourseContentAccordion";
import { CourseFAQ } from "./CourseFAQ";
import { useIsMobile } from "@/hooks/use-mobile";

interface CourseOverviewProps {
  course: Course;
  modulesWithLessons: Array<Module & { lessons: Lesson[] }>;
  expandedFAQs: string[];
  setExpandedFAQs: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CourseOverview: React.FC<CourseOverviewProps> = ({
  course,
  modulesWithLessons,
  expandedFAQs,
  setExpandedFAQs,
}) => {
  const isMobile = useIsMobile();

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

  return (
    <div className="lg:col-span-2">
      <Tabs defaultValue="descripcion" className="mt-4">
        <TabsList className="mb-6 grid w-full grid-cols-3 lg:w-auto lg:inline-flex bg-transparent p-0 space-x-2">
          <TabsTrigger value="descripcion" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Descripción
          </TabsTrigger>
          <TabsTrigger value="temario" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Temario
          </TabsTrigger>
          <TabsTrigger value="faq" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            FAQs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="descripcion" className="mt-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="prose prose-sm sm:prose lg:prose-lg max-w-none mb-12">
              <p className="text-lg leading-relaxed">{course.description}</p>
              
              {/* Features cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 gap-6">
                <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <Video className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Contenido multimedia</h3>
                  <p className="text-muted-foreground">
                    Vídeos de alta calidad, infografías interactivas y material complementario para optimizar tu aprendizaje.
                  </p>
                </div>
                
                <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <Award className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Certificación profesional</h3>
                  <p className="text-muted-foreground">
                    Obtén un certificado reconocido que acredita tus nuevas habilidades y conocimientos.
                  </p>
                </div>
              </div>
            </div>
            
            {course.prerequisites_text && (
              <div className="mb-12 bg-muted/30 rounded-xl p-6 border">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  Requisitos previos
                </h3>
                <div className="prose max-w-none">
                  <p>{course.prerequisites_text}</p>
                </div>
              </div>
            )}
            
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-primary" />
              Lo que aprenderás
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-12">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.div variants={item} className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Dominarás los conceptos clave</span>
                    <p className="text-sm text-muted-foreground">Comprensión profunda de los fundamentos teóricos</p>
                  </div>
                </motion.div>
                
                <motion.div variants={item} className="flex gap-3 mt-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Aplicarás con ejercicios prácticos</span>
                    <p className="text-sm text-muted-foreground">Resolución de problemas reales y casos de estudio</p>
                  </div>
                </motion.div>
                
                <motion.div variants={item} className="flex gap-3 mt-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Desarrollarás habilidades estructuradas</span>
                    <p className="text-sm text-muted-foreground">Progresión lógica desde fundamentos hasta conceptos avanzados</p>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.div variants={item} className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Recibirás feedback en tiempo real</span>
                    <p className="text-sm text-muted-foreground">Evaluaciones y comentarios para mejorar continuamente</p>
                  </div>
                </motion.div>
                
                <motion.div variants={item} className="flex gap-3 mt-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Obtendrás tu certificado</span>
                    <p className="text-sm text-muted-foreground">Acreditación oficial al completar satisfactoriamente</p>
                  </div>
                </motion.div>
                
                <motion.div variants={item} className="flex gap-3 mt-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Accederás a recursos exclusivos</span>
                    <p className="text-sm text-muted-foreground">Materiales adicionales y herramientas complementarias</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Resources section */}
            <div className="mb-12 bg-primary/5 rounded-xl p-6 border border-primary/10">
              <h3 className="text-xl font-semibold mb-4">Recursos incluidos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Video className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Videos HD</p>
                    <p className="text-sm text-muted-foreground">Más de 10 horas de contenido</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Material de estudio</p>
                    <p className="text-sm text-muted-foreground">Guías PDF y documentación</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Download className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Recursos descargables</p>
                    <p className="text-sm text-muted-foreground">Plantillas y ejercicios</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Certificado</p>
                    <p className="text-sm text-muted-foreground">Al completar el curso</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* "Para quién es" section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                ¿Para quién es este curso?
              </h3>
              
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Principiantes que quieren iniciar en {course.category || 'este campo'}</span>
                    <p className="text-sm text-muted-foreground">No se requiere experiencia previa, empezamos desde cero</p>
                  </div>
                </li>
                
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Profesionales buscando actualizar sus conocimientos</span>
                    <p className="text-sm text-muted-foreground">Contenido actualizado con las últimas tendencias del sector</p>
                  </div>
                </li>
                
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Entusiastas que quieren ampliar su conjunto de habilidades</span>
                    <p className="text-sm text-muted-foreground">Perfecto como complemento a otras áreas de conocimiento</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="temario" className="mt-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Contenido del curso
              </h3>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{modulesWithLessons.length} módulos • {modulesWithLessons.reduce((acc, module) => acc + (module.lessons?.length || 0), 0)} lecciones</span>
              </div>
            </div>
            
            <CourseContentAccordion 
              modulesWithLessons={modulesWithLessons || []}
              courseId={course.id}
            />
            
            <div className="mt-8 bg-primary/5 rounded-xl p-6 border border-primary/10">
              <div className="flex gap-4 items-start">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <PlayCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Acceso inmediato a todo el contenido</h4>
                  <p className="text-muted-foreground">
                    Al inscribirte, obtendrás acceso completo a todos los módulos y materiales del curso. Avanza a tu propio ritmo y recibe tu certificado al finalizar.
                  </p>
                  <Button className="mt-4 group" variant="outline">
                    Ver lección de muestra
                    <PlayCircle className="ml-2 h-4 w-4 group-hover:text-primary transition-colors" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="faq" className="mt-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Preguntas frecuentes
            </h3>
            
            <CourseFAQ 
              expandedFAQs={expandedFAQs} 
              setExpandedFAQs={setExpandedFAQs} 
            />
            
            <div className="mt-10 bg-muted/30 rounded-xl p-6 border text-center">
              <h4 className="text-lg font-semibold mb-2">¿Tienes alguna otra pregunta?</h4>
              <p className="text-muted-foreground mb-4">
                Estamos aquí para ayudarte. No dudes en contactar con nuestro equipo de soporte.
              </p>
              <Button variant="outline">Contactar soporte</Button>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Missing components used in the overview
const Users = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const HelpCircle = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);
