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
  Compass,
  User,
  Award,
  Calendar,
  MessageCircle,
  CreditCard,
  Palette,
  Plug,
  Database,
  PanelLeft,
  Activity,
  Sparkles,
  GraduationCap
} from "lucide-react";

import { UserRoleType } from "@/types/auth";
import { NavigationMenus, MenuItem } from "@/types/navigation";

// Admin navigation organized by domains as specified in NAVIGATION.md
export const adminNavigation: NavigationMenus = {
  dashboard: [
    {
      icon: LayoutDashboard,
      label: "Visión General",
      path: "/app/admin/dashboard",
      requiredRole: ["admin"]
    },
    {
      icon: Activity,
      label: "KPIs clave",
      path: "/app/admin/kpis",
      requiredRole: ["admin"],
      disabled: true
    },
    {
      icon: Bell,
      label: "Resumen de actividad reciente",
      path: "/app/admin/recent-activity",
      requiredRole: ["admin"],
      disabled: true
    },
    {
      icon: Bell,
      label: "Alertas y notificaciones importantes",
      path: "/app/admin/alerts",
      requiredRole: ["admin"],
      disabled: true
    }
  ],
  académico: [
    {
      icon: BookOpen,
      label: "Gestión de cursos",
      path: "/app/admin/courses",
      requiredRole: ["admin"]
    },
    {
      icon: FileText,
      label: "Contenido Global",
      path: "/app/admin/content-global",
      requiredRole: ["admin"],
      disabled: true
    },
    {
      icon: FileText,
      label: "Categorías",
      path: "/app/admin/categories",
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
      icon: Activity,
      label: "Analíticas Académicas",
      path: "/app/admin/academic-analytics",
      requiredRole: ["admin"],
      disabled: true
    }
  ],
  "gestión central": [
    {
      icon: Users,
      label: "Gestión de usuarios",
      path: "/app/admin/users",
      requiredRole: ["admin"]
    },
    {
      icon: Shield,
      label: "Roles y permisos",
      path: "/app/admin/roles",
      requiredRole: ["admin"]
    },
    {
      icon: Activity,
      label: "Analíticas de usuarios",
      path: "/app/admin/users-analytics",
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
  finanzas: [
    {
      icon: CreditCard,
      label: "Transacciones",
      path: "/app/admin/transactions",
      requiredRole: ["admin"],
      disabled: true
    },
    {
      icon: CreditCard,
      label: "Suscripciones",
      path: "/app/admin/subscriptions",
      requiredRole: ["admin"],
      disabled: true
    },
    {
      icon: Activity,
      label: "Analíticas Financieras",
      path: "/app/admin/financial-analytics",
      requiredRole: ["admin"],
      disabled: true
    },
    {
      icon: Settings,
      label: "Configuración de pagos",
      path: "/app/admin/payment-settings",
      requiredRole: ["admin"],
      disabled: true
    }
  ],
  sistema: [
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
      icon: Activity,
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
  "herramientas dev": [
    {
      icon: PanelLeft,
      label: "Diagrama de navegación",
      path: "/app/admin/navigation-diagram",
      requiredRole: ["admin"]
    },
    {
      icon: FileText,
      label: "Revisión de elementos",
      path: "/app/admin/review-elements",
      requiredRole: ["admin"]
    },
    {
      icon: FileCode,
      label: "Herramientas de desarrollo",
      path: "/app/admin/development",
      requiredRole: ["admin"]
    },
    {
      icon: Settings,
      label: "Configuraciones avanzadas",
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
    },
    {
      icon: Activity,
      label: "Resumen de actividad reciente",
      path: "/app/instructor/recent-activity",
      requiredRole: ["instructor"],
      disabled: true
    },
    {
      icon: Activity,
      label: "Métricas de cursos",
      path: "/app/instructor/course-metrics",
      requiredRole: ["instructor"],
      disabled: true
    },
    {
      icon: Calendar,
      label: "Próximas sesiones",
      path: "/app/instructor/upcoming-sessions",
      requiredRole: ["instructor"],
      disabled: true
    },
    {
      icon: Bell,
      label: "Notificaciones importantes",
      path: "/app/instructor/notifications",
      requiredRole: ["instructor"],
      disabled: true
    }
  ],
  "gestión académica": [
    {
      icon: BookOpen,
      label: "Mis Cursos",
      path: "/app/instructor/courses",
      requiredRole: ["instructor"]
    },
    {
      icon: FileText,
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
  participantes: [
    {
      icon: Users,
      label: "Mis Participantes",
      path: "/app/instructor/participants",
      requiredRole: ["instructor"]
    },
    {
      icon: FileText,
      label: "Progreso/Retroalimentación",
      path: "/app/instructor/feedback",
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
  rendimiento: [
    {
      icon: Activity,
      label: "Analíticas de Cursos",
      path: "/app/instructor/analytics",
      requiredRole: ["instructor"],
      disabled: true
    }
  ],
  cuenta: [
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
    },
    {
      icon: Activity,
      label: "Resumen de actividad",
      path: "/app/activity-summary",
      requiredRole: ["student"],
      disabled: true
    },
    {
      icon: Calendar,
      label: "Próximas entregas",
      path: "/app/upcoming-deadlines",
      requiredRole: ["student"],
      disabled: true
    },
    {
      icon: Compass,
      label: "Recomendaciones personalizadas",
      path: "/app/recommendations",
      requiredRole: ["student"],
      disabled: true
    },
    {
      icon: Bell,
      label: "Notificaciones",
      path: "/app/notifications",
      requiredRole: ["student"],
      disabled: true
    }
  ],
  comunidad: [
    {
      icon: MessageCircle,
      label: "Feed",
      path: "/app/community/feed",
      requiredRole: ["student"],
      disabled: true
    },
    {
      icon: Award,
      label: "Leaderboard",
      path: "/app/community/leaderboard",
      requiredRole: ["student"],
      disabled: true
    },
    {
      icon: MessageSquare,
      label: "Mensajes",
      path: "/app/messages",
      requiredRole: ["student"],
      disabled: true
    },
    {
      icon: Bell,
      label: "Notificaciones",
      path: "/app/notifications",
      requiredRole: ["student"],
      disabled: true
    }
  ],
  aprendizaje: [
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
      icon: GraduationCap,
      label: "Rutas de Aprendizaje",
      path: "/app/learning-paths",
      requiredRole: ["student"],
      disabled: true
    },
    {
      icon: Calendar,
      label: "Calendario",
      path: "/app/calendar",
      requiredRole: ["student"],
      disabled: true
    }
  ],
  "mi cuenta": [
    {
      icon: User,
      label: "Mi Perfil",
      path: "/app/profile",
      requiredRole: ["student"]
    },
    {
      icon: Award,
      label: "Progreso/Certificados",
      path: "/app/certificates",
      requiredRole: ["student"],
      disabled: true
    },
    {
      icon: CreditCard,
      label: "Facturación/Participaciones",
      path: "/app/billing",
      requiredRole: ["student"],
      disabled: true
    },
    {
      icon: Settings,
      label: "Configuración",
      path: "/app/settings",
      requiredRole: ["student"]
    }
  ],
  ayuda: [
    {
      icon: HelpCircle,
      label: "Centro de Ayuda",
      path: "/app/help-center",
      requiredRole: ["student"],
      disabled: true
    },
    {
      icon: MessageSquare,
      label: "Contactar Soporte",
      path: "/app/contact-support",
      requiredRole: ["student"],
      disabled: true
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
