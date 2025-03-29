
# Componentes del Sistema de Diseño

Esta sección documenta los componentes base que conforman el sistema de diseño de Nexo. Cada componente está diseñado siguiendo los principios fundamentales de minimalismo intencional, claridad funcional y consistencia sistemática.

## Categorías de Componentes

### Componentes de Entrada
- [Botones](./buttons.md): Diferentes variantes para distintos niveles de énfasis y acciones
- [Campos de formulario](./form-fields.md): Inputs, selects, checkboxes y otros elementos de formulario
- [Toggles y Switches](./toggles.md): Controles para estados binarios

### Componentes de Presentación
- [Tarjetas](./cards.md): Contenedores versátiles para agrupar información relacionada
- [Tablas](./tables.md): Presentación estructurada de datos tabulares
- [Badges y Etiquetas](./badges.md): Indicadores visuales para estados o categorías

### Componentes de Navegación
- [Navegación principal](./navigation.md): Estructuras de menú y sistemas de navegación
- [Breadcrumbs](./breadcrumbs.md): Indicadores de ubicación jerárquica
- [Paginación](./pagination.md): Controles para navegar entre conjuntos de datos divididos

### Componentes de Retroalimentación
- [Alertas y Notificaciones](./alerts.md): Mensajes informativos de diferentes niveles de importancia
- [Diálogos y Modales](./dialogs.md): Interfaces superpuestas para acciones importantes
- [Indicadores de Progreso](./progress.md): Barras de progreso, spinners y otros indicadores

## Principios de Diseño de Componentes

Todos los componentes siguen estos principios fundamentales:

1. **Consistencia Visual**: Mantienen proporciones, espaciados y estilos consistentes entre sí
2. **Accesibilidad Integrada**: Diseñados para ser accesibles por defecto
3. **Adaptabilidad Responsive**: Funcionan correctamente en todos los tamaños de pantalla
4. **Estados Claros**: Comunican claramente sus estados (hover, focus, disabled, etc.)
5. **Personalización Controlada**: Permiten cierto grado de personalización sin comprometer la coherencia del sistema

## Implementación Técnica

Los componentes están implementados utilizando:

- [Shadcn/UI](https://ui.shadcn.com/) como base técnica
- Tailwind CSS para estilos consistentes
- Propiedades personalizadas de CSS para variaciones temáticas
- React y TypeScript para la lógica y tipado
