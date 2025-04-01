
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import InlineEdit from '@/components/admin/InlineEdit';
import { useEditMode } from '@/contexts/EditModeContext';

interface MenuItemProps {
  href: string;
  title: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  badge?: React.ReactNode;
  className?: string;
  isExternal?: boolean;
  itemId?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  href,
  title,
  icon,
  isActive = false,
  badge,
  className,
  isExternal = false,
  itemId
}) => {
  const { isEditMode } = useEditMode();
  
  const handleTitleChange = (newTitle: string) => {
    console.log(`Menu item ${itemId} title changed to: ${newTitle}`);
    // In a real implementation, we would save this to the database
  };

  const content = (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {isEditMode && itemId ? (
          <InlineEdit 
            value={title}
            onChange={handleTitleChange}
            className="font-medium"
          />
        ) : (
          <span>{title}</span>
        )}
      </div>
      {badge && <div>{badge}</div>}
    </div>
  );

  if (isExternal) {
    return (
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn("justify-start w-full", className)}
        asChild
      >
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      </Button>
    );
  }

  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn("justify-start w-full", className)}
      asChild
    >
      <Link to={href}>{content}</Link>
    </Button>
  );
};

export default MenuItem;
