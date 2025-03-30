
import React from "react";
import { CheckCircle2, BookOpen, Award, Video, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Course } from "@/types/course";

interface CourseDescriptionTabProps {
  course: Course;
}

export const CourseDescriptionTab: React.FC<CourseDescriptionTabProps> = ({
  course,
}) => {
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
      <ResourcesSection />
      
      {/* "Para quién es" section */}
      <TargetAudienceSection />
    </motion.div>
  );
};

// Sub-components for clarity
const ResourcesSection: React.FC = () => (
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
);

const TargetAudienceSection: React.FC = () => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold mb-4 flex items-center">
      <Users className="h-5 w-5 mr-2 text-primary" />
      ¿Para quién es este curso?
    </h3>
    
    <ul className="space-y-4">
      <li className="flex gap-3">
        <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-medium">Principiantes que quieren iniciar en este campo</span>
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
);

// Missing icons
const FileText = ({ className }: { className?: string }) => (
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
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const Download = ({ className }: { className?: string }) => (
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
