
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  CreditCard, 
  Settings,
  Palette
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const AdminDashboardQuickAccess: React.FC = () => {
  const navigate = useNavigate();
  
  const quickAccessItems = [
    { 
      icon: BarChart3, 
      label: "Dashboard", 
      href: "/admin/dashboard",
      color: "bg-blue-100 text-blue-700"
    },
    { 
      icon: Users, 
      label: "Usuarios", 
      href: "/admin/users",
      color: "bg-indigo-100 text-indigo-700"
    },
    { 
      icon: BookOpen, 
      label: "Cursos", 
      href: "/admin/courses",
      color: "bg-green-100 text-green-700"
    },
    { 
      icon: CreditCard, 
      label: "Facturación", 
      href: "/admin/billing",
      color: "bg-amber-100 text-amber-700"
    },
    { 
      icon: Palette, 
      label: "Diseño", 
      href: "/admin/design",
      color: "bg-purple-100 text-purple-700"
    },
    { 
      icon: Settings, 
      label: "Config", 
      href: "/admin/settings",
      color: "bg-gray-100 text-gray-700"
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Acciones Rápidas</CardTitle>
        <CardDescription>Gestiona los aspectos principales de tu plataforma</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-3 gap-px bg-muted">
          {quickAccessItems.map((item, index) => (
            <Button 
              key={index}
              variant="ghost" 
              className="flex flex-col items-center justify-center h-24 bg-card rounded-none"
              onClick={() => navigate(item.href)}
            >
              <div className={`p-2 rounded-full mb-1 ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-center">{item.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-3">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full text-primary"
          onClick={() => document.getElementById('allMenuItems')?.scrollIntoView({behavior: 'smooth'})}
        >
          Ver todas las opciones
        </Button>
      </CardFooter>
    </Card>
  );
};
