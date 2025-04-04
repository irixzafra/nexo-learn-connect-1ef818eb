
import { 
  Home, 
  BookOpen, 
  Users, 
  BarChart3, 
  Settings, 
  Folder, 
  BookText,
  GraduationCap,
  Building2,
  FileText,
  CreditCard,
  DollarSign,
  Palette,
  Layout,
  Code,
  Database,
  Share2,
  Terminal,
  MessageCircle,
  Award,
  CalendarDays,
  Star,
  User,
  FileCheck,
  HelpCircle,
  Contact,
  PenTool
} from "lucide-react";

import { UserRoleType } from "@/types/auth";
import { NavigationMenus, MenuItem } from "@/types/navigation";

// Navigation for Admin role
export const adminNavigation: NavigationMenus = {
  dashboard: [
    {
      icon: Home,
      label: "Dashboard",
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
      requiredRole: ["admin"]
    },
    {
      icon: Folder,
      label: "Categorías",
      path: "/app/admin/categories",
      requiredRole: ["admin"]
    },
    {
      icon: FileText,
      label: "Rutas de Aprendizaje",
      path: "/app/admin/learning-paths",
      requiredRole: ["admin"]
    },
    {
      icon: Award,
      label: "Certificados",
      path: "/app/admin/certificates",
      requiredRole: ["admin"]
    },
    {
      icon: BarChart3,
      label: "Analíticas Académicas",
      path: "/app/admin/analytics/academic",
      requiredRole: ["admin"]
    }
  ],
  management: [
    {
      icon: Users,
      label: "Gestión de usuarios",
      path: "/app/admin/users",
      requiredRole: ["admin"]
    },
    {
      icon: Settings,
      label: "Roles y Permisos",
      path: "/app/admin/roles",
      requiredRole: ["admin"]
    },
    {
      icon: BarChart3,
      label: "Analíticas de Usuarios",
      path: "/app/admin/analytics/users",
      requiredRole: ["admin"]
    },
    {
      icon: MessageCircle,
      label: "Comunicación",
      path: "/app/admin/communication",
      requiredRole: ["admin"]
    }
  ],
  finance: [
    {
      icon: DollarSign,
      label: "Transacciones",
      path: "/app/admin/transactions",
      requiredRole: ["admin"]
    },
    {
      icon: CreditCard,
      label: "Suscripciones",
      path: "/app/admin/subscriptions",
      requiredRole: ["admin"]
    },
    {
      icon: BarChart3,
      label: "Analíticas Financieras",
      path: "/app/admin/analytics/finance",
      requiredRole: ["admin"]
    },
    {
      icon: Settings,
      label: "Configuración de Pagos",
      path: "/app/admin/payment-settings",
      requiredRole: ["admin"]
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
      requiredRole: ["admin"]
    },
    {
      icon: Layout,
      label: "Páginas CMS",
      path: "/app/admin/pages",
      requiredRole: ["admin"]
    },
    {
      icon: Settings,
      label: "Gestión de Features",
      path: "/app/admin/features",
      requiredRole: ["admin"]
    },
    {
      icon: Share2,
      label: "Integraciones",
      path: "/app/admin/integrations",
      requiredRole: ["admin"]
    },
    {
      icon: BarChart3,
      label: "Analíticas de Plataforma",
      path: "/app/admin/analytics/platform",
      requiredRole: ["admin"]
    }
  ],
  devTools: [
    {
      icon: Database,
      label: "Test Data Generator",
      path: "/app/admin/test-data",
      requiredRole: ["admin"]
    },
    {
      icon: Code,
      label: "Herramientas de desarrollo",
      path: "/app/admin/dev-tools",
      requiredRole: ["admin"]
    }
  ]
};

// Navigation for Instructor role
export const instructorNavigation: NavigationMenus = {
  dashboard: [
    {
      icon: Home,
      label: "Dashboard",
      path: "/app/instructor/dashboard",
      requiredRole: ["instructor"]
    }
  ],
  academicManagement: [
    {
      icon: BookOpen,
      label: "Mis Cursos",
      path: "/app/instructor/courses",
      requiredRole: ["instructor"]
    },
    {
      icon: PenTool,
      label: "Crear Curso",
      path: "/app/instructor/courses/create",
      requiredRole: ["instructor"]
    },
    {
      icon: Folder,
      label: "Biblioteca de Contenido",
      path: "/app/instructor/content",
      requiredRole: ["instructor"]
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
      path: "/app/instructor/progress",
      requiredRole: ["instructor"]
    },
    {
      icon: MessageCircle,
      label: "Comunicación",
      path: "/app/instructor/messages",
      requiredRole: ["instructor"]
    }
  ],
  performance: [
    {
      icon: BarChart3,
      label: "Analíticas de Cursos",
      path: "/app/instructor/analytics",
      requiredRole: ["instructor"]
    }
  ],
  account: [
    {
      icon: User,
      label: "Mi Perfil",
      path: "/app/instructor/profile",
      requiredRole: ["instructor"]
    },
    {
      icon: CreditCard,
      label: "Mi Facturación",
      path: "/app/instructor/billing",
      requiredRole: ["instructor"]
    },
    {
      icon: Settings,
      label: "Configuración",
      path: "/app/instructor/settings",
      requiredRole: ["instructor"]
    }
  ]
};

// Navigation for Student role
export const studentNavigation: NavigationMenus = {
  dashboard: [
    {
      icon: Home,
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
      icon: Award,
      label: "Leaderboard",
      path: "/app/community/leaderboard",
      requiredRole: ["student"]
    },
    {
      icon: MessageCircle,
      label: "Mensajes",
      path: "/app/messages",
      requiredRole: ["student"]
    }
  ],
  learning: [
    {
      icon: BookText,
      label: "Mis Cursos",
      path: "/app/my-courses",
      requiredRole: ["student"]
    },
    {
      icon: BookOpen,
      label: "Explorar Cursos",
      path: "/app/explore",
      requiredRole: ["student"]
    },
    {
      icon: FileText,
      label: "Rutas de Aprendizaje",
      path: "/app/learning-paths",
      requiredRole: ["student"]
    },
    {
      icon: CalendarDays,
      label: "Calendario",
      path: "/app/calendar",
      requiredRole: ["student"]
    }
  ],
  myAccount: [
    {
      icon: User,
      label: "Mi Perfil",
      path: "/app/profile",
      requiredRole: ["student"]
    },
    {
      icon: Award,
      label: "Progreso/Certificados",
      path: "/app/progress",
      requiredRole: ["student"]
    },
    {
      icon: CreditCard,
      label: "Facturación/Inscripciones",
      path: "/app/billing",
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
      label: "Centro de Ayuda",
      path: "/app/help",
      requiredRole: ["student"]
    },
    {
      icon: Contact,
      label: "Contactar Soporte",
      path: "/app/support",
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
