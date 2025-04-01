
import React from 'react';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  CreditCard, 
  Clock,
  Shield,
  Settings,
  HelpCircle,
  Mail,
  FileText,
  MessageSquare,
  Bell,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from 'react-router-dom';
import { useAdminDashboardStats } from '@/features/admin/hooks/useAdminDashboardStats';
import AdminPageLayout from '@/layouts/AdminPageLayout';

const AdminDashboard: React.FC = () => {
  const { stats, isLoading } = useAdminDashboardStats();
  const navigate = useNavigate();

  // Actividad reciente con datos realistas
  const recentActivity = [
    { 
      id: 1, 
      action: "Actualizó la configuración del sistema", 
      user: "Administrador", 
      time: "Hace 2 horas" 
    },
    { 
      id: 2, 
      action: "Completó la copia de seguridad diaria", 
      user: "Sistema", 
      time: "Hace 5 horas" 
    },
    { 
      id: 3, 
      action: "Creó un nuevo curso", 
      user: "Administrador", 
      time: "Hace 1 día" 
    }
  ];

  // Alertas del sistema
  const systemAlerts = [
    {
      id: 1,
      type: "default",
      title: "Actualización de Seguridad Pendiente",
      description: "Se recomienda actualizar los módulos de seguridad a la última versión.",
      icon: <Shield className="h-4 w-4" />,
      time: "Hace 1 día"
    },
    {
      id: 2,
      type: "success",
      title: "Auditoría Completada",
      description: "La auditoría de seguridad mensual ha sido completada. Sin problemas encontrados.",
      icon: <CheckCircle className="h-4 w-4" />,
      time: "Hace 2 días"
    },
    {
      id: 3,
      type: "default",
      title: "Nuevos Usuarios Registrados",
      description: "12 nuevos usuarios se han registrado esta semana. Revisa sus perfiles.",
      icon: <Bell className="h-4 w-4" />,
      time: "Hace 3 días"
    }
  ];

  // Recursos de soporte
  const supportResources = [
    {
      id: 1,
      icon: HelpCircle,
      title: "Centro de Ayuda",
      description: "Accede a guías y tutoriales",
      action: "Ver documentación",
      href: "#",
      status: "active"
    },
    {
      id: 2,
      icon: Mail,
      title: "Contacto Técnico",
      description: "Asistencia técnica especializada",
      action: "Abrir ticket",
      href: "#",
      status: "active"
    },
    {
      id: 3,
      icon: FileText,
      title: "Guías de Administración",
      description: "Manuales para administradores",
      action: "Ver guías",
      href: "#",
      status: "development"
    },
    {
      id: 4,
      icon: MessageSquare,
      title: "Foro de Administradores",
      description: "Comunidad de administradores",
      action: "Unirse al foro",
      href: "#",
      status: "development"
    }
  ];

  return (
    <AdminPageLayout title="Panel de Administración" subtitle="Gestión centralizada de la plataforma">
      <div className="space-y-6">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Usuarios" 
            value={isLoading ? "-" : stats?.total_users?.toLocaleString() || "0"} 
            icon={<Users className="h-5 w-5 text-primary" />}
          />
          <StatCard 
            title="Cursos" 
            value={isLoading ? "-" : stats?.active_courses?.toLocaleString() || "0"} 
            icon={<BookOpen className="h-5 w-5 text-primary" />}
          />
          <StatCard 
            title="Matrículas" 
            value={isLoading ? "-" : stats?.total_enrollments?.toLocaleString() || "0"} 
            icon={<CreditCard className="h-5 w-5 text-primary" />}
          />
          <StatCard 
            title="Nuevos Usuarios" 
            value={isLoading ? "-" : `+${stats?.new_users_last_7_days || "0"} esta semana`} 
            icon={<BarChart3 className="h-5 w-5 text-primary" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Estado del Sistema */}
          <Card>
            <CardHeader>
              <CardTitle>Estado del Sistema</CardTitle>
              <CardDescription>Resumen de la actividad y rendimiento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                    {isLoading ? "..." : `${stats?.publishedCoursesCount || 0}/${stats?.coursesCount || 0} (${Math.round(((stats?.publishedCoursesCount || 0)/(stats?.coursesCount || 1) || 0) * 100)}%)`}
                  </span>
                </div>
                <Progress 
                  value={isLoading ? 0 : Math.round(((stats?.publishedCoursesCount || 0)/(stats?.coursesCount || 1) || 0) * 100)} 
                  className="h-2" 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tasa de finalización de cursos</span>
                  <span className="text-muted-foreground">{stats?.completionRate || 0}%</span>
                </div>
                <Progress value={stats?.completionRate || 0} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          {/* Alertas del Sistema */}
          <Card>
            <CardHeader>
              <CardTitle>Alertas del Sistema</CardTitle>
              <CardDescription>Notificaciones que requieren atención</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemAlerts.map(alert => (
                  <Alert key={alert.id} variant={alert.type as "default" | "destructive" | null}>
                    <div className="flex items-start">
                      <div className="mr-2 mt-0.5">{alert.icon}</div>
                      <div className="flex-1">
                        <AlertTitle className="text-sm font-medium">{alert.title}</AlertTitle>
                        <AlertDescription className="text-xs">{alert.description}</AlertDescription>
                      </div>
                      <div className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</div>
                    </div>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Actividad Reciente */}
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>Últimas acciones realizadas en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex justify-between items-start border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">Por: {activity.user}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Recursos y Soporte */}
          <Card>
            <CardHeader>
              <CardTitle>Recursos y Soporte</CardTitle>
              <CardDescription>Ayuda y herramientas para la administración</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {supportResources.map(resource => (
                  <Card key={resource.id} className="bg-muted/40 relative">
                    <CardContent className="p-3 flex items-start gap-2">
                      <resource.icon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{resource.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{resource.description}</p>
                        <Button size="sm" variant="link" className="px-0 py-0 h-auto mt-1 text-xs">
                          {resource.action}
                        </Button>
                      </div>
                      
                      {resource.status === "development" && (
                        <Badge variant="outline" className="absolute top-1 right-1 bg-blue-100 text-blue-800 text-[0.6rem] px-1 py-0 h-auto border-blue-200">
                          Desarrollo
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Acceso a Módulos */}
        <Card id="allMenuItems">
          <CardHeader>
            <CardTitle>Acceso a Módulos</CardTitle>
            <CardDescription>Accede rápidamente a todos los módulos de administración</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { title: "Usuarios", icon: Users, href: "/admin/users", color: "bg-indigo-100 text-indigo-700", description: "Gestionar usuarios", status: "active" },
                { title: "Cursos", icon: BookOpen, href: "/admin/courses", color: "bg-green-100 text-green-700", description: "Catálogo de cursos", status: "active" },
                { title: "Facturación", icon: CreditCard, href: "/admin/billing", color: "bg-amber-100 text-amber-700", description: "Pagos y facturas", status: "development" },
                { title: "Análisis", icon: BarChart3, href: "/admin/analytics", color: "bg-blue-100 text-blue-700", description: "Estadísticas", status: "active" },
                { title: "Configuración", icon: Settings, href: "/admin/settings", color: "bg-gray-100 text-gray-700", description: "Ajustes", status: "active" },
                { title: "Seguridad", icon: Shield, href: "/admin/roles", color: "bg-red-100 text-red-700", description: "Roles y permisos", status: "development" }
              ].map((item, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="h-auto py-3 px-3 flex flex-col items-center justify-center gap-1 border rounded-lg hover:bg-accent relative"
                  onClick={() => navigate(item.href)}
                >
                  <div className={`p-1.5 rounded-full ${item.color}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                  {item.status === "development" && (
                    <Badge variant="outline" className="absolute top-1 right-1 bg-blue-100 text-blue-800 text-[0.6rem] px-1 py-0 h-auto border-blue-200">
                      Desarrollo
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
