
import { 
  LayoutDashboard, 
  Users, 
  BookOpen,
  Settings,
  Shield,
  School,
  FileText,
  HelpCircle,
  Bell,
  MessageSquare,
  FileCode,
  GraduationCap,
  Calendar,
  Video,
  FileCheck,
  BarChart2,
  Compass,
  User,
  Award,
  MessageCircle,
  CreditCard,
  Palette,
  Plug,
  Database,
  PanelLeft,
  Activity,
  Sparkles
} from "lucide-react";

import { UserRoleType } from "@/types/auth";
import { NavigationMenus, MenuItem } from "@/types/navigation";

// Admin navigation organized by domains as specified in NAVIGATION.md
export const adminNavigation: NavigationMenus = {
  dashboard: [
    {
      icon: LayoutDashboard,
      label: "Panel de Control",
      path: "/app/admin/dashboard",
      requiredRole: ["admin"]
    }
  ],
  academic: [
    {
      icon: BookOpen,
      label: "Gestión de Cursos",
      path: "/app/admin/courses",
      requiredRole: ["admin"]
    },
    {
      icon: FileText,
      label: "Contenido Global",
      path: "/app/admin/content",
      requiredRole: ["admin"],
      disabled: true
    },
    {
      icon: GraduationCap,
      label: "Rutas de Aprendizaje",
      path: "/app/admin/learning-paths",
      requiredRole: ["admin"],
      disabled: true
    },
    {
      icon: Award,
      label: "Certificados",
      path: "/app/admin/certificates",
      requiredRole: ["admin"],
      disabled: true
    },
    {
      icon: BarChart2,
      label: "Analíticas Académicas",
      path: "/app/admin/academic-analytics",
      requiredRole: ["admin"],
      disabled: true
    }
  ],
  management: [
    {
      icon: Users,
      label: "Gestión de Usuarios",
      path: "/app/admin/users",
      requiredRole: ["admin"]
    },
    {
      icon: Shield,
      label: "Roles y Permisos",
      path: "/app/admin/roles",
      requiredRole: ["admin"]
    },
    {
      icon: Activity,
      label: "Analíticas de Usuarios",
      path: "/app/admin/user-analytics",
      requiredRole: ["admin"],
      disabled: true
    },
    {
      icon: MessageSquare,
      label: "Comunicación",
      path: "/app/admin/communication",
      requiredRole: ["admin"],
      disabled: true
    }
  ],
  finances: [
    {
      icon: CreditCard,
      label: "Transacciones",
      path: "/app/admin/transactions",
      requiredRole: ["admin"],
      disabled: true
    },
    {
      icon: Activity,
      label: "Suscripciones",
      path: "/app/admin/subscriptions",
      requiredRole: ["admin"],
      disabled: true
    },
    {
      icon: BarChart2,
      label: "Analíticas Financieras",
      path: "/app/admin/financial-analytics",
      requiredRole: ["admin"],
      disabled: true
    },
    {
      icon: Settings,
      label: "Configuración de Pagos",
      path: "/app/admin/payment-settings",
      requiredRole: ["admin"],
      disabled: true
    }
  ],
  system: [
    {
      icon: Settings,
      label: "Configuración General",
      path: "/app/admin/settings",
      requiredRole: ["admin"]
    },
    {
      icon: Palette,
      label: "Diseño",
      path: "/app/admin/design",
      requiredRole: ["admin"],
      disabled: true
    },
    {
      icon: FileText,
      label: "Páginas CMS",
      path: "/app/admin/pages",
      requiredRole: ["admin"]
    },
    {
      icon: Sparkles,
      label: "Gestión de Features",
      path: "/app/admin/features",
      requiredRole: ["admin"]
    },
    {
      icon: Plug,
      label: "Integraciones",
      path: "/app/admin/integrations",
      requiredRole: ["admin"],
      disabled: true
    },
    {
      icon: BarChart2,
      label: "Analíticas de Plataforma",
      path: "/app/admin/platform-analytics",
      requiredRole: ["admin"],
      disabled: true
    },
    {
      icon: Database,
      label: "Salud/Logs",
      path: "/app/admin/system-health",
      requiredRole: ["admin"],
      disabled: true
    }
  ],
  development: [
    {
      icon: PanelLeft,
      label: "Diagrama de Navegación",
      path: "/app/admin/navigation-diagram",
      requiredRole: ["admin"]
    },
    {
      icon: FileText,
      label: "Revisión de Elementos",
      path: "/app/admin/review-elements",
      requiredRole: ["admin"],
      disabled: true
    },
    {
      icon: FileCode,
      label: "Herramientas de Desarrollo",
      path: "/app/admin/development",
      requiredRole: ["admin"]
    },
    {
      icon: Settings,
      label: "Configuraciones Avanzadas",
      path: "/app/admin/advanced-settings",
      requiredRole: ["admin"],
      disabled: true
    }
  ]
};

