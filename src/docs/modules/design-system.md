# Sistema de Diseño Nexo - Estilo Minimalista Futurista

Este documento describe los principios, componentes y patrones que conforman el sistema de diseño de Nexo, con un enfoque minimalista y futurista inspirado en la estética de empresas como Tesla y X.

## Filosofía de Diseño

Nuestro sistema de diseño se basa en tres pilares fundamentales:

1. **Minimalismo Intencional**: Cada elemento tiene un propósito claro. Eliminamos lo superfluo para resaltar lo importante.
2. **Claridad Funcional**: La jerarquía visual sirve a la funcionalidad, guiando al usuario naturalmente hacia las acciones relevantes.
3. **Consistencia Sistemática**: Patrones predecibles y coherentes a través de toda la plataforma para construir familiaridad y confianza.

## Paleta de Colores

### Colores Primarios
- **Azul Eléctrico** `hsl(210, 100%, 50%)`: Color de acento principal para elementos interactivos clave y puntos focales.
- **Negro** `hsl(240, 10%, 3.9%)`: Base para texto y elementos en modo oscuro.
- **Blanco** `hsl(0, 0%, 98%)`: Base para fondos en modo claro y texto en modo oscuro.

### Escala de Grises
- Utilizamos una escala cuidadosamente calibrada de tonos grises para crear jerarquía y separación.
- El contraste está optimizado para garantizar la legibilidad y accesibilidad.

### Colores de Estado
- **Éxito**: Verde azulado para confirmaciones y acciones completadas.
- **Error**: Rojo contenido para alertas y errores.
- **Advertencia**: Ámbar para notificaciones que requieren atención.
- **Info**: Azul claro para información contextual.

## Tipografía

### Familia Principal
- **Inter**: Sans-serif moderna y altamente legible, optimizada para interfaces digitales.

### Jerarquía y Escala
- **Títulos Principales**: 1.875rem (30px) / font-bold / line-height: 1.1
- **Títulos Secundarios**: 1.5rem (24px) / font-semibold / line-height: 1.2
- **Subtítulos**: 1.25rem (20px) / font-medium / line-height: 1.25
- **Cuerpo Principal**: 1rem (16px) / font-normal / line-height: 1.5
- **Texto Secundario**: 0.875rem (14px) / font-normal / line-height: 1.5
- **Texto Pequeño**: 0.75rem (12px) / font-medium / line-height: 1.5

### Principios Tipográficos
- Contraste de pesos más que de tamaños para jerarquía
- Espaciado generoso entre párrafos (1.5em mínimo)
- Longitud de línea controlada (max-width) para mejorar legibilidad

## Componentes Base

### Botones
- **Primario**: Fondo de color acento, texto claro, transiciones suaves.
- **Secundario**: Fondo semi-transparente, bordes sutiles, texto de alto contraste.
- **Terciario/Ghost**: Sin fondo visible, cambios sutiles en hover.
- **Con Icono**: Espaciado consistente entre icono y texto (0.5rem).

### Tarjetas
- Fondos ligeramente diferenciados del fondo principal.
- Elevación mediante sombras sutiles en vez de bordes visibles.
- Padding consistente (1.5rem).
- Transiciones en hover para elementos interactivos.

### Formularios
- Labels claros y concisos posicionados encima de los campos.
- Estados enfocados visualmente distintivos.
- Mensajes de validación inmediatos y contextuales.
- Consistencia en altura y apariencia de los campos.

### Navegación
- Indicadores claros de ubicación actual.
- Interacciones de hover discretas pero perceptibles.
- Agrupación lógica de elementos relacionados.
- Iconografía consistente como apoyo visual.

## Sistema de Espaciado

Basado en una unidad base de 0.25rem (4px):
- **4xs**: 0.125rem (2px)
- **3xs**: 0.25rem (4px)
- **2xs**: 0.5rem (8px)
- **xs**: 0.75rem (12px)
- **sm**: 1rem (16px)
- **md**: 1.5rem (24px)
- **lg**: 2rem (32px)
- **xl**: 3rem (48px)
- **2xl**: 4rem (64px)
- **3xl**: 6rem (96px)

## Iconografía

- Uso exclusivo de la biblioteca Lucide React.
- Tamaños estandarizados:
  - **Pequeño**: 16px (elementos UI compactos)
  - **Estándar**: 20px (navegación, botones)
  - **Medio**: 24px (áreas destacadas)
  - **Grande**: 32px+ (áreas de enfoque visual)
- Consistencia en estilo y peso visual.

## Principios de Layout

### Grid
- Sistema de grid flexible basado en 12 columnas.
- Breakpoints principales:
  - **sm**: 640px
  - **md**: 768px
  - **lg**: 1024px
  - **xl**: 1280px
  - **2xl**: 1536px

### Contenedores
- Máximo ancho de contenido: 1400px
- Padding horizontal consistente: 2rem (ajustado en viewport pequeños)

## Microinteracciones

### Transiciones
- **Duración Estándar**: 300ms
- **Timing Function**: ease-out para movimiento natural
- **Propiedades**: transform, opacity, background-color, border-color

### Efectos Hover
- Cambios sutiles de escala (102-105%)
- Alteraciones de opacidad
- Transiciones de color suaves

## Animaciones de Sistema

### Entrada
- **Fade In**: Aparición suave desde transparencia
- **Scale In**: Crecimiento ligero desde 95% a 100%
- **Slide In**: Movimiento desde posición inicial a final

### Carga
- Indicadores minimalistas, preferiblemente integrados con la UI
- Secuenciación para establecer jerarquía de atención

## Accesibilidad

- Relaciones de contraste AA/AAA para texto e interfaces.
- Soporte completo para navegación por teclado con estados focus visibles.
- Mensajes de estado para lectores de pantalla.
- Texto alternativo para elementos visuales.

## Implementación Técnica

### Variables CSS
Variables personalizadas en theme para todas las propiedades clave:
- Colores
- Espaciados
- Radios
- Sombras
- Transiciones

### Clases de Utilidad
Extensiones de Tailwind para patrones específicos:
- `.card-minimal`
- `.hover-lift`
- `.hover-accent`
- `.animate-fade-in`

### Componentes Shadcn/UI
Personalización del theme para integrarse con el sistema visual:
- Button
- Card
- Form elements
- Navigation components
