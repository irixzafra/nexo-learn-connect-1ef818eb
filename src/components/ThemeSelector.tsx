
import React from 'react';
import { Moon, Sun, SquareCode, Monitor } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();

  // Obtener el icono correspondiente al tema actual
  const ThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return <Moon className="h-[1.2rem] w-[1.2rem]" />;
      case 'futuristic':
        return <SquareCode className="h-[1.2rem] w-[1.2rem]" />;
      case 'system':
        return <Monitor className="h-[1.2rem] w-[1.2rem]" />;
      default:
        return <Sun className="h-[1.2rem] w-[1.2rem]" />;
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'futuristic' | 'system') => {
    setTheme(newTheme);
    toast.success(`Tema ${
      newTheme === 'light' ? 'Claro' : 
      newTheme === 'dark' ? 'Oscuro' : 
      newTheme === 'futuristic' ? 'Gris Futurista' :
      'Sistema'
    } aplicado`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="focus-visible:ring-0">
          <ThemeIcon />
          <span className="sr-only">Cambiar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange('light')} className="flex items-center gap-2">
          <Sun className="h-4 w-4" />
          <span>Claro</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('dark')} className="flex items-center gap-2">
          <Moon className="h-4 w-4" />
          <span>Oscuro</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('futuristic')} className="flex items-center gap-2">
          <SquareCode className="h-4 w-4" />
          <span>Gris Futurista</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('system')} className="flex items-center gap-2">
          <Monitor className="h-4 w-4" />
          <span>Sistema</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
