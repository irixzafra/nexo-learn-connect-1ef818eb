
import React from 'react';
import SectionPageLayout, { PageSection } from '@/layouts/SectionPageLayout';
import { Card } from '@/components/ui/card';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  CreditCard, 
  AlertCircle, 
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
        // Removed action buttons as requested
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
      help={{
        title: "Recursos de Administración",
        description: "Herramientas y guías para la gestión de la plataforma",
        links: [
          {
            title: "Documentación técnica",
            description: "Guías detalladas sobre la administración del sistema",
            href: "/docs",
          },
          {
            title: "Centro de soporte",
            description: "Contacta con el equipo de soporte técnico",
            href: "/support",
            external: true
          }
        ]
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accesos rápidos - Páginas "hijo" */}
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
      </div>
    </SectionPageLayout>
  );
};

export default AdminDashboard;
