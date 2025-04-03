
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

**Tamaños**: xs, sm, md (default), lg, xl

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

## Accesibilidad

Nuestro sistema de diseño cumple con WCAG 2.1 nivel AA, asegurando:

- Contraste de color adecuado (mínimo 4.5:1 para texto normal)
- Soporte completo para navegación por teclado
- Etiquetas aria apropiadas para componentes interactivos
- Estados de focus visibles y consistentes
- Mensajes de error claros para formularios

## Implementación Técnica

- Los componentes base provienen principalmente de shadcn/ui
- Utilizamos Tailwind CSS para implementar el sistema de diseño
- Los tokens de diseño se definen en el tema de Tailwind
- Los componentes complejos se documentan con PropTypes/TypeScript

## Modo Oscuro

El sistema de diseño incluye soporte completo para modo oscuro con:

- Paleta de colores adaptada para ambos modos
- Transición suave entre modos
- Respeto a las preferencias del sistema
- Opción para fijar el modo independiente del sistema
