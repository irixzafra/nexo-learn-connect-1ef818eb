
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

const PublicHeader: React.FC = () => {
  return (
    <header className="border-b py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center">
          <Logo />
          <span className="ml-2 text-xl font-semibold">Nexo Learning</span>
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link to="/courses" className="text-gray-700 hover:text-primary">Cursos</Link>
          <Link to="/about-us" className="text-gray-700 hover:text-primary">Nosotros</Link>
          <Link to="/auth/login" className="text-primary font-medium">Iniciar Sesión</Link>
        </nav>
      </div>
    </header>
  );
};

export default PublicHeader;
