
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const materialButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        filled: "md-btn-filled",
        tonal: "md-btn-tonal",
        outlinedMaterial: "md-btn-outlined",
        text: "md-btn-text",
        // Retain standard variants for compatibility
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
      elevation: {
        none: "",
        low: "shadow-sm",
        medium: "shadow",
        high: "shadow-md",
      },
      ripple: {
        true: "md-ripple-container",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      elevation: "none",
      ripple: false,
    },
  }
);

export interface MaterialButtonProps
  extends ButtonProps,
    VariantProps<typeof materialButtonVariants> {
  ripple?: boolean;
  elevation?: "none" | "low" | "medium" | "high";
}

const MaterialButton = React.forwardRef<HTMLButtonElement, MaterialButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    ripple = false,
    elevation,
    ...props 
  }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.classList.add('md-ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      }
      
      if (props.onClick) {
        props.onClick(e);
      }
    };
    
    return (
      <Button
        className={cn(materialButtonVariants({ 
          variant, 
          size, 
          ripple,
          elevation,
          className 
        }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

MaterialButton.displayName = "MaterialButton";

export { MaterialButton };
