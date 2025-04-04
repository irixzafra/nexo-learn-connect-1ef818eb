
# Tipografía

El sistema tipográfico de Nexo está diseñado para proporcionar claridad, legibilidad y jerarquía visual consistente en todas las plataformas.

## Familia Principal

### Inter
Utilizamos Inter como nuestra tipografía principal, una sans-serif moderna optimizada para interfaces digitales.

**Características clave**:
- Alta legibilidad en tamaños pequeños
- Formas de letras distintas que facilitan el escaneo rápido
- Amplia gama de pesos para crear jerarquía
- Excelente renderizado en pantallas de alta y baja resolución
- Soporte completo para múltiples idiomas

## Jerarquía y Escala

Nuestra escala tipográfica sigue una progresión coherente:

### Títulos Principales
- **Tamaño**: 1.875rem (30px)
- **Peso**: font-bold
- **Altura de línea**: 1.1
- **Uso**: Encabezados de página principales

### Títulos Secundarios
- **Tamaño**: 1.5rem (24px)
- **Peso**: font-semibold
- **Altura de línea**: 1.2
- **Uso**: Secciones importantes dentro de una página

### Subtítulos
- **Tamaño**: 1.25rem (20px)
- **Peso**: font-medium
- **Altura de línea**: 1.25
- **Uso**: Encabezados de componentes y subsecciones

### Cuerpo Principal
- **Tamaño**: 1rem (16px)
- **Peso**: font-normal
- **Altura de línea**: 1.5
- **Uso**: Texto principal de contenido

### Texto Secundario
- **Tamaño**: 0.875rem (14px)
- **Peso**: font-normal
- **Altura de línea**: 1.5
- **Uso**: Texto complementario, etiquetas, anotaciones

### Texto Pequeño
- **Tamaño**: 0.75rem (12px)
- **Peso**: font-medium
- **Altura de línea**: 1.5
- **Uso**: Información legal, notas a pie, metadatos

## Principios Tipográficos

### Contraste de Pesos
Utilizamos el contraste de pesos tipográficos más que tamaños para establecer jerarquía, creando distinciones más sutiles pero efectivas.

### Espaciado Generoso
Mantenemos un espaciado mínimo de 1.5em entre párrafos para mejorar la legibilidad y crear respiro visual.

### Longitud de Línea Controlada
Implementamos un ancho máximo (max-width) para bloques de texto largos, manteniendo aproximadamente 60-75 caracteres por línea para facilitar la lectura.

### Alineación
- Texto generalmente alineado a la izquierda para facilitar la lectura
- Alineación central reservada para títulos destacados y contenido específico

## Implementación en Tailwind

```css
@layer base {
  body {
    @apply font-sans text-foreground;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-semibold tracking-tight;
  }
  
  h1 {
    @apply text-3xl md:text-4xl;
  }
  
  h2 {
    @apply text-2xl md:text-3xl;
  }
  
  h3 {
    @apply text-xl md:text-2xl;
  }
}
```
