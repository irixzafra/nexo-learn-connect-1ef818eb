
# Arquitectura y Convenciones

Esta sección describe la arquitectura técnica de Nexo Learning Platform, la estructura de directorios, las convenciones de código y el workflow de desarrollo.

## Visión General Arquitectura

Nexo Learning utiliza una arquitectura moderna basada en servicios que aprovecha las capacidades de Supabase como plataforma backend.

### Frontend (Cliente)
- Aplicación SPA desarrollada con React y TypeScript
- Renderizado en el cliente con enrutamiento a través de React Router
- Estado global gestionado con React Context y React Query
- Interfaz de usuario construida con Tailwind CSS y Shadcn/UI

### Backend (Supabase)
- PostgreSQL como base de datos principal
- Autenticación y autorización mediante Supabase Auth
- Row Level Security (RLS) para protección de datos a nivel de fila
- Edge Functions para lógica de servidor personalizada
- Storage para almacenamiento de archivos

### Flujo de Datos
1. El cliente realiza peticiones a la API de Supabase
2. Las políticas RLS evalúan los permisos del usuario
3. Los datos son filtrados según los permisos
4. El cliente recibe únicamente los datos autorizados
5. React Query gestiona el caché y el estado de los datos

## Estructura de Directorios

```
src/
├── components/         # Componentes de UI reutilizables
│   ├── ui/             # Componentes básicos (shadcn/ui)
│   └── [feature]/      # Componentes específicos por funcionalidad
├── contexts/           # Contextos de React para estado global
├── features/           # Módulos funcionales de la aplicación
│   ├── auth/           # Autenticación y autorización
│   ├── courses/        # Gestión de cursos
│   ├── community/      # Funcionalidades de comunidad
│   └── admin/          # Panel de administración
├── hooks/              # Hooks personalizados
├── layouts/            # Componentes de layout
├── lib/                # Utilidades y configuraciones
│   └── supabase.ts     # Cliente de Supabase
├── pages/              # Componentes de página
├── types/              # Definiciones de tipos TypeScript
└── main.tsx            # Punto de entrada de la aplicación

supabase/
├── migrations/         # Migraciones SQL de la base de datos
└── functions/          # Edge Functions de Supabase
```

## Convenciones de Código

### Naming
- **Componentes**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase con prefijo "use" (`useAuthentication.ts`)
- **Utilidades**: camelCase (`formatDate.ts`)
- **Constantes globales**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

### Estructura de Componentes
- Preferencia por componentes funcionales con hooks
- Props tipadas con interfaces de TypeScript
- Comentarios JSDoc para documentación inline

### Estructura de Módulos
- Organización por características/dominios funcionales
- Cada módulo tiene su propio conjunto de componentes, hooks, etc.
- Exportaciones explícitas a través de archivos index.ts

### Estilos
- Tailwind CSS para estilos con clases utilitarias
- Componentes base de Shadcn/UI
- Variables CSS para temas y personalización

## Workflow de Desarrollo con Lovable

### Ciclo de Desarrollo
1. **Planificación**: Definir los requerimientos y alcance
2. **Desarrollo**: Implementar funcionalidades con asistencia de Lovable
3. **Pruebas**: Verificar funcionamiento y corregir errores
4. **Revisión**: Analizar código y optimizar implementación
5. **Despliegue**: Publicar cambios a entorno de producción

### Buenas Prácticas
- Commits frecuentes con mensajes descriptivos
- Pruebas para componentes y funcionalidades críticas
- Documentación inline para código complejo
- Uso de TypeScript para tipado estático

### Herramientas Recomendadas
- VS Code con extensiones para React/TypeScript
- Extensión de Tailwind CSS para autocompletado
- React Developer Tools para depuración
