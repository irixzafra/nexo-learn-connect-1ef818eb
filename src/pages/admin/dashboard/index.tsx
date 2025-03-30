
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Accesos rápidos */}
        <PageSection
          title="Accesos Rápidos"
          variant="card"
          className="md:col-span-1"
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
          className="md:col-span-2"
        >
          <AdminMenu 
            items={adminAlertMenuItems}
            variant="default"
          />
        </PageSection>
      </div>
      
      {/* Gráfico de actividad reciente */}
      <PageSection
        title="Actividad Reciente"
        description="Estadísticas de uso de la plataforma"
        variant="card"
        className="mt-6"
      >
        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>El gráfico de actividad se cargará aquí</p>
            <p className="text-sm">Mostrando inscripciones, finalización de cursos y usuarios activos</p>
          </div>
        </div>
      </PageSection>
      
      {/* Últimos usuarios registrados */}
      <PageSection
        title="Últimos Usuarios Registrados"
        description="Usuarios recién incorporados a la plataforma"
        variant="card"
        className="mt-6"
      >
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserPlus className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Usuario Ejemplo {index + 1}</p>
                  <p className="text-sm text-muted-foreground">Registrado hace {(index + 1) * 2} horas</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AdminMenu 
                  items={[{
                    icon: Users,
                    label: "Ver perfil",
                    href: `/admin/users/profile-${index + 1}`
                  }]}
                  variant="sidebar"
                  className="!space-y-0"
                />
              </div>
            </div>
          ))}
        </div>
      </PageSection>
    </SectionPageLayout>
  );
};

export default AdminDashboard;
