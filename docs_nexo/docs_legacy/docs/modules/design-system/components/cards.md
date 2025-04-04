
# Tarjetas (Cards)

Las tarjetas son contenedores flexibles que agrupan contenido relacionado de manera visualmente distinta.

## Características Principales

- **Fondos ligeramente diferenciados**: Distinguibles del fondo principal pero sin contraste excesivo
- **Elevación sutilmente indicada**: Mediante sombras ligeras en vez de bordes visibles
- **Padding consistente**: Generalmente 1.5rem (24px) para crear respiro visual
- **Transiciones en hover**: Para tarjetas interactivas, proporcionando feedback visual
- **Estructura interna organizada**: Componentes para encabezado, contenido y pie

## Estructura de Componentes

### CardHeader
- Contiene el título y descripción de la tarjeta
- Padding superior y laterales consistentes
- Espacio adecuado entre título y descripción

### CardTitle
- Estilo tipográfico distintivo (generalmente más grande o en negrita)
- Mantiene jerarquía visual clara

### CardDescription
- Texto complementario con estilo secundario
- Proporciona contexto adicional al título

### CardContent
- Área principal de contenido
- Padding laterales consistentes
- Sin padding superior cuando sigue a CardHeader

### CardFooter
- Área para acciones relacionadas con la tarjeta
- Alineación de elementos flexible
- Separación visual del contenido principal

## Variantes Comunes

### Estándar
- Tarjeta básica con sombra sutil
- Bordes redondeados consistentes
- Uso general para presentación de contenido

### Interactiva
- Incluye efectos hover
- Generalmente enlaza a contenido relacionado
- Puede incluir transiciones de escala o elevación

### Destacada
- Mayor elevación o borde de acento
- Utilizada para contenido prioritario
- Puede incluir un tratamiento visual distintivo

## Implementación

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

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

// ... otros componentes de Card
```

## Ejemplos de Uso

### Tarjeta de Información Básica

```tsx
<Card>
  <CardHeader>
    <CardTitle>Título de la tarjeta</CardTitle>
    <CardDescription>Descripción o contexto adicional</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Contenido principal de la tarjeta...</p>
  </CardContent>
  <CardFooter>
    <Button>Acción primaria</Button>
  </CardFooter>
</Card>
```

### Tarjeta Interactiva

```tsx
<Card className="hover:shadow-md transition-all duration-300 cursor-pointer">
  <CardHeader>
    <CardTitle>Recurso disponible</CardTitle>
    <CardDescription>Haga clic para acceder al contenido</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Vista previa del contenido...</p>
  </CardContent>
</Card>
```

## Clases de Utilidad Relacionadas

```css
/* Tarjeta con estilo minimalista */
.card-minimal {
  @apply bg-card border-none shadow-sm dark:bg-secondary/30 transition-all duration-300 hover:shadow-md;
}

/* Tarjeta interactiva con indicador de hover */
.card-interactive {
  @apply bg-card border-none shadow-sm hover:shadow-md hover:border-l-4 hover:border-l-accent transition-all duration-300;
}

/* Efecto de elevación en hover */
.hover-lift {
  @apply transition-all duration-300 hover:-translate-y-1 hover:shadow-md;
}
```

## Mejores Prácticas

1. **Consistencia en padding**: Mantener espaciado interno consistente
2. **Jerarquía clara**: Diferenciar visualmente título, descripción y contenido
3. **Interactividad evidente**: Si la tarjeta es clickeable, proporcionar indicadores claros
4. **Contenido apropiado**: Agrupar solo información relacionada dentro de una misma tarjeta
5. **Responsive**: Asegurar que las tarjetas se adapten adecuadamente a diferentes tamaños de pantalla
