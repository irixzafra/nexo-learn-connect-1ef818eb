
import React from 'react';
import SectionPageLayout, { PageSection } from '@/layouts/SectionPageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  CreditCard, 
  ChevronRight, 
  Settings, 
  DatabaseIcon, 
  AlertCircle, 
  ShieldCheck,
  TrendingUp,
  UserPlus
} from 'lucide-react';

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
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/admin/users">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Gestión de Usuarios</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/admin/courses">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>Gestión de Cursos</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/admin/settings">
                <div className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Configuración del Sistema</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/admin/billing">
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span>Facturación</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/admin/test-data">
                <div className="flex items-center">
                  <DatabaseIcon className="h-4 w-4 mr-2" />
                  <span>Datos de Prueba</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </PageSection>

        {/* Alertas del sistema */}
        <PageSection
          title="Alertas del Sistema"
          description="Notificaciones recientes que requieren atención"
          variant="card"
          className="md:col-span-2"
        >
          <div className="space-y-4">
            <div className="bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 p-4 rounded-md flex gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-medium">Actualización de Seguridad Pendiente</p>
                <p className="text-sm mt-1">Se recomienda actualizar los módulos de seguridad a la última versión.</p>
              </div>
            </div>
            <div className="bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 p-4 rounded-md flex gap-2">
              <ShieldCheck className="h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-medium">Auditoría Completada</p>
                <p className="text-sm mt-1">La auditoría de seguridad mensual ha sido completada. Sin problemas encontrados.</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm">
              Ver todas las alertas
            </Button>
          </div>
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
                <Button size="sm" variant="outline">Ver perfil</Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" asChild>
            <Link to="/admin/users">
              Ver todos los usuarios
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </PageSection>
    </SectionPageLayout>
  );
};

export default AdminDashboard;
