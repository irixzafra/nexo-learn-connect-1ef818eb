
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const MisCursosNavigation: React.FC = () => {
  const location = useLocation();
  const isActive = location.pathname.includes('/my-courses');

  return (
    <NavLink 
      to="/my-courses" 
      className={({ isActive }) => cn(
        "flex items-center py-2 text-sm hover:text-primary transition-colors",
        isActive ? "text-primary font-medium" : "text-muted-foreground"
      )}
    >
      <BookOpen className={cn(
        "mr-3 h-5 w-5", 
        isActive ? "text-primary" : "text-muted-foreground"
      )} />
      <span>Mis cursos</span>
    </NavLink>
  );
};

export default MisCursosNavigation;
