
import React from 'react';
import { NavLink } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProfesorNavigation: React.FC = () => {
  return (
    <NavLink 
      to="/instructor/dashboard" 
      className={({ isActive }) => cn(
        "flex items-center py-2 px-3 rounded-md text-sm hover:bg-accent transition-colors",
        isActive && "bg-accent text-accent-foreground"
      )}
    >
      <GraduationCap className="mr-2 h-5 w-5" />
      <span>Profesor</span>
    </NavLink>
  );
};

export default ProfesorNavigation;
