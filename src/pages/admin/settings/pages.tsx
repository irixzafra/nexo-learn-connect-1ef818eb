import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Folder, Eye, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdvancedDataTable } from '@/components/shared/AdvancedDataTable';
import { createColumn, createActionsColumn } from '@/components/shared/DataTableUtils';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import PageEditorDrawer from '@/components/admin/pages/PageEditorDrawer';

interface PageData {
  title: string;
  path: string;
  description: string;
  status: string;
  category: string;
  importance?: 'high' | 'medium' | 'low';
  updated?: string;
  component?: string;
}

const PagesManagement: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const pages: PageData[] = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      description: 'Página principal con resumen de actividad',
      status: 'active',
      category: 'General',
      importance: 'high',
      updated: '2023-05-10',
      component: 'Dashboard'
    },
    {
      title: 'Cursos',
      path: '/courses',
      description: 'Listado de cursos disponibles',
      status: 'active',
      category: 'Learning',
      importance: 'high',
      updated: '2023-06-15',
      component: 'CoursesCatalog'
    },
    {
      title: 'Mi Curso',
      path: '/my-courses',
      description: 'Cursos en los que el usuario está inscrito',
      status: 'active',
      category: 'Learning',
      importance: 'high',
      updated: '2023-06-22',
      component: 'MyCourses'
    },
    {
      title: 'Comunidad',
      path: '/community',
      description: 'Foros y grupos de discusión',
      status: 'active',
      category: 'Community',
      updated: '2023-04-30',
      component: 'Community'
    },
    {
      title: 'Mensajes',
      path: '/messages',
      description: 'Sistema de mensajería interna',
      status: 'active',
      category: 'Community',
      updated: '2023-05-28',
      component: 'Messages'
    },
    {
      title: 'Administración',
      path: '/admin',
      description: 'Panel de administración del sistema',
      status: 'active',
      category: 'Admin',
      importance: 'high',
      updated: '2023-06-01',
      component: 'AdminDashboard'
    },
    {
      title: 'Configuración',
      path: '/settings',
      description: 'Configuración general de la plataforma',
      status: 'development',
      category: 'Admin',
      updated: '2023-05-05',
      component: 'Settings'
    },
    {
      title: 'Éxito de Pago',
      path: '/payment/success',
      description: 'Página de confirmación de pago exitoso',
      status: 'active',
      category: 'Payments',
      updated: '2023-07-15',
      component: 'PaymentSuccess'
    },
    {
      title: 'Cancelación de Pago',
      path: '/payment/cancel',
      description: 'Página mostrada cuando se cancela un pago',
      status: 'active',
      category: 'Payments',
      updated: '2023-07-15',
      component: 'PaymentCancel'
    },
    {
      title: 'Listado de Facturas',
      path: '/admin/billing/invoices',
      description: 'Administración de facturas del sistema',
      status: 'active',
      category: 'Finance',
      updated: '2023-08-20',
      component: 'InvoiceList'
    },
    {
      title: 'Gestión de Suscripciones',
      path: '/admin/billing/subscriptions',
      description: 'Administración de suscripciones de usuarios',
      status: 'active',
      category: 'Finance',
      updated: '2023-08-22',
      component: 'ManageSubscription'
    },
    {
      title: 'Transacciones Bancarias',
      path: '/admin/billing/bank',
      description: 'Registro de transacciones bancarias',
      status: 'active',
      category: 'Finance',
      updated: '2023-09-01',
      component: 'BankTransactions'
    },
    {
      title: 'Alertas de Facturación',
      path: '/admin/billing/alerts',
      description: 'Sistema de alertas para facturación',
      status: 'active',
      category: 'Finance',
      updated: '2023-09-05',
      component: 'BillingAlerts'
    },
    {
      title: 'Configuración General',
      path: '/',
      description: 'Configuración principal del sistema',
      status: 'active',
      category: 'Settings',
      updated: '2023-07-10',
      component: 'GeneralSettings'
    },
    {
      title: 'Funcionalidades',
      path: '/features',
      description: 'Gestión de características del sistema',
      status: 'active',
      category: 'Settings',
      updated: '2023-07-12',
      component: 'FeatureSettings'
    },
    {
      title: 'Diseño',
      path: '/design',
      description: 'Configuración de la apariencia del sistema',
      status: 'active',
      category: 'Settings',
      updated: '2023-07-15',
      component: 'DesignSettings'
    },
    {
      title: 'Integraciones',
      path: '/integrations',
      description: 'Gestión de integraciones con servicios externos',
      status: 'active',
      category: 'Settings',
      updated: '2023-07-20',
      component: 'IntegrationsSettings'
    },
    {
      title: 'Datos',
      path: '/data',
      description: 'Configuración de datos y base de datos',
      status: 'active',
      category: 'Settings',
      updated: '2023-08-01',
      component: 'DataSettings'
    },
    {
      title: 'Gestión de Páginas',
      path: '/pages',
      description: 'Administración de páginas del sistema',
      status: 'active',
      category: 'Content',
      updated: '2023-08-10',
      component: 'PagesManagement'
    },
    {
      title: 'Analíticas',
      path: '/admin/analytics',
      description: 'Estadísticas y análisis del sistema',
      status: 'active',
      category: 'Analytics',
      updated: '2023-08-15',
      component: 'AnalyticsOverview'
    },
    {
      title: 'Roles y Permisos',
      path: '/admin/roles',
      description: 'Administración de roles y permisos',
      status: 'active',
      category: 'Admin',
      updated: '2023-08-20',
      component: 'RolesSettings'
    },
    {
      title: 'Usuarios',
      path: '/admin/users',
      description: 'Gestión de usuarios del sistema',
      status: 'active',
      category: 'Admin',
      updated: '2023-05-15',
      component: 'UserManagement'
    },
    {
      title: 'Actividad',
      path: '/admin/activity',
      description: 'Registro de actividad de usuarios',
      status: 'active',
      category: 'Analytics',
      updated: '2023-07-05',
      component: 'ActivityLog'
    },
    {
      title: 'Certificados',
      path: '/admin/certificates',
      description: 'Gestión de certificados de cursos',
      status: 'not-implemented',
      category: 'Learning',
      updated: '2023-08-01',
      component: 'CertificateManagement'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Activo</Badge>;
      case 'development':
        return <Badge variant="secondary" className="bg-amber-500 text-black hover:bg-amber-600">En Desarrollo</Badge>;
      case 'not-implemented':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">No Implementado</Badge>;
      case 'duplicate':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-200">Duplicado</Badge>;
      case 'deprecated':
        return <Badge variant="destructive">Deprecado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleRowClick = (page: PageData) => {
    setSelectedPage(page);
    setDrawerOpen(true);
  };

  const columns = [
    createColumn<PageData>({
      accessorKey: 'title',
      header: 'Título',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{row.getValue('title')}</span>
        </div>
      )
    }),
    createColumn<PageData>({
      accessorKey: 'path',
      header: 'Ruta',
      cell: ({ getValue }) => (
        <code className="text-xs bg-muted px-1 py-0.5 rounded">
          {getValue() as string}
        </code>
      )
    }),
    createColumn<PageData>({
      accessorKey: 'category',
      header: 'Categoría',
    }),
    createColumn<PageData>({
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ getValue }) => getStatusBadge(getValue() as string)
    }),
    createColumn<PageData>({
      accessorKey: 'component',
      header: 'Componente',
      cell: ({ getValue }) => (
        <span className="text-xs font-mono text-muted-foreground">
          {getValue() as string}
        </span>
      )
    }),
    createColumn<PageData>({
      accessorKey: 'updated',
      header: 'Actualización',
    }),
    createActionsColumn<PageData>(({ row }) => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={(e) => {
          e.stopPropagation();
          handleRowClick(row.original);
        }}>
          <Edit className="h-4 w-4 mr-1" />
          Editar
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link to={row.getValue('path') as string} target="_blank" onClick={(e) => e.stopPropagation()}>
            <Eye className="h-4 w-4 mr-1" />
            Ver
          </Link>
        </Button>
      </div>
    ))
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">Gestión de Páginas</CardTitle>
              <CardDescription>
                Administra las páginas y la navegación del sistema
              </CardDescription>
            </div>
            <Button asChild>
              <Link to="/admin/settings/pages/create">
                <Plus className="mr-2 h-4 w-4" />
                Nueva Página
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <AdvancedDataTable 
            columns={columns} 
            data={pages}
            searchPlaceholder="Buscar página..."
            exportFilename="paginas-sistema"
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>

      {selectedPage && (
        <PageEditorDrawer
          page={selectedPage}
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
        />
      )}
    </div>
  );
};

export default PagesManagement;
