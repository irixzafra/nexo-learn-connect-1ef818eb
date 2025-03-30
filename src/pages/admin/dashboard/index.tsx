
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
  ExternalLink
} from 'lucide-react';
import AdminMenu from '@/components/ui/admin-menu/AdminMenu';
import { 
  adminMainMenuItems,
  adminAlertMenuItems 
} from '@/components/ui/admin-menu/AdminMenuPresets';
import { useAdminDashboardStats } from '@/features/admin/hooks/useAdminDashboardStats';

const AdminDashboard: React.FC = () => {
  const { stats, isLoading } = useAdminDashboardStats();

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna de Accesos Rápidos */}
        <PageSection
          title="Accesos Rápidos"
          description="Enlaces directos a las secciones principales"
          variant="card"
        >
          <AdminMenu 
            items={adminMainMenuItems}
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
            <AdminMenu 
              items={adminAlertMenuItems}
              variant="default"
            />
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
