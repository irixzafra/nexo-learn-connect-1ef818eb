
import React from 'react';
import SectionPageLayout, { PageSection } from '@/layouts/SectionPageLayout';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  CreditCard, 
  AlertCircle, 
  CheckCircle,
  LineChart,
  Settings,
  Shield
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAdminDashboardStats } from '@/features/admin/hooks/useAdminDashboardStats';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { AdminDashboardQuickAccess } from '@/features/admin/components/dashboard/AdminDashboardQuickAccess';
import { AdminDashboardStats } from '@/features/admin/components/dashboard/AdminDashboardStats';
import { AdminDashboardAlerts } from '@/features/admin/components/dashboard/AdminDashboardAlerts';

const AdminDashboard: React.FC = () => {
  const { stats, isLoading } = useAdminDashboardStats();
  const navigate = useNavigate();

  return (
    <SectionPageLayout
      header={{
        title: "Panel de Administración",
        description: "Gestión centralizada de la plataforma",
      }}
      stats={{
        stats: [
          {
            label: "Usuarios",
            value: isLoading ? "-" : stats.total_users.toLocaleString(),
            icon: <Users className="h-5 w-5" />,
            loading: isLoading,
            color: "primary"
          },
          {
            label: "Cursos",
            value: isLoading ? "-" : stats.active_courses.toLocaleString(),
            icon: <BookOpen className="h-5 w-5" />,
            loading: isLoading,
            color: "success"
          },
          {
            label: "Matrículas",
            value: isLoading ? "-" : stats.total_enrollments.toLocaleString(),
            icon: <CreditCard className="h-5 w-5" />,
            loading: isLoading,
            color: "primary"
          },
          {
            label: "Nuevos",
            value: isLoading ? "-" : `+${stats.new_users_last_7_days} esta semana`,
            icon: <BarChart3 className="h-5 w-5" />,
            loading: isLoading,
            color: "warning"
          }
        ]
      }}
    >
      {/* Mobile Quick Access */}
      <div className="block md:hidden mb-6">
        <AdminDashboardQuickAccess />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* State of the System */}
        <PageSection
          title="Estado del Sistema"
          description="Resumen de la actividad y rendimiento"
          variant="card"
          className="order-1 md:order-1"
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Espacio de almacenamiento</span>
                <span className="text-muted-foreground">65% usado</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Carga del servidor</span>
                <span className="text-muted-foreground">28% utilizado</span>
              </div>
              <Progress value={28} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Publicación de cursos</span>
                <span className="text-muted-foreground">
                  {isLoading ? "..." : `${stats.publishedCoursesCount}/${stats.coursesCount} (${Math.round((stats.publishedCoursesCount/stats.coursesCount || 0) * 100)}%)`}
                </span>
              </div>
              <Progress 
                value={isLoading ? 0 : Math.round((stats.publishedCoursesCount/stats.coursesCount || 0) * 100)} 
                className="h-2" 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tasa de finalización de cursos</span>
                <span className="text-muted-foreground">{stats.completionRate}%</span>
              </div>
              <Progress value={stats.completionRate} className="h-2" />
            </div>
          </div>
        </PageSection>
        
        {/* System Alerts */}
        <PageSection
          title="Alertas del Sistema"
          description="Notificaciones que requieren atención"
          variant="card"
          className="order-3 md:order-2"
        >
          <AdminDashboardAlerts />
        </PageSection>
        
        {/* Recent Activity */}
        <PageSection
          title="Actividad Reciente"
          description="Últimas acciones realizadas en el sistema"
          variant="card"
          className="order-4 md:order-3"
        >
          <div className="space-y-4">
            {[
              { id: 1, user: "Administrador", action: "Actualizó la configuración del sistema", time: "Hace 2 horas" },
              { id: 2, user: "Sistema", action: "Completó la copia de seguridad diaria", time: "Hace 5 horas" },
              { id: 3, user: "Administrador", action: "Creó un nuevo curso", time: "Hace 1 día" }
            ].map(activity => (
              <div key={activity.id} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">Por: {activity.user}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </PageSection>
        
        {/* Resources and Support */}
        <AdminDashboardStats />
      </div>

      {/* Access to Modules */}
      <div id="allMenuItems" className="mt-8">
        <PageSection
          title="Acceso a Módulos"
          description="Accede rápidamente a todos los módulos de administración"
          variant="card"
          className="order-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { title: "Usuarios", icon: Users, href: "/admin/users", color: "bg-indigo-100 text-indigo-700", description: "Gestionar usuarios" },
              { title: "Cursos", icon: BookOpen, href: "/admin/courses", color: "bg-green-100 text-green-700", description: "Catálogo de cursos" },
              { title: "Facturación", icon: CreditCard, href: "/admin/billing", color: "bg-amber-100 text-amber-700", description: "Pagos y facturas" },
              { title: "Análisis", icon: LineChart, href: "/admin/analytics", color: "bg-blue-100 text-blue-700", description: "Estadísticas" },
              { title: "Configuración", icon: Settings, href: "/admin/settings", color: "bg-gray-100 text-gray-700", description: "Ajustes" },
              { title: "Seguridad", icon: Shield, href: "/admin/roles", color: "bg-red-100 text-red-700", description: "Roles y permisos" }
            ].map((item, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center gap-2 border rounded-lg hover:bg-accent"
                onClick={() => navigate(item.href)}
              >
                <div className={`p-2 rounded-full ${item.color}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">{item.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </PageSection>
      </div>
    </SectionPageLayout>
  );
};

export default AdminDashboard;
