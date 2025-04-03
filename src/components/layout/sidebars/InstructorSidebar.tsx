
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, BookOpen, Users, UserCircle } from 'lucide-react';

const InstructorSidebar: React.FC = () => {
  const navItems = [
    { path: '/app/instructor/dashboard', label: 'Dashboard Instructor', icon: <LayoutDashboard size={18} /> },
    { path: '/app/instructor/courses', label: 'Mis Cursos (Instr.)', icon: <BookOpen size={18} /> },
    { path: '/app/instructor/students', label: 'Estudiantes', icon: <Users size={18} /> },
    { path: '/app/profile', label: 'Perfil', icon: <UserCircle size={18} /> },
  ];

  return (
    <nav className="p-4">
      <h3 className="font-medium mb-4 text-lg">Panel de Instructor</h3>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => 
                `block ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`
              }
            >
              <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                {item.icon}
                <span>{item.label}</span>
              </Button>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default InstructorSidebar;
