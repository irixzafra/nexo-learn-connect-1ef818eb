
# Sistema de Diseño de Nexo Learning

## Filosofía de Diseño

Nuestro sistema de diseño está construido sobre tres principios fundamentales:

1. **Simplicidad**: Interfaces claras y directas que no sobrecargan al usuario
2. **Consistencia**: Patrones repetibles que crean familiaridad y reducen la curva de aprendizaje
3. **Adaptabilidad**: Componentes flexibles que funcionan en diversos contextos y dispositivos

## Tipografía

Utilizamos una combinación de fuentes sans-serif para máxima legibilidad:

- **Títulos**: Inter / 700 (Bold)
- **Subtítulos**: Inter / 600 (SemiBold)
- **Cuerpo**: Inter / 400 (Regular)
- **Destacado**: Inter / 500 (Medium)

### Escala Tipográfica

| Nombre | Tamaño | Uso |
|--------|--------|-----|
| H1 | 2.25rem (36px) | Títulos principales de página |
| H2 | 1.875rem (30px) | Encabezados de sección |
| H3 | 1.5rem (24px) | Subtítulos y encabezados de card |
| H4 | 1.25rem (20px) | Encabezados menores |
| Body | 1rem (16px) | Texto general |
| Small | 0.875rem (14px) | Texto secundario, etiquetas |
| XSmall | 0.75rem (12px) | Texto legal, notas al pie |

## Paleta de Colores

### Colores Principales

| Nombre | Hex | Uso |
|--------|-----|-----|
| Primary | `#8B5CF6` | Acciones principales, elementos destacados |
| Secondary | `#F97316` | Acciones secundarias, acentos |
| Tertiary | `#0EA5E9` | Elementos terciarios, enlaces |

### Neutrales

| Nombre | Hex | Uso |
|--------|-----|-----|
| Background | `#FFFFFF` (light) / `#1A1F2C` (dark) | Fondo de página |
| Surface | `#F6F6F7` (light) / `#252B3B` (dark) | Fondos de tarjetas, modales |
| Border | `#E5E7EB` (light) / `#2D3748` (dark) | Bordes y separadores |
| Foreground | `#1A1F2C` (light) / `#F8FAFC` (dark) | Texto principal |
| Muted | `#6B7280` (light) / `#9CA3AF` (dark) | Texto secundario |

### Estado

| Nombre | Hex | Uso |
|--------|-----|-----|
| Success | `#10B981` | Confirmaciones, completado |
| Warning | `#FBBF24` | Advertencias, precaución |
| Error | `#EF4444` | Errores, alertas |
| Info | `#3B82F6` | Información, noticias |

## Espaciado

Utilizamos un sistema de espaciado basado en múltiplos de 4px:

| Nombre | Valor | Uso |
|--------|-------|-----|
| 1 | 4px | Espaciado mínimo entre elementos |
| 2 | 8px | Espaciado estándar entre elementos relacionados |
| 3 | 12px | Espaciado medio |
| 4 | 16px | Espaciado estándar entre grupos |
| 5 | 20px | Espaciado medio entre secciones |
| 6 | 24px | Espaciado grande entre componentes |
| 8 | 32px | Separación entre secciones |
| 10 | 40px | Espaciado grande de sección |
| 12 | 48px | Márgenes de página |
| 16 | 64px | Espaciado extendido |

## Bordes y Radios

| Nombre | Valor | Uso |
|--------|-------|-----|
| None | 0 | Sin redondeo |
| Small | 4px | Elementos pequeños (botones, inputs) |
| Medium | 8px | Cards, paneles |
| Large | 12px | Modales, drawers |
| Full | 9999px | Círculos, píldoras |

## Elevación y Sombras

| Nombre | Valor | Uso |
|--------|-------|-----|
| Low | `0 1px 2px rgba(0, 0, 0, 0.05)` | Elementos ligeramente elevados |
| Medium | `0 4px 6px -1px rgba(0, 0, 0, 0.1)` | Cards, elementos destacados |
| High | `0 10px 15px -3px rgba(0, 0, 0, 0.1)` | Modales, elementos flotantes |

## Componentes Principales

### Botones

| Variante | Uso | Características |
|----------|-----|-----------------|
| Primary | Acciones principales | Color primario, relleno completo |
| Secondary | Acciones alternativas | Color secundario, relleno completo |
| Outline | Acciones secundarias no disruptivas | Borde, sin relleno |
| Ghost | Acciones contextuales en áreas densas | Sin borde, sin relleno |
| Link | Navegación inline | Aspecto de enlace |
| Destructive | Acciones destructivas | Color rojo |
| Minimal | Acciones sutiles contextuales | Apenas visible en reposo, visible en hover |

