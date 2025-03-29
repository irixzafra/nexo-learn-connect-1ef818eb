
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PublicLayout from '@/layouts/PublicLayout';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, GraduationCap, Users, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet';

// Animaciones
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// Featured courses data (mock data)
const featuredCourses = [
  {
    id: '1',
    title: 'Máster en IA Generativa',
    description: 'Domina las técnicas más avanzadas en IA generativa, desde modelos de lenguaje hasta generación de imágenes.',
    instructor: 'Dr. Alejandro Martínez',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=500&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'Carrera Desarrollo Full-Stack',
    description: 'Conviértete en un desarrollador completo con las tecnologías más demandadas del mercado.',
    instructor: 'María Rodríguez',
    price: 950,
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&w=500&h=300&fit=crop'
  },
  {
    id: '3',
    title: 'Marketing Digital Avanzado',
    description: 'Estrategias de vanguardia para posicionar tu marca y multiplicar conversiones.',
    instructor: 'Carlos Vega',
    price: 840,
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&w=500&h=300&fit=crop'
  },
];

// Testimonials data (mock)
const testimonials = [
  {
    name: 'Laura G.',
    role: 'Analista de Datos',
    content: 'Nexo transformó mi carrera. En 6 meses pasé de analista junior a especialista en IA con un aumento salarial del 40%.',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
  },
  {
    name: 'Martín S.',
    role: 'Desarrollador Frontend',
    content: 'La calidad del contenido y el apoyo de la comunidad son incomparables. La mejor inversión para mi desarrollo profesional.',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
  },
  {
    name: 'Elena R.',
    role: 'Directora de Marketing',
    content: 'Los cursos son extremadamente prácticos. Mi equipo ha implementado lo aprendido generando resultados inmediatos.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  }
];

const LandingPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PublicLayout>
      <Helmet>
        <title>Nexo Learning | Aprende. Crece. Conéctate.</title>
        <meta name="description" content="Nexo unifica aprendizaje, gestión y comunidad en una sola plataforma. Másters y cursos de alta calidad en tecnología, marketing y creación de contenidos." />
        <meta name="keywords" content="aprendizaje online, másters, cursos profesionales, tecnología, desarrollo, marketing digital" />
        <meta property="og:title" content="Nexo Learning | Plataforma Educativa Profesional" />
        <meta property="og:description" content="Descubre cursos de calidad y conecta con profesionales de tu sector. Formación superior en tecnología y negocios digitales." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=630&fit=crop" />
      </Helmet>

      {/* Hero Section with Animation */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-accent/30 to-background z-0"></div>
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Aprende. Crece. <span className="text-foreground">Conéctate.</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Nexo unifica aprendizaje de alto nivel, gestión y comunidad profesional en una sola plataforma. 
              Másters y programas diseñados para impulsar tu carrera en tecnología y negocios digitales.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link to="/courses">
                <Button size="lg" className="w-full sm:w-auto font-medium text-base px-6 py-6">
                  Descubre tu Camino
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-medium text-base px-6 py-6">
                  Únete a Nexo
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-3">La Plataforma para el Aprendizaje Profesional</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Diseñada para profesionales que buscan llevar sus habilidades al siguiente nivel con un ecosistema completo de aprendizaje y crecimiento.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-card p-8 rounded-lg shadow-sm border border-border hover:border-primary/50 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <GraduationCap className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Formación de Elite</h3>
              <p className="text-muted-foreground">
                Másters y programas diseñados por expertos en la industria, con contenido actualizado constantemente para seguir el ritmo de las tecnologías emergentes.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">Certificaciones reconocidas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">Proyectos prácticos reales</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">Mentorías personalizadas</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-card p-8 rounded-lg shadow-sm border border-border hover:border-primary/50 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Metodología Efectiva</h3>
              <p className="text-muted-foreground">
                Aprendizaje adaptado a profesionales con poco tiempo, con un equilibrio perfecto entre teoría y práctica para maximizar resultados.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">Formato flexible 100% online</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">Sesiones en vivo con expertos</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">Contenido microlearning</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-card p-8 rounded-lg shadow-sm border border-border hover:border-primary/50 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ecosistema Profesional</h3>
              <p className="text-muted-foreground">
                Más que cursos: una comunidad activa de profesionales donde networking y oportunidades laborales se combinan naturalmente.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">Red de contactos cualificada</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">Eventos exclusivos del sector</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">Bolsa de empleo premium</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Courses Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-3">Carreras Destacadas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestros programas más demandados, diseñados para las profesiones con mayor proyección.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <motion.div 
                key={course.id}
                className="bg-card overflow-hidden rounded-lg shadow-sm border border-border hover:border-primary/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={course.imageUrl} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{course.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <span>Por {course.instructor}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">{course.price}€</span>
                    <Link to={`/courses/${course.id}`}>
                      <Button variant="outline" size="sm">
                        Ver detalles
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/courses">
              <Button variant="outline" size="lg">
                Ver Todos los Programas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-3">Lo Que Dicen Nuestros Alumnos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Historias reales de profesionales que transformaron su carrera con Nexo.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-card p-6 rounded-lg shadow-sm border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/90 to-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para impulsar tu carrera?</h2>
            <p className="mb-8 max-w-2xl mx-auto text-primary-foreground/90">
              Únete a miles de profesionales que ya están transformando su futuro con programas formativos de alto impacto.
            </p>
            <Link to="/auth/register">
              <Button 
                variant="secondary" 
                size="lg"
                className="font-medium text-base px-8 py-6"
              >
                Comienza Hoy
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <Button 
          size="lg" 
          className="h-14 w-14 rounded-full shadow-lg flex items-center justify-center"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 3.36093 14.891 4 16.1272L3 21L7.8728 20C9.10904 20.6391 10.5124 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12V12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M8 12V12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16 12V12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </Button>
      </motion.div>
    </PublicLayout>
  );
};

export default LandingPage;
