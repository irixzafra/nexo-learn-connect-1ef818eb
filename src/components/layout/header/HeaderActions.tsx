import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/hooks/useTheme';
import { useAppNavigation } from '@/utils/routeUtils';
import { 
  User, 
  Settings, 
  HelpCircle, 
  Sun, 
  Moon, 
  Monitor,
  ChevronsUpDown
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast"

const HeaderActions: React.FC = () => {
  const { user, profile } = useAuth();
  const { theme, setTheme } = useTheme();
  const { handleNavigate } = useAppNavigation();
  const { toast } = useToast()

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    toast({
      title: "Tema cambiado!",
      description: `Tema cambiado a ${newTheme === 'light' ? 'claro' : 'oscuro'}.`,
    })
  };

  // Update the navigation links to include the new preferences page
  const navLinks = [
    { label: "Mi Perfil", href: "/profile", icon: <User className="h-4 w-4" /> },
    { label: "Preferencias", href: "/preferences", icon: <Settings className="h-4 w-4" /> },
    { label: "Ayuda", href: "/help", icon: <HelpCircle className="h-4 w-4" /> },
  ];

  return (
    <div className="flex items-center space-x-4">
      {/* Theme Toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Sun className="h-4 w-4 rotate-0 transition-all dark:-rotate-90" />
            <Moon className="absolute h-4 w-4 rotate-90 transition-all dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" forceMount>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Claro</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Oscuro</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Monitor className="mr-2 h-4 w-4" />
            <span>Sistema</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Navigation Links */}
      {navLinks.map((link) => (
        <Button
          key={link.href}
          variant="ghost"
          size="sm"
          onClick={handleNavigate(link.href)}
        >
          {link.icon}
          {link.label}
        </Button>
      ))}
    </div>
  );
};

export default HeaderActions;
