
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const MisCursosNavigation: React.FC = () => {
  return (
    <NavLink 
      to="/my-courses" 
      className={({ isActive }) => cn(
        "flex items-center py-2 text-sm hover:text-blue-500 transition-colors",
        isActive ? "text-blue-500" : "text-gray-700"
      )}
    >
      <BookOpen className="mr-3 h-5 w-5 text-blue-500" />
      <span>Mis cursos</span>
    </NavLink>
  );
};

export default MisCursosNavigation;
