
# Guías de Uso del Sistema de Diseño

Este documento proporciona lineamientos para implementar el sistema de diseño de Nexo Learning de manera efectiva y coherente en todos los aspectos de la aplicación.

## Principios Fundamentales

1. **Consistencia**: Mantener un aspecto y comportamiento uniformes en toda la aplicación.
2. **Accesibilidad**: Garantizar que todos los componentes sean utilizables por personas de todas las capacidades.
3. **Flexibilidad**: Permitir la personalización sin comprometer la coherencia visual.
4. **Rendimiento**: Optimizar para velocidad y eficiencia en diversos dispositivos.

## Implementación del Sistema de Temas

Nexo Learning ofrece varios temas para adaptarse a las preferencias del usuario:

### Cómo Implementar Soporte para Temas

1. **Utilice las Variables CSS**: Todas las propiedades de color deben hacer referencia a variables CSS:
   ```css
   color: hsl(var(--foreground));
   background-color: hsl(var(--background));
   ```

2. **Evite Colores Codificados**: Nunca use valores hexadecimales o RGB directamente:
   ```css
   /* ❌ Incorrecto */
   color: #000000;
   
   /* ✅ Correcto */
   color: hsl(var(--foreground));
   ```

3. **Soporte para Modo Oscuro**: Utilice las variantes `dark:` de Tailwind:
   ```html
   <div className="bg-card text-card-foreground dark:bg-card-dark dark:text-card-foreground-dark">
     Contenido
   </div>
   ```

4. **Pruebas en Todos los Temas**: Verifique que los componentes funcionen visualmente en todos los temas disponibles.

### Componente ThemeSwitcher

Para permitir a los usuarios cambiar entre temas, utilice el componente ThemeSwitcher:

```tsx
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

// En su componente
<ThemeSwitcher />
```

## Tipografía

1. **Utilice la Escala Tipográfica**: Adhiérase a la escala tipográfica definida:
   ```html
   <h1 className="text-3xl font-bold">Título Principal</h1>
   <h2 className="text-2xl font-semibold">Subtítulo</h2>
   <p className="text-base">Texto regular</p>
   ```

2. **Jerarquía de Texto**: Mantenga una clara jerarquía visual:
   ```html
   <div>
     <h2 className="text-xl font-semibold">Título de Sección</h2>
     <p className="text-muted-foreground">Descripción de apoyo</p>
     <p>Contenido principal</p>
   </div>
   ```

## Espaciado

1. **Sistema de Espaciado**: Utilice las clases de espaciado de Tailwind que siguen nuestro sistema:
   ```html
   <div className="space-y-4">
     <div className="p-4">Componente con padding interno</div>
     <div className="mt-6">Componente con margen superior</div>
   </div>
   ```

2. **Contenedores**: Utilice contenedores consistentes para el ancho máximo:
   ```html
   <div className="container mx-auto px-4 md:px-6">
     Contenido centrado con ancho máximo
   </div>
   ```

## Componentes

1. **Variantes de Componentes**: Utilice las variantes definidas:
   ```html
   <Button variant="primary">Acción Principal</Button>
   <Button variant="secondary">Acción Secundaria</Button>
   ```

2. **Extensión de Componentes**: Extienda los componentes base en lugar de crear nuevos:
   ```tsx
   import { Button } from '@/components/ui/button';
   
   const BigButton = ({ children, ...props }) => (
     <Button className="py-6 text-lg" {...props}>
       {children}
     </Button>
   );
   ```

## Adaptación a Dispositivos Móviles

1. **Mobile-First**: Diseñe para móviles primero, luego amplíe para pantallas más grandes:
   ```html
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
     {/* Contenido que se adapta */}
   </div>
   ```

2. **Pruebas Responsivas**: Verifique todos los componentes en varios tamaños de pantalla.

## Accesibilidad

1. **Contraste de Color**: Mantenga relaciones de contraste WCAG AA (4.5:1) para texto:
   ```html
   <!-- Evite texto de bajo contraste -->
   <p className="text-foreground">Texto con buen contraste</p>
   ```

2. **Navegación por Teclado**: Asegúrese de que los elementos interactivos sean accesibles por teclado:
   ```html
   <Button className="focus:ring focus:ring-primary">Con indicador de foco</Button>
   ```

## Documentación y Mantenimiento

1. **Documentar Nuevos Componentes**: Al crear componentes, documentarlos en la sección correspondiente.
2. **Actualizar el Sistema**: Cuando se realicen cambios en el sistema de diseño, actualizar esta documentación.
