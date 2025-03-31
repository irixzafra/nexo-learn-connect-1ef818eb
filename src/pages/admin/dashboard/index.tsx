
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
  History,
  Palette,
  Bell,
  Globe,
  Headphones,
  HelpCircle,
  Mail,
  MessageSquare
} from 'lucide-react';
import AdminMenu from '@/components/ui/admin-menu/AdminMenu';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAdminDashboardStats } from '@/features/admin/hooks/useAdminDashboardStats';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { stats, isLoading } = useAdminDashboardStats();
  const navigate = useNavigate();

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
      href: "/admin/dashboard",
      color: "bg-blue-100 text-blue-700"
    },
    {
      label: "Usuarios",
      icon: Users,
      description: "Administrar usuarios y roles",
      href: "/admin/users",
      color: "bg-indigo-100 text-indigo-700"
    },
    {
      label: "Cursos",
      icon: BookOpen,
      description: "Administrar catálogo de cursos",
      href: "/admin/courses",
      color: "bg-green-100 text-green-700"
    },
    {
      label: "Instructores",
      icon: School,
      description: "Administrar instructores",
      href: "/admin/instructors",
      color: "bg-amber-100 text-amber-700"
    },
    {
      label: "Sistema de Diseño",
      icon: Palette,
      description: "Personalizar apariencia",
      href: "/admin/design",
      color: "bg-purple-100 text-purple-700"
    },
    {
      label: "Roles y Permisos",
      icon: KeyRound,
      description: "Configurar roles de usuarios",
      href: "/admin/roles",
      color: "bg-rose-100 text-rose-700"
    },
    {
      label: "Facturación",
      icon: CreditCard,
      description: "Gestión de pagos e ingresos",
      href: "/admin/billing",
      color: "bg-emerald-100 text-emerald-700"
    },
    {
      label: "Notificaciones",
      icon: Bell,
      description: "Gestionar notificaciones",
      href: "/admin/notifications",
      color: "bg-orange-100 text-orange-700"
    },
    {
      label: "Soporte",
      icon: Headphones,
      description: "Atención al cliente",
      href: "/admin/support",
      color: "bg-teal-100 text-teal-700"
    },
    {
      label: "Datos de Prueba",
      icon: Database,
      description: "Herramientas para desarrollo",
      href: "/admin/test-data",
      color: "bg-cyan-100 text-cyan-700"
    },
    {
      label: "Configuración",
      icon: Settings,
      description: "Opciones del sistema",
      href: "/admin/settings",
      color: "bg-gray-100 text-gray-700"
    },
    {
      label: "Seguridad",
      icon: Shield,
      description: "Políticas de seguridad",
      href: "/admin/access",
      color: "bg-red-100 text-red-700"
    },
    {
      label: "Auditoría",
      icon: History,
      description: "Registros de actividad",
      href: "/admin/audit-log",
      color: "bg-sky-100 text-sky-700"
    },
    {
      label: "Contenido",
      icon: FileText,
      description: "Gestión de páginas",
      href: "/admin/settings/pages",
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      label: "Idiomas",
      icon: Globe,
      description: "Traducción y localización",
      href: "/admin/languages",
      color: "bg-blue-100 text-blue-700"
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

  // Categorías de acceso rápido
  const quickAccessCategories = [
    {
      title: "Gestión de Usuarios",
      items: adminQuickMenuItems.filter(item => 
        ['Usuarios', 'Instructores', 'Roles y Permisos'].includes(item.label)
      )
    },
    {
      title: "Contenidos",
      items: adminQuickMenuItems.filter(item => 
        ['Cursos', 'Contenido'].includes(item.label)
      )
    },
    {
      title: "Configuración",
      items: adminQuickMenuItems.filter(item => 
        ['Configuración', 'Sistema de Diseño', 'Idiomas'].includes(item.label)
      )
    },
    {
      title: "Seguridad y Datos",
      items: adminQuickMenuItems.filter(item => 
        ['Seguridad', 'Auditoría', 'Datos de Prueba'].includes(item.label)
      )
    }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      user: "Administrador",
      action: "Actualizó la configuración del sistema",
      time: "Hace 2 horas"
    },
    {
      id: 2,
      user: "Sistema",
      action: "Completó la copia de seguridad diaria",
      time: "Hace 5 horas"
    },
    {
      id: 3,
      user: "Administrador",
      action: "Creó un nuevo curso",
      time: "Hace 1 día"
    }
  ];

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
            value: isLoading ? "-" : safeStats.total_users.toLocaleString(),
            icon: <Users className="h-5 w-5" />,
            loading: isLoading,
            color: "primary"
          },
          {
            label: "Cursos",
            value: isLoading ? "-" : safeStats.active_courses.toLocaleString(),
            icon: <BookOpen className="h-5 w-5" />,
            loading: isLoading,
            color: "success"
          },
          {
            label: "Matrículas",
            value: isLoading ? "-" : safeStats.total_enrollments.toLocaleString(),
            icon: <CreditCard className="h-5 w-5" />,
            loading: isLoading,
            color: "primary"
          },
          {
            label: "Nuevos",
            value: isLoading ? "-" : `+${safeStats.new_users_last_7_days} esta semana`,
            icon: <BarChart3 className="h-5 w-5" />,
            loading: isLoading,
            color: "warning"
          }
        ]
      }}
    >
      {/* Mobile Quick Actions (visible only on small screens) */}
      <div className="block md:hidden mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Gestiona los aspectos principales de tu plataforma</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-3 gap-px bg-muted">
              {adminQuickMenuItems.slice(0, 6).map((item, index) => (
                <Button 
                  key={index}
                  variant="ghost" 
                  className="flex flex-col items-center justify-center h-24 bg-card rounded-none"
                  onClick={() => navigate(item.href)}
                >
                  <div className={`p-2 rounded-full mb-1 ${item.color}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-center">{item.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-primary"
              onClick={() => document.getElementById('allMenuItems')?.scrollIntoView({behavior: 'smooth'})}
            >
              Ver todas las opciones
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mostrar indicadores de rendimiento */}
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
                  {isLoading ? "..." : `${safeStats.publishedCoursesCount}/${safeStats.coursesCount} (${Math.round((safeStats.publishedCoursesCount/safeStats.coursesCount || 0) * 100)}%)`}
                </span>
              </div>
              <Progress 
                value={isLoading ? 0 : Math.round((safeStats.publishedCoursesCount/safeStats.coursesCount || 0) * 100)} 
                className="h-2" 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tasa de finalización de cursos</span>
                <span className="text-muted-foreground">{safeStats.completionRate}%</span>
              </div>
              <Progress value={safeStats.completionRate} className="h-2" />
            </div>
          </div>
        </PageSection>
        
        {/* Alertas del Sistema */}
        <PageSection
          title="Alertas del Sistema"
          description="Notificaciones que requieren atención"
          variant="card"
          className="order-3 md:order-2"
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
        
        {/* Actividad Reciente */}
        <PageSection
          title="Actividad Reciente"
          description="Últimas acciones realizadas en el sistema"
          variant="card"
          className="order-4 md:order-3"
        >
          <div className="space-y-4">
            {recentActivities.map(activity => (
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
        
        {/* Enlaces Rápidos y Comunicación */}
        <PageSection
          title="Recursos y Soporte"
          description="Ayuda y herramientas para la administración"
          variant="card"
          className="order-5 md:order-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card className="bg-muted/40">
              <CardContent className="p-4 flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Centro de Ayuda</h4>
                  <p className="text-xs text-muted-foreground mt-1">Accede a guías y tutoriales</p>
                  <Button size="sm" variant="link" className="px-0 py-0 h-auto mt-2">
                    Ver documentación
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/40">
              <CardContent className="p-4 flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Contacto Técnico</h4>
                  <p className="text-xs text-muted-foreground mt-1">Asistencia técnica especializada</p>
                  <Button size="sm" variant="link" className="px-0 py-0 h-auto mt-2">
                    Abrir ticket
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/40">
              <CardContent className="p-4 flex items-start gap-3">
                <FileText className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Guías de Administración</h4>
                  <p className="text-xs text-muted-foreground mt-1">Manuales para administradores</p>
                  <Button size="sm" variant="link" className="px-0 py-0 h-auto mt-2">
                    Ver guías
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/40">
              <CardContent className="p-4 flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Foro de Administradores</h4>
                  <p className="text-xs text-muted-foreground mt-1">Comunidad de administradores</p>
                  <Button size="sm" variant="link" className="px-0 py-0 h-auto mt-2">
                    Unirse al foro
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </PageSection>
      </div>

      {/* Accesos Rápidos (Full Menu) */}
      <div id="allMenuItems" className="mt-8">
        <PageSection
          title="Acceso a Módulos"
          description="Accede a todos los módulos de administración"
          variant="card"
          className="order-2 md:order-5"
        >
          <div className="grid gap-6">
            {quickAccessCategories.map((category, idx) => (
              <div key={idx}>
                <h3 className="text-sm font-medium mb-3 text-muted-foreground">{category.title}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {category.items.map((item, itemIdx) => (
                    <Button
                      key={itemIdx}
                      variant="outline"
                      className="h-auto py-4 flex flex-col items-center justify-center gap-2 border rounded-lg hover:bg-accent"
                      onClick={() => navigate(item.href)}
                    >
                      <div className={`p-2 rounded-full ${item.color}`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PageSection>
      </div>
    </SectionPageLayout>
  );
};

export default AdminDashboard;
