
import { useState, useEffect } from "react";
import { UserRoleType } from "@/types/auth";
import { NavigationItemWithChildren } from "@/types/navigation-manager";

export const useDynamicNavigation = (role: UserRoleType | null, simulated: UserRoleType | null | undefined = null) => {
  // Define basic navigation items based on roles
  const adminItems: NavigationItemWithChildren[] = [
    { id: "admin-dashboard", label: "Dashboard Admin", path: "/admin/dashboard", icon: "LayoutDashboard" },
    { id: "admin-users", label: "Usuarios", path: "/admin/users", icon: "Users" },
    { id: "admin-courses", label: "Cursos", path: "/admin/courses", icon: "GraduationCap" },
  ];

  const instructorItems: NavigationItemWithChildren[] = [
    { id: "instructor-dashboard", label: "Dashboard Instructor", path: "/instructor/dashboard", icon: "LayoutDashboard" },
    { id: "instructor-courses", label: "Mis Cursos", path: "/instructor/courses", icon: "Book" },
    { id: "instructor-analytics", label: "Analíticas", path: "/instructor/analytics", icon: "BarChart" },
  ];

  const studentItems: NavigationItemWithChildren[] = [
    { id: "student-dashboard", label: "Dashboard Estudiante", path: "/student/dashboard", icon: "LayoutDashboard" },
    { id: "student-courses", label: "Mis Cursos", path: "/student/courses", icon: "GraduationCap" },
    { id: "student-progress", label: "Mi Progreso", path: "/student/progress", icon: "LineChart" },
  ];

  const moderatorItems: NavigationItemWithChildren[] = [
    { id: "moderator-dashboard", label: "Dashboard Moderador", path: "/moderator/dashboard", icon: "LayoutDashboard" },
    { id: "moderator-forums", label: "Foros", path: "/moderator/forums", icon: "MessageSquare" },
    { id: "moderator-reports", label: "Reportes", path: "/moderator/reports", icon: "Flag" },
  ];

  const managerItems: NavigationItemWithChildren[] = [
    { id: "manager-dashboard", label: "Dashboard Gerente", path: "/manager/dashboard", icon: "LayoutDashboard" },
    { id: "manager-sales", label: "Ventas", path: "/manager/sales", icon: "DollarSign" },
    { id: "manager-reports", label: "Informes", path: "/manager/reports", icon: "FileText" },
  ];

  const sistemasItems: NavigationItemWithChildren[] = [
    { id: "sistemas-dashboard", label: "Dashboard IT", path: "/sistemas/dashboard", icon: "LayoutDashboard" },
    { id: "sistemas-config", label: "Configuración", path: "/sistemas/config", icon: "Settings" },
  ];

  const contentCreatorItems: NavigationItemWithChildren[] = [
    { id: "content-dashboard", label: "Dashboard Contenido", path: "/content/dashboard", icon: "LayoutDashboard" },
    { id: "content-library", label: "Librería", path: "/content/library", icon: "Library" },
  ];

  const guestItems: NavigationItemWithChildren[] = [
    { id: "guest-explore", label: "Explorar", path: "/guest/explore", icon: "Search" },
    { id: "guest-register", label: "Registrarse", path: "/auth/register", icon: "UserPlus" },
  ];

  const betaTesterItems: NavigationItemWithChildren[] = [
    { id: "beta-dashboard", label: "Dashboard Beta", path: "/beta/dashboard", icon: "LayoutDashboard" },
    { id: "beta-test", label: "Pruebas", path: "/beta/tests", icon: "Bug" },
  ];

  const anonymousItems: NavigationItemWithChildren[] = [
    { id: "anonymous-explore", label: "Explorar", path: "/explore", icon: "Search" },
    { id: "anonymous-login", label: "Iniciar Sesión", path: "/auth/login", icon: "LogIn" },
  ];

  const [menuItems, setMenuItems] = useState<NavigationItemWithChildren[]>([]);

  useEffect(() => {
    // Determine which role to use for navigation
    const effectiveRole = simulated || role;
    
    // Select items based on the effective role
    switch (effectiveRole) {
      case "admin":
        setMenuItems(adminItems);
        break;
      case "instructor":
        setMenuItems(instructorItems);
        break;
      case "student":
        setMenuItems(studentItems);
        break;
      case "moderator":
        setMenuItems(moderatorItems);
        break;
      case "manager":
        setMenuItems(managerItems);
        break;
      case "sistemas":
        setMenuItems(sistemasItems);
        break;
      case "content_creator":
        setMenuItems(contentCreatorItems);
        break;
      case "beta_tester":
        setMenuItems(betaTesterItems);
        break;
      case "guest":
        setMenuItems(guestItems);
        break;
      case "anonymous":
      case "anonimo":
        setMenuItems(anonymousItems);
        break;
      default:
        setMenuItems(anonymousItems); // Default to anonymous if no role match
    }
  }, [role, simulated]);

  return {
    menuItems,
    currentRole: simulated || role,
    currentViewRole: simulated || role,
    isUsingSimulatedRole: !!simulated
  };
};

export default useDynamicNavigation;
