
import React from 'react';
import { Link } from 'react-router-dom';
import { NexoLogo } from '@/components/ui/logo';

const MinimalistFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <NexoLogo 
              variant="icon" 
              className="h-8 w-8"
              animate={false}
            />
            <span className="ml-2 text-sm text-gray-600">
              © {currentYear} Nexo
            </span>
          </div>
          
          <nav className="flex items-center space-x-6">
            <Link to="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Términos
            </Link>
            <Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Privacidad
            </Link>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Contacto
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default MinimalistFooter;
