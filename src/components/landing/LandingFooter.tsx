
import React from 'react';
import { Link } from 'react-router-dom';
import { NexoLogo } from '@/components/ui/logo';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t w-full">
      <div className="max-w-screen-2xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Logo y descripción */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center mb-4 group transition-transform duration-300 hover:scale-105">
              <NexoLogo className="h-10 w-auto" subtitle="ecosistema creativo" />
            </Link>
            <p className="text-muted-foreground text-base">
              Plataforma educativa especializada en el desarrollo de habilidades creativas y profesionales.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-gray-100 p-2 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300 group">
                <Facebook className="h-5 w-5 transition-transform group-hover:scale-110" />
              </a>
              <a href="#" className="bg-gray-100 p-2 rounded-full text-blue-400 hover:bg-blue-400 hover:text-white transition-colors duration-300 group">
                <Twitter className="h-5 w-5 transition-transform group-hover:scale-110" />
              </a>
              <a href="#" className="bg-gray-100 p-2 rounded-full text-pink-600 hover:bg-gradient-to-br from-purple-600 to-pink-500 hover:text-white transition-colors duration-300 group">
                <Instagram className="h-5 w-5 transition-transform group-hover:scale-110" />
              </a>
              <a href="#" className="bg-gray-100 p-2 rounded-full text-blue-700 hover:bg-blue-700 hover:text-white transition-colors duration-300 group">
                <Linkedin className="h-5 w-5 transition-transform group-hover:scale-110" />
              </a>
              <a href="#" className="bg-gray-100 p-2 rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300 group">
                <Youtube className="h-5 w-5 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold mb-5 text-lg">Enlaces rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/courses" className="text-muted-foreground hover:text-blue-600 transition-colors flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-blue-600 inline-block"></span>
                  Cursos
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-muted-foreground hover:text-blue-600 transition-colors flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-blue-600 inline-block"></span>
                  Comunidad
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="text-muted-foreground hover:text-blue-600 transition-colors flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-blue-600 inline-block"></span>
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/scholarships" className="text-muted-foreground hover:text-blue-600 transition-colors flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-blue-600 inline-block"></span>
                  Becas y Ayudas
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-blue-600 transition-colors flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-blue-600 inline-block"></span>
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-5 text-lg">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-blue-600 transition-colors flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-blue-600 inline-block"></span>
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-blue-600 transition-colors flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-blue-600 inline-block"></span>
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-blue-600 transition-colors flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-blue-600 inline-block"></span>
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-muted-foreground hover:text-blue-600 transition-colors flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-blue-600 inline-block"></span>
                  Accesibilidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold mb-5 text-lg">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Calle Principal 123, Madrid, España
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0" />
                <span className="text-muted-foreground">+34 91 123 45 67</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0" />
                <a href="mailto:info@nexo.com" className="text-muted-foreground hover:text-blue-600 transition-colors">
                  info@nexo.com
                </a>
              </li>
            </ul>
            
            <div className="mt-5">
              <Button 
                asChild
                className="mt-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-md"
              >
                <Link to="/contact">Contactar ahora</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Banner de suscripción */}
        <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Únete a nuestra comunidad</h3>
              <p className="text-blue-100">Recibe actualizaciones sobre nuevos cursos y recursos exclusivos</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="px-4 py-3 rounded-l-md w-full md:w-auto text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300" 
              />
              <Button className="rounded-l-none bg-gray-900 hover:bg-gray-800 px-6">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {currentYear} Nexo Ecosistema Creativo. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                Términos
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                Privacidad
              </Link>
              <Link to="/cookies" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
