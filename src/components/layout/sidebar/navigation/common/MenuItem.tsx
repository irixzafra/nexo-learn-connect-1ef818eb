
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useEditMode } from '@/contexts/EditModeContext';

interface MenuItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed?: boolean;
  badge?: React.ReactNode;
  disabled?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  to,
  icon: Icon,
  label,
  isCollapsed = false,
  badge,
  disabled = false,
}) => {
  const { isEditMode } = useEditMode();
  
  // Simple placeholder for inline editing
  const handleTitleChange = (newTitle: string) => {
    console.log(`Menu item title changed to: ${newTitle}`);
    // In a real implementation, we would save this to the database
  };

  return (
    <Button
      variant="ghost"
      className={cn("justify-start w-full", disabled && "opacity-60 cursor-not-allowed")}
      asChild
      disabled={disabled}
    >
      <Link to={disabled ? "#" : to}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            <span>{label}</span>
          </div>
          {badge && <div>{badge}</div>}
        </div>
      </Link>
    </Button>
  );
};

export default MenuItem;
