
import { DesignComponent } from '@/pages/design-system/DesignSystemPage';

export const getComponentsData = (): DesignComponent[] => [
  { 
    id: 'accordion',
    name: 'Accordion', 
    category: 'Disclosure',
    status: 'stable',
    path: '/design-system/components/accordion',
    description: 'Un componente que muestra contenido expandible en secciones.',
    usage: 'Para organizar y ocultar contenido extenso en secciones colapsables.'
  },
  { 
    id: 'alert',
    name: 'Alert', 
    category: 'Feedback',
    status: 'stable',
    path: '/design-system/components/alert',
    description: 'Muestra una notificación importante para el usuario.',
    usage: 'Para mostrar mensajes de advertencia, éxito, error o información contextual.'
  },
  { 
    id: 'alert-dialog',
    name: 'Alert Dialog', 
    category: 'Overlay',
    status: 'stable',
    path: '/design-system/components/alert-dialog',
    description: 'Un diálogo modal que interrumpe al usuario con contenido importante.',
    usage: 'Para confirmar acciones destructivas o irreversibles.'
  },
  { 
    id: 'aspect-ratio',
    name: 'Aspect Ratio', 
    category: 'Layout',
    status: 'stable',
    path: '/design-system/components/aspect-ratio',
    description: 'Mantiene una relación de aspecto consistente para el contenido.',
    usage: 'Para imágenes, videos y otros elementos multimedia que requieren proporciones específicas.'
  },
  { 
    id: 'avatar',
    name: 'Avatar', 
    category: 'Data Display',
    status: 'stable',
    path: '/design-system/components/avatar',
    description: 'Muestra una imagen representativa del usuario con fallback.',
    usage: 'Para representar usuarios en comentarios, chats, cabeceras de perfil, etc.'
  },
  { 
    id: 'badge',
    name: 'Badge', 
    category: 'Data Display',
    status: 'stable',
    path: '/design-system/components/badge',
    description: 'Muestra un pequeño indicador numérico o de estado.',
    usage: 'Para notificaciones, contadores, etiquetas o estados.'
  },
  { 
    id: 'button',
    name: 'Button', 
    category: 'Forms',
    status: 'stable',
    path: '/design-system/components/button',
    description: 'Permite a los usuarios realizar acciones con un clic o toque.',
    usage: 'Para formularios, diálogos, y cualquier acción que requiera interacción del usuario.'
  },
  { 
    id: 'card',
    name: 'Card', 
    category: 'Layout',
    status: 'stable',
    path: '/design-system/components/card',
    description: 'Contenedor para mostrar contenido en un formato visual agrupado.',
    usage: 'Para agrupar información relacionada, productos, artículos, o cualquier contenido modular.'
  },
  { 
    id: 'dialog',
    name: 'Dialog', 
    category: 'Overlay',
    status: 'stable',
    path: '/design-system/components/dialog',
    description: 'Ventana modal que aparece sobre el contenido de la aplicación.',
    usage: 'Para formularios cortos, confirmaciones, o mostrar información adicional sin cambiar de página.'
  },
  { 
    id: 'dropdown-menu',
    name: 'Dropdown Menu', 
    category: 'Navigation',
    status: 'stable',
    path: '/design-system/components/dropdown-menu',
    description: 'Muestra un menú desplegable al usuario.',
    usage: 'Para mostrar opciones adicionales o acciones relacionadas con un elemento.'
  },
  { 
    id: 'input',
    name: 'Input', 
    category: 'Forms',
    status: 'stable',
    path: '/design-system/components/input',
    description: 'Permite a los usuarios introducir texto en la interfaz.',
    usage: 'Para formularios, búsquedas y cualquier captura de datos textuales.'
  },
  { 
    id: 'select',
    name: 'Select', 
    category: 'Forms',
    status: 'stable',
    path: '/design-system/components/select',
    description: 'Muestra una lista de opciones para que el usuario seleccione.',
    usage: 'Para elegir entre múltiples opciones predefinidas en formularios.'
  },
  { 
    id: 'tabs',
    name: 'Tabs', 
    category: 'Navigation',
    status: 'stable',
    path: '/design-system/components/tabs',
    description: 'Organiza el contenido en múltiples secciones para ver una a la vez.',
    usage: 'Para alternar entre vistas diferentes que ocupan el mismo espacio en la interfaz.'
  },
  { 
    id: 'toast',
    name: 'Toast', 
    category: 'Feedback',
    status: 'stable',
    path: '/design-system/components/toast',
    description: 'Mensaje conciso que se muestra temporalmente.',
    usage: 'Para notificaciones, confirmaciones de acciones o mensajes de estado no intrusivos.'
  },
  { 
    id: 'tooltip',
    name: 'Tooltip', 
    category: 'Overlay',
    status: 'stable',
    path: '/design-system/components/tooltip',
    description: 'Muestra información adicional al pasar el cursor sobre un elemento.',
    usage: 'Para proporcionar contexto adicional o ayuda sobre elementos de la interfaz.'
  },
];
