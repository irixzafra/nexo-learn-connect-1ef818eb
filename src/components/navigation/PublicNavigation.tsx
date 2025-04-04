
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
import { routeMap } from '@/utils/routeUtils';
import SafeLink from '@/components/SafeLink';

interface PublicNavigationProps {
  className?: string;
}

const PublicNavigation: React.FC<PublicNavigationProps> = ({ className }) => {
  const navItems = [
    { path: routeMap.home, label: 'Inicio', icon: Home },
    { path: routeMap.courses, label: 'Cursos', icon: BookOpen },
    { path: routeMap.learningPaths, label: 'Rutas de Aprendizaje', icon: Map },
    { path: routeMap.aboutUs, label: 'Sobre Nosotros', icon: Users },
    { path: routeMap.certificateVerificationPortal, label: 'Verificar Certificados', icon: Award },
    { path: routeMap.scholarships, label: 'Becas', icon: Sparkles },
    { path: routeMap.help, label: 'Ayuda', icon: HelpCircle },
    { path: routeMap.contact, label: 'Contacto', icon: FileText },
  ];

  const authItems = [
    { path: routeMap.login, label: 'Iniciar Sesión', icon: LogIn, variant: 'outline' as const },
    { path: routeMap.register, label: 'Registrarse', icon: UserPlus, variant: 'default' as const }
  ];

  return (
    <nav className={`flex items-center justify-between w-full px-4 py-2 ${className}`}>
      <div className="flex items-center space-x-1">
        <Link to={routeMap.home} className="mr-4 flex items-center">
          <span className="font-bold text-xl">Nexo Learning</span>
        </Link>
        
        <div className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <Button key={item.path} variant="ghost" asChild size="sm">
              <SafeLink to={item.path} className="flex items-center gap-1">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </SafeLink>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {authItems.map((item) => (
          <Button key={item.path} variant={item.variant} asChild size="sm">
            <SafeLink to={item.path} className="flex items-center gap-1">
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </SafeLink>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default PublicNavigation;
