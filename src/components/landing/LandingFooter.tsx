
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NexoLogo } from '@/components/ui/logo';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { routeMap } from '@/utils/routeUtils';

const LandingFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de suscripción
    console.log('Suscrito:', email);
    setEmail('');
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Componente de icono de redes sociales
  const SocialIcon = ({ icon: Icon, color, href = "#" }: { icon: React.ElementType, color: string, href?: string }) => (
    <motion.a 
      href={href}
      className={`bg-gray-100 p-2.5 rounded-full ${color} hover:bg-opacity-90 transition-colors duration-300 group`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
    </motion.a>
  );
  
  return (
    <motion.footer 
      className="bg-gradient-to-b from-gray-50 to-gray-100 pt-16 pb-8 border-t w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-screen-2xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Logo y descripción */}
          <motion.div className="space-y-5" variants={itemVariants}>
            <Link to={routeMap.home} className="flex items-center mb-4 group transition-transform duration-300 hover:scale-105">
              <NexoLogo className="h-10 w-auto" subtitle="ecosistema creativo" />
            </Link>
            <p className="text-muted-foreground text-base">
              Plataforma educativa especializada en el desarrollo de habilidades creativas y profesionales.
            </p>
            <div className="flex space-x-3">
              <SocialIcon icon={Facebook} color="text-blue-600 hover:bg-blue-600 hover:text-white" />
              <SocialIcon icon={Twitter} color="text-blue-400 hover:bg-blue-400 hover:text-white" />
              <SocialIcon icon={Instagram} color="text-pink-600 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white" />
              <SocialIcon icon={Linkedin} color="text-blue-700 hover:bg-blue-700 hover:text-white" />
              <SocialIcon icon={Youtube} color="text-red-600 hover:bg-red-600 hover:text-white" />
            </div>
          </motion.div>

          {/* Enlaces rápidos */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-5 text-lg tracking-wide">Enlaces rápidos</h3>
            <ul className="space-y-3">
              <FooterLink href={routeMap.courses} text="Cursos" />
              <FooterLink href={routeMap.community} text="Comunidad" />
              <FooterLink href={routeMap.aboutUs} text="Nosotros" />
              <FooterLink href={routeMap.scholarships} text="Becas y Ayudas" />
              <FooterLink href={routeMap.contact} text="Contacto" />
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-5 text-lg tracking-wide">Legal</h3>
            <ul className="space-y-3">
              <FooterLink href={routeMap.terms} text="Términos y Condiciones" />
              <FooterLink href={routeMap.privacy} text="Política de Privacidad" />
              <FooterLink href={routeMap.cookies} text="Política de Cookies" />
              <FooterLink href={routeMap.accessibility} text="Accesibilidad" />
            </ul>
          </motion.div>

          {/* Contacto */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-5 text-lg tracking-wide">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5 flex-shrink-0 group-hover:text-primary/80 transition-colors" />
                <span className="text-muted-foreground group-hover:text-gray-700 transition-colors">
                  Calle Principal 123, Madrid, España
                </span>
              </li>
              <li className="flex items-center group">
                <Phone className="h-5 w-5 mr-3 text-primary flex-shrink-0 group-hover:text-primary/80 transition-colors" />
                <span className="text-muted-foreground group-hover:text-gray-700 transition-colors">+34 91 123 45 67</span>
              </li>
              <li className="flex items-center group">
                <Mail className="h-5 w-5 mr-3 text-primary flex-shrink-0 group-hover:text-primary/80 transition-colors" />
                <a href="mailto:info@nexo.com" className="text-muted-foreground hover:text-primary transition-colors">
                  info@nexo.com
                </a>
              </li>
            </ul>
            
            <div className="mt-5">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  asChild
                  className="mt-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-md"
                >
                  <Link to={routeMap.contact}>Contactar ahora</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Banner de suscripción */}
        <motion.div 
          className="my-10 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white shadow-lg"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Únete a nuestra comunidad</h3>
              <p className="text-blue-100">Recibe actualizaciones sobre nuevos cursos y recursos exclusivos</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto">
              <Input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="px-4 py-3 rounded-l-md w-full md:w-auto text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 border-white" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="rounded-l-none bg-gray-900 hover:bg-gray-800 px-6 flex items-center">
                Suscribirse
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Línea divisoria */}
        <motion.div 
          className="border-t border-gray-200 pt-8 mt-8"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {currentYear} Nexo Ecosistema Creativo. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link to={routeMap.terms} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Términos
              </Link>
              <Link to={routeMap.privacy} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacidad
              </Link>
              <Link to={routeMap.cookies} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

// Componente de enlace de footer con animación
const FooterLink = ({ href, text }: { href: string, text: string }) => (
  <li>
    <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
      <Link to={href} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
        <span className="h-1 w-1 rounded-full bg-primary inline-block"></span>
        {text}
      </Link>
    </motion.div>
  </li>
);

export default LandingFooter;
