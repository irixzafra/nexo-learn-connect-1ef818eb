
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ColorItem = {
  name: string;
  color: string;
  text?: string;
  value: string;
  description?: string;
};

interface ColorPaletteProps {
  colors: ColorItem[];
  title: string;
  description?: string;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors, title, description }) => {
  const { toast } = useToast();

  const handleCopyColor = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Valor copiado",
      description: `${value} copiado al portapapeles.`,
      duration: 2000,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {colors.map((item) => (
          <div key={item.name} className="space-y-1.5 group">
            <div
              className={cn(
                item.color,
                item.text || 'text-white',
                "h-20 rounded-md flex items-center justify-center relative cursor-pointer"
              )}
              onClick={() => handleCopyColor(item.value)}
            >
              <span className="font-medium">{item.name}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute bottom-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyColor(item.value);
                }}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-mono">{item.value}</span>
            </div>
            {item.description && (
              <p className="text-xs text-muted-foreground">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
