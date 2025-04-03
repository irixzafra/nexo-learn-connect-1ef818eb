
import React from 'react';
import { Sun, Moon, Monitor, SquareCode } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

interface ThemeSwitcherProps {
  showTooltip?: boolean;
  variant?: 'default' | 'ghost' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  showTooltip = true,
  variant = 'ghost',
  size = 'icon'
}) => {
  const { theme, setTheme, isDark, isFuturistic } = useTheme();

  // Obtener el icono correspondiente al tema actual
  const ThemeIcon = () => {
    if (isDark) return <Moon className="h-[1.2rem] w-[1.2rem]" />;
    if (isFuturistic) return <SquareCode className="h-[1.2rem] w-[1.2rem]" />;
    if (theme === 'system') return <Monitor className="h-[1.2rem] w-[1.2rem]" />;
    return <Sun className="h-[1.2rem] w-[1.2rem]" />;
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

  const content = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="focus-visible:ring-0">
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

  if (showTooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent>
          <p>Cambiar tema</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
};

export default ThemeSwitcher;
