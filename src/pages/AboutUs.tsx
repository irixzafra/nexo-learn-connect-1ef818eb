
import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Globe, BookOpen, Star, GraduationCap, Briefcase, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <PublicLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 via-primary/5 to-background relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Inspirando el futuro de la educación</h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Transformamos la educación tradicional con tecnología y métodos pedagógicos innovadores para crear una experiencia de aprendizaje sin igual.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative mt-8 rounded-2xl overflow-hidden shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Equipo de Nexo Learning" 
                className="w-full h-auto object-cover rounded-2xl aspect-[21/9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white text-xl font-medium">Nuestro equipo trabajando para transformar la educación online</p>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -z-10 top-32 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -z-10 bottom-10 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        </section>
        
        {/* Mission and Vision */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Nuestra Misión</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Democratizar la educación de calidad, acercando conocimientos especializados a personas de todo el mundo, independientemente de su ubicación o situación económica.
                </p>
                <ul className="space-y-3">
                  {['Accesibilidad para todos', 'Enseñanza de calidad', 'Formación continua', 'Comunidad colaborativa'].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                    alt="Estudiantes colaborando" 
                    className="w-full h-full object-cover aspect-square rounded-2xl"
                  />
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute -bottom-8 -left-8 bg-background p-6 rounded-xl shadow-lg"
                >
                  <h3 className="text-xl font-bold mb-2">Visión 2030</h3>
                  <p className="text-muted-foreground">
                    Convertirnos en el referente global en educación online, redefiniendo cómo se aprende en la era digital.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Valores</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Estos principios guían cada decisión que tomamos y cada curso que desarrollamos.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <Star className="h-10 w-10 text-amber-500" />, title: "Excelencia", description: "Buscamos la calidad en todo lo que hacemos, desde nuestros contenidos hasta la experiencia del usuario." },
                { icon: <Users className="h-10 w-10 text-indigo-500" />, title: "Comunidad", description: "Creemos en el poder del aprendizaje colaborativo y el intercambio constante de conocimientos." },
                { icon: <Globe className="h-10 w-10 text-emerald-500" />, title: "Inclusión", description: "Diseñamos nuestras soluciones para que sean accesibles para personas de diversos orígenes y capacidades." },
                { icon: <BookOpen className="h-10 w-10 text-rose-500" />, title: "Innovación", description: "Nos anticipamos a las tendencias educativas y tecnológicas para ofrecer experiencias de aprendizaje vanguardistas." },
                { icon: <Briefcase className="h-10 w-10 text-sky-500" />, title: "Empleabilidad", description: "Formamos a nuestros estudiantes con habilidades relevantes y demandadas en el mercado laboral actual." },
                { icon: <GraduationCap className="h-10 w-10 text-violet-500" />, title: "Aprendizaje Continuo", description: "Promovemos la formación a lo largo de toda la vida profesional como clave del éxito." }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-background p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Forma parte de nuestra comunidad educativa</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Únete a miles de estudiantes que ya están transformando su futuro con nuestros programas formativos.
              </p>
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/courses">
                  Explorar cursos disponibles
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default AboutUs;
