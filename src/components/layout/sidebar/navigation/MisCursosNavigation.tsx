
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const MisCursosNavigation: React.FC = () => {
  return (
    <NavLink 
      to="/my-courses" 
      className={({ isActive }) => cn(
        "flex items-center py-2 px-3 rounded-md text-sm hover:bg-accent transition-colors",
        isActive && "bg-accent text-accent-foreground"
      )}
    >
      <BookOpen className="mr-2 h-5 w-5" />
      <span>Mis cursos</span>
    </NavLink>
  );
};

export default MisCursosNavigation;
