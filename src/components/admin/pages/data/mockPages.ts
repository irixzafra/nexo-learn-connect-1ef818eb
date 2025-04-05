
import { PageData } from '@/components/admin/pages/types';

export const mockPagesData: PageData[] = [
  {
    id: '1',
    title: 'Página de Inicio',
    path: '/',
    description: 'Página principal del sitio',
    status: 'published',
    category: 'system',
    importance: 'high',
    updated: '2023-09-01',
    component: 'HomePage',
    accessType: 'public',
    content: {
      blocks: []
    },
    permissions: {
      canView: ['all'],
      canEdit: ['admin'],
      canDelete: ['admin'],
      canPublish: ['admin']
    }
  },
  {
    id: '2',
    title: 'Acerca de Nosotros',
    path: 'about',
    description: 'Información sobre nuestra organización',
    status: 'published',
    category: 'marketing',
    importance: 'medium',
    updated: '2023-08-15',
    component: 'AboutPage',
    accessType: 'public',
    content: {
      blocks: []
    },
    permissions: {
      canView: ['all'],
      canEdit: ['admin'],
      canDelete: ['admin'],
      canPublish: ['admin']
    }
  },
  {
    id: '3',
    title: 'Términos y Condiciones',
    path: 'terms',
    description: 'Términos legales del servicio',
    status: 'published',
    category: 'legal',
    importance: 'medium',
    updated: '2023-07-20',
    component: 'TermsPage',
    accessType: 'public',
    content: {
      blocks: []
    },
    permissions: {
      canView: ['all'],
      canEdit: ['admin'],
      canDelete: ['admin'],
      canPublish: ['admin']
    }
  }
];
