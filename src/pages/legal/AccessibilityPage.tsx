
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LandingNav from '@/components/LandingNav';
import LandingFooter from '@/components/landing/LandingFooter';

const AccessibilityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingNav />
      
      <main className="flex-grow container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Declaración de Accesibilidad</h1>
          
          <div className="prose prose-lg dark:prose-invert">
            <p className="lead">
              En Nexo Ecosistema Creativo, nos comprometemos a garantizar la accesibilidad digital para todas las personas,
              independientemente de sus capacidades.
            </p>
            
            <h2>Nuestro Compromiso</h2>
            <p>
              Nos esforzamos por cumplir con las mejores prácticas y estándares de accesibilidad web, incluidas las 
              Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1, nivel AA. Estas pautas explican cómo hacer que 
              el contenido web sea más accesible para las personas con discapacidad.
            </p>
            
            <h2>Medidas de Accesibilidad Implementadas</h2>
            <p>
              Hemos tomado las siguientes medidas para garantizar la accesibilidad:
            </p>
            <ul>
              <li>Estructura semántica adecuada con etiquetas HTML apropiadas</li>
              <li>Textos alternativos para todas las imágenes</li>
              <li>Suficiente contraste de color</li>
              <li>Navegación coherente en todo el sitio</li>
              <li>Compatibilidad con tecnologías de asistencia como lectores de pantalla</li>
              <li>Posibilidad de navegar utilizando solo el teclado</li>
              <li>Textos claros y legibles</li>
              <li>Capacidad de cambiar el tamaño del texto sin pérdida de funcionalidad</li>
            </ul>
            
            <h2>Evaluación Continua</h2>
            <p>
              Realizamos evaluaciones regulares de nuestra plataforma para identificar y resolver problemas de accesibilidad. 
              Este proceso incluye pruebas automatizadas y manuales por expertos en accesibilidad.
            </p>
            
            <h2>Limitaciones Conocidas</h2>
            <p>
              A pesar de nuestros esfuerzos, algunas partes de nuestra plataforma pueden no ser completamente accesibles en este momento. 
              Estamos trabajando activamente para resolver estos problemas y mejorar la experiencia para todos los usuarios.
            </p>
            
            <h2>Comentarios y Contacto</h2>
            <p>
              Valoramos sus comentarios sobre la accesibilidad de nuestra plataforma. Si encuentra alguna barrera o tiene sugerencias 
              para mejorar, por favor contáctenos:
            </p>
            <p>
              Email: <a href="mailto:accesibilidad@nexo.com">accesibilidad@nexo.com</a><br />
              Teléfono: +34 91 123 45 67
            </p>
            
            <h2>Procedimiento de Aplicación</h2>
            <p>
              Si encuentra un problema de accesibilidad que no está abordado en esta declaración, puede contactarnos para reportarlo. 
              Revisaremos su solicitud y le responderemos en un plazo de 10 días hábiles.
            </p>
            
            <p className="text-sm text-muted-foreground mt-12">
              Última actualización: 15 de junio de 2023
            </p>
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button asChild>
              <Link to="/">Volver a la página principal</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default AccessibilityPage;
