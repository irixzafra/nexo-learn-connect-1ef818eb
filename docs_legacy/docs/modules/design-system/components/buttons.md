
# Botones

Los botones son elementos interactivos fundamentales que permiten a los usuarios realizar acciones específicas en la interfaz.

## Variantes

### Primario
- **Uso**: Acciones principales y llamadas a la acción más importantes
- **Apariencia**: Fondo de color acento (azul eléctrico), texto claro, transiciones suaves
- **Clase**: `variant="default"`
- **Ejemplo**: "Crear cuenta", "Enviar solicitud", "Guardar cambios"

### Secundario
- **Uso**: Acciones complementarias o alternativas
- **Apariencia**: Fondo semi-transparente, bordes sutiles, texto de alto contraste
- **Clase**: `variant="secondary"`
- **Ejemplo**: "Ver más", "Editar", "Filtrar resultados"

### Terciario/Ghost
- **Uso**: Acciones de menor prioridad o contextuales
- **Apariencia**: Sin fondo visible, cambios sutiles en hover
- **Clase**: `variant="ghost"`
- **Ejemplo**: "Cancelar", "Volver", navegación secundaria

### Outline
- **Uso**: Alternativa visual con énfasis medio
- **Apariencia**: Borde visible, fondo transparente que cambia en hover
- **Clase**: `variant="outline"`
- **Ejemplo**: "Ver detalles", opciones secundarias

### Link
- **Uso**: Acciones que deberían parecer enlaces
- **Apariencia**: Estilo de enlace con subrayado en hover
- **Clase**: `variant="link"`
- **Ejemplo**: "Más información", "Ver términos", enlaces internos

### Destructivo
- **Uso**: Acciones que eliminan o tienen consecuencias irreversibles
- **Apariencia**: Fondo en tono rojo/destructivo, texto claro
- **Clase**: `variant="destructive"`
- **Ejemplo**: "Eliminar cuenta", "Cancelar suscripción"

## Tamaños

- **sm**: Compacto para espacios reducidos o acciones secundarias (`size="sm"`)
- **default**: Tamaño estándar para la mayoría de los casos (`size="default"`)
- **lg**: Tamaño grande para acciones destacadas o principales (`size="lg"`)
- **icon**: Dimensionado específico para botones que solo contienen íconos (`size="icon"`)

## Estados

- **Default**: Estado normal del botón
- **Hover**: Cambio sutil al pasar el cursor (generalmente oscurecimiento o iluminación)
- **Focus**: Indicador visual al enfocar con teclado (anillo de enfoque)
- **Active/Pressed**: Feedback visual al hacer clic (escala ligeramente reducida)
- **Disabled**: Apariencia atenuada, indica que la acción no está disponible

## Con Iconos

Los botones pueden incluir íconos para mejorar la comprensión visual:
- Espaciado consistente entre icono y texto (0.5rem)
- Alineación vertical centrada
- Tamaños de icono proporcionales al tamaño del botón

```tsx
<Button>
  <PlusIcon className="h-4 w-4 mr-2" />
  Añadir nuevo
</Button>
```

## Implementación

El botón está implementado como un componente React con variantes definidas usando class-variance-authority:

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

## Mejores Prácticas

1. **Jerarquía visual**: Usar la variante primaria para la acción principal de cada vista
2. **Etiquetas claras**: Las etiquetas deben describir claramente la acción resultante
3. **Consistencia**: Mantener estilos y tamaños consistentes en toda la aplicación
4. **Accesibilidad**: Asegurar suficiente contraste y tamaño adecuado para tappability
5. **Feedback**: Proporcionar feedback visual para todas las interacciones
