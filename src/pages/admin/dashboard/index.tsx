
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
  School
} from 'lucide-react';
import AdminMenu from '@/components/ui/admin-menu/AdminMenu';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAdminDashboardStats } from '@/features/admin/hooks/useAdminDashboardStats';

const AdminDashboard: React.FC = () => {
  const { stats, isLoading } = useAdminDashboardStats();

  // Create a simplified array of admin menu items for direct access to main sections
  const adminQuickMenuItems = [
    {
      title: "Gestionar Usuarios",
      icon: <Users className="h-5 w-5 text-blue-500" />,
      description: "Administrar usuarios y roles",
      href: "/admin/users"
    },
    {
      title: "Gestionar Cursos",
      icon: <BookOpen className="h-5 w-5 text-green-500" />,
      description: "Administrar catálogo de cursos",
      href: "/admin/courses"
    },
    {
      title: "Gestionar Instructores",
      icon: <School className="h-5 w-5 text-orange-500" />,
      description: "Administrar instructores",
      href: "/admin/instructors"
    },
    {
      title: "Roles y Permisos",
      icon: <Users className="h-5 w-5 text-purple-500" />,
      description: "Configurar roles de usuarios",
      href: "/admin/roles"
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
            value: isLoading ? "-" : stats.usersCount.toLocaleString(),
            icon: <Users className="h-5 w-5" />,
            loading: isLoading,
            color: "primary"
          },
          {
            label: "Cursos Activos",
            value: isLoading ? "-" : stats.publishedCoursesCount.toLocaleString(),
            icon: <BookOpen className="h-5 w-5" />,
            loading: isLoading,
            color: "success"
          },
          {
            label: "Matriculaciones",
            value: isLoading ? "-" : stats.enrollmentsCount.toLocaleString(),
            icon: <CreditCard className="h-5 w-5" />,
            loading: isLoading,
            color: "primary"
          },
          {
            label: "Tasa de Publicación",
            value: isLoading ? "-" : `${stats.completionRate}%`,
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
