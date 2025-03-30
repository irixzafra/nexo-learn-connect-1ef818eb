
import React from 'react';
import SectionPageLayout, { PageSection } from '@/layouts/SectionPageLayout';
import { Card } from '@/components/ui/card';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  CreditCard, 
  Settings, 
  AlertCircle, 
  ShieldCheck,
  UserPlus
} from 'lucide-react';
import AdminMenu from '@/components/ui/admin-menu/AdminMenu';
import { 
  adminMainMenuItems, 
  adminAlertMenuItems 
} from '@/components/ui/admin-menu/AdminMenuPresets';

const AdminDashboard: React.FC = () => {
  return (
    <SectionPageLayout
      header={{
        title: "Panel de Administración",
        description: "Bienvenido al panel de control de administración",
        actions: [
          {
            label: "Configuración del Sistema",
            icon: <Settings className="h-4 w-4" />,
            href: "/admin/settings",
            variant: "outline"
          },
          {
            label: "Gestionar Usuarios",
            icon: <Users className="h-4 w-4" />,
            href: "/admin/users"
          }
        ]
      }}
      stats={{
        stats: [
          {
            label: "Usuarios Totales",
            value: "1,234",
            icon: <Users className="h-5 w-5" />,
            color: "primary"
          },
          {
            label: "Cursos Activos",
            value: "42",
            icon: <BookOpen className="h-5 w-5" />,
            color: "success"
          },
          {
            label: "Ingresos del Mes",
            value: "€4,850",
            icon: <CreditCard className="h-5 w-5" />,
            color: "primary"
          },
          {
            label: "Tasa de Finalización",
            value: "68%",
            icon: <BarChart3 className="h-5 w-5" />,
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
          variant="card"
        >
          <AdminMenu 
            items={adminMainMenuItems}
            variant="buttons"
          />
        </PageSection>

        {/* Alertas del sistema */}
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
