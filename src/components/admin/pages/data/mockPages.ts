
import { PageData } from '../types';

export const mockPagesData: PageData[] = [
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
