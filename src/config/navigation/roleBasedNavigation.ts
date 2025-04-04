
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
  MessageCircle
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
  users: [
    {
      icon: Users,
      label: "Usuarios",
      path: "/app/admin/users",
      requiredRole: ["admin"]
    },
    {
      icon: Shield,
      label: "Roles y Permisos",
      path: "/app/admin/roles",
      requiredRole: ["admin"]
    }
  ],
  education: [
    {
      icon: BookOpen,
      label: "Cursos",
      path: "/app/admin/courses",
      requiredRole: ["admin"]
    },
    {
      icon: School,
      label: "Instructores",
      path: "/app/admin/instructors",
      requiredRole: ["admin"]
    }
  ],
  content: [
    {
      icon: FileText,
      label: "Páginas",
      path: "/app/admin/pages",
      requiredRole: ["admin"]
    },
    {
      icon: FileCode,
      label: "Desarrollo",
      path: "/app/admin/development",
      requiredRole: ["admin"]
    }
  ],
  communications: [
    {
      icon: Bell,
      label: "Notificaciones",
      path: "/app/admin/notifications",
      requiredRole: ["admin"],
      badge: 3
    },
    {
      icon: MessageSquare,
      label: "Mensajes",
      path: "/app/admin/messages",
      requiredRole: ["admin"],
      badge: 5
    }
  ],
  system: [
    {
      icon: Settings,
      label: "Configuración",
      path: "/app/admin/settings",
      requiredRole: ["admin"]
    },
    {
      icon: HelpCircle,
      label: "Soporte",
      path: "/app/admin/support",
      requiredRole: ["admin"]
    }
  ]
};

// Instructor navigation organized by workflows as specified in NAVIGATION.md
export const instructorNavigation: NavigationMenus = {
  dashboard: [
    {
      icon: LayoutDashboard,
      label: "Panel del Instructor",
      path: "/app/instructor/dashboard",
      requiredRole: ["instructor"]
    }
  ],
  courses: [
    {
      icon: BookOpen,
      label: "Mis Cursos",
      path: "/app/instructor/courses",
      requiredRole: ["instructor"]
    },
    {
      icon: Video,
      label: "Crear Contenido",
      path: "/app/instructor/content/create",
      requiredRole: ["instructor"]
    },
    {
      icon: FileCheck,
      label: "Evaluaciones",
      path: "/app/instructor/assessments",
      requiredRole: ["instructor"]
    }
  ],
  schedule: [
    {
      icon: Calendar,
      label: "Calendario",
      path: "/app/instructor/calendar",
      requiredRole: ["instructor"]
    }
  ],
  students: [
    {
      icon: Users,
      label: "Estudiantes",
      path: "/app/instructor/students",
      requiredRole: ["instructor"]
    },
    {
      icon: MessageSquare,
      label: "Mensajes",
      path: "/app/instructor/messages",
      requiredRole: ["instructor"],
      badge: 3
    }
  ],
  analytics: [
    {
      icon: BarChart2,
      label: "Estadísticas",
      path: "/app/instructor/analytics",
      requiredRole: ["instructor"]
    },
    {
      icon: FileText,
      label: "Informes",
      path: "/app/instructor/reports",
      requiredRole: ["instructor"]
    }
  ],
  settings: [
    {
      icon: Settings,
      label: "Configuración",
      path: "/app/instructor/settings",
      requiredRole: ["instructor"]
    },
    {
      icon: HelpCircle,
      label: "Ayuda",
      path: "/app/instructor/help",
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
