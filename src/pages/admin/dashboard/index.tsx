
import React from 'react';
import SectionPageLayout, { PageSection } from '@/layouts/SectionPageLayout';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  CreditCard, 
  AlertCircle, 
  CheckCircle,
  Link2,
  ExternalLink,
  School,
  Settings,
  Database,
  Shield,
  KeyRound,
  FileText,
  History
} from 'lucide-react';
import AdminMenu from '@/components/ui/admin-menu/AdminMenu';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAdminDashboardStats } from '@/features/admin/hooks/useAdminDashboardStats';

const AdminDashboard: React.FC = () => {
  const { stats, isLoading } = useAdminDashboardStats();

  // Ensure stats has default values to prevent "undefined" errors
  const safeStats = {
    total_users: stats?.total_users || 0,
    active_courses: stats?.active_courses || 0,
    total_enrollments: stats?.total_enrollments || 0,
    new_users_last_7_days: stats?.new_users_last_7_days || 0,
    coursesCount: stats?.coursesCount || 0,
    publishedCoursesCount: stats?.publishedCoursesCount || 0,
    completionRate: stats?.completionRate || 0
  };

  // Accesos rápidos ampliados con todas las páginas administrativas disponibles
  const adminQuickMenuItems = [
    {
      label: "Dashboard",
      icon: BarChart3,
      description: "Vista general del sistema",
      href: "/admin/dashboard"
    },
    {
      label: "Gestionar Usuarios",
      icon: Users,
      description: "Administrar usuarios y roles",
      href: "/admin/users"
    },
    {
      label: "Gestionar Cursos",
      icon: BookOpen,
      description: "Administrar catálogo de cursos",
      href: "/admin/courses"
    },
    {
      label: "Gestionar Instructores",
      icon: School,
      description: "Administrar instructores",
      href: "/admin/instructors"
    },
    {
      label: "Roles y Permisos",
      icon: KeyRound,
      description: "Configurar roles de usuarios",
      href: "/admin/roles"
    },
    {
      label: "Facturación",
      icon: CreditCard,
      description: "Gestión de pagos e ingresos",
      href: "/admin/billing"
    },
    {
      label: "Datos de Prueba",
      icon: Database,
      description: "Herramientas para desarrollo",
      href: "/admin/test-data"
    },
    {
      label: "Configuración del Sistema",
      icon: Settings,
      description: "Opciones y parámetros del sistema",
      href: "/admin/settings"
    },
    {
      label: "Control de Acceso",
      icon: Shield,
      description: "Políticas de seguridad",
      href: "/admin/access"
    },
    {
      label: "Auditoría",
      icon: History,
      description: "Registros de actividad",
      href: "/admin/audit-log"
    },
    {
      label: "Categorías",
      icon: FileText,
      description: "Gestión de categorías",
      href: "/admin/categories"
    }
  ];

  // System alerts for admin dashboard
  const systemAlerts = [
    {
      id: 1,
      type: "info",
      title: "Actualización de Seguridad Pendiente",
      description: "Se recomienda actualizar los módulos de seguridad a la última versión.",
      icon: <AlertCircle className="h-5 w-5" />
    },
    {
      id: 2,
      type: "success",
      title: "Auditoría Completada",
      description: "La auditoría de seguridad mensual ha sido completada. Sin problemas encontrados.",
      icon: <CheckCircle className="h-5 w-5" />
    }
  ];

  return (
    <SectionPageLayout
      header={{
        title: "Panel de Administración",
        description: "Bienvenido al panel de control de administración",
      }}
      stats={{
        stats: [
          {
            label: "Usuarios Totales",
            value: isLoading ? "-" : safeStats.total_users.toLocaleString(),
            icon: <Users className="h-5 w-5" />,
            loading: isLoading,
            color: "primary"
          },
          {
            label: "Cursos Activos",
            value: isLoading ? "-" : safeStats.active_courses.toLocaleString(),
            icon: <BookOpen className="h-5 w-5" />,
            loading: isLoading,
            color: "success"
          },
          {
            label: "Matriculaciones",
            value: isLoading ? "-" : safeStats.total_enrollments.toLocaleString(),
            icon: <CreditCard className="h-5 w-5" />,
            loading: isLoading,
            color: "primary"
          },
          {
            label: "Nuevos Usuarios",
            value: isLoading ? "-" : `${safeStats.new_users_last_7_days} esta semana`,
            icon: <BarChart3 className="h-5 w-5" />,
            loading: isLoading,
            color: "warning"
          }
        ]
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accesos Rápidos */}
        <PageSection
          title="Accesos Rápidos"
          description="Enlaces directos a las secciones principales"
          variant="card"
        >
          <AdminMenu 
            items={adminQuickMenuItems}
            variant="buttons"
          />
        </PageSection>

        {/* Columna con Alertas del Sistema y Recursos de Administración */}
        <div className="space-y-6">
          {/* Alertas del Sistema */}
          <PageSection
            title="Alertas del Sistema"
            description="Notificaciones recientes que requieren atención"
            variant="card"
          >
            <div className="space-y-4">
              {systemAlerts.map(alert => (
                <Alert key={alert.id} variant={alert.type as "default" | "destructive" | "success" | null}>
                  <div className="flex items-start">
                    <div className="mr-2 mt-0.5">{alert.icon}</div>
                    <div>
                      <AlertTitle>{alert.title}</AlertTitle>
                      <AlertDescription>{alert.description}</AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          </PageSection>

          {/* Recursos de Administración */}
          <PageSection
            title="Recursos de Administración"
            description="Herramientas y guías para la gestión de la plataforma"
            variant="card"
          >
            <div className="space-y-4">
              <a href="/docs" className="block">
                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-accent transition-colors">
                  <Link2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Documentación técnica</p>
                    <p className="text-sm text-muted-foreground">Guías detalladas sobre la administración del sistema</p>
                  </div>
                </div>
              </a>
              <a href="/support" target="_blank" rel="noopener noreferrer" className="block">
                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-accent transition-colors">
                  <Link2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium flex items-center gap-1">
                      Centro de soporte
                      <ExternalLink className="h-3 w-3" />
                    </div>
                    <p className="text-sm text-muted-foreground">Contacta con el equipo de soporte técnico</p>
                  </div>
                </div>
              </a>
            </div>
          </PageSection>
        </div>
      </div>
    </SectionPageLayout>
  );
};

export default AdminDashboard;
