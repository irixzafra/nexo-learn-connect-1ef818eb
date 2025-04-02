
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, BookOpen, Settings } from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const navItems = [
    { path: '/app/admin/dashboard', label: 'Dashboard Admin', icon: <LayoutDashboard size={18} /> },
    { path: '/app/admin/users', label: 'Gestión Usuarios', icon: <Users size={18} /> },
    { path: '/app/admin/courses', label: 'Gestión Cursos', icon: <BookOpen size={18} /> },
    { path: '/app/settings', label: 'Configuración', icon: <Settings size={18} /> },
  ];

  return (
    <nav className="p-4">
      <h3 className="font-medium mb-4 text-lg">Panel de Administración</h3>
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

export default AdminSidebar;
