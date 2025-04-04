
# Arquitectura Frontend - Nexo Learning Platform

## Estructura de Componentes

La arquitectura frontend de Nexo Learning sigue un enfoque basado en componentes con una clara separación de responsabilidades. Esta estructura promueve la reutilización, mantenibilidad y escalabilidad.

### Diagrama de Componentes Principales

```
┌─────────────────────────────────────────────────────────────┐
│                          App                                │
└───────────┬─────────────────────────────────┬───────────────┘
            │                                 │
┌───────────▼────────┐             ┌──────────▼────────┐
│    AuthProvider    │             │     AppRouter     │
└───────────┬────────┘             └──────────┬────────┘
            │                                 │
┌───────────▼────────┐   ┌──────────┐   ┌────▼─────────────┐
│ DesignSystemProvider│   │PublicRoutes│   │  ProtectedRoutes  │
└───────────┬────────┘   └─────┬─────┘   └────┬─────────────┘
            │                  │              │
┌───────────▼────────┐   ┌─────▼─────┐   ┌────▼─────────────┐
│  ThemeProvider     │   │LandingPage│   │    AppLayout     │
└───────────┬────────┘   └───────────┘   └────┬─────────────┘
            │                                 │
┌───────────▼────────┐                   ┌────▼─────┐
│ QueryClientProvider│                   │SidebarNav├───┐
└────────────────────┘                   └────┬─────┘   │
                                              │         │
                                         ┌────▼─────┐   │
                                         │PageContent│◄──┘
                                         └──────────┘
```

### Jerarquía de Componentes

1. **Proveedores de Contexto**
   - `AuthProvider`: Gestiona el estado de autenticación
   - `DesignSystemProvider`: Controla la personalización de la interfaz
   - `ThemeProvider`: Gestiona temas (claro/oscuro/personalizado)
   - `QueryClientProvider`: Configura React Query para gestión de datos

2. **Enrutamiento**
   - `AppRouter`: Router principal con lógica de rutas
   - `PublicRoutes`: Rutas accesibles sin autenticación
   - `ProtectedRoutes`: Rutas que requieren autenticación
   - `RouteGroups`: Agrupaciones de rutas por dominio (admin, instructor, etc.)

3. **Layouts**
   - `AppLayout`: Layout principal para áreas autenticadas
   - `AdminLayout`: Layout especializado para el área de administración
   - `LearningLayout`: Layout optimizado para visualización de contenido educativo

4. **Componentes de Página**
   - Implementaciones específicas para cada ruta
   - Consumidores de datos y gestores de estado local
   - Orquestadores de componentes más pequeños

5. **Componentes Compartidos**
   - Elementos reutilizables en múltiples partes de la aplicación
   - Componentes base como botones, inputs, tablas, etc.

## Gestión de Estado

### Estrategia de Estado Global

Nexo Learning implementa una estrategia de gestión de estado en capas:

1. **Estado del Servidor (React Query)**
   - Datos remotos con cache optimizada
   - Revalidación automática
   - Manejo de estado de carga y errores
   - Mutaciones para actualizar datos remotos

2. **Estado de Autenticación (AuthContext)**
   - Información del usuario actual
   - Tokens y estado de sesión
   - Métodos de login/logout
   - Comprobación de roles y permisos

3. **Estado de UI (React Context)**
   - Preferencias de tema
   - Estado de navegación
   - Configuraciones de diseño
   - Estado de modales y drawers

4. **Estado Local (useState/useReducer)**
   - Estado específico de componentes
   - Formularios y entradas de usuario
   - Estados temporales no persistentes

### Diagrama de Flujo de Datos

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  API/Backend │◄────┤ React Query  │◄────┤  Componentes │
│  (Supabase)  │     │   Hooks      │     │   de UI      │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                    │
       │                    │                    │
┌──────▼───────┐     ┌──────▼───────┐     ┌──────▼───────┐
│    Cache     │     │   Contextos  │     │    Estado    │
│              │     │   Globales   │     │    Local     │
└──────────────┘     └──────────────┘     └──────────────┘
```

## Sistema de Diseño

El sistema de diseño de Nexo Learning está basado en Tailwind CSS y Shadcn UI, con una capa de personalización adicional para adaptarse a necesidades específicas de la plataforma.

### Componentes de UI Personalizados

1. **Componentes Base** (`/components/ui/`)
   - Elementos fundamentales como botones, inputs, modales
   - Implementados con Shadcn UI sobre Radix UI primitives
   - Estilizados con Tailwind CSS para consistencia visual

2. **Componentes Compuestos** (`/components/shared/`)
   - Combinaciones de componentes base para patrones comunes
   - DataTables, tarjetas de curso, elementos de navegación

3. **Componentes Específicos** (`/features/*/components/`)
   - Componentes especializados para dominios concretos
   - Editores de curso, reproductores de video, etc.

### Temas y Personalización

El sistema implementa tres temas base:
- **Claro**: Tema predeterminado con fondo blanco y contraste alto
- **Oscuro**: Tema con fondo oscuro para uso nocturno y menor fatiga visual
- **Futurista**: Tema especial con estética moderna y gradientes

Cada tema puede personalizarse ajustando:
- Paleta de colores (primario, secundario, acento)
- Radios de borde y efectos de sombra
- Espaciado y escala tipográfica

## Optimización de Rendimiento

### Estrategias Implementadas

1. **Code Splitting**
   - Lazy loading de rutas y componentes grandes
   - Dynamic imports para funcionalidades secundarias
   - Chunking optimizado durante el build

2. **Memoización**
   - Uso estratégico de React.memo, useMemo y useCallback
   - Prevención de renderizados innecesarios

3. **Optimización de Imágenes**
   - Carga progresiva y tamaños responsivos
   - Formatos modernos (WebP)
   - CDN para distribución optimizada

4. **Caché Inteligente**
   - Políticas de caché para datos frecuentes
   - Prefetching de rutas probables
   - Invalidación selectiva de caché

## Testing Frontend

La arquitectura frontend incluye varias capas de pruebas:

1. **Pruebas Unitarias**
   - Pruebas de componentes individuales
   - Pruebas de hooks personalizados
   - Pruebas de utilidades y helpers

2. **Pruebas de Integración**
   - Interacciones entre componentes
   - Flujos completos de usuario

3. **Pruebas End-to-End**
   - Simulación de navegación completa
   - Verificación de flujos críticos (registro, compra, etc.)

## Accesibilidad (A11y)

La aplicación implementa prácticas de accesibilidad:

1. **Conformidad WCAG**
   - Navegación por teclado
   - Etiquetas ARIA apropiadas
   - Contraste adecuado de color

2. **Experiencia Inclusiva**
   - Soporte para lectores de pantalla
   - Textos alternativos y descripciones
   - Feedback táctil y auditivo
