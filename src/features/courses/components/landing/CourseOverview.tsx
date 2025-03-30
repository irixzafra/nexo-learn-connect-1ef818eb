
import React from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Course, Module, Lesson } from "@/types/course";
import { CourseContentAccordion } from "./CourseContentAccordion";
import { CourseFAQ } from "./CourseFAQ";

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
                <CourseContentAccordion modulesWithLessons={modulesWithLessons} courseId={course.id} />
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Preguntas frecuentes</h3>
              <CourseFAQ expandedFAQs={expandedFAQs} setExpandedFAQs={setExpandedFAQs} />
            </motion.div>
          </div>
          
          {/* CourseInfoSidebar will be added here by the parent component */}
        </div>
      </div>
    </section>
  );
};
