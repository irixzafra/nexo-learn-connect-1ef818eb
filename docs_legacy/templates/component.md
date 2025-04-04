
# Componente: [Nombre del Componente]

> Breve descripción del propósito de este componente

## Uso Básico

```tsx
import { ComponentName } from '@/components/path/ComponentName';

function Example() {
  return <ComponentName prop1="value" prop2={true} />;
}
```

## Props

| Nombre | Tipo | Predeterminado | Descripción |
|--------|------|----------------|-------------|
| `prop1` | `string` | `''` | Descripción del prop1 |
| `prop2` | `boolean` | `false` | Descripción del prop2 |
| `prop3` | `() => void` | - | Descripción del prop3 |

## Ejemplos

### Ejemplo Básico

```tsx
<ComponentName prop1="value" />
```

### Ejemplo con Callbacks

```tsx
<ComponentName
  prop1="value"
  prop3={() => console.log('Callback ejecutado')}
/>
```

## Implementación Interna

Detalles sobre cómo funciona internamente el componente.

## Buenas Prácticas

- Primera práctica recomendada
- Segunda práctica recomendada
- Tercera práctica recomendada

## Componentes Relacionados

- [`RelatedComponent1`](./RelatedComponent1.md)
- [`RelatedComponent2`](./RelatedComponent2.md)

---

Última actualización: {{date}}
