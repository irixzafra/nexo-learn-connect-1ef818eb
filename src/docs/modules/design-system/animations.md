
# Animaciones y Transiciones

Nuestro sistema de animaciones proporciona feedback visual, crea continuidad y mejora la experiencia de usuario a través de movimientos fluidos y significativos.

## Principios de Animación

### Propósito
Cada animación debe tener un propósito claro: guiar la atención, indicar relaciones, proporcionar feedback o crear delicia.

### Sutileza
Las animaciones deben ser sutiles y no distraer del contenido principal o las tareas del usuario.

### Consistencia
Mantenemos patrones de movimiento consistentes en toda la aplicación para crear familiaridad.

### Rendimiento
Optimizamos las animaciones para evitar impactos negativos en el rendimiento, priorizando propiedades eficientes.

## Duraciones Estándar

- **Extra Rápida**: 150ms - Micro-interacciones instantáneas (clicks, toques)
- **Rápida**: 200-300ms - Transiciones estándar (hovers, cambios de estado)
- **Media**: 300-500ms - Transiciones de contenido (aparición de elementos)
- **Lenta**: 500-700ms - Transiciones más elaboradas (animaciones de página)

## Propiedades Animadas

Preferimos animar propiedades que el navegador puede optimizar:
- `transform` (translate, scale, rotate)
- `opacity`
- `color`/`background-color`

Evitamos animar propiedades que desencadenan layout:
- `width`/`height` (preferimos `transform: scale()`)
- `top`/`left` (preferimos `transform: translate()`)
- `margin`/`padding`

## Funciones de Temporización (Easing)

- **ease-out**: Para elementos que aparecen (inicia rápido, termina suave)
- **ease-in**: Para elementos que desaparecen (inicia suave, termina rápido)
- **ease-in-out**: Para transiciones continuas o en bucle
- **spring**: Para movimientos más naturales (cuando sea apropiado)

```css
/* Ejemplos de variables CSS */
:root {
  --ease-out: cubic-bezier(0.2, 0, 0, 1);
  --ease-in: cubic-bezier(1, 0, 0.8, 0.2);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
}
```

## Tipos de Animaciones

### Transiciones de Estado

Para cambios en hover, focus, active o disabled:

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

### Animaciones de Entrada/Salida

Para elementos que aparecen o desaparecen:

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

### Microinteracciones

#### Transiciones
- **Duración Estándar**: 300ms
- **Timing Function**: ease-out para movimiento natural
- **Propiedades**: transform, opacity, background-color, border-color

#### Efectos Hover
- Cambios sutiles de escala (102-105%)
- Alteraciones de opacidad
- Transiciones de color suaves

## Animaciones Específicas de Componentes

### Accordion
```css
.accordion-content {
  overflow: hidden;
  transition: height 300ms ease-out;
}
```

### Modal/Dialog
```css
.dialog {
  animation: scale-fade-in 300ms var(--ease-out);
}

@keyframes scale-fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Toast/Notification
```css
.toast-enter {
  animation: slide-in-right 300ms var(--ease-out);
}

.toast-exit {
  animation: fade-out 200ms var(--ease-in);
}
```

## Animaciones del Sistema

### Entrada
- **Fade In**: Aparición suave desde transparencia
- **Scale In**: Crecimiento ligero desde 95% a 100%
- **Slide In**: Movimiento desde posición inicial a final

### Carga
- Indicadores minimalistas, preferiblemente integrados con la UI
- Secuenciación para establecer jerarquía de atención

## Utilidades de Animación en Tailwind

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

## Consideraciones de Accesibilidad

- Respetar la preferencia `prefers-reduced-motion`
- Evitar animaciones que puedan causar malestar o mareo
- Asegurar que las animaciones no oculten contenido importante

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
