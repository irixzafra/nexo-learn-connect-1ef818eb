
# UI Kit y Componentes Compartidos

Este documento describe los componentes de interfaz de usuario disponibles en Nexo Learning Platform, proporcionando una guía para mantener consistencia visual y funcional en toda la aplicación.

## Librería Base (shadcn/ui)

Nexo Learning utiliza [shadcn/ui](https://ui.shadcn.com/) como base para su sistema de componentes. Esta librería proporciona componentes React accesibles y personalizables, construidos sobre Radix UI y estilizados con Tailwind CSS.

### Componentes Básicos

#### Botones
- `Button`: Componente principal para acciones
- Variantes: default, destructive, outline, secondary, ghost, link
- Tamaños: default, sm, lg, icon

```jsx
import { Button } from "@/components/ui/button";

// Ejemplos
<Button>Default Button</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline" size="sm">Small Outline</Button>
```

#### Inputs
- `Input`: Campo de texto básico
- `Textarea`: Campo de texto multilínea
- `Select`: Selector de opciones
- `Checkbox`: Casilla de verificación
- `RadioGroup`: Grupo de opciones exclusivas
- `Switch`: Interruptor de estado

#### Feedback
- `Alert`: Mensajes informativos o de error
- `Toast`: Notificaciones temporales
- `Dialog`: Ventanas modales para confirmaciones
- `Progress`: Indicadores de progreso
- `Skeleton`: Placeholders durante carga

#### Navegación
- `Tabs`: Navegación por pestañas
- `Navigation`: Menús de navegación
- `Dropdown`: Menús desplegables
- `Breadcrumb`: Ruta de navegación jerárquica

## Componentes Reutilizables (`src/components/`)

### Componentes de Layout
- `Header`: Encabezado principal de la aplicación
- `Sidebar`: Barra lateral de navegación
- `Footer`: Pie de página con información legal/contacto
- `PageHeader`: Encabezado estándar para páginas

### Componentes de Datos
- `DataTable`: Tabla de datos con ordenación y filtrado
- `SearchInput`: Campo de búsqueda con autocompletado
- `FilterBar`: Barra de filtros personalizable
- `Pagination`: Control de paginación estándar
- `EmptyState`: Estado vacío para listas/tablas

### Feedback y Estado
- `LoadingSpinner`: Indicador de carga
- `ErrorBoundary`: Captura de errores en componentes
- `ConnectionStatus`: Indicador de estado de conexión
- `StatusBadge`: Insignia para estados diversos

### Formularios
- `Form`: Wrapper para formularios con validación
- `FormField`: Campo de formulario con label y validación
- `FieldError`: Mensaje de error para campos
- `SubmitButton`: Botón de envío con estados de carga

## Layouts (`src/layouts`)

### Layout Principal
- `AppLayout`: Layout base de la aplicación autenticada
  - Header en la parte superior
  - Sidebar a la izquierda
  - Área de contenido principal
  - Espacio para notificaciones

### Layouts Especializados
- `PublicLayout`: Para páginas públicas (landing, login)
- `SectionPageLayout`: Para páginas con encabezado de sección
- `DashboardLayout`: Para interfaces tipo dashboard
- `CourseViewLayout`: Para visualización de cursos

## Patrones de Diseño

### Sistema de Temas
- Modo claro/oscuro mediante CSS variables
- Colores primarios y secundarios personalizables
- Tokens de diseño consistentes (spacing, radii, etc.)

### Responsive Design
- Enfoque mobile-first en todos los componentes
- Breakpoints estándar: sm, md, lg, xl, 2xl
- Componentes adaptables a distintos tamaños de pantalla
- Navegación optimizada para mobile/desktop

### Accesibilidad
- Etiquetas ARIA para componentes interactivos
- Navegación por teclado para todas las interacciones
- Contraste adecuado para texto
- Mensajes de error descriptivos

## Uso e Implementación

### Importación de Componentes
```jsx
// Componentes de shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Componentes compartidos
import { SearchInput } from "@/components/SearchInput";
import { PageHeader } from "@/components/layout/page/PageHeader";

// Layouts
import AppLayout from "@/layouts/AppLayout";
```

### Extensión de Componentes
Los componentes base pueden ser extendidos para necesidades específicas:

```jsx
// Ejemplo de botón personalizado
import { Button } from "@/components/ui/button";

export const ActionButton = ({ icon, children, ...props }) => (
  <Button className="flex items-center gap-2" {...props}>
    {icon && <span className="w-4 h-4">{icon}</span>}
    {children}
  </Button>
);
```

### Convenciones de Estilo
- Uso de Tailwind para estilos inline
- Variables CSS para tokens de diseño
- Componentes controlados para formularios
- Props con nombres descriptivos
