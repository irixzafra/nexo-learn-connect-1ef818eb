
# Paleta de Colores

Nuestra paleta de colores combina tonos vibrantes con neutrales cuidadosamente seleccionados para crear un sistema visual cohesivo y distintivo.

## Colores Primarios

### Azul Eléctrico
- **HSL**: `hsl(210, 100%, 50%)`
- **HEX**: `#0078FF`
- **Uso**: Color de acento principal para elementos interactivos clave y puntos focales.
- **Variantes**: Se usa en diferentes niveles de opacidad para crear jerarquía.

### Negro
- **HSL**: `hsl(240, 10%, 3.9%)`
- **Uso**: Base para texto y elementos en modo oscuro.
- **Accesibilidad**: Ofrece alto contraste con fondos claros.

### Blanco
- **HSL**: `hsl(0, 0%, 98%)`
- **Uso**: Base para fondos en modo claro y texto en modo oscuro.
- **Accesibilidad**: Proporciona contraste óptimo con texto oscuro.

## Escala de Grises

Utilizamos una escala cuidadosamente calibrada de tonos grises para crear jerarquía y separación:

- **Gris Claro**: Para bordes sutiles y separadores `hsl(240, 5.9%, 90%)`
- **Gris Medio**: Para texto secundario `hsl(240, 3.8%, 46.1%)`
- **Gris Oscuro**: Para áreas con énfasis suave `hsl(240, 3.7%, 15.9%)`

El contraste está optimizado para garantizar la legibilidad y accesibilidad en todas las combinaciones.

## Colores de Estado

### Éxito
- **Color**: Verde azulado `hsl(160, 84%, 39%)`
- **Uso**: Confirmaciones y acciones completadas.

### Error
- **Color**: Rojo contenido `hsl(0, 84.2%, 60.2%)`
- **Uso**: Alertas y errores que requieren atención.

### Advertencia
- **Color**: Ámbar `hsl(38, 92%, 50%)`
- **Uso**: Notificaciones que requieren atención pero no son críticas.

### Info
- **Color**: Azul claro `hsl(220, 100%, 62%)`
- **Uso**: Información contextual y notificaciones neutrales.

## Implementación en CSS

Las variables de color están implementadas como variables CSS personalizadas:

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

### Uso en Tailwind

Para mantener la consistencia, siempre use las clases de tailwind que hacen referencia a estas variables:

- `bg-primary` en lugar de colores directos
- `text-foreground` para texto principal
- `text-muted-foreground` para texto secundario
- `border-border` para bordes estándar
