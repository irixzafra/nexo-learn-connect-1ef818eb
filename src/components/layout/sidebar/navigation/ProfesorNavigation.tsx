
import React from 'react';
import { NavLink } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProfesorNavigation: React.FC = () => {
  return (
    <NavLink 
      to="/instructor/dashboard" 
      className={({ isActive }) => cn(
        "flex items-center py-2 text-sm hover:text-blue-500 transition-colors",
        isActive ? "text-blue-500" : "text-gray-700"
      )}
    >
      <GraduationCap className="mr-3 h-5 w-5 text-blue-500" />
      <span>Profesor</span>
    </NavLink>
  );
};

export default ProfesorNavigation;
