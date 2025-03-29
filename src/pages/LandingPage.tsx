
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PublicLayout from '@/layouts/PublicLayout';

const LandingPage: React.FC = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="px-4 py-20 bg-gradient-to-b from-accent to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Aprende. Crece. <span className="text-primary">Conéctate.</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">
            Nexo unifica aprendizaje, gestión y comunidad en una sola plataforma. 
            Descubre cursos de calidad y conecta con profesionales de tu sector.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="w-full sm:w-auto">
                Empieza a Aprender
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explorar Cursos
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegir Nexo?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Contenido de Calidad</h3>
              <p className="text-muted-foreground">
                Cursos diseñados por expertos en sus campos, con contenidos actualizados y relevantes.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Aprende a tu Ritmo</h3>
              <p className="text-muted-foreground">
                Accede a tus cursos 24/7 y aprende según tu propio horario y velocidad.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Comunidad Activa</h3>
              <p className="text-muted-foreground">
                Conecta con estudiantes e instructores, comparte ideas y crece profesionalmente.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para comenzar tu viaje de aprendizaje?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Únete a miles de estudiantes que ya están mejorando sus habilidades y avanzando en sus carreras con Nexo.
          </p>
          <Link to="/auth/register">
            <Button variant="secondary" size="lg">
              Crear Cuenta Gratis
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};

export default LandingPage;
