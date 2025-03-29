
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/layouts/AppLayout';
import PublicLayout from '@/layouts/PublicLayout';
import { NexoLogo } from '@/components/ui/nexo-logo';

const AboutUs: React.FC = () => {
  const { user } = useAuth();
  
  const AboutUsContent = () => (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Sobre Nosotros</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Somos un ecosistema educativo de creatividad digital. Más que una plataforma, 
          somos una comunidad.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <img 
            src="/lovable-uploads/f1432cd5-57e8-488e-a71c-d88ae7e3b0a2.png" 
            alt="Persona escribiendo en un laptop" 
            className="w-full h-80 object-cover rounded-lg"
          />
          <h2 className="text-2xl font-bold">Nuestra Misión</h2>
          <p className="text-muted-foreground">
            Crear un espacio donde la educación, la tecnología y la creatividad se unen para 
            formar una comunidad de aprendizaje continuo. Buscamos democratizar el acceso 
            al conocimiento digital y fomentar la innovación colaborativa.
          </p>
        </div>
        
        <div className="space-y-4">
          <img 
            src="/lovable-uploads/ab16dc8b-143e-45bb-8cd6-b634344e8e1f.png" 
            alt="Espacio de trabajo colaborativo" 
            className="w-full h-80 object-cover rounded-lg"
          />
          <h2 className="text-2xl font-bold">Nuestra Visión</h2>
          <p className="text-muted-foreground">
            Convertirse en el punto de referencia para quienes desean aprender y crecer en 
            el ámbito digital. Queremos ser el puente que conecta el talento con las 
            oportunidades, y la creatividad con la tecnología.
          </p>
        </div>
      </div>
      
      <div className="bg-muted rounded-lg p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">Nuestros Valores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
          <div className="p-4 bg-background rounded shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Innovación</h3>
            <p className="text-muted-foreground">Buscamos constantemente nuevas formas de enseñar y aprender.</p>
          </div>
          <div className="p-4 bg-background rounded shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Comunidad</h3>
            <p className="text-muted-foreground">Creemos en el poder del aprendizaje colaborativo y compartido.</p>
          </div>
          <div className="p-4 bg-background rounded shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Accesibilidad</h3>
            <p className="text-muted-foreground">Trabajamos para que el conocimiento sea accesible para todos.</p>
          </div>
        </div>
      </div>
      
      <div className="p-8 border rounded-lg text-center">
        <NexoLogo className="h-12 w-auto mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">¿Quieres saber más?</h2>
        <p className="text-muted-foreground mb-6">
          Estamos constantemente evolucionando y mejorando nuestra plataforma. 
          Si tienes alguna pregunta o sugerencia, no dudes en contactarnos.
        </p>
        <div className="flex justify-center gap-4">
          <a href="#" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Contactar
          </a>
          <a href="#" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2">
            Saber más
          </a>
        </div>
      </div>
    </div>
  );

  // Use AppLayout if user is logged in, otherwise use PublicLayout
  return user ? (
    <AppLayout>
      <AboutUsContent />
    </AppLayout>
  ) : (
    <PublicLayout>
      <AboutUsContent />
    </PublicLayout>
  );
};

export default AboutUs;
