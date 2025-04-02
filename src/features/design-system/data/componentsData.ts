
import { DesignComponent } from '@/pages/design-system/DesignSystemPage';

export function getComponentsData(): DesignComponent[] {
  return [
    {
      id: 'button',
      name: 'Button',
      description: 'Botón interactivo para acciones.',
      category: 'inputs',
      status: 'stable',
      usage: 'import { Button } from "@/components/ui/button"',
      path: '/design-system/components/button'
    },
    {
      id: 'card',
      name: 'Card',
      description: 'Contenedor con bordes y sombras para agrupar contenido relacionado.',
      category: 'layout',
      status: 'stable',
      usage: 'import { Card } from "@/components/ui/card"',
      path: '/design-system/components/card'
    },
    {
      id: 'input',
      name: 'Input',
      description: 'Campo de entrada de texto.',
      category: 'inputs',
      status: 'stable',
      usage: 'import { Input } from "@/components/ui/input"',
      path: '/design-system/components/input'
    },
    {
      id: 'checkbox',
      name: 'Checkbox',
      description: 'Control de selección múltiple.',
      category: 'inputs',
      status: 'stable',
      usage: 'import { Checkbox } from "@/components/ui/checkbox"',
      path: '/design-system/components/checkbox'
    },
    {
      id: 'radio-group',
      name: 'Radio Group',
      description: 'Grupo de opciones donde solo se puede seleccionar una.',
      category: 'inputs',
      status: 'stable',
      usage: 'import { RadioGroup } from "@/components/ui/radio-group"',
      path: '/design-system/components/radio-group'
    },
    {
      id: 'alert',
      name: 'Alert',
      description: 'Elemento que muestra un mensaje importante.',
      category: 'feedback',
      status: 'stable',
      usage: 'import { Alert } from "@/components/ui/alert"',
      path: '/design-system/components/alert'
    },
    {
      id: 'tabs',
      name: 'Tabs',
      description: 'Interfaz de pestañas para alternar entre diferentes vistas.',
      category: 'navigation',
      status: 'stable',
      usage: 'import { Tabs } from "@/components/ui/tabs"',
      path: '/design-system/components/tabs'
    },
    {
      id: 'accordion',
      name: 'Accordion',
      description: 'Componente expandible para mostrar/ocultar contenido.',
      category: 'display',
      status: 'stable',
      usage: 'import { Accordion } from "@/components/ui/accordion"',
      path: '/design-system/components/accordion'
    },
    {
      id: 'popover',
      name: 'Popover',
      description: 'Ventana flotante que se muestra al hacer clic en un elemento.',
      category: 'overlay',
      status: 'stable',
      usage: 'import { Popover } from "@/components/ui/popover"',
      path: '/design-system/components/popover'
    },
    {
      id: 'dialog',
      name: 'Dialog',
      description: 'Ventana modal para mostrar contenido crítico o requerir interacción.',
      category: 'overlay',
      status: 'stable',
      usage: 'import { Dialog } from "@/components/ui/dialog"',
      path: '/design-system/components/dialog'
    },
    {
      id: 'toast',
      name: 'Toast',
      description: 'Notificación temporal que aparece en la pantalla.',
      category: 'feedback',
      status: 'stable',
      usage: 'import { useToast } from "@/components/ui/toast"',
      path: '/design-system/components/toast'
    },
    {
      id: 'badge',
      name: 'Badge',
      description: 'Elemento pequeño que muestra un estado o categoría.',
      category: 'display',
      status: 'stable',
      usage: 'import { Badge } from "@/components/ui/badge"',
      path: '/design-system/components/badge'
    },
    {
      id: 'avatar',
      name: 'Avatar',
      description: 'Representación visual de un usuario o entidad.',
      category: 'display',
      status: 'stable',
      usage: 'import { Avatar } from "@/components/ui/avatar"',
      path: '/design-system/components/avatar'
    },
    {
      id: 'select',
      name: 'Select',
      description: 'Menú desplegable para seleccionar una opción.',
      category: 'inputs',
      status: 'stable',
      usage: 'import { Select } from "@/components/ui/select"',
      path: '/design-system/components/select'
    },
    {
      id: 'switch',
      name: 'Switch',
      description: 'Control de alternancia que permite cambiar entre dos estados.',
      category: 'inputs',
      status: 'stable',
      usage: 'import { Switch } from "@/components/ui/switch"',
      path: '/design-system/components/switch'
    },
    {
      id: 'table',
      name: 'Table',
      description: 'Componente para mostrar datos en filas y columnas.',
      category: 'data',
      status: 'stable',
      usage: 'import { Table } from "@/components/ui/table"',
      path: '/design-system/components/table'
    },
    {
      id: 'navigation-menu',
      name: 'Navigation Menu',
      description: 'Menú de navegación con soporte para submenús y enlaces.',
      category: 'navigation',
      status: 'stable',
      usage: 'import { NavigationMenu } from "@/components/ui/navigation-menu"',
      path: '/design-system/components/navigation-menu'
    },
    {
      id: 'sidebar',
      name: 'Sidebar',
      description: 'Barra lateral para navegación principal con soporte para grupos y niveles.',
      category: 'navigation',
      status: 'stable',
      usage: 'import { Sidebar } from "@/components/ui/sidebar"',
      path: '/design-system/components/sidebar'
    },
    {
      id: 'navigation-link',
      name: 'Navigation Link',
      description: 'Enlace de navegación con soporte para estados activos e iconos.',
      category: 'navigation',
      status: 'stable',
      usage: 'import NavigationLink from "@/components/navigation/NavigationLink"',
      path: '/design-system/components/navigation-link'
    },
    {
      id: 'localized-link',
      name: 'Localized Link',
      description: 'Enlace con soporte para internacionalización y accesibilidad.',
      category: 'navigation',
      status: 'stable',
      usage: 'import LocalizedLink from "@/components/LocalizedLink"',
      path: '/design-system/components/localized-link'
    }
  ];
}
