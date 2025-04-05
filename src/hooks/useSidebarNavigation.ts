
import { useState, useEffect } from 'react';
import { UserRoleType } from '@/types/auth';
import { MenuItem } from '@/types/navigation';
import { 
  Home, BookOpen, Calendar, Users, Settings, 
  Folder, FileText, BarChart2, Medal, GraduationCap,
  MessageSquare, HelpCircle, User, UserPlus, Mail,
  Shield, Database, Code
} from 'lucide-react';

export const useSidebarNavigation = (
  userRole: UserRoleType | null | undefined, 
  viewAsRole?: UserRoleType | null,
  onRoleChange?: (role: UserRoleType) => void
) => {
  const [currentViewRole, setCurrentViewRole] = useState<UserRoleType | null>(
    viewAsRole || userRole || null
  );
  const [navigationItems, setNavigationItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (viewAsRole !== undefined) {
      setCurrentViewRole(viewAsRole);
    } else if (userRole) {
      setCurrentViewRole(userRole);
    }
  }, [userRole, viewAsRole]);

  useEffect(() => {
    const items: MenuItem[] = [];

    // Common items for all roles
    items.push({
      id: 'dashboard',
      path: '/app/dashboard',
      label: 'Dashboard',
      icon: Home
    });

    // Role-specific items
    if (currentViewRole === 'admin') {
      items.push(
        {
          id: 'users',
          path: '/admin/users',
          label: 'Usuarios',
          icon: Users
        },
        {
          id: 'courses',
          path: '/admin/courses',
          label: 'Cursos',
          icon: BookOpen
        },
        {
          id: 'pages',
          path: '/admin/pages',
          label: 'Páginas',
          icon: FileText
        },
        {
          id: 'stats',
          path: '/admin/stats',
          label: 'Estadísticas',
          icon: BarChart2
        },
        {
          id: 'settings',
          path: '/admin/settings',
          label: 'Configuración',
          icon: Settings
        }
      );
    } else if (currentViewRole === 'instructor') {
      items.push(
        {
          id: 'courses',
          path: '/instructor/courses',
          label: 'Mis Cursos',
          icon: BookOpen
        },
        {
          id: 'students',
          path: '/instructor/students',
          label: 'Estudiantes',
          icon: Users
        },
        {
          id: 'calendar',
          path: '/instructor/calendar',
          label: 'Calendario',
          icon: Calendar
        }
      );
    } else if (currentViewRole === 'student') {
      items.push(
        {
          id: 'my-courses',
          path: '/student/courses',
          label: 'Mis Cursos',
          icon: BookOpen
        },
        {
          id: 'explore',
          path: '/student/explore',
          label: 'Explorar Cursos',
          icon: GraduationCap
        },
        {
          id: 'achievements',
          path: '/student/achievements',
          label: 'Logros',
          icon: Medal
        },
        {
          id: 'community',
          path: '/community',
          label: 'Comunidad',
          icon: MessageSquare
        }
      );
    } else if (currentViewRole === 'moderator') {
      items.push(
        {
          id: 'content',
          path: '/moderator/content',
          label: 'Contenido',
          icon: FileText
        },
        {
          id: 'users',
          path: '/moderator/users',
          label: 'Usuarios',
          icon: Users
        },
        {
          id: 'reports',
          path: '/moderator/reports',
          label: 'Reportes',
          icon: Shield
        }
      );
    } else if (currentViewRole === 'sistemas') {
      items.push(
        {
          id: 'database',
          path: '/sistemas/database',
          label: 'Base de datos',
          icon: Database
        },
        {
          id: 'code',
          path: '/sistemas/code',
          label: 'Código',
          icon: Code
        },
        {
          id: 'logs',
          path: '/sistemas/logs',
          label: 'Logs',
          icon: FileText
        }
      );
    } else if (currentViewRole === 'content_creator') {
      items.push(
        {
          id: 'content',
          path: '/content/create',
          label: 'Crear Contenido',
          icon: FileText
        },
        {
          id: 'media',
          path: '/content/media',
          label: 'Media',
          icon: Folder
        },
        {
          id: 'submissions',
          path: '/content/submissions',
          label: 'Enviados',
          icon: Mail
        }
      );
    } else if (currentViewRole === 'manager') {
      items.push(
        {
          id: 'teams',
          path: '/manager/teams',
          label: 'Equipos',
          icon: Users
        },
        {
          id: 'stats',
          path: '/manager/stats',
          label: 'Estadísticas',
          icon: BarChart2
        },
        {
          id: 'resources',
          path: '/manager/resources',
          label: 'Recursos',
          icon: Folder
        }
      );
    } else {
      // Default for guest or unauthorized users
      items.push(
        {
          id: 'login',
          path: '/auth/login',
          label: 'Iniciar Sesión',
          icon: User
        },
        {
          id: 'register',
          path: '/auth/register',
          label: 'Registro',
          icon: UserPlus
        },
        {
          id: 'help',
          path: '/help',
          label: 'Ayuda',
          icon: HelpCircle
        }
      );
    }

    // Account and profile links for authenticated users
    if (currentViewRole !== 'guest' && currentViewRole !== 'anonymous' && currentViewRole !== 'anonimo') {
      items.push(
        {
          id: 'profile',
          path: '/app/profile',
          label: 'Mi Perfil',
          icon: User
        },
        {
          id: 'settings',
          path: '/app/settings',
          label: 'Ajustes',
          icon: Settings
        }
      );
    }

    setNavigationItems(items);
  }, [currentViewRole]);

  const handleRoleChange = (role: UserRoleType) => {
    setCurrentViewRole(role);
    if (onRoleChange) {
      onRoleChange(role);
    }
  };

  return {
    navigationItems,
    currentViewRole,
    handleRoleChange
  };
};

export default useSidebarNavigation;
