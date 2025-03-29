
# Sistema de Espaciado

Nuestro sistema de espaciado proporciona consistencia visual y establece relaciones jerárquicas entre elementos en la interfaz.

## Unidades Base

El sistema está basado en una unidad base de 0.25rem (4px), creando una escala progresiva que permite flexibilidad mientras mantiene la consistencia.

## Escala Completa

- **4xs**: 0.125rem (2px) - Espaciado mínimo, bordes finos, separaciones sutiles
- **3xs**: 0.25rem (4px) - Espaciado interno mínimo, separaciones pequeñas
- **2xs**: 0.5rem (8px) - Espaciado interno compacto, márgenes pequeños
- **xs**: 0.75rem (12px) - Espaciado estándar para elementos compactos
- **sm**: 1rem (16px) - Espaciado básico, unidad fundamental
- **md**: 1.5rem (24px) - Espaciado medio, separación clara entre elementos relacionados
- **lg**: 2rem (32px) - Espaciado amplio, separación entre secciones
- **xl**: 3rem (48px) - Espaciado grande, separación entre componentes principales
- **2xl**: 4rem (64px) - Espaciado muy grande, separación entre bloques de contenido
- **3xl**: 6rem (96px) - Espaciado máximo, separación entre secciones principales

## Aplicación Práctica

### Márgenes entre Componentes
- Elementos relacionados: `gap-2` (0.5rem/8px) a `gap-4` (1rem/16px)
- Elementos distintos: `gap-6` (1.5rem/24px) a `gap-8` (2rem/32px)
- Secciones separadas: `gap-12` (3rem/48px) o más

### Padding Interno
- Componentes compactos: `p-2` (0.5rem/8px) a `p-3` (0.75rem/12px)
- Componentes estándar: `p-4` (1rem/16px) a `p-6` (1.5rem/24px)
- Secciones amplias: `p-8` (2rem/32px) o más

### Estructura de Página
- Márgenes laterales: `px-4` en móvil, escalando a `px-8` o más en escritorio
- Espaciado entre secciones principales: `my-12` a `my-24`

## Implementación en Componentes

### Tarjetas (Cards)
- Padding externo: `p-6` (1.5rem/24px)
- Espaciado entre elementos internos: `space-y-4` (1rem/16px)

### Formularios
- Entre campos: `space-y-4` (1rem/16px)
- Padding de campos: `px-3 py-2`
- Márgenes de etiquetas: `mb-2` (0.5rem/8px)

### Navegación
- Padding de elementos: `px-4 py-2`
- Espaciado entre elementos: `gap-1` (0.25rem/4px) a `gap-4` (1rem/16px)

## Consideraciones Responsive

El sistema de espaciado se adapta a diferentes tamaños de pantalla, generalmente siguiendo estas pautas:

- **Dispositivos pequeños**: Reducir espaciado en aproximadamente 25-50%
- **Dispositivos medianos**: Valores estándar
- **Dispositivos grandes**: Aumentar espaciado en áreas clave para aprovechar el espacio adicional

Implementamos estos ajustes mediante clases responsive de Tailwind:
```html
<section className="p-4 md:p-6 lg:p-8">...</section>
```
