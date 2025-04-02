
import React from 'react';
import Logo from '@/components/Logo';
import { Toaster } from '@/components/ui/toaster';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 border-b">
        <div className="container mx-auto flex justify-center">
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
      
      <footer className="py-4 px-6 border-t">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Nexo Learning. Todos los derechos reservados.
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default AuthLayout;
