
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  BarChart3, 
  LineChart, 
  DollarSign, 
  FileText,
  List,
  Palette,
  Navigation,
  Brain,
  Search,
  Wand2
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const navItems = [
    { path: '/app/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/app/admin/users', label: 'Usuarios', icon: <Users size={18} /> },
    { path: '/app/admin/courses', label: 'Cursos', icon: <BookOpen size={18} /> },
    { path: '/app/admin/analytics', label: 'Analíticas', icon: <BarChart3 size={18} /> },
    { path: '/app/admin/analytics/users', label: 'Analíticas Usuarios', icon: <LineChart size={18} /> },
    { path: '/app/admin/analytics/courses', label: 'Analíticas Cursos', icon: <BookOpen size={18} /> },
    { path: '/app/admin/analytics/revenue', label: 'Analíticas Ingresos', icon: <DollarSign size={18} /> },
    { path: '/app/admin/system-pages', label: 'Páginas', icon: <FileText size={18} /> },
    { path: '/app/admin/design-system', label: 'Diseño', icon: <Palette size={18} /> },
    { path: '/app/admin/navigation-diagram', label: 'Navegación', icon: <Navigation size={18} /> },
    { path: '/app/settings/seo', label: 'SEO', icon: <Search size={18} /> },
    { path: '/app/admin/ai-services', label: 'IA Básica', icon: <Brain size={18} /> },
    { path: '/app/admin/ai-advanced', label: 'IA Avanzada', icon: <Wand2 size={18} /> },
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
