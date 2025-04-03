
import React from 'react';
import { Moon, Sun, Monitor, SquareCode } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export const ThemeSwitcher: React.FC = () => {
  const { 
    theme, 
    setTheme, 
    useMaterialDesign, 
    setUseMaterialDesign,
    animationsEnabled,
    setAnimationsEnabled
  } = useTheme();

  // Get the appropriate icon based on current theme
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="md-hover-scale">
          <ThemeIcon />
          <span className="sr-only">Cambiar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-4 py-3 border-b">
          <h3 className="text-sm font-medium">Apariencia</h3>
        </div>
        
        <div className="p-2">
          <p className="text-xs text-muted-foreground mb-2">Tema de color</p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={theme === 'light' ? 'default' : 'outline'} 
              size="sm"
              className="w-full justify-start"
              onClick={() => setTheme('light')}
            >
              <Sun className="mr-2 h-4 w-4" /> Claro
            </Button>
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'} 
              size="sm"
              className="w-full justify-start"
              onClick={() => setTheme('dark')}
            >
              <Moon className="mr-2 h-4 w-4" /> Oscuro
            </Button>
            <Button
              variant={theme === 'system' ? 'default' : 'outline'} 
              size="sm"
              className="w-full justify-start"
              onClick={() => setTheme('system')}
            >
              <Monitor className="mr-2 h-4 w-4" /> Sistema
            </Button>
            <Button
              variant={theme === 'futuristic' ? 'default' : 'outline'} 
              size="sm"
              className="w-full justify-start"
              onClick={() => setTheme('futuristic')}
            >
              <SquareCode className="mr-2 h-4 w-4" /> Futurista
            </Button>
          </div>
        </div>
        
        <div className="p-2 border-t">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="material-mode" className="text-sm">Material Design</Label>
            </div>
            <Switch
              id="material-mode"
              checked={useMaterialDesign}
              onCheckedChange={setUseMaterialDesign}
            />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="animations-toggle" className="text-sm">Animaciones</Label>
            </div>
            <Switch
              id="animations-toggle"
              checked={animationsEnabled}
              onCheckedChange={setAnimationsEnabled}
            />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
