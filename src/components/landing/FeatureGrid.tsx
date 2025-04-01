
import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Users, Award, Briefcase, GraduationCap, Video,
  FileCheck, UserCheck, Smartphone, Globe, Headphones, Calendar
} from 'lucide-react';

const FeatureGrid: React.FC = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Contenido premium",
      description: "Materiales formativos desarrollados por expertos y actualizados constantemente"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Comunidad activa",
      description: "Conéctate con otros estudiantes y profesionales de tu sector"
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Certificados reconocidos",
      description: "Obtén certificaciones con valor profesional real"
    },
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: "Enfoque práctico",
      description: "Proyectos reales para aplicar lo aprendido de inmediato"
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-primary" />,
      title: "Tutorías personalizadas",
      description: "Seguimiento individual para maximizar tu progreso"
    },
    {
      icon: <Video className="h-8 w-8 text-primary" />,
      title: "Clases en directo",
      description: "Sesiones interactivas con profesionales de la industria"
    },
    {
      icon: <FileCheck className="h-8 w-8 text-primary" />,
      title: "Evaluación continua",
      description: "Sistema de feedback para asegurar la consolidación del aprendizaje"
    },
    {
      icon: <UserCheck className="h-8 w-8 text-primary" />,
      title: "Mentorías exclusivas",
      description: "Guía profesional para orientar tu carrera"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      title: "Acceso móvil",
      description: "Estudia desde cualquier dispositivo, en cualquier momento"
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Redes profesionales",
      description: "Conecta con empresas y oportunidades laborales"
    },
    {
      icon: <Headphones className="h-8 w-8 text-primary" />,
      title: "Soporte 24/7",
      description: "Asistencia técnica y académica siempre disponible"
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Flexibilidad total",
      description: "Adapta el ritmo de estudio a tus necesidades"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Una experiencia educativa sin igual</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre las características que hacen de nuestra plataforma la elección ideal para tu formación profesional.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-background border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 duration-300"
            >
              <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative blobs */}
      <div className="absolute -z-10 top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -z-10 bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.075)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,.075)_1px,transparent_1px)] bg-[size:14px_14px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
    </section>
  );
};

export default FeatureGrid;