**Tamaños**: xs, sm, md (default), lg, xl

**Estados**: default, hover, focus, active/pressed, disabled

**Con Iconos**: Los botones pueden incluir íconos para mejorar la comprensión visual, con espaciado consistente entre icono y texto (0.5rem), alineación vertical centrada y tamaños proporcionales al botón.

```tsx
<Button>
  <PlusIcon className="h-4 w-4 mr-2" />
  Añadir nuevo
</Button>
```

**Implementación Base**:

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline: "border border-input bg-background hover:bg-accent/10 hover:text-accent-foreground shadow-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        minimal: "text-foreground hover:bg-secondary/50 hover:text-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### Formularios

| Componente | Variantes | Características |
|------------|-----------|-----------------|
| Input | text, email, password, number | Con labels flotantes |
| Textarea | resizable, fixed | Con contador opcional |
| Select | single, multiple, searchable | Con filtrado |
| Checkbox | default, indeterminate | Con texto descriptivo |
| Radio | default, card | Simple o con contenido ampliado |
| Switch | default, labeled | Toggle booleano |

### Cards

| Variante | Uso | Características |
|----------|-----|-----------------|
| Default | Contenido general | Bordes suaves, padding consistente |
| Interactive | Elementos clicables | Hover state, cursor pointer |
| Highlighted | Contenido destacado | Borde o fondo diferenciado |
| Media | Contenido con imágenes | Soporte para ratio de aspecto |

**Estructura de Componentes**:

- **CardHeader**: Contiene título y descripción, con padding superior y laterales consistentes
- **CardTitle**: Estilo tipográfico distintivo, mantiene jerarquía visual clara
- **CardDescription**: Texto complementario con estilo secundario
- **CardContent**: Área principal de contenido, sin padding superior cuando sigue a CardHeader
- **CardFooter**: Área para acciones relacionadas, alineación flexible, separación visual del contenido

**Implementación Base**:

```tsx
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg bg-card text-card-foreground shadow-sm transition-all duration-300",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"
```

**Clases de Utilidad**:
```css
/* Tarjeta con estilo minimalista */
.card-minimal {
  @apply bg-card border-none shadow-sm dark:bg-secondary/30 transition-all duration-300 hover:shadow-md;
}

/* Tarjeta interactiva con indicador de hover */
.card-interactive {
  @apply bg-card border-none shadow-sm hover:shadow-md hover:border-l-4 hover:border-l-accent transition-all duration-300;
}
```

### Navegación

| Componente | Variantes | Características |
|------------|-----------|-----------------|
| Navbar | fixed, sticky | Barra de navegación principal |
| Sidebar | expanded, collapsed | Navegación lateral |
| Tabs | default, underline, pills | Navegación por pestañas |
| Breadcrumbs | default, with separators | Migas de pan |
| Pagination | default, compact | Navegación paginada |

### Feedback

| Componente | Variantes | Características |
|------------|-----------|-----------------|
| Alert | info, success, warning, error | Mensajes informativos |
| Toast | default, with actions | Notificaciones temporales |
| Dialog | modal, alert | Interacciones que requieren atención |
| Progress | bar, circular | Indicadores de progreso |
| Skeleton | text, card, avatar | Placeholders de carga |

## Diseño Responsivo

Utilizamos un enfoque mobile-first con los siguientes breakpoints:

| Nombre | Valor | Descripción |
|--------|-------|-------------|
| xs | <640px | Móviles pequeños |
| sm | ≥640px | Móviles grandes |
| md | ≥768px | Tablets |
| lg | ≥1024px | Laptops/Desktops pequeños |
| xl | ≥1280px | Desktops |
| 2xl | ≥1536px | Pantallas grandes |

## Iconografía

Utilizamos principalmente Lucide React para iconos, con las siguientes pautas:

- Tamaños estándar: 16px, 20px, 24px
- Grosor de trazo consistente (preferiblemente 1.5-2px)
- Uso del color actual (currentColor) para heredar del contexto
- Espaciado consistente para iconos dentro de componentes

## Animaciones y Transiciones

| Tipo | Duración | Timing Function | Uso |
|------|----------|-----------------|-----|
| Rápida | 150ms | ease-in-out | Hover, focus |
| Media | 250ms | ease-in-out | Expansión, colapso |
| Lenta | 350ms | ease-in-out | Entradas, salidas |

### Tipos de Animaciones

**Transiciones de Estado**:
```css
.btn {
  transition: background-color 200ms var(--ease-out),
              transform 200ms var(--ease-out);
}

.btn:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-2px);
}
```

**Animaciones de Entrada/Salida**:
```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 300ms var(--ease-out);
}
```

