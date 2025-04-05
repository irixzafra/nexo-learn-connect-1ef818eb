
import React from 'react';
import { cn } from '@/lib/utils';

export interface PlaceholderComponentProps {
  /**
   * Texto principal a mostrar en el componente placeholder
   */
  text: string;
  /**
   * Texto secundario opcional para mostrar información adicional
   */
  subtext?: string;
  /**
   * Si se debe mostrar un borde alrededor del componente
   * @default false
   */
  bordered?: boolean;
  /**
   * Variante visual del componente
   * @default "default"
   */
  variant?: 'default' | 'info' | 'warning' | 'error' | 'success';
  /**
   * Clases CSS adicionales para personalizar el componente
   */
  className?: string;
}

/**
 * Componente Placeholder para usar durante el desarrollo o cuando el contenido final
 * aún no está disponible. Implementa el sistema de diseño de Nexo y sirve como ejemplo
 * para documentación en Storybook.
 */
const PlaceholderComponent: React.FC<PlaceholderComponentProps> = ({
  text,
  subtext,
  bordered = false,
  variant = 'default',
  className,
}) => {
  // Mapeo de variantes a clases de color
  const variantClasses = {
    default: 'bg-muted/30 text-muted-foreground',
    info: 'bg-info/10 text-info border-info/20',
    warning: 'bg-warning/10 text-warning-foreground border-warning/20',
    error: 'bg-destructive/10 text-destructive border-destructive/20',
    success: 'bg-success/10 text-success-foreground border-success/20',
  };

  return (
    <div
      className={cn(
        'p-4 rounded-md flex flex-col gap-2 text-center justify-center items-center min-h-[120px]',
        variantClasses[variant],
        bordered && 'border',
        className
      )}
      data-testid="placeholder-component"
    >
      <p className="font-medium">{text}</p>
      {subtext && <p className="text-sm opacity-80">{subtext}</p>}
    </div>
  );
};

export default PlaceholderComponent;
