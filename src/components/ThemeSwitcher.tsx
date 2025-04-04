
import React from 'react';
import { Sun, Moon, Monitor, SquareCode, Palette } from 'lucide-react';
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
import { motion } from 'framer-motion';

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
  const { theme, setTheme, isDark, isFuturistic, isNexo } = useTheme();

  // Obtener el icono correspondiente al tema actual
  const ThemeIcon = () => {
    if (isDark) return (
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </motion.div>
    );
    
    if (isFuturistic) return (
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SquareCode className="h-[1.2rem] w-[1.2rem]" />
      </motion.div>
    );
    
    if (isNexo) return (
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Palette className="h-[1.2rem] w-[1.2rem]" />
      </motion.div>
    );
    
    if (theme === 'system') return (
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Monitor className="h-[1.2rem] w-[1.2rem]" />
      </motion.div>
    );
    
    return (
      <motion.div
        initial={{ rotate: -45 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </motion.div>
    );
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'futuristic' | 'system' | 'nexo') => {
    setTheme(newTheme);
    toast.success(`Tema ${
      newTheme === 'light' ? 'Claro' : 
      newTheme === 'dark' ? 'Oscuro' : 
      newTheme === 'futuristic' ? 'Gris Futurista' :
      newTheme === 'nexo' ? 'Nexo' :
      'Sistema'
    } aplicado`, {
      position: 'top-center',
      duration: 1500
    });
  };

  const content = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size={size} 
          className="focus-visible:ring-0 bg-primary/10 hover:bg-primary/20 text-foreground ring-primary relative p-2 rounded-full"
        >
          <ThemeIcon />
          <span className="sr-only">Cambiar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 animate-in slide-in-from-top-5 fade-in">
        <DropdownMenuItem onClick={() => handleThemeChange('light')} className="flex items-center gap-2 cursor-pointer hover:bg-primary/10">
          <Sun className="h-4 w-4" />
          <span>Claro</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('dark')} className="flex items-center gap-2 cursor-pointer hover:bg-primary/10">
          <Moon className="h-4 w-4" />
          <span>Oscuro</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('futuristic')} className="flex items-center gap-2 cursor-pointer hover:bg-primary/10">
          <SquareCode className="h-4 w-4" />
          <span>Gris Futurista</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('nexo')} className="flex items-center gap-2 cursor-pointer hover:bg-primary/10">
          <Palette className="h-4 w-4" />
          <span>Nexo</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('system')} className="flex items-center gap-2 cursor-pointer hover:bg-primary/10">
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
        <TooltipContent side="bottom">
          <p>Cambiar tema visual</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
};

export default ThemeSwitcher;
