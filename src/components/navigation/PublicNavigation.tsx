
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BookOpen, 
  Users, 
  Award, 
  FileText, 
  HelpCircle,
  LogIn,
  UserPlus,
  Map,
  Sparkles
} from 'lucide-react';

interface PublicNavigationProps {
  className?: string;
}

const PublicNavigation: React.FC<PublicNavigationProps> = ({ className }) => {
  const navItems = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/courses', label: 'Cursos', icon: BookOpen },
    { path: '/learning-paths', label: 'Rutas de Aprendizaje', icon: Map },
    { path: '/about-us', label: 'Sobre Nosotros', icon: Users },
    { path: '/certificates/verification-portal', label: 'Verificar Certificados', icon: Award },
    { path: '/scholarships', label: 'Becas', icon: Sparkles },
    { path: '/help', label: 'Ayuda', icon: HelpCircle },
    { path: '/contact', label: 'Contacto', icon: FileText },
  ];

  const authItems = [
    { path: '/auth/login', label: 'Iniciar Sesión', icon: LogIn, variant: 'outline' as const },
    { path: '/auth/register', label: 'Registrarse', icon: UserPlus, variant: 'default' as const }
  ];

  return (
    <nav className={`flex items-center justify-between w-full px-4 py-2 ${className}`}>
      <div className="flex items-center space-x-1">
        <Link to="/" className="mr-4 flex items-center">
          <span className="font-bold text-xl">Nexo Learning</span>
        </Link>
        
        <div className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <Button key={item.path} variant="ghost" asChild size="sm">
              <Link to={item.path} className="flex items-center gap-1">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {authItems.map((item) => (
          <Button key={item.path} variant={item.variant} asChild size="sm">
            <Link to={item.path} className="flex items-center gap-1">
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default PublicNavigation;