**Funciones de Temporización (Easing)**:
```css
:root {
  --ease-out: cubic-bezier(0.2, 0, 0, 1);
  --ease-in: cubic-bezier(1, 0, 0.8, 0.2);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
}
```

**Utilidades en Tailwind**:
```css
@layer utilities {
  .animate-fade-in {
    @apply animate-[fade-in_0.3s_ease-out];
  }
  
  .animate-scale-in {
    @apply animate-[scale-in_0.2s_ease-out];
  }
  
  .hover-scale {
    @apply transition-transform duration-200 hover:scale-105;
  }
  
  .hover-lift {
    @apply transition-all duration-300 hover:-translate-y-1 hover:shadow-md;
  }
}
```

## Accesibilidad

Nuestro sistema de diseño cumple con WCAG 2.1 nivel AA, asegurando:

- Contraste de color adecuado (mínimo 4.5:1 para texto normal)
- Soporte completo para navegación por teclado
- Etiquetas aria apropiadas para componentes interactivos
- Estados de focus visibles y consistentes
- Mensajes de error claros para formularios

### Mensajes de Estado para Lectores de Pantalla

**ARIA Live Regions**:
```html
<div aria-live="polite" aria-atomic="true">
  Mensaje de estado actualizado
</div>
```

**Roles y Estados**:
```html
<button aria-pressed="true">Toggle activo</button>
<div role="alert">Error en el formulario</div>
```

## Sistema de Temas

El sistema soporta varios modos de tema para adaptarse a preferencias del usuario:

### Modos de Tema Disponibles

- **Tema Claro (Light)**: Predeterminado, optimizado para uso diurno, mayor contraste
- **Tema Oscuro (Dark)**: Para entornos con poca luz, contraste reducido, ahorra batería en OLED
- **Preferencia del Sistema (System)**: Respeta la configuración del sistema operativo, transición automática día/noche

### Implementación Técnica

- **Variables CSS**: Definidas en el archivo `index.css` con variantes para cada tema
- **Clases de Tema**: Aplicadas al elemento `html` (`.light`, `.dark`)
- **Persistencia**: Preferencia guardada en `localStorage`
- **Detección Automática**: Mediante `window.matchMedia('(prefers-color-scheme: dark)')`

### Uso con Tailwind CSS

```tsx
<div className="bg-white dark:bg-slate-900 text-black dark:text-white">
  Contenido adaptable
</div>
```

## Implementación Técnica

### Variables CSS Base

El sistema de diseño se implementa principalmente a través de variables CSS personalizadas:

```css
:root {
  --background: 0 0% 98%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 210 100% 50%;
  --primary-foreground: 0 0% 98%;
  /* ... otros colores ... */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... otros colores en modo oscuro ... */
}
```

### Uso con Tailwind

El proyecto utiliza Tailwind CSS para implementar el sistema de diseño:

- Los tokens de diseño se definen en el tema de Tailwind
- Utilizamos class-variance-authority para variantes de componentes
- Componentes accesibles basados en Radix UI a través de shadcn/ui

### Guías de Implementación

1. **Utiliza las Variables CSS**: Todas las propiedades de color deben hacer referencia a variables:
   ```css
   color: hsl(var(--foreground));
   background-color: hsl(var(--background));
   ```

2. **Evita Colores Codificados**: Nunca uses valores hexadecimales o RGB directamente:
   ```css
   /* ❌ Incorrecto */
   color: #000000;
   
   /* ✅ Correcto */
   color: hsl(var(--foreground));
   ```

3. **Soporte para Modo Oscuro**: Utiliza las variantes `dark:` de Tailwind:
   ```html
   <div className="bg-card text-card-foreground dark:bg-card-dark dark:text-card-foreground-dark">
     Contenido
   </div>
   ```

4. **Sistema de Espaciado**: Utiliza las clases de espaciado de Tailwind que siguen nuestro sistema:
   ```html
   <div className="space-y-4">
     <div className="p-4">Componente con padding interno</div>
     <div className="mt-6">Componente con margen superior</div>
   </div>
   ```

5. **Extensión de Componentes**: Extiende los componentes base en lugar de crear nuevos:
   ```tsx
   import { Button } from '@/components/ui/button';
   
   const BigButton = ({ children, ...props }) => (
     <Button className="py-6 text-lg" {...props}>
       {children}
     </Button>
   );
   ```

## Modo Oscuro

El sistema de diseño incluye soporte completo para modo oscuro con:

- Paleta de colores adaptada para ambos modos
- Transición suave entre modos
- Respeto a las preferencias del sistema
- Opción para fijar el modo independiente del sistema

---

*Para dudas o sugerencias sobre el sistema de diseño, contacte al equipo de UX/UI en `#design-system` en Slack.*

