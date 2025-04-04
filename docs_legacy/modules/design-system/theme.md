
# Sistema de Temas

El sistema de temas de Nexo Learning proporciona una experiencia visual adaptable que respeta las preferencias del usuario y mantiene la coherencia estética en toda la aplicación.

## Modos de Tema Disponibles

El sistema soporta los siguientes modos:

### Tema Claro (Light)
- **Uso**: Es el tema predeterminado, optimizado para uso diurno.
- **Características**: Mayor contraste, fondos claros, colores vibrantes.
- **Beneficios**: Mejor legibilidad en entornos luminosos, menor fatiga visual en condiciones de alta iluminación.

### Tema Oscuro (Dark)
- **Uso**: Ideal para entornos con poca luz o uso nocturno.
- **Características**: Contraste reducido, fondos oscuros, emisión de luz disminuida.
- **Beneficios**: Reduce la fatiga visual en ambientes oscuros, ahorra batería en dispositivos OLED.

### Tema Futurista (Futuristic)
- **Uso**: Una variante estética alternativa con enfoque en tonos grises.
- **Características**: Paleta monocromática con acentos sutiles.
- **Beneficios**: Experiencia visual distinta, menos distracciones de color.

### Preferencia del Sistema (System)
- **Uso**: Respeta la configuración del sistema operativo del usuario.
- **Características**: Cambia automáticamente entre claro y oscuro según la configuración del dispositivo.
- **Beneficios**: Experiencia coherente con otras aplicaciones, transición automática día/noche.

## Implementación Técnica

El sistema de temas está implementado mediante:

1. **Variables CSS**: Definidas en el archivo `index.css` con variantes para cada tema.
2. **Clases de Tema**: Se aplican al elemento `html` (`.light`, `.dark`, `.futuristic`).
3. **Persistencia**: La preferencia del usuario se guarda en `localStorage`.
4. **Detección Automática**: Se utiliza `window.matchMedia('(prefers-color-scheme: dark)')` para detectar la preferencia del sistema.

## Componentes de UI para Gestión de Temas

### ThemeSwitcher
Un componente de interfaz de usuario que permite a los usuarios cambiar entre los diferentes temas disponibles:

```tsx
<ThemeSwitcher 
  showTooltip={true}
  variant="ghost"
  size="icon"
/>
```

### Contexto de Tema
El hook `useTheme` proporciona acceso al estado actual del tema y funciones para manipularlo:

```tsx
const { theme, setTheme, resolvedTheme, isDark, isFuturistic } = useTheme();
```

## Uso con Tailwind CSS

El proyecto utiliza Tailwind CSS con la funcionalidad `darkMode: ["class"]` habilitada, permitiendo definir estilos específicos para el modo oscuro:

```tsx
<div className="bg-white dark:bg-slate-900 text-black dark:text-white">
  Contenido adaptable
</div>
```

## Mejores Prácticas

1. **Contraste Adecuado**: Asegúrese de que todos los contenidos mantengan relaciones de contraste WCAG AA (4.5:1 para texto normal).
2. **Transiciones Suaves**: Utilice transiciones al cambiar entre temas para evitar cambios visuales bruscos.
3. **Coherencia Visual**: Mantenga la jerarquía visual y el énfasis consistentes en todos los temas.
4. **Prueba Cruzada**: Verifique que todos los componentes se vean correctamente en todos los temas disponibles.
