
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { routeMap } from '@/utils/routeUtils';

const PublicHeader: React.FC = () => {
  return (
    <header className="border-b py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to={routeMap.home} className="flex items-center">
          <Logo />
          <span className="ml-2 text-xl font-semibold">Nexo Learning</span>
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link to={routeMap.courses} className="text-gray-700 hover:text-primary">Cursos</Link>
          <Link to={routeMap.aboutUs} className="text-gray-700 hover:text-primary">Nosotros</Link>
          <Link to={routeMap.login} className="text-primary font-medium">Iniciar Sesión</Link>
        </nav>
      </div>
    </header>
  );
};

export default PublicHeader;