// Instructor navigation organized by workflows as specified in NAVIGATION.md
export const instructorNavigation: NavigationMenus = {
  dashboard: [
    {
      icon: LayoutDashboard,
      label: "Panel Instructor",
      path: "/app/instructor/dashboard",
      requiredRole: ["instructor"]
    }
  ],
  academic: [
    {
      icon: BookOpen,
      label: "Mis Cursos",
      path: "/app/instructor/courses",
      requiredRole: ["instructor"]
    },
    {
      icon: Video,
      label: "Crear Curso",
      path: "/app/instructor/courses/create",
      requiredRole: ["instructor"]
    },
    {
      icon: FileText,
      label: "Biblioteca de Contenido",
      path: "/app/instructor/content-library",
      requiredRole: ["instructor"],
      disabled: true
    }
  ],
  students: [
    {
      icon: Users,
      label: "Mis Estudiantes",
      path: "/app/instructor/students",
      requiredRole: ["instructor"]
    },
    {
      icon: FileCheck,
      label: "Progreso/Notas",
      path: "/app/instructor/student-progress",
      requiredRole: ["instructor"],
      disabled: true
    },
    {
      icon: MessageSquare,
      label: "Comunicación",
      path: "/app/instructor/communication",
      requiredRole: ["instructor"],
      disabled: true
    }
  ],
  performance: [
    {
      icon: BarChart2,
      label: "Analíticas de Cursos",
      path: "/app/instructor/analytics",
      requiredRole: ["instructor"]
    }
  ],
  account: [
    {
      icon: User,
      label: "Mi Perfil",
      path: "/app/profile",
      requiredRole: ["instructor"]
    },
    {
      icon: CreditCard,
      label: "Mi Facturación",
      path: "/app/instructor/billing",
      requiredRole: ["instructor"],
      disabled: true
    },
    {
      icon: Settings,
      label: "Configuración",
      path: "/app/instructor/settings",
      requiredRole: ["instructor"]
    }
  ]
};

// Student navigation with Community First as specified in NAVIGATION.md
export const studentNavigation: NavigationMenus = {
  dashboard: [
    {
      icon: LayoutDashboard,
      label: "Mi Panel",
      path: "/app/dashboard",
      requiredRole: ["student"]
    }
  ],
  community: [
    {
      icon: MessageCircle,
      label: "Feed",
      path: "/app/community/feed",
      requiredRole: ["student"]
    },
    {
      icon: Users,
      label: "Comunidad",
      path: "/app/community",
      requiredRole: ["student"]
    },
    {
      icon: MessageSquare,
      label: "Mensajes",
      path: "/app/messages",
      requiredRole: ["student"],
      badge: 3
    },
    {
      icon: Bell,
      label: "Notificaciones",
      path: "/app/notifications",
      requiredRole: ["student"],
      badge: 2
    }
  ],
  learning: [
    {
      icon: BookOpen,
      label: "Mis Cursos",
      path: "/app/my-courses",
      requiredRole: ["student"],
      isHighlighted: true
    },
    {
      icon: Compass,
      label: "Explorar Cursos",
      path: "/app/explore-courses",
      requiredRole: ["student"]
    },
    {
      icon: FileText,
      label: "Rutas de Aprendizaje",
      path: "/app/learning-paths",
      requiredRole: ["student"]
    },
    {
      icon: Calendar,
      label: "Calendario",
      path: "/app/calendar",
      requiredRole: ["student"]
    }
  ],
  account: [
    {
      icon: User,
      label: "Mi Perfil",
      path: "/app/profile",
      requiredRole: ["student"]
    },
    {
      icon: Award,
      label: "Certificados",
      path: "/app/certificates",
      requiredRole: ["student"]
    },
    {
      icon: Settings,
      label: "Configuración",
      path: "/app/settings",
      requiredRole: ["student"]
    }
  ],
  help: [
    {
      icon: HelpCircle,
      label: "Ayuda",
      path: "/app/help",
      requiredRole: ["student"]
    }
  ]
};

// Function to get navigation items based on role
export const getNavigationByRole = (role: UserRoleType | string): NavigationMenus => {
  switch (role) {
    case "admin":
      return adminNavigation;
    case "instructor":
      return instructorNavigation;
    case "student":
    default:
      return studentNavigation;
  }
};

// Function to get home path based on role
export const getHomePathByRole = (role: UserRoleType | string): string => {
  switch (role) {
    case "admin":
      return "/app/admin/dashboard";
    case "instructor":
      return "/app/instructor/dashboard";
    case "student":
    default:
      return "/app/dashboard";
  }
};
