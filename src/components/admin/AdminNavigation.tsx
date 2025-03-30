
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CreditCard, 
  Database,
  Settings,
} from 'lucide-react';

// Main navigation categories
const adminCategories = [
  { 
    id: 'dashboard',
    icon: LayoutDashboard, 
    label: "Dashboard", 
    path: "/admin/dashboard"
  },
  { 
    id: 'users',
    icon: Users, 
    label: "Usuarios", 
    path: "/admin/users",
  },
  { 
    id: 'courses',
    icon: BookOpen, 
    label: "Cursos", 
    path: "/admin/courses",
  },
  { 
    id: 'finances',
    icon: CreditCard, 
    label: "Finanzas", 
    path: "/admin/billing",
  },
  { 
    id: 'data',
    icon: Database, 
    label: "Datos", 
    path: "/admin/test-data",
  },
  { 
    id: 'config',
    icon: Settings, 
    label: "Config", 
    path: "/admin/settings",
  }
];

const AdminNavigation = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const isActive = (route: string) => {
    return path.includes(route);
  };
  
  return (
    <div className="w-full border-b mb-6 sticky top-0 bg-background z-10">
      <div className="container mx-auto py-2">
        {/* Main Categories Navigation */}
        <div className="flex flex-wrap gap-1 justify-center md:justify-start">
          {adminCategories.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-1 px-3 py-2 rounded-md transition-colors",
                "hover:bg-accent text-sm font-medium",
                path.includes(item.id) ? "bg-secondary" : ""
              )}
            >
              <item.icon className="h-4 w-4 md:mr-1" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNavigation;
