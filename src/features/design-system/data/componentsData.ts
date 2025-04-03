
import { DesignComponent } from '@/pages/design-system/DesignSystemPage';

// Sample components data to display in the Design System
export const getComponentsData = (): DesignComponent[] => [
  { 
    id: 'accordion',
    name: 'Accordion', 
    category: 'Disclosure',
    status: 'stable',
    path: '/admin/design-system/components/accordion',
    description: 'Un componente que muestra contenido expandible en secciones.',
    usage: 'Usado para mostrar contenido extenso en secciones colapsables'
  },
  { 
    id: 'alert',
    name: 'Alert', 
    category: 'Feedback',
    status: 'stable',
    path: '/admin/design-system/components/alert',
    description: 'Displays a callout for user attention.',
    usage: 'Notificaciones informativas y mensajes de estado'
  },
  { 
    id: 'button',
    name: 'Button', 
    category: 'Forms',
    status: 'stable',
    path: '/admin/design-system/components/button',
    description: 'Allows users to perform an action.',
    usage: 'Acciones primarias, secundarias y terciarias en formularios e interfaces'
  },
  { 
    id: 'card',
    name: 'Card', 
    category: 'Layout',
    status: 'stable',
    path: '/admin/design-system/components/card',
    description: 'Displays content in a card format.',
    usage: 'Contenedores de información relacionada con una estructura común'
  },
  { 
    id: 'dialog',
    name: 'Dialog', 
    category: 'Overlay',
    status: 'stable',
    path: '/admin/design-system/components/dialog',
    description: 'A modal dialog that appears in front of app content.',
    usage: 'Interacciones que requieren atención inmediata del usuario'
  },
  { 
    id: 'dropdown',
    name: 'Dropdown Menu', 
    category: 'Navigation',
    status: 'stable',
    path: '/admin/design-system/components/dropdown-menu',
    description: 'Displays a menu to the user.',
    usage: 'Menús contextuales y acciones secundarias'
  },
  { 
    id: 'sidebar',
    name: 'Sidebar', 
    category: 'Layout',
    status: 'stable',
    path: '/admin/design-system/components/sidebar',
    description: 'A collapsible side navigation component.',
    usage: 'Navegación principal en aplicaciones complejas'
  },
  { 
    id: 'toast',
    name: 'Toast', 
    category: 'Feedback',
    status: 'stable',
    path: '/admin/design-system/components/toast',
    description: 'A succinct message that is displayed temporarily.',
    usage: 'Notificaciones no intrusivas y mensajes de retroalimentación'
  }
];
