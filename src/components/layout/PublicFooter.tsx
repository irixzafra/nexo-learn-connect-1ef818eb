
import React from 'react';
import { Link } from 'react-router-dom';

const PublicFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-8 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Nexo Learning</h3>
            <p className="text-muted-foreground">
              Plataforma educativa para el aprendizaje continuo y desarrollo profesional.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary">Cursos</Link></li>
              <li><Link to="/about-us" className="text-muted-foreground hover:text-primary">Sobre Nosotros</Link></li>
              <li><Link to="/auth/login" className="text-muted-foreground hover:text-primary">Iniciar Sesión</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary">Términos de Servicio</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary">Política de Privacidad</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-muted-foreground">
          <p>&copy; {currentYear} Nexo Learning. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
