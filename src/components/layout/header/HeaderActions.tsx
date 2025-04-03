
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAppNavigation } from '@/utils/routeUtils';
import { 
  User, 
  Settings, 
  HelpCircle
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

const HeaderActions: React.FC = () => {
  const { user, profile } = useAuth();
  const { handleNavigate } = useAppNavigation();
  const { toast } = useToast();

  // Update the navigation links to include the new preferences page
  const navLinks = [
    { label: "Mi Perfil", href: "/profile", icon: <User className="h-4 w-4" /> },
    { label: "Preferencias", href: "/preferences", icon: <Settings className="h-4 w-4" /> },
    { label: "Ayuda", href: "/help", icon: <HelpCircle className="h-4 w-4" /> },
  ];

  return (
    <div className="flex items-center space-x-4">
      {/* Theme Toggle */}
      <ThemeSwitcher />

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
