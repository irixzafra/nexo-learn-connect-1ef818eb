
# Accesibilidad

Nuestro sistema de diseño está construido con la accesibilidad como principio fundamental, no como consideración posterior. Seguimos las pautas WCAG 2.1 nivel AA como mínimo.

## Principios Fundamentales

### Perceptible
La información y los componentes de la interfaz deben presentarse de manera que los usuarios puedan percibirlos.

### Operable
Los componentes de la interfaz y la navegación deben ser operables mediante diversos métodos de entrada.

### Comprensible
La información y el funcionamiento de la interfaz deben ser comprensibles.

### Robusto
El contenido debe ser suficientemente robusto para interpretarse de manera confiable por una amplia variedad de agentes de usuario, incluidas las tecnologías de asistencia.

## Contraste y Color

### Relaciones de Contraste
- **Texto normal**: Mínimo 4.5:1 contra el fondo (AA)
- **Texto grande**: Mínimo 3:1 contra el fondo (AA)
- **Componentes de interfaz**: Mínimo 3:1 contra colores adyacentes

### Uso del Color
- Nunca usamos solo el color para transmitir información
- Incluimos siempre indicadores adicionales (iconos, texto, patrones)
- Proporcionamos modos de alto contraste cuando es necesario

## Navegación por Teclado

### Enfoque Visible
- Estados `:focus` claros y visibles en todos los elementos interactivos
- Contraste adecuado para el indicador de enfoque
- El indicador de enfoque nunca está oculto ni tiene `outline: none` sin alternativa

### Orden de Tabulación
- Secuencia lógica y predecible
- Estructurado para seguir el flujo visual de la interfaz
- Sin trampas de teclado que atrapen el foco

## Mensajes de Estado para Lectores de Pantalla

### ARIA Live Regions
Utilizamos regiones live para anunciar cambios dinámicos:
```html
<div aria-live="polite" aria-atomic="true">
  Mensaje de estado actualizado
</div>
```

### Roles y Estados
Implementamos adecuadamente:
- `aria-expanded` para elementos colapsables
- `aria-pressed` para botones tipo toggle
- `aria-selected` para elementos de menú o pestañas
- `aria-invalid` y mensajes de error para validación de formularios

## Textos Alternativos

### Imágenes
- Todas las imágenes informativas tienen texto alternativo significativo
- Las imágenes decorativas tienen `alt=""` para ser ignoradas por lectores de pantalla

### Iconos
- Los iconos funcionales incluyen texto accesible (visible u oculto)
- Utilizamos `aria-label` cuando es necesario

```html
<button aria-label="Cerrar diálogo">
  <svg>...</svg>
</button>
```

## Formularios Accesibles

### Etiquetas
- Cada campo de formulario tiene una etiqueta visible asociada
- Las etiquetas están correctamente vinculadas con sus campos mediante `for` e `id`

### Validación
- Los errores se comunican claramente de manera visual y programática
- Los mensajes de error son específicos y ayudan a resolver el problema
- Usamos `aria-describedby` para asociar mensajes de error con campos

## Movimiento y Animación

### Preferencias de Usuario
Respetamos la preferencia `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Contenido en Movimiento
- Evitamos animaciones que puedan causar malestar
- Proporcionamos controles para pausar o detener contenido en movimiento

## Estructura Semántica

### HTML Semántico
Utilizamos elementos HTML según su propósito semántico:
- `<button>` para acciones
- `<a>` para navegación
- Encabezados (`<h1>` - `<h6>`) en orden jerárquico
- Listas (`<ul>`, `<ol>`) para agrupar elementos relacionados

### Landmarks
Implementamos landmarks para ayudar en la navegación:
- `<header>`, `<main>`, `<footer>`
- `<nav>` para áreas de navegación
- `<aside>` para contenido complementario
- Roles ARIA cuando es necesario

## Pruebas y Verificación

Integramos pruebas de accesibilidad en nuestro proceso de desarrollo:

1. **Pruebas automáticas**: Herramientas como axe-core, Lighthouse
2. **Navegación por teclado**: Verificación manual de funcionalidad sin ratón
3. **Lectores de pantalla**: Pruebas con NVDA, JAWS o VoiceOver
4. **Simulación de condiciones**: Alto contraste, pantalla ampliada, etc.

## Recursos para Implementación

- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Accessible Components Examples](https://inclusive-components.design/)
